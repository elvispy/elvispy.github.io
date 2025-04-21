---
page_id: prj_km
layout: page
title: Simulating deformable impacts
description: The kinematic match method
img: assets/img/km-sphere.gif
importance: 1
category: work
related_publications: true
---

## The Problem: Why Collisions Are More Than Just "Bouncing"

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/km-sphere.gif" title="example image" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Simulation example of a solid sphere impacting an elastic membrane.
    </figcaption>
</figure>

Inelastic collisions—where objects don’t just rebound but deform, stick, or fragment—are governed by nonlinear dynamics that defy simple equations. Traditional models often oversimplify contact mechanics, ignoring how materials _adapt_ during impact. For instance, a soft robot’s silicone "fingers" gripping an object or a water droplet splashing on a vibrating surface involves intricate coupling between elasticity, fluid dynamics, and geometry .

---

## The KM Framework: Smoothing Out the Chaos

At its core, the KM framework introduces (see {% cite aguero2022impact%}) a **geometric constraint** on contacting surfaces: the angle of incidence between colliding objects must remain smooth. Think of it as ensuring a "handshake" between materials—no sharp edges, no sudden jumps. This approach is:

1. **Intuitive**: Unlike brute-force simulations, KM’s constraints mirror real-world behavior, making it easier to implement .
2. **Versatile**: It works with finite elements, finite differences, or even machine learning solvers.
3. **Efficient**: By avoiding costly mesh refinements, KM excels in scenarios like low-velocity droplet impacts, where traditional methods struggle .

In our [recent study](https://royalsocietypublishing.org/doi/10.1098/rspa.2022.0340) , we validated KM against experiments involving a steel sphere striking an elastic membrane. The results matched not just deformation patterns but also energy dissipation rates—a rarity in collision modeling .

---

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
    Simulation example of a solid sphere impacting an elastic membrane.
  </figcaption>
</figure>

## From Robots to Raindrops: Why This Matters

### 1. **Soft Robotics**

KM enables precise modeling of grippers interacting with delicate objects, ensuring forces are distributed without damage—critical for medical robotics or fruit-picking machines.

### 2. **Astrophysics**

Simulating asteroid collisions or planetary accretion requires handling fragmented, deformable bodies. KM’s ability to manage irregular contact surfaces could refine models of cosmic dust aggregation .

### 3. **Fluid-Structure Interactions**

Our ongoing work applies KM to water droplets hitting fluid baths—a problem with applications in inkjet printing and pesticide spraying. Early results show KM captures capillary waves and coalescence better than conventional CFD .

---

## What’s Next?

We’re expanding KM to:

- **Multi-material collisions**: Think ice hitting water (relevant for cryogenic engineering).
- **Biological systems**: Simulating cell-matrix interactions in tissue engineering bioreactors .
- **Machine learning integration**: Training neural networks to predict KM constraints, reducing compute time.

---

Collisions aren’t just endpoints—they’re conversations between materials. With KM, we’re decoding that dialogue, one impact at a time. 🚀

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/kinematic-match-sphere' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-solidsubstrate-v3' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-onto-bath' %}  
</div>
