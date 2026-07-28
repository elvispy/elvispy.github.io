---
page_id: prj_bioreactor
layout: page
title: Fusão Bayesiana para Escalonamento de Biorreatores
description: Incerteza atribuída por campo para predição de crescimento multifísico
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
math: true
---

O primeiro produto de carne cultivada de prova de conceito custou $325.000 em 2013. Após uma década de investimento, os preços permanecem bem acima da viabilidade comercial. Cada experimento que acopla uma nova linhagem celular a uma nova configuração de reator exige um compromisso multimilionário e, a esse custo, o espaço de design do biorreator mal foi explorado.

O obstáculo não é a falta de modelos: é a falta de modelos que saibam o que não sabem. Uma célula passando por uma zona de alto cisalhamento e depois entrando em uma região pobre em oxigênio acumula um histórico de exposição que molda se ela cresce, se estressa ou morre. Modelos bem misturados fazem a média desse histórico. Modelos substitutos treinados em experimentos esparsos extrapolam com confiança para regimes que nunca viram. O resultado é um modelo que está errado de formas invisíveis até que algo falhe.

<figure style="float: right; margin: 10px; max-width: 340px;">
    {% include figure.liquid loading="eager" path="assets/img/bioreactor.gif" title="Bioreactor simulation" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Trajetórias de partículas simuladas dentro de um biorreator de tanque agitado.
    </figcaption>
</figure>

O crescimento depende simultaneamente da mecânica de fluidos, da química do meio e do contexto biológico. Quando uma predição falha, saber a incerteza total não é suficiente: o engenheiro precisa saber qual campo é a fonte. Se o campo mecânico estiver subamostrado, o próximo passo correto é uma simulação de CFD custando milhares de horas-núcleo. Se o modelo biológico for o elo fraco, o próximo passo correto é um ensaio de cultura celular custando meses de trabalho. Sem atribuição em nível de campo, uma predição falha envia os engenheiros de volta à bancada para responder à pergunta errada.

Estendemos a estrutura de treinamento cooperativo de Yi & Bessa, que separa a incerteza aleatória da epistêmica em regressão de campo único, para este cenário multicampo. Mecânica e biologia são codificadas separadamente; um mapa de fusão aprendido é então treinado para que a divergência entre os dois codificadores seja registrada como um sinal distinguível, em vez de se dissolver em um termo de variância indiferenciado. Concretamente, o conflito é a variância posterior da média preditiva fundida:

$$u_\text{epi}(x_\text{mech}, x_\text{bio}) \approx \operatorname{Var}_{p(\eta \mid \mathcal{D})}\!\bigl[\mu_\eta(x_\text{mech}, x_\text{bio})\bigr]$$

Uma linha de base de campo único não pode computar essa quantidade: ela não tem como distinguir se uma predição é incerta porque um campo está subamostrado ou porque dois campos genuinamente conflitam.

Como primeira validação, aplicamos a arquitetura a uma tarefa de regressão controlada: dados resumos de janela fixa do histórico de exposição hidrodinâmica de uma população de células e variáveis de estado do processo, prever o desvio da taxa de crescimento de biomassa em relação a um regime de operação bem caracterizado. Este cenário controlado torna possível isolar se o termo epistêmico aumenta onde a cobertura conjunta é esparsa e se ele atribui corretamente o conflito de fonte antes que a arquitetura enfrente a implantação em escala piloto. O objetivo: um modelo que comprima cinquenta ensaios experimentais em dez, dizendo aos engenheiros quais ensaios são necessários.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}
</div>