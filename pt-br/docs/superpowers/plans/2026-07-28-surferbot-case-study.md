# Flexible Surferbot Case Study Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish an evidence-based, motion-led English case study for the Flexible Surferbot project.

**Architecture:** The Jekyll collection page remains the presentation unit. Two repository-derived media assets live under `assets/img/`, while the Markdown page provides the narrative, embeds, captions, and repository link. Verification combines static source assertions with a production Jekyll build.

**Tech Stack:** Jekyll, Liquid, Markdown, HTML video/iframe markup, existing GIF and PDF-rendered PNG assets.

---

## Chunk 1: Media and page narrative

### Task 1: Establish the red test state

**Files:**
- Test: `_projects/en-us/3_surferbot.md`
- Test: `assets/img/flexible-surferbot-simulation.gif`
- Test: `assets/img/flexible-surferbot-modal-map.png`

- [ ] **Step 1: Run failing static assertions**

Run:

```bash
! rg -q '^title: Flexible Surferbot$' _projects/en-us/3_surferbot.md
! test -s assets/img/flexible-surferbot-simulation.gif
! test -s assets/img/flexible-surferbot-modal-map.png
```

Expected: all three negated checks pass, independently demonstrating that the
corresponding requirement is absent before implementation.

### Task 2: Add repository-derived media

**Files:**
- Create: `assets/img/flexible-surferbot-simulation.gif`
- Create: `assets/img/flexible-surferbot-modal-map.png`

- [ ] **Step 1: Copy the simulation GIF**

Copy `../waves_code/assets/surferbot_demo.gif` to the site asset path.

- [ ] **Step 2: Add the rendered modal map**

First verify that the source PDF has SHA-256
`6dc264167993c48e87302772593d2ed2205b62c767140137a9f03692a779c2b3` at
the `waves_code` revision `ff0a951e5b5110aa019c6c54941b1f8785982792`.
Then render the PDF deterministically with macOS `sips`:

```bash
sips -s format png ../waves_code/Julia/output/figures/plot_fig10_modal_maps_3x3.pdf --out assets/img/flexible-surferbot-modal-map.png
```

The expected render is a 705×615 PNG. Do not use any other dirty
`waves_code` artifact as an input.

- [ ] **Step 3: Verify the assets**

Run:

```bash
test -s assets/img/flexible-surferbot-simulation.gif
test -s assets/img/flexible-surferbot-modal-map.png
file assets/img/flexible-surferbot-simulation.gif assets/img/flexible-surferbot-modal-map.png
sips -g pixelWidth -g pixelHeight assets/img/flexible-surferbot-modal-map.png
```

Expected: both files exist, are nonempty, report GIF/PNG formats, and the PNG
reports a 705×615 render. Record the source GIF SHA-256
`b7c134619ea39ff399dba44badd67599191357146b3df6a76608adc1b0a9c359` before
copying it.

### Task 3: Rewrite the English case study

**Files:**
- Modify: `_projects/en-us/3_surferbot.md`

- [ ] **Step 1: Replace the page metadata and unsupported body copy**

Use `title: Flexible Surferbot` and a concise description centered on
wave-driven propulsion by a flexible raft.

- [ ] **Step 2: Preserve and label the published video first**

Keep the existing YouTube embed, explicitly captioned as the published
SurferBot demonstration and physical context. It is the first visual block
after the lead.

- [ ] **Step 3: Add the local simulation GIF and modal-map figure**

Place the repository simulation GIF immediately after the video, identifying
it as a numerical simulation. Place the modal map after the solver paragraph.
Use `figure.liquid` with explicit `alt`, `title`, and `caption` values. The
modal-map caption must say that horizontal position is motor position
`x_M/L`, vertical position is normalized flexural rigidity `κ`, colour is the
wake-asymmetry diagnostic `α`, and the columns compare the full sweep with
8-mode and 4-mode reduced models.

- [ ] **Step 4: Add concise evidence-based prose**

Mention the coupled beam/free-surface solver, reproducible sweeps/figures,
MATLAB parity, and symmetry invariants. Do not mention differentiable physics
or completed optimisation.

- [ ] **Step 5: Verify source assertions**

Run:

```bash
rg -q '^title: Flexible Surferbot$' _projects/en-us/3_surferbot.md
rg -q 'flexible-surferbot-simulation.gif' _projects/en-us/3_surferbot.md
rg -q 'flexible-surferbot-modal-map.png' _projects/en-us/3_surferbot.md
rg -q 'elvispy/flexible_surferbot' _projects/en-us/3_surferbot.md
rg -q 'Published SurferBot demonstration' _projects/en-us/3_surferbot.md
rg -q 'wave-driven flexible raft' _projects/en-us/3_surferbot.md
rg -q 'wake-asymmetry diagnostic' _projects/en-us/3_surferbot.md
rg -q 'Numerical simulation of a flexible raft and its asymmetric wake' _projects/en-us/3_surferbot.md
rg -q 'motor position.*x_M/L' _projects/en-us/3_surferbot.md
rg -q 'normalized flexural rigidity.*κ' _projects/en-us/3_surferbot.md
rg -q 'Full Sweep.*8-mode.*4-mode' _projects/en-us/3_surferbot.md
! rg -qi 'differentiable\|optimization' _projects/en-us/3_surferbot.md
```

Expected: every assertion passes.

## Chunk 2: Site verification and delivery

### Task 4: Build and inspect the generated page

**Files:**
- Test: `_site/projects/3_surferbot/index.html`

- [ ] **Step 1: Build the site**

Run:

```bash
bundle exec jekyll build
```

Expected: exit code 0.

- [ ] **Step 2: Assert generated output**

Run:

```bash
rg -q 'flexible-surferbot-simulation.gif' _site/projects/3_surferbot/index.html
rg -q 'flexible-surferbot-modal-map.png' _site/projects/3_surferbot/index.html
rg -q 'youtube.com/embed/PQF6yGAs-TA' _site/projects/3_surferbot/index.html
rg -q 'Published SurferBot demonstration' _site/projects/3_surferbot/index.html
rg -q 'wake-asymmetry diagnostic' _site/projects/3_surferbot/index.html
rg -q 'github.com/elvispy/flexible_surferbot' _site/projects/3_surferbot/index.html
rg -q 'Numerical simulation of a flexible raft and its asymmetric wake' _site/projects/3_surferbot/index.html
rg -q 'motor position.*x_M/L' _site/projects/3_surferbot/index.html
rg -q 'normalized flexural rigidity.*κ' _site/projects/3_surferbot/index.html
rg -q 'Full Sweep.*8-mode.*4-mode' _site/projects/3_surferbot/index.html
rg -q 'alt="Numerical simulation of a flexible raft and its asymmetric wake"' _site/projects/3_surferbot/index.html
rg -q 'alt="Wake-asymmetry map across motor placement and flexural rigidity"' _site/projects/3_surferbot/index.html
```

Expected: all assertions pass.

- [ ] **Step 3: Visually inspect the result**

Open the generated page or use a local screenshot at desktop and narrow
viewport widths. Confirm that the iframe, simulation GIF, modal map, captions,
and repository card have a readable order and no horizontal overflow.

### Task 5: Review and publish the focused change

**Files:**
- Modify: `_projects/en-us/3_surferbot.md`
- Create: `assets/img/flexible-surferbot-simulation.gif`
- Create: `assets/img/flexible-surferbot-modal-map.png`
- Create: `docs/superpowers/specs/2026-07-28-surferbot-case-study-design.md`
- Create: `docs/superpowers/plans/2026-07-28-surferbot-case-study.md`
- Create: `.requirements/20260728T172448Z_surferbot_case_study/REQUIREMENTS.md`

- [ ] **Step 1: Review the diff and build output**

Run `git diff --check`, inspect `git diff --stat`, and confirm no translated
project page changed.

- [ ] **Step 2: Commit and push**

```bash
git add _projects/en-us/3_surferbot.md assets/img/flexible-surferbot-* docs/superpowers/specs/2026-07-28-surferbot-case-study-design.md docs/superpowers/plans/2026-07-28-surferbot-case-study.md .requirements/20260728T172448Z_surferbot_case_study/REQUIREMENTS.md
git commit -m "content: elevate Flexible Surferbot case study"
git push origin main
```
