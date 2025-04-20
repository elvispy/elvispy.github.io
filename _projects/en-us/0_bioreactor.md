---
page_id: prj_bioreactor
layout: page
title: Bioreactor optimization
description: Simulating the Future of Meat: A Fluid Dance in Lab-Grown Steaks
img: assets/img/km-sphere.gif
importance: 1
category: work
related_publications: true
---

# 🌱 Simulating the Future of Meat: A Fluid Dance in Lab-Grown Steaks

Imagine a world where your burger doesn’t come from a cow grazing a field but from a bioreactor humming quietly in a lab. This isn’t science fiction—it’s the promise of **cultivated meat**, a sustainable alternative to traditional livestock farming. But here’s the twist: growing meat from cells isn’t just about biology. It’s also about solving a _fluid dynamics puzzle_.

---

## The Problem: Why Rocking Bioreactors Need a “Gentle Touch”

Cultivated meat starts with animal cells multiplying in a nutrient-rich broth inside bioreactors. Among these, **rocking bioreactors**—think of a shallow tray tilting rhythmically like a seesaw—are rising stars. The have the potential to be scalable and gentler on fragile cells than traditional tanks with whirling blades. But there’s a catch: if the rocking motion is too aggressive, cells get battered by chaotic flows. Too timid, and oxygen and nutrients pool unevenly, starving the cells.

So, how do we find the perfect rhythm?

---

## Cracking the Code with Computational Fluid Dynamics

Enter **Basilisk**, an open-source fluid dynamics platform. My lab works on simulations of a rocking bioreactor—a rectangular “cellbag” filled with water (mimicking cell culture) and air ({% cite kim2025simulationmodelingframeworkfluid %}). We simulated how fluids slosh, swirl, and mix as the bioreactor tilts, tracking everything from oxygen bubbles to invisible forces that could stress cells.

The goal? To answer three big questions:

1. **How does the rocking motion create “hidden currents” that mix nutrients?**
2. **Where does oxygen flow—or stall—inside the broth?**
3. **When does gentle shaking turn into cell-damaging chaos?**

---

## The “Lazy River” Effect: Steady Streaming

Picture a river flowing lazily in loops. In our simulations, we discovered something similar: when the bioreactor rocks, it generates swirling vortices that merge over time into **steady streams**. These streams act like underwater conveyor belts, nudging nutrients and oxygen toward hungry cells.

Faster rocking amplifies these streams, improving mixing—but only up to a point. Push too hard, and the flow fractures into turbulence, like a serene river transforming into whitewater rapids. Cells, much like tiny kayakers, wouldn’t survive the ride.

---

## Oxygen’s Secret Dance: Resonance and Refresh

Oxygen is life for cells, but it’s tricky to deliver. Our simulations revealed a fascinating phenomenon: at specific rocking frequencies, the bioreactor enters **resonance**. Think of it like pushing a swing at just the right moment—the fluid’s motion syncs perfectly with the rocking, creating waves that splash oxygen-rich fluid deeper into the broth. This “sweet spot” boosts oxygen transfer without粗暴 shaking.

But resonance is a double-edged sword. In some cases, it amplified stress near the walls—a reminder that every design choice requires balance.

---

## Why This Matters: From Lab to Dinner Table

Cultivated meat could slash agriculture’s environmental footprint, but scaling production is a monumental challenge. Our work bridges biology and engineering, offering a roadmap to:

- **Optimize bioreactor designs computationally**—saving years of trial-and-error.
- **Predict cell-friendly conditions**—no more guessing which rocking speed avoids turbulence.
- **Democratize tools**—our open-source code lets researchers worldwide tweak and test virtual bioreactors.

The dream? Affordable, large-scale bioreactors that churn out juicy lab-grown steaks with minimal energy and zero animal suffering.

---

## What’s Next?

We’re expanding our simulations to 3D bioreactors with real-world cellbag shapes and modeling the gooey, non-Newtonian fluids that actual cell cultures resemble. Down the line, we’ll integrate virtual cell growth to predict how tiny tweaks to fluid flow could multiply meat yields.

---

## Join the Movement

This isn’t just about equations and code—it’s about reshaping how humanity eats. If you’re curious to play with our simulations or dive deeper, check out our [GitHub repository](https://github.com/rcsc-group/BioReactor) or read the full study [here](https://arxiv.org/abs/2504.05421).

The future of food is a dance of fluids, cells, and innovation. Let’s make it sustainable—one simulated bioreactor at a time. 🌍🔬

---

_Got questions about fluid dynamics, cell burgers, or the future of food tech? Let’s chat!_ 🍔✨

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/kinematic-match-sphere' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-solidsubstrate-v3' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-onto-bath' %}  
</div>
