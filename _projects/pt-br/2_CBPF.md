---
page_id: prj_cbpf
layout: page
title: Transporte de spin por medição e inferência
description: De ajustes FMR baseados em LLG até desconvolução iSHE e seleção de materiais
img: assets/img/spintronics.jpeg
importance: 2
category: work
giscus_comments: true
---

## Quantificando o transporte de spin em filmes finos

Cada transistor que comuta gera calor. Na escala nanométrica, esse calor já é um limite fundamental — e a questão de se a informação pode ser roteada através do spin em vez da carga é uma das apostas centrais na eletrônica moderna. A espintrônica funciona injetando e detectando **correntes de spin**, que carregam momento angular sem fluxo de carga líquida e prometem menor dissipação.

Este projeto mediu e inferiu propriedades de transporte de spin em bicamadas de filmes finos ferromagnéticos/metal normal (FM/NM), construindo um pipeline de ponta a ponta desde a fabricação da amostra até a desconvolução do sinal. As duas grandezas fundamentais são o **parâmetro de amortecimento de Gilbert** \( \alpha \), que governa a rapidez com que a precessão do spin decai, e a voltagem do **efeito Hall de spin inverso (iSHE)**, que converte a corrente de spin em um sinal elétrico mensurável.

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/spintronics.jpeg" title="Thin-film bilayers for FMR/iSHE" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Filmes finos FM/NM usados para medições de FMR e iSHE.
    </figcaption>
</figure>

### O que torna isso difícil

O desafio não é medir uma única grandeza — é desembaraçar vários efeitos que se sobrepõem na mesma frequência e campo experimental. A **magnetorresistência anisotrópica (AMR)** do ferromagneto produz um sinal na mesma condição de ressonância que o iSHE, e eles não podem ser separados geometricamente. Enquanto isso, estimativas de amortecimento a partir de larguras de linha FMR são sensíveis à oxidação da amostra: uma fina camada de óxido nativo na superfície do permalloy (Py) adiciona uma largura de linha extrínseca que mimetiza um \( \alpha \) maior.

Abordamos ambos os problemas experimentalmente. A detecção lock-in com modulação de campo resolveu as formas de linha derivada de Lorentz necessárias para extrair \( \Delta H \) e \( H_{\mathrm{res}} \) em uma varredura de frequência. A inclinação da largura de linha em relação à frequência fornece \( \alpha \) diretamente via modelo LLG. Para o iSHE, usamos uma **subtração de pilha de referência**: Py/Ti (onde o Ti tem acoplamento spin-órbita insignificante) fornece a linha de base AMR pura, que subtraímos de Py/Pt e Py/W para isolar a componente simétrica do iSHE. Para sinais mais limpos, mudamos para **YIG/Pt** — um ferromagneto isolante — que elimina inteiramente o vazamento de AMR e produz formas de linha iSHE que são diretamente Lorentzianas.

### Resultados de materiais

Em todas as pilhas estudadas — Py/Pt, Py/W, Py/Cu, Py/Ti — o platina mostrou o acoplamento spin-órbita mais forte por ambas as métricas: maior aumento de amortecimento e maior amplitude iSHE. O tungstênio ficou em segundo lugar. O cobre e o titânio foram fracos, consistente com seu baixo número atômico. **YIG/Pt** confirmou o resultado da platina sob condições mais limpas, e a reversão de sinal entre YIG/Pt e YIG/W correspondeu às expectativas teóricas para o ângulo Hall de spin. A oxidação nas pilhas baseadas em Py, diagnosticada via XPS e controlada através da escolha da camada de cobertura, foi identificada como o principal fator de confusão para estimativas de amortecimento: uma estratégia prática de correção — controle da camada de cobertura combinado com verificação por XPS — mantém as estimativas de \( \alpha \) confiáveis.

### Um modelo geral para inferência ruidosa

O que tornou este projeto mais do que um levantamento de materiais foi a disciplina de separar o que o modelo pode identificar do que o experimento pode medir. Partindo do LLG, escolhemos um observável experimental (inclinação da largura de linha) que codifica \( \alpha \) de forma limpa e construímos um procedimento de ajuste com separação explícita de variáveis de incômodo. O próprio setup do laboratório foi tratado como um sistema de dados: construímos um monitor IoT de baixo custo (ESP8266 + sensor de fluxo Hall) para proteger o tempo de atividade do FMR com alertas automáticos por e-mail. Essa mesma lógica — modelo governante, parâmetros identificáveis, controles ortogonais — é o que distingue a inferência acionável da coleta de dados.

**Métodos e dados:** [Relatório completo (PDF)](/assets/pdf/Spintronics__The_New_Electronics.pdf)