---
page_id: prj_cbpf
layout: page
title: Transporte de spin por medição e inferência
description: De ajustes de FMR baseados em LLG a deconvolução de iSHE e seleção de materiais
img: assets/img/spintronics.jpeg
importance: 2
category: work
giscus_comments: true
---

## Quantificando o transporte de spin em filmes finos

Um óxido nativo fino em permalloy (Py) infla as larguras de linha de FMR e enviesa o **parâmetro de amortecimento de Gilbert** α para cima — invisível a menos que você rastreie a inclinação em muitas frequências e verifique a química da superfície por XPS. Extrair o ângulo Hall de spin da camada de metal pesado adjacente via o **efeito Hall de spin inverso (iSHE)** é ainda mais complicado pela magnetorresistência anisotrópica (AMR) do ferromagneto, que gera uma voltagem na mesma condição de ressonância que não pode ser separada do sinal iSHE apenas pela geometria.

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/spintronics.jpeg" title="Thin-film bilayers for FMR/iSHE" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Filmes finos FM/NM usados para medições de FMR e iSHE.
    </figcaption>
</figure>

Medimos quatro sistemas de bicamada — Py/Pt, Py/W, Py/Cu, Py/Ti — e posteriormente YIG/Pt e YIG/W. Para α, a detecção lock-in com modulação de campo extraiu formas de linha Lorentziana derivada, e a seleção da camada de cobertura guiada por XPS manteve a contribuição do óxido identificável. Para iSHE, o Py/Ti serviu como referência de AMR: o titânio tem acoplamento spin-órbita insignificante, então a voltagem nessa pilha é pura linha de base. Subtraí-la do Py/Pt e Py/W isola a componente simétrica do iSHE. Mudar para YIG — um ferromagneto isolante sem corrente de carga na camada magnética — removeu a fuga inteiramente, deixando formas de linha iSHE puramente Lorentzianas.

O acoplamento spin-órbita da platina foi o mais forte por ambas as medidas simultaneamente — maior aumento de amortecimento e maior amplitude iSHE — uma consistência que aponta para um efeito material real em vez de artefato. O tungstênio foi claramente o segundo; cobre e titânio foram efetivamente zero, consistente com seu fraco acoplamento spin-órbita. A reversão de sinal entre YIG/Pt e YIG/W confirmou a previsão teórica para o ângulo Hall de spin. Para manter o equipamento de FMR funcionando durante as varreduras noturnas, adicionamos um monitor IoT de baixo custo (ESP8266 + sensor de fluxo Hall) com alertas automáticos por e-mail — ele detectou pelo menos duas interrupções no líquido de arrefecimento antes que pudessem estragar as medições.

**Métodos e dados:** [Relatório completo (PDF)](/assets/pdf/Spintronics__The_New_Electronics.pdf)