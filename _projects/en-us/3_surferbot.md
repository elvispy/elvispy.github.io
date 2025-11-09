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

# Riding the interface: differentiable physics for wave-driven locomotion

A vibrating “vibrobot” can surf across water by **shaping the waves it creates**. That simple idea opens a quantitative program: build a model where **surface waves, body motion, and actuation** co-evolve, then make the whole pipeline **differentiable** so design and control can be optimized directly.

Our work takes the SurferBot concept {% cite Rhee_2022 %} and turns it into a **computational laboratory** for interfacial locomotion, grounded in theory {% cite Benham_Devauchelle_Thomson_2024 %} and implemented in **Julia** with differentiable solvers.

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

## Why this problem matters

At an air–water interface, **surface tension, gravity waves, and added-mass effects** dominate. Small actuators can create **asymmetric wave fields** that carry momentum and generate thrust. Designing such systems by trial-and-error is slow because performance depends on many coupled choices: body shape, mass distribution, **motor location**, **drive frequency and waveform**, and environmental parameters.

A differentiable simulator lets us **optimize** these choices directly against objectives such as average speed, thrust-per-power, or trajectory tracking, with **gradients from physics**, not heuristics.

---

## Modeling approach

We model the robot as a buoyant, possibly flexible body constrained to the interface and driven by a time-varying internal actuator. The surrounding fluid is represented by an **interface-resolving, small-amplitude free-surface model** compatible with capillarity and viscous damping at the scales of interest. The body–wave coupling yields a net drift when the radiated waves are **directionally biased** (as in {% cite Benham_Devauchelle_Thomson_2024 %}).

Key outputs include time-averaged speed, thrust, hydrodynamic power, and wave momentum flux. These are computed from the state and used as **loss functions** for design and control.

---

## Fully differentiable simulation in Julia

The pipeline is **end-to-end differentiable** with respect to parameters \(\theta\) (geometry, actuator placement, frequency, waveform coefficients):

- State update uses linear and nonlinear solves \(A(\theta)\,y=b(\theta)\) with custom reverse-mode rules so that \(\nabla\_\theta \mathcal{L}\) is obtained by **two linear solves** (forward and adjoint) per time step, keeping memory bounded and gradients stable.
- Wave kinematics and body dynamics are coded to avoid non-differentiable switches; contact with the interface is handled via smooth constraints consistent with small-slope theory.
- We expose Jacobian-vector and vector-Jacobian products to AD, enabling **first-order methods** and **quasi-Newton** updates over large parameter spaces.

This yields **physics-based gradients** for objectives like speed, thrust-per-watt, or robustness to perturbations.

---

## Optimization over design and control

With gradients available, we explore:

- **Design parameters:** hull length/width, mass distribution, **motor position**, mounting stiffness.
- **Control parameters:** drive **frequency**, multi-harmonic waveform coefficients, duty cycles.
- **Environment:** surface tension, viscosity, depth, background currents.

We run **multi-start gradient optimization** to locate high-performance regions, then fit **surrogates** for rapid sweeps and **Bayesian optimization** for global search under constraints (e.g., power budget, manufacturable geometries).

---

## Scientific questions we address

1. **Thrust generation:** how do specific wave modes and phase relationships create directional momentum flux at the interface?
2. **Efficiency:** what combinations of placement and drive reduce wasted radiation while maximizing net drift?
3. **Robustness:** which designs maintain performance across changes in fluid properties or small manufacturing errors?
4. **Control:** can we shape wave packets in time to navigate or station-keep against disturbances?

---

## From theory to hardware

The simulator predicts the **operating windows** where wave radiation produces propulsion without saturating losses to viscous damping or generating counter-productive modes. Because gradients come from the governing equations, the same framework supports **parameter inference** from experimental trajectories and **controller tuning** on real devices.

---

## References and related work

- SurferBot concept and experiments: {% cite Rhee_2022 %}
- Theory of wave-driven propulsion at interfaces: {% cite Benham_Devauchelle_Thomson_2024 %}

---

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot_v2' %}
    {% include repository/repo.liquid repository='elvispy/surferbot-differentiable' %}
</div>
