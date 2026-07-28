# Multi-fidelity bioreactor case-study implementation plan

> **For implementation:** execute only after independent plan review. Work on
> `main` is explicitly authorized by the user; commit and push accepted work.

## Sources of truth

- Repository README at source revision
  `262925ca3752ed2f9ddbf196186653b51acf9289`.
- Paper DOI: `10.1016/j.ijmultiphaseflow.2025.105375`.
- Detailed media provenance is in
  `docs/superpowers/specs/2026-07-28-bioreactor-case-study-design.md`.

## Task 1: Establish red checks

Run before touching page/media:

```bash
! rg -q '^title: Multi-fidelity design for rocking bioreactors$' _projects/en-us/0_bioreactor.md
! test -s assets/img/bioreactor-interface-hero.mp4
! test -s assets/img/bioreactor-fill-sweep.png
```

Before drafting the personal-contribution paragraph, inspect public repository
history/contributor evidence and record the specific source-backed contribution
to be named. At the pinned source revision, the verified statement is: the
author built the project’s decision and reproducibility layer—an end-to-end
multi-fidelity Bayesian-optimization testbed, parameter-validation fixes,
CI-deployed documentation, tutorials/figure pipeline, and validation records.
Do not infer sole authorship of the CFD method or published paper.

## Task 2: Add media deterministically

Obtain and verify the public source artifacts before rendering. A pre-existing
temporary copy is acceptable only when its SHA-256 matches the pinned value;
otherwise download it from the pinned revision:

```bash
curl -L -o /tmp/bioreactor-volume-fraction-lab.mp4 https://raw.githubusercontent.com/rcsc-group/multi-fidelity-bioreactor/262925ca3752ed2f9ddbf196186653b51acf9289/docs/canonical_case/volume_fraction_lab.mp4
curl -L -o /tmp/bioreactor-heatmap-fill-l8.pdf https://raw.githubusercontent.com/rcsc-group/multi-fidelity-bioreactor/262925ca3752ed2f9ddbf196186653b51acf9289/experiments/sweep_fb_fill_l8_mpi_ckpt/figures/heatmap_fill_sweep_l8.pdf
shasum -a 256 /tmp/bioreactor-volume-fraction-lab.mp4 | rg -q '5310f2404d80ba061a03cb9647c7c68d965bcd69aeca785edabfad5d674846d2'
shasum -a 256 /tmp/bioreactor-heatmap-fill-l8.pdf | rg -q 'caa10dd9102ed39254427a44a4d73a94a801ee6f97b131dcc306d45c50e5f98b'
```

Then render the derived site assets:

```bash
ffmpeg -y -ss 120 -t 18 -i /tmp/bioreactor-volume-fraction-lab.mp4 -an \
  -vf 'crop=680:266:260:0,scale=1200:470,pad=1200:674:0:102:color=0x111827,fps=12' \
  -movflags +faststart assets/img/bioreactor-interface-hero.mp4
sips -s format png /tmp/bioreactor-heatmap-fill-l8.pdf --out assets/img/bioreactor-fill-sweep.png
```

Check dimensions and checksums against the design document:

```bash
ffprobe -v error -show_entries stream=width,height -of default=noprint_wrappers=1 assets/img/bioreactor-interface-hero.mp4 | rg -q 'width=1200' && ffprobe -v error -show_entries stream=width,height -of default=noprint_wrappers=1 assets/img/bioreactor-interface-hero.mp4 | rg -q 'height=674'
shasum -a 256 assets/img/bioreactor-interface-hero.mp4 | rg -q '7156e1e6a00a3b0d8ad50160ec015c8b5e4534f1868695882e6ebda0f27f25fc'
sips -g pixelWidth -g pixelHeight assets/img/bioreactor-fill-sweep.png | rg -q 'pixelWidth: 699' && sips -g pixelWidth -g pixelHeight assets/img/bioreactor-fill-sweep.png | rg -q 'pixelHeight: 944'
```

## Task 3: Rewrite the English page

Replace `_projects/en-us/0_bioreactor.md` with the approved structure:

