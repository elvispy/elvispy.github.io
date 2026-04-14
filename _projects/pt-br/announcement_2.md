---
layout: page
title: Julia em escala em clusters heterogêneos
description: Pré-compilação + entrega de artefatos CVMFS para inícios rápidos e reprodutíveis
importance: 2
img: assets/img/CERNlogo.webp
category: work
---

## Software for Experiments (EP-SFT), CERN, supervisionado por Graeme Stewart

Participei do [Programa de Estudantes de Verão do CERN de 2024](https://home.cern/summer-student-programme) para trabalhar na latência de inicialização e reprodutibilidade para cargas de trabalho Julia em pipelines de física de altas energias (HEP).

Grandes pipelines de HEP lançam milhares de pequenos trabalhos Julia em nós heterogêneos. Cada início a frio (cold start) aciona a compilação JIT e a pré-compilação de pacotes do zero, desperdiçando tempo de CPU e causando latência de cauda imprevisível. Os sites também exigem distribuição de conteúdo endereçável e somente leitura (CernVM-FS), o que exclui depósitos de pacotes graváveis.

Construímos um fluxo de trabalho que compila, assina e publica imagens de sistema Julia pré-compiladas e artefatos de pacotes no CVMFS, e então hidrata depósitos por nó sob demanda. A ferramenta principal, `DepotDelivery.jl`, orquestra o empacotamento de artefatos, o congelamento de versões e o layout do cache. Os artefatos são endereçáveis por conteúdo (hash-stable), de modo que os nós buscam fluxos de bytes idênticos, independentemente do site. Um pequeno conjunto de imagens de microarquitetura (por exemplo, linha de base `x86-64`, `x86-64-v3`) cobre a diversidade de hardware do grid e é selecionado em tempo de execução. Em pilhas de HEP representativas (reconstrução de jatos, wrappers Geant4), a latência de início a frio caiu em uma ordem de magnitude; os nós montam imagens pré-compiladas sem acesso de gravação e sem compilações locais.

Apresentei este trabalho no Workshop Julia for High-Energy Physics 2024 (JuliaHEP 2024).

<div style="float: left; margin: 10px;">
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7233730225589673984?compact=1"
      height="600" width="450" frameborder="0" allowfullscreen="" title="Embedded post">
  </iframe>
</div>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo.liquid repository='JuliaComputing/DepotDelivery.jl' %}
</div>