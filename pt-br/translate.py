#!/usr/bin/env python3
"""
Batch translator: translates all en-us markdown files to a target language with
direct Gemini when available, falling back to OpenRouter's free models. A capped
retry loop corrects files that fail validation.

Usage:
    python3 translate.py <lang>          # translate all markdown files
    python3 translate.py <lang> --json   # translate resume JSON only

Supported languages: pt-br, es
"""
import sys
import re
import json
import os
from pathlib import Path
from urllib import error, request

LANGUAGES = {
    "pt-br": "Brazilian Portuguese",
    "es":    "Spanish",
}

# Directories containing English source files (relative to repo root)
SOURCE_DIRS = ["_projects/en-us", "_pages/en-us", "_news/en-us"]

MAX_RETRIES = 5
MAX_SOURCE_CHARS_PER_BATCH = 12_000
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_MODELS = (
    "google/gemma-4-31b-it:free",
    "cohere/north-mini-code:free",
)
OPENROUTER_MODEL = OPENROUTER_MODELS[0]
GEMINI_MODEL = "gemini-3-flash-preview"
GEMINI_URL = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    f"{GEMINI_MODEL}:generateContent"
)

LIQUID_TAG_RE = re.compile(r"\{[{%]-?[\s\S]*?-?[%}]\}")
LIQUID_VISIBLE_ATTRIBUTE_RE = re.compile(
    r"\b(?:alt|title|caption)\s*=\s*(?P<quote>[\"'])(?P<value>[\s\S]*?)(?P=quote)"
)
FENCED_CODE_BLOCK_RE = re.compile(r"```[^\n]*\n[\s\S]*?```")
INLINE_CODE_RE = re.compile(r"`[^`\n]+`")
HTML_TAG_RE = re.compile(r"</?[A-Za-z][^>]*>")
URL_RE = re.compile(r"https?://[^\s<>()\]\}]+")
DISPLAY_MATH_RE = re.compile(r"\$\$[\s\S]*?\$\$")
INLINE_MATH_RE = re.compile(r"(?<!\$)\$(?!\$)(?:\\.|[^$\n])+?\$(?!\$)")
FRONTMATTER_RE = re.compile(r"\A---\n([\s\S]*?)\n---")
FRONTMATTER_STRUCTURAL_KEYS = frozenset(
    {
        "announcements",
        "category",
        "children",
        "date",
        "display_categories",
        "dropdown",
        "giscus_comments",
        "horizontal",
        "id",
        "img",
        "importance",
        "inline",
        "latest_posts",
        "layout",
        "math",
        "nav",
        "nav_order",
        "page_id",
        "pagination",
        "permalink",
        "profile",
        "profiles",
        "redirect",
        "related_posts",
        "related_publications",
        "selected_papers",
        "social",
        "toc",
    }
)

COLORS = {
    "green":  "\033[32m",
    "yellow": "\033[33m",
    "red":    "\033[31m",
    "cyan":   "\033[36m",
    "reset":  "\033[0m",
}
printc = lambda msg, color: print(f"{COLORS[color]}{msg}{COLORS['reset']}")

# ---------------------------------------------------------------------------
# Prompt templates
# ---------------------------------------------------------------------------

MARKDOWN_SYSTEM = """\
You are a professional technical translator. Translate the website content below \
from English to {language}.

RULES — breaking any of these will corrupt the website:
  1. Preserve Liquid template syntax, tag names, include names, paths, filters,
     and non-natural parameters exactly: {{{{ }}}}, {{% %}}, {{% -%}}, etc.
  2. Do NOT translate YAML frontmatter keys (left side of `:` between `---` markers).
     Translate only the *values* when they are natural-language text.
  3. Do NOT translate content inside code fences (``` ... ```) or inline code (` ... `).
  4. Do NOT translate HTML tag names, attribute names, or attribute values.
  5. Translate reader-facing `alt`, `title`, and `caption` values inside Liquid
     include tags. Preserve every other character inside Liquid tags exactly.
  6. Do NOT translate JavaScript, CSS, or LaTeX source — preserve it character-for-character.
  7. Do NOT translate URLs, file paths, page_id values, layout names, or category names.
  8. Preserve ALL blank lines, indentation, and whitespace exactly as in the source.
  9. Translate only natural-language text that a human reader would see on screen.

OUTPUT FORMAT — output ONLY the XML blocks below, nothing else (no preamble, \
no commentary, no trailing text):

<translated_file path="TARGET_PATH">
TRANSLATED_CONTENT
</translated_file>

Translate ALL {n} files. Every source file must have a corresponding \
<translated_file> block in the output.\
"""

