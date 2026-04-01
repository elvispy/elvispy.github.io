---
layout: page
title: Julia em escala em clusters heterogêneos
description: Pré-compilação + entrega de artefatos CVMFS para inícios rápidos e reproduzíveis
importance: 2
img: assets/img/CERNlogo.webp
category: work
---

## Software para Experimentos (EP-SFT), CERN — supervisionado por Graeme Stewart

Juntei-me ao [CERN Summer Student Programme](https://home.cern/summer-student-programme) de 2024 para trabalhar na **latência de inicialização e reprodutibilidade** para cargas de trabalho Julia em pipelines de física de altas energias (HEP).

### O problema

Grandes pipelines de HEP lançam milhares de pequenos trabalhos Julia em nós heterogêneos. Cada início a frio (cold start) dispara a compilação JIT e a pré-compilação de pacotes do zero — desperdiçando tempo de CPU e causando latência de cauda imprevisível. Os sites também exigem distribuição **apenas de leitura, endereçada por conteúdo** (CernVM-FS), o que exclui depósitos de pacotes graváveis.

### A solução

Construímos um fluxo de trabalho que **constrói, assina e publica imagens de sistema Julia pré-compiladas e artefatos de pacotes** no CVMFS, hidratando então os depósitos por nó sob demanda. A ferramenta principal, **DepotDelivery.jl**, orquestra o empacotamento de artefatos, fixação de versões e layout de cache. Os artefatos são endereçados por conteúdo (hash estável), de modo que os nós buscam fluxos de bytes idênticos, independentemente do site. Um pequeno conjunto de imagens de microarquitetura (por exemplo, linha de base `x86-64`, `x86-64-v3`) cobre a diversidade de hardware da grade e é selecionado em tempo de execução.

O resultado: **cortes de ordens de magnitude na latência de início a frio** em pilhas representativas de HEP (reconstrução de jatos, wrappers Geant4), **inícios totalmente determinísticos** entre sites via CVMFS e zero construções por nó — os nós montam e usam imagens pré-compiladas sem necessidade de acesso de gravação. O método não é específico para HEP: qualquer site com hardware heterogêneo e armazenamento majoritariamente de leitura pode adotar o mesmo padrão.

Apresentei este trabalho no **Workshop Julia para Física de Altas Energias 2024** (JuliaHEP 2024).

<div style="float: left; margin: 10px;">
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7233730225589673984?compact=1"
      height="600" width="450" frameborder="0" allowfullscreen="" title="Embedded post">
  </iframe>
</div>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo.liquid repository='JuliaComputing/DepotDelivery.jl' %}
</div>