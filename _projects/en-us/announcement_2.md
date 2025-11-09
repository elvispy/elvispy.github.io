---
layout: page
title: Julia at scale on heterogeneous clusters
description: Precompilation + CVMFS artifact delivery for fast, reproducible starts
importance: 2
img: assets/img/CERNlogo.webp
category: work
---

## Software for Experiments (EP-SFT), CERN — supervised by Graeme Stewart

I joined the 2024 [CERN Summer Student Programme](https://home.cern/summer-student-programme) to work on **startup latency and reproducibility** for Julia workloads used by HEP experiments.

### The problem
Large HEP pipelines launch thousands of short Julia jobs across heterogeneous nodes. Cold starts trigger **JIT + precompile** work on every node, wasting CPU time and causing tail latency. Sites also prefer **read-only, content-addressed** distribution (CernVM-FS), which complicates writable package depots.

### The approach
We built a workflow that **builds, signs, and publishes precompiled Julia system images and package artifacts** to CVMFS, then **hydrates per-node depots** on demand:

- **DepotDelivery.jl** orchestrates artifact bundling, version pinning, and cache layout.
- Artifacts are **content-addressed** (hash-stable), so nodes fetch identical byte streams.
- We support **multiple micro-architectures** by producing a small set of images (e.g., baseline `x86-64`, `x86-64-v3`), selected at runtime.
- A/B runs validated that the **same image** yields the **same method cache** and module graph locally and on the cluster.

### What it enables
- **Order-of-magnitude cuts** in cold-start latency on representative HEP stacks (e.g., jet reconstruction, Geant4 wrappers).
- **Deterministic starts**: identical artifacts across sites via CVMFS.
- **Zero per-node builds**: nodes mount and use precompiled images; no write access required.
- **Policy-friendly**: read-only distribution, content integrity, and rollbacks via hashes.

### Scope and portability
The method is **not HEP-specific**. Any site with heterogeneous hardware and read-mostly storage can adopt the pattern:
1) build images in a controlled CI environment,
2) publish to an immutable, content-addressed store,
3) select the closest micro-arch image at launch.

I presented this work at the **Julia for High-Energy Physics 2024 Workshop** (JuliaHEP 2024).

**Project:** [DepotDelivery.jl](https://github.com/JuliaComputing/DepotDelivery.jl)

<div style="float: left; margin: 10px;">
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7233730225589673984?compact=1" 
      height="600" width="450" frameborder="0" allowfullscreen="" title="Embedded post">
  </iframe>
</div>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo.liquid repository='JuliaComputing/DepotDelivery.jl' %}
</div>
