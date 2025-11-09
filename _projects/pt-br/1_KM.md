---
page_id: prj_km
layout: page
title: "Correspondência Cinemática, uma estrutura de contato suave para impactos deformáveis"
description: "Uma restrição geométrica que torna as colisões estáveis, precisas e prontas para otimização"
img: "assets/img/km-sphere.gif"
importance: 1
category: work
related_publications: true
---

## Transformando impactos em equações que se comportam

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/km-sphere.gif" title="Simulação de uma esfera impactando uma membrana elástica" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Exemplo de simulação: uma esfera rígida impactando uma membrana elástica.
    </figcaption>
</figure>

Colisões entre corpos macios ou deformáveis são enganosamente difíceis de computar.
À medida que duas superfícies se encontram, sua geometria muda mais rápido do que o solucionador consegue rastrear, e a maioria dos modelos de contato lida com isso inserindo **forças de penalidade rígidas** ou chaves descontínuas entre "tocar" e "separar". Esses atalhos tornam as simulações instáveis, excessivamente sensíveis à resolução da malha e cegas à transferência real de energia.

A estrutura de **Correspondência Cinemática (KM)** substitui essas regras ad-hoc por uma **única condição geométrica**: o **ângulo de incidência entre as superfícies de contato deve evoluir suavemente**. Isso transforma o impacto de um evento descontínuo em uma **restrição bem-posta e diferenciável**, que os solucionadores clássicos podem impor diretamente.

---

## Por que isso importa

A KM fornece uma maneira estável de simular **colisões e rebotes deformáveis**—problemas que abrangem desde robótica macia até impacto de gotículas e acreção planetária.
Em vez de forçar o contato por meio de parâmetros empíricos, a KM o trata como uma **condição de compatibilidade** entre as superfícies, garantindo um "aperto de mão" contínuo à medida que se aproximam, comprimem e se separam. Esta abordagem produz:

- Dissipação de energia previsível sem constantes de ajuste.
- Convergência estável sob malhas grosseiras.
- Compatibilidade direta com otimização e inferência baseada em adjuntos.

---

## O método em um parágrafo

A KM aumenta as equações governantes com uma **restrição de ângulo de contato suave** definida ao longo da interface. Na forma discreta, acopla a curvatura e os vetores normais entre as duas superfícies de contato, forçando-as a se alinhar suavemente ao longo do tempo. O resultado é uma **variedade de contato continuamente diferenciável**—sem nós, sem descontinuidades—permitindo a integração estável através do impacto, rebote e desprendimento. O método pode ser implementado em **esquemas de diferenças finitas, elementos finitos ou captura de interface** com mudanças mínimas nas bases de código existentes.

---

## Evidências de experimentos e simulações

- **Sólido–sólido:** Em _Proceedings of the Royal Society A_ ({% cite aguero2022impact %}), validamos a KM simulando uma esfera rígida atingindo uma membrana elástica. O método capturou não apenas os perfis de deformação, mas também as taxas de transferência de energia observadas experimentalmente.
- **Fluido–estrutura:** Em _Journal of Fluid Mechanics_ ({% cite gabbard2025dropreboundlowweber %}), a KM foi estendida para gotículas que se recuperam em banhos de fluido, reproduzindo com precisão as ondas capilares e os limiares de coalescência—regimes onde o CFD convencional falha.

<figure style="float: left; margin: 10px; width: 35%;">
  <div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <video autoplay muted loop controls 
           style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
           preload="auto">
      <source src="/assets/img/drop.mp4" type="video/mp4">
      Seu navegador não suporta a tag de vídeo.
    </video>
  </div>
  <figcaption style="text-align: center; margin-top: 5px;">
    KM aplicada a uma gotícula impactando um banho de fluido—capturando a dinâmica de rebote e coalescência.
  </figcaption>
</figure>

---

## Por que é eficiente e geral

Como a KM expressa o contato através da geometria em vez de forças de penalidade, ela:

- **Melhora o condicionamento** de sistemas lineares no impacto.
- **Elimina a necessidade de remalhamento localizado** perto da interface.
- **Funciona em todos os materiais e escalas**, desde robótica macia até impactos granulares.
- **Permanece diferenciável**, por isso é compatível com design baseado em gradiente, inferência de parâmetros e pipelines de otimização bayesiana.

---

## O que vem a seguir

Estamos estendendo a KM para sistemas multimateriais e bioinspirados, onde as interfaces podem crescer, se fundir ou rasgar. A estrutura de restrição diferenciável também abre as portas para **substitutos de aprendizado de máquina** que aprendem a dinâmica de impacto a partir de dados de simulação, acelerando as tarefas de design em robótica e ciência dos materiais.

---

Colisões não são eventos discretos—são **conversas entre geometrias**.
A Correspondência Cinemática dá a esse diálogo uma forma matemática precisa: suave, estável e computável.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/kinematic-match-sphere' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-solidsubstrate-v3' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-onto-bath' %}  
</div>
