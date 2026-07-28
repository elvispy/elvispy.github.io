---
page_id: prj_surferbot
layout: page
title: Flexible Surferbot
description: Wave-driven propulsion by a flexible raft
img: assets/img/flexible-surferbot-simulation.gif
importance: 1
category: work
related_publications: true
math: true
---

## Wave-driven propulsion, resolved at the free surface

A vibrating flexible raft can move without fins or jets: its deformation radiates an asymmetric surface-wave field, whose momentum imbalance creates thrust. This project turns the wave-driven flexible raft mechanism into a numerical system that can be inspected, swept, and reproduced.

<div style="width: 100%; display: flex; justify-content: center;">
  <div style="position: relative; width: 80%; padding-bottom: 45%; height: 0; overflow: hidden;">
    <iframe
      src="https://www.youtube.com/embed/PQF6yGAs-TA?autoplay=1&mute=1&si=0qH_j8Lccw4ljD_3"
      title="Published SurferBot demonstration"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen>
    </iframe>
  </div>
</div>
<p class="caption"><strong>Published SurferBot demonstration.</strong> Physical context for the mechanism; this is not the project's simulation output.</p>

{% include figure.liquid path="assets/img/flexible-surferbot-simulation.gif" alt="Numerical simulation of a flexible raft and its asymmetric wake" title="Flexible Surferbot numerical simulation" caption="Numerical simulation of a flexible raft and its asymmetric wake." %}

The Julia solver couples a flexible beam to a free-surface flow model, resolving raft deformation, the radiated wave field, and mean thrust in one calculation. Parameter sweeps and figure scripts make the numerical evidence reproducible; MATLAB-parity checks and the zero-net-thrust symmetry invariant keep the implementation anchored to known behavior.

{% include figure.liquid path="assets/img/flexible-surferbot-modal-map.png" alt="Wake-asymmetry map across motor placement and flexural rigidity" title="Wake-asymmetry map across motor placement and flexural rigidity" caption="Across motor position x_M/L and normalized flexural rigidity κ, colour shows the wake-asymmetry diagnostic α. Columns compare Full Sweep, 8-mode, and 4-mode models." %}

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot' %}
</div>
