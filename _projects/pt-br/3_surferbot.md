---
page_id: prj_surferbot
layout: page
title: Viabilizando a locomoção interfacial
description: Propulsão impulsionada por ondas através de uma balsa flexível
img: assets/img/surferbot.gif
importance: 1
category: work
related_publications: true
math: true
---

## Uma vibração pode escolher uma direção

Uma balsa compacta não possui hélice, nem barbatana, nem propulsão constante. No entanto, ao afastar seu motor vibratório do centro, as ondas que ela irradia não saem mais igualmente em ambas as direções. O rastro torna-se assimétrico; esse fluxo de momento assimétrico confere à balsa uma direção de deslocamento. A parte surpreendente é que uma vibração de média zero pode produzir um empuxo médio diferente de zero — não escondendo um ciclo de curso, mas alterando a forma como um corpo deformável lança ondas na superfície.

Esse é um problema útil sempre que a atuação e a estrutura são inseparáveis: um mecanismo pode parecer simétrico em um modelo CAD, enquanto sua dinâmica seleciona uma direção. A questão não é simplesmente se a balsa se dobra ou onde o motor está posicionado. É como essas escolhas remodelam as ondas que transportam o momento para longe.

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
<p class="caption"><strong>Demonstração publicada do SurferBot.</strong> Uma demonstração física do mecanismo; não se trata de um resultado numérico deste repositório.</p>

{% include figure.liquid path="assets/img/flexible-surferbot-simulation.gif" alt="Simulação numérica de uma balsa flexível e seu rastro assimétrico" title="Simulação numérica do Surferbot flexível" caption="Simulação numérica: a balsa flexível, o campo de ondas irradiado e seu rastro assimétrico evoluem juntos." %}

O cálculo precisa manter toda a "conversa" intacta. O modelo acoplado de viga e superfície livre resolve a deformação, o campo de ondas de saída e o empuxo médio em um único sistema. O posicionamento do motor altera quais modos de flexão são excitados; a rigidez flexural altera como esses modos alimentam as ondas. O empuxo resultante não é monotônico em nenhuma das variáveis. Uma deformação estática ou o posicionamento do motor sozinhos não podem nos dizer para que lado a balsa irá.

Criei o fluxo de trabalho de análise reproduzível em Julia por trás desse cálculo: varreduras de parâmetros, redução modal, testes de paridade com MATLAB e geração de figuras a partir dos mesmos dados. Também tornei explícita a verificação de simetria. No benchmark de gravidade pura com simetria de reflexão — o benchmark simétrico — o forçamento centralizado deve resultar em empuxo líquido zero; caso contrário, a discretização terá fabricado propulsão artificial. Esse invariante não se aplica a casos com termos de borda capilares, onde a simetria de reflexão exata é fisicamente quebrada.

{% include figure.liquid path="assets/img/flexible-surferbot-thrust-map.png" alt="Empuxo normalizado com sinal conforme posicionamento do motor e rigidez flexural" title="Mapa de empuxo do Surferbot flexível" caption="Este mapa de design mostra o empuxo normalizado com sinal em relação à posição do motor x_M/L e à rigidez flexural normalizada κ. As regiões vermelha e azul representam direções opostas de empuxo, revelando onde a direção muda; os símbolos marcam os casos do artigo publicado." %}

O mapa torna visível a consequência do design: pequenas mudanças no posicionamento do motor podem inverter a direção do deslocamento, e o mesmo atuador pode se comportar de forma diferente à medida que a balsa se torna mais rígida ou mais macia. É um banco de testes compacto para um hábito de P&amp;D mais amplo — tratar o corpo, o forçamento e o meio circundante como um único problema de design dinâmico, em vez de três botões independentes.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot' %}
</div>