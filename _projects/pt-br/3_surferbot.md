---
page_id: prj_surferbot
layout: page
title: Surferbot Flexível
description: Propulsão impulsionada por ondas através de uma balsa flexível
img: assets/img/surferbot.gif
importance: 1
category: work
related_publications: true
math: true
---

## Uma vibração pode escolher uma direção

Uma balsa compacta não tem hélice, nem barbatana, nem empuxo constante. No entanto, ao afastar seu motor vibratório do centro, as ondas que ela irradia não saem mais igualmente em ambas as direções. A esteira torna-se assimétrica; esse fluxo de momento assimétrico dá à balsa uma direção de deslocamento. A parte surpreendente é que uma vibração de média zero pode produzir um empuxo médio diferente de zero — não escondendo um ciclo de curso, mas mudando a forma como um corpo deformável lança ondas na superfície.

Esse é um problema útil sempre que a atuação e a estrutura são inseparáveis: um mecanismo pode parecer simétrico em um modelo CAD enquanto sua dinâmica seleciona uma direção. A questão não é simplesmente se a balsa se dobra ou onde o motor está posicionado. É como essas escolhas remodelam as ondas que transportam o momento para longe.

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
<p class="caption"><strong>Demonstração publicada do SurferBot.</strong> Uma demonstração física do mecanismo; não é um resultado numérico deste repositório.</p>

{% include figure.liquid path="assets/img/flexible-surferbot-simulation.gif" alt="Numerical simulation of a flexible raft and its asymmetric wake" title="Flexible Surferbot numerical simulation" caption="Numerical simulation: the flexible raft, the radiated wave field, and its asymmetric wake evolve together." %}

O cálculo precisa manter toda a conversa intacta. O modelo acoplado de viga–superfície livre resolve a deformação, o campo de ondas de saída e o empuxo médio em um único sistema. O posicionamento do motor altera quais modos de flexão são excitados; a rigidez flexional altera como esses modos alimentam as ondas. O empuxo resultante não é monotônico em relação a nenhuma das variáveis. Uma deformação estática ou apenas o posicionamento do motor não podem nos dizer para que lado a balsa irá.

Criei o fluxo de trabalho de análise reproduzível em Julia por trás desse cálculo: varreduras de parâmetros, redução modal, testes de paridade com MATLAB e geração de figuras a partir dos mesmos dados. Também tornei explícita a verificação de simetria. No benchmark de gravidade pura com simetria de reflexão — o benchmark simétrico — a força centralizada deve resultar em empuxo líquido zero; se não resultar, a discretização fabricou propulsão. Esse invariante não é transposto para casos com termos de borda capilares, onde a simetria de reflexão exata é fisicamente quebrada.

{% include figure.liquid path="assets/img/flexible-surferbot-thrust-map.png" alt="Signed normalized thrust across motor placement and flexural rigidity" title="Flexible Surferbot thrust map" caption="This design map shows signed normalized thrust across motor position x_M/L and normalized flexural rigidity κ. Red and blue regions are opposite directions of thrust, revealing where the direction changes; the symbols mark the published paper cases." %}

O mapa torna visível a consequência do design: pequenas mudanças no posicionamento do motor podem inverter a direção do deslocamento, e o mesmo atuador pode se comportar de forma diferente conforme a balsa endurece ou amolece. É uma bancada de testes compacta para um hábito de P&amp;D mais amplo — tratar o corpo, a força e o meio circundante como um único problema de design dinâmico, em vez de três botões independentes.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot' %}
</div>