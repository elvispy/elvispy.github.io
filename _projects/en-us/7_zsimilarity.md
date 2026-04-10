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

A PDE with two independent variables sometimes admits a substitution that collapses it into an ODE — a **similarity reduction** — but the right scaling exponents must be matched term by term. The algebra is routine enough to automate yet tedious enough that valid reductions frequently go unnoticed.

This Julia package takes a PDE as a string, classifies its variables, searches for a scaling transformation, and returns the reduced ODE together with the transformed boundary conditions — ready to pass to any ODE solver.

The Blasius flat-plate boundary layer satisfies

\[
\psi_y \psi_{xy} - \psi_x \psi_{yy} - \nu\,\psi_{yyy} = 0
\]

with \(\psi(x,0)=0\), \(\psi_y(x,0)=0\), \(\psi_y(x,\infty)=U_\infty\):

```julia
using SimilaritySolver

pde = "dψ/dy * d2ψ/dxdy - dψ/dx * d2ψ/d2y - ν * d3ψ/d3y = 0"
bcs = "ψ(x, y=0) = 0; dψ/dy(x, y=0) = 0; dψ/dy(x, y=Inf) = U∞"

result = find_similarity(pde, bcs; parameters=["ν", "U∞"])
# result["similarity_variable"] => η = y * x^m
# result["output_similarity"]   => ψ = x^n f(η)
# result["PDE_similarity"]      => f''' + 0.5 f f'' = 0  (Blasius ODE)
```

The package recovers the classical Blasius reduction without the user specifying the form of the **ansatz** (the trial substitution). Built on `Symbolics.jl` and `SymbolicUtils.jl`, it handles 1D and 2D PDEs. Extending the search to three or more independent variables, and to non-power-law scalings such as logarithmic symmetries, remains open.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/SimilaritySolver.jl' %}
</div>
