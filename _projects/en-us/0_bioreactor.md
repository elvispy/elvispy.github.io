---
page_id: prj_bioreactor
layout: page
title: Multi-fidelity design for rocking bioreactors
description: Coupled oxygen-transfer and shear design with multi-fidelity CFD
importance: 1
category: work
related_publications: true
---

A rocking bioreactor looks simple: move a bag back and forth and the culture
mixes. The useful engineering question is harder. The same rocking motion that
renews the gas–liquid interface and improves oxygen transfer also sets the
mechanical environment experienced by the culture. More agitation is therefore
not a complete answer. A design must balance oxygen availability against shear,
while accounting for fill level and rocking frequency before it is expensive to
manufacture or test.

<figure>
  <video autoplay muted loop controls preload="metadata" style="width: 100%; display: block;">
    <source src="{{ '/assets/img/bioreactor-interface-hero.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption class="caption">Numerical two-phase CFD of the rocking free surface. The blue gas phase and red liquid phase show the interface whose repeated deformation controls transport and mechanical loading.</figcaption>
</figure>

The model resolves that moving interface rather than replacing it with a
well-mixed approximation. It uses <a href="https://basilisk.fr/">Basilisk</a>
volume-of-fluid hydrodynamics, coupled to dissolved-oxygen transport through
Henry's law. From each simulated condition, the workflow extracts the process
quantities that make the trade-off concrete: volumetric mass-transfer
coefficient kLa, mixing time, and shear stress.
Those outputs turn a vague request—"mix it better"—into an inspectable design
decision: which fill level and rocking frequency provide adequate transfer
without simply pushing every local stress measure upward?

Full CFD is rich enough to answer that question, but too costly to blanket the
entire operating space. The project therefore pairs inexpensive low-fidelity screening with selected high-fidelity calculations. A KRR-LR-GPR
multi-fidelity surrogate carries information between the two, while Expected Improvement selects the next condition to evaluate. The point is not to make
the simulator disappear behind a black box; it is to spend high-fidelity runs
where they can change the design choice, then use the cheaper model to map the
rest of the space. That makes a wider set of fill levels and rocking schedules
practical to compare.

{% include figure.liquid loading="eager" path="assets/img/bioreactor-fill-sweep.png" alt="Fill-level and rocking-frequency sweep showing oxygen-transfer, mixing-time, and shear-stress metrics" title="Bioreactor fill-level sweep" class="img-fluid rounded z-depth-1" caption="A fill-level sweep at fixed rocking angle. Each column varies rocking frequency and each row varies fill level; the maps show <em>k</em><sub>L</sub><em>a</em>, mixing time, and shear-stress KPIs. Reading them together exposes where a transfer gain carries a mechanical penalty." %}

My contribution was the project's decision and reproducibility layer around the
solver: an end-to-end multi-fidelity Bayesian-optimization testbed,
parameter-validation fixes, CI-deployed documentation, tutorials and figure
pipeline, and validation and experiment records. That work makes a result
traceable from a candidate condition through the simulation and surrogate
workflow to the plotted evidence, without claiming sole authorship of the CFD
method or the published study.

The underlying study is published in <a href="https://doi.org/10.1016/j.ijmultiphaseflow.2025.105375"><em>International Journal of Multiphase Flow</em></a>. The <a href="https://rcsc-group.github.io/multi-fidelity-bioreactor/">project documentation</a> and <a href="https://github.com/rcsc-group/multi-fidelity-bioreactor">open repository</a> include the model, case studies, and reproducible workflow.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/multi-fidelity-bioreactor' %}
</div>
