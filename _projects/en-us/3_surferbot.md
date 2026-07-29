---
page_id: prj_surferbot
layout: page
title: Enabling interfacial locomotion
description: Wave-driven propulsion by a flexible raft
img: assets/img/surferbot.gif
importance: 1
category: work
related_publications: true
math: true
---

## A vibration can choose a direction

A compact raft has no propeller, no fin, and no steady push. Yet move its vibrating motor away from the centre and the waves it radiates no longer leave equally in both directions. The wake becomes asymmetric; that asymmetric momentum flux gives the raft a direction of travel. The surprising part is that a zero-mean vibration can produce a nonzero mean thrust—not by hiding a stroke cycle, but by changing how a deformable body launches waves into the surface.

That is a useful problem whenever actuation and structure are inseparable: a mechanism can look symmetric in a CAD model while its dynamics select a direction. The question is not simply whether the raft bends, or where the motor sits. It is how those choices reshape the waves that carry momentum away.

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
<p class="caption"><strong>Published SurferBot demonstration.</strong> A physical demonstration of the mechanism; it is not numerical output from this repository.</p>

{% include figure.liquid path="assets/img/flexible-surferbot-simulation.gif" alt="Numerical simulation of a flexible raft and its asymmetric wake" title="Flexible Surferbot numerical simulation" caption="Numerical simulation: the flexible raft, the radiated wave field, and its asymmetric wake evolve together." %}

The calculation has to keep the whole conversation intact. The coupled beam–free-surface model resolves deformation, the outgoing wave field, and mean thrust in one system. Motor placement changes which bending modes are excited; flexural rigidity changes how those modes feed the waves. The resulting thrust is not monotonic in either variable. A static deformation or motor placement alone cannot tell us which way the raft will go.

I created the reproducible Julia analysis workflow behind that calculation: parameter sweeps, modal reduction, MATLAB parity tests, and figure generation from the same data. I also made the symmetry check explicit. In the reflection-symmetric pure-gravity benchmark—the symmetric benchmark—centred forcing must yield zero net thrust; if it does not, the discretization has manufactured propulsion. That invariant is not carried over to cases with capillary edge terms, where the exact reflection symmetry is physically broken.

{% include figure.liquid path="assets/img/flexible-surferbot-thrust-map.png" alt="Signed normalized thrust across motor placement and flexural rigidity" title="Flexible Surferbot thrust map" caption="This design map shows signed normalized thrust across motor position x_M/L and normalized flexural rigidity κ. Red and blue regions are opposite directions of thrust, revealing where the direction changes; the symbols mark the published paper cases." %}

The map makes the design consequence visible: small shifts in motor placement can reverse the direction of travel, and the same actuator can behave differently as the raft stiffens or softens. It is a compact testbed for a broader R&amp;D habit—treating the body, the forcing, and the surrounding medium as one dynamical design problem rather than three independent knobs.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot' %}
</div>
