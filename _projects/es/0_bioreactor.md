---
page_id: prj_bioreactor
layout: page
title: Diseño de multi-fidelidad para biorreactores de balanceo
description: Diseño acoplado de transferencia de oxígeno y cizallamiento con CFD de multi-fidelidad
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
---

Un biorreactor de balanceo parece sencillo: se mueve una bolsa de un lado a otro y el cultivo se mezcla. La pregunta de ingeniería útil es más difícil. El mismo movimiento de balanceo que renueva la interfaz gas-líquido y mejora la transferencia de oxígeno también establece el entorno mecánico que experimenta el cultivo. Por lo tanto, una mayor agitación no es una respuesta completa. Un diseño debe equilibrar la disponibilidad de oxígeno frente al cizallamiento, teniendo en cuenta el nivel de llenado y la frecuencia de oscilación antes de que sea costoso de fabricar o probar.

<figure>
  <video autoplay muted loop controls preload="metadata" style="width: 100%; display: block;">
    <source src="{{ '/assets/img/bioreactor-interface-hero.mp4' | relative_url }}" type="video/mp4">
    Su navegador no soporta la etiqueta de video.
  </video>
  <figcaption class="caption">CFD numérico bifásico de la superficie libre en balanceo. La fase gaseosa azul y la fase líquida roja muestran la interfaz cuya deformación repetida controla el transporte y la carga mecánica.</figcaption>
</figure>

El modelo resuelve esa interfaz móvil en lugar de reemplazarla con una aproximación de mezcla perfecta. Utiliza la hidrodinámica de volumen de fluido de <a href="https://basilisk.fr/">Basilisk</a>, acoplada al transporte de oxígeno disuelto mediante la ley de Henry. De cada condición simulada, el flujo de trabajo extrae las magnitudes del proceso que concretan el compromiso: el coeficiente volumétrico de transferencia de masa kLa, el tiempo de mezcla y el esfuerzo cortante.
Esos resultados transforman una petición vaga —"mézclalo mejor"— en una decisión de diseño inspeccionable: ¿qué nivel de llenado y qué frecuencia de balanceo proporcionan una transferencia adecuada sin simplemente elevar cada medida de estrés local?

El CFD completo es lo suficientemente rico para responder a esa pregunta, pero demasiado costoso para cubrir todo el espacio operativo. Por ello, el proyecto combina un cribado de baja fidelidad económico con cálculos seleccionados de alta fidelidad. Un sustituto de multi-fidelidad KRR-LR-GPR transporta la información entre ambos, mientras que la Mejora Esperada (Expected Improvement) selecciona la siguiente condición a evaluar. El objetivo no es hacer que el simulador desaparezca tras una caja negra; es dedicar las ejecuciones de alta fidelidad donde puedan cambiar la elección de diseño, y luego usar el modelo más barato para mapear el resto del espacio. Eso hace que sea práctico comparar un conjunto más amplio de niveles de llenado y programas de balanceo.

{% include figure.liquid loading="eager" path="assets/img/bioreactor-fill-sweep.png" alt="Fill-level and rocking-frequency sweep showing oxygen-transfer, mixing-time, and shear-stress metrics" title="Bioreactor fill-level sweep" class="img-fluid rounded z-depth-1" caption="A fill-level sweep at fixed rocking angle. Each column varies rocking frequency and each row varies fill level; the maps show <em>k</em><sub>L</sub><em>a</em>, mixing time, and shear-stress KPIs. Reading them together exposes where a transfer gain carries a mechanical penalty." %}

Mi contribución fue la capa de decisión y reproducibilidad del proyecto en torno al solver: un banco de pruebas de optimización bayesiana de multi-fidelidad de extremo a extremo, correcciones de validación de parámetros, documentación desplegada por CI, tutoriales y canalización de figuras, y registros de validación y experimentos. Ese trabajo hace que un resultado sea trazable desde una condición candidata, pasando por la simulación y el flujo de trabajo del sustituto, hasta la evidencia graficada, sin reclamar la autoría exclusiva del método CFD o del estudio publicado.

El estudio subyacente está publicado en <a href="https://doi.org/10.1016/j.ijmultiphaseflow.2025.105375"><em>International Journal of Multiphase Flow</em></a>. La <a href="https://rcsc-group.github.io/multi-fidelity-bioreactor/">documentación del proyecto</a> y el <a href="https://github.com/rcsc-group/multi-fidelity-bioreactor">repositorio abierto</a> incluyen el modelo, los casos de estudio y el flujo de trabajo reproducible.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/multi-fidelity-bioreactor' %}
</div>