---
page_id: prj_cbpf
layout: page
title: Transporte de spin por medição e inferência
description: De ajustes de FMR baseados em LLG à deconvolução de iSHE e seleção de materiais
img: assets/img/spintronics.jpeg
importance: 2
category: work
giscus_comments: true
---

## Quantificando o transporte de spin em filmes finos

Um óxido nativo fino sobre permalóia (Py) aumenta as larguras de linha de FMR e desvia o **parâmetro de amortecimento de Gilbert** α para cima. O efeito é invisível a menos que as inclinações das larguras de linha sejam rastreadas em várias frequências e a química de superfície seja verificada por XPS. A extração do ângulo de spin Hall da camada adjacente de metal pesado via **efeito spin Hall inverso (iSHE)** é ainda mais complicada pela magnetorresistência anisotrópica (AMR) do ferromagneto. A AMR gera uma tensão na mesma condição de ressonância, e apenas a geometria não consegue separá-la do sinal de iSHE.

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/spintronics.jpeg" title="Bicamadas de filme fino para FMR/iSHE" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Filmes finos FM/NM usados para medições de FMR e iSHE.
    </figcaption>
</figure>

Medimos quatro sistemas de bicamadas (Py/Pt, Py/W, Py/Cu, Py/Ti) e, posteriormente, YIG/Pt e YIG/W. Para α, a detecção lock-in com modulação de campo extraiu perfis de linha derivada-Lorentziana, e a seleção da camada de cobertura guiada por XPS manteve a contribuição do óxido identificável. Para iSHE, Py/Ti serviu como referência de AMR: o titânio tem acoplamento spin-órbita desprezível, de modo que a tensão nessa pilha é uma linha de base limpa. Subtraindo-a de Py/Pt e Py/W, isolamos o componente simétrico de iSHE. A troca para YIG (um ferromagneto isolante sem corrente de carga na camada magnética) eliminou completamente a fuga, deixando perfis de linha de iSHE puramente Lorentzianos.

O acoplamento spin-órbita da platina foi o mais forte nas duas medidas simultaneamente: maior aumento de amortecimento e maior amplitude de iSHE, uma consistência que aponta para um efeito real de material e não para artefato. O tungstênio foi claramente o segundo; cobre e titânio foram efetivamente zero, consistente com seu fraco acoplamento spin-órbita. A inversão de sinal entre YIG/Pt e YIG/W concordou com o sinal previsto para o ângulo de spin Hall na teoria. Para manter o aparato de FMR funcionando durante varreduras noturnas, adicionamos um monitor IoT de baixo custo (ESP8266 + sensor de fluxo Hall) com alertas de e-mail automatizados; ele detectou pelo menos duas interrupções do líquido refrigerante antes que pudessem comprometer as medições.

**Métodos e dados:** [Relatório completo (PDF)](/assets/pdf/Spintronics__The_New_Electronics.pdf)
