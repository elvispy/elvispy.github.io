---
page_id: prj_km
layout: page
title: "Construindo a próxima geração de software de impacto deformável"
description: "Dinâmica de contato espectral para gotas impactando um banho"
img: "assets/img/spectralkm-impact.gif"
importance: 1
category: "work"
related_publications: true
---

## Um milissegundo decide o resultado

Em impressão, revestimento, sprays e manuseio de líquidos, o impacto decide se um líquido se deposita, se espalha, rebate ou aglutina. Essa escolha é feita em milissegundos, enquanto os corpos envolvidos mudam de forma.

A dificuldade é que uma colisão deformável não possui área de contato ou campo de pressão pré-existentes. Ao primeiro toque, a pressão remodela as interfaces, e suas formas alteram a pressão. `SpectralKM.jl` pergunta como resolver esse ciclo quando ambos os lados da colisão são líquidos.

<figure>
  <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/spectralkm-impact-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="SpectralKM bath-impact animation with a red contact patch and pressure inset">
    <source src="{{ '/assets/img/spectralkm-impact.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption class="caption">Simulação de impacto em banho. A região azul escura é o banho, a região azul clara é a gota, e o arco vermelho é a área de contato resolvida. O detalhe plota a pressão pontual como um diagnóstico, não como um campo convergido.</figcaption>
</figure>

## O que cada modelo removeu

O estudo de esfera rígida / membrana elástica de 2022 tornou visível a primeira variável oculta: a deformação do alvo ({% cite aguero2022impact %}). Uma gota de líquido sobre um sólido moveu a deformabilidade para o impactador. Uma gota sobre um banho não deixou nenhum dos lados do contato fixo ({% cite gabbard2025dropreboundlowweber %}). Cada problema expôs uma suposição de contato que o anterior podia se dar ao luxo de esconder.

<div style="max-width: 640px; margin: 1.5rem auto;">
  {% include figure.liquid loading="lazy" path="assets/img/km-sphere.gif" alt="Simulação de uma esfera rígida impactando uma membrana elástica" title="Esfera rígida e membrana elástica" class="img-fluid rounded z-depth-1" caption="Simulação do modelo de esfera rígida / membrana elástica de 2022." %}
</div>

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
    KM aplicado a uma gota impactando um banho de fluido, capturando a dinâmica de rebote e coalescência.
  </figcaption>
</figure>

O ramo do substrato sólido então isolou o comportamento constitutivo não-Newtoniano. O trabalho de dinâmica de contato tornou a pressão e a extensão do contato incógnitas explícitas. Essa progressão leva à pergunta que o modelo atual foi construído para responder: qual parte de um rebote é dinâmica de fluidos e qual parte vem da prescrição de contato?

## Dinâmica de contato espectral

`SpectralKM.jl` é a formulação atual para gota--banho Newtoniana e sem coalescência. Ela representa o banho com modos de Fourier–Bessel, a gota com modos de Legendre e a pressão de contato com modos de Legendre deslocados. Uma busca externa filtrada por viabilidade seleciona a área de contato.

Ela remove três escolhas que, de outra forma, poderiam decidir uma previsão de rebote: um perfil de pressão prescrito, uma busca de contato em nível de malha e uma interface líquida fixa. O banho, a gota, a pressão suportada na área e a extensão do contato são resolvidos em conjunto. O resultado é um modelo de contato cujas suposições físicas podem ser inspecionadas em vez de ficarem enterradas em uma configuração do solver.

O detalhe da pressão é um diagnóstico, não um campo polido para ser superinterpretado. Ele mostra o que o modelo resolve no contato sem pretender que um traço pontual seja a resposta final.

## Reologia controlada em um sólido

`DropRebound.jl` mantém o substrato sólido para que possa isolar como o comportamento constitutivo altera o rebote. `SpectralKM.jl` leva o problema de contato para duas interfaces líquidas móveis. Os vídeos são casos numéricos separados, não um benchmark.

<div class="row">
  <div class="col-md-6">
    <figure>
      <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/droprebound-oldroyd-b-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="DropRebound numerical Oldroyd-B rebound case">
        <source src="{{ '/assets/img/droprebound-oldroyd-b.mp4' | relative_url }}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <figcaption class="caption">Caso numérico Oldroyd-B.</figcaption>
    </figure>
  </div>
  <div class="col-md-6">
    <figure>
      <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/droprebound-carreau-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="DropRebound numerical Carreau rebound case">
        <source src="{{ '/assets/img/droprebound-carreau.mp4' | relative_url }}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <figcaption class="caption">Caso numérico Carreau.</figcaption>
    </figure>
  </div>
</div>

## Código aberto como infraestrutura de pesquisa

Modelos de contato ganham confiança quando suas derivações, testes, diagnósticos e figuras podem ser inspecionados em conjunto. Os repositórios mantêm o código do pacote, registros de validação, varreduras de parâmetros e scripts de renderização ao lado do modelo, para que um leitor possa reproduzir um resultado ou questionar uma suposição sem precisar reconstruir o fluxo de trabalho a partir de um artigo.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvis-aguero/SpectralKM.jl' %}
    {% include repository/repo.liquid repository='elvis-aguero/DropRebound.jl' %}
</div>