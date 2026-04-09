---
page_id: prj_cbpf
layout: page
title: Transporte de espín por medición e inferencia
description: De ajustes FMR basados en LLG a la deconvolución iSHE y selección de materiales
img: assets/img/spintronics.jpeg
importance: 2
category: work
giscus_comments: true
---

## Cuantificando el transporte de espín en películas delgadas

Un óxido nativo delgado en permalloy (Py) infla los anchos de línea FMR y sesga el **parámetro de amortiguamiento de Gilbert** α hacia arriba — invisible a menos que se rastree la pendiente en muchas frecuencias y se verifique la química de la superficie mediante XPS. La extracción del ángulo Hall de espín de la capa adyacente de metal pesado a través del **efecto Hall de espín inverso (iSHE)** se complica aún más por la magnetorresistencia anisotrópica (AMR) del ferromagneto, que genera un voltaje en la misma condición de resonancia que no puede separarse de la señal iSHE solo por geometría.

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/spintronics.jpeg" title="Thin-film bilayers for FMR/iSHE" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Películas delgadas de FM/NM utilizadas para mediciones de FMR e iSHE.
    </figcaption>
</figure>

Medimos cuatro sistemas de bicapas — Py/Pt, Py/W, Py/Cu, Py/Ti — y más tarde YIG/Pt y YIG/W. Para α, la detección lock-in con modulación de campo extrajo formas de línea Lorentziana derivadas, y la selección de la capa de recubrimiento guiada por XPS mantuvo identificable la contribución del óxido. Para iSHE, Py/Ti sirvió como referencia de AMR: el titanio tiene un acoplamiento espín-órbita insignificante, por lo que el voltaje en esa pila es pura línea base. Al restarlo de Py/Pt y Py/W se aísla el componente simétrico de iSHE. El cambio a YIG — un ferromagneto aislante sin corriente de carga en la capa magnética — eliminó la fuga por completo, dejando formas de línea iSHE puramente Lorentzianas.

El acoplamiento espín-órbita del platino fue el más fuerte por ambas medidas simultáneamente — el mayor aumento de amortiguamiento y la mayor amplitud de iSHE — una consistencia que apunta a un efecto material real en lugar de un artefacto. El tungsteno quedó claramente en segundo lugar; el cobre y el titanio fueron efectivamente cero, consistentes con su débil acoplamiento espín-órbita. La inversión del signo entre YIG/Pt y YIG/W confirmó la predicción teórica para el ángulo Hall de espín. Para mantener el equipo de FMR funcionando durante barridos nocturnos, agregamos un monitor IoT de bajo costo (ESP8266 + sensor de flujo Hall) con alertas automáticas por correo electrónico — detectó al menos dos interrupciones del refrigerante antes de que pudieran arruinar las mediciones.

**Métodos y datos:** [Informe completo (PDF)](/assets/pdf/Spintronics__The_New_Electronics.pdf)