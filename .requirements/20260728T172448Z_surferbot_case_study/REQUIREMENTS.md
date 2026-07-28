# Requirements: Surferbot case study

## As Is

`_projects/en-us/3_surferbot.md` is an academic-style project page titled
"Interfacial locomotion." It embeds a published YouTube demonstration and
contains claims about differentiable physics and optimisation that are not
established by the current `elvispy/flexible_surferbot` repository README.
The site contains an older `assets/img/surferbot.gif`, but the active project
repository has a clearer simulation GIF and a paper figure showing modal
asymmetry maps.

## To Be

The English page becomes a compact, visual case study titled "Flexible
Surferbot." It distinguishes the published demonstration from this project's
simulation output, uses the repository's simulation GIF and a rendered modal
map locally, and states only verified solver, sweep, and test capabilities.

## Requirements

1. Reframe the page around a flexible raft, wave asymmetry, and resulting
   propulsion.
2. Preserve the YouTube demonstration as physical context.
3. Add a local simulation GIF from the active repository and a local PNG
   derived from the repository's modal-map figure.
4. Replace unsupported differentiable-physics and completed-optimisation
   assertions with verified implementation evidence.
5. Keep the active repository card.
6. Do not edit translated pages in this pass.
7. Derive the modal-map PNG from
   `../waves_code/Julia/output/figures/plot_fig10_modal_maps_3x3.pdf` at
   `ff0a951e5b5110aa019c6c54941b1f8785982792`, verifying its recorded
   SHA-256 before conversion.

## Acceptance Criteria

1. The page source contains `title: Flexible Surferbot` and a concise
   wave-driven-propulsion description.
2. The rendered HTML contains the YouTube iframe plus both new local asset
   paths.
3. The hero caption identifies the GIF as a simulation, not experimental
   footage.
4. The modal-map caption accurately identifies motor position, normalized
   flexural rigidity, asymmetry, and the full/8-mode/4-mode comparison.
5. `bundle exec jekyll build` exits successfully.
6. Git diff is limited to the English page, its two assets, and this planning
   documentation.
7. The generated page is visually inspected at desktop and narrow widths.

## Testing Plan

1. Before implementation, run three separate negated static assertions for
   the new title and both asset paths; each must pass by confirming its
   requirement is absent.
2. After each media addition, assert that the file exists and has a nonzero
   size.
3. After page editing, assert the source contains the required title, media
   paths, repository identifier, and no `differentiable` or `optimization`
   wording.
4. Build the site with `bundle exec jekyll build`; assert that the generated
   Surferbot HTML has the video context label, both assets, accurate figure
   captions, image alt/title attributes, and the repository card.
5. Inspect the built page at desktop and narrow viewport widths.

## Implementation Plan

1. Run the failing static assertions for the planned title and asset paths.
2. Copy the repository simulation GIF and render/copy the modal-map PNG into
   `assets/img/`; verify each asset exists and is nonempty.
3. Rewrite `_projects/en-us/3_surferbot.md` with a compact lead, clear visual
   separation between demonstration and simulation, a modal-map figure, and
   evidence-based technical prose.
4. Re-run static assertions and the Jekyll production build.
5. Inspect the generated page content, review the diff, commit, and push the
   focused Surferbot case-study update.
