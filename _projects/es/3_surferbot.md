---
page_id: prj_surferbot
layout: page
title: Habilitación de la locomoción interfacial
description: Propulsión impulsada por ondas mediante una balsa flexible
img: assets/img/surferbot.gif
importance: 1
category: work
related_publications: true
math: true
---

## Una vibración puede elegir una dirección

Una balsa compacta no tiene hélice, ni aleta, ni empuje constante. Sin embargo, si se desplaza su motor vibratorio desde el centro, las ondas que irradia ya no salen por igual en ambas direcciones. La estela se vuelve asimétrica; ese flujo de momento asimétrico le da a la balsa una dirección de viaje. Lo sorprendente es que una vibración de media cero puede producir un empuje medio no nulo. Lo hace no ocultando un ciclo de carrera, sino cambiando cómo un cuerpo deformable lanza ondas hacia la superficie.

Es un problema útil siempre que la actuación y la estructura sean inseparables: un mecanismo puede parecer simétrico en un modelo CAD mientras su dinámica selecciona una dirección. La pregunta no es simplemente si la balsa se dobla, o dónde está el motor. Es cómo esas elecciones remodelan las ondas que llevan el momento lejos.

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
<p class="caption"><strong>Demostración publicada de SurferBot.</strong> Una demostración física del mecanismo; no es una salida numérica de este repositorio.</p>

{% include figure.liquid path="assets/img/flexible-surferbot-simulation.gif" alt="Simulación numérica de una balsa flexible y su estela asimétrica" title="Simulación numérica de Surferbot flexible" caption="Simulación numérica: la balsa flexible, el campo de ondas irradiado y su estela asimétrica evolucionan juntos." %}

El cálculo debe mantener el acoplamiento intacto. El modelo acoplado viga-superficie libre resuelve la deformación, el campo de ondas saliente y el empuje medio en un solo sistema. La ubicación del motor cambia qué modos de flexión se excitan; la rigidez flexural cambia cómo esos modos alimentan las ondas. El empuje resultante no es monótono en ninguna de las dos variables. Una deformación estática o la ubicación del motor por sí solas no pueden decirnos hacia dónde irá la balsa.

Creé el flujo de trabajo reproducible de análisis en Julia detrás de ese cálculo: barridos de parámetros, reducción modal, pruebas de paridad con MATLAB y generación de figuras a partir de los mismos datos. También hice explícita la verificación de simetría. En el benchmark de simetría por reflexión con gravedad pura, una fuerza centrada debe producir un empuje neto cero; si no lo hace, la discretización ha fabricado propulsión. Ese invariante no se traslada a los casos con términos de borde capilar, donde la simetría de reflexión exacta se rompe físicamente.

{% include figure.liquid path="assets/img/flexible-surferbot-thrust-map.png" alt="Empuje normalizado con signo en función de la ubicación del motor y la rigidez flexural" title="Mapa de empuje de Surferbot flexible" caption="Este mapa de diseño muestra el empuje normalizado con signo en función de la posición del motor x_M/L y la rigidez flexural normalizada κ. Las regiones roja y azul son direcciones opuestas de empuje, revelando dónde cambia la dirección; los símbolos marcan los casos del artículo publicado." %}

El mapa hace visible la consecuencia de diseño: pequeños cambios en la ubicación del motor pueden invertir la dirección de viaje, y el mismo actuador puede comportarse de manera diferente a medida que la balsa se rigidiza o se ablanda. Es un banco de pruebas compacto para un hábito más amplio de I+D: tratar el cuerpo, la fuerza y el medio circundante como un único problema de diseño dinámico en lugar de tres perillas independientes.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot' %}
</div>
