---
page_id: prj_bioreactor
layout: page
title: Fusión Bayesiana para el escalado de biorreactores
description: Incertidumbre atribuida a campos para la predicción de crecimiento multifísico
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
math: true
---

El primer producto de carne cultivada de prueba de concepto costó $325.000 en 2013. Una década de inversión después, los precios siguen estando muy por encima de la viabilidad comercial. Cada experimento que acopla una nueva línea celular a una nueva configuración de reactor requiere un compromiso de millones de dólares, y a ese coste, el espacio de diseño del biorreactor apenas se ha explorado.

El obstáculo no es la falta de modelos: es la falta de modelos que sepan lo que no saben. Una célula que pasa por una zona de alto cizallamiento y luego se desplaza hacia una región con poco oxígeno acumula un historial de exposición que determina si crece, se estresa o muere. Los modelos bien mezclados promedian ese historial. Los modelos sustitutos entrenados en experimentos escasos extrapolan con confianza a regímenes que nunca han visto. El resultado es un modelo que se equivoca de formas que son invisibles hasta que algo falla.

<figure style="float: right; margin: 10px; max-width: 340px;">
    {% include figure.liquid loading="eager" path="assets/img/bioreactor.gif" title="Bioreactor simulation" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Trayectorias de partículas simuladas dentro de un biorreactor de tanque agitado.
    </figcaption>
</figure>

El crecimiento depende simultáneamente de la mecánica de fluidos, la química del medio y el contexto biológico. Cuando una predicción falla, conocer la incertidumbre total no es suficiente: el ingeniero necesita saber qué campo es la fuente. Si el campo de la mecánica está submureado, el siguiente paso correcto es una simulación CFD que cuesta miles de horas de núcleo. Si el modelo biológico es el eslabón débil, el siguiente paso correcto es un ensayo de cultivo celular que cuesta meses de trabajo. Sin la atribución a nivel de campo, una predicción fallida envía a los ingenieros de vuelta al laboratorio para responder a la pregunta equivocada.

Extendemos el marco de entrenamiento cooperativo de Yi & Bessa, que desenreda la incertidumbre aleatoria y epistémica en la regresión de un solo campo, a este entorno multicampo. La mecánica y la biología se codifican por separado; luego se entrena un mapa de fusión aprendido para que el desacuerdo entre los dos codificadores se registre como una señal distinguible en lugar de disolverse en un término de varianza indiferenciado. Concretamente, el conflicto es la varianza posterior de la media predictiva fusionada:

$$u_\text{epi}(x_\text{mech}, x_\text{bio}) \approx \operatorname{Var}_{p(\eta \mid \mathcal{D})}\!\bigl[\mu_\eta(x_\text{mech}, x_\text{bio})\bigr]$$

Una línea de base de un solo campo no puede computar esta cantidad: no tiene forma de distinguir si una predicción es incierta porque un campo está submureado o porque dos campos realmente entran en conflicto.

Como primera validación, aplicamos la arquitectura a una tarea de regresión controlada: dados resúmenes de ventana fija del historial de exposición hidrodinámica de una población celular y variables de estado del proceso, predecir la desviación de la tasa de crecimiento de la biomasa en relación con un régimen operativo bien caracterizado. Este entorno controlado permite aislar si el término epistémico aumenta donde la cobertura conjunta es escasa y si atribuye correctamente el conflicto de la fuente antes de que la arquitectura se enfrente a un despliegue a escala piloto. El objetivo: un modelo que comprima cincuenta ensayos experimentales en diez al decir a los ingenieros qué ensayos son necesarios.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}
</div>