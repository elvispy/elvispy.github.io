# Agentic Engineering Card Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an English portfolio card that explains the f3dasm-agentic engineering benchmarks through a real metamaterial result and animation.

**Architecture:** A new Jekyll project Markdown page supplies the card metadata and long-form narrative. A copied, repository-owned GIF is the only new media asset. Existing project discovery renders the card without template changes.

**Tech Stack:** Jekyll/Liquid Markdown, existing project-card collection, GitHub Pages build.

---

## Chunk 1: Content and asset

### Task 1: Add the visual asset

**Files:**
- Create: `assets/img/agentic-metamaterial.gif`
- Source: `/Users/eaguerov/Documents/Github/f3dasm-agentic-benchmarks/supercompressible-material/assets/public/gifs/rect_run17.gif`

- [ ] Copy the existing animated simulation without resampling or cropping.
- [ ] Verify its dimensions and GIF format with `file`.

### Task 2: Add the English project page

**Files:**
- Create: `_projects/en-us/8_agentic.md`

- [ ] Write the front matter for a work project card using `agentic-metamaterial.gif`.
- [ ] Write the approved score-versus-discovery narrative, the concrete metamaterial constraints, and the evidence/provenance section.
- [ ] Preserve the portrait hero aspect ratio with a two-column layout rather than crop it.
- [ ] Link the benchmark repository using the existing repository include.

### Task 3: Verify and publish

**Files:**
- Verify: `_projects/en-us/8_agentic.md`, `assets/img/agentic-metamaterial.gif`

- [ ] Run `git diff --check`.
- [ ] Check the asset format and Markdown front matter manually.
- [ ] Run the translation-client unit tests because the working tree includes its in-scope robustness fix.
- [ ] Commit only the agentic card asset/page and the translation-client fix/tests; do not stage pre-existing Spanish or Spectral scratch changes.
- [ ] Push `main`; GitHub Actions remains the site-build authority.