- title and metadata from the requirements;
- lead with the engineering decision problem;
- valid explicit HTML `<video>` hero immediately after the lead with
  `autoplay`, `muted`, `loop`, and `controls`, including a closing `</video>`;
  caption it clearly as numerical two-phase CFD. Do not use `video.liquid`,
  because its self-closing video element is invalid HTML;
- solver/decision paragraph; then `figure.liquid` heatmap;
- DOI/paper, documentation, and `rcsc-group/multi-fidelity-bioreactor`
  repository links.

The prose must explain the coupled oxygen-transfer/shear decision, why
multi-fidelity sampling changes the accessible design space, and the verified
personal contribution. Require at least 250 post-front-matter words. Avoid
generic innovation, transformative, or future-of-biotech language.

Do not modify translated project pages.

## Task 4: Source-level verification

Run and require all success:

```bash
test -s assets/img/bioreactor-interface-hero.mp4
test -s assets/img/bioreactor-fill-sweep.png
rg -q '^title: Multi-fidelity design for rocking bioreactors$' _projects/en-us/0_bioreactor.md
rg -q '10.1016/j.ijmultiphaseflow.2025.105375' _projects/en-us/0_bioreactor.md
rg -q 'rcsc-group/multi-fidelity-bioreactor' _projects/en-us/0_bioreactor.md
rg -q 'Basilisk' _projects/en-us/0_bioreactor.md
rg -qi "Henry's law" _projects/en-us/0_bioreactor.md
rg -q 'KRR-LR-GPR' _projects/en-us/0_bioreactor.md
rg -q 'Expected Improvement' _projects/en-us/0_bioreactor.md
rg -qi 'oxygen.*shear|shear.*oxygen' _projects/en-us/0_bioreactor.md
rg -qi 'low.fidelity.*high.fidelity|high.fidelity.*low.fidelity' _projects/en-us/0_bioreactor.md
test "$(awk 'BEGIN {delims = 0} /^---$/ {delims++; next} delims >= 2 {words += NF} END {print words + 0}' _projects/en-us/0_bioreactor.md)" -ge 250
! rg -qi 'Bayesian Fusion\|field-attributed\|biomass growth-rate\|stirred-tank\|multi-million' _projects/en-us/0_bioreactor.md
! rg -qi 'innovation|transformative|future.of.biotech' _projects/en-us/0_bioreactor.md
video_line=$(rg -n 'bioreactor-interface-hero.mp4' _projects/en-us/0_bioreactor.md | head -1 | cut -d: -f1); map_line=$(rg -n 'bioreactor-fill-sweep.png' _projects/en-us/0_bioreactor.md | head -1 | cut -d: -f1); test "$video_line" -lt "$map_line"
rg -qi 'numerical.*two.phase.*CFD|two.phase.*CFD.*numerical' _projects/en-us/0_bioreactor.md
rg -qi 'fill level' _projects/en-us/0_bioreactor.md
rg -qi 'rocking frequency' _projects/en-us/0_bioreactor.md
rg -qi 'kLa' _projects/en-us/0_bioreactor.md
rg -qi 'mixing time' _projects/en-us/0_bioreactor.md
rg -qi 'shear stress' _projects/en-us/0_bioreactor.md
rg -qi 'decision and reproducibility layer' _projects/en-us/0_bioreactor.md
git diff --check
```

Then inspect the media assets and diff visually. Do not run or install local
Ruby/Bundler dependencies; GitHub Actions is the authoritative Jekyll build.

## Task 5: Commit, push, and verify deployment

Commit as:

```text
content: rebuild bioreactor case study
```

Push `main`, then identify and verify the commit-specific deployment:

```bash
commit_sha=$(git rev-parse HEAD)
run_id=''
for attempt in 1 2 3 4 5; do
  run_id=$(gh run list --commit "$commit_sha" --workflow 'Deploy site' --json databaseId --jq '.[0].databaseId')
  test -n "$run_id" && break
  sleep 6
done
test -n "$run_id"
gh run watch "$run_id" --exit-status
```

If the run fails, inspect `gh run view "$run_id" --log-failed` before deciding
whether the failure is caused by the change. Do not call an error harmless
merely because it predates the change.
