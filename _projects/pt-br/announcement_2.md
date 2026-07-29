---
layout: page
title: Julia em escala em clusters heterogêneos
description: Pré-compilação + entrega de artefatos CVMFS para inicializações rápidas e reprodutíveis
importance: 2
img: assets/img/CERNlogo.webp
category: work
---

## Software para Experimentos (EP-SFT), CERN, supervisionado por Graeme Stewart

Participei do [CERN Summer Student Programme](https://home.cern/summer-student-programme) de 2024 para trabalhar na latência de inicialização e reprodutibilidade para fluxos de trabalho Julia em pipelines de física de altas energias (HEP).

Grandes pipelines de HEP lançam milhares de trabalhos curtos em Julia através de nós heterogêneos. Cada inicialização a frio ("cold start") dispara a compilação JIT e a pré-compilação de pacotes do zero, desperdiçando tempo de CPU e causando latência de cauda imprevisível. Os sites também exigem distribuição de conteúdo endereçável e somente leitura (CernVM-FS), o que exclui depósitos de pacotes graváveis.

Construímos um fluxo de trabalho que compila, assina e publica imagens de sistema Julia pré-compiladas e artefatos de pacotes no CVMFS, e então hidrata depósitos por nó sob demanda. A ferramenta principal, `DepotDelivery.jl`, orquestra o agrupamento de artefatos, o congelamento de versões e o layout do cache. Os artefatos são endereçados por conteúdo (hash-stable), de modo que os nós buscam fluxos de bytes idênticos independentemente do site. Um pequeno conjunto de imagens de microarquitetura (ex: linha de base `x86-64`, `x86-64-v3`) cobre a diversidade de hardware da rede e é selecionado em tempo de execução. Em pilhas representativas de HEP (reconstrução de jatos, wrappers Geant4), a latência de inicialização a frio caiu em uma ordem de magnitude; os nós montam imagens pré-compiladas sem acesso de gravação e sem compilações locais.

Apresentei este trabalho no workshop Julia for High-Energy Physics 2024 (JuliaHEP 2024).

<div style="float: left; margin: 10px;">
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7233730225589673984?compact=1"
      height="600" width="450" frameborder="0" allowfullscreen="" title="Embedded post">
  </iframe>
</div>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo.liquid repository='JuliaComputing/DepotDelivery.jl' %}
</div>