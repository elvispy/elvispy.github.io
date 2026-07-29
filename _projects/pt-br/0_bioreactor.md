---
page_id: prj_bioreactor
layout: page
title: Design de multi-fidelidade para biorreatores de balanço
description: Design acoplado de transferência de oxigênio e cisalhamento com CFD de multi-fidelidade
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
---

Um biorreator de balanço (rocking bioreactor) parece simples: mova uma bolsa para frente e para trás e a cultura se mistura. A questão de engenharia útil é mais difícil. O mesmo movimento de balanço que renova a interface gás-líquido e melhora a transferência de oxigênio também define o ambiente mecânico experimentado pela cultura. Mais agitação, portanto, não é uma resposta completa. Um projeto deve equilibrar a disponibilidade de oxigênio contra o cisalhamento, enquanto leva em conta o nível de preenchimento e a frequência de balanço antes que seja caro fabricar ou testar.

<figure>
  <video autoplay muted loop controls preload="metadata" style="width: 100%; display: block;">
    <source src="{{ '/assets/img/bioreactor-interface-hero.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption class="caption">CFD numérico bifásico da superfície livre em balanço. A fase gasosa azul e a fase líquida vermelha mostram a interface cuja deformação repetida controla o transporte e o carregamento mecânico.</figcaption>
</figure>

O modelo resolve essa interface móvel em vez de substituí-la por uma aproximação bem misturada. Ele utiliza a hidrodinâmica de volume de fluido do <a href="https://basilisk.fr/">Basilisk</a>, acoplada ao transporte de oxigênio dissolvido através da lei de Henry. De cada condição simulada, o fluxo de trabalho extrai as quantidades de processo que tornam o trade-off concreto: coeficiente de transferência de massa volumétrico kLa, tempo de mistura e tensão de cisalhamento.
Esses resultados transformam uma solicitação vaga — "misture melhor" — em uma decisão de design inspecionável: qual nível de preenchimento e frequência de balanço fornecem transferência adequada sem simplesmente elevar todas as medidas de tensão local?

O CFD completo é rico o suficiente para responder a essa pergunta, mas caro demais para cobrir todo o espaço operacional. O projeto, portanto, combina uma triagem de baixa fidelidade de baixo custo com cálculos de alta fidelidade selecionados. Um substituto (surrogate) de multi-fidelidade KRR-LR-GPR carrega informações entre os dois, enquanto o "Expected Improvement" seleciona a próxima condição a ser avaliada. O objetivo não é fazer o simulador desaparecer atrás de uma caixa preta; é gastar execuções de alta fidelidade onde elas podem mudar a escolha de design, e então usar o modelo mais barato para mapear o restante do espaço. Isso torna prático comparar um conjunto mais amplo de níveis de preenchimento e cronogramas de balanço.

{% include figure.liquid loading="eager" path="assets/img/bioreactor-fill-sweep.png" alt="Fill-level and rocking-frequency sweep showing oxygen-transfer, mixing-time, and shear-stress metrics" title="Bioreactor fill-level sweep" class="img-fluid rounded z-depth-1" caption="A fill-level sweep at fixed rocking angle. Each column varies rocking frequency and each row varies fill level; the maps show <em>k</em><sub>L</sub><em>a</em>, mixing time, and shear-stress KPIs. Reading them together exposes where a transfer gain carries a mechanical penalty." %}

Minha contribuição foi a camada de decisão e reprodutibilidade do projeto em torno do solver: um ambiente de testes de otimização Bayesiana de multi-fidelidade de ponta a ponta, correções de validação de parâmetros, documentação implantada por CI, tutoriais e pipeline de figuras, e registros de validação e experimentos. Esse trabalho torna um resultado rastreável desde uma condição candidata, passando pelo fluxo de trabalho de simulação e substituto, até a evidência plotada, sem reivindicar autoria exclusiva do método de CFD ou do estudo publicado.

O estudo subjacente foi publicado no <a href="https://doi.org/10.1016/j.ijmultiphaseflow.2025.105375"><em>International Journal of Multiphase Flow</em></a>. A <a href="https://rcsc-group.github.io/multi-fidelity-bioreactor/">documentação do projeto</a> e o <a href="https://github.com/rcsc-group/multi-fidelity-bioreactor">repositório aberto</a> incluem o modelo, estudos de caso e o fluxo de trabalho reprodutível.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/multi-fidelity-bioreactor' %}
</div>