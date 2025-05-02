---
layout: page
title: My summer internship at CERN!
description: Enabling Julia to precompile in heterogeneous sytems and clusters
importance: 2
img: assets/img/CERNlogo.webp
category: work
---

## I worked in the software for experiments group (EP-SFT) under the supervision of Graeme Stewart at CERN.

This year, I was fortunate enough to be selected for the [CERN Summer Student Programme](https://home.cern/summer-student-programme) for the 2024's cohort. There has even been some media coverage on my experience:

<div style="float: left; margin: 10px;">
    <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7233730225589673984?compact=1" 
        height="600" width="450" frameborder="0" allowfullscreen="" title="Embedded post">
    </iframe>
</div>
The summer student programme is an opportunity to work in a project at the Largest Hadron Collider in the world. I was assigned a project in the software for experiments group at CERN, under the supervision of Graeme Stewart.

### Streamlining Julia for High-Energy Physics Applications

Julia has emerged as a powerful tool for scientific computing, combining high-level functionality with performance rivaling C/C++. However, its reliance on precompiled files causes startup delays, posing challenges for distributed systems. To address this, we developed a workflow that precompiles and caches Julia dependencies in the shared CernVM-FS (CVMFS) file system, enabling seamless distribution across compute nodes.

Testing with the Julia Jet Reconstruction and Geant4 wrapper packages, we achieved startup time reductions of up to 97%. Our framework also supports cross-compilation for diverse microarchitectures, ensuring efficient performance without degradation. This approach makes Julia more accessible for high-energy physics and distributed computing environments.

I presented my work at the [Julia for High Energy Physics 2024 Workshop](https://indico.cern.ch/event/1410341/contributions/6135602/).

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='JuliaComputing/DepotDelivery.jl' %}

</div>
