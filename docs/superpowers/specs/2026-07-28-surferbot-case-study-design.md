# Flexible Surferbot case-study design

## Purpose

Turn the existing English Surferbot project page into the first motion-led
case study in the site refresh. It must show a technically minded visitor what
the system does before asking them to read about it.

## Audience

Technical R&D teams are the primary audience. Academic collaborators are the
secondary audience. The page should be understandable without a fluids
background, while retaining enough numerical detail to be credible to a
specialist.

## Narrative

The case study opens with the physical demonstration, then shows the numerical
model that makes the mechanism inspectable. A flexible raft vibrates at the
free surface; an asymmetric wake produces net motion. The simulation GIF
shows the coupled raft/free-surface result. The modal map then shows how the
wake-asymmetry diagnostic varies across motor placement and normalized
flexural rigidity, including the agreement between the full sweep and reduced
models.

The page makes only claims evidenced by the repository: a Julia solver for a
coupled flexible-raft/free-surface system; parameter sweeps; figure-generation
scripts; MATLAB-parity and physics-invariant tests; and the published
SurferBot demonstration as context. It does not claim that the current solver
is differentiable or that an optimization workflow has been completed.

## Visual design

- Retain the published SurferBot YouTube demonstration as the opening visual
  context, without presenting it as this project's simulation output.
- Use the repository's `assets/surferbot_demo.gif` as the prominent numerical
  hero, copied into this site as `assets/img/flexible-surferbot-simulation.gif`.
- Render the repository's `plot_fig10_modal_maps_3x3.pdf` into
  `assets/img/flexible-surferbot-modal-map.png` for a responsive in-page
  figure. The source artifact is pinned to the `waves_code` revision
  `ff0a951e5b5110aa019c6c54941b1f8785982792`; its SHA-256 is
  `6dc264167993c48e87302772593d2ed2205b62c767140137a9f03692a779c2b3`.
  Its caption identifies the axes and the three model columns.
- Keep prose compact: a lead paragraph, a short model-and-evidence paragraph,
  concise captions, and the repository card.

## Scope

This pass changes only the English Surferbot page and adds its two local media
assets. The Spanish and Portuguese equivalents will be updated as a deliberate
translation pass after the English case study is approved.

## Acceptance criteria

1. The English page is titled `Flexible Surferbot` and introduces the project
   as a wave-driven flexible raft simulation.
2. The page contains the YouTube demonstration, the local simulation GIF, and
   the local modal-map PNG with descriptive captions.
3. Every technical statement is supported by the current repository or the
   cited published demonstration; no differentiable-physics or completed-
   optimization claim remains.
4. The page retains its repository card for `elvispy/flexible_surferbot`.
5. A Jekyll production build succeeds and the generated Surferbot page
   references both local visual assets.
