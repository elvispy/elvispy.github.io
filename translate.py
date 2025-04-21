#!/usr/bin/env python3
import sys
import os
import re
import json
from time import sleep
from google import genai

# Supported Languages
LANGUAGES = {
    "en": "ENGLISH",
    "en-us": "ENGLISH",
    "pt": "PORTUGUESE",
    "pt-br": "PORTUGUESE",
    "es": "SPANISH",
    "fr": "FRENCH"
}

# Colors for printing
COLORS = {"green": "\033[32m", "yellow": "\033[33m", "red": "\033[31m", "cyan": "\033[36m", "reset": "\033[0m"}
printc = lambda msg, color: print(f"{COLORS[color]}{msg}{COLORS['reset']}")

def detect_format(filepath):
    if filepath.endswith(".json"):
        return "json"
    elif filepath.endswith(".md"):
        return "markdown"
    else:
        return "text"

def extract_language(path):
    # Look for the last folder in the path (e.g. 'pt-br', 'en-us')
    match = re.search(r'/([a-z]{2}(?:-[a-z]{2})?)/[^/]+$', path)
    return match.group(1) if match else None

def build_prompt(content, language, format, old_translated=""):
    if old_translated:
        return (
            f"I will provide two {format} files. The first is in English. "
            f"The second is a previously translated version in {language}.\n"
            "Update the translation to match the new English version, preserving structure and formatting.\n\n"
            f"Original (EN):\n{content}\n\n"
            f"Old Translation ({language}):\n{old_translated}\n"
            "Respond with a single code block in the same format."
        )
    else:
        return (
            f"Translate this {format} file from English to {language}. "
            "Preserve formatting and structure (JSON keys, indentation, etc.):\n\n"
            f"{content}\n"
            "Respond with a single code block in the same format."
        )

def send_prompt(prompt, client, retries=1):
    try:
        response = client.models.generate_content(model="gemini-2.0-flash", contents=prompt)
        match = re.search(r"```(?:\w+)?\s*([\s\S]*)\s*```", response.text, re.DOTALL)
        if match:
            return match.group(1)
        raise ValueError(f"No valid code block found in response:\n{response.text}")
    except Exception as e:
        if retries > 5:
            raise
        wait_time = 5 * retries
        printc(f"Error from Gemini: {e}. Retrying in {wait_time}s...", "yellow")
        sleep(wait_time)
        return send_prompt(prompt, client, retries + 1)

def main():
    if len(sys.argv) not in [2, 3]:
        print("Usage: python translate.py <english_file> <translated_output>")
        sys.exit(1)

    source_file = sys.argv[1]
    target_file = sys.argv[2] if len(sys.argv) == 3 else None
    lang_code = extract_language(target_file) if target_file else None
    if lang_code not in LANGUAGES:
        printc(f"Unknown or unsupported language code: {lang_code}", "red")
        sys.exit(1)
    language = LANGUAGES[lang_code]


    format = detect_format(source_file)
    with open(source_file, "r", encoding="utf-8") as f:
        content = f.read()

    old_translation = ""
    if target_file and os.path.exists(target_file):
        with open(target_file, "r", encoding="utf-8") as f:
            old_translation = f.read()

    prompt = build_prompt(content, language, format, old_translation)

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        printc("Error: GEMINI_API_KEY environment variable is not set.", "red")
        sys.exit(1)

    client = genai.Client(api_key=api_key)

    try:
        translated = send_prompt(prompt, client)
        # === Validate JSON if source is JSON ===
        if format == "json":
            try:
                json.loads(translated)
            except json.JSONDecodeError as e:
                printc(f"❌ Gemini returned invalid JSON:\n{e}", "red")
                printc("Translation output:\n" + translated, "yellow")
                sys.exit(1)

    except Exception as e:
        printc(f"Translation failed: {e}", "red")
        sys.exit(1)

    if target_file:
        os.makedirs(os.path.dirname(target_file) or ".", exist_ok=True)
    with open(target_file, "w", encoding="utf-8") as f:
        f.write(translated)

    printc(f"✅ Successfully translated to {language}: {target_file}", "green")
if __name__ == "__main__":
    import sys
    sys.argv = ["translate.py", "./_pages/en-us/about.md", "./_pages/pt-br/about.md"]
    main()

