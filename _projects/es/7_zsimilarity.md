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

## Automatice las reducciones EDP → EDO mediante similitud

Antes de que existieran los solucionadores numéricos, los físicos domaban rutinariamente las ecuaciones diferenciales parciales encontrando un cambio de variables que las colapsaba en EDOs. La ecuación de difusión, la capa límite de Blasius, la propagación de películas delgadas — todas ceden ante este truco, llamado reducción por similitud. El problema: descubrir el cambio de variables correcto requiere emparejamiento de patrones a mano, y es fácil pasar por alto uno o equivocarse en los exponentes.

Este paquete de Julia automatiza la búsqueda. Usted escribe la EDP; él encuentra los exponentes.

La herramienta prueba una familia de ansätze de ley de potencia de la forma
\[
\eta = x^{a_1} y^{a_2} t^{a_3}, \qquad u = x^{b_1} y^{b_2} t^{b_3} f(\eta),
\]
diferencia simbólicamente la EDP, asigna pesos de escala a cada término e iguala los exponentes para formar un pequeño sistema lineal en las incógnitas \(a_i, b_i\). Si el sistema es consistente, sustituye el ansatz, cancela los factores comunes y devuelve una EDO en \(\eta\) junto con las condiciones de contorno e iniciales transformadas — lista para pasar directamente a su integrador de EDOs. Si no existe una reducción de escala, lo indica.

Construido sobre `Symbolics.jl`, maneja variantes 1D y 2D y emite los exponentes, el mapa de similitud, la EDO reducida y las condiciones de contorno transformadas como expresiones de Julia.

Ecuación de calor con decaimiento lineal:
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

El paquete recupera la solución de similitud gaussiana estándar y devuelve una EDO que cualquier integrador de Julia puede resolver en milisegundos.