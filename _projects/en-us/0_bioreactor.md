---
page_id: prj_bioreactor
layout: page
title: Bayesian Fusion for Bioreactor Scale-Up
description: Field-attributed uncertainty for multi-physics growth prediction
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
math: true
---

The first proof-of-concept cultivated meat product cost $325,000 in 2013. A decade of investment later, prices remain well above commercial viability. Every experiment coupling a new cell line to a new reactor configuration requires a multi-million-dollar commitment, and at that cost, the bioreactor design space has barely been entered.

The obstacle is not a lack of models: it is a lack of models that know what they do not know. A cell passing through a high-shear zone and then drifting into an oxygen-depleted region accumulates an exposure history that shapes whether it grows, stresses, or dies. Well-mixed models average over that history. Surrogate models trained on sparse experiments extrapolate confidently into regimes they have never seen. The result is a model that is wrong in ways that are invisible until something fails.

<figure style="float: right; margin: 10px; max-width: 340px;">
    {% include figure.liquid loading="eager" path="assets/img/bioreactor.gif" title="Bioreactor simulation" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Simulated particle trajectories inside a stirred-tank bioreactor.
    </figcaption>
</figure>

Growth depends simultaneously on fluid mechanics, media chemistry, and biological context. When a prediction fails, knowing the total uncertainty is not enough: the engineer needs to know which field is the source. If the mechanics field is under-sampled, the right next step is a CFD simulation costing thousands of core-hours. If the biological model is the weak link, the right next step is a cell culture assay costing months of labor. Without field-level attribution, a failed prediction sends engineers back to the bench to answer the wrong question.

We extend the cooperative training framework of Yi & Bessa, which disentangles aleatoric and epistemic uncertainty in single-field regression, to this multi-field setting. Mechanics and biology are encoded separately; a learned fusion map is then trained so that disagreement between the two encoders registers as a distinguishable signal rather than dissolving into an undifferentiated variance term. Concretely, the conflict is the posterior variance of the fused predictive mean:

$$u_\text{epi}(x_\text{mech}, x_\text{bio}) \approx \operatorname{Var}_{p(\eta \mid \mathcal{D})}\!\bigl[\mu_\eta(x_\text{mech}, x_\text{bio})\bigr]$$

A single-field baseline cannot compute this quantity: it has no way to distinguish whether a prediction is uncertain because one field is under-sampled or because two fields genuinely conflict.

As a first validation, we apply the architecture to a controlled regression task: given fixed-window summaries of a cell population's hydrodynamic exposure history and process-state variables, predict biomass growth-rate deviation relative to a well-characterized operating regime. This controlled setting makes it possible to isolate whether the epistemic term rises where joint coverage is sparse and whether it correctly attributes source conflict before the architecture faces pilot-scale deployment. The goal: a model that compresses fifty experimental trials into ten by telling engineers which trials are necessary.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}
</div>
