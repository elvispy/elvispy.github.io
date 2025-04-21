---
page_id: prj_sim
layout: page
title: Um solucionador de similaridade dinâmico para dinâmica de fluidos.
description: Um localizador simbólico de EDPs para soluções de similaridade.
img: assets/img/julialogo.webp
importance: 3
category: fun
related_publications: true
---

# 🌀 Desvendando EDPs com Similaridade: Automatizando um Truque Clássico da Física

Em mecânica dos fluidos, transferência de calor ou mesmo dinâmica populacional, muitos problemas começam com uma **equação diferencial parcial (EDP)** de aparência complicada. Mas, às vezes, há um truque oculto – uma manobra física ancestral – que transforma uma EDP complexa em uma **equação diferencial ordinária (EDO)** muito mais simples. Esse truque é chamado de **similaridade dinâmica**.

Este pacote Julia ajuda você a **automatizar a busca por essas transformações** – usando computação simbólica e um toque de elegância matemática.

---

## O Que é Similaridade, Realmente?

Soluções de similaridade surgem quando você pode reescrever uma EDP em termos de uma nova variável (como \( \eta = y / \sqrt{x} \)) que combina espaço e tempo em uma única coordenada. Isso colapsa um problema 2D ou 3D em 1D, tornando-o **muito mais fácil de analisar ou resolver**.

Você provavelmente já viu isso em camadas limite (Blasius), difusão (função erro) ou propagação de ondas. A ideia é: **se a física "escalar" da maneira certa**, então a solução também deve escalar.

Mas encontrar a substituição certa nem sempre é óbvio. É aí que esta ferramenta entra.

---

## 🔧 O Que Esta Ferramenta Faz

Este pacote Julia:

- Analisa EDPs simbólicas como `"du/dt + 6*u*du/dx + d3u/d3x = 0"`
- Verifica se existe uma **mudança de variáveis** (\( \eta = x y^m \), \( u = x^n f(\eta) \)) que simplifica a equação
- Retorna uma EDO reduzida, se bem-sucedido
- Analisa e transforma **condições de contorno** também
- Imprime todas as substituições e formas simbólicas utilizadas

É construído usando [Symbolics.jl](https://github.com/JuliaSymbolics/Symbolics.jl), o motor simbólico para a linguagem Julia.

---

## ✨ Exemplo: Reduza uma EDP para uma EDO

```julia
result = find_similarity("du/dt + 6 * u * du/dx + d3u/d3x = 0", "u(x=Inf, t) = 0")

# Output:
# → variável de similaridade η = x * t^m
# → palpite de solução u = x^n * f(η)
# → EDO simplificada retornada!
```

Você não precisa calcular derivadas manualmente ou tentar uma dúzia de substituições. Esta função automatiza tudo isso para você.

---

## 📘 Para Quem É Isso?

Esta ferramenta é para:

- Estudantes de engenharia que estudam transporte, ondas ou mecânica dos fluidos
- Matemáticos aplicados explorando simetria e escalonamento
- Qualquer pessoa tentando reduzir simbolicamente EDPs a algo tratável

---

## 🧠 Por Trás das Câmeras

- Ele usa diferenciação simbólica para testar se uma substituição "elimina" a dependência da EDP em \( x \), \( y \) ou \( t \)
- Se sim, simplifica o resultado e verifica se parece uma EDO
- Ele tenta uma grade de potências possíveis \( n, m \) usando palpites racionais
- Ele até analisa operadores diferenciais como `d2x/dy` de strings

---

## 📌 Experimente

Quer vê-lo em ação ou usá-lo em seus próprios modelos?

🧪 [Repositório GitHub →](https://github.com/elvispy/similarity-pde-solver)

---

## 🌍 Por Que Isso Importa

A similaridade não é apenas elegante – é prática. Aparece em:

- Coeficientes de arrasto que escalam com o número de Reynolds
- Profundidade de penetração de calor em problemas de condução
- Teoria da camada limite em aerodinâmica

Esta ferramenta ajuda a **democratizar esse poder** – tornando-o acessível a estudantes, professores e pesquisadores.

---

Da próxima vez que você estiver olhando para uma EDP difícil... talvez ela só precise da mudança de variável certa. 🧠➞📉

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/SimilaritySolver.jl' %}  
</div>