CORRECTION_HEADER = """\
Your previous translation had validation errors in {n} file(s). \
Please retranslate ONLY those files to {language}, applying the same rules as before.

Errors to fix:
{error_summary}

Output ONLY <translated_file> blocks for these {n} file(s) — nothing else.\
"""

RESUME_PROMPT = """\
Translate this JSON resume from English to {language}.
Preserve all JSON keys exactly as-is. Only translate string values that contain \
natural-language text visible to a human reader.
Do NOT translate URLs, dates, ISO codes, or technical identifiers.
Respond with a single JSON code block and nothing else:

```json
{content}
```\
"""

# ---------------------------------------------------------------------------
# Post-translation validation (independent of the translation provider)
# ---------------------------------------------------------------------------

def extract_liquid_tags(text: str) -> list[str]:
    """Return all Liquid tags in order: {{ ... }} and {% ... %}."""
    return LIQUID_TAG_RE.findall(text)


def normalize_liquid_tag_structure(tag: str) -> str:
    """Remove only reader-facing values before comparing Liquid syntax."""
    return LIQUID_VISIBLE_ATTRIBUTE_RE.sub(
        lambda match: match.group(0).replace(match.group("value"), "__TRANSLATABLE__"),
        tag,
    )


def protect_liquid_tag_structure(text: str, replace_value) -> str:
    """Mask Liquid syntax while leaving human-facing include attributes visible."""
    def protect_tag(match: re.Match[str]) -> str:
        tag = match.group(0)
        attributes = list(LIQUID_VISIBLE_ATTRIBUTE_RE.finditer(tag))
        if not attributes:
            return replace_value(tag)

        protected_parts: list[str] = []
        cursor = 0
        for attribute in attributes:
            protected_parts.append(replace_value(tag[cursor : attribute.start("value")]))
            protected_parts.append(attribute.group("value"))
            cursor = attribute.end("value")
        protected_parts.append(replace_value(tag[cursor:]))
        return "".join(protected_parts)

    return LIQUID_TAG_RE.sub(protect_tag, text)


def protect_frontmatter_structural_values(text: str, replace_value) -> str:
    """Mask frontmatter values that configure the site rather than label it."""
    match = FRONTMATTER_RE.match(text)
    if not match:
        return text

    def protect_line(line: str) -> str:
        key_match = re.match(r"(?P<prefix>[A-Za-z_][\w-]*\s*:\s*)(?P<value>.+)$", line)
        if not key_match or key_match.group("value").strip() == "":
            return line
        key = key_match.group("prefix").split(":", 1)[0].strip()
        if key not in FRONTMATTER_STRUCTURAL_KEYS:
            return line
        return key_match.group("prefix") + replace_value(key_match.group("value"))

    protected = "\n".join(protect_line(line) for line in match.group(1).split("\n"))
    return text[: match.start(1)] + protected + text[match.end(1) :]


def protect_nontranslatable_segments(text: str) -> tuple[str, dict[str, str]]:
    """Replace syntax the model must not alter with deterministic opaque tokens."""
    replacements: dict[str, str] = {}

    def replace_value(value: str) -> str:
        token = f"[[[PROTECTED_{len(replacements):04d}]]]"
        replacements[token] = value
        return token

    text = protect_frontmatter_structural_values(text, replace_value)
    text = protect_liquid_tag_structure(text, replace_value)

    def replace(match: re.Match[str]) -> str:
        return replace_value(match.group(0))

    for pattern in (
        FENCED_CODE_BLOCK_RE,
        INLINE_CODE_RE,
        URL_RE,
        DISPLAY_MATH_RE,
        INLINE_MATH_RE,
        HTML_TAG_RE,
    ):
        text = pattern.sub(replace, text)

    return text, replacements


def restore_nontranslatable_segments(text: str, replacements: dict[str, str]) -> str:
    """Restore only the exact protected tokens returned by a translation model."""
    for token, original in reversed(tuple(replacements.items())):
        text = text.replace(token, original)
    return text


def extract_frontmatter_keys(text: str) -> list[str]:
    """Return YAML frontmatter keys in order (top-level only)."""
    match = re.match(r"^---\n([\s\S]*?)\n---", text)
    if not match:
        return []
    return re.findall(r"^([\w_-]+)\s*:", match.group(1), re.MULTILINE)


def extract_code_blocks(text: str) -> list[str]:
    """Return contents of fenced code blocks (``` ... ```)."""
    return re.findall(r"```[^\n]*\n([\s\S]*?)```", text)


def validate_translation(src: str, translated: str, label: str) -> list[str]:
    """
    Compare source and translated content programmatically.
    Returns a list of human-readable error strings (empty = all good).
    """
    errors = []

    # 0. Provider-independent comparison of every syntax segment masked before
    #    translation: frontmatter configuration, Liquid, code, URLs, math, HTML.
    src_protected = list(protect_nontranslatable_segments(src)[1].values())
    tgt_protected = list(protect_nontranslatable_segments(translated)[1].values())
    if src_protected != tgt_protected:
        errors.append("Protected non-translatable segments were modified or reordered.")

    # 1. Liquid tags must be preserved verbatim and in the same order
    src_tags = [normalize_liquid_tag_structure(tag) for tag in extract_liquid_tags(src)]
    tgt_tags = [normalize_liquid_tag_structure(tag) for tag in extract_liquid_tags(translated)]
    if src_tags != tgt_tags:
        src_set, tgt_set = set(src_tags), set(tgt_tags)
        lost  = src_set - tgt_set
        added = tgt_set - src_set
        if lost:
            errors.append(
                "Liquid tags removed/altered:\n"
                + "\n".join(f"    - {t}" for t in sorted(lost))
            )
        if added:
            errors.append(
                "Unexpected Liquid tags introduced:\n"
                + "\n".join(f"    + {t}" for t in sorted(added))
            )
        if len(src_tags) != len(tgt_tags):
            errors.append(
                f"Liquid tag count changed: {len(src_tags)} → {len(tgt_tags)}"
            )

    # 2. Frontmatter keys must be identical (order-insensitive)
    src_keys = set(extract_frontmatter_keys(src))
    tgt_keys = set(extract_frontmatter_keys(translated))
    if src_keys != tgt_keys:
        lost  = src_keys - tgt_keys
        added = tgt_keys - src_keys
        if lost:
            errors.append(f"Frontmatter keys removed: {sorted(lost)}")
        if added:
            errors.append(f"Frontmatter keys added: {sorted(added)}")

    # 3. Code block content must be identical
    src_blocks = extract_code_blocks(src)
    tgt_blocks = extract_code_blocks(translated)
    if len(src_blocks) != len(tgt_blocks):
        errors.append(
            f"Code block count changed: {len(src_blocks)} → {len(tgt_blocks)}"
        )
    else:
        for i, (s, t) in enumerate(zip(src_blocks, tgt_blocks)):
            if s.strip() != t.strip():
                errors.append(
                    f"Code block {i+1} was modified.\n"
                    f"    expected: {s.strip()[:120]!r}\n"
                    f"    got:      {t.strip()[:120]!r}"
                )

    return errors


# ---------------------------------------------------------------------------
# Core helpers
# ---------------------------------------------------------------------------

def find_source_files() -> list[Path]:
    files = []
    for d in SOURCE_DIRS:
        p = Path(d)
        if p.exists():
            files.extend(sorted(p.glob("*.md")))
    return files


def partition_markdown_files(
    files: list[Path], max_source_chars: int = MAX_SOURCE_CHARS_PER_BATCH
) -> list[list[Path]]:
    """Group source files into deterministic, bounded translation batches."""
    batches: list[list[Path]] = []
    batch: list[Path] = []
    batch_chars = 0

    for src in files:
        source_chars = len(src.read_text(encoding="utf-8"))
        if batch and batch_chars + source_chars > max_source_chars:
            batches.append(batch)
            batch = []
            batch_chars = 0

        batch.append(src)
        batch_chars += source_chars

    if batch:
        batches.append(batch)

    return batches


def target_path(src: Path, lang: str) -> Path:
    return Path(str(src).replace("/en-us/", f"/{lang}/"))


def call_openrouter(prompt: str) -> str:
    """Send a non-streaming translation prompt to OpenRouter and return text."""
    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        raise RuntimeError("OPENROUTER_API_KEY is required for automatic translation.")

    for index, model in enumerate(OPENROUTER_MODELS):
        payload = {
            "model": model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.2,
            "reasoning": {"effort": "none"},
        }
        http_request = request.Request(
            OPENROUTER_URL,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            method="POST",
        )

        try:
            with request.urlopen(http_request, timeout=120) as response:
                body = response.read().decode("utf-8")
        except error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")[:500]
            if exc.code in (429, 503) and index < len(OPENROUTER_MODELS) - 1:
                printc(
                    f"OpenRouter model {model} returned HTTP {exc.code}; trying the next free model.",
                    "yellow",
                )
                continue
            raise RuntimeError(
                f"OpenRouter request failed (HTTP {exc.code}): {detail}"
            ) from exc
        except error.URLError as exc:
            raise RuntimeError(f"OpenRouter request failed: {exc.reason}") from exc

        try:
            response_json = json.loads(body)
            content = response_json["choices"][0]["message"]["content"]
        except (IndexError, KeyError, TypeError, json.JSONDecodeError) as exc:
            raise RuntimeError("OpenRouter response contained no assistant content.") from exc

        if not isinstance(content, str) or not content.strip():
            raise RuntimeError("OpenRouter response contained no assistant content.")
        return content

    raise RuntimeError("OpenRouter exhausted all configured free models.")


def call_gemini(prompt: str) -> str:
    """Send a translation prompt to Gemini 3 Flash with low thinking."""
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is required for direct Gemini translation.")

    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "maxOutputTokens": 16_384,
            "thinkingConfig": {"thinkingLevel": "low"},
        },
    }
    http_request = request.Request(
        GEMINI_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "x-goog-api-key": api_key,
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with request.urlopen(http_request, timeout=120) as response:
            body = response.read().decode("utf-8")
    except error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:500]
        raise RuntimeError(f"Gemini request failed (HTTP {exc.code}): {detail}") from exc
    except error.URLError as exc:
        raise RuntimeError(f"Gemini request failed: {exc.reason}") from exc

    try:
        response_json = json.loads(body)
        parts = response_json["candidates"][0]["content"]["parts"]
        content = "".join(part.get("text", "") for part in parts)
    except (IndexError, KeyError, TypeError, json.JSONDecodeError) as exc:
        raise RuntimeError("Gemini response contained no assistant content.") from exc

    if not content.strip():
        raise RuntimeError("Gemini response contained no assistant content.")
    return content


def call_translation_provider(prompt: str) -> str:
    """Prefer the direct Gemini key; retain OpenRouter for environments without it."""
    if os.environ.get("GEMINI_API_KEY"):
        return call_gemini(prompt)
    return call_openrouter(prompt)


