---
page_id: prj_km
layout: page
title: "Kinematic Match: un marco de contacto suave para impactos deformables"
description: "Una restricción geométrica que hace que las colisiones sean estables, precisas y listas para la optimización"
img: "assets/img/km-sphere.gif"
importance: 1
category: "work"
related_publications: true
---


## Convirtiendo los impactos en ecuaciones que se comportan

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/km-sphere.gif" title="Simulation of a sphere impacting an elastic membrane" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Ejemplo de simulación: una esfera rígida impactando una membrana elástica.
    </figcaption>
</figure>

La mecánica de contacto es un problema de discontinuidad: dos superficies que estaban separadas se ven instantáneamente restringidas al colisionar. La mayoría de los modelos de contacto numérico manejan esto insertando fuerzas de penalización rígidas o alternando restricciones duras entre "contacto" y "sin contacto". Ambos enfoques hacen que la rigidez del solucionador dependa de la malla, suprimen la transferencia de energía correcta en la interfaz y bloquean la optimización basada en gradientes.

El marco **Kinematic Match (KM)** reemplaza la condición de contacto por completo. En lugar de penalizar la interpenetración, KM impone un único requisito geométrico: el ángulo de incidencia entre las dos superficies debe evolucionar continuamente durante el impacto. En forma discreta, esto acopla la curvatura y los vectores normales a través de la interfaz en cada paso de tiempo, produciendo una variedad de contacto que es continuamente diferenciable, no requiere lógica de conmutación y no introduce constantes de ajuste. El método es compatible con esquemas de diferencias finitas, elementos finitos y captura de interfaces.

En _Proceedings of the Royal Society A_ ({% cite aguero2022impact %}), aplicamos KM a una esfera rígida que golpea una membrana elástica, coincidiendo con los perfiles de deformación experimentales y las tasas de transferencia de energía. En _Journal of Fluid Mechanics_ ({% cite gabbard2025dropreboundlowweber %}), extendimos el marco a gotas que rebotan en baños de fluido — un régimen sensible al tratamiento del modelo de contacto de las fuerzas capilares y la coalescencia — reproduciendo observaciones que el CFD convencional no detecta.

<figure style="float: left; margin: 10px; width: 35%;">
  <div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <video autoplay muted loop controls
           style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
           preload="auto">
      <source src="/assets/img/drop.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
  <figcaption style="text-align: center; margin-top: 5px;">
    KM aplicado a una gota que impacta un baño de fluido — capturando la dinámica de rebote y coalescencia.
  </figcaption>
</figure>

Debido a que la variedad de contacto sigue siendo diferenciable, la misma formulación se integra directamente con la inferencia basada en adjuntos y el diseño basado en gradientes. Lo estamos extendiendo a interfaces multimaterial y biológicas donde las superficies pueden fusionarse o desgarrarse.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/kinematic-match-sphere' %}
    {% include repository/repo.liquid repository='elvispy/km-dropplet-solidsubstrate-v3' %}
    {% include repository/repo.liquid repository='elvispy/km-dropplet-onto-bath' %}
</div>