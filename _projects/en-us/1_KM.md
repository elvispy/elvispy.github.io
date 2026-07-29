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

## A millisecond decides the outcome

In printing, coating, sprays, and liquid handling, impact decides whether a liquid deposits, spreads, rebounds, or coalesces. That choice is made in milliseconds, while the bodies involved are changing shape.

The difficulty is that a deformable collision has no pre-existing contact area or pressure field. At first touch, pressure reshapes the interfaces, and their shapes alter the pressure. `SpectralKM.jl` asks how to solve that loop when both sides of the collision are liquid.

<figure>
  <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/spectralkm-impact-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="SpectralKM bath-impact animation with a red contact patch and pressure inset">
    <source src="{{ '/assets/img/spectralkm-impact.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption class="caption">Bath-impact simulation. The dark-blue region is the bath, the pale-blue region the drop, and the red arc the solved contact patch. The inset plots pointwise pressure as a diagnostic, not as a converged field.</figcaption>
</figure>

## What each model removed

The 2022 rigid-sphere / elastic-membrane study made the first hidden variable visible: target deformation ({% cite aguero2022impact %}). A liquid drop on a solid moved deformability into the impactor. A drop on a bath left neither side of the contact fixed ({% cite gabbard2025dropreboundlowweber %}). Each problem exposed a contact assumption that the previous one could afford to hide.

<div style="max-width: 640px; margin: 1.5rem auto;">
  {% include figure.liquid loading="lazy" path="assets/img/km-sphere.gif" alt="Simulation of a rigid sphere impacting an elastic membrane" title="Rigid sphere and elastic membrane" class="img-fluid rounded z-depth-1" caption="Simulation of the 2022 rigid-sphere / elastic-membrane model." %}
</div>

<figure style="float: left; margin: 10px; width: 35%;">
  <div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <video autoplay muted loop controls
           style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
           preload="auto">
      <source src="/assets/img/drop.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
  <figcaption style="text-align: center; margin-top: 5px;">
    KM applied to a droplet impacting a fluid bath, capturing rebound and coalescence dynamics.
  </figcaption>
</figure>

The solid-substrate branch then isolated non-Newtonian constitutive behaviour. Contact-dynamics work made pressure and contact extent explicit unknowns. That progression leads to the question the current model is built to answer: which part of a rebound is fluid dynamics, and which part comes from the contact prescription?

## Spectral contact dynamics

`SpectralKM.jl` is the current Newtonian, non-coalescing drop--bath formulation. It represents the bath with Fourier–Bessel modes, the drop with Legendre modes, and contact pressure with shifted-Legendre modes. A feasibility-filtered outer search selects the contact patch.

It removes three choices that can otherwise decide a rebound prediction: a prescribed pressure profile, a mesh-level contact search, and a fixed liquid interface. The bath, drop, pressure supported on the patch, and contact extent are solved together. The result is a contact model whose physical assumptions can be inspected rather than buried in a solver switch.

The pressure inset is a diagnostic, not a polished field to over-interpret. It shows what the model solves at contact without pretending that a pointwise trace is the final answer.

## Controlled rheology on a solid

`DropRebound.jl` keeps the substrate solid so it can isolate how constitutive behaviour changes rebound. `SpectralKM.jl` carries the contact problem to two moving liquid interfaces. The videos are separate numerical cases, not a benchmark.

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

## Open source as research infrastructure

Contact models earn trust when their derivations, tests, diagnostics, and figures can be inspected together. The repositories keep package code, validation records, parameter sweeps, and rendering scripts beside the model, so a reader can reproduce a result or challenge an assumption without reconstructing the workflow from a paper.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvis-aguero/SpectralKM.jl' %}
    {% include repository/repo.liquid repository='elvis-aguero/DropRebound.jl' %}
</div>
