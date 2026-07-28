---
page_id: prj_km
layout: page
title: "Building the next generation of deformable-impact software"
description: "Spectral contact dynamics for drops impacting a bath"
img: "assets/img/spectralkm-impact-poster.png"
importance: 1
category: "work"
related_publications: true
---

## Impact is a contact problem

Impact looks simple. Its numerical core is not. A drop deforms, a contact region appears, pressure redistributes, and the bodies separate or remain together. The contact law decides much of the answer. I build models that put progressively less of that law in by hand.

<figure>
  <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/spectralkm-impact-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="SpectralKM bath-impact animation with a red contact patch and pressure inset">
    <source src="{{ '/assets/img/spectralkm-impact.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption class="caption">Bath-impact simulation. The dark-blue region is the bath, the pale-blue region the drop, and the red arc the solved contact patch. The inset plots pointwise pressure as a diagnostic, not as a converged field.</figcaption>
</figure>

## A lineage of reductions

The first model was a rigid sphere striking an elastic membrane, published in 2022 ({% cite aguero2022impact %}). The simulation below depicts that rigid-sphere / elastic-membrane model. I then moved the problem to a drop against a solid substrate, then to a drop against a bath, where both liquid interfaces deform. The low-Weber drop-rebound study from that bath branch is available as an arXiv preprint ({% cite gabbard2025dropreboundlowweber %}).

<div style="max-width: 300px; margin: 1rem auto;">
  {% include figure.liquid loading="lazy" path="assets/img/km-sphere.gif" alt="Simulation of a rigid sphere impacting an elastic membrane" title="Rigid sphere and elastic membrane" class="img-fluid rounded z-depth-1" caption="Simulation of the 2022 rigid-sphere / elastic-membrane model." %}
</div>

The solid-substrate branch then took on non-Newtonian constitutive relations. Later contact-dynamics work made pressure and contact extent explicit unknowns. These earlier models were useful reductions. They also made their own contact assumptions visible.

## The fully spectral formulation

`SpectralKM.jl` models a Newtonian, non-coalescing drop impacting a bath. It represents the bath with Fourier–Bessel modes, the drop with Legendre modes, and contact pressure with shifted-Legendre modes. An outer feasibility-filtered selection chooses the contact patch. Contact extent and pressure are therefore solved, not supplied as inputs.

The documented water reference case uses $We = 1.0958$, $Bo = 0.017$, and $Oh = 0.006$ for $R = 0.35\,\mathrm{mm}$. There is no mesh-resolved pressure field. The integrated dynamics can converge while the pointwise pressure profile remains unresolved, because the model is driven only by low-order pressure moments. That distinction is why the pressure inset is evidence about the solve, not a claim of pointwise convergence.

Here the deforming bath, drop, contact pressure, and contact extent are part of one solve. The assumptions remain explicit enough to test.

## A solid-substrate branch

`DropRebound.jl` is the solid-substrate and rheology branch of this work, a related lower-order spectral solver for rebound on a flat substrate. `SpectralKM.jl` is the current contact-dynamics formulation for drop--bath impact. The videos below are separate numerical cases from `DropRebound.jl`.

<figure>
  <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/droprebound-oldroyd-b-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; max-width: 540px; display: block; margin: 0 auto;" aria-label="DropRebound numerical Oldroyd-B rebound case">
    <source src="{{ '/assets/img/droprebound-oldroyd-b.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption class="caption">Numerical Oldroyd-B case.</figcaption>
</figure>

<figure>
  <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/droprebound-carreau-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; max-width: 540px; display: block; margin: 0 auto;" aria-label="DropRebound numerical Carreau rebound case">
    <source src="{{ '/assets/img/droprebound-carreau.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption class="caption">Numerical Carreau case.</figcaption>
</figure>

## Research in the open

I keep package code, tests, executable derivations, diagnostics, validation records, parameter sweeps, and rendering scripts together. That gives readers the material to inspect, reproduce, or question the work rather than a result detached from its implementation.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvis-aguero/SpectralKM.jl' %}
    {% include repository/repo.liquid repository='elvis-aguero/DropRebound.jl' %}
</div>
