---
page_id: prj_agentic
layout: page
title: Ingeniería agéntica bajo un estándar real de investigación
description: Benchmarks abiertos para agentes que diseñan, simulan y defienden afirmaciones de ingeniería
img: assets/img/agentic-metamaterial.gif
importance: 1
category: work
---

## Una puntuación no es un descubrimiento

Un agente puede clasificar miles de diseños candidatos. Eso no es suficiente para producir un resultado científico. La tarea más difícil es decidir qué sobrevive cuando el modelo, el mecanismo y la evidencia son cuestionados.

Estoy construyendo benchmarks abiertos que sitúan a los agentes dentro de ese ciclo más complejo. Cada benchmark comienza con un problema de ingeniería no resuelto y un oráculo físico. El agente debe declarar un mecanismo antes de gastar cómputo, elegir experimentos bajo un presupuesto finito, conservar las hipótesis fallidas y entregar un script de replicación. Un crítico aún puede rechazar la afirmación.

<div class="row align-items-center">
  <div class="col-md-5">
    <figure>
      <img src="{{ '/assets/img/agentic-metamaterial.gif' | relative_url }}" alt="Animated finite-element simulation of a rocking-mast metamaterial coiling under compression" class="img-fluid rounded z-depth-1" style="width: 100%; height: auto;">
      <figcaption class="caption">Un candidato de mástil oscilante se enrolla a medida que su anillo superior desciende y gira. Esta es una simulación real del registro del benchmark.</figcaption>
    </figure>
  </div>
  <div class="col-md-7">
    <h2>5.9× no es la respuesta</h2>
    <p>El líder numérico actual alcanza 5.9 veces la línea base de Bessa. Deliberadamente no se registra como la respuesta del benchmark: remodela una familia de secciones transversales conocida en lugar de proporcionar el nuevo mecanismo que el problema solicita. El benchmark mantiene esa distinción explícita: un número simulado grande es progreso, pero aún no un descubrimiento.</p>
  </div>
</div>

## Un problema difícil, con un oráculo difícil

El primer benchmark solicita un metamaterial de mástil oscilante imprimible que se enrolle bajo compresión axial en lugar de aplastarse. El objetivo no es simplemente una carga de pandeo más alta. Un diseño debe enrollarse a través de un 80% de compresión, permanecer por debajo de un techo de deformación local del 2%, ser físicamente creíble como un objeto impreso y superar dos veces la línea base de Bessa mediante un mecanismo genuinamente nuevo.

Esto lo convierte en una prueba útil de investigación agéntica. Un sistema no puede obtener crédito optimizando dentro de una familia conocida, encontrando un artefacto numérico o saltándose la costosa verificación que podría descalificar su propio resultado principal.

## Evidencia, incluyendo los fallos

Estos benchmarks cubren materiales supercompresibles, diseño de biorreactores e interacción fluido-estructura. Los oráculos van desde trabajos de Abaqus en SLURM hasta DNS de dos fases y solucionadores en Julia. Una ejecución deja un registro de su hipótesis, libro de contabilidad de simulación, veredicto del crítico y script de replicación. El estudio de metamateriales ya preserva dieciséis ejecuciones y aproximadamente cuarenta y nueve ideas, incluyendo resultados prometedores rechazados posteriormente por una verificación mecánica más estricta.

El punto no es hacer que un agente parezca ocupado. Es hacer que una afirmación científica sea auditable: otro grupo debería poder reproducir la evidencia, inspeccionar por qué se descartó una idea y decidir si el mecanismo declarado ameritaba el resultado.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='bessagroup/f3dasm-agentic-benchmarks' %}
</div>
