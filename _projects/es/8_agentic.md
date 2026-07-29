---
page_id: prj_agentic
layout: page
title: a3dasm: ciclos científicos para ingeniería agéntica
description: Un flujo de trabajo abierto y guiado por la evidencia para agentes que resuelven problemas de ingeniería basados en datos
img: assets/img/agentic-metamaterial.gif
importance: 1
category: work
---

## De un grafo de agentes a un ciclo científico

a3dasm convierte un grafo de agentes en un ciclo de investigación abierto. Los agentes pueden seguir la evidencia, cambiar de estrategia y decidir qué datos producir a continuación. El ciclo se guía por el método científico: enunciar un mecanismo, elegir un experimento que pueda ponerlo a prueba, conservar la evidencia y permitir que la crítica modifique la afirmación.

Cada estudio comienza con un problema de ingeniería basado en datos y un oráculo físico ejecutable. El flujo de trabajo registra hipótesis, presupuestos de simulación, diagnósticos, revisiones críticas y scripts de replicación junto con el resultado. Esto hace que las decisiones científicas de un agente sean inspeccionables y otorga a la siguiente ejecución la evidencia necesaria para mejorar la anterior.

<div class="row align-items-center">
  <div class="col-md-5">
    {% include figure.liquid path="assets/img/agentic-metamaterial.gif" alt="Animated finite-element simulation of a rocking-mast metamaterial coiling under compression" title="Rocking-mast benchmark simulation" class="img-fluid rounded z-depth-1" %}
    <p class="caption">Un metamaterial de mástil oscilante que se enrolla bajo compresión axial en el estudio de materiales supercompresibles.</p>
  </div>
  <div class="col-md-7">
    <h2>Un caso de estudio, un avance de más de cinco veces</h2>
    <p>El estudio de materiales supercompresibles pide a los agentes que diseñen una estructura imprimible que se enrolle bajo compresión mientras soporta carga. El flujo de trabajo encontró un diseño que mejora la referencia de vanguardia de materiales supercompresibles en más de cinco veces. Lo logró convirtiendo un costoso oráculo de elementos finitos en una secuencia de hipótesis, evaluaciones y decisiones de diseño.</p>
  </div>
</div>

## Un banco de pruebas para la ingeniería basada en datos

El mismo ciclo puede funcionar a través de escalas y disciplinas de ingeniería. Los estudios actuales incluyen biorreactores de bolsa oscilante, donde el movimiento y la geometría deben mejorar la transferencia de oxígeno sin dañar las células; locomoción interfacial, donde un cuerpo flotante y su campo de ondas deben diseñarse conjuntamente; identificación inversa de materiales a partir de datos de tensión-deformación multiaxiales; y metamateriales supercompresibles.

Cada estudio cuenta con un oráculo ejecutable, un presupuesto de evaluación limitado, objetivos o restricciones contrapuestos y una afirmación científica que puede ponerse a prueba.

## Investigación que se acumula

Cada ejecución deja un registro de investigación utilizable: la hipótesis, los datos que generó, el libro de contabilidad de la simulación, el veredicto del crítico y el script necesario para reproducir el resultado. Las direcciones fallidas permanecen como parte de ese registro. El resultado es un trabajo de ingeniería acumulativo que otro investigador puede inspeccionar, reproducir y ampliar.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='bessagroup/f3dasm-agentic-benchmarks' %}
</div>
