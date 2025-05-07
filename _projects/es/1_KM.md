---
page_id: prj_km
layout: page
title: Simulación de impactos deformables
description: El método de correspondencia cinemática
img: assets/img/km-sphere.gif
importance: 1
category: work
related_publications: true
---

## El Problema: Por qué las colisiones son más que solo "rebotar"

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/km-sphere.gif" title="example image" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Ejemplo de simulación de una esfera sólida impactando una membrana elástica.
    </figcaption>
</figure>

Las colisiones inelásticas, donde los objetos no solo rebotan, sino que se deforman, se pegan o se fragmentan, están gobernadas por dinámicas no lineales que desafían las ecuaciones simples. Los modelos tradicionales a menudo simplifican demasiado la mecánica de contacto, ignorando cómo los materiales se _adaptan_ durante el impacto. Por ejemplo, los "dedos" de silicona de un robot blando que agarran un objeto o una gota de agua que salpica sobre una superficie vibrante involucran un acoplamiento intrincado entre la elasticidad, la dinámica de fluidos y la geometría.

---

## El Marco KM: Suavizando el Caos

En esencia, el marco KM introduce (ver {% cite aguero2022impact%}) una **restricción geométrica** en las superficies de contacto: el ángulo de incidencia entre los objetos que chocan debe permanecer suave. Piense en ello como asegurar un "apretón de manos" entre los materiales: sin bordes afilados, sin saltos repentinos. Este enfoque es:

1.  **Intuitivo**: A diferencia de las simulaciones de fuerza bruta, las restricciones de KM reflejan el comportamiento del mundo real, lo que facilita su implementación.
2.  **Versátil**: Funciona con elementos finitos, diferencias finitas o incluso solucionadores de aprendizaje automático.
3.  **Eficiente**: Al evitar refinamientos costosos de la malla, KM sobresale en escenarios como impactos de gotas de baja velocidad, donde los métodos tradicionales tienen dificultades.

En nuestro [trabajo reciente](https://royalsocietypublishing.org/doi/10.1098/rspa.2022.0340), validamos KM con experimentos que involucran una esfera rígida que golpea una membrana elástica. Los resultados coincidieron no solo con los patrones de deformación, sino también con las tasas de disipación de energía, una rareza en el modelado de colisiones.

---

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
    Ejemplo de simulación de una esfera sólida impactando una membrana elástica.
  </figcaption>
</figure>

## De Robots a Gotas de Lluvia: Por Qué Esto Importa

### 1. **Robótica Blanda**

KM permite un modelado preciso de pinzas que interactúan con objetos delicados, asegurando que las fuerzas se distribuyan sin daños, lo cual es fundamental para la robótica médica o las máquinas recolectoras de fruta.

### 2. **Astrofísica**

Simular colisiones de asteroides o la acreción planetaria requiere el manejo de cuerpos fragmentados y deformables. La capacidad de KM para gestionar superficies de contacto irregulares podría refinar los modelos de agregación de polvo cósmico.

### 3. **Interacciones Fluido-Estructura**

Nuestro trabajo más reciente ({% citegabbard2025dropreboundlowweber %}) aplica KM a gotas de agua que golpean baños de fluido, un problema con aplicaciones en la impresión de inyección de tinta y la pulverización de pesticidas. Los primeros resultados muestran que KM captura las ondas capilares y la coalescencia mejor que la CFD convencional.

---

## ¿Qué sigue?

Estamos expandiendo KM a:

- **Colisiones de múltiples materiales**: Piense en hielo golpeando agua (relevante para la ingeniería criogénica).
- **Sistemas biológicos**: Simulación de interacciones célula-matriz en biorreactores de ingeniería de tejidos.
- **Integración del aprendizaje automático**: Entrenamiento de redes neuronales para predecir las restricciones de KM, reduciendo el tiempo de cálculo.

---

Las colisiones no son solo puntos finales, son conversaciones entre materiales. Con KM, estamos decodificando ese diálogo, un impacto a la vez. 🚀

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/kinematic-match-sphere' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-solidsubstrate-v3' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-onto-bath' %}  
</div>
