---
page_id: prj_sim
layout: page
title: "Dynamic-similarity solver for PDEs"
description: "Symbolic search for scaling reductions from PDE → ODE"
img: "assets/img/julialogo.webp"
importance: 3
category: "fun"
related_publications: true
---

## Automate PDE → ODE reductions via similarity

Before numerical solvers existed, physicists routinely tamed partial differential equations by finding a change of variables that collapsed them into ODEs. The diffusion equation, the Blasius boundary layer, thin-film spreading — all yield to this trick, called a similarity reduction. The catch: discovering the right change of variables requires pattern-matching by hand, and it is easy to miss one or get the exponents wrong.

This Julia package automates the search. You write the PDE; it finds the exponents.

The tool tests a family of power-law ansätze of the form
\[
\eta = x^{a_1} y^{a_2} t^{a_3}, \qquad u = x^{b_1} y^{b_2} t^{b_3} f(\eta),
\]
symbolically differentiates the PDE, attaches scaling weights to every term, and equates exponents to form a small linear system in the unknowns \(a_i, b_i\). If the system is consistent, it substitutes the ansatz, cancels common factors, and returns an ODE in \(\eta\) along with transformed boundary and initial conditions — ready to pass directly into your ODE integrator. If no scaling reduction exists, it says so.

Built on `Symbolics.jl`, it handles 1D and 2D variants and emits the exponents, similarity map, reduced ODE, and transformed boundary conditions as Julia expressions.

Heat equation with linear decay:
\[
u_t = \kappa\,u_{xx} - \lambda u,\qquad x\in\mathbb{R},~ t>0.
\]

```julia
using SimilaritySolver
pde = @pde du/dt ~ κ*d2u/dx2 - λ*u
bcs = ["u(±Inf,t)=0"]
result = find_similarity(pde, bcs; vars=[:x,:t], field=:u)
# => η = x / sqrt(t),  u = exp(-λt) * f(η),  f'' + η/2 * f' = 0
```

The package recovers the standard Gaussian similarity solution and hands back an ODE that any Julia integrator can solve in milliseconds.
