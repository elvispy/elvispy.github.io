#!/usr/bin/env python3
import sys
import os
import re
from time import sleep
from google import genai

# Supported Languages
LANGUAGES = {"en": "ENGLISH",
             "pt": "PORTUGUESE",
             "fr": "FRENCH", 
             "es": "SPANISH"}

# Colors to print on the terminal to
ansi_colors = {
    "black": "\033[30m",
    "red": "\033[31m",
    "green": "\033[32m",
    "yellow": "\033[33m",
    "blue": "\033[34m",
    "magenta": "\033[35m",
    "cyan": "\033[36m",
    "white": "\033[37m",
    "reset": "\033[0m"
}

#Print with colors
printc = lambda s, color: print(f"{ansi_colors[color]}{s}{ansi_colors["reset"]}")

# Function to send prompt to 
def send_prompt(prompt, client=None, i=1):
    try:
        response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt,
        )
        pattern = r"```(?:\w+)?\s*([\s\S]*)\s*```"
        

        match = re.search(pattern, response.text, re.DOTALL)
        if match:
            translated_text = match.group(1)
        else:
            raise Exception("No translation was provided by gemini. Response: \n" + response.text)
    except Exception as e:
        
        if "exhausted" in e:
            if i>= 5:
                raise Exception(e)

            printc(f"Error calling Gemini API: \n {e}. Will wait {5*i} seconds", "yellow")
            sleep(5*i)
            printc("Retrying...", "yellow")
            translated_text = send_prompt(prompt, client=client, i=i+1)
        else:
            raise Exception(e)
    return translated_text
def main():
    if len(sys.argv) not in [2, 3]:
        print("Usage: python translate.py <english_file> <old_translated_file> (second arg optional)")
        sys.exit(1)

    # Read the content of the English Markdown file.
    try:
        eng_file = sys.argv[1]
        with open(eng_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
    except Exception as e:
        print(f"Error reading file {eng_file}: {e}")
        sys.exit(1)
    

    translated_old = ""
    if len(sys.argv) == 3:
        trans_file = sys.argv[2]
        extract_language = lambda path: re.search(r'/([^/]+)/[^/]+$', path).group(1)[:2]
        language = LANGUAGES[extract_language(trans_file)]
        try:
            with open(trans_file, 'r', encoding='utf-8') as f:
                translated_old = f.read()
        except Exception as e:
            printc(f"Error reading translated file {trans_file}: {e}", "cyan")
            #sys.exit(1)


    if translated_old != "":
         # Construct a prompt for Gemini that instructs it to translate
        # while preserving Markdown formatting.
        prompt = (
            "I will provide you with two files. The first one is in english, and the second one is a translated version in " + language+ ". \n " + 
            "Tweak the translated version so that it matches the contents from the original file. Of course, maintain the language of the second file. " + 
            "Preserve any Markdown/HTML formatting so that syntax is maintained (headers, lists, code blocks, links, etc.):\n\n" + content + 
            "\n\nNow, the translated version before your changes: \n\n" + translated_old + 
            "Your response should contain only one code block in markdown style, delimited by triple backticks"
        )

    else: 
        
        # Construct a prompt for Gemini that instructs it to translate
        # while preserving Markdown formatting.
        prompt = (
            "I will provide you with a file in english. " 
            "Provide me with a translated version so that it matches the contents from the original file. The translation should be in " + language + 
            "Preserve any Markdown/HTML/JSON formatting (headers, lists, code blocks, links, etc.):\n\n" + content + 
            "\nYour response should contain only one code block matching the style of the original file (i.e. markdown/html/json), delimited by triple backticks"
        )

       

    # Retrieve your API key from the environment variable.
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable is not set.")
        sys.exit(1)

    # Create the Gemini client.
    client = genai.Client(api_key=api_key)

    # Call Gemini to generate the translation.
    try:
        translated_text = send_prompt(prompt, client=client)
    except Exception as e:
        printc(f"Error calling Gemini API: \n {e}", "red")
        sys.exit(1)

    # Write the translated text to the target Portuguese file.
    try:
        os.makedirs(os.path.dirname(trans_file), exist_ok=True)
        with open(trans_file, 'w', encoding='utf-8') as f:
            f.write(translated_text)
    except Exception as e:
        print(f"Error writing to file {trans_file}: {e}")
        sys.exit(1)

    printc(f"Translation to {language} successfully written to {trans_file}", "green")
    sleep(0.1)

if __name__ == "__main__":
    #sys.argv = ["translate.py", "./_pages/en-us/404.md", "./_pages/pt-br/404.md"]
    main()
