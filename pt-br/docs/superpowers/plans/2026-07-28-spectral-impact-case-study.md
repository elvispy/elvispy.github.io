# Spectral-impact case-study implementation plan

> **For agentic workers:** REQUIRED: Use `superpowers:subagent-driven-development` (if subagents available) or `superpowers:executing-plans` to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the English deformable-impact portfolio card as an evidence-led lineage culminating in `SpectralKM.jl`.

**Architecture:** The card remains one Markdown page (`_projects/en-us/1_KM.md`) so its URL and project ordering stay stable. Repository-owned GIFs are copied into `assets/img/` from revisions pinned in the design spec, then converted to controllable MP4s with static first-frame posters. Captions state only what each media file establishes. The English-visible repository list moves from retired `km-*` repositories to the two canonical Julia repositories. Spanish and Portuguese content stays unchanged.

**Tech Stack:** Jekyll/Markdown/Liquid, GitHub Pages deployment, source GIF assets, GitHub Actions.

---

**Acceptance base:** `e6a46f3c4133baeed93dd5da548f814808e94d02`.

## Chunk 1: Provenance-controlled media

### Task 1: Bring the canonical animations into the site

**Files:**
- Create: `assets/img/spectralkm-impact.gif`
- Create: `assets/img/droprebound-oldroyd-b.gif`
- Create: `assets/img/droprebound-carreau.gif`
- Modify: `docs/superpowers/specs/2026-07-28-spectral-impact-card-design.md` only if a source revision changes

- [x] **Step 1: Retrieve the expected source artefacts at the pinned revisions**

  Retrieve the exact paths and revisions recorded in the design spec. Do not use
  a branch name or pre-existing `/tmp` copy as source authority. Verify the
  resulting digests against the three expected values in that spec:

  ```bash
  shasum -a 256 /tmp/spectralkm-impact-pinned.gif /tmp/droprebound-ob-pinned.gif /tmp/droprebound-st-pinned.gif
  ```

  Expected: three non-empty GIFs with source paths:
  `SpectralKM.jl/assets/impact_demo.gif`,
  `DropRebound.jl/docs/impact_ob.gif`, and
  `DropRebound.jl/docs/impact_st.gif`, at the pinned revisions and checksums.

- [x] **Step 2: Copy the verified source media to their final site paths**

  Keep filenames descriptive and do not recompress or crop them. The GIFs remain
  exact repository outputs and are the authority for later browser derivatives.

- [x] **Step 3: Verify the copied media contract**

  Run:

  ```bash
  file assets/img/spectralkm-impact.gif assets/img/droprebound-oldroyd-b.gif assets/img/droprebound-carreau.gif
  shasum -a 256 assets/img/spectralkm-impact.gif assets/img/droprebound-oldroyd-b.gif assets/img/droprebound-carreau.gif
  ```

  Expected: valid GIFs and matching source checksums.

- [x] **Step 4: Commit the media provenance slice**

  ```bash
  git add assets/img/spectralkm-impact.gif assets/img/droprebound-oldroyd-b.gif assets/img/droprebound-carreau.gif
  git commit -m "assets: add canonical impact simulations"
  ```

### Task 1b: Create controllable browser derivatives

**Files:**
- Create: `assets/img/spectralkm-impact.mp4`
- Create: `assets/img/droprebound-oldroyd-b.mp4`
- Create: `assets/img/droprebound-carreau.mp4`
- Create: `assets/img/spectralkm-impact-poster.png`
- Create: `assets/img/droprebound-oldroyd-b-poster.png`
- Create: `assets/img/droprebound-carreau-poster.png`

- [x] Convert each pinned GIF to a controllable H.264 MP4 with ffmpeg 7.1.1.
  Preserve each source frame and geometry. The odd-height 640x441 SpectralKM
  animation requires a one-pixel bottom pad in its 640x442 `yuv420p` MP4; the
  source GIF remains unmodified.
- [x] Extract a lossless first-frame PNG poster for each video. Use the
  SpectralKM poster as the project-card image.
- [x] Record the source relationship, dimensions, and SHA-256 digests in the
  design spec, and verify all derivatives with `file`, `ffprobe`, and `shasum`.

## Chunk 2: English narrative and canonical links

### Task 2: Write the lineage-led English case study

**Files:**
- Modify: `_projects/en-us/1_KM.md`
- Modify: `_data/repositories.yml`
- Test: structural assertions over those two files

- [x] **Step 1: Establish the failing content contract**

  Run:

  ```bash
  rg -q "Building the next generation of deformable-impact software" _projects/en-us/1_KM.md
  test -f assets/img/spectralkm-impact.gif
  rg -q "elvis-aguero/SpectralKM.jl" _data/repositories.yml
  ```

  Expected: failure before the page and repository list are changed.

