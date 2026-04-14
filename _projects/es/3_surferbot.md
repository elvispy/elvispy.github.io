---
page_id: prj_surferbot
layout: page
title: Locomoción interfacial
description: Física diferenciable para robots impulsados por ondas
img: assets/img/surferbot.gif
importance: 1
category: work
related_publications: true
math: true
---

## Cabalgando la interfaz: física diferenciable para la locomoción impulsada por ondas

Un pequeño robot sentado sobre el agua puede propulsarse hacia adelante sin remos, aletas o chorros: vibrando. La vibración irradia ondas superficiales y, si esas ondas son direccionalmente asimétricas, su desequilibrio de momento genera un empuje neto. El SurferBot {% cite Rhee_2022 %} demostró esto experimentalmente; nuestro trabajo construye un simulador donde cada elección de diseño puede optimizarse directamente.

<div style="width: 100%; display: flex; justify-content: center;">
  <div style="position: relative; width: 80%; padding-bottom: 45%; height: 0; overflow: hidden;">
    <iframe
      src="https://www.youtube.com/embed/PQF6yGAs-TA?autoplay=1&mute=1&si=0qH_j8Lccw4ljD_3"
      title="YouTube video player"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen>
    </iframe>
  </div>
</div>

---

En una interfaz aire-agua, la tensión superficial, las ondas de gravedad y los efectos de masa añadida gobiernan la dinámica de la interfaz. El rendimiento depende de elecciones acopladas: forma del cuerpo, distribución de masa, ubicación del motor, frecuencia de accionamiento, forma de onda y propiedades del fluido, todo lo cual es costoso de explorar mediante experimentos. Modelamos al robot como un cuerpo flotante, posiblemente flexible, restringido a la interfaz y accionado por un actuador que varía en el tiempo, con el fluido circundante descrito por una teoría de superficie libre de pequeña amplitud que resuelve la interfaz {% cite Benham_Devauchelle_Thomson_2024 %}. El simulador es diferenciable con respecto a todos los parámetros de diseño $\theta$: las actualizaciones de estado utilizan resoluciones lineales y no lineales $A(\theta)\,y=b(\theta)$ con reglas personalizadas de modo inverso, por lo que $\nabla_\theta \mathcal{L}$ se deduce de dos resoluciones lineales (directa y adjunta) por paso de tiempo, manteniendo la memoria acotada y los gradientes estables a lo largo de toda la trayectoria.

Con estos gradientes, la optimización de múltiples inicios explora geometrías de casco, colocaciones de actuadores y formas de onda de accionamiento; la optimización bayesiana maneja la búsqueda global bajo restricciones de presupuesto de energía y manufacturabilidad.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot' %}
</div>