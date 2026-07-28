---
layout: page
title: Julia em escala em clusters heterogêneos
description: Pré-compilação + entrega de artefatos CVMFS para inícios rápidos e reproduzíveis
importance: 2
img: assets/img/CERNlogo.webp
category: work
---

## Software para Experimentos (EP-SFT), CERN, orientado por Graeme Stewart

Entrei no [Programa de Estudantes de Verão do CERN](https://home.cern/summer-student-programme) de 2024 para trabalhar na latência de inicialização e reprodutibilidade para cargas de trabalho Julia em fluxos de física de altas energias (HEP).

Grandes fluxos de HEP lançam milhares de pequenos jobs Julia em nós heterogêneos. Cada início a frio dispara compilação JIT e pré-compilação de pacotes do zero, desperdiçando tempo de CPU e causando latência de cauda imprevisível. Os locais também exigem distribuição somente leitura e endereçada por conteúdo (CernVM-FS), o que descarta depósitos de pacotes graváveis.

Construímos um fluxo de trabalho que compila, assina e publica imagens do sistema Julia pré-compiladas e artefatos de pacotes no CVMFS, hidratando os depósitos por nó sob demanda. A ferramenta principal, `DepotDelivery.jl`, orquestra o empacotamento de artefatos, fixação de versão e layout de cache. Os artefatos são endereçados por conteúdo (estáveis por hash), de modo que os nós buscam fluxos de bytes idênticos, independentemente do local. Um pequeno conjunto de imagens de microarquitetura (ex: base `x86-64`, `x86-64-v3`) cobre a diversidade de hardware da grade e são selecionadas em tempo de execução. Em pilhas de HEP representativas (reconstrução de jato, wrappers Geant4), a latência de início a frio caiu uma ordem de grandeza; os nós montam imagens pré-compiladas sem acesso de escrita e sem compilações locais.

Apresentei este trabalho no Workshop Julia para Física de Altas Energias 2024 (JuliaHEP 2024).

<div style="float: left; margin: 10px;">
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7233730225589673984?compact=1"
      height="600" width="450" frameborder="0" allowfullscreen="" title="Embedded post">
  </iframe>
</div>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo.liquid repository='JuliaComputing/DepotDelivery.jl' %}
</div>