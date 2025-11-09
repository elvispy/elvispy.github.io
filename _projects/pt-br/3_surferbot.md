---
page_id: prj_surferbot
layout: page
title: Locomoção Interfacial
description: Física diferenciável para robôs movidos por ondas
img: assets/img/surferbot.gif
importance: 1
category: work
related_publications: true
---

# Cavalgando a interface: física diferenciável para locomoção movida por ondas

Um "vibrobot" vibratório pode surfar na água **moldando as ondas que cria**. Essa simples ideia abre um programa quantitativo: construir um modelo onde **ondas de superfície, movimento do corpo e atuação** coevoluem, e então tornar todo o pipeline **diferenciável** para que o design e o controle possam ser otimizados diretamente.

Nosso trabalho pega o conceito SurferBot {% cite Rhee_2022 %} e o transforma em um **laboratório computacional** para locomoção interfacial, fundamentado na teoria {% cite Benham_Devauchelle_Thomson_2024 %} e implementado em **Julia** com solvers diferenciáveis.

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

## Por que este problema é importante

Em uma interface ar-água, **tensão superficial, ondas de gravidade e efeitos de massa adicionada** dominam. Atuadores pequenos podem criar **campos de onda assimétricos** que carregam momento e geram impulso. Projetar tais sistemas por tentativa e erro é lento porque o desempenho depende de muitas escolhas acopladas: forma do corpo, distribuição de massa, **localização do motor**, **frequência e forma de onda da unidade** e parâmetros ambientais.

Um simulador diferenciável nos permite **otimizar** essas escolhas diretamente em relação a objetivos como velocidade média, impulso por potência ou rastreamento de trajetória, com **gradientes da física**, não heurísticas.

---

## Abordagem de modelagem

Modelamos o robô como um corpo flutuante, possivelmente flexível, restrito à interface e acionado por um atuador interno que varia no tempo. O fluido circundante é representado por um **modelo de superfície livre de pequena amplitude que resolve a interface**, compatível com capilaridade e amortecimento viscoso nas escalas de interesse. O acoplamento corpo-onda produz um desvio líquido quando as ondas irradiadas são **direcionalmente enviesadas** (como em {% cite Benham_Devauchelle_Thomson_2024 %}).

As principais saídas incluem velocidade média no tempo, impulso, potência hidrodinâmica e fluxo de momento da onda. Estes são computados a partir do estado e usados como **funções de perda** para design e controle.

---

## Simulação totalmente diferenciável em Julia

O pipeline é **diferenciável de ponta a ponta** em relação aos parâmetros \(\theta\) (geometria, posicionamento do atuador, frequência, coeficientes de forma de onda):

- A atualização do estado usa soluções lineares e não lineares \(A(\theta)\,y=b(\theta)\) com regras de modo reverso personalizadas para que \(\nabla_\theta \mathcal{L}\) seja obtido por **duas soluções lineares** (forward e adjoint) por etapa de tempo, mantendo a memória limitada e os gradientes estáveis.
- A cinemática das ondas e a dinâmica do corpo são codificadas para evitar interruptores não diferenciáveis; o contato com a interface é tratado por meio de restrições suaves consistentes com a teoria de pequena inclinação.
- Expomos produtos Jacobiano-vetor e vetor-Jacobiano para AD, permitindo **métodos de primeira ordem** e atualizações **quase-Newton** em grandes espaços de parâmetros.

Isso produz **gradientes baseados na física** para objetivos como velocidade, impulso por watt ou robustez a perturbações.

---

## Otimização sobre design e controle

Com os gradientes disponíveis, exploramos:

- **Parâmetros de design:** comprimento/largura do casco, distribuição de massa, **posição do motor**, rigidez de montagem.
- **Parâmetros de controle:** **frequência** de acionamento, coeficientes de forma de onda multi-harmônica, ciclos de trabalho.
- **Ambiente:** tensão superficial, viscosidade, profundidade, correntes de fundo.

Executamos **otimização de gradiente multi-start** para localizar regiões de alto desempenho, então ajustamos **substitutos** para varreduras rápidas e **otimização Bayesiana** para busca global sob restrições (por exemplo, orçamento de energia, geometrias fabricáveis).

---

## Questões científicas que abordamos

1. **Geração de impulso:** como modos de onda específicos e relações de fase criam fluxo de momento direcional na interface?
2. **Eficiência:** quais combinações de posicionamento e acionamento reduzem a radiação desperdiçada enquanto maximizam o desvio líquido?
3. **Robustez:** quais designs mantêm o desempenho em mudanças nas propriedades do fluido ou pequenos erros de fabricação?
4. **Controle:** podemos moldar pacotes de ondas no tempo para navegar ou manter a estação contra distúrbios?

---

## Da teoria ao hardware

O simulador prevê as **janelas operacionais** onde a radiação de ondas produz propulsão sem saturar as perdas para amortecimento viscoso ou gerar modos contraproducentes. Como os gradientes vêm das equações governantes, a mesma estrutura suporta **inferência de parâmetros** de trajetórias experimentais e **ajuste do controlador** em dispositivos reais.

---

## Referências e trabalhos relacionados

- Conceito e experimentos do SurferBot: {% cite Rhee_2022 %}
- Teoria da propulsão movida por ondas em interfaces: {% cite Benham_Devauchelle_Thomson_2024 %}

---

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot_v2' %}
    {% include repository/repo.liquid repository='elvispy/surferbot-differentiable' %}
</div>
