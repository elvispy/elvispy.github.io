---
layout: page
title: Julia at scale on heterogeneous clusters
description: Precompilation + CVMFS artifact delivery for fast, reproducible starts
importance: 2
img: assets/img/CERNlogo.webp
category: work
---

## Software for Experiments (EP-SFT), CERN, supervised by Graeme Stewart

I joined the 2024 [CERN Summer Student Programme](https://home.cern/summer-student-programme) to work on startup latency and reproducibility for Julia workloads in high-energy physics (HEP) pipelines.

Large HEP pipelines launch thousands of short Julia jobs across heterogeneous nodes. Each cold start triggers JIT compilation and package precompilation from scratch, wasting CPU time and causing unpredictable tail latency. Sites also require read-only, content-addressed distribution (CernVM-FS), which rules out writable package depots.

We built a workflow that builds, signs, and publishes precompiled Julia system images and package artifacts to CVMFS, then hydrates per-node depots on demand. The core tool, `DepotDelivery.jl`, orchestrates artifact bundling, version pinning, and cache layout. Artifacts are content-addressed (hash-stable) so nodes fetch identical byte streams regardless of site. A small set of micro-architecture images (e.g., baseline `x86-64`, `x86-64-v3`) covers the hardware diversity of the grid and are selected at runtime. On representative HEP stacks (jet reconstruction, Geant4 wrappers), cold-start latency dropped by an order of magnitude; nodes mount precompiled images with no write access and no local builds.

I presented this work at the Julia for High-Energy Physics 2024 Workshop (JuliaHEP 2024).

<div style="float: left; margin: 10px;">
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7233730225589673984?compact=1"
      height="600" width="450" frameborder="0" allowfullscreen="" title="Embedded post">
  </iframe>
</div>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo.liquid repository='JuliaComputing/DepotDelivery.jl' %}
</div>
