---
page_id: prj_sim
layout: page
title: "Solucionador de similitud dinámica para EDPs"
description: "Búsqueda simbólica de reducciones de escala de EDP → EDO"
img: "assets/img/julialogo.webp"
importance: 3
category: "fun"
related_publications: true
---

# Similitud por construcción: automatizar reducciones de EDP → EDO

Muchos problemas de transporte y fluidos esconden una **simetría de escala**. Cuando existe, un cambio de variables colapsa la EDP en una EDO (difusión, capa límite de Blasius, películas delgadas).
Esta herramienta de Julia **automatiza esa búsqueda**: prueba una familia de ansätze de similitud, resuelve los exponentes, reduce la EDP y transforma las condiciones de contorno.

---

## Qué hace

- **Analiza** una sintaxis de EDP restringida (campos, derivadas).
- **Busca** variables de similitud
  \( \eta = x^{a_1} y^{a_2} t^{a_3} \), \( u = x^{b_1} y^{b_2} t^{b_3} f(\eta) \) (variantes 1–2D).
- **Resuelve** ecuaciones de balance de exponentes para que todos los términos de la EDP se escalen de manera idéntica.
- **Reduce**: sustituye el ansatz, cancela factores y devuelve una **EDO en \(\eta\)**.
- **Transforma las condiciones de contorno/iniciales** en condiciones sobre \( f(\eta) \).
- **Emite artefactos**: exponentes, mapa de similitud, EDO reducida, condiciones de contorno transformadas como expresiones de Julia.

Construido sobre **Symbolics.jl**; las salidas se alimentan directamente a su integrador de EDO.

---

## Esquema del método

1. Tokeniza y diferencia simbólicamente la EDP.
2. Asigna pesos de escala a las variables y derivadas.
3. Iguala los exponentes entre los términos → pequeño sistema lineal en \(a_i,b_i\).
4. Si es resoluble, sustituye y simplifica a una EDO en \(\eta\).
5. Verifica la dependencia solo de \(\eta\); de lo contrario, informa "sin reducción de escala".

---

## Ejemplo

Ecuación de calor con decaimiento lineal:
\[
u_t = \kappa\,u_{xx} - \lambda u,\qquad x\in\mathbb{R},~ t>0.
\]

```julia
using SimilaritySolver  # espacio de nombres del paquete
pde = @pde du/dt ~ κ*d2u/dx2 - λ*u
bcs = ["u(±Inf,t)=0"]
result = find_similarity(pde, bcs; vars=[:x,:t], field=:u)
