---
page_id: prj_km
layout: page
title: "Kinematic Match: a smooth-contact framework for deformable impacts"
description: "A geometric constraint that makes collisions stable, accurate, and optimization-ready"
img: "assets/img/km-sphere.gif"
importance: 1
category: "work"
related_publications: true
---


## Turning impacts into equations that behave

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/km-sphere.gif" title="Simulation of a sphere impacting an elastic membrane" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Simulation example: a rigid sphere impacting an elastic membrane.
    </figcaption>
</figure>

Contact mechanics is a discontinuity problem: two surfaces that were separate become instantaneously constrained at collision. Most numerical contact models handle this by inserting stiff penalty forces or toggling hard constraints between "touching" and "not touching." Both approaches make solver stiffness mesh-dependent, suppress correct energy transfer at the interface, and block gradient-based optimization.

The **Kinematic Match (KM)** framework replaces the contact condition entirely. Instead of penalizing interpenetration, KM imposes a single geometric requirement: the angle of incidence between the two surfaces must evolve continuously through impact. In discrete form, this couples curvature and normal vectors across the interface at each time step, producing a contact manifold that is continuously differentiable, requires no switching logic, and introduces no tuning constants. The method is compatible with finite-difference, finite-element, and interface-capturing schemes.

In _Proceedings of the Royal Society A_ ({% cite aguero2022impact %}), we applied KM to a rigid sphere striking an elastic membrane, matching experimental deformation profiles and energy-transfer rates. In _Journal of Fluid Mechanics_ ({% cite gabbard2025dropreboundlowweber %}), we extended the framework to droplets rebounding on fluid baths — a regime sensitive to the contact model's treatment of capillary forces and coalescence — reproducing observations that conventional CFD misses.

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

Because the contact manifold remains differentiable, the same formulation integrates directly with adjoint-based inference and gradient-based design. We are extending it to multi-material and biological interfaces where surfaces can merge or tear.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/kinematic-match-sphere' %}
    {% include repository/repo.liquid repository='elvispy/km-dropplet-solidsubstrate-v3' %}
    {% include repository/repo.liquid repository='elvispy/km-dropplet-onto-bath' %}
</div>
