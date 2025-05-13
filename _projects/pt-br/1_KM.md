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

## O Problema: Por Que Colisões São Mais do Que Apenas "Ricochetear"

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/km-sphere.gif" title="example image" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Exemplo de simulação de uma esfera sólida impactando uma membrana elástica.
    </figcaption>
</figure>

Colisões inelásticas — onde os objetos não apenas ricocheteiam, mas deformam, grudam ou fragmentam — são governadas por dinâmicas não lineares que desafiam equações simples. Os modelos tradicionais frequentemente simplificam demais a mecânica do contato, ignorando como os materiais _se adaptam_ durante o impacto. Por exemplo, os "dedos" de silicone de um robô macio agarrando um objeto ou uma gota de água espirrando em uma superfície vibratória envolvem um acoplamento complexo entre elasticidade, dinâmica de fluidos e geometria.

---

## A Estrutura KM: Suavizando o Caos

Em sua essência, a estrutura KM introduz (ver {% cite aguero2022impact %}) uma **restrição geométrica** nas superfícies de contato: o ângulo de incidência entre os objetos colidindo deve permanecer suave. Pense nisso como garantir um "aperto de mão" entre os materiais — sem arestas afiadas, sem saltos repentinos. Esta abordagem é:

1.  **Intuitiva**: Ao contrário das simulações de força bruta, as restrições do KM espelham o comportamento do mundo real, tornando-o mais fácil de implementar.
2.  **Versátil**: Funciona com elementos finitos, diferenças finitas ou até mesmo solucionadores de aprendizado de máquina.
3.  **Eficiente**: Ao evitar refinamentos de malha dispendiosos, o KM se destaca em cenários como impactos de gotas de baixa velocidade, onde os métodos tradicionais lutam.

Em nosso [trabalho recente](https://royalsocietypublishing.org/doi/10.1098/rspa.2022.0340), validamos o KM contra experimentos envolvendo uma esfera rígida atingindo uma membrana elástica. Os resultados corresponderam não apenas aos padrões de deformação, mas também às taxas de dissipação de energia — uma raridade na modelagem de colisões.

---

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
    Exemplo de simulação de uma esfera sólida impactando uma membrana elástica.
  </figcaption>
</figure>

## De Robôs a Gotas de Chuva: Por Que Isso Importa

### 1. **Robótica Macia**

O KM permite a modelagem precisa de garras interagindo com objetos delicados, garantindo que as forças sejam distribuídas sem danos — crítico para robótica médica ou máquinas de colheita de frutas.

### 2. **Astrofísica**

Simular colisões de asteroides ou acreção planetária requer o manuseio de corpos fragmentados e deformáveis. A capacidade do KM de gerenciar superfícies de contato irregulares pode refinar modelos de agregação de poeira cósmica.

### 3. **Interações Fluido-Estrutura**

Nosso trabalho mais recente ({% cite gabbard2025dropreboundlowweber %}) aplica o KM a gotas de água atingindo banhos de fluido — um problema com aplicações em impressão a jato de tinta e pulverização de pesticidas. Os primeiros resultados mostram que o KM captura ondas capilares e coalescência melhor do que o CFD convencional.

---

## O Que Vem a Seguir?

Estamos expandindo o KM para:

- **Colisões de múltiplos materiais**: Pense em gelo atingindo água (relevante para engenharia criogênica).
- **Sistemas biológicos**: Simulação de interações célula-matriz em biorreatores de engenharia de tecidos.
- **Integração de aprendizado de máquina**: Treinar redes neurais para prever restrições KM, reduzindo o tempo de computação.

---

Colisões não são apenas pontos finais — são conversas entre materiais. Com o KM, estamos decodificando esse diálogo, um impacto de cada vez. 🚀

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/kinematic-match-sphere' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-solidsubstrate-v3' %}  
    {% include repository/repo.liquid repository='elvispy/km-dropplet-onto-bath' %}  
</div>
