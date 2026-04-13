---
page_id: prj_surferbot
layout: page
title: Locomoção interfacial
description: Física diferenciável para robôs movidos por ondas
img: assets/img/surferbot.gif
importance: 1
category: work
related_publications: true
---

## Surfando na interface: física diferenciável para locomoção movida por ondas

Um pequeno robô sentado sobre a água pode se propelir para frente sem pás, barbatanas ou jatos — apenas vibrando. A vibração irradia ondas superficiais e, se essas ondas forem direcionalmente assimétricas, seu desequilíbrio de momento gera um empuxo líquido. O SurferBot {% cite Rhee_2022 %} demonstrou isso experimentalmente; nosso trabalho constrói um simulador onde cada escolha de design pode ser otimizada diretamente.

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

Em uma interface ar-água, a tensão superficial, ondas de gravidade e efeitos de massa adicional governam a dinâmica da interface. O desempenho depende de escolhas acopladas — formato do corpo, distribuição de massa, localização do motor, frequência de acionamento, forma de onda, propriedades do fluido — que são caras de explorar por experimento. Modelamos o robô como um corpo flutuante, possivelmente flexível, restrito à interface e acionado por um atuador variável no tempo, com o fluido circundante descrito por uma teoria de superfície livre de pequena amplitude que resolve a interface {% cite Benham_Devauchelle_Thomson_2024 %}. O simulador é diferenciável em relação a todos os parâmetros de design \(\theta\): as atualizações de estado usam solvers lineares e não lineares \(A(\theta)\,y=b(\theta)\) com regras personalizadas de modo reverso, de modo que \(\nabla_\theta \mathcal{L}\) segue de dois solvers lineares (direto e adjunto) por passo de tempo — memória limitada, gradientes estáveis em toda a trajetória.

Com esses gradientes, a otimização de multi-início explora geometrias de casco, posicionamentos de atuadores e formas de onda de acionamento; a otimização Bayesiana lida com a busca global sob restrições de orçamento de energia e manufaturabilidade.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot' %}
</div>