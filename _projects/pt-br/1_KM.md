---
page_id: prj_km
layout: page
title: "Kinematic Match: um framework de contato suave para impactos deformáveis"
description: "Uma restrição geométrica que torna colisões estáveis, precisas e prontas para otimização"
img: "assets/img/km-sphere.gif"
importance: 1
category: "work"
related_publications: true
---


## Transformando impactos em equações que se comportam

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/km-sphere.gif" title="Simulation of a sphere impacting an elastic membrane" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Exemplo de simulação: uma esfera rígida impactando uma membrana elástica.
    </figcaption>
</figure>

A mecânica de contato é um problema de descontinuidade: duas superfícies que estavam separadas tornam-se instantaneamente restritas na colisão. A maioria dos modelos numéricos de contato lida com isso inserindo forças de penalidade rígidas ou alternando restrições rígidas entre "tocando" e "não tocando". Ambas as abordagens tornam a rigidez do solver dependente da malha, suprimem a transferência de energia correta na interface e bloqueiam a otimização baseada em gradiente.

O framework **Kinematic Match (KM)** substitui inteiramente a condição de contato. Em vez de penalizar a interpenetração, o KM impõe um único requisito geométrico: o ângulo de incidência entre as duas superfícies deve evoluir continuamente através do impacto. Em forma discreta, isso acopla a curvatura e os vetores normais através da interface em cada passo de tempo, produzindo um manifold de contato que é continuamente diferenciável, não requer lógica de comutação e não introduz constantes de ajuste. O método é compatível com esquemas de diferença finita, elementos finitos e captura de interface.

Em _Proceedings of the Royal Society A_ ({% cite aguero2022impact %}), aplicamos o KM a uma esfera rígida atingindo uma membrana elástica, correspondendo aos perfis de deformação experimentais e taxas de transferência de energia. Em _Journal of Fluid Mechanics_ ({% cite gabbard2025dropreboundlowweber %}), estendemos o framework para gotas ricocheteando em banhos de fluido — um regime sensível ao tratamento do modelo de contato das forças capilares e coalescência — reproduzindo observações que o CFD convencional não alcança.

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
    KM aplicado a uma gota impactando um banho de fluido — capturando a dinâmica de ricochete e coalescência.
  </figcaption>
</figure>

Como o manifold de contato permanece diferenciável, a mesma formulação integra-se diretamente com inferência baseada em adjuntos e design baseado em gradiente. Estamos estendendo-o para interfaces multimateriais e biológicas onde as superfícies podem se fundir ou rasgar.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/kinematic-match-sphere' %}
    {% include repository/repo.liquid repository='elvispy/km-dropplet-solidsubstrate-v3' %}
    {% include repository/repo.liquid repository='elvispy/km-droplet-onto-bath' %}
</div>