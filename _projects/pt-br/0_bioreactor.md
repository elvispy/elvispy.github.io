---
page_id: prj_bioreactor
layout: page
title: Projeto multi-fidelidade para biorreatores de rolagem
description: Projeto acoplado de transferência de oxigênio e cisalhamento com CFD multi-fidelidade
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
---

Um biorreator de rolagem parece simples: move-se um saco para frente e para trás
e a cultura se mistura. A pergunta de engenharia útil é mais difícil. O mesmo
movimento de rolagem que renova a interface gás–líquido e melhora a transferência
de oxigênio também define o ambiente mecânico experimentado pela cultura. Mais
agitação, portanto, não é uma resposta completa. Um projeto deve equilibrar a
disponibilidade de oxigênio em relação ao cisalhamento, considerando o nível de
preenchimento e a frequência de rolagem antes que seja caro fabricar ou testar.

<figure>
  <video autoplay muted loop controls preload="metadata" style="width: 100%; display: block;">
    <source src="{{ '/assets/img/bioreactor-interface-hero.mp4' | relative_url }}" type="video/mp4">
    Seu navegador não suporta a tag de vídeo.
  </video>
  <figcaption class="caption">CFD numérico bifásico da superfície livre em rolagem. A fase gasosa azul e a fase líquida vermelha mostram a interface cuja deformação repetida controla o transporte e a carga mecânica.</figcaption>
</figure>

O modelo resolve essa interface em movimento, em vez de substituí-la por uma
aproximação de mistura homogênea. Utiliza <a href="https://basilisk.fr/">Basilisk</a>
hidrodinâmica de volume de fluido, acoplada ao transporte de oxigênio dissolvido
pela lei de Henry. A partir de cada condição simulada, o fluxo de trabalho extrai
as grandezas de processo que tornam o compromisso concreto: coeficiente de
transferência de massa volumétrico kLa, tempo de mistura e tensão de cisalhamento.
Essas saídas transformam um pedido vago ("misture melhor") em uma decisão de
projeto inspecionável: qual nível de preenchimento e frequência de rolagem
proporcionam transferência adequada sem simplesmente elevar todas as medidas
locais de tensão?

A CFD completa pode responder a essa pergunta, mas é demasiado custosa para
varrer todo o espaço operacional. O projeto, portanto, combina triagem de baixa
fidelidade e baixo custo com cálculos selecionados de alta fidelidade. Um
substituto multi-fidelidade KRR-LR-GPR transporta informação entre os dois,
enquanto o Expected Improvement seleciona a próxima condição a avaliar. O objetivo
não é fazer o simulador desaparecer atrás de uma caixa-preta; é gastar execuções
de alta fidelidade onde podem alterar a escolha de projeto e, em seguida, usar o
modelo mais barato para mapear o restante do espaço. Isso torna prático comparar
um conjunto mais amplo de níveis de preenchimento e programas de rolagem.

{% include figure.liquid loading="eager" path="assets/img/bioreactor-fill-sweep.png" alt="Varredura de nível de preenchimento e frequência de rolagem mostrando métricas de transferência de oxigênio, tempo de mistura e tensão de cisalhamento" title="Varredura de nível de preenchimento do biorreator" class="img-fluid rounded z-depth-1" caption="Varredura de nível de preenchimento em ângulo de rolagem fixo. Cada coluna varia a frequência de rolagem e cada linha varia o nível de preenchimento; os mapas mostram <em>k</em><sub>L</sub><em>a</em>, tempo de mistura e KPIs de tensão de cisalhamento. Lidos em conjunto, revelam onde um ganho de transporte acarreta um custo mecânico." %}

Minha contribuição foi a camada de decisão e reprodutibilidade do projeto em
torno do solver: um ambiente de testes de otimização bayesiana multi-fidelidade
de ponta a ponta, correções de validação de parâmetros, documentação implantada
via CI, pipeline de tutoriais e figuras, e registros de validação e experimentos.
Esse trabalho torna um resultado rastreável desde uma condição candidata,
através do fluxo de trabalho de simulação e substituto, até a evidência
plotada, sem reivindicar autoria exclusiva do método de CFD ou do estudo
publicado.

O estudo subjacente está publicado em <a href="https://doi.org/10.1016/j.ijmultiphaseflow.2025.105375"><em>International Journal of Multiphase Flow</em></a>. A <a href="https://rcsc-group.github.io/multi-fidelity-bioreactor/">documentação do projeto</a> e o <a href="https://github.com/rcsc-group/multi-fidelity-bioreactor">repositório aberto</a> incluem o modelo, estudos de caso e fluxo de trabalho reprodutível.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/multi-fidelity-bioreactor' %}
</div>