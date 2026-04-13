---
page_id: prj_sim
layout: page
title: "Resolvedor de similaridade dinâmica para EDPs"
description: "Busca simbólica por reduções de escala de EDP → EDO"
img: "assets/img/julialogo.webp"
importance: 2
category: "work"
related_publications: true
math: true
---

Uma EDP com duas variáveis independentes às vezes admite uma substituição que a colapsa em uma EDO — uma **redução de similaridade** — mas a substituição correta não é óbvia: equivale a encontrar quais escalamentos deixam a equação invariante.

O pacote automatiza isso por meio do **método de dilatação**: atribui um expoente de escala formal a cada variável e termo, escreve a restrição de invariância como um sistema linear nesses expoentes, e lê a EDO reduzida diretamente do espaço nulo desse sistema linear. Não é necessário adivinhar nem varrer potências candidatas; se existe uma similaridade de lei de potência, o método a encontra exatamente. Um wrapper baseado em strings (`find_similarity_v2`) também está disponível para usuários que preferem não trabalhar diretamente com expressões de `Symbolics.jl`.

A equação de KdV $u_t + 6u\,u_x + u_{xxx} = 0$ tem uma estrutura auto-similar conhecida:

```julia
using SimilaritySolver, Symbolics

@variables x t u(..)
Dt = Differential(t); Dx = Differential(x)
kdv = Dt(u(x,t)) + 6*u(x,t)*Dx(u(x,t)) + Dx(Dx(Dx(u(x,t))))

results = find_ode_dilation(kdv; indep_vars=[x,t], dep_vars=[u(x,t)])
# results[1]["similarity_variable"]  =>  x * t^(-1//3)
# results[1]["gamma"]                =>  -2//1   (u escala como t^(-2/3))
```

O método retorna todas as reduções de similaridade válidas, não apenas uma. Atualmente lida com duas variáveis independentes com escalamentos de lei de potência; a extensão para três ou mais variáveis e para simetrias não de lei de potência (logarítmicas, espirais) está em andamento.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/SimilaritySolver.jl' %}
</div>
