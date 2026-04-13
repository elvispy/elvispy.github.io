---
page_id: prj_sim
layout: page
title: "Solucionador de similitud dinámica para EDPs"
description: "Búsqueda simbólica de reducciones de escala de EDP → EDO"
img: "assets/img/julialogo.webp"
importance: 2
category: "work"
related_publications: true
math: true
---

Una EDP con dos variables independientes admite a veces una sustitución que la colapsa en una EDO — una **reducción de similitud** — pero la sustitución correcta no es obvia: equivale a encontrar qué escalas dejan la ecuación invariante.

El paquete automatiza esto mediante el **método de dilatación**: asigna un exponente de escala formal a cada variable y término, escribe la restricción de invariancia como un sistema lineal en esos exponentes, y lee la EDO reducida directamente del espacio nulo de ese sistema lineal. No es necesario adivinar ni escanear potencias candidatas; si existe una similitud de ley de potencia, el método la encuentra exactamente. También hay disponible un envoltorio basado en cadenas de texto (`find_similarity_v2`) para usuarios que prefieren no trabajar directamente con expresiones de `Symbolics.jl`.

La ecuación de KdV $u_t + 6u\,u_x + u_{xxx} = 0$ tiene una estructura auto-similar conocida:

```julia
using SimilaritySolver, Symbolics

@variables x t u(..)
Dt = Differential(t); Dx = Differential(x)
kdv = Dt(u(x,t)) + 6*u(x,t)*Dx(u(x,t)) + Dx(Dx(Dx(u(x,t))))

results = find_ode_dilation(kdv; indep_vars=[x,t], dep_vars=[u(x,t)])
# results[1]["similarity_variable"]  =>  x * t^(-1//3)
# results[1]["gamma"]                =>  -2//1   (u escala como t^(-2/3))
```

El método devuelve todas las reducciones de similitud válidas, no solo una. Actualmente maneja dos variables independientes con escalas de ley de potencia; la extensión a tres o más variables y a simetrías no de ley de potencia (logarítmicas, espirales) está en curso.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/SimilaritySolver.jl' %}
</div>
