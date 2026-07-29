---
page_id: prj_km
layout: page
title: "Construyendo la próxima generación de software de impacto deformable"
description: "Dinámica de contacto espectral para gotas impactando un baño"
img: "assets/img/spectralkm-impact.gif"
importance: 1
category: "work"
related_publications: true
---

## Un milisegundo decide el resultado

En la impresión, el recubrimiento, la pulverización y la manipulación de líquidos, el impacto decide si un líquido se deposita, se extiende, rebota o se fusiona. Esa elección se toma en milisegundos, mientras los cuerpos implicados cambian de forma.

La dificultad reside en que una colisión deformable no tiene un área de contacto ni un campo de presión preexistentes. Al primer contacto, la presión deforma las interfaces, y sus formas alteran la presión. `SpectralKM.jl` plantea cómo resolver ese bucle cuando ambos lados de la colisión son líquidos.

<figure>
  <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/spectralkm-impact-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="SpectralKM bath-impact animation with a red contact patch and pressure inset">
    <source src="{{ '/assets/img/spectralkm-impact.mp4' | relative_url }}" type="video/mp4">
    Su navegador no soporta la etiqueta de video.
  </video>
  <figcaption class="caption">Simulación de impacto en baño. La región azul oscuro es el baño, la región azul pálido la gota, y el arco rojo el parche de contacto resuelto. El recuadro traza la presión puntual como diagnóstico, no como un campo convergente.</figcaption>
</figure>

## Lo que cada modelo eliminó

El estudio de 2022 de esfera rígida / membrana elástica hizo visible la primera variable oculta: la deformación del objetivo ({% cite aguero2022impact %}). Una gota líquida sobre un sólido trasladó la deformabilidad al impactador. Una gota sobre un baño no dejó fijo ninguno de los lados del contacto ({% cite gabbard2025dropreboundlowweber %}). Cada problema expuso un supuesto de contacto que el anterior podía permitirse ocultar.

<div style="max-width: 640px; margin: 1.5rem auto;">
  {% include figure.liquid loading="lazy" path="assets/img/km-sphere.gif" alt="Simulación de una esfera rígida impactando una membrana elástica" title="Esfera rígida y membrana elástica" class="img-fluid rounded z-depth-1" caption="Simulación del modelo de 2022 de esfera rígida / membrana elástica." %}
</div>

<figure style="float: left; margin: 10px; width: 35%;">
  <div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <video autoplay muted loop controls
           style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
           preload="auto">
      <source src="/assets/img/drop.mp4" type="video/mp4">
      Su navegador no soporta la etiqueta de video.
    </video>
  </div>
  <figcaption style="text-align: center; margin-top: 5px;">
    KM aplicado a una gota impactando un baño de fluido, capturando la dinámica de rebote y coalescencia.
  </figcaption>
</figure>

La rama del sustrato sólido aisló entonces el comportamiento constitutivo no newtoniano. El trabajo de dinámica de contacto convirtió la presión y la extensión del contacto en incógnitas explícitas. Esa progresión lleva a la pregunta que el modelo actual está diseñado para responder: ¿qué parte de un rebote es dinámica de fluidos y qué parte proviene de la prescripción del contacto?

## Dinámica de contacto espectral

`SpectralKM.jl` es la formulación actual de gota--baño Newtoniana y sin coalescencia. Representa el baño con modos de Fourier–Bessel, la gota con modos de Legendre y la presión de contacto con modos de Legendre desplazados. Una búsqueda externa filtrada por viabilidad selecciona el parche de contacto.

Elimina tres opciones que, de otro modo, pueden decidir una predicción de rebote: un perfil de presión prescrito, una búsqueda de contacto a nivel de malla y una interfaz líquida fija. El baño, la gota, la presión soportada en el parche y la extensión del contacto se resuelven conjuntamente. El resultado es un modelo de contacto cuyos supuestos físicos pueden inspeccionarse en lugar de quedar enterrados en un interruptor del solver.

El recuadro de presión es un diagnóstico, no un campo pulido para sobreinterpretar. Muestra lo que el modelo resuelve en el contacto sin pretender que una traza puntual sea la respuesta final.

## Reología controlada sobre un sólido

`DropRebound.jl` mantiene el sustrato sólido para poder aislar cómo el comportamiento constitutivo cambia el rebote. `SpectralKM.jl` lleva el problema de contacto a dos interfaces líquidas en movimiento. Los videos son casos numéricos separados, no una referencia comparativa.

<div class="row">
  <div class="col-md-6">
    <figure>
      <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/droprebound-oldroyd-b-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="DropRebound numerical Oldroyd-B rebound case">
        <source src="{{ '/assets/img/droprebound-oldroyd-b.mp4' | relative_url }}" type="video/mp4">
        Su navegador no soporta la etiqueta de video.
      </video>
      <figcaption class="caption">Caso numérico de Oldroyd-B.</figcaption>
    </figure>
  </div>
  <div class="col-md-6">
    <figure>
      <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/droprebound-carreau-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="DropRebound numerical Carreau rebound case">
        <source src="{{ '/assets/img/droprebound-carreau.mp4' | relative_url }}" type="video/mp4">
        Su navegador no soporta la etiqueta de video.
      </video>
      <figcaption class="caption">Caso numérico de Carreau.</figcaption>
    </figure>
  </div>
</div>

## El código abierto como infraestructura de investigación

Los modelos de contacto ganan confianza cuando sus derivaciones, pruebas, diagnósticos y figuras pueden inspeccionarse conjuntamente. Los repositorios mantienen el código del paquete, los registros de validación, los barridos de parámetros y los scripts de renderizado junto al modelo, para que un lector pueda reproducir un resultado o cuestionar un supuesto sin tener que reconstruir el flujo de trabajo a partir de un artículo.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvis-aguero/SpectralKM.jl' %}
    {% include repository/repo.liquid repository='elvis-aguero/DropRebound.jl' %}
</div>