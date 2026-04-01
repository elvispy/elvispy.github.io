---
page_id: prj_surferbot
layout: page
title: Locomoção interfacial
description: Física diferenciável para robôs movidos a ondas
img: assets/img/surferbot.gif
importance: 1
category: work
related_publications: true
---

## Navegando na interface: física diferenciável para locomoção movida a ondas

Um pequeno robô sentado na água pode se impulsionar para frente sem remos, nadadeiras ou jatos — apenas vibrando. A vibração irradia ondas superficiais e, se essas ondas forem **direcionalmente assimétricas**, seu desequilíbrio de momento gera um empuxo líquido. O SurferBot {% cite Rhee_2022 %} demonstrou isso experimentalmente; nosso trabalho transforma a ideia em um **laboratório computacional** onde cada escolha de design pode ser otimizada a partir de primeiros princípios.

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

## Modelo e simulação diferenciável

Em uma interface ar-água, **tensão superficial, ondas de gravidade e efeitos de massa adicional** dominam. Pequenos atuadores podem criar campos de ondas assimétricos que carregam momento e geram empuxo, mas o desempenho depende de muitas escolhas acopladas: formato do corpo, distribuição de massa, localização do motor, frequência de acionamento, forma de onda e parâmetros ambientais. Projetar tais sistemas por tentativa e erro é lento. Um simulador diferenciável nos permite otimizar essas escolhas diretamente, com **gradientes da física** em vez de heurísticas.

Modelamos o robô como um corpo flutuante, possivelmente flexível, restrito à interface e acionado por um atuador interno variável no tempo. O fluido circundante é representado por um **modelo de superfície livre de pequena amplitude que resolve a interface**, compatível com capilaridade e amortecimento viscoso nas escalas de interesse, seguindo a teoria desenvolvida em {% cite Benham_Devauchelle_Thomson_2024 %}. O pipeline é **diferenciável de ponta a ponta** em relação a todos os parâmetros de design \(\theta\): as atualizações de estado usam resoluções lineares e não lineares \(A(\theta)\,y=b(\theta)\) com regras personalizadas de modo reverso, de modo que \(\nabla_\theta \mathcal{L}\) é obtido por duas resoluções lineares (direta e adjunta) por passo de tempo, mantendo a memória limitada e os gradientes estáveis ao longo de toda a trajetória.

## Otimização e questões científicas

Com gradientes disponíveis, exploramos parâmetros de design (geometria do casco, distribuição de massa, posição do motor), parâmetros de controle (frequência de acionamento, coeficientes de forma de onda multi-harmônica) e condições ambientais (tensão superficial, viscosidade, profundidade). A **otimização de gradiente multi-início** localiza regiões de alto desempenho; modelos substitutos e **otimização Bayesiana** lidam com a busca global sob restrições como orçamentos de energia e geometrias fabricáveis.

As principais questões científicas são: como modos de onda específicos e relações de fase criam fluxo de momento direcional? Quais combinações de posicionamento do atuador e frequência de acionamento minimizam a radiação desperdiçada? Quais designs permanecem robustos frente a mudanças nas propriedades do fluido ou pequenas tolerâncias de fabricação? O mesmo framework diferenciável que responde a essas perguntas também suporta a **inferência de parâmetros** a partir de trajetórias experimentais e o **ajuste de controladores** em dispositivos reais, tornando direto o caminho da simulação ao hardware.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot_v2' %}
    {% include repository/repo.liquid repository='elvispy/surferbot-differentiable' %}
</div>