---
page_id: prj_agentic
layout: page
title: Agentic engineering under a real research bar
description: Open benchmarks for agents that design, simulate, and defend engineering claims
img: assets/img/agentic-metamaterial.gif
importance: 1
category: work
---

## A score is not a discovery

An agent can rank thousands of candidate designs. That is not enough to make a
scientific result. The harder task is deciding what survives when the model,
the mechanism, and the evidence are challenged.

I am building open benchmarks that put agents inside that harder loop. Each
benchmark begins with an unresolved engineering problem and a physical oracle.
The agent has to state a mechanism before spending compute, choose experiments
under a finite budget, retain failed hypotheses, and deliver a replication
script. A critic can still refuse the claim.

<div class="row align-items-center">
  <div class="col-md-5">
    <figure>
      <img src="{{ '/assets/img/agentic-metamaterial.gif' | relative_url }}" alt="Animated finite-element simulation of a rocking-mast metamaterial coiling under compression" class="img-fluid rounded z-depth-1" style="width: 100%; height: auto;">
      <figcaption class="caption">A rocking-mast candidate coils as its top ring descends and rotates. This is an actual simulation from the benchmark record.</figcaption>
    </figure>
  </div>
  <div class="col-md-7">
    <h2>5.9× is not the answer</h2>
    <p>The current numerical leader reaches 5.9 times the Bessa baseline. It is deliberately not recorded as the benchmark answer: it reshapes a known cross-section family instead of supplying the new mechanism the problem asks for. The benchmark keeps that distinction explicit: a large simulated number is progress, not yet a discovery.</p>
  </div>
</div>

## A hard problem, with a hard oracle

The first benchmark asks for a printable rocking-mast metamaterial that coils
under axial compression rather than crushing. The target is not merely a higher
buckling load. A design must coil through 80% compression, remain below a 2%
local-strain ceiling, be physically credible as a printed object, and clear
twice the Bessa baseline through a genuinely new mechanism.

That makes it a useful test of agentic research. A system cannot get credit by
optimizing inside a known family, by finding a numerical artefact, or by
skipping the expensive check that could disqualify its own headline result.

## Evidence, including the failures

These benchmarks cover supercompressible materials, bioreactor design, and
fluid--structure interaction. The oracles range from Abaqus jobs on SLURM to
two-phase DNS and Julia solvers. A run leaves a record of its hypothesis,
simulation ledger, critic verdict, and replication script. The metamaterial
study already preserves sixteen runs and roughly forty-nine ideas, including
promising results later rejected by a stronger mechanical check.

The point is not to make an agent look busy. It is to make a scientific claim
auditable: another group should be able to replay the evidence, inspect why an
idea was retired, and decide whether the stated mechanism earned the result.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='bessagroup/f3dasm-agentic-benchmarks' %}
</div>
