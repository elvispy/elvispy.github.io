---
page_id: prj_sim
layout: page
title: Un solucionador de similitud dinámico para la dinámica de fluidos.
description: Un buscador simbólico de EDO para soluciones de similitud.
img: assets/img/julialogo.webp
importance: 3
category: fun
related_publications: true
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/1.jpg" title="imagen de ejemplo" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/3.jpg" title="imagen de ejemplo" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="imagen de ejemplo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Añada leyendas a las fotos fácilmente. A la izquierda, una carretera atraviesa un túnel. En el medio, hojas caen artísticamente en una sesión de fotos hipster. A la derecha, en otra sesión de fotos hipster, un leñador agarra un puñado de agujas de pino.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="imagen de ejemplo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Esta imagen también puede tener una leyenda. Es como magia.
</div>

También puede poner texto normal entre sus filas de imágenes, incluso citas {% cite einstein1950meaning %}.
Digamos que quería escribir un poco sobre su proyecto antes de publicar el resto de las imágenes.
Describe cómo trabajó, sudó, _sangró_ por su proyecto, y luego... revela su gloria en la siguiente fila de imágenes.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="imagen de ejemplo" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="imagen de ejemplo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    También puede tener imágenes de 2/3 + 1/3 con estilo artístico, como estas.
</div>

El código es simple.
Simplemente envuelva sus imágenes con `<div class="col-sm">` y colóquelas dentro de `<div class="row">` (lea más sobre el sistema <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a>).
Para que las imágenes sean receptivas, agregue la clase `img-fluid` a cada una; para esquinas redondeadas y sombras, use las clases `rounded` y `z-depth-1`.
Aquí está el código para la última fila de imágenes de arriba:
