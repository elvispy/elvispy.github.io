---
layout: page
title: Julia em escala em clusters heterogêneos
description: Pré-compilação + entrega de artefatos via CVMFS para inícios rápidos e reproduzíveis
importance: 2
img: assets/img/CERNlogo.webp
category: work
---

## Software for Experiments (EP-SFT), CERN, sob orientação de Graeme Stewart

Participei do [CERN Summer Student Programme](https://home.cern/summer-student-programme) de 2024 para trabalhar na latência de inicialização e na reprodutibilidade de cargas de trabalho Julia em pipelines de física de altas energias (HEP).

Grandes pipelines de HEP lançam milhares de jobs curtos de Julia em nós heterogêneos. Cada inicialização a frio dispara compilação JIT e pré-compilação de pacotes do zero, desperdiçando tempo de CPU e causando latência de cauda imprevisível. Os sítios também exigem distribuição somente leitura, endereçada por conteúdo (CernVM-FS, servida via CVMFS), o que impede o uso de depósitos de pacotes graváveis.

O fluxo de trabalho compila, assina e publica imagens de sistema Julia pré-compiladas e artefatos de pacotes no CVMFS, e em seguida hidrata depósitos por nó sob demanda. A ferramenta principal, `DepotDelivery.jl`, orquestra o agrupamento de artefatos, a fixação de versões e o layout de cache. Os artefatos são endereçados por conteúdo (estáveis por hash), de modo que os nós buscam fluxos de bytes idênticos independentemente do sítio. Um pequeno conjunto de imagens de microarquitetura (por exemplo, baseline `x86-64`, `x86-64-v3`) cobre a diversidade de hardware da grade e é selecionado em tempo de execução. Em pilhas representativas de HEP (reconstrução de jatos, wrappers Geant4), a latência de inicialização a frio caiu em uma ordem de grandeza; os nós montam imagens pré-compiladas sem acesso de escrita e sem compilações locais.

Apresentei este trabalho no Julia for High-Energy Physics 2024 Workshop (JuliaHEP 2024).

<div style="float: left; margin: 10px;">
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7233730225589673984?compact=1"
      height="600" width="450" frameborder="0" allowfullscreen="" title="Embedded post">
  </iframe>
</div>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo.liquid repository='JuliaComputing/DepotDelivery.jl' %}
</div>