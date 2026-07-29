---
page_id: prj_sim
layout: page
title: "Solver de auto-similaridade dinâmica para EDPs"
description: "Busca simbólica por reduções de escala de EDP → EDO"
img: "assets/img/julialogo.webp"
importance: 2
category: "work"
related_publications: true
math: true
---

A equação de KdV $u_t + 6u\,u_x + u_{xxx} = 0$ admite uma solução auto-similar onde a combinação relevante de variáveis é $\eta = x\,t^{-1/3}$ e a amplitude decai como $t^{-2/3}$. Esses expoentes derivam da exigência de que cada termo na EDP dimensione-se identicamente, uma restrição que se reduz a um sistema linear; resolver isso manualmente significa fazer o acoplamento termo a termo, e a álgebra é propensa a erros o suficiente para que reduções válidas frequentemente passem despercebidas.

O pacote automatiza isso via o **método de dilatação**: ele atribui um expoente de escala formal a cada variável e termo, escreve a restrição de invariância como um sistema linear nesses expoentes e lê a EDO reduzida diretamente do espaço nulo (kernel) desse sistema linear. Não é necessário adivinhar ou testar potências candidatas; se existir uma similaridade de lei de potência, o método a encontra exatamente. Um wrapper baseado em strings (`find_similarity_v2`) também está disponível para usuários que preferem não trabalhar diretamente com expressões `Symbolics.jl`.

```julia
using SimilaritySolver, Symbolics

@variables x t u(..)
Dt = Differential(t); Dx = Differential(x)
kdv = Dt(u(x,t)) + 6*u(x,t)*Dx(u(x,t)) + Dx(Dx(Dx(u(x,t))))

results = find_ode_dilation(kdv; indep_vars=[x,t], dep_vars=[u(x,t)])
# results[1]["similarity_variable"]  =>  x * t^(-1//3)
# results[1]["gamma"]                =>  -2//1   (u scales as t^(-2/3))
```

O método retorna todas as reduções de similaridade válidas, não apenas uma. Atualmente, ele lida com duas variáveis independentes com escalas de lei de potência; a extensão para três ou mais variáveis e para simetrias que não sejam de lei de potência (logarítmicas, espirais) está em andamento.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/SimilaritySolver.jl' %}
</div>