def parse_translated_files(response: str) -> dict[str, str]:
    """Extract <translated_file path="...">...</translated_file> blocks."""
    pattern = re.compile(
        r'<translated_file\s+path="([^"]+)">\s*([\s\S]*?)\s*</translated_file>',
        re.MULTILINE,
    )
    matches = pattern.findall(response)
    if not matches:
        raise ValueError(
            "No <translated_file> blocks found in translation response.\n"
            f"Response preview:\n{response[:800]}"
        )
    return {path: content for path, content in matches}


# ---------------------------------------------------------------------------
# Markdown batch translation with retry loop
# ---------------------------------------------------------------------------

def build_markdown_prompt(files: list[Path], lang: str) -> str:
    language_name = LANGUAGES[lang]
    source_blocks = [
        f'<source_file path="{target_path(src, lang)}">\n'
        f'{protect_nontranslatable_segments(src.read_text(encoding="utf-8"))[0]}\n'
        f'</source_file>'
        for src in files
    ]
    header = MARKDOWN_SYSTEM.format(language=language_name, n=len(files))
    return header + "\n\n" + "\n\n".join(source_blocks)


def build_correction_prompt(
    bad_sources: list[Path],
    lang: str,
    errors_by_path: dict[str, list[str]],
) -> str:
    language_name = LANGUAGES[lang]

    error_lines = []
    for src in bad_sources:
        path_str = str(target_path(src, lang))
        errs = errors_by_path.get(path_str, ["Missing from previous response"])
        error_lines.append(f"  {path_str}:")
        error_lines.extend(f"    • {e}" for e in errs)

    source_blocks = [
        f'<source_file path="{target_path(src, lang)}">\n'
        f'{protect_nontranslatable_segments(src.read_text(encoding="utf-8"))[0]}\n'
        f'</source_file>'
        for src in bad_sources
    ]

    header = CORRECTION_HEADER.format(
        n=len(bad_sources),
        language=language_name,
        error_summary="\n".join(error_lines),
    )
    return header + "\n\n" + "\n\n".join(source_blocks)


def run_validation_pass(
    translations: dict[str, str],
    candidate_files: list[Path],
    lang: str,
) -> tuple[dict[str, str], dict[str, list[str]], list[Path]]:
    """
    Validate a batch of translations against their sources.

    Returns:
        good          — path → content for files that passed all checks
        errors_by_path — path → [error strings] for files that failed
        bad_sources   — source Path objects that need retrying
    """
    good: dict[str, str] = {}
    errors_by_path: dict[str, list[str]] = {}
    bad_sources: list[Path] = []

    for src in candidate_files:
        path_str = str(target_path(src, lang))
        if path_str not in translations:
            errors_by_path[path_str] = ["Missing from response"]
            bad_sources.append(src)
            continue

        source = src.read_text(encoding="utf-8")
        _, replacements = protect_nontranslatable_segments(source)
        content = restore_nontranslatable_segments(translations[path_str], replacements)
        errs = validate_translation(source, content, path_str)
        if errs:
            errors_by_path[path_str] = errs
            bad_sources.append(src)
        else:
            good[path_str] = content

    return good, errors_by_path, bad_sources


def translate_markdown_batch(files: list[Path], lang: str) -> dict[str, str] | None:
    """Translate and validate one bounded group of Markdown source files."""
    prompt = build_markdown_prompt(files, lang)
    printc("Sending bounded translation batch...", "cyan")
    response = call_translation_provider(prompt)
    translations = parse_translated_files(response)

    good, errors_by_path, bad_sources = run_validation_pass(translations, files, lang)

    if good:
        printc(f"  {len(good)}/{len(files)} files passed validation.", "green")
    if bad_sources:
        printc(f"  {len(bad_sources)}/{len(files)} files need correction.", "yellow")

    # --- Retry loop (each correction prompt is self-contained) ---
    for attempt in range(1, MAX_RETRIES + 1):
        if not bad_sources:
            break

        printc(
            f"\nCorrection attempt {attempt}/{MAX_RETRIES} "
            f"({len(bad_sources)} file(s))...",
            "yellow",
        )
        for src in bad_sources:
            path_str = str(target_path(src, lang))
            for err in errors_by_path.get(path_str, ["Missing from response"]):
                printc(f"  [{path_str}] {err}", "yellow")

        correction = build_correction_prompt(bad_sources, lang, errors_by_path)
        response = call_translation_provider(correction)
        new_translations = parse_translated_files(response)

        new_good, errors_by_path, bad_sources = run_validation_pass(
            new_translations, bad_sources, lang
        )
        good.update(new_good)

        fixed = len(new_good)
        still_bad = len(bad_sources)
        if fixed:
            printc(f"  Fixed {fixed} file(s).", "green")
        if still_bad:
            printc(f"  {still_bad} file(s) still failing.", "yellow")

    if bad_sources:
        printc(
            f"\nFailed after {MAX_RETRIES} correction attempt(s). "
            f"Unresolved files ({len(bad_sources)}):",
            "red",
        )
        for src in bad_sources:
            path_str = str(target_path(src, lang))
            printc(f"  {path_str}", "red")
            for err in errors_by_path.get(path_str, []):
                printc(f"    • {err}", "red")
        return None

    return good


def translate_markdown(lang: str):
    files = find_source_files()
    if not files:
        printc("No source files found.", "red")
        sys.exit(1)

    batches = partition_markdown_files(files)
    printc(
        f"Translating {len(files)} files → {LANGUAGES[lang]} ({lang}) "
        f"in {len(batches)} bounded batch(es)...",
        "cyan",
    )

    translations: dict[str, str] = {}
    for index, batch in enumerate(batches, start=1):
        printc(f"\nBatch {index}/{len(batches)} ({len(batch)} file(s))", "cyan")
        good = translate_markdown_batch(batch, lang)
        if good is None:
            sys.exit(1)
        translations.update(good)

    for path_str, content in translations.items():
        out = Path(path_str)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(content, encoding="utf-8")
        printc(f"  ✅ {path_str}", "green")

    printc(f"\nDone: {len(translations)}/{len(files)} files written for {lang}.", "green")


# ---------------------------------------------------------------------------
# Resume JSON translation
# ---------------------------------------------------------------------------

def translate_resume(lang: str):
    src = Path("assets/json/resume_en-us.json")
    dst = Path(f"assets/json/resume_{lang}.json")

    if not src.exists():
        printc(f"Resume source not found: {src}", "red")
        sys.exit(1)

    content = src.read_text(encoding="utf-8")
    prompt = RESUME_PROMPT.format(language=LANGUAGES[lang], content=content)

    printc(f"Translating resume → {LANGUAGES[lang]} ({lang})...", "cyan")
    response = call_translation_provider(prompt)

    match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", response, re.DOTALL)
    if not match:
        printc("No JSON code block found in translation response.", "red")
        printc(f"Response preview:\n{response[:600]}", "yellow")
        sys.exit(1)

    translated_json = match.group(1).strip()

    try:
        json.loads(translated_json)
    except json.JSONDecodeError as e:
        printc(f"OpenRouter returned invalid JSON: {e}", "red")
        printc(f"Output:\n{translated_json[:600]}", "yellow")
        sys.exit(1)

    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(translated_json, encoding="utf-8")
    printc(f"  ✅ {dst}", "green")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main():
    args = sys.argv[1:]
    json_mode = "--json" in args
    lang_args = [a for a in args if not a.startswith("--")]

    if len(lang_args) != 1 or lang_args[0] not in LANGUAGES:
        print("Usage: translate.py <lang> [--json]")
        print(f"  lang: {', '.join(LANGUAGES)}")
        sys.exit(1)

    lang = lang_args[0]

    if json_mode:
        translate_resume(lang)
    else:
        translate_markdown(lang)


if __name__ == "__main__":
    main()
