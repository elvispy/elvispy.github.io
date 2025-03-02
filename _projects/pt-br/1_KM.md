---
page_id: prj_km
layout: page
title: Simulação de Impactos Deformáveis
description: O método de correspondência cinemática
img: assets/img/km-sphere.gif
importance: 1
category: work
related_publications: true
---

Todos nós ficamos felizes em calcular a trajetória de um objeto em queda livre. Mas como realmente resolvemos o que acontece logo após isso, durante uma colisão inelástica? As interações envolvidas são altamente não lineares e, frequentemente, os objetos em colisão são livres para se deformar enquanto estão em contato.

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/km-sphere.gif" title="example image" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Exemplo de simulação de uma esfera sólida impactando uma membrana elástica.
    </figcaption>
</figure>

Este problema é relevante porque tem muitas aplicações, desde robôs macios, a dentes de engrenagem e até astrofísica. Em geral, você tem uma EDP sob e algumas restrições não lineares que representam o problema. O KM define uma nova restrição na superfície de contato, impondo que o ângulo de incidência entre os dois objetos seja suave. Tem a vantagem de introduzir uma ideia intuitiva (fácil de codificar = pode ser rapidamente implementada em configurações industriais), ao mesmo tempo que aumenta a precisão.
Esta estrutura é agnóstica à técnica utilizada para aproximar a EDP, pelo que pode ser implementada utilizando um esquema de diferenças finitas, ou elementos finitos, ou mesmo um método variacional.

Implementamos com sucesso o KM para o caso de uma esfera rígida impactando contra uma membrana elástica, e estamos atualmente a trabalhar noutros casos, nomeadamente uma gota deformável impactando diferentes superfícies - rígidas ou não.

Escrevemos um artigo (ver {% cite aguero2022impact %}) onde estudámos experimentalmente e numericamente o impacto deformável acoplado entre uma esfera sólida e uma membrana elástica.

O trabalho atual envolve a extensão desta estrutura para outros problemas. Atualmente, estamos a trabalhar no problema de uma gota de água deformável a impactar contra um banho de fluido. O nosso modelo é particularmente adequado para impactos de baixa velocidade, onde as simulações numéricas diretas podem tornar-se computacionalmente demasiado dispendiosas. Aqui estão três dos repositórios que temos para estes problemas:

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/kinematic-match-sphere' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-solidsubstrate-v3' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-onto-bath' %}  
</div>
