# Multi-fidelity bioreactor case-study design

## Purpose

Replace a speculative, outdated project narrative with a compact engineering
case study for `rcsc-group/multi-fidelity-bioreactor`: the published
two-phase rocking-bioreactor solver and its multi-fidelity Bayesian
optimization workflow. The page must explain a difficult decision, not attach
scientific assets to a generic tooling summary.

## Audience and tone

Primary audience: technically demanding industry R&D teams. Secondary
audience: computational-science and open-source collaborators. The page must
show why oxygen transfer and shear are coupled process constraints, how the
model makes their trade-off visible, and what the author specifically built or
operationalized. It must not make broad cultivated-meat market claims.

## Page structure

1. **Title and lead.** `Multi-fidelity design for rocking bioreactors`.
   Explain the surprise: changing the rocking motion reshapes the free surface
   that simultaneously governs oxygen transfer and shear exposure. Establish
   the decision: screen cheaply, then spend high-fidelity CFD only where it
   changes the design choice.
2. **Moving physical evidence.** An 18-second cropped version of the
   repository's canonical two-phase volume-fraction simulation. The crop
   enlarges the rocking free surface without changing its content. Caption it
   as a numerical two-phase simulation.
3. **Model and decision loop.** Precisely describe Basilisk VOF hydrodynamics,
   dissolved-oxygen transport via Henry's law, and kLa/shear objectives. State
   the KRR-LR-GPR surrogate and Expected Improvement selection rule without
   overselling autonomous design. Explain why a low-fidelity screen expands
   the accessible design space, while selected high-fidelity cases correct the
   surrogate where physics matters most.
4. **Inspectable design evidence.** A fill-level sweep heatmap with a caption
   that identifies the changing parameters and the displayed KPI families.
5. **Personal contribution and proof links.** State a source-verified,
   concrete contribution from repository history; then give the paper DOI,
   repository card, and documentation link.

## Deliberate exclusions

- No unsupported Bayesian-fusion, field-attribution, biomass-growth, or
  stirred-tank claims.
- No invented experimental validation claim.
- No market-size or cost rhetoric.
- No vague claim of contribution; verify it before writing it.

## Verified contribution to name

Public repository history attributes 171 commits to `elvispy` and one to
`elvis-aguero` at the pinned source revision. The page may accurately state
that the author built the project’s decision and reproducibility layer around
the solver: an end-to-end multi-fidelity Bayesian-optimization testbed,
parameter-validation fixes, CI-deployed documentation, tutorials/figure
pipeline, and validation/experiment records. It must not claim sole authorship
of the CFD method or the published paper.
- No manual Spanish or Portuguese edits.

## Media provenance

Source repository: `rcsc-group/multi-fidelity-bioreactor` at
`262925ca3752ed2f9ddbf196186653b51acf9289`.

| Site asset | Source | Source SHA-256 | Transformation |
| --- | --- | --- | --- |
| `assets/img/bioreactor-interface-hero.mp4` | `docs/canonical_case/volume_fraction_lab.mp4` | `5310f2404d80ba061a03cb9647c7c68d965bcd69aeca785edabfad5d674846d2` | 18-second 12-fps crop of the central reactor, scaled and padded to 1200×674; derived SHA-256 `7156e1e6a00a3b0d8ad50160ec015c8b5e4534f1868695882e6ebda0f27f25fc`. |
| `assets/img/bioreactor-fill-sweep.png` | `experiments/sweep_fb_fill_l8_mpi_ckpt/figures/heatmap_fill_sweep_l8.pdf` | `caa10dd9102ed39254427a44a4d73a94a801ee6f97b131dcc306d45c50e5f98b` | PNG rendered with `sips`; 699×944; derived SHA-256 `91ccb021633f3d0c6f761f103da57868ade1348693230a908f44de5e767b2391`. |

The hero animation exists to make the modeled interface tangible. The heatmap
is the visual proof of the actual design-space trade-offs. Neither should be
decorative.
