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

Impact looks simple. A predictive model still has to decide which quantities it treats as laws and which it lets the dynamics determine. I build deformable-impact software that progressively moves pressure, contact extent, and interface motion out of the input file and into the solve.

<figure>
  <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/spectralkm-impact-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="SpectralKM bath-impact animation with a red contact patch and pressure inset">
    <source src="{{ '/assets/img/spectralkm-impact.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption class="caption">Bath-impact simulation. The dark-blue region is the bath, the pale-blue region the drop, and the red arc the solved contact patch. The inset plots pointwise pressure as a diagnostic, not as a converged field.</figcaption>
</figure>

## A lineage of reductions

The first model was a rigid sphere striking an elastic membrane, published in 2022 ({% cite aguero2022impact %}). The simulation below depicts that rigid-sphere / elastic-membrane model. I then moved the problem to a drop against a solid substrate, then to a drop against a bath, where both liquid interfaces deform. The low-Weber drop-rebound study from that bath branch is available as an arXiv preprint ({% cite gabbard2025dropreboundlowweber %}).

<div style="max-width: 640px; margin: 1.5rem auto;">
  {% include figure.liquid loading="lazy" path="assets/img/km-sphere.gif" alt="Simulation of a rigid sphere impacting an elastic membrane" title="Rigid sphere and elastic membrane" class="img-fluid rounded z-depth-1" caption="Simulation of the 2022 rigid-sphere / elastic-membrane model." %}
</div>

The solid-substrate branch then took on non-Newtonian constitutive relations. Later contact-dynamics work made pressure and contact extent explicit unknowns. These earlier models were useful reductions. They also made their own contact assumptions visible.

## The fully spectral formulation

`SpectralKM.jl` is a Newtonian, non-coalescing drop--bath model. It represents the bath with Fourier–Bessel modes, the drop with Legendre modes, and contact pressure with shifted-Legendre modes. An outer feasibility-filtered selection chooses the contact patch.

The advance is not the choice of basis alone. Pressure is not assigned a shape. The contact patch is not picked by a mesh-scale tangency test. Neither liquid interface is held fixed. The bath, drop, pressure supported on the patch, and contact extent are solved together. That makes the contact law inspectable: a rebound prediction is no longer inseparable from a pressure curve or contact rule chosen in advance.

The model also draws a useful numerical boundary. Rebound dynamics can settle before a pointwise pressure trace does, so the code treats the pressure inset as a diagnostic of the solve rather than a polished field to over-interpret.

## A solid-substrate branch

`DropRebound.jl` is the solid-substrate and rheology branch of this work. Its deliberately simpler geometry isolates how constitutive behaviour changes rebound, while `SpectralKM.jl` carries the contact-dynamics problem to two deforming liquid interfaces. The videos are separate numerical cases, not a performance comparison.

<div class="row">
  <div class="col-md-6">
    <figure>
      <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/droprebound-oldroyd-b-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="DropRebound numerical Oldroyd-B rebound case">
        <source src="{{ '/assets/img/droprebound-oldroyd-b.mp4' | relative_url }}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <figcaption class="caption">Numerical Oldroyd-B case.</figcaption>
    </figure>
  </div>
  <div class="col-md-6">
    <figure>
      <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/droprebound-carreau-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="DropRebound numerical Carreau rebound case">
        <source src="{{ '/assets/img/droprebound-carreau.mp4' | relative_url }}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <figcaption class="caption">Numerical Carreau case.</figcaption>
    </figure>
  </div>
</div>

## Research in the open

I keep package code, tests, executable derivations, diagnostics, validation records, parameter sweeps, and rendering scripts together. That gives readers the material to inspect, reproduce, or question the work rather than a result detached from its implementation.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvis-aguero/SpectralKM.jl' %}
    {% include repository/repo.liquid repository='elvis-aguero/DropRebound.jl' %}
</div>
