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

Scaling cultivated meat from a laboratory proof-of-concept to a food system is, at its core, an engineering problem. Billions of animal cells must grow suspended in a nutrient-rich medium inside a reactor that keeps them oxygenated, well-mixed, and mechanically safe — all at once. The dominant candidate for gentle, scalable culture is the **rocking bioreactor**: a flexible bag that tilts rhythmically, creating waves that circulate the medium without impellers. The same rocking that mixes nutrients can, however, shear cells apart if the frequency or amplitude is wrong. Choosing those parameters experimentally is prohibitively slow and expensive: each trial consumes sterile facilities, weeks of culture time, and growth media that cost more than most research budgets can absorb at scale.

Simulation is the natural alternative, but no existing framework has fully coupled **biological growth** with **multiphase fluid dynamics** across the design space that matters. Traditional models treat the culture medium as a fixed fluid and the cells as passive tracers. In reality, cell proliferation changes the medium's viscosity; oxygen consumption creates spatial gradients that feed back into growth rates; and the free surface moves in a non-inertial rocking frame, making conventional CFD approaches impractical. Solving this problem means working at the intersection of multiphase fluid mechanics, transport phenomena, and computational biology simultaneously.

### Our approach

At Brown, we are building the first open-source computational framework that integrates **agent-based cell dynamics** within a **volume-of-fluid (VOF)** multiphase solver for rocking bioreactors. The VOF method tracks the deforming free surface directly from first principles, while the agent layer resolves how individual cells respond to local oxygen concentrations and shear stresses, and how their growth modifies the bulk flow through drag and viscosity changes. Think of it as a two-way conversation between the physics of the flow and the biology of the cells — each half of the model updates the other at every time step.

Because high-fidelity simulation of every possible reactor configuration is computationally expensive, we embed the solver within a **data-driven surrogate model** that learns response surfaces from a targeted set of full runs. Combined with **Bayesian optimization**, this allows systematic exploration of thousands of design combinations — geometry, rocking frequency, amplitude, media rheology — at a fraction of the cost of brute-force search. The result is a practical tool for identifying "cell-safe" hydrodynamic regimes: conditions where shear stresses remain below damage thresholds while oxygen delivery stays sufficient for growth. These criteria have previously been defined only empirically, one expensive experiment at a time.

The same framework applies beyond cultivated meat: vaccine production, cell therapies, and protein manufacturing share the same fundamental challenge of maintaining viable cells in a dynamically driven fluid environment. All code and datasets are released openly to support community validation and reuse.

For technical details, see [Kim, Harris & Cimpeanu (2025)](https://arxiv.org/abs/2504.05421) or explore the repository below.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}
</div>
