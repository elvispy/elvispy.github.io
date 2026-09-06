---
page_id: prj_cbpf
layout: page
title: Transporte de espín por medición e inferencia
description: De los ajustes de FMR basados en LLG a la desconvolución de iSHE y la selección de materiales
img: assets/img/spintronics.jpeg
importance: 2
category: work
giscus_comments: true
---

## Cuantificación del transporte de espín en películas delgadas

Un óxido nativo delgado sobre permalloy (Py) infla los anchos de línea de FMR y sesga el **parámetro de amortiguación de Gilbert** α hacia arriba. El efecto es invisible a menos que se rastreen las pendientes de los anchos de línea a través de muchas frecuencias y la química superficial se verifique con XPS. Extraer el ángulo de espín Hall de la capa adyacente de metal pesado mediante el **efecto espín Hall inverso (iSHE)** se complica aún más por la magnetorresistencia anisótropa (AMR) del ferromagneto. La AMR genera un voltaje en la misma condición de resonancia, y la geometría por sí sola no puede separarlo de la señal de iSHE.

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/spintronics.jpeg" title="Bicapas de película delgada para FMR/iSHE" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Películas delgadas FM/NM utilizadas para mediciones de FMR e iSHE.
    </figcaption>
</figure>

Medimos cuatro sistemas de bicapa (Py/Pt, Py/W, Py/Cu, Py/Ti) y más tarde YIG/Pt y YIG/W. Para α, la detección lock-in con modulación de campo extrajo formas de línea derivadas-Lorentzianas, y la selección de capa de sellado guiada por XPS mantuvo la contribución del óxido identificable. Para iSHE, Py/Ti sirvió como referencia de AMR: el titanio tiene un acoplamiento espín-órbita despreciable, por lo que el voltaje en esa pila es una línea de base limpia. Restarlo de Py/Pt y Py/W aísla el componente simétrico de iSHE. Cambiar a YIG (un ferromagneto aislante sin corriente de carga en la capa magnética) eliminó por completo la fuga, dejando formas de línea de iSHE puramente lorentzianas.

El acoplamiento espín-órbita del platino fue el más fuerte en ambas medidas simultáneamente: el mayor aumento de amortiguación y la mayor amplitud de iSHE, una consistencia que apunta a un efecto material real y no a un artefacto. El tungsteno fue claramente segundo; el cobre y el titanio fueron efectivamente cero, consistente con su débil acoplamiento espín-órbita. La inversión de signo entre YIG/Pt y YIG/W coincidió con el signo predicho para el ángulo de espín Hall en la teoría. Para mantener el montaje de FMR funcionando durante barridos nocturnos, añadimos un monitor IoT de bajo costo (ESP8266 + sensor de flujo Hall) con alertas de correo electrónico automatizadas; detectó al menos dos interrupciones del refrigerante antes de que pudieran arruinar las mediciones.

**Métodos y datos:** [Informe completo (PDF)](/assets/pdf/Spintronics__The_New_Electronics.pdf)