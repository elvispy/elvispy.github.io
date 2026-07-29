import json
import os
import tempfile
import unittest
from io import BytesIO
from pathlib import Path
from urllib.error import HTTPError
from unittest.mock import patch

import translate


class FakeResponse:
    def __init__(self, payload):
        self.payload = payload

    def read(self):
        return json.dumps(self.payload).encode("utf-8")

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        return False


class OpenRouterClientTests(unittest.TestCase):
    def test_partitions_markdown_files_without_exceeding_the_batch_budget(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            files = []
            for name, content in {
                "first.md": "a" * 8,
                "second.md": "b" * 7,
                "third.md": "c" * 5,
            }.items():
                path = root / name
                path.write_text(content, encoding="utf-8")
                files.append(path)

            batches = translate.partition_markdown_files(files, max_source_chars=12)

        self.assertEqual(
            [[path.name for path in batch] for batch in batches],
            [["first.md"], ["second.md", "third.md"]],
        )

    def test_existing_validation_accepts_preserved_liquid_tags(self):
        source = """---
title: A title
---

{% include figure.liquid path=\"assets/img/example.png\" %}
"""

        self.assertEqual(translate.validate_translation(source, source, "example"), [])

    @patch.dict(os.environ, {"OPENROUTER_API_KEY": "test-key"}, clear=True)
    @patch("translate.request.urlopen")
    def test_returns_assistant_content_and_uses_free_router(self, urlopen):
        urlopen.return_value = FakeResponse(
            {"choices": [{"message": {"content": "translated text"}}]}
        )

        result = translate.call_openrouter("translate this")

        self.assertEqual(result, "translated text")
        request = urlopen.call_args.args[0]
        self.assertEqual(request.full_url, translate.OPENROUTER_URL)
        self.assertEqual(request.get_header("Authorization"), "Bearer test-key")
        payload = json.loads(request.data)
        self.assertEqual(payload["model"], "google/gemma-4-31b-it:free")
        self.assertEqual(payload["reasoning"], {"effort": "none"})

    @patch.dict(os.environ, {}, clear=True)
    def test_requires_openrouter_api_key(self):
        with self.assertRaisesRegex(RuntimeError, "OPENROUTER_API_KEY"):
            translate.call_openrouter("translate this")

    @patch.dict(os.environ, {"OPENROUTER_API_KEY": "test-key"}, clear=True)
    @patch("translate.request.urlopen")
    def test_rejects_response_without_assistant_content(self, urlopen):
        urlopen.return_value = FakeResponse({"choices": []})

        with self.assertRaisesRegex(RuntimeError, "no assistant content"):
            translate.call_openrouter("translate this")

    @patch.dict(os.environ, {"OPENROUTER_API_KEY": "test-key"}, clear=True)
    @patch("translate.request.urlopen")
    def test_surfaces_http_errors_without_exposing_the_key(self, urlopen):
        urlopen.side_effect = [
            HTTPError(
                translate.OPENROUTER_URL,
                429,
                "Too Many Requests",
                hdrs=None,
                fp=BytesIO(b'{"error":{"message":"rate limited"}}'),
            )
            for _ in translate.OPENROUTER_MODELS
        ]

        with self.assertRaisesRegex(RuntimeError, r"OpenRouter request failed \(HTTP 429\)"):
            translate.call_openrouter("translate this")

    @patch.dict(os.environ, {"OPENROUTER_API_KEY": "test-key"}, clear=True)
    @patch("translate.request.urlopen")
    def test_falls_back_to_a_second_free_model_after_a_rate_limit(self, urlopen):
        urlopen.side_effect = [
            HTTPError(
                translate.OPENROUTER_URL,
                429,
                "Too Many Requests",
                hdrs=None,
                fp=BytesIO(b'{"error":{"message":"rate limited"}}'),
            ),
            FakeResponse({"choices": [{"message": {"content": "translated text"}}]}),
        ]

        result = translate.call_openrouter("translate this")

        self.assertEqual(result, "translated text")
        self.assertEqual(
            [json.loads(call.args[0].data)["model"] for call in urlopen.call_args_list],
            list(translate.OPENROUTER_MODELS),
        )


if __name__ == "__main__":
    unittest.main()
