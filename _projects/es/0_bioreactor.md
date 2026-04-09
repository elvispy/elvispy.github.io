---
page_id: prj_bioreactor
layout: page
title: Acoplamiento de Crecimiento, Flujo y Optimización en Sistemas Complejos
description: Integración del crecimiento biológico y la dinámica de fluidos en amplios espacios de diseño
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
---

## Hacia biorreactores predictivos para carne cultivada

En un **biorreactor oscilante**, una bolsa flexible se inclina rítmicamente para hacer circular el medio de cultivo sin impulsores. El mismo balanceo que distribuye el oxígeno puede separar las células si la frecuencia o la amplitud son demasiado altas. La elección experimental de esos parámetros cuesta semanas de tiempo de cultivo y más medios de crecimiento de lo que la mayoría de los presupuestos de investigación toleran — y las configuraciones no se transfieren entre las geometrías de las bolsas; cada nuevo diseño requiere su propio cribado.

Los modelos de simulación estándar tratan el medio de cultivo como un fluido fijo, las células como trazadores pasivos y la superficie libre como geométricamente fija. En un biorreactor real, las tres suposiciones fallan: la proliferación celular espesa el medio; los gradientes de oxígeno retroalimentan las tasas de crecimiento; la superficie libre se deforma en un marco oscilante no inercial que el CFD convencional maneja con dificultad.

En Brown, estamos construyendo un marco de código abierto que acopla el solucionador de fluidos al modelo de crecimiento celular sin división de operadores. Un solucionador de **volumen de fluido (VOF)** resuelve la superficie libre deformante mientras una capa de agentes rastrea cómo responden las células individuales al oxígeno local y al cizallamiento — y cómo su crecimiento modifica el flujo volumétrico a través del arrastre y la viscosidad. Debido a que la simulación de alta fidelidad de cada punto de diseño es costosa, integramos el solucionador dentro de un sustituto impulsado por datos entrenado en un conjunto específico de ejecuciones completas. La optimización bayesiana luego busca a través de la geometría, la frecuencia de oscilación, la amplitud y la reología de los medios para localizar regímenes hidrodinámicos donde el cizallamiento se mantiene por debajo de los umbrales de daño celular y el suministro de oxígeno sigue siendo suficiente para el crecimiento — criterios previamente definibles solo por experimento, una costosa prueba a la vez.

Para detalles técnicos, consulte [Kim, Harris & Cimpeanu (2025)](https://arxiv.org/abs/2504.05421) o explore el repositorio a continuación.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}
</div>