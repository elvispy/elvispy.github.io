---
layout: page
title: Fui um estagiário de verão no CERN!.
description:
importance: 2
category: work
---

## Trabalhei no grupo de software para experimentos (EP-SFT) sob a supervisão de Graeme Stewart no CERN.

Este ano, tive a sorte de ser selecionado para o [Programa de Estudantes de Verão do CERN](https://home.cern/summer-student-programme) para a coorte de 2024. Houve até alguma cobertura da mídia sobre minha experiência:

<div style="float: left; margin: 10px;">
    <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7233730225589673984?compact=1" 
        height="600" width="450" frameborder="0" allowfullscreen="" title="Embedded post">
    </iframe>
</div>
O programa de estudantes de verão é uma oportunidade de trabalhar em um projeto no maior Colisor de Hádrons do mundo. Fui designado para um projeto no grupo de software para experimentos do CERN, sob a supervisão de Graeme Stewart.

### Otimizando Julia para Aplicações de Física de Altas Energias

Julia emergiu como uma ferramenta poderosa para computação científica, combinando funcionalidade de alto nível com desempenho rivalizando com C/C++. No entanto, sua dependência de arquivos pré-compilados causa atrasos na inicialização, apresentando desafios para sistemas distribuídos. Para resolver isso, desenvolvemos um fluxo de trabalho que pré-compila e armazena em cache as dependências do Julia no sistema de arquivos compartilhado CernVM-FS (CVMFS), permitindo a distribuição perfeita entre os nós de computação.

Testando com os pacotes Julia Jet Reconstruction e Geant4 wrapper, alcançamos reduções no tempo de inicialização de até 97%. Nossa estrutura também suporta compilação cruzada para diversas microarquiteturas, garantindo desempenho eficiente sem degradação. Essa abordagem torna Julia mais acessível para física de altas energias e ambientes de computação distribuída.

Apresentei meu trabalho no [Workshop Julia for High Energy Physics 2024](https://indico.cern.ch/event/1410341/contributions/6135602/).

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='JuliaComputing/DepotDelivery.jl' %}

</div>
