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

A small robot sitting on water can propel itself forward without paddles, fins, or jets — by vibrating. The vibration radiates surface waves, and if those waves are **directionally asymmetric**, their momentum imbalance generates a net thrust. The SurferBot {% cite Rhee_2022 %} demonstrated this experimentally; our work turns the idea into a **computational laboratory** where every design choice can be optimized from first principles.

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

## Model and differentiable simulation

At an air–water interface, **surface tension, gravity waves, and added-mass effects** dominate. Small actuators can create asymmetric wave fields that carry momentum and generate thrust, but performance depends on many coupled choices: body shape, mass distribution, motor location, drive frequency, waveform, and environmental parameters. Designing such systems by trial-and-error is slow. A differentiable simulator lets us optimize these choices directly, with **gradients from physics** rather than heuristics.

We model the robot as a buoyant, possibly flexible body constrained to the interface and driven by a time-varying internal actuator. The surrounding fluid is represented by an **interface-resolving, small-amplitude free-surface model** compatible with capillarity and viscous damping at the scales of interest, following the theory developed in {% cite Benham_Devauchelle_Thomson_2024 %}. The pipeline is **end-to-end differentiable** with respect to all design parameters \(\theta\): state updates use linear and nonlinear solves \(A(\theta)\,y=b(\theta)\) with custom reverse-mode rules, so that \(\nabla_\theta \mathcal{L}\) is obtained by two linear solves (forward and adjoint) per time step, keeping memory bounded and gradients stable across the full trajectory.

## Optimization and scientific questions

With gradients available, we explore design parameters (hull geometry, mass distribution, motor position), control parameters (drive frequency, multi-harmonic waveform coefficients), and environmental conditions (surface tension, viscosity, depth). **Multi-start gradient optimization** locates high-performance regions; surrogates and **Bayesian optimization** handle global search under constraints such as power budgets and manufacturable geometries.

The core scientific questions are: how do specific wave modes and phase relationships create directional momentum flux? What combinations of actuator placement and drive frequency minimize wasted radiation? Which designs remain robust across changes in fluid properties or small manufacturing tolerances? The same differentiable framework that answers these questions also supports **parameter inference** from experimental trajectories and **controller tuning** on real devices, making the path from simulation to hardware direct.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot_v2' %}
    {% include repository/repo.liquid repository='elvispy/surferbot-differentiable' %}
</div>
