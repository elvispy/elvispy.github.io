---
page_id: prj_bioreactor
layout: page
title: Acoplamento de Crescimento, Fluxo e Otimização em Sistemas Complexos
description: Integrando crescimento biológico e dinâmica de fluidos em vastos espaços de design
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
math: true
---

Células em um grande biorreator não ficam paradas: elas circulam, e para onde vão determina o que experimentam. Uma célula passando por uma zona de alto cisalhamento e depois derivando para uma região com pouco oxigênio acumulou um histórico de exposição que molda se ela cresce, sofre estresse ou morre. Modelos bem misturados fazem a média sobre esse histórico e apagam a variância no histórico de exposição que prevê se uma célula cresce ou falha.

<figure style="float: right; margin: 10px; max-width: 340px;">
    {% include figure.liquid loading="eager" path="assets/img/bioreactor.gif" title="Bioreactor simulation" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Trajetórias de partículas simuladas dentro de um biorreator de tanque agitado.
    </figcaption>
</figure>

Prever o crescimento em nível populacional a partir dessas trajetórias requer a fusão de duas entradas qualitativamente diferentes: históricos de exposição hidrodinâmica e variáveis de estado do processo, como densidade do inóculo, oxigênio dissolvido e pH da cultura. Experimentos são caros, a maioria dos regimes operacionais é pouco observada e o espaço de entrada conjunto sobre ambos os campos é grande. Um modelo que produz uma previsão confiante em um regime bem amostrado e outra igualmente confiante em um regime que nunca viu não é útil. Ele está errado de formas que são invisíveis até que algo falhe.

Expandimos o framework de treinamento cooperativo de Yi & Bessa, que desembaraça a incerteza aleatória e epistêmica na regressão de campo único, para a configuração de múltiplos campos, e construímos uma **arquitetura de fusão Bayesiana cooperativa** com codificadores específicos de campo para mecânica e biologia e um mapa de fusão aprendido, treinado para que a incerteza epistêmica aumente apenas onde a cobertura conjunta é esparsa e registre a discordância entre os campos como um sinal distinguível, em vez de dobrá-la em um termo de variância indiferenciado. Concretamente, o conflito é a variância posterior da média preditiva fundida:

$$u_\text{epi}(x_\text{mech}, x_\text{bio}) \approx \operatorname{Var}_{p(\eta \mid \mathcal{D})}\!\bigl[\mu_\eta(x_\text{mech}, x_\text{bio})\bigr]$$

Esse sinal de conflito é a entrega principal que a linha de base de campo único não fornece: quando os codificadores hidrodinâmicos e biológicos dão sinais localmente divergentes, o modelo sinaliza em vez de mascarar.

O primeiro teste é um problema de regressão: dados resumos de janela fixa do histórico de exposição hidrodinâmica de uma população de células e variáveis de estado do processo, prever o desvio da taxa de crescimento da biomassa em relação a um regime operacional bem suportado. A tarefa é pequena o suficiente para validar cuidadosamente os diagnósticos de incerteza: o termo epistêmico aumenta onde a cobertura conjunta é esparsa? Ele registra o conflito de origem em vez de escondê-lo? Esses são os diagnósticos que a arquitetura deve passar, mantendo a estrutura de dois campos que as abordagens de fusão determinística não conseguem preservar sem colapsar em previsões pontuais excessivamente confiantes em regiões esparsas. A arquitetura visa o caso de dois campos; se a fusão Bayesiana cooperativa permanece bem calibrada à medida que os campos de origem se multiplicam, e se as cabeças preditivas Gaussianas se mantêm ou se alternativas baseadas em misturas e fluxos tornam-se necessárias.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}
</div>