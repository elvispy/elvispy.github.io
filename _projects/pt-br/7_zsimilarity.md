---
page_id: prj_sim
layout: page
title: "Resolvedor de similaridade dinâmica para EDPs"
description: "Busca simbólica por reduções de escala de EDP → EDO"
img: "assets/img/julialogo.webp"
importance: 3
category: "fun"
related_publications: true
---

## Automatize reduções de EDP → EDO via similaridade

Antes de existirem os resolvedores numéricos, os físicos rotineiramente domavam equações diferenciais parciais encontrando uma **mudança de variáveis que as colapsava em EDOs**. A equação de difusão, a camada limite de Blasius, o espalhamento de filmes finos — todos cedem a esse truque, chamado de redução por similaridade. O problema: descobrir a mudança certa de variáveis exige reconhecimento de padrões manualmente, e é fácil perder uma ou errar os expoentes.

Este pacote Julia automatiza a busca. Você escreve a EDP; ele encontra os expoentes.

### Como funciona

A ferramenta testa uma família de ansätze de lei de potência da forma
\[
\eta = x^{a_1} y^{a_2} t^{a_3}, \qquad u = x^{b_1} y^{b_2} t^{b_3} f(\eta),
\]
diferencia simbolicamente a EDP, atribui pesos de escala a cada termo e iguala os expoentes para formar um pequeno sistema linear nas incógnitas \(a_i, b_i\). Se o sistema for consistente, ele substitui o ansatz, cancela fatores comuns e retorna uma **EDO em \(\eta\)** junto com as condições de contorno e iniciais transformadas — pronto para passar diretamente para o seu integrador de EDOs. Se não existir redução de escala, ele informa.

Construído sobre o **Symbolics.jl**, ele lida com variantes 1D e 2D e emite os expoentes, o mapa de similaridade, a EDO reduzida e as condições de contorno transformadas como expressões Julia.

### Exemplo

Equação do calor com decaimento linear:
\[
u_t = \kappa\,u_{xx} - \lambda u,\qquad x\in\mathbb{R},~ t>0.
\]

```julia
using SimilaritySolver
pde = @pde du/dt ~ κ*d2u/dx2 - λ*u
bcs = ["u(±Inf,t)=0"]
result = find_similarity(pde, bcs; vars=[:x,:t], field=:u)
# => η = x / sqrt(t),  u = exp(-λt) * f(η),  f'' + η/2 * f' = 0
```

O pacote recupera a solução de similaridade Gaussiana padrão e devolve uma EDO que qualquer integrador Julia pode resolver em milissegundos.