---
layout: page
title: Julia a escala en clústeres heterogéneos
description: Precompilación + entrega de artefactos CVMFS para inicios rápidos y reproducibles
importance: 2
img: assets/img/CERNlogo.webp
category: work
---

## Software para Experimentos (EP-SFT), CERN — supervisado por Graeme Stewart

Me uní al [Programa de Estudiantes de Verano del CERN 2024](https://home.cern/summer-student-programme) para trabajar en la latencia de inicio y la reproducibilidad para cargas de trabajo de Julia en tuberías de física de altas energías (HEP).

Las grandes tuberías de HEP lanzan miles de trabajos cortos de Julia en nodos heterogéneos. Cada inicio en frío activa la compilación JIT y la precompilación de paquetes desde cero — desperdiciando tiempo de CPU y causando una latencia de cola impredecible. Los sitios también requieren una distribución de solo lectura direccionada por contenido (CernVM-FS), lo que descarta los depósitos de paquetes escribibles.

Construimos un flujo de trabajo que construye, firma y publica imágenes del sistema Julia precompiladas y artefactos de paquetes en CVMFS, luego hidrata los depósitos por nodo a pedido. La herramienta principal, `DepotDelivery.jl`, orquestra la agrupación de artefactos, el anclaje de versiones y el diseño de la caché. Los artefactos están direccionados por contenido (estables por hash) para que los nodos recuperen flujos de bytes idénticos independientemente del sitio. Un pequeño conjunto de imágenes de microarquitectura (por ejemplo, base `x86-64`, `x86-64-v3`) cubre la diversidad de hardware de la red y se seleccionan en tiempo de ejecución. En pilas de HEP representativas (reconstrucción de jets, envoltorios de Geant4), la latencia de inicio en frío cayó en un orden de magnitud; los nodos montan imágenes precompiladas sin acceso de escritura y sin construcciones locales.

Presenté este trabajo en el Taller Julia para Física de Altas Energías 2024 (JuliaHEP 2024).

<div style="float: left; margin: 10px;">
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7233730225589673984?compact=1"
      height="600" width="450" frameborder="0" allowfullscreen="" title="Embedded post">
  </iframe>
</div>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo.liquid repository='JuliaComputing/DepotDelivery.jl' %}
</div>