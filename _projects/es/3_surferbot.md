---
page_id: prj_surferbot
layout: page
title: Surferbot Flexible
description: Propulsión impulsada por olas mediante una balsa flexible
img: assets/img/surferbot.gif
importance: 1
category: work
related_publications: true
math: true
---

## Una vibración puede elegir una dirección

Una balsa compacta no tiene hélice, ni aleta, ni empuje constante. Sin embargo, al alejar su motor vibratorio del centro, las olas que irradia ya no salen por igual en ambas direcciones. La estela se vuelve asimétrica; ese flujo de momento asimétrico le da a la balsa una dirección de viaje. Lo sorprendente es que una vibración de media cero puede producir un empuje medio distinto de cero—no ocultando un ciclo de carrera, sino cambiando la forma en que un cuerpo deformable lanza olas a la superficie.

Ese es un problema útil siempre que la actuación y la estructura sean inseparables: un mecanismo puede parecer simétrico en un modelo CAD mientras su dinámica selecciona una dirección. La cuestión no es simplemente si la balsa se dobla, o dónde se ubica el motor. Es cómo esas elecciones reforman las olas que transportan el momento.

<div style="width: 100%; display: flex; justify-content: center;">
  <div style="position: relative; width: 80%; padding-bottom: 45%; height: 0; overflow: hidden;">
    <iframe
      src="https://www.youtube.com/embed/PQF6yGAs-TA?autoplay=1&mute=1&si=0qH_j8Lccw4ljD_3"
      title="Published SurferBot demonstration"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen>
    </iframe>
  </div>
</div>
<p class="caption"><strong>Demostración publicada del SurferBot.</strong> Una demostración física del mecanismo; no es un resultado numérico de este repositorio.</p>

{% include figure.liquid path="assets/img/flexible-surferbot-simulation.gif" alt="Numerical simulation of a flexible raft and its asymmetric wake" title="Flexible Surferbot numerical simulation" caption="Numerical simulation: the flexible raft, the radiated wave field, and its asymmetric wake evolve together." %}

El cálculo tiene que mantener toda la conversación intacta. El modelo acoplado de viga–superficie libre resuelve la deformación, el campo de olas salientes y el empuje medio en un solo sistema. La ubicación del motor cambia qué modos de flexión se excitan; la rigidez flexural cambia cómo esos modos alimentan las olas. El empuje resultante no es monotónico en ninguna de las variables. Una deformación estática o la ubicación del motor por sí solas no pueden decirnos en qué dirección irá la balsa.

Creé el flujo de trabajo de análisis reproducible en Julia detrás de ese cálculo: barridos de parámetros, reducción modal, pruebas de paridad con MATLAB y generación de figuras a partir de los mismos datos. También hice explícita la comprobación de simetría. En el benchmark de gravedad pura con simetría de reflexión—el benchmark simétrico—el forzamiento centrado debe producir un empuje neto cero; si no es así, la discretización ha fabricado propulsión. Ese invariante no se traslada a los casos con términos capilares de borde, donde la simetría de reflexión exacta se rompe físicamente.

{% include figure.liquid path="assets/img/flexible-surferbot-thrust-map.png" alt="Signed normalized thrust across motor placement and flexural rigidity" title="Flexible Surferbot thrust map" caption="This design map shows signed normalized thrust across motor position x_M/L and normalized flexural rigidity κ. Red and blue regions are opposite directions of thrust, revealing where the direction changes; the symbols mark the published paper cases." %}

El mapa hace visible la consecuencia del diseño: pequeños cambios en la ubicación del motor pueden invertir la dirección del viaje, y el mismo actuador puede comportarse de manera diferente a medida que la balsa se vuelve más rígida o más blanda. Es un banco de pruebas compacto para un hábito de I+D más amplio: tratar el cuerpo, el forzamiento y el medio circundante como un único problema de diseño dinámico en lugar de tres controles independientes.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot' %}
</div>