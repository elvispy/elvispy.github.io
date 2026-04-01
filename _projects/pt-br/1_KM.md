---
page_id: prj_km
layout: page
title: "Kinematic Match: um framework de contato suave para impactos deformáveis"
description: "Uma restrição geométrica que torna as colisões estáveis, precisas e prontas para otimização"
img: "assets/img/km-sphere.gif"
importance: 1
category: "work"
related_publications: true
---


## Transformando impactos em equações bem-comportadas

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/km-sphere.gif" title="Simulation of a sphere impacting an elastic membrane" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Exemplo de simulação: uma esfera rígida impactando uma membrana elástica.
    </figcaption>
</figure>

Colisões entre corpos macios ou deformáveis são enganosamente difíceis de computar. À medida que duas superfícies se encontram, sua geometria muda mais rápido do que o resolvedor pode acompanhar, e a maioria dos modelos de contato lida com isso inserindo **forças de penalidade rígidas** ou alternâncias descontínuas entre "toque" e "separação". Esses atalhos tornam as simulações instáveis, excessivamente sensíveis à resolução da malha e cegas à transferência real de energia.

O framework **Kinematic Match (KM)** substitui essas regras ad-hoc por uma **única condição geométrica:** o **ângulo de incidência entre as superfícies em contato deve evoluir suavemente**. Isso transforma o impacto de um evento descontínuo em uma **restrição bem posta e diferenciável** — uma que os resolvedores clássicos podem impor diretamente.

---

## Por que isso importa

O KM fornece uma maneira estável de simular **colisões e rebotes deformáveis** — problemas que abrangem desde robótica macia até o impacto de gotas e acreção planetária. Em vez de forçar o contato através de parâmetros empíricos, o KM o trata como uma **condição de compatibilidade** entre as superfícies, garantindo um "aperto de mão" contínuo à medida que elas se aproximam, comprimem e se separam. A abordagem produz dissipação de energia previsível sem constantes de ajuste, convergência estável sob malhas grossas e compatibilidade direta com otimização baseada em gradiente e inferência baseada em adjuntos.

## O método em um parágrafo

O KM aumenta as equações governantes com uma **restrição de ângulo de contato suave** definida ao longo da interface. Em forma discreta, ele acopla a curvatura e os vetores normais entre as duas superfícies em contato, forçando-as a se alinharem suavemente ao longo do tempo. O resultado é um **manifold de contato continuamente diferenciável** — sem dobras, sem descontinuidades — permitindo uma integração estável através do impacto, rebote e destacamento. O método pode ser implementado em esquemas de diferenças finitas, elementos finitos ou captura de interface com mudanças mínimas nos códigos existentes.

## Evidências de experimentos e simulações

Em _Proceedings of the Royal Society A_ ({% cite aguero2022impact %}), validamos o KM simulando uma esfera rígida atingindo uma membrana elástica. O método capturou não apenas os perfis de deformação, mas também as taxas de transferência de energia observadas experimentalmente. No _Journal of Fluid Mechanics_ ({% cite gabbard2025dropreboundlowweber %}), o KM foi estendido para gotas rebatendo em banhos de fluido, reproduzindo com precisão ondas capilares e limiares de coalescência — regimes onde o CFD convencional falha.

<figure style="float: left; margin: 10px; width: 35%;">
  <div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <video autoplay muted loop controls
           style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
           preload="auto">
      <source src="/assets/img/drop.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
  <figcaption style="text-align: center; margin-top: 5px;">
    KM aplicado a uma gota impactando um banho de fluido — capturando a dinâmica de rebote e coalescência.
  </figcaption>
</figure>

Como o KM expressa o contato através da geometria em vez de forças de penalidade, ele melhora o condicionamento de sistemas lineares no impacto, elimina a necessidade de remalhamento localizado perto da interface e funciona em diferentes materiais e escalas — da robótica macia a impactos granulares. Crucialmente, ele **permanece diferenciável**, sendo compatível com design baseado em gradiente, inferência de parâmetros e fluxos de otimização Bayesiana. Estamos estendendo o KM para sistemas multimateriais e bioinspirados, onde as interfaces podem crescer, fundir-se ou rasgar-se.

---

Colisões não são eventos discretos — são **conversas entre geometrias**. O Kinematic Match dá a esse diálogo uma forma matemática precisa: suave, estável e computável.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/kinematic-match-sphere' %}
    {% include repository/repo.liquid repository='elvispy/km-dropplet-solidsubstrate-v3' %}
    {% include repository/repo.liquid repository='elvispy/km-dropplet-onto-bath' %}
</div>