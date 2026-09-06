---
page_id: prj_km
layout: page
title: "Construção de software para impacto deformável"
description: "Dinâmica de contato espectral para gotas impactando um banho"
img: "assets/img/spectralkm-impact.gif"
importance: 1
category: "work"
related_publications: true
---

## Um milissegundo decide o resultado

Na impressão, revestimento, pulverização e manuseio de líquidos, o impacto decide se um líquido se deposita, se espalha, se recoila ou se coalescece. Essa escolha é feita em milissegundos, enquanto os corpos envolvidos estão mudando de forma.

A dificuldade é que uma colisão deformável não possui área de contato pré-existente nem campo de pressão. No primeiro contato, a pressão remodela as interfaces, e suas formas alteram a pressão. `SpectralKM.jl` pergunta como resolver esse ciclo quando ambos os lados da colisão são líquidos.

<figure>
  <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/spectralkm-impact-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="SpectralKM bath-impact animation with a red contact patch and pressure inset">
    <source src="{{ '/assets/img/spectralkm-impact.mp4' | relative_url }}" type="video/mp4">
    Seu navegador não suporta a tag de vídeo.
  </video>
  <figcaption class="caption">Simulação de impacto em banho. A região azul-escura é o banho, a região azul-clara é a gota, e o arco vermelho é a mancha de contato resolvida. O gráfico inserido mostra a pressão pontual como diagnóstico, não como campo convergido.</figcaption>
</figure>

## O que cada modelo eliminou

O estudo de 2022 de esfera rígida / membrana elástica tornou visível a primeira variável oculta: deformação do alvo ({% cite aguero2022impact %}). Uma gota líquida sobre um sólido transferiu a deformabilidade para o impactador. Uma gota sobre um banho deixou nenhum dos lados do contato fixo ({% cite gabbard2025dropreboundlowweber %}). Cada problema expôs uma suposição de contato que o anterior podia se dar ao luxo de ocultar.

<div style="max-width: 640px; margin: 1.5rem auto;">
  {% include figure.liquid loading="lazy" path="assets/img/km-sphere.gif" alt="Simulação de uma esfera rígida impactando uma membrana elástica" title="Esfera rígida e membrana elástica" class="img-fluid rounded z-depth-1" caption="Simulação do modelo de esfera rígida / membrana elástica de 2022." %}
</div>

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
    KM aplicado a uma gotícula impactando um banho fluido, capturando a dinâmica de recuo e coalescência.
  </figcaption>
</figure>

O ramo de substrato sólido então isolou o comportamento constitutivo não newtoniano. O trabalho em dinâmica de contato tornou a pressão e a extensão do contato incógnitas explícitas. Essa progressão leva à pergunta para a qual o modelo atual foi construído: qual parte de um recuo é dinâmica de fluidos e qual parte vem da prescrição de contato?

## Dinâmica de contato espectral

`SpectralKM.jl` é a formulação atual newtoniana, não coalescente, gota–banho. Representa o banho com modos de Fourier–Bessel, a gota com modos de Legendre e a pressão de contato com modos de Legendre deslocados. Uma busca externa filtrada por viabilidade seleciona a mancha de contato.

Elimina três escolhas que, de outra forma, poderiam decidir uma previsão de recuo: um perfil de pressão prescrito, uma busca de contato em nível de malha e uma interface líquida fixa. O banho, a gota, a pressão suportada na mancha e a extensão do contato são resolvidos juntos. O resultado é um modelo de contato cujas suposições físicas podem ser inspecionadas, em vez de enterradas em uma chave do solver.

O gráfico de pressão inserido é um diagnóstico, não um campo polido para ser sobreinterpretado. Mostra o que o modelo resolve no contato sem pretender que um traçado pontual seja a resposta final.

## Reologia controlada sobre um sólido

`DropRebound.jl` mantém o substrato sólido para que possa isolar como o comportamento constitutivo altera o recuo. `SpectralKM.jl` leva o problema de contato a duas interfaces líquidas em movimento. Os vídeos são casos numéricos separados, não um benchmark.

<div class="row">
  <div class="col-md-6">
    <figure>
      <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/droprebound-oldroyd-b-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="DropRebound numerical Oldroyd-B rebound case">
        <source src="{{ '/assets/img/droprebound-oldroyd-b.mp4' | relative_url }}" type="video/mp4">
        Seu navegador não suporta a tag de vídeo.
      </video>
      <figcaption class="caption">Caso numérico Oldroyd-B.</figcaption>
    </figure>
  </div>
  <div class="col-md-6">
    <figure>
      <video autoplay muted loop controls preload="metadata" poster="{{ '/assets/img/droprebound-carreau-poster.png' | relative_url }}" class="img-fluid rounded z-depth-1" style="width: 100%; display: block;" aria-label="DropRebound numerical Carreau rebound case">
        <source src="{{ '/assets/img/droprebound-carreau.mp4' | relative_url }}" type="video/mp4">
        Seu navegador não suporta a tag de vídeo.
      </video>
      <figcaption class="caption">Caso numérico Carreau.</figcaption>
    </figure>
  </div>
</div>

## Código aberto como infraestrutura de pesquisa

Modelos de contato ganham confiança quando suas derivações, testes, diagnósticos e figuras podem ser inspecionados em conjunto. Os repositórios mantêm o código do pacote, registros de validação, varreduras de parâmetros e scripts de renderização ao lado do modelo, para que um leitor possa reproduzir um resultado ou questionar uma suposição sem reconstruir o fluxo de trabalho a partir de um artigo.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvis-aguero/SpectralKM.jl' %}
    {% include repository/repo.liquid repository='elvis-aguero/DropRebound.jl' %}
</div>
