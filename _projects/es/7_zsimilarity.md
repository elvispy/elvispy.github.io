---
page_id: prj_sim
layout: page
title: Un solucionador de similitud dinámica para la dinámica de fluidos.
description: Un buscador simbólico de Ecuaciones Diferenciales Parciales (EDP) para soluciones de similitud.
img: assets/img/julialogo.webp
importance: 3
category: fun
related_publications: true
---

# 🌀 Descifrando las EDPs con Similitud: Automatizando un Truco Clásico de la Física

En mecánica de fluidos, transferencia de calor o incluso dinámica de poblaciones, muchos problemas comienzan con una **ecuación diferencial parcial (EDP)** de aspecto complicado. Pero a veces, hay un truco oculto, un movimiento antiguo de la física, que transforma una EDP compleja en una **ecuación diferencial ordinaria (EDO)** mucho más simple. Ese truco se llama **similitud dinámica**.

Este paquete de Julia te ayuda a **automatizar la búsqueda de esas transformaciones**, utilizando computación simbólica y un toque de elegancia matemática.

---

## ¿Qué es la Similitud, Realmente?

Las soluciones de similitud surgen cuando puedes reescribir una EDP en términos de una nueva variable (como \( \eta = y / \sqrt{x} \)) que combina espacio y tiempo en una sola coordenada. Esto colapsa un problema 2D o 3D en 1D, haciéndolo **mucho más fácil de analizar o resolver**.

Probablemente lo hayas visto en capas límite (Blasius), difusión (función error) o propagación de ondas. La idea es: **si la física "escala" de la manera correcta**, entonces también debería hacerlo la solución.

Pero encontrar la sustitución correcta no siempre es obvio. Ahí es donde entra esta herramienta.

---

## 🔧 Qué Hace Esta Herramienta

Este paquete de Julia:

- Analiza EDPs simbólicas como `"du/dt + 6*u*du/dx + d3u/d3x = 0"`
- Comprueba si existe un **cambio de variables** (\( \eta = x y^m \), \( u = x^n f(\eta) \)) que simplifique la ecuación
- Devuelve una EDO reducida si tiene éxito
- Analiza y transforma también las **condiciones de contorno**
- Muestra todas las sustituciones y formas simbólicas utilizadas

Está construido utilizando [Symbolics.jl](https://github.com/JuliaSymbolics/Symbolics.jl), el motor simbólico para el lenguaje Julia.

---

## ✨ Ejemplo: Reducir una EDP a una EDO

```julia
result = find_similarity("du/dt + 6 * u * du/dx + d3u/d3x = 0", "u(x=Inf, t) = 0")

# Output:
# → variable de similitud η = x * t^m
# → suposición de solución u = x^n * f(η)
# → ¡EDO simplificada devuelta!
```

No necesitas calcular manualmente derivadas ni probar una docena de sustituciones. Esta función automatiza todo eso por ti.

---

## 📘 ¿Para Quién Es Esto?

Esta herramienta es para:

- Estudiantes de ingeniería que estudian transporte, ondas o mecánica de fluidos
- Matemáticos aplicados que exploran la simetría y el escalamiento
- Cualquiera que intente reducir simbólicamente las EDPs a algo manejable

---

## 🧠 Detrás de las Cámaras

- Utiliza la diferenciación simbólica para probar si una sustitución "elimina" la dependencia de la EDP en \( x \), \( y \) o \( t \)
- Si es así, simplifica el resultado y comprueba si se parece a una EDO
- Prueba una cuadrícula de posibles potencias \( n, m \) utilizando conjeturas racionales
- Incluso analiza operadores diferenciales como `d2x/dy` de cadenas de texto

---

## 📌 Pruébalo

¿Quieres verlo en acción o usarlo en tus propios modelos?

🧪 [Repositorio de GitHub →](https://github.com/elvispy/similarity-pde-solver)

---

## 🌍 Por Qué Esto Importa

La similitud no es sólo elegante, es práctica. Aparece en:

- Coeficientes de arrastre que escalan con el número de Reynolds
- Profundidad de penetración del calor en problemas de conducción
- Teoría de la capa límite en aerodinámica

Esta herramienta ayuda a **democratizar ese poder**, haciéndolo accesible a estudiantes, profesores e investigadores por igual.

---

La próxima vez que te enfrentes a una EDP difícil... tal vez sólo necesite el cambio de variable correcto. 🧠➞📉

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/SimilaritySolver.jl' %}  
</div>
