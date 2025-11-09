---
page_id: prj_sim
layout: page
title: "Solucionador de similaridade dinâmica para EDPs"
description: "Busca simbólica por reduções de escala de EDP → EDO"
img: "assets/img/julialogo.webp"
importance: 3
category: "fun"
related_publications: true
---

# Similaridade por construção: automatize reduções de EDP → EDO

Muitos problemas de transporte e fluidos escondem uma **simetria de escala**. Quando ela existe, uma mudança de variáveis colapsa a EDP para uma EDO (difusão, camada limite de Blasius, filmes finos).
Esta ferramenta Julia **automatiza essa busca**: ela testa uma família de *ansätze* de similaridade, resolve para expoentes, reduz a EDP e transforma condições de contorno.

---

## O que ela faz

- **Analisa** uma sintaxe de EDP restrita (campos, derivadas).
- **Busca** variáveis de similaridade
  \( \eta = x^{a_1} y^{a_2} t^{a_3} \), \( u = x^{b_1} y^{b_2} t^{b_3} f(\eta) \) (variantes 1–2D).
- **Resolve** equações de balanço de expoentes para que todos os termos da EDP sejam escalados de forma idêntica.
- **Reduz**: substitui o *ansatz*, cancela fatores e retorna uma **EDO em \(\eta\)**.
- **Transforma CAs/CIs** em condições em \( f(\eta) \).
- **Emite artefatos**: expoentes, mapa de similaridade, EDO reduzida, CAs transformadas como expressões Julia.

Construído em **Symbolics.jl**; as saídas alimentam diretamente seu integrador de EDO.

---

## Esboço do método

1. Tokeniza e diferencia simbolicamente a EDP.
2. Anexa pesos de escala a variáveis e derivadas.
3. Iguala expoentes entre os termos → pequeno sistema linear em \(a_i,b_i\).
4. Se for solucionável, substitui e simplifica para uma EDO em \(\eta\).
5. Verifica a dependência apenas em \(\eta\); caso contrário, relata “sem redução de escala”.

---

## Exemplo

Equação do calor com decaimento linear:
\[
u_t = \kappa\,u_{xx} - \lambda u,\qquad x\in\mathbb{R},~ t>0.
\]

```julia
using SimilaritySolver  # namespace do pacote
pde = @pde du/dt ~ κ*d2u/dx2 - λ*u
bcs = ["u(±Inf,t)=0"]
result = find_similarity(pde, bcs; vars=[:x,:t], field=:u)
