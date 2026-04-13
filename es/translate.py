#!/usr/bin/env python3
"""
Batch translator: translates all en-us markdown files to a target language in a
single gemini-cli call, with a capped retry loop for files that fail validation.

Usage:
    python3 translate.py <lang>          # translate all markdown files
    python3 translate.py <lang> --json   # translate resume JSON only

Supported languages: pt-br, es
"""
import sys
import re
import json
import subprocess
from pathlib import Path

LANGUAGES = {
    "pt-br": "Brazilian Portuguese",
    "es":    "Spanish",
}

# Directories containing English source files (relative to repo root)
SOURCE_DIRS = ["_projects/en-us", "_pages/en-us", "_news/en-us"]

MAX_RETRIES = 5

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
  1. Do NOT translate Liquid template tags: {{{{ }}}}, {{% %}}, {{% -%}}, etc.
  2. Do NOT translate YAML frontmatter keys (left side of `:` between `---` markers).
     Translate only the *values* when they are natural-language text.
  3. Do NOT translate content inside code fences (``` ... ```) or inline code (` ... `).
  4. Do NOT translate HTML tag names, attribute names, or attribute values.
  5. Do NOT translate any parameter or attribute inside a Liquid tag — including quoted
     string values such as title="..." or caption="...". Every character inside
     {{% ... %}} and {{{{ ... }}}} must be copied exactly as-is.
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
# Post-translation validation (independent of Gemini)
# ---------------------------------------------------------------------------

def extract_liquid_tags(text: str) -> list[str]:
    """Return all Liquid tags in order: {{ ... }} and {% ... %}."""
    return re.findall(r"\{[{%]-?[\s\S]*?-?[%}]\}", text)


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

    # 1. Liquid tags must be preserved verbatim and in the same order
    src_tags = extract_liquid_tags(src)
    tgt_tags = extract_liquid_tags(translated)
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


def target_path(src: Path, lang: str) -> Path:
    return Path(str(src).replace("/en-us/", f"/{lang}/"))


def call_gemini(prompt: str, resume: bool = False) -> str:
    """Send prompt to gemini-cli in headless mode and return raw text output."""
    cmd = ["gemini", "-p", prompt, "-o", "text"]
    if resume:
        cmd += ["--resume", "latest"]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(
            f"gemini CLI exited with code {result.returncode}:\n{result.stderr}"
        )
    if not result.stdout.strip():
        raise RuntimeError(
            f"gemini CLI returned empty output. stderr:\n{result.stderr}"
        )
    return result.stdout


def parse_translated_files(response: str) -> dict[str, str]:
    """Extract <translated_file path="...">...</translated_file> blocks."""
    pattern = re.compile(
        r'<translated_file\s+path="([^"]+)">\s*([\s\S]*?)\s*</translated_file>',
        re.MULTILINE,
    )
    matches = pattern.findall(response)
    if not matches:
        raise ValueError(
            "No <translated_file> blocks found in gemini response.\n"
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
        f'{src.read_text(encoding="utf-8")}\n'
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
        f'{src.read_text(encoding="utf-8")}\n'
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

        content = translations[path_str]
        errs = validate_translation(src.read_text(encoding="utf-8"), content, path_str)
        if errs:
            errors_by_path[path_str] = errs
            bad_sources.append(src)
        else:
            good[path_str] = content

    return good, errors_by_path, bad_sources


def translate_markdown(lang: str):
    files = find_source_files()
    if not files:
        printc("No source files found.", "red")
        sys.exit(1)

    printc(f"Translating {len(files)} files → {LANGUAGES[lang]} ({lang})...", "cyan")

    # --- Initial call (no session resume) ---
    prompt = build_markdown_prompt(files, lang)
    printc("Sending batch to gemini-cli...", "cyan")
    response = call_gemini(prompt, resume=False)
    translations = parse_translated_files(response)

    good, errors_by_path, bad_sources = run_validation_pass(translations, files, lang)

    if good:
        printc(f"  {len(good)}/{len(files)} files passed validation.", "green")
    if bad_sources:
        printc(f"  {len(bad_sources)}/{len(files)} files need correction.", "yellow")

    # --- Retry loop (resume same session) ---
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
        response = call_gemini(correction, resume=True)
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

    # --- Write all files that passed validation (regardless of remaining failures) ---
    for path_str, content in good.items():
        out = Path(path_str)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(content, encoding="utf-8")
        printc(f"  ✅ {path_str}", "green")

    printc(f"\nDone: {len(good)}/{len(files)} files written for {lang}.", "green")

    # --- Final outcome ---
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
        sys.exit(1)


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
    response = call_gemini(prompt, resume=False)

    match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", response, re.DOTALL)
    if not match:
        printc("No JSON code block found in gemini response.", "red")
        printc(f"Response preview:\n{response[:600]}", "yellow")
        sys.exit(1)

    translated_json = match.group(1).strip()

    try:
        json.loads(translated_json)
    except json.JSONDecodeError as e:
        printc(f"Gemini returned invalid JSON: {e}", "red")
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
