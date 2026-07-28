# Flexible Surferbot narrative rebuild plan

> **For implementation:** execute only after independent plan review. The user
> explicitly authorized committing and pushing accepted work on `main`.

## Source and media provenance

Source repository: `waves_code` at
`ff0a951e5b5110aa019c6c54941b1f8785982792`.

- Existing simulation GIF:
  `assets/surferbot_demo.gif`, SHA-256
  `b7c134619ea39ff399dba44badd67599191357146b3df6a76608adc1b0a9c359`.
- Replacement single heatmap:
  `Julia/output/figures/plot_thrust_beam_and_LH_LH_cbrt.pdf`, SHA-256
  `7748b4ddb0da9dbb936c9437ca4db9246b8240d4eb3d29ae16b2ba4bc5ecf1c0`.
  Render it using:

  ```bash
  sips -s format png ../waves_code/Julia/output/figures/plot_thrust_beam_and_LH_LH_cbrt.pdf \
    --out assets/img/flexible-surferbot-thrust-map.png
  ```

  Expected PNG dimensions: 615×480.

## Task 1: Establish red checks

Run before edits:

```bash
! test -s assets/img/flexible-surferbot-thrust-map.png
rg -q 'flexible-surferbot-thrust-map.png' _projects/en-us/3_surferbot.md
```

## Task 2: Replace the page figure asset

Verify both pinned source assets before changing website media:

```bash
shasum -a 256 ../waves_code/assets/surferbot_demo.gif | rg -q 'b7c134619ea39ff399dba44badd67599191357146b3df6a76608adc1b0a9c359'
shasum -a 256 ../waves_code/Julia/output/figures/plot_thrust_beam_and_LH_LH_cbrt.pdf | rg -q '7748b4ddb0da9dbb936c9437ca4db9246b8240d4eb3d29ae16b2ba4bc5ecf1c0'
```

Render the source PDF to the planned PNG, inspect it visually, and retire the
previous multi-panel figure from the website.

## Task 3: Rebuild the English narrative

Rewrite `_projects/en-us/3_surferbot.md` so it follows this exact progression:

1. **The surprise.** A compact paragraph: off-center vibration changes the
   radiated wave field; an asymmetric wake yields a directional momentum flux.
2. **The moving evidence.** Keep the published demonstration/video first, then
   the numerical GIF immediately after it. Retain clear captions separating
   experiment from calculation.
3. **Why computation is needed.** Explain that rigidity and motor placement
   interact through a coupled beam/free-surface system; neither a static
   deformation nor motor placement alone determines thrust.
4. **Personal contribution.** State that the author created a reproducible
   Julia analysis workflow with sweeps, modal reduction, MATLAB parity tests,
   and the symmetric-benchmark zero-net-thrust invariant. Qualify the
   invariant: in the reflection-symmetric, pure-gravity benchmark, centered
   forcing must produce zero net thrust; otherwise the discretization has
   manufactured propulsion. Do not generalize this check to cases where
   capillary edge terms physically break that exact symmetry.
5. **The design map.** Use the single heatmap and a caption explaining
   `x_M/L`, `κ`, direction-changing red/blue thrust, and the marked published
   cases. Link the repository.

Keep language concrete. Do not use the words `differentiable` or
`optimization`, and do not manually modify translations.

## Task 4: Source checks

```bash
shasum -a 256 ../waves_code/Julia/output/figures/plot_thrust_beam_and_LH_LH_cbrt.pdf | rg -q '7748b4ddb0da9dbb936c9437ca4db9246b8240d4eb3d29ae16b2ba4bc5ecf1c0'
test -s assets/img/flexible-surferbot-simulation.gif
test -s assets/img/flexible-surferbot-thrust-map.png
sips -g pixelWidth -g pixelHeight assets/img/flexible-surferbot-thrust-map.png | rg -q 'pixelWidth: 615' && sips -g pixelWidth -g pixelHeight assets/img/flexible-surferbot-thrust-map.png | rg -q 'pixelHeight: 480'
video_line=$(rg -n 'Published SurferBot demonstration' _projects/en-us/3_surferbot.md | head -1 | cut -d: -f1); gif_line=$(rg -n 'flexible-surferbot-simulation.gif' _projects/en-us/3_surferbot.md | head -1 | cut -d: -f1); map_line=$(rg -n 'flexible-surferbot-thrust-map.png' _projects/en-us/3_surferbot.md | head -1 | cut -d: -f1); test "$video_line" -lt "$gif_line" && test "$gif_line" -lt "$map_line"
rg -qi 'asymmetric.*momentum|momentum.*asymmetric' _projects/en-us/3_surferbot.md
rg -qi 'motor placement' _projects/en-us/3_surferbot.md
rg -qi 'flexural rigidity' _projects/en-us/3_surferbot.md
rg -qi 'Julia.*sweeps|sweeps.*Julia' _projects/en-us/3_surferbot.md
rg -qi 'modal reduction' _projects/en-us/3_surferbot.md
rg -qi 'MATLAB parity' _projects/en-us/3_surferbot.md
rg -qi 'symmetric benchmark' _projects/en-us/3_surferbot.md
rg -qi 'zero.?net.?thrust' _projects/en-us/3_surferbot.md
rg -qi 'pure.gravity' _projects/en-us/3_surferbot.md
rg -qi 'coupled.*beam.*free.surface|free.surface.*beam' _projects/en-us/3_surferbot.md
rg -qi 'not.*obvious|non-monotonic|not monotonic' _projects/en-us/3_surferbot.md
rg -qi 'physical.*demonstration|published.*demonstration' _projects/en-us/3_surferbot.md
rg -qi 'numerical.*simulation|simulation.*numerical' _projects/en-us/3_surferbot.md
rg -q "repository='elvispy/flexible_surferbot'" _projects/en-us/3_surferbot.md
rg -q 'x_M/L' _projects/en-us/3_surferbot.md && rg -q 'κ' _projects/en-us/3_surferbot.md
rg -qi 'normalized.*thrust|thrust.*normalized' _projects/en-us/3_surferbot.md
rg -qi 'red.*blue.*direction|blue.*red.*direction' _projects/en-us/3_surferbot.md
rg -qi 'paper.*cases|marked.*cases' _projects/en-us/3_surferbot.md
test "$(awk 'BEGIN {delims = 0} /^---$/ {delims++; next} delims >= 2 {words += NF} END {print words + 0}' _projects/en-us/3_surferbot.md)" -ge 225
! git diff --name-only HEAD | rg '^_projects/(es|pt-br)/'
! rg -qi 'differentiable|optimization' _projects/en-us/3_surferbot.md
! rg -qi 'innovation|transformative|future.of.robotics' _projects/en-us/3_surferbot.md
git diff --check
```

Inspect the rewritten prose and both page visuals. Do not install local Ruby
or Bundler dependencies. GitHub Actions is the authoritative Jekyll build.

## Task 5: Commit, push, and verify

Commit as:

```text
content: deepen Flexible Surferbot story
```

Push `main`, then verify the matching GitHub Actions `Deploy site` workflow
succeeds. Inspect the deployed card at page width after that run: confirm the
video, GIF, and single 615×480 heatmap form a coherent sequence. If no visual
inspection is available, report that as unverified rather than calling the
card visually accepted. Diagnose any new failures rather than dismissing them
as pre-existing.
