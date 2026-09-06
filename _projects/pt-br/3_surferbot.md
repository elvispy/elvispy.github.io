---
page_id: prj_surferbot
layout: page
title: Habilitando locomoção interfacial
description: Propulsão por ondas de uma boia flexível
img: assets/img/surferbot.gif
importance: 1
category: work
related_publications: true
math: true
---

## Uma vibração pode escolher uma direção

Uma boia compacta não tem hélice, nem leme, nem empuxo constante. No entanto, se o motor vibratório for deslocado do centro, as ondas que ela irradia não mais se propagam igualmente nas duas direções. O rastro torna-se assimétrico; esse fluxo de momento assimétrico confere à boia uma direção de deslocamento. O surpreendente é que uma vibração de média zero pode produzir um empuxo médio não nulo. Isso ocorre não por esconder um ciclo de batida, mas por alterar a forma como um corpo deformável lança ondas na superfície.

Esse é um problema útil sempre que acionamento e estrutura são inseparáveis: um mecanismo pode parecer simétrico em um modelo CAD, enquanto sua dinâmica seleciona uma direção. A questão não é simplesmente se a boia se deforma ou onde o motor está posicionado. É como essas escolhas remodelam as ondas que carregam o momento para fora.

<div style="width: 100%; display: flex; justify-content: center;">
  <div style="position: relative; width: 80%; padding-bottom: 45%; height: 0; overflow: hidden;">
    <iframe
      src="https://www.youtube.com/embed/PQF6yGAs-TA?autoplay=1&mute=1&si=0qH_j8Lccw4ljD_3"
      title="Published SurferBot demonstration"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen>
    </iframe>
  </div>
</div>
<p class="caption"><strong>Demonstração publicada do SurferBot.</strong> Uma demonstração física do mecanismo; não é saída numérica deste repositório.</p>

{% include figure.liquid path="assets/img/flexible-surferbot-simulation.gif" alt="Simulação numérica de uma boia flexível e seu rastro assimétrico" title="Simulação numérica do Surferbot flexível" caption="Simulação numérica: a boia flexível, o campo de ondas irradiado e seu rastro assimétrico evoluem juntos." %}

O cálculo precisa manter o acoplamento intacto. O modelo acoplado viga-superfície livre resolve a deformação, o campo de ondas emitido e o empuxo médio em um único sistema. A posição do motor altera quais modos de flexão são excitados; a rigidez flexional altera como esses modos alimentam as ondas. O empuxo resultante não é monotônico em nenhuma das variáveis. Uma deformação estática ou a posição do motor isoladamente não nos dizem para onde a boia irá.

Criei o fluxo de trabalho de análise reprodutível em Julia por trás desse cálculo: varreduras de parâmetros, redução modal, testes de paridade com MATLAB e geração de figuras a partir dos mesmos dados. Também tornei a verificação de simetria explícita. No benchmark de simetria por reflexão com gravidade pura, a excitação centrada deve resultar em empuxo líquido zero; caso contrário, a discretização fabricou propulsão. Essa invariância não se estende a casos com termos capilares de borda, onde a simetria de reflexão exata é fisicamente quebrada.

{% include figure.liquid path="assets/img/flexible-surferbot-thrust-map.png" alt="Empuxo normalizado com sinal em função da posição do motor e da rigidez flexional" title="Mapa de empuxo do Surferbot flexível" caption="Este mapa de projeto mostra o empuxo normalizado com sinal em função da posição do motor x_M/L e da rigidez flexional normalizada κ. As regiões vermelha e azul indicam direções opostas de empuxo, revelando onde a direção muda; os símbolos marcam os casos do artigo publicado." %}

O mapa torna visível a consequência de projeto: pequenas mudanças na posição do motor podem inverter a direção de deslocamento, e o mesmo atuador pode se comportar de forma diferente conforme a boia fica mais rígida ou mais flexível. É um banco de testes compacto para uma prática mais ampla de P&amp;D: tratar o corpo, a excitação e o meio circundante como um único problema de projeto dinâmico, em vez de três parâmetros independentes.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot' %}
</div>
