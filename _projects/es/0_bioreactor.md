---
page_id: prj_bioreactor
layout: page
title: Acoplamiento de Crecimiento, Flujo y Optimización en Sistemas Complejos
description: Integrando el crecimiento biológico y la dinámica de fluidos a través de vastos espacios de diseño
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
---

# Integrando vida y flujo: hacia biorreactores predictivos para carne cultivada

### Una nueva frontera de modelado
Ningún marco existente ha acoplado completamente el **crecimiento biológico** con la **dinámica de fluidos multifásica** a través del enorme espacio de diseño de los biorreactores modernos.
Los modelos tradicionales tratan el medio de cultivo como estático o las células como trazadores pasivos. En realidad, la proliferación celular, el transporte de oxígeno y la estructura del flujo co-evolucionan: cada uno determina al otro. Capturar esa interacción mientras se abarcan cientos de posibles geometrías, volúmenes de llenado y programas de balanceo es la clave para construir biorreactores que puedan escalar la carne cultivada de una curiosidad de laboratorio a una tecnología alimentaria global.

### Por qué es importante
La carne cultivada promete reducir la huella ambiental de la agricultura, pero su éxito depende del **rendimiento del biorreactor**.
Dentro de estos dispositivos, miles de millones de células animales crecen suspendidas en un medio rico en nutrientes que debe permanecer bien mezclado y bien oxigenado. El **biorreactor de balanceo**, una bolsa flexible que se inclina rítmicamente como una cuna, ofrece una alternativa suave y escalable a los tanques impulsados por hélices. Sin embargo, el mismo balanceo que mezcla los nutrientes también puede separar las células.
Ajustar experimentalmente esos parámetros es prohibitivamente costoso y lento. Cada prueba consume instalaciones estériles, semanas de tiempo de cultivo y costosos medios de crecimiento. Por lo tanto, la simulación predictiva es esencial.

### El desafío científico
Este problema se encuentra en la intersección de la **mecánica de fluidos multifásica no newtoniana**, los **fenómenos de transporte** y la **biología computacional**.
La superficie libre del fluido se mueve en un **marco no inercial**, la viscosidad del medio evoluciona a medida que las células proliferan y las propias células modifican el campo de flujo a través del consumo local de oxígeno y la resistencia.
La CFD convencional no puede resolver tales dinámicas acopladas, y los modelos biológicos existentes ignoran el flujo por completo. Nuestro objetivo es unificarlos.

### Nuestro enfoque
En Brown, estamos desarrollando el primer **marco computacional de código abierto** que integra la **dinámica celular basada en agentes** dentro de un **solucionador multifásico de volumen de fluido (VOF)** para biorreactores de balanceo.
Este modelo predice la transferencia de oxígeno, los gradientes de nutrientes y las tensiones de cizalladura directamente a partir de los primeros principios, mientras rastrea cómo estos campos afectan el crecimiento local de la biomasa. Debido a que la simulación numérica directa de cada configuración es computacionalmente costosa, incorporamos el solucionador en un **modelo sustituto basado en datos** que aprende de las ejecuciones de alta fidelidad. Combinado con la **optimización bayesiana**, esto permite la exploración sistemática de miles de combinaciones de diseño (geometría, frecuencia de balanceo, amplitud, reología de los medios) a una fracción del costo computacional.

Este trabajo establece un puente entre la **mecánica del continuo y los sistemas vivos**. Extiende el modelado clásico de flujo multifásico a un régimen donde el "fluido" crece, consume y se adapta.
Al resolver cómo la entrega de oxígeno y el estrés mecánico influyen en los resultados celulares, el marco proporciona criterios cuantitativos para entornos hidrodinámicos "seguros para las células", algo previamente definido solo empíricamente.

### Impacto más amplio
El resultado es una herramienta predictiva y reproducible para la biotecnología sostenible.
Al reemplazar la creación de prototipos físicos costosos con un diseño abierto basado en simulación, podemos acelerar la ampliación de la carne cultivada y los sistemas de bioproducción relacionados, como vacunas, terapias celulares y fabricación de proteínas.
Todo el código y los conjuntos de datos se publican abiertamente para fomentar la validación y la reutilización por parte de la comunidad.

Para obtener detalles técnicos, consulte [Kim, Harris & Cimpeanu (2025)](https://arxiv.org/abs/2504.05421) o explore el [repositorio BioReactor](https://github.com/rcsc-group/BioReactor).

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}  
</div>
