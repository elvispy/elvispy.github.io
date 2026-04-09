---
page_id: prj_surferbot
layout: page
title: Interfacial locomotion
description: Differentiable physics for wave-driven robots
img: assets/img/surferbot.gif
importance: 1
category: work
related_publications: true
---

## Riding the interface: differentiable physics for wave-driven locomotion

A small robot sitting on water can propel itself forward without paddles, fins, or jets — by vibrating. The vibration radiates surface waves, and if those waves are directionally asymmetric, their momentum imbalance generates a net thrust. The SurferBot {% cite Rhee_2022 %} demonstrated this experimentally; our work builds a simulator where every design choice can be optimized directly.

<div style="width: 100%; display: flex; justify-content: center;">
  <div style="position: relative; width: 80%; padding-bottom: 45%; height: 0; overflow: hidden;">
    <iframe
      src="https://www.youtube.com/embed/PQF6yGAs-TA?autoplay=1&mute=1&si=0qH_j8Lccw4ljD_3"
      title="YouTube video player"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen>
    </iframe>
  </div>
</div>

---

At an air–water interface, surface tension, gravity waves, and added-mass effects govern the interface dynamics. Performance depends on coupled choices — body shape, mass distribution, motor location, drive frequency, waveform, fluid properties — that are expensive to explore by experiment. We model the robot as a buoyant, possibly flexible body constrained to the interface and driven by a time-varying actuator, with the surrounding fluid described by an interface-resolving small-amplitude free-surface theory {% cite Benham_Devauchelle_Thomson_2024 %}. The simulator is differentiable with respect to all design parameters \(\theta\): state updates use linear and nonlinear solves \(A(\theta)\,y=b(\theta)\) with custom reverse-mode rules, so \(\nabla_\theta \mathcal{L}\) follows from two linear solves (forward and adjoint) per time step — memory bounded, gradients stable across the full trajectory.

With these gradients, multi-start optimization explores hull geometries, actuator placements, and drive waveforms; Bayesian optimization handles global search under power-budget and manufacturability constraints.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot_v2' %}
    {% include repository/repo.liquid repository='elvispy/surferbot-differentiable' %}
</div>
