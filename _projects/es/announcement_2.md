---
layout: page
title: Julia a escala en clústeres heterogéneos
description: Precompilación + entrega de artefactos CVMFS para inicios rápidos y reproducibles
importance: 2
img: assets/img/CERNlogo.webp
category: work
---

## Software para Experimentos (EP-SFT), CERN — supervisado por Graeme Stewart

Me uní al [Programa de Estudiantes de Verano del CERN](https://home.cern/summer-student-programme) de 2024 para trabajar en la **latencia de inicio y la reproducibilidad** para las cargas de trabajo de Julia utilizadas por los experimentos de física de altas energías (HEP).

### El problema

Los grandes pipelines de HEP lanzan miles de trabajos cortos de Julia en nodos heterogéneos. Los inicios en frío activan el trabajo de **JIT + precompilación** en cada nodo, desperdiciando tiempo de CPU y causando latencia en la cola. Los sitios también prefieren la distribución **de solo lectura y direccionada por contenido** (CernVM-FS), lo que complica los depósitos de paquetes grabables.

### El enfoque

Construimos un flujo de trabajo que **construye, firma y publica imágenes del sistema Julia precompiladas y artefactos de paquetes** en CVMFS, luego **hidrata los depósitos por nodo** bajo demanda:

- **DepotDelivery.jl** orquesta la agrupación de artefactos, la fijación de versiones y el diseño de la caché.
- Los artefactos están **direccionados por contenido** (hash-estable), por lo que los nodos obtienen flujos de bytes idénticos.
- Admitimos **múltiples microarquitecturas** produciendo un pequeño conjunto de imágenes (por ejemplo, `x86-64` de línea base, `x86-64-v3`), seleccionadas en tiempo de ejecución.
- Las ejecuciones A/B validaron que la **misma imagen** produce la **misma caché de métodos** y el mismo gráfico de módulos localmente y en el clúster.

### Lo que permite

- **Reducciones de orden de magnitud** en la latencia de inicio en frío en pilas HEP representativas (por ejemplo, reconstrucción de jets, wrappers de Geant4).
- **Inicios deterministas**: artefactos idénticos en todos los sitios a través de CVMFS.
- **Cero compilaciones por nodo**: los nodos montan y utilizan imágenes precompiladas; no se requiere acceso de escritura.
- **Apto para políticas**: distribución de solo lectura, integridad del contenido y reversiones a través de hashes.

### Alcance y portabilidad

El método **no es específico de HEP**. Cualquier sitio con hardware heterogéneo y almacenamiento de solo lectura puede adoptar el patrón:

1. construir imágenes en un entorno de CI controlado,
2. publicar en un almacenamiento inmutable y direccionado por contenido,
3. seleccionar la imagen de microarquitectura más cercana en el lanzamiento.

Presenté este trabajo en el **Julia for High-Energy Physics 2024 Workshop** (JuliaHEP 2024).

**Proyecto:** [DepotDelivery.jl](https://github.com/JuliaComputing/DepotDelivery.jl)

<div style="float: left; margin: 10px;">
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7233730225589673984?compact=1" 
      height="600" width="450" frameborder="0" allowfullscreen="" title="Embedded post">
  </iframe>
</div>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo.liquid repository='JuliaComputing/DepotDelivery.jl' %}
</div>
