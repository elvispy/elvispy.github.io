---
page_id: prj_km
layout: page
title: "Building the next generation of deformable-impact software"
description: "Spectral contact dynamics for drops impacting a bath"
img: "assets/img/spectralkm-impact.gif"
importance: 1
category: "work"
related_publications: true
---

## Impact is a contact problem

Impact looks simple. Its numerical core is not. A drop deforms, a contact region appears, pressure redistributes, and the bodies separate or remain together. The contact law decides much of the answer. I build models that put progressively less of that law in by hand.

{% include figure.liquid loading="eager" path="assets/img/spectralkm-impact.gif" alt="SpectralKM bath-impact simulation with a red contact patch and pressure inset" title="SpectralKM bath-impact simulation" class="img-fluid rounded z-depth-1" caption="Bath-impact simulation. The dark-blue region is the bath, the pale-blue region the drop, and the red arc the solved contact patch. The inset plots pointwise pressure as a diagnostic, not as a converged field." %}

## A lineage of reductions

The first model was a rigid sphere striking an elastic membrane, published in 2022 ({% cite aguero2022impact %}). The simulation below depicts that rigid-sphere / elastic-membrane model. I then moved the problem to a drop against a solid substrate, then to a drop against a bath, where both liquid interfaces deform. The low-Weber drop-rebound study from that bath branch is available as an arXiv preprint ({% cite gabbard2025dropreboundlowweber %}).

<figure style="max-width: 300px; margin: 1rem auto;">
  {% include figure.liquid loading="lazy" path="assets/img/km-sphere.gif" alt="Simulation of a rigid sphere impacting an elastic membrane" title="Rigid sphere and elastic membrane" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
  <figcaption style="text-align: center; margin-top: 5px;">Simulation of the 2022 rigid-sphere / elastic-membrane model.</figcaption>
</figure>

The solid-substrate branch then took on non-Newtonian constitutive relations. Later contact-dynamics work made pressure and contact extent explicit unknowns. These earlier models were useful reductions. They also made their own contact assumptions visible.

## The fully spectral formulation

`SpectralKM.jl` models a Newtonian, non-coalescing drop impacting a bath. It represents the bath with Fourier–Bessel modes, the drop with Legendre modes, and contact pressure with shifted-Legendre modes. An outer feasibility-filtered selection chooses the contact patch. Contact extent and pressure are therefore solved, not supplied as inputs.

The documented water reference case uses $We = 1.0958$, $Bo = 0.017$, and $Oh = 0.006$ for $R = 0.35\,\mathrm{mm}$. There is no mesh-resolved pressure field. The integrated dynamics can converge while the pointwise pressure profile remains unresolved, because the model is driven only by low-order pressure moments. That distinction is why the pressure inset is evidence about the solve, not a claim of pointwise convergence.

Here the deforming bath, drop, contact pressure, and contact extent are part of one solve. The assumptions remain explicit enough to test.

## A solid-substrate branch

`DropRebound.jl` is a related lower-order spectral solver for rebound on a flat solid substrate and for rheology. It is a separate branch of the work, not a competing flagship. These are two locally rendered numerical cases from that branch.

{% include figure.liquid loading="lazy" path="assets/img/droprebound-oldroyd-b.gif" alt="DropRebound Oldroyd-B numerical rebound case" title="DropRebound Oldroyd-B case" class="img-fluid rounded z-depth-1" caption="Numerical rebound case with an Oldroyd-B constitutive model." %}

{% include figure.liquid loading="lazy" path="assets/img/droprebound-carreau.gif" alt="DropRebound Carreau numerical rebound case" title="DropRebound Carreau case" class="img-fluid rounded z-depth-1" caption="Numerical rebound case with a Carreau constitutive model." %}

## Research in the open

I keep package code, tests, executable derivations, diagnostics, validation records, parameter sweeps, and rendering scripts together. That gives readers the material to inspect, reproduce, or question the work rather than a result detached from its implementation.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvis-aguero/SpectralKM.jl' %}
    {% include repository/repo.liquid repository='elvis-aguero/DropRebound.jl' %}
</div>
