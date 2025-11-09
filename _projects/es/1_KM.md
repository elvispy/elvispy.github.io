---
page_id: prj_km
layout: page
title: Correspondencia Cinemática: un marco de contacto suave para impactos deformables
description: Una restricción geométrica que hace que las colisiones sean estables, precisas y listas para la optimización
img: assets/img/km-sphere.gif
importance: 1
category: work
related_publications: true
---

## Convirtiendo los impactos en ecuaciones que se comportan

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/km-sphere.gif" title="Simulación de una esfera impactando una membrana elástica" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Ejemplo de simulación: una esfera rígida impactando una membrana elástica.
    </figcaption>
</figure>

Las colisiones entre cuerpos blandos o deformables son engañosamente difíciles de computar.
A medida que dos superficies se encuentran, su geometría cambia más rápido de lo que el solucionador puede rastrear, y la mayoría de los modelos de contacto manejan esto insertando **fuerzas de penalización rígidas** o cambios discontinuos entre "tocar" y "separar". Estos atajos hacen que las simulaciones sean inestables, demasiado sensibles a la resolución de la malla y ciegas a la transferencia de energía real.

El marco de **Correspondencia Cinemática (KM)** reemplaza estas reglas _ad-hoc_ con una **única condición geométrica:** el **ángulo de incidencia entre las superficies en contacto debe evolucionar suavemente**. Esto transforma el impacto de un evento discontinuo en una **restricción bien planteada y diferenciable**, una que los solucionadores clásicos pueden aplicar directamente.

---

## Por qué es importante

KM proporciona una forma estable de simular **colisiones deformables y rebotes**: problemas que abarcan desde la robótica blanda hasta el impacto de gotas y la acreción planetaria.
En lugar de forzar el contacto a través de parámetros empíricos, KM lo trata como una **condición de compatibilidad** entre superficies, asegurando un "apretón de manos" continuo a medida que se acercan, comprimen y separan. Este enfoque produce:

- Disipación de energía predecible sin constantes de ajuste.
- Convergencia estable bajo mallas gruesas.
- Compatibilidad directa con la optimización y la inferencia basada en adjuntos.

---

## El método en un párrafo

KM aumenta las ecuaciones gobernantes con una **restricción suave del ángulo de contacto** definida a lo largo de la interfaz. En forma discreta, acopla la curvatura y los vectores normales entre las dos superficies en contacto, obligándolas a alinearse suavemente a través del tiempo. El resultado es una **variedad de contacto continuamente diferenciable** (sin torceduras, sin discontinuidades), lo que permite una integración estable a través del impacto, el rebote y la separación. El método se puede implementar en **esquemas de diferencias finitas, elementos finitos o captura de interfaz** con cambios mínimos en las bases de código existentes.

---

## Evidencia de experimentos y simulaciones

- **Sólido-sólido:** En _Proceedings of the Royal Society A_ ({% cite aguero2022impact %}), validamos KM simulando una esfera rígida golpeando una membrana elástica. El método capturó no solo los perfiles de deformación, sino también las tasas de transferencia de energía observadas experimentalmente.
- **Fluido-estructura:** En _Journal of Fluid Mechanics_ ({% cite gabbard2025dropreboundlowweber %}), KM se extendió a gotas que rebotan en baños de fluido, reproduciendo con precisión las ondas capilares y los umbrales de coalescencia, regímenes donde la CFD convencional falla.

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
    KM aplicado a una gota que impacta un baño de fluido, capturando la dinámica de rebote y coalescencia.
  </figcaption>
</figure>

---

## Por qué es eficiente y general

Debido a que KM expresa el contacto a través de la geometría en lugar de las fuerzas de penalización, lo hace:

- **Mejora el acondicionamiento** de los sistemas lineales en el impacto.
- **Elimina la necesidad de un remallado localizado** cerca de la interfaz.
- **Funciona en todos los materiales y escalas**, desde la robótica blanda hasta los impactos granulares.
- **Permanece diferenciable**, por lo que es compatible con el diseño basado en gradientes, la inferencia de parámetros y los flujos de trabajo de optimización bayesiana.

---

## Qué sigue

Estamos extendiendo KM a sistemas multimateriales e inspirados en la biología, donde las interfaces pueden crecer, fusionarse o desgarrarse. La estructura de restricción diferenciable también abre la puerta a **sustitutos de aprendizaje automático** que aprenden la dinámica de impacto a partir de datos de simulación, acelerando las tareas de diseño en robótica y ciencia de los materiales.

---

Las colisiones no son eventos discretos, son **conversaciones entre geometrías**.
Kinematic Match le da a ese diálogo una forma matemática precisa: suave, estable y computable.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/kinematic-match-sphere' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-solidsubstrate-v3' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-onto-bath' %}  
</div>
