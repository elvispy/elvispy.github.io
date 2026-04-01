---
page_id: prj_bioreactor
layout: page
title: Acoplando Crescimento, Fluxo e Otimização em Sistemas Complexos
description: Integrando crescimento biológico e dinâmica de fluidos em vastos espaços de design
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
---

## Rumo a biorreatores preditivos para carne cultivada

Escalar a carne cultivada de uma prova de conceito em laboratório para um sistema alimentar é, em sua essência, um problema de engenharia. Bilhões de células animais devem crescer suspensas em um meio rico em nutrientes dentro de um reator que as mantém oxigenadas, bem misturadas e mecanicamente seguras — tudo ao mesmo tempo. O principal candidato para uma cultura suave e escalável é o **biorreator de balanço** (rocking bioreactor): uma bolsa flexível que se inclina ritmicamente, criando ondas que circulam o meio sem impulsores. O mesmo balanço que mistura os nutrientes pode, no entanto, romper as células se a frequência ou a amplitude estiverem erradas. Escolher esses parâmetros experimentalmente é proibitivamente lento e caro: cada teste consome instalações estéreis, semanas de tempo de cultura e meios de crescimento que custam mais do que a maioria dos orçamentos de pesquisa pode absorver em escala.

A simulação é a alternativa natural, mas nenhum framework existente acoplou totalmente o **crescimento biológico** com a **dinâmica de fluidos multifásica** no espaço de design que importa. Os modelos tradicionais tratam o meio de cultura como um fluido fixo e as células como rastreadores passivos. Na realidade, a proliferação celular altera a viscosidade do meio; o consumo de oxigênio cria gradientes espaciais que retroalimentam as taxas de crescimento; e a superfície livre se move em um referencial de balanço não inercial, tornando as abordagens convencionais de CFD impraticáveis. Resolver este problema significa trabalhar na interseção da mecânica de fluidos multifásica, fenômenos de transporte e biologia computacional simultaneamente.

### Nossa abordagem

Na Brown, estamos construindo o primeiro framework computacional de código aberto que integra **dinâmica celular baseada em agentes** dentro de um resolvedor multifásico de **volume de fluido (VOF)** para biorreatores de balanço. O método VOF rastreia a superfície livre deformada diretamente a partir de primeiros princípios, enquanto a camada de agentes resolve como as células individuais respondem às concentrações locais de oxigênio e às tensões de cisalhamento, e como seu crescimento modifica o fluxo global através de mudanças no arrasto e na viscosidade. Pense nisso como uma conversa de mão dupla entre a física do fluxo e a biologia das células — cada metade do modelo atualiza a outra a cada passo de tempo.

Como a simulação de alta fidelidade de cada configuração possível de reator é computacionalmente cara, incorporamos o resolvedor dentro de um **modelo substituto (surrogate model) baseado em dados** que aprende superfícies de resposta a partir de um conjunto direcionado de execuções completas. Combinado com a **otimização Bayesiana**, isso permite a exploração sistemática de milhares de combinações de design — geometria, frequência de balanço, amplitude, reologia do meio — a uma fração do custo de uma busca por força bruta. O resultado é uma ferramenta prática para identificar regimes hidrodinâmicos "seguros para células": condições onde as tensões de cisalhamento permanecem abaixo dos limiares de danos, enquanto a entrega de oxigênio permanece suficiente para o crescimento. Esses critérios foram definidos anteriormente apenas de forma empírica, um experimento caro por vez.

O mesmo framework se aplica além da carne cultivada: produção de vacinas, terapias celulares e fabricação de proteínas compartilham o mesmo desafio fundamental de manter células viáveis em um ambiente de fluido dinamicamente conduzido. Todo o código e conjuntos de dados são lançados abertamente para apoiar a validação e o reuso pela comunidade.

Para detalhes técnicos, veja [Kim, Harris & Cimpeanu (2025)](https://arxiv.org/abs/2504.05421) ou explore o repositório abaixo.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}
</div>