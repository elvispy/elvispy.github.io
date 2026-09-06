---
page_id: prj_bioreactor
layout: page
title: Diseño multi-fidelidad para biorreactores de balanceo
description: Diseño acoplado de transferencia de oxígeno y cizalla con CFD multi-fidelidad
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
---

Un biorreactor de balanceo parece simple: se mueve una bolsa de un lado a otro
y la cultura se mezcla. La pregunta de ingeniería útil es más difícil. El mismo
movimiento de balanceo que renueva la interfaz gas–líquido y mejora la
transferencia de oxígeno también define el entorno mecánico al que se expone la
cultura. Por lo tanto, más agitación no es una respuesta completa. Un diseño
debe equilibrar la disponibilidad de oxígeno frente a la cizalla, teniendo en
cuenta el nivel de llenado y la frecuencia de balanceo antes de que resulte
costoso fabricar o probar.

<figure>
  <video autoplay muted loop controls preload="metadata" style="width: 100%; display: block;">
    <source src="{{ '/assets/img/bioreactor-interface-hero.mp4' | relative_url }}" type="video/mp4">
    Su navegador no admite la etiqueta de video.
  </video>
  <figcaption class="caption">CFD numérico de dos fases de la superficie libre en balanceo. La fase gaseosa azul y la fase líquida roja muestran la interfaz cuya deformación repetida controla el transporte y la carga mecánica.</figcaption>
</figure>

El modelo resuelve esa interfaz en movimiento en lugar de sustituirla por una
aproximación de mezcla homogénea. Utiliza <a href="https://basilisk.fr/">Basilisk</a>
con hidrodinámica de volumen de fluido, acoplado al transporte de oxígeno
disuelto a través de la ley de Henry. A partir de cada condición simulada, el
flujo de trabajo extrae las magnitudes de proceso que hacen tangible el
compromiso: coeficiente de transferencia de masa volumétrico kLa, tiempo de
mezcla y esfuerzo cortante.
Esas salidas convierten una petición vaga («mézclalo mejor») en una decisión de
diseño inspeccionable: ¿qué nivel de llenado y frecuencia de balanceo
proporcionan una transferencia adecuada sin simplemente elevar cada medida
local de esfuerzo?

La CFD completa puede responder a esa pregunta, pero es demasiado costosa para
barrer todo el espacio operativo. El proyecto combina, por tanto, un cribado de
baja fidelidad económico con cálculos seleccionados de alta fidelidad. Un
sustituto multi-fidelidad KRR-LR-GPR transporta información entre ambos,
mientras Expected Improvement selecciona la siguiente condición a evaluar. La
idea no es hacer desaparecer el simulador detrás de una caja negra; es gastar
las ejecuciones de alta fidelidad donde pueden cambiar la elección de diseño y
usar después el modelo más económico para mapear el resto del espacio. Eso hace
práctico comparar un conjunto más amplio de niveles de llenado y programas de
balanceo.

{% include figure.liquid loading="eager" path="assets/img/bioreactor-fill-sweep.png" alt="Barrido de nivel de llenado y frecuencia de balanceo que muestra métricas de transferencia de oxígeno, tiempo de mezcla y esfuerzo cortante" title="Barrido de nivel de llenado del biorreactor" class="img-fluid rounded z-depth-1" caption="Barrido de nivel de llenado a ángulo de balanceo fijo. Cada columna varía la frecuencia de balanceo y cada fila varía el nivel de llenado; los mapas muestran <em>k</em><sub>L</sub><em>a</em>, tiempo de mezcla e indicadores KPI de esfuerzo cortante. Leerlos juntos revela dónde una ganancia de transferencia conlleva una penalización mecánica." %}

Mi contribución fue la capa de decisión y reproducibilidad del proyecto en
torno al solver: un banco de pruebas de optimización bayesiana multi-fidelidad
de extremo a extremo, correcciones de validación de parámetros, documentación
desplegada por CI, tutoriales y pipeline de figuras, y registros de validación
y experimentos. Ese trabajo hace que un resultado sea trazable desde una
condición candidata a través del flujo de simulación y sustituto hasta la
evidencia graficada, sin reclamar autoría exclusiva del método CFD ni del
estudio publicado.

El estudio subyacente está publicado en <a href="https://doi.org/10.1016/j.ijmultiphaseflow.2025.105375"><em>International Journal of Multiphase Flow</em></a>. La <a href="https://rcsc-group.github.io/multi-fidelity-bioreactor/">documentación del proyecto</a> y el <a href="https://github.com/rcsc-group/multi-fidelity-bioreactor">repositorio abierto</a> incluyen el modelo, los casos de estudio y el flujo de trabajo reproducible.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/multi-fidelity-bioreactor' %}
</div>