- [x] **Step 2: Replace the stale English card with the approved narrative**

  The front matter uses the SpectralKM animation. The body uses these sections, in
  this order:

  1. The approved opening: "Impact looks simple. Its numerical core is not."
  2. A compact lineage from membrane impact through solid, bath, rheology, and
     explicit contact dynamics. Keep the 2022 membrane GIF as a small historical
     figure; state only that it depicts the rigid-sphere / elastic-membrane model.
  3. A substantially longer `SpectralKM.jl` section explaining that bath, drop,
     contact pressure, and contact extent are all solved in a spectral Newtonian
     drop--bath model. The documented water reference case may be named with its
     `We`, `Bo`, `Oh`, and radius only as recorded in the design spec.
  4. A short `DropRebound.jl` section that identifies the Oldroyd-B and Carreau
     cases without making a comparison claim or calling the in-preparation paper
     published.
  5. A short open-source statement tied to concrete public artefacts.

  Use the controllable MP4 derived from the SpectralKM GIF as the lead figure and
  its first-frame PNG as the front-matter image. Caption its bath, drop, red
  contact arc, and solved-pressure inset, while warning that the pointwise
  pressure is not a converged quantity. Use controllable DropRebound MP4s only
  as separately labelled numerical examples. Do not use the pre-existing
  `drop.mp4`: its configuration is unverified. Retain the existing citations
  only if their surrounding claims remain exactly supported.

  Delete all stale claims about universal differentiability, finite-element
  compatibility, adjoint readiness, biological interfaces, and conventional CFD
  failures.

- [x] **Step 3: Replace active repository entries**

  Remove the three obsolete `km-*` entries from `_data/repositories.yml` and add
  `elvis-aguero/SpectralKM.jl` and `elvis-aguero/DropRebound.jl`. Place the
  canonical repositories first so the global repository component reflects the
  flagship work.

- [x] **Step 4: Verify the content contract and translation boundary**

  Run:

  ```bash
  rg -q "Building the next generation of deformable-impact software" _projects/en-us/1_KM.md
  rg -q "SpectralKM.jl" _projects/en-us/1_KM.md
  rg -q "DropRebound.jl" _projects/en-us/1_KM.md
  ! rg -n "adjoint|biological interfaces|compatible with finite" _projects/en-us/1_KM.md
  git diff --exit-code e6a46f3c4133baeed93dd5da548f814808e94d02 -- _projects/es/1_KM.md _projects/pt-br/1_KM.md
  ```

  Expected: the first three checks pass, the forbidden-claim check has no output,
  and the translation diff is empty.

- [x] **Step 5: Commit the page and repository slice**

  ```bash
  git add _projects/en-us/1_KM.md _data/repositories.yml
  git commit -m "content: rebuild spectral impact case study"
  ```

## Chunk 3: Site acceptance

### Task 3: Validate the deployed page

**Files:**
- Verify: `_projects/en-us/1_KM.md`
- Verify: `assets/img/spectralkm-impact.gif`
- Verify: `assets/img/droprebound-oldroyd-b.gif`
- Verify: `assets/img/droprebound-carreau.gif`
- Verify: `assets/img/spectralkm-impact.mp4`
- Verify: `assets/img/droprebound-oldroyd-b.mp4`
- Verify: `assets/img/droprebound-carreau.mp4`
- Verify: `assets/img/spectralkm-impact-poster.png`

- [ ] **Step 1: Inspect the final diff for scope**

  Run:

  ```bash
  git diff e6a46f3c4133baeed93dd5da548f814808e94d02..HEAD --check
  git status --short
  ```

  Expected: no whitespace errors and no edits to translations or unrelated site files.

- [ ] **Step 2: Push the intentional commits**

  Run:

  ```bash
  git push origin main
  ```

- [ ] **Step 3: Use the authoritative GitHub Actions deployment**

  Inspect the matching `Deploy site` workflow run and require `success`. Do not
  install or update local Bundler dependencies; the user directed us to defer
  builds to Actions.

- [ ] **Step 4: Check the live HTML contract**

  Fetch `https://elvispy.github.io/projects/1_KM/` with a cache-busting query.
  Confirm the title, the three local MP4 paths, the SpectralKM poster path, both
  canonical repository names, and the absence of the retired claims. This is a structural live-page check,
  not a claim of browser-responsive visual review.

- [ ] **Step 5: Report provenance and known CI debt clearly**

  Report source repository paths and checksums, deployment status, and any
  pre-existing workflow failures separately from the deployment result. Do not
  mark external link-check or formatting failures as ignored.
