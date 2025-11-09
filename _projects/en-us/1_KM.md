---
page_id: prj_km
layout: page
title: Kinematic Match, a smooth-contact framework for deformable impacts
description: A geometric constraint that makes collisions stable, accurate, and optimization-ready
img: assets/img/km-sphere.gif
importance: 1
category: work
related_publications: true
---

## Turning impacts into equations that behave

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/km-sphere.gif" title="Simulation of a sphere impacting an elastic membrane" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Simulation example: a rigid sphere impacting an elastic membrane.
    </figcaption>
</figure>

Collisions between soft or deformable bodies are deceptively difficult to compute.  
As two surfaces meet, their geometry changes faster than the solver can track, and most contact models handle this by inserting **stiff penalty forces** or discontinuous switches between “touch” and “separate.” These shortcuts make simulations unstable, overly sensitive to mesh resolution, and blind to real energy transfer.

The **Kinematic Match (KM)** framework replaces these ad-hoc rules with a **single geometric condition:** the **angle of incidence between contacting surfaces must evolve smoothly**. This transforms impact from a discontinuous event into a **well-posed, differentiable constraint**, one that classical solvers can enforce directly.

---

## Why it matters

KM provides a stable way to simulate **deformable collisions and rebounds**—problems that span everything from soft robotics to droplet impact and planetary accretion.  
Instead of forcing contact through empirical parameters, KM treats it as a **compatibility condition** between surfaces, ensuring a continuous “handshake” as they approach, compress, and separate. This approach yields:

- Predictable energy dissipation without tuning constants.
- Stable convergence under coarse meshes.
- Direct compatibility with optimization and adjoint-based inference.

---

## The method in one paragraph

KM augments the governing equations with a **smooth contact-angle constraint** defined along the interface. In discrete form, it couples curvature and normal vectors between the two contacting surfaces, forcing them to align smoothly through time. The result is a **continuously differentiable contact manifold**—no kinks, no discontinuities—allowing stable integration across impact, rebound, and detachment. The method can be implemented in **finite-difference, finite-element, or interface-capturing schemes** with minimal changes to existing codebases.

---

## Evidence from experiments and simulations

- **Solid–solid:** In _Proceedings of the Royal Society A_ ({% cite aguero2022impact %}), we validated KM by simulating a rigid sphere striking an elastic membrane. The method captured not only deformation profiles but also energy-transfer rates observed experimentally.
- **Fluid–structure:** In _Journal of Fluid Mechanics_ ({% cite gabbard2025dropreboundlowweber %}), KM was extended to droplets rebounding on fluid baths, accurately reproducing capillary waves and coalescence thresholds—regimes where conventional CFD fails.

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
    KM applied to a droplet impacting a fluid bath—capturing rebound and coalescence dynamics.
  </figcaption>
</figure>

---

## Why it’s efficient and general

Because KM expresses contact through geometry rather than penalty forces, it:

- **Improves conditioning** of linear systems at impact.
- **Eliminates the need for localized remeshing** near the interface.
- **Works across materials and scales**, from soft robotics to granular impacts.
- **Remains differentiable**, so it’s compatible with gradient-based design, parameter inference, and Bayesian optimization pipelines.

---

## What’s next

We are extending KM to multi-material and bio-inspired systems, where interfaces can grow, merge, or tear. The differentiable constraint structure also opens the door to **machine-learning surrogates** that learn impact dynamics from simulation data, accelerating design tasks in robotics and material science.

---

Collisions aren’t discrete events—they are **conversations between geometries**.  
Kinematic Match gives that dialogue a precise mathematical form: smooth, stable, and computable.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/kinematic-match-sphere' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-solidsubstrate-v3' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-onto-bath' %}  
</div>
