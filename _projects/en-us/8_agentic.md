---
page_id: prj_agentic
layout: page
title: "a3dasm: scientific loops for agentic engineering"
description: An open, evidence-guided workflow for agents solving data-driven engineering problems
img: assets/img/agentic-metamaterial.gif
importance: 1
category: work
---

## From an agent graph to a scientific loop

a3dasm turns a graph of agents into an open research loop. The agents can
follow the evidence, change strategy, and decide which data to produce next.
The loop is guided by the scientific method: state a mechanism, choose an
experiment that can test it, retain the evidence, and let criticism change the
claim.

Each study starts with a data-driven engineering problem and a runnable
physical oracle. The workflow records hypotheses, simulation budgets,
diagnostics, critical review, and replication scripts alongside the result.
That makes an agent's scientific decisions inspectable and gives the next run
the evidence needed to improve on the last one.

<div class="row align-items-center">
  <div class="col-md-5">
    {% include figure.liquid path="assets/img/agentic-metamaterial.gif" alt="Animated finite-element simulation of a rocking-mast metamaterial coiling under compression" title="Rocking-mast benchmark simulation" class="img-fluid rounded z-depth-1" %}
    <p class="caption">A rocking-mast metamaterial coiling under axial compression in the supercompressible-material study.</p>
  </div>
  <div class="col-md-7">
    <h2>One case study, more than a fivefold advance</h2>
    <p>The supercompressible-material study asks agents to design a printable structure that coils under compression while carrying load. The workflow found a design that improves the state-of-the-art supercompressible reference by more than fivefold. It did so by turning an expensive finite-element oracle into a sequence of hypotheses, evaluations, and design decisions.</p>
  </div>
</div>

## A testbed for data-driven engineering

The same loop can work across engineering scales and disciplines. Current
studies include rocking-bag bioreactors, where motion and geometry must improve
oxygen transfer without damaging cells; interfacial locomotion, where a floating
body and its wave field must be designed together; inverse material
identification from multiaxial stress--strain data; and supercompressible
metamaterials.

Each study has an executable oracle, a limited evaluation budget, competing
objectives or constraints, and a scientific claim that can be tested.

## Research that compounds

Every run leaves a usable research record: the hypothesis, the data it
generated, the simulation ledger, the critic's verdict, and the script needed
to reproduce the result. Failed directions remain part of that record. The
result is cumulative engineering work that another researcher can inspect,
replay, and extend.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='bessagroup/f3dasm-agentic-benchmarks' %}
</div>
