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

Células em um grande biorreator não ficam paradas — elas circulam, e para onde vão determina o que experimentam. Uma célula passando por uma zona de alto cisalhamento e depois derivando para uma região com pouco oxigênio acumulou um histórico de exposição que molda se ela cresce, sofre estresse ou morre. Modelos bem misturados fazem uma média desse histórico e apagam a variação no histórico de exposição que prediz se uma célula cresce ou falha.

Prever o crescimento ao nível populacional a partir desses históricos requer a fusão de duas entradas qualitativamente diferentes: históricos de exposição hidrodinâmica e variáveis de estado do processo, como densidade do inóculo, oxigênio dissolvido e pH da cultura. Experimentos são caros, a maioria dos regimes operacionais é esparsamente observada e o espaço de entrada conjunto sobre ambos os campos é grande — o que significa que um modelo que produz uma previsão confiante em um regime bem amostrado e uma igualmente confiante em um regime que nunca viu não é útil. Ele está errado de maneiras que são invisíveis até que algo falhe.

Estendemos o framework de treinamento cooperativo de Yi & Bessa — que desmembra a incerteza aleatória e epistêmica em regressão de campo único — para o cenário de múltiplos campos, e construímos uma **arquitetura de fusão Bayesiana cooperativa** com codificadores específicos de campo para mecânica e biologia e um mapa de fusão aprendido, treinado para que a incerteza epistêmica aumente apenas onde a cobertura conjunta é esparsa e registre o desacordo entre os campos como um sinal distinguível — medido pontualmente como a variância posterior da média preditiva fundida — em vez de calculá-la como uma média em um termo de variância indiferenciado. Esse sinal de conflito é a entrega principal que a linha de base de campo único não fornece: quando os codificadores hidrodinâmico e biológico dão sinais localmente divergentes, o modelo os sinaliza em vez de mascará-los.

O primeiro teste é um problema de regressão: dados resumos de janela fixa do histórico de exposição hidrodinâmica de uma população celular e variáveis de estado do processo, prever o desvio da taxa de crescimento da biomassa em relação a um regime operacional bem suportado. A tarefa é pequena o suficiente para validar cuidadosamente os diagnósticos de incerteza — o termo epistêmico aumenta onde a cobertura conjunta é esparsa? ele registra conflito de origem em vez de escondê-lo? — enquanto mantém a estrutura de dois campos que as abordagens de fusão determinística não conseguem preservar sem colapsar em previsões pontuais excessivamente confiantes em regiões esparsas. A arquitetura visa o caso de dois campos; se a fusão Bayesiana cooperativa permanece bem calibrada à medida que os campos de origem se multiplicam, e se cabeças preditivas Gaussianas se mantêm ou se alternativas baseadas em mistura e fluxo se tornam necessárias.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}
</div>