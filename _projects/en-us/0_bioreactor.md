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

Cells in a large bioreactor don't sit still — they circulate, and where they go determines what they experience. A cell passing through a high-shear zone and then drifting into an oxygen-depleted region has accumulated an exposure history that shapes whether it grows, stresses, or dies. Well-mixed models average over that history and erase the variance in exposure history that predicts whether a cell grows or fails.

Predicting population-level growth from those histories requires fusing two qualitatively different inputs: hydrodynamic exposure histories and process-state variables such as inoculum density, dissolved oxygen, and culture pH. Experiments are expensive, most operating regimes are sparsely observed, and the joint input space over both fields is large — which means a model that produces a confident prediction in a well-sampled regime and an equally confident one in a regime it has never seen is not useful. It is wrong in ways that are invisible until something fails.

We extend the cooperative training framework of Yi & Bessa — which disentangles aleatoric and epistemic uncertainty in single-field regression — to the multi-field setting, and build a **cooperative Bayesian fusion architecture** with field-specific encoders for mechanics and biology and a learned fusion map trained so that epistemic uncertainty rises only where joint coverage is sparse and registers disagreement between fields as a distinguishable signal — measured pointwise as the posterior variance of the fused predictive mean — rather than averaging it into an undifferentiated variance term. That conflict signal is the key deliverable the single-field baseline does not provide: when the hydrodynamic and biological encoders give locally divergent signals, the model flags it rather than masking it.

The first test is a regression problem: given fixed-window summaries of a cell population's hydrodynamic exposure history and process-state variables, predict biomass growth-rate deviation relative to a well-supported operating regime. The task is small enough to validate the uncertainty diagnostics carefully — does the epistemic term rise where joint coverage is sparse? does it register source conflict rather than hide it? — while retaining the two-field structure that deterministic fusion approaches cannot preserve without collapsing into overconfident point predictions in sparse regions. The architecture targets the two-field case; whether cooperative Bayesian fusion remains well-calibrated as source fields multiply, and whether Gaussian predictive heads hold or mixture and flow-based alternatives become necessary.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}
</div>
