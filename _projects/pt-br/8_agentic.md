---
page_id: prj_agentic
layout: page
title: a3dasm: loops científicos para engenharia de agentes
description: Um fluxo de trabalho aberto e orientado por evidências para agentes resolverem problemas de engenharia baseados em dados
img: assets/img/agentic-metamaterial.gif
importance: 1
category: work
---

## De um grafo de agentes a um loop científico

O a3dasm transforma um grafo de agentes em um loop de pesquisa aberto. Os agentes podem
seguir as evidências, mudar de estratégia e decidir quais dados produzir em seguida.
O loop é guiado pelo método científico: declarar um mecanismo, escolher um
experimento que possa testá-lo, reter a evidência e permitir que a crítica altere a
afirmação.

Cada estudo começa com um problema de engenharia baseado em dados e um oráculo físico executável. O fluxo de trabalho registra hipóteses, orçamentos de simulação,
diagnósticos, revisão crítica e scripts de replicação junto com o resultado.
Isso torna as decisões científicas de um agente inspecionáveis e fornece à próxima execução
as evidências necessárias para melhorar a anterior.

<div class="row align-items-center">
  <div class="col-md-5">
    {% include figure.liquid path="assets/img/agentic-metamaterial.gif" alt="Animated finite-element simulation of a rocking-mast metamaterial coiling under compression" title="Rocking-mast benchmark simulation" class="img-fluid rounded z-depth-1" %}
    <p class="caption">Um metamaterial de mastro oscilante enrolando-se sob compressão axial no estudo de material supercompressível.</p>
  </div>
  <div class="col-md-7">
    <h2>Um estudo de caso, um avanço de mais de cinco vezes</h2>
    <p>O estudo de material supercompressível solicita aos agentes que projetem uma estrutura imprimível que se enrole sob compressão enquanto suporta carga. O fluxo de trabalho encontrou um design que melhora a referência de supercompressível de última geração em mais de cinco vezes. Ele fez isso transformando um oráculo de elementos finitos caro em uma sequência de hipóteses, avaliações e decisões de projeto.</p>
  </div>
</div>

## Um banco de testes para engenharia baseada em dados

O mesmo loop pode funcionar em diferentes escalas e disciplinas de engenharia. Os
estudos atuais incluem biorreatores de bolsa oscilante, onde o movimento e a geometria devem melhorar
a transferência de oxigênio sem danificar as células; locomoção interfacial, onde um corpo flutuante
e seu campo de ondas devem ser projetados em conjunto; identificação inversa de material
a partir de dados de tensão-deformação multiaxiais; e metamateriais supercompressíveis.

Cada estudo possui um oráculo executável, um orçamento de avaliação limitado, objetivos ou restrições concorrentes e uma afirmação científica que pode ser testada.

## Pesquisa que se acumula

Cada execução deixa um registro de pesquisa utilizável: a hipótese, os dados que
ela gerou, o livro de registros da simulação, o veredito do crítico e o script necessário
para reproduzir o resultado. Direções que falharam permanecem como parte desse registro. O
resultado é um trabalho de engenharia cumulativo que outro pesquisador pode inspecionar,
reproduzir e estender.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='bessagroup/f3dasm-agentic-benchmarks' %}
</div>
