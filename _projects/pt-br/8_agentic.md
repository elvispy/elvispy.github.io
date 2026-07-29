---
page_id: prj_agentic
layout: page
title: Engenharia de agentes sob um rigor de pesquisa real
description: Benchmarks abertos para agentes que projetam, simulam e defendem alegações de engenharia
img: assets/img/agentic-metamaterial.gif
importance: 1
category: work
---

## Uma pontuação não é uma descoberta

Um agente pode classificar milhares de designs candidatos. Isso não é suficiente para produzir um resultado científico. A tarefa mais difícil é decidir o que sobrevive quando o modelo, o mecanismo e as evidências são desafiados.

Estou construindo benchmarks abertos que colocam os agentes dentro desse ciclo mais difícil. Cada benchmark começa com um problema de engenharia não resolvido e um oráculo físico. O agente deve declarar um mecanismo antes de gastar computação, escolher experimentos sob um orçamento finito, reter hipóteses que falharam e entregar um script de replicação. Um crítico ainda pode recusar a alegação.

<div class="row align-items-center">
  <div class="col-md-5">
    <figure>
      <img src="{{ '/assets/img/agentic-metamaterial.gif' | relative_url }}" alt="Animated finite-element simulation of a rocking-mast metamaterial coiling under compression" class="img-fluid rounded z-depth-1" style="width: 100%; height: auto;">
      <figcaption class="caption">Um mastro oscilante candidato se enrola à medida que seu anel superior desce e gira. Esta é uma simulação real do registro do benchmark.</figcaption>
    </figure>
  </div>
  <div class="col-md-7">
    <h2>5.9× não é a resposta</h2>
    <p>O líder numérico atual atinge 5,9 vezes a linha de base de Bessa. Deliberadamente, ele não é registrado como a resposta do benchmark: ele reformula uma família de seções transversais conhecida em vez de fornecer o novo mecanismo que o problema solicita. O benchmark mantém essa distinção explícita: um número simulado alto é progresso, mas ainda não é uma descoberta.</p>
  </div>
</div>

## Um problema difícil, com um oráculo difícil

O primeiro benchmark pede um metamaterial de mastro oscilante imprimível que se enrola sob compressão axial em vez de esmagar. O objetivo não é meramente uma carga de flambagem mais alta. Um design deve se enrolar através de 80% de compressão, permanecer abaixo de um teto de 2% de deformação local, ser fisicamente plausível como um objeto impresso e superar o dobro da linha de base de Bessa através de um mecanismo genuinamente novo.

Isso o torna um teste útil de pesquisa agêntica. Um sistema não pode obter crédito otimizando dentro de uma família conhecida, encontrando um artefato numérico ou pulando a verificação dispendiosa que poderia desqualificar seu próprio resultado principal.

## Evidência, incluindo as falhas

Esses benchmarks abrangem materiais supercompressíveis, design de biorreatores e interação fluido-estrutura. Os oráculos variam de tarefas Abaqus no SLURM a DNS de duas fases e solvers em Julia. Uma execução deixa um registro de sua hipótese, registro de simulação, veredito do crítico e script de replicação. O estudo do metamaterial já preserva dezesseis execuções e cerca de quarenta e nove ideias, incluindo resultados promissores posteriormente rejeitados por uma verificação mecânica mais rigorosa.

O ponto não é fazer um agente parecer ocupado. É tornar uma alegação científica auditável: outro grupo deve ser capaz de reproduzir as evidências, inspecionar por que uma ideia foi descartada e decidir se o mecanismo declarado justificou o resultado.

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='bessagroup/f3dasm-agentic-benchmarks' %}
</div>
