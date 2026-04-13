---
page_id: prj_bioreactor
layout: page
title: Acoplamiento de crecimiento, flujo y optimización en sistemas complejos
description: Integración del crecimiento biológico y la dinámica de fluidos en amplios espacios de diseño
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
---

Las células en un biorreactor grande no se quedan quietas — circulan, y el lugar al que van determina lo que experimentan. Una célula que pasa por una zona de alto cizallamiento y luego deriva hacia una región con agotamiento de oxígeno ha acumulado un historial de exposición que determina si crece, se estresa o muere. Los modelos de mezcla perfecta promedian ese historial y borran la varianza en el historial de exposición que predice si una célula crece o falla.

Predecir el crecimiento a nivel de población a partir de esos historiales requiere fusionar dos entradas cualitativamente diferentes: historiales de exposición hidrodinámica y variables de estado del proceso como la densidad del inóculo, el oxígeno disuelto y el pH del cultivo. Los experimentos son costosos, la mayoría de los regímenes de operación se observan de forma dispersa y el espacio de entrada conjunto sobre ambos campos es grande, lo que significa que un modelo que produce una predicción segura en un régimen bien muestreado y una igualmente segura en un régimen que nunca ha visto no es útil. Es erróneo en formas que son invisibles hasta que algo falla.

Extendemos el marco de entrenamiento cooperativo de Yi & Bessa — que desenreda la incertidumbre aleatoria y epistémica en la regresión de un solo campo — al entorno de múltiples campos, y construimos una **arquitectura de fusión bayesiana cooperativa** con codificadores específicos de campo para la mecánica y la biología y un mapa de fusión aprendido entrenado de modo que la incertidumbre epistémica aumente solo donde la cobertura conjunta es escasa y registre el desacuerdo entre campos como una señal distinguible — medida puntualmente como la varianza posterior de la media predictiva fusionada — en lugar de promediarla en un término de varianza indiferenciado. Esa señal de conflicto es el entregable clave que la línea base de un solo campo no proporciona: cuando los codificadores hidrodinámicos y biológicos dan señales localmente divergentes, el modelo lo señala en lugar de ocultarlo.

La primera prueba es un problema de regresión: dado resúmenes de ventana fija del historial de exposición hidrodinámica de una población celular y variables de estado del proceso, predecir la desviación de la tasa de crecimiento de la biomasa en relación con un régimen operativo bien respaldado. La tarea es lo suficientemente pequeña como para validar cuidadosamente los diagnósticos de incertidumbre —¿aumenta el término epistémico donde la cobertura conjunta es escasa? ¿registra el conflicto de origen en lugar de ocultarlo?— mientras se mantiene la estructura de dos campos que los enfoques de fusión deterministas no pueden preservar sin colapsar en predicciones puntuales excesivamente seguras en regiones dispersas. La arquitectura apunta al caso de dos campos; queda por ver si la fusión bayesiana cooperativa sigue estando bien calibrada a medida que los campos de origen se multiplican, y si los cabezales predictivos gaussianos se mantienen o si se vuelven necesarias alternativas basadas en mezclas y flujos.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}
</div>