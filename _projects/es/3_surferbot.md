---
page_id: prj_surferbot
layout: page
title: Habilitando la locomoción interfacial
description: Propulsión impulsada por ondas mediante una balsa flexible
img: assets/img/surferbot.gif
importance: 1
category: work
related_publications: true
math: true
---

## Una vibración puede elegir una dirección

Una balsa compacta no tiene hélice, ni aleta, ni empuje constante. Sin embargo, al alejar su motor vibratorio del centro, las ondas que irradia ya no salen por igual en ambas direcciones. La estela se vuelve asimétrica; ese flujo de momento asimétrico le da a la balsa una dirección de desplazamiento. Lo sorprendente es que una vibración de media cero puede producir un empuje neto distinto de cero, no ocultando un ciclo de brazada, sino cambiando la forma en que un cuerpo deformable lanza ondas a la superficie.

Este es un problema útil siempre que el accionamiento y la estructura son inseparables: un mecanismo puede parecer simétrico en un modelo CAD mientras su dinámica selecciona una dirección. La cuestión no es simplemente si la balsa se dobla o dónde se sitúa el motor. Es cómo esas elecciones reforman las ondas que transportan el momento hacia el exterior.

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

{% include figure.liquid path="assets/img/flexible-surferbot-simulation.gif" alt="Simulación numérica de una balsa flexible y su estela asimétrica" title="Simulación numérica del Surferbot flexible" caption="Simulación numérica: la balsa flexible, el campo de ondas radiado y su estela asimétrica evolucionan conjuntamente." %}

El cálculo debe mantener toda la conversación intacta. El modelo acoplado de viga y superficie libre resuelve la deformación, el campo de ondas salientes y el empuje medio en un solo sistema. La ubicación del motor cambia qué modos de flexión se excitan; la rigidez flexural cambia cómo esos modos alimentan las ondas. El empuje resultante no es monotónico en ninguna de las variables. Una deformación estática o la ubicación del motor por sí solas no pueden decirnos hacia dónde irá la balsa.

Creé el flujo de trabajo de análisis reproducible en Julia que sustenta ese cálculo: barridos de parámetros, reducción modal, pruebas de paridad con MATLAB y generación de figuras a partir de los mismos datos. También hice explícita la comprobación de simetría. En la referencia de gravedad pura con simetría de reflexión —el benchmark simétrico— el forzamiento centrado debe producir un empuje neto de cero; si no es así, la discretización ha fabricado propulsión. Ese invariante no se traslada a los casos con términos de borde capilares, donde la simetría de reflexión exacta se rompe físicamente.

{% include figure.liquid path="assets/img/flexible-surferbot-thrust-map.png" alt="Empuje normalizado con signo según la ubicación del motor y la rigidez flexural" title="Mapa de empuje del Surferbot flexible" caption="Este mapa de diseño muestra el empuje normalizado con signo a través de la posición del motor x_M/L y la rigidez flexural normalizada κ. Las regiones rojas y azules son direcciones opuestas de empuje, revelando dónde cambia la dirección; los símbolos marcan los casos del artículo publicado." %}

El mapa hace visible la consecuencia del diseño: pequeños cambios en la ubicación del motor pueden invertir la dirección de desplazamiento, y el mismo actuador puede comportarse de forma diferente a medida que la balsa se vuelve más rígida o más blanda. Es un banco de pruebas compacto para un hábito de I+D más amplio: tratar el cuerpo, el forzamiento y el medio circundante como un único problema de diseño dinámico en lugar de tres controles independientes.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot' %}
</div>