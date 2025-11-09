---
page_id: prj_cbpf
layout: page
title: Transporte de spin por medição e inferência
description: De ajustes de FMR baseados em LLG à deconvolução de iSHE e seleção de materiais
img: assets/img/spintronics.jpeg
importance: 2
category: work
giscus_comments: true
---

## Quantificação do transporte de spin com experimentos baseados em modelo

Dispositivos modernos esbarram em limites térmicos e quânticos. A spintrônica roteia informações através de **correntes de spin**, em vez de apenas carga, prometendo menor dissipação. Este projeto mediu e **inferiu** propriedades de transporte de spin em bicamadas finas FM/NM usando um pipeline que vincula o modelo de **Landau–Lifshitz–Gilbert (LLG)**, a espectroscopia de **ressonância ferromagnética (FMR)** e o **efeito Hall de spin inverso (iSHE)**. O trabalho abrange desde a fabricação de amostras até o processamento de sinais e vincula cada decisão a uma quantidade computável: o **amortecimento de Gilbert** \( \alpha \) e um proxy de voltagem iSHE para corrente de spin. :contentReference[oaicite:1]{index=1}

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/spintronics.jpeg" title="Bicamadas de filme fino para FMR/iSHE" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Filmes finos FM/NM usados para medições de FMR e iSHE.
    </figcaption>
</figure>

### O que medimos e por que é difícil
- **LLG → Largura de linha FMR:** Usando LLG, a inclinação da largura de linha-frequência FMR fornece o **amortecimento** \( \alpha \). Estimativas limpas exigem detecção lock-in, modelagem de forma de linha e manuseio cuidadoso da anisotropia. Construímos um pipeline FMR de varredura de frequência e ajustamos **Lorentzianas simétricas/antissimétricas** para extrair \( \Delta H \), \( H_{\mathrm{res}} \) e \( \alpha \). :contentReference[oaicite:2]{index=2}
- **Voltagem iSHE sob fatores de confusão:** Os sinais iSHE são pequenos e frequentemente **contaminados por AMR**. Medimos iSHE com modulação de intensidade e usamos uma **pilha de referência** (Py/Ti) para isolar o componente AMR antissimétrico, depois o subtraímos de Py/Pt (e Py/W) para recuperar a contribuição iSHE simétrica. :contentReference[oaicite:3]{index=3}

### Design experimental para cadeia de inferência
1. **Fabricação e calibração:** Pilhas pulverizadas de **Py(30 nm)/NM(6 nm)** (NM ∈ {Pt, W, Cu, Ti}); espessura e rugosidade verificadas com **XRR**; usado **XPS** para diagnosticar a oxidação em Py. :contentReference[oaicite:4]{index=4}
2. **Espectroscopia FMR:** Detecção Lock-in com modulação de campo; ajuste formas de linha derivada-Lorentziana para obter largura de linha vs. frequência → **inclinação linear → \( \alpha \)** por pilha. :contentReference[oaicite:5]{index=5}
3. **Sinal de materiais:** Observado maior aprimoramento de amortecimento com NM de maior número atômico (Pt, W), consistente com o acoplamento spin-órbita mais forte; controlado para a oxidação de Py usando Ti como uma tampa fracamente perturbadora e mudando para **YIG** (FM isolante) para eliminar o vazamento de AMR. **YIG/Pt** produziu o iSHE mais limpo. :contentReference[oaicite:6]{index=6}
4. **Deconvolução iSHE:** iSHE computado subtraindo o traço Py/Ti dominado por AMR de Py/Pt e Py/W; para **YIG/NM**, a linha iSHE é diretamente Lorentziana com sinais opostos para Pt vs W, correspondendo às expectativas de sinal de spin-órbita. :contentReference[oaicite:7]{index=7}

### Resultados (relevantes para a decisão)
- **Ranking para injeção de corrente de spin:** Pt > W ≫ Cu, Ti tanto no aprimoramento de amortecimento quanto na amplitude iSHE; **YIG/Pt** é o par mais robusto devido ao FM isolante e ao forte NM spin-órbita. :contentReference[oaicite:8]{index=8}
- **Controle de fator de confusão:** A oxidação de Py influencia \( \alpha \); estabeleceu uma estratégia de correção prática (controle da camada de cobertura + confirmação XPS) e uma linha de base mais limpa com YIG. :contentReference[oaicite:9]{index=9}
- **Separação de sinal:** O desentrelaçamento AMR/iSHE via **subtração de pilha de referência** produz estimativas iSHE estáveis mesmo com baixo SNR. :contentReference[oaicite:10]{index=10}

### Por que isso importa além da spintrônica
Este é um modelo geral de **medir e inferir** sob ruído e confusão:
- Comece com um modelo governante (LLG), projete um experimento que produza **parâmetros identificáveis** e construa um procedimento de ajuste com **separação explícita de incômodos** (AMR vs iSHE).
- Valide hipóteses de materiais usando **sondas ortogonais** (XRR, XPS) e uma **pilha de referência/controle**.
- Trate o laboratório como um sistema de dados: *também construímos um monitor IoT de baixo custo* (ESP8266 + sensor de fluxo Hall) para proteger o tempo de atividade do FMR com alertas de e-mail automatizados. :contentReference[oaicite:11]{index=11}

**Métodos & dados:** [Relatório completo (PDF)](/assets/pdf/Spintronics__The_New_Electronics.pdf)
**Habilidades essenciais:** projeto experimental baseado em modelo, ajuste de forma de linha, detecção lock-in, tratamento de incertezas, fabricação e validação de filmes finos, deconvolução baseada em referência e instrumentação prática. :contentReference[oaicite:12]{index=12}
