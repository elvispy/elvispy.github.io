---
page_id: prj_surferbot
layout: page
title: Locomoção Interfacial
description: Permitindo que robôs de baixo custo naveguem na água.
img: assets/img/surferbot.gif
importance: 1
category: work
related_publications: true
---

# Cavalgando as Ondas: Como um Pequeno Vibrobot Desbloqueia Novas Fronteiras na Mecânica dos Fluidos

Imagine um robô do tamanho de um clipe de papel, deslizando pela superfície da água—não por meio de remos ou jatos, mas vibrando. Este é o SurferBot, uma máquina minimalista que aproveita o poder das ondas para se mover. O trabalho recente do nosso laboratório {% cite Rhee_2022 %}, introduziu este modo elegante de locomoção e explora como sistemas tão simples podem nos ensinar sobre propulsão, eficiência e a dinâmica oculta nas interfaces fluidas.

<div style="width: 100%; display: flex; justify-content: center;">
  <div style="position: relative; width: 80%; padding-bottom: 45%; height: 0; overflow: hidden;">
    <iframe 
      src="https://www.youtube.com/embed/PQF6yGAs-TA?autoplay=1&mute=1&si=0qH_j8Lccw4ljD_3" 
      title="YouTube video player"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin" 
      allowfullscreen>
    </iframe>
  </div>
</div>

---

## O Que É Locomoção Interfacial?

Na fronteira entre o ar e a água, a tensão superficial e a dinâmica das ondas dominam. Criaturas como aranhas d'água e até abelhas presas na água exploram essas forças para se mover. Inspirados por esses fenômenos naturais, pesquisadores desenvolveram o SurferBot—um pequeno robô vibratório que se move gerando ondas assimétricas na superfície da água. Essas ondas empurram o robô para frente, atingindo velocidades de cerca de 1 cm/s, tudo sem métodos de propulsão tradicionais.

---

## A Física do Movimento Impulsionado por Ondas

O movimento do SurferBot surge de um desequilíbrio no momento da onda. Quando ele vibra, cria ondas que se irradiam para fora. Se essas ondas forem assimétricas—mais fortes em uma direção—elas exercem uma força resultante, impulsionando o robô para frente. Este mecanismo é semelhante a como uma abelha, batendo suas asas enquanto está presa na água, pode gerar movimento através de interações de ondas.

Para entender isso, modelamos o SurferBot como um corpo flutuante passando por pequenas oscilações. Ao acoplar seu movimento a um modelo de fluxo quase potencial do fluido circundante, derivamos expressões para sua velocidade de deriva e empuxo. Nosso modelo se alinha com as observações experimentais, confirmando que a radiação de ondas assimétricas é fundamental para a propulsão.

---

## Otimizando o Desempenho

A eficiência na propulsão impulsionada por ondas depende de fatores como a frequência de vibração e a localização do motor vibratório. Nossa análise revelou que existe uma frequência ideal e uma posição do motor que maximizam a eficiência da propulsão. Para o SurferBot, uma frequência ideal de cerca de 16 Hz e um posicionamento do motor ligeiramente atrás do centro produziram o melhor desempenho. Essas descobertas aguardam validação experimental, mas oferecem um roteiro para projetar robôs interfaciais mais eficientes.

---

## Implicações Mais Amplas

Entender a propulsão impulsionada por ondas tem aplicações além de pequenos robôs. Pode informar o projeto de embarcações energeticamente eficientes, oferecer insights sobre a locomoção biológica em interfaces fluidas e inspirar ferramentas educacionais em física e engenharia. A simplicidade do SurferBot o torna um excelente modelo para explorar a complexa dinâmica dos fluidos de uma forma tangível.

---

## Saiba Mais

Para um mergulho mais profundo na teoria e matemática por trás da propulsão impulsionada por ondas, confira o artigo {% cite Benham_Devauchelle_Thomson_2024 %} [On wave-driven propulsion](https://www.cambridge.org/core/journals/journal-of-fluid-mechanics/article/on-wavedriven-propulsion/4A97169309E4F72418EFFFB7C843E7FD).
