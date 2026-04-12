---
page_id: prj_sim
layout: page
title: "Dynamic-similarity solver for PDEs"
description: "Symbolic search for scaling reductions from PDE → ODE"
img: "assets/img/julialogo.webp"
importance: 2
category: "work"
related_publications: true
math: true
---

The KdV equation \(u_t + 6u\,u_x + u_{xxx} = 0\) admits a self-similar solution where the relevant combination of variables is \(\eta = x\,t^{-1/3}\) and the amplitude decays as \(t^{-2/3}\). Those exponents follow from requiring each term in the PDE to scale identically — a constraint that reduces to a linear system — but working it out by hand means matching term by term, and the algebra is error-prone enough that valid reductions frequently go unnoticed.

The package automates this via the **dilation method**: it assigns a formal scaling exponent to each variable and term, writes the invariance constraint as a linear system in those exponents, and reads the reduced ODE directly from the null space of that linear system. No candidate powers need to be guessed or scanned; if a power-law similarity exists, the method finds it exactly. A string-based wrapper (`find_similarity_v2`) is also available for users who prefer not to work with `Symbolics.jl` expressions directly.

```julia
using SimilaritySolver, Symbolics

@variables x t u(..)
Dt = Differential(t); Dx = Differential(x)
kdv = Dt(u(x,t)) + 6*u(x,t)*Dx(u(x,t)) + Dx(Dx(Dx(u(x,t))))

results = find_ode_dilation(kdv; indep_vars=[x,t], dep_vars=[u(x,t)])
# results[1]["similarity_variable"]  =>  x * t^(-1//3)
# results[1]["gamma"]                =>  -2//1   (u scales as t^(-2/3))
```

The method returns all valid similarity reductions, not just one. It currently handles two independent variables with power-law scalings; extending to three or more variables and to non-power-law symmetries (logarithmic, spiral) is ongoing.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/SimilaritySolver.jl' %}
</div>
