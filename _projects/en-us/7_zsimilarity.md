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

# Similarity by construction: automate PDE → ODE reductions

Many transport and fluid problems hide a **scaling symmetry**. When it exists, a change of variables collapses the PDE to an ODE (diffusion, Blasius boundary layer, thin films).  
This Julia tool **automates that search**: it tests a family of similarity ansätze, solves for exponents, reduces the PDE, and transforms boundary conditions.

---

## What it does

- **Parse** a restricted PDE syntax (fields, derivatives).
- **Search** similarity variables  
  \( \eta = x^{a_1} y^{a_2} t^{a_3} \), \( u = x^{b_1} y^{b_2} t^{b_3} f(\eta) \) (1–2D variants).
- **Solve** exponent-balance equations so all PDE terms scale identically.
- **Reduce**: substitute the ansatz, cancel factors, and return an **ODE in \(\eta\)**.
- **Transform BCs/ICs** into conditions on \( f(\eta) \).
- **Emit artifacts**: exponents, similarity map, reduced ODE, transformed BCs as Julia expressions.

Built on **Symbolics.jl**; outputs feed directly into your ODE integrator.

---

## Method sketch

1. Tokenize and symbolically differentiate the PDE.  
2. Attach scaling weights to variables and derivatives.  
3. Equate exponents across terms → small linear system in \(a_i,b_i\).  
4. If solvable, substitute and simplify to an ODE in \(\eta\).  
5. Verify dependency only on \(\eta\); otherwise report “no scaling reduction.”

---

## Example

Heat equation with linear decay:
\[
u_t = \kappa\,u_{xx} - \lambda u,\qquad x\in\mathbb{R},~ t>0.
\]

```julia
using SimilaritySolver  # package namespace
pde = @pde du/dt ~ κ*d2u/dx2 - λ*u
bcs = ["u(±Inf,t)=0"]
result = find_similarity(pde, bcs; vars=[:x,:t], field=:u)
