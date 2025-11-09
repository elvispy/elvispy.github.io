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

# Integrating life and flow: toward predictive bioreactors for cultivated meat

### A new modeling frontier

No existing framework has fully coupled **biological growth** with **multiphase fluid dynamics** across the enormous design space of modern bioreactors.  
Traditional models treat the culture medium as static or the cells as passive tracers. In reality, cell proliferation, oxygen transport, and flow structure co-evolve: each determines the other. Capturing that interplay while spanning hundreds of possible geometries, fill volumes, and rocking schedules—is the key to building bioreactors that can scale cultivated meat from lab curiosity to global food technology.

### Why it matters

Cultivated meat promises to reduce agriculture’s environmental footprint, but its success depends on **bioreactor performance**.  
Inside these devices, billions of animal cells grow suspended in a nutrient-rich medium that must stay well mixed and well oxygenated. The **rocking bioreactor**, a flexible bag that tilts rhythmically like a cradle, offers a gentle, scalable alternative to impeller-driven tanks. However, the same rocking that mixes nutrients can also shear cells apart.  
Experimentally tuning those parameters is prohibitively costly and slow. Each test run consumes sterile facilities, weeks of culture time, and expensive growth media. Predictive simulation is therefore essential.

### The scientific challenge

This problem lies at the intersection of **multiphase, non-Newtonian fluid mechanics**, **transport phenomena**, and **computational biology**.  
The fluid’s free surface moves in a **non-inertial frame**, the media’s viscosity evolves as cells proliferate, and the cells themselves modify the flow field through local oxygen consumption and drag.  
Conventional CFD cannot resolve such coupled dynamics, and existing biological models ignore flow altogether. Our goal is to unify them.

### Our approach

At Brown, we are developing the first **open-source computational framework** that integrates **agent-based cell dynamics** within a **volume-of-fluid (VOF)** multiphase solver for rocking bioreactors.  
This model predicts oxygen transfer, nutrient gradients, and shear stresses directly from first principles, while tracking how these fields affect local biomass growth. Because direct numerical simulation of every configuration is computationally expensive, we embed the solver into a **data-driven surrogate model** that learns from high-fidelity runs. Combined with **Bayesian optimization**, this allows systematic exploration of thousands of design combinations—geometry, rocking frequency, amplitude, media rheology—at a fraction of the computational cost.

This work establishes a bridge between **continuum mechanics and living systems**. It extends classical multiphase flow modeling into a regime where the “fluid” grows, consumes, and adapts.  
By resolving how oxygen delivery and mechanical stress influence cellular outcomes, the framework provides quantitative criteria for “cell-safe” hydrodynamic environments—something previously defined only empirically.

### Broader impact

The result is a predictive, reproducible tool for sustainable biotechnology.  
By replacing costly physical prototyping with open, simulation-based design, we can accelerate the scale-up of cultivated meat and related bioproduction systems such as vaccines, cell therapies, and protein manufacturing.  
All code and datasets are released openly to foster community validation and reuse.

For technical details, see [Kim, Harris & Cimpeanu (2025)](https://arxiv.org/abs/2504.05421) or explore the [BioReactor repository](https://github.com/rcsc-group/BioReactor).

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}  
</div>
