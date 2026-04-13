---
layout: page
title: Julia em escala em clusters heterogêneos
description: Pré-compilação + entrega de artefatos CVMFS para inícios rápidos e reprodutíveis
importance: 2
img: assets/img/CERNlogo.webp
category: work
---

## Software para Experimentos (EP-SFT), CERN — supervisionado por Graeme Stewart

Participei do [Programa de Estudantes de Verão do CERN](https://home.cern/summer-student-programme) de 2024 para trabalhar na latência de inicialização e reprodutibilidade para fluxos de trabalho Julia em pipelines de física de altas energias (HEP).

Grandes pipelines de HEP lançam milhares de pequenos jobs Julia em nós heterogêneos. Cada início a frio (cold start) aciona a compilação JIT e a pré-compilação de pacotes do zero — desperdiçando tempo de CPU e causando latência de cauda imprevisível. Os sites também exigem distribuição somente leitura endereçada por conteúdo (CernVM-FS), o que exclui depósitos de pacotes graváveis.

Construímos um fluxo de trabalho que compila, assina e publica imagens de sistema Julia pré-compiladas e artefatos de pacotes no CVMFS, hidratando então depósitos por nó sob demanda. A ferramenta principal, `DepotDelivery.jl`, orquestra o empacotamento de artefatos, fixação de versão e layout de cache. Os artefatos são endereçados por conteúdo (hash-estável), para que os nós busquem fluxos de bytes idênticos, independentemente do site. Um pequeno conjunto de imagens de microarquitetura (por exemplo, linha de base `x86-64`, `x86-64-v3`) cobre a diversidade de hardware do grid e é selecionado em tempo de execução. Em pilhas representativas de HEP (reconstrução de jato, wrappers Geant4), a latência do início a frio caiu em uma ordem de magnitude; os nós montam imagens pré-compiladas sem acesso de gravação e sem compilações locais.

Apresentei este trabalho no workshop Julia para Física de Altas Energias 2024 (JuliaHEP 2024).

<div style="float: left; margin: 10px;">
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7233730225589673984?compact=1"
      height="600" width="450" frameborder="0" allowfullscreen="" title="Post incorporado">
  </iframe>
</div>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo.liquid repository='JuliaComputing/DepotDelivery.jl' %}
</div>