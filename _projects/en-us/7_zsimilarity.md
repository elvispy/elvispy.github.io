---
page_id: prj_sim
layout: page
title: A dynamic similarity solver for fluid dynamics.
description: A symbolic PDE finder for similarity solutions.
img: assets/img/julialogo.webp
importance: 3
category: fun
related_publications: true
---

# 🌀 Cracking PDEs with Similarity: Automating a Classic Physics Trick

In fluid mechanics, heat transfer, or even population dynamics, many problems start with a messy-looking **partial differential equation (PDE)**. But sometimes, there’s a hidden trick—an ancient physics move—that transforms a complex PDE into a much simpler **ordinary differential equation (ODE)**. That trick is called **dynamical similarity**.

This Julia package helps you **automate the search for those transformations**—using symbolic computation and a touch of math elegance.

---

## What is Similarity, Really?

Similarity solutions arise when you can rewrite a PDE in terms of a new variable (like \( \eta = y / \sqrt{x} \)) that combines space and time into a single coordinate. This collapses a 2D or 3D problem into 1D, making it **much easier to analyze or solve**.

You’ve probably seen it in boundary layers (Blasius), diffusion (error function), or wave propagation. The idea is: **if the physics “scales” in the right way**, then so should the solution.

But finding the right substitution isn’t always obvious. That’s where this tool comes in.

---

## 🔧 What This Tool Does

This Julia package:

- Parses symbolic PDEs like `"du/dt + 6*u*du/dx + d3u/d3x = 0"`
- Checks if there exists a **change of variables** (\( \eta = x y^m \), \( u = x^n f(\eta) \)) that simplifies the equation
- Returns a reduced ODE if successful
- Parses and transforms **boundary conditions** too
- Outputs all the substitutions and symbolic forms used

It's built using [Symbolics.jl](https://github.com/JuliaSymbolics/Symbolics.jl), the symbolic engine for the Julia language.

---

## ✨ Example: Reduce a PDE to an ODE

```julia
result = find_similarity("du/dt + 6 * u * du/dx + d3u/d3x = 0", "u(x=Inf, t) = 0")

# Output:
# → similarity variable η = x * t^m
# → solution guess u = x^n * f(η)
# → simplified ODE returned!
```

You don’t need to manually compute derivatives or try a dozen substitutions. This function automates all of that for you.

---

## 📘 Who’s This For?

This tool is for:

- Engineering students studying transport, waves, or fluid mechanics
- Applied mathematicians exploring symmetry and scaling
- Anyone trying to symbolically reduce PDEs to something tractable

---

## 🧠 Behind the Scenes

- It uses symbolic differentiation to test if a substitution “kills off” the PDE’s dependence on \( x \), \( y \), or \( t \)
- If so, it simplifies the result and checks if it looks like an ODE
- It tries a grid of possible powers \( n, m \) using rational guesses
- It even parses differential operators like `d2x/dy` from strings

---

## 📌 Try It Out

Want to see it in action or use it in your own models?

🧪 [GitHub Repository →](https://github.com/elvispy/similarity-pde-solver)

---

## 🌍 Why This Matters

Similarity isn’t just elegant—it’s practical. It appears in:

- Drag coefficients that scale with Reynolds number
- Heat penetration depth in conduction problems
- Boundary layer theory in aerodynamics

This tool helps **democratize that power**—making it accessible to students, teachers, and researchers alike.

---

The next time you’re staring at a tough PDE... maybe it just needs the right variable change. 🧠➞📉

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/SimilaritySolver.jl' %}  
</div>
