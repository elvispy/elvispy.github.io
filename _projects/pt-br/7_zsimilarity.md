---
page_id: prj_sim
layout: page
title: Um solucionador de similaridade dinâmico para dinâmica de fluidos.
description: Um localizador simbólico de EDPs para soluções de similaridade.
img: assets/img/julialogo.webp
importance: 3
category: fun
related_publications: true
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/1.jpg" title="imagem de exemplo" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/3.jpg" title="imagem de exemplo" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="imagem de exemplo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Legende fotos facilmente. À esquerda, uma estrada passa por um túnel. No meio, folhas caem artisticamente em uma sessão de fotos hipster. À direita, em outra sessão de fotos hipster, um lenhador agarra um punhado de agulhas de pinheiro.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="imagem de exemplo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Esta imagem também pode ter uma legenda. É como mágica.
</div>

Você também pode colocar texto normal entre suas linhas de imagens, até citações {% cite einstein1950meaning %}.
Digamos que você queria escrever um pouco sobre seu projeto antes de postar o resto das imagens.
Você descreve como você labutou, suou, _sangrou_ pelo seu projeto, e então... você revela sua glória na próxima linha de imagens.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="imagem de exemplo" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="imagem de exemplo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Você também pode ter imagens artisticamente estilizadas 2/3 + 1/3, como estas.
</div>

O código é simples.
Basta envolver suas imagens com `<div class="col-sm">` e colocá-las dentro de `<div class="row">` (leia mais sobre o sistema <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a>).
Para tornar as imagens responsivas, adicione a classe `img-fluid` a cada uma; para cantos arredondados e sombras, use as classes `rounded` e `z-depth-1`.
Aqui está o código para a última linha de imagens acima:
