---
page_id: prj_bioreactor
layout: page
title: Coupling Growth, Flow, and Optimization in Complex Systems
description: Integrating biological growth and fluid dynamics across vast design spaces
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
---

## Toward predictive bioreactors for cultivated meat

In a **rocking bioreactor**, a flexible bag tilts rhythmically to circulate the culture medium without impellers. The same rocking that distributes oxygen can shear cells apart if the frequency or amplitude is too high. Choosing those parameters experimentally costs weeks of culture time and more growth media than most research budgets tolerate — and configurations don't transfer across bag geometries; each new design requires its own screen.

Standard simulation models treat the culture medium as a fixed fluid, the cells as passive tracers, and the free surface as geometrically fixed. In a real bioreactor, all three assumptions break down: cell proliferation thickens the medium; oxygen gradients feed back into growth rates; the free surface deforms in a non-inertial rocking frame that conventional CFD handles poorly.

At Brown, we are building an open-source framework that couples the fluid solver to the cell-growth model without operator splitting. A **volume-of-fluid (VOF)** solver resolves the deforming free surface while an agent layer tracks how individual cells respond to local oxygen and shear — and how their growth modifies the bulk flow through drag and viscosity. Because high-fidelity simulation of every design point is expensive, we embed the solver within a data-driven surrogate trained on a targeted set of full runs. Bayesian optimization then searches across geometry, rocking frequency, amplitude, and media rheology to locate hydrodynamic regimes where shear stays below cell-damage thresholds and oxygen delivery stays sufficient for growth — criteria previously definable only by experiment, one costly trial at a time.

For technical details, see [Kim, Harris & Cimpeanu (2025)](https://arxiv.org/abs/2504.05421) or explore the repository below.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}
</div>
