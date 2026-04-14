---
page_id: prj_bioreactor
layout: page
title: Acoplamiento de Crecimiento, Flujo y Optimización en Sistemas Complejos
description: Integrando crecimiento biológico y dinámica de fluidos en vastos espacios de diseño
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
math: true
---

Las células en un biorreactor grande no se quedan quietas: circulan, y el lugar a donde van determina lo que experimentan. Una célula que pasa por una zona de alto cizallamiento y luego se desplaza hacia una región con agotamiento de oxígeno ha acumulado una historia de exposición que determina si crece, se estresa o muere. Los modelos bien mezclados promedian esa historia y borran la varianza en la historia de exposición que predice si una célula crece o falla.

<figure style="float: right; margin: 10px; max-width: 340px;">
    {% include figure.liquid loading="eager" path="assets/img/bioreactor.gif" title="Bioreactor simulation" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Trayectorias de partículas simuladas dentro de un biorreactor de tanque agitado.
    </figcaption>
</figure>

Predecir el crecimiento a nivel de población a partir de esas historias requiere fusionar dos entradas cualitativamente diferentes: historias de exposición hidrodinámica y variables de estado del proceso como densidad de inóculo, oxígeno disuelto y pH del cultivo. Los experimentos son costosos, la mayoría de los regímenes operativos se observan escasamente y el espacio de entrada conjunto sobre ambos campos es grande. Un modelo que produce una predicción segura en un régimen bien muestreado y una igualmente segura en un régimen que nunca ha visto no es útil. Es erróneo de maneras que son invisibles hasta que algo falla.

Extendemos el marco de entrenamiento cooperativo de Yi & Bessa, que desenreda la incertidumbre aleatoria y epistémica en la regresión de un solo campo, al entorno de múltiples campos, y construimos una **arquitectura de fusión bayesiana cooperativa** con codificadores específicos del campo para mecánica y biología y un mapa de fusión aprendido entrenado de modo que la incertidumbre epistémica aumente solo donde la cobertura conjunta es escasa y registre el desacuerdo entre campos como una señal distinguible, en lugar de plegarlo en un término de varianza indiferenciado. Concretamente, el conflicto es la varianza posterior de la media predictiva fusionada:

$$u_\text{epi}(x_\text{mech}, x_\text{bio}) \approx \operatorname{Var}_{p(\eta \mid \mathcal{D})}\!\bigl[\mu_\eta(x_\text{mech}, x_\text{bio})\bigr]$$

Esa señal de conflicto es el entregable clave que la línea base de un solo campo no proporciona: cuando los codificadores hidrodinámicos y biológicos dan señales localmente divergentes, el modelo lo marca en lugar de enmascararlo.

La primera prueba es un problema de regresión: dadas descripciones de ventana fija de la historia de exposición hidrodinámica de una población celular y variables de estado del proceso, predecir la desviación de la tasa de crecimiento de la biomasa en relación con un régimen operativo bien respaldado. La tarea es lo suficientemente pequeña como para validar cuidadosamente los diagnósticos de incertidumbre: ¿aumenta el término epistémico donde la cobertura conjunta es escasa? ¿Registra el conflicto de origen en lugar de ocultarlo? Esos son los diagnósticos que la arquitectura debe superar, manteniendo la estructura de dos campos que los enfoques de fusión deterministas no pueden preservar sin colapsar en predicciones puntuales excesivamente seguras en regiones escasas. La arquitectura se dirige al caso de dos campos; si la fusión bayesiana cooperativa sigue estando bien calibrada a medida que se multiplican los campos de origen, y si los cabezales predictivos gaussianos se mantienen o si se vuelven necesarias alternativas basadas en mezclas y flujos.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}
</div>