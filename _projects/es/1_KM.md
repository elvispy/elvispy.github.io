---
page_id: prj_km
layout: page
title: "Desarrollo de software para impactos deformables"
description: "Dinámica de contacto espectral para gotas que impactan un baño"
img: "assets/img/spectralkm-impact.gif"
importance: 1
category: "work"
related_publications: true
---

## Un milisegundo decide el resultado

En impresión, recubrimiento, pulverización y manipulación de líquidos, el impacto decide si un líquido se deposita, se extiende, rebota o se coalesce. Esa elección se produce en milisegundos, mientras los cuerpos implicados cambian de forma.

La dificultad es que una colisión deformable no tiene un área de contacto ni un campo de presión preexistentes. En el primer contacto, la presión remodela las interfaces, y sus formas alteran la presión. `SpectralKM.jl` plantea cómo resolver ese bucle cuando ambos lados de la colisión son líquido.

<figure>
  <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/spectralkm-impact-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="SpectralKM bath-impact animation with a red contact patch and pressure inset">
    <source src="{{ '/assets/img/spectralkm-impact.mp4' | relative_url }}" type="video/mp4">
    Su navegador no admite la etiqueta de video.
  </video>
  <figcaption class="caption">Simulación de impacto en baño. La región azul oscuro es el baño, la región azul claro la gota, y el arco rojo la zona de contacto resuelta. El recuadro muestra la presión puntual como diagnóstico, no como campo convergido.</figcaption>
</figure>

## Qué eliminó cada modelo

El estudio de 2022 sobre esfera rígida / membrana elástica hizo visible la primera variable oculta: la deformación del objetivo ({% cite aguero2022impact %}). Una gota líquida sobre un sólido trasladó la deformabilidad al impactor. Una gota sobre un baño dejó sin fijar ningún lado del contacto ({% cite gabbard2025dropreboundlowweber %}). Cada problema expuso una suposición de contacto que el anterior podía permitirse ocultar.

<div style="max-width: 640px; margin: 1.5rem auto;">
  {% include figure.liquid loading="lazy" path="assets/img/km-sphere.gif" alt="Simulación de una esfera rígida impactando una membrana elástica" title="Esfera rígida y membrana elástica" class="img-fluid rounded z-depth-1" caption="Simulación del modelo de esfera rígida / membrana elástica de 2022." %}
</div>

<figure style="float: left; margin: 10px; width: 35%;">
  <div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <video autoplay muted loop controls
           style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
           preload="auto">
      <source src="/assets/img/drop.mp4" type="video/mp4">
      Su navegador no admite la etiqueta de video.
    </video>
  </div>
  <figcaption style="text-align: center; margin-top: 5px;">
    KM aplicado a una gota que impacta un baño fluido, capturando la dinámica de rebote y coalescencia.
  </figcaption>
</figure>

La rama de sustrato sólido aisló entonces el comportamiento constitutivo no newtoniano. El trabajo de dinámica de contacto convirtió la presión y la extensión del contacto en incógnitas explícitas. Esa progresión conduce a la pregunta a la que el modelo actual está diseñado para responder: ¿qué parte de un rebote es dinámica de fluidos y qué parte proviene de la prescripción de contacto?

## Dinámica de contacto espectral

`SpectralKM.jl` es la formulación actual newtoniana, no coalescente, de gota–baño. Representa el baño con modos de Fourier–Bessel, la gota con modos de Legendre, y la presión de contacto con modos de Legendre desplazados. Una búsqueda externa filtrada por viabilidad selecciona la zona de contacto.

Elimina tres elecciones que de otro modo podrían determinar una predicción de rebote: un perfil de presión prescrito, una búsqueda de contacto a nivel de malla, y una interfaz líquida fija. El baño, la gota, la presión soportada en la zona de contacto y la extensión del contacto se resuelven conjuntamente. El resultado es un modelo de contacto cuyas suposiciones físicas pueden inspeccionarse en lugar de estar enterradas en un interruptor del solver.

El recuadro de presión es un diagnóstico, no un campo pulido para sobreinterpretar. Muestra lo que el modelo resuelve en el contacto sin pretender que una traza puntual sea la respuesta final.

## Reología controlada sobre un sólido

`DropRebound.jl` mantiene el sustrato sólido para poder aislar cómo el comportamiento constitutivo modifica el rebote. `SpectralKM.jl` lleva el problema de contacto a dos interfaces líquidas en movimiento. Los videos son casos numéricos independientes, no una referencia de comparación.

<div class="row">
  <div class="col-md-6">
    <figure>
      <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/droprebound-oldroyd-b-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="DropRebound numerical Oldroyd-B rebound case">
        <source src="{{ '/assets/img/droprebound-oldroyd-b.mp4' | relative_url }}" type="video/mp4">
        Su navegador no admite la etiqueta de video.
      </video>
      <figcaption class="caption">Caso numérico Oldroyd-B.</figcaption>
    </figure>
  </div>
  <div class="col-md-6">
    <figure>
      <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/droprebound-carreau-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="DropRebound numerical Carreau rebound case">
        <source src="{{ '/assets/img/droprebound-carreau.mp4' | relative_url }}" type="video/mp4">
        Su navegador no admite la etiqueta de video.
      </video>
      <figcaption class="caption">Caso numérico Carreau.</figcaption>
    </figure>
  </div>
</div>

## Código abierto como infraestructura de investigación

Los modelos de contacto ganan confianza cuando sus derivaciones, pruebas, diagnósticos y figuras pueden inspeccionarse juntos. Los repositorios mantienen el código del paquete, los registros de validación, los barridos de parámetros y los scripts de renderización junto al modelo, de modo que un lector pueda reproducir un resultado o cuestionar una suposición sin tener que reconstruir el flujo de trabajo a partir de un artículo.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvis-aguero/SpectralKM.jl' %}
    {% include repository/repo.liquid repository='elvis-aguero/DropRebound.jl' %}
</div>