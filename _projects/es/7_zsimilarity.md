---
page_id: prj_sim
layout: page
title: "Solucionador de similitud dinámica para EDP"
description: "Búsqueda simbólica de reducciones por escalado de EDP → EDO"
img: "assets/img/julialogo.webp"
importance: 2
category: "work"
related_publications: true
math: true
---

La ecuación KdV $u_t + 6u\,u_x + u_{xxx} = 0$ admite una solución autosimilar donde la combinación relevante de variables es $\eta = x\,t^{-1/3}$ y la amplitud decae como $t^{-2/3}$. Esos exponentes se derivan de exigir que cada término de la EDP escale de manera idéntica. El requisito se reduce a un sistema lineal en los exponentes de escalado. Resolverlo a mano significa igualar términos uno por uno, y el álgebra es propenso a errores: reducciones válidas pueden pasar desapercibidas.

El paquete automatiza esto mediante el **método de dilatación**: asigna un exponente de escalado formal a cada variable y término, escribe la restricción de invariancia como un sistema lineal en esos exponentes y lee la EDO reducida directamente del espacio nulo de ese sistema lineal. No es necesario adivinar ni escanear potencias candidatas; si existe una similitud de ley de potencia, el método la encuentra exactamente. También está disponible un envoltorio basado en cadenas (`find_similarity_v2`) para usuarios que prefieren no trabajar directamente con expresiones de `Symbolics.jl`.

```julia
using SimilaritySolver, Symbolics

@variables x t u(..)
Dt = Differential(t); Dx = Differential(x)
kdv = Dt(u(x,t)) + 6*u(x,t)*Dx(u(x,t)) + Dx(Dx(Dx(u(x,t))))

results = find_ode_dilation(kdv; indep_vars=[x,t], dep_vars=[u(x,t)])
# results[1]["similarity_variable"]  =>  x * t^(-1//3)
# results[1]["gamma"]                =>  -2//1   (u scales as t^(-2/3))
```

El método devuelve todas las reducciones de similitud válidas, no solo una. Actualmente maneja dos variables independientes con escalados de ley de potencia; la extensión a tres o más variables y a simetrías no de ley de potencia (logarítmicas, espirales) está en curso.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/SimilaritySolver.jl' %}
</div>