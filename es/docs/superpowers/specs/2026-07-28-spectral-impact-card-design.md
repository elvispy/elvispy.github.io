# Spectral-impact case-study design

## Purpose

Replace the stale English `Kinematic Match` project card with a clear account of
the deformable-impact software lineage. The card must position `SpectralKM.jl` as
the current spectral formulation. Earlier models remain as the work that exposed
the limits addressed by later ones, not as competing flagships.

## Audience and voice

The primary reader is an elite industrial R&D hiring team. The secondary reader
is an academic or open-source collaborator. Write in a direct first-person
portfolio voice. State what each code solves and what its evidence supports.
Do not use generic importance framing, inflated novelty claims, or unsupported
claims about optimization, generality, or publication status.

## Narrative

Title: **Building the next generation of deformable-impact software**

Opening:

> Impact looks simple. Its numerical core is not. A drop deforms, a contact
> region appears, pressure redistributes, and the bodies separate or remain
> together. The contact law decides much of the answer. I build models that put
> progressively less of that law in by hand.

The card then follows the lineage in compact prose:

1. The 2022 rigid-sphere / elastic-membrane model established the initial
   kinematic-match formulation.
2. A drop-on-solid solver moved the problem to a liquid interface.
3. A drop-on-bath model introduced two deformable liquid interfaces.
4. `DropRebound.jl` extended the solid-substrate branch to Newtonian,
   Oldroyd-B, and Carreau rheology. Its associated manuscript remains in
   preparation and must not be presented as published work.
5. Contact-dynamics work made pressure and contact extent explicit unknowns.
6. `SpectralKM.jl` is the current model: Fourier--Bessel bath modes, Legendre
   drop modes, a shifted-Legendre pressure representation, and an outer
   feasibility-filtered search for the contact patch. It is a Newtonian,
   non-coalescing drop--bath model; its documented reference case is water with
   `We = 1.0958`, `Bo = 0.017`, and `Oh = 0.006` for `R = 0.35 mm`.

The SpectralKM section receives most of the text. It must explain the modelling
advance in high-signal terms: pressure shape is not prescribed, the contact patch
is not selected by a mesh-scale tangency test, and both liquid interfaces remain
in the solve. Do not spend portfolio space on the documented reference-case
parameter tuple. Do not claim that spectral methods universally invalidate
mesh-based methods. Keep the numerical caveat only insofar as it explains why a
pointwise pressure trace is a diagnostic, not a polished field to over-interpret.

Close with a short open-source statement: the work is released as Julia
packages with tests, executable derivations, diagnostics, validation material,
parameter sweeps, and rendering scripts. Avoid reducing open source to a link
list.

## Visuals

Use source-controlled outputs from the canonical repositories, copied into the
site so deployment does not depend on third-party hotlinks. The remote media is
pinned to the following immutable source revisions and SHA-256 checksums:

| Site path | Source | Revision | SHA-256 | Depiction |
| --- | --- | --- | --- | --- |
| `assets/img/spectralkm-impact.gif` | `SpectralKM.jl/assets/impact_demo.gif` | `9d3be1dedddc1e84b9bc91cd4af0945492e7ad23` | `4e16895dc895a9b3e958664b73412cc972060d0537e21b35735a5ffeb38c7db7` | 640x441 bath-impact simulation |
| `assets/img/droprebound-oldroyd-b.gif` | `DropRebound.jl/docs/impact_ob.gif` | `9f9f41dca13775e2b270be2a6516359a2aed3670` | `19265179649932d7b24e4225566eee92a2c22dd2e4d08ec05fc251ce95c3c3c7` | 540x540 Oldroyd-B solid-substrate case |
| `assets/img/droprebound-carreau.gif` | `DropRebound.jl/docs/impact_st.gif` | `9f9f41dca13775e2b270be2a6516359a2aed3670` | `3a777b9c35675131c593b73119daea231c51d128c89ca3a078ece3e2371e66e7` | 540x540 Carreau solid-substrate case |

The GIFs are retained as provenance-controlled source animations. The page uses
the following derived MP4 files so that each animation has native playback
controls, and first-frame PNG posters so it has a static initial state. The
derivatives were made locally with ffmpeg 7.1.1, H.264 (`libx264`, CRF 18,
`yuv420p`, fast-start) for video and lossless PNG first-frame extraction for
posters. The 441-pixel SpectralKM source is padded by one pixel at the bottom in
its MP4 only because `yuv420p` requires an even height; no source GIF is cropped
or changed.

| Site path | Derived from | Output | SHA-256 |
| --- | --- | --- | --- |
| `assets/img/spectralkm-impact.mp4` | `spectralkm-impact.gif` | 640x442 MP4; one-pixel bottom padding | `282c9213ec59ab4780ca3b0ed5e5d4ea0a87000656e04f2780cf7e010676a7f9` |
| `assets/img/droprebound-oldroyd-b.mp4` | `droprebound-oldroyd-b.gif` | 540x540 MP4 | `6952e9d3c2bc64753a92130ab03b11785483f191834f145030d43b91c826e2f1` |
| `assets/img/droprebound-carreau.mp4` | `droprebound-carreau.gif` | 540x540 MP4 | `69fa9db71e92d0ef69916ba9d732f415a76fe843a934925c3d8a88be9cb33822` |
| `assets/img/spectralkm-impact-poster.png` | first frame of `spectralkm-impact.gif` | 640x441 PNG | `5b44b20383a697d6b37308d615a943e805d711317cea1226c0c4a7756f5a4161` |
| `assets/img/droprebound-oldroyd-b-poster.png` | first frame of `droprebound-oldroyd-b.gif` | 540x540 PNG | `ca74a80877b50ac33fc94e8bb63037cc944da5f57c6d08c98e1b78b237c1256d` |
| `assets/img/droprebound-carreau-poster.png` | first frame of `droprebound-carreau.gif` | 540x540 PNG | `388fee52326001bdc2b00b4115019346ebb175f8df12202f5fcf6e103b742b28` |

The original site also contains a 600x317 membrane asset,
`assets/img/km-sphere.gif` (`b1728ed66d645f2cfeb29d9585f6aa3ac2034f8c1d540df79822c2ebabeb9165`),
last changed in site commit `08414226b64510426be2ad17da0112117ddcbf8d`.
It may remain as historical visual evidence for the 2022 membrane work. Its
site-history provenance is known, but its original simulation revision is not,
so its caption must stay descriptive and make no quantitative claim.

`assets/img/drop.mp4` is a pre-existing legacy bath asset introduced in site
commit `563eccdb7f1ee73a69aa30d59c0d827babf1377e`
(`234c77139a6bb356a1ed3490bdd498b268e4451d7678bc84c9d7c36ff0e1dba4`).
Its simulation configuration is not established. Do not use it on the rebuilt
English card or treat it as evidence. Separate legacy media for the intermediate
Newtonian-solid and explicit-contact stages has not yet been verified; their
place in the written lineage does not license invented visual evidence.

- Lead with the controllable MP4 derived from the `SpectralKM.jl` bath-impact
  GIF. Its static first-frame poster is also the project-card image. The caption
  identifies dark blue as bath, pale blue as drop, the red arc as the solved
  contact patch, and the inset as the solved pressure profile. It must not imply
  that the displayed pointwise pressure is converged.
- Use the membrane GIF at a readable centered width (640px maximum) and the
  controllable `DropRebound.jl` MP4 files as a responsive two-column pair on
  desktop. SpectralKM remains the only lead visual; the pair stacks naturally
  on narrow screens.
- Include the `DropRebound.jl` Oldroyd-B and Carreau animations only as separate
  numerical cases. Do not call them a comparison or infer a rheological
  conclusion from colour or side-by-side placement.

## Scope and repository links

The English page links to the two canonical repositories:

- `elvis-aguero/SpectralKM.jl`
- `elvis-aguero/DropRebound.jl`

Remove the obsolete `km-*` repositories from the English card and from the
English-visible repository list if it is otherwise showing them as active work.
The existing Spanish and Portuguese pages are untouched. Their eventual update
belongs to the user-specified OpenRouter/free translation pipeline.

## Acceptance checks

- The title, opening, chronology, current-focus section, and open-source claim
  are present and factual.
- The source GIFs, derived controllable MP4 files, and static posters have
  verified provenance and captions that match what they depict.
- No unsupported claims remain from the old page, including a differentiable
  contact manifold, universal finite-element compatibility, adjoint readiness,
  or future biological-interface work.
- No manual translation is performed.
- GitHub Actions deployment succeeds. Local Bundler builds remain deferred to
  Actions, per user instruction.
