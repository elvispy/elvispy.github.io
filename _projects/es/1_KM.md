---
page_id: prj_km
layout: page
title: Simulación de impactos deformables
description: El método de correspondencia cinemática
img: assets/img/km-sphere.gif
importance: 1
category: work
related_publications: true
---

Todos estamos contentos de calcular la trayectoria de un objeto en caída libre. Pero, ¿cómo resolvemos realmente lo que sucede justo después de eso, durante una colisión inelástica?. Las interacciones involucradas son altamente no lineales y, a menudo, los objetos que colisionan pueden deformarse al estar en contacto.

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/km-sphere.gif" title="example image" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Ejemplo de simulación de una esfera sólida impactando una membrana elástica.
    </figcaption>
</figure>

Este problema es relevante porque tiene muchas aplicaciones, desde robots blandos hasta dientes de engranajes e incluso astrofísica. En general, tienes una PDE subyacente y algunas restricciones no lineales que representan el problema. El KM establece una nueva restricción en la superficie de contacto al imponer que el ángulo de incidencia entre los dos objetos sea suave. Tiene la ventaja de introducir una idea intuitiva (fácil de codificar = se puede implementar rápidamente en entornos industriales), al tiempo que mejora la precisión.
Este marco es agnóstico a la técnica utilizada para aproximar la PDE, por lo que se puede implementar utilizando un esquema de diferencias finitas, o elementos finitos, o incluso un método variacional.

Hemos implementado con éxito el KM para el caso de una esfera rígida que impacta contra una membrana elástica, y actualmente estamos trabajando en otros casos, sobre todo una gota deformable que impacta diferentes superficies, ya sean rígidas o no.

Escribimos un artículo (ver {% cite aguero2022impact %}) donde estudiamos tanto experimental como numéricamente el impacto deformable acoplado entre una esfera sólida y una membrana elástica.

El trabajo actual implica extender este marco a otros problemas. Actualmente estamos trabajando en el problema de una gota de agua deformable que impacta contra un baño de fluido. Nuestro modelo es particularmente adecuado para impactos de baja velocidad, donde las simulaciones numéricas directas podrían volverse computacionalmente demasiado costosas. Aquí hay tres de los repositorios que tenemos para estos problemas:

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/kinematic-match-sphere' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-solidsubstrate-v3' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-onto-bath' %}  
</div>
