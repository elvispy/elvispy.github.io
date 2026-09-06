---
layout: page
title: Julia a escala en clústeres heterogéneos
description: Precompilación + entrega de artefactos CVMFS para arranques rápidos y reproducibles
importance: 2
img: assets/img/CERNlogo.webp
category: work
---

## Software for Experiments (EP-SFT), CERN, supervisado por Graeme Stewart

Me incorporé al [Programa de Estudiantes de Verano del CERN 2024](https://home.cern/summer-student-programme) para trabajar en la latencia de arranque y la reproducibilidad de las cargas de trabajo de Julia en pipelines de física de altas energías (HEP).

Los grandes pipelines de HEP lanzan miles de trabajos cortos de Julia en nodos heterogéneos. Cada arranque en frío desencadena la compilación JIT y la precompilación de paquetes desde cero, desperdiciando tiempo de CPU y causando una latencia de cola impredecible. Los sitios también requieren una distribución de solo lectura, direccionada por contenido (CernVM-FS, servida a través de CVMFS), lo que descarta los depósitos de paquetes escribibles.

El flujo de trabajo compila, firma y publica imágenes de sistema de Julia precompiladas y artefactos de paquetes en CVMFS, e hidrata los depósitos por nodo bajo demanda. La herramienta principal, `DepotDelivery.jl`, orquesta el empaquetado de artefactos, el anclaje de versiones y la estructura de caché. Los artefactos son direccionados por contenido (estables por hash), de modo que los nodos obtienen flujos de bytes idénticos independientemente del sitio. Un pequeño conjunto de imágenes de microarquitectura (p. ej., la línea base `x86-64`, `x86-64-v3`) cubre la diversidad de hardware de la grid y se selecciona en tiempo de ejecución. En pilas representativas de HEP (reconstrucción de jets, envoltorios de Geant4), la latencia de arranque en frío se redujo en un orden de magnitud; los nodos montan imágenes precompiladas sin acceso de escritura y sin compilaciones locales.

Presenté este trabajo en el Taller Julia para Física de Altas Energías 2024 (JuliaHEP 2024).

<div style="float: left; margin: 10px;">
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7233730225589673984?compact=1"
      height="600" width="450" frameborder="0" allowfullscreen="" title="Embedded post">
  </iframe>
</div>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo.liquid repository='JuliaComputing/DepotDelivery.jl' %}
</div>
