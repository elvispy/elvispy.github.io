---
layout: page
title: Julia em escala em clusters heterogêneos
description: Pré-compilação + entrega de artefatos CVMFS para inicializações rápidas e reproduzíveis
importance: 2
img: assets/img/CERNlogo.webp
category: work
---

## Software para Experimentos (EP-SFT), CERN — supervisionado por Graeme Stewart

Participei do [Programa de Estudantes de Verão do CERN](https://home.cern/summer-student-programme) de 2024 para trabalhar na **latência de inicialização e reprodutibilidade** para cargas de trabalho Julia usadas por experimentos HEP.

### O problema
Grandes pipelines HEP lançam milhares de trabalhos Julia curtos em nós heterogêneos. Inicializações frias disparam o trabalho de **JIT + pré-compilação** em cada nó, desperdiçando tempo de CPU e causando latência na cauda. Os sites também preferem distribuição **somente leitura, endereçada por conteúdo** (CernVM-FS), o que complica os depósitos de pacotes graváveis.

### A abordagem
Construímos um fluxo de trabalho que **constrói, assina e publica imagens de sistema Julia pré-compiladas e artefatos de pacotes** para CVMFS, então **hidrata os depósitos por nó** sob demanda:

- **DepotDelivery.jl** orquestra o empacotamento de artefatos, o pinagem de versão e o layout do cache.
- Os artefatos são **endereçados por conteúdo** (hash-estável), então os nós buscam fluxos de bytes idênticos.
- Suportamos **múltiplas microarquiteturas** produzindo um pequeno conjunto de imagens (por exemplo, `x86-64` de linha de base, `x86-64-v3`), selecionadas em tempo de execução.
- Execuções A/B validaram que a **mesma imagem** produz o **mesmo cache de método** e gráfico de módulo localmente e no cluster.

### O que ele possibilita
- **Cortes de ordem de magnitude** na latência de inicialização fria em pilhas HEP representativas (por exemplo, reconstrução de jato, wrappers Geant4).
- **Inicializações determinísticas**: artefatos idênticos em todos os sites via CVMFS.
- **Zero construções por nó**: os nós montam e usam imagens pré-compiladas; nenhum acesso de gravação é necessário.
- **Compatível com políticas**: distribuição somente leitura, integridade de conteúdo e rollbacks via hashes.

### Escopo e portabilidade
O método **não é específico para HEP**. Qualquer site com hardware heterogêneo e armazenamento quase sempre de leitura pode adotar o padrão:
1) construir imagens em um ambiente CI controlado,
2) publicar em um armazenamento imutável e endereçado por conteúdo,
3) selecionar a imagem de micro-arquitetura mais próxima no lançamento.

Apresentei este trabalho no **Julia for High-Energy Physics 2024 Workshop** (JuliaHEP 2024).

**Projeto:** [DepotDelivery.jl](https://github.com/JuliaComputing/DepotDelivery.jl)

<div style="float: left; margin: 10px;">
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7233730225589673984?compact=1" 
      height="600" width="450" frameborder="0" allowfullscreen="" title="Embedded post">
  </iframe>
</div>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo.liquid repository='JuliaComputing/DepotDelivery.jl' %}
</div>
