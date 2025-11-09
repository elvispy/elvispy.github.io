---
page_id: prj_bioreactor
layout: page
title: Acoplamento de Crescimento, Fluxo e Otimização em Sistemas Complexos
description: Integrando crescimento biológico e dinâmica de fluidos em vastos espaços de design
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
---

# Integrando vida e fluxo: rumo a biorreatores preditivos para carne cultivada

### Uma nova fronteira de modelagem

Nenhum framework existente acoplou totalmente o **crescimento biológico** com a **dinâmica de fluidos multifásica** em todo o enorme espaço de design dos biorreatores modernos.
Os modelos tradicionais tratam o meio de cultura como estático ou as células como traçadores passivos. Na realidade, a proliferação celular, o transporte de oxigênio e a estrutura do fluxo coevoluem: cada um determina o outro. Capturar essa interação enquanto abrangemos centenas de possíveis geometrias, volumes de enchimento e programações de agitação – é a chave para construir biorreatores que podem escalar a carne cultivada da curiosidade de laboratório para a tecnologia alimentar global.

### Por que isso importa

A carne cultivada promete reduzir a pegada ambiental da agricultura, mas seu sucesso depende do **desempenho do biorreator**.
Dentro desses dispositivos, bilhões de células animais crescem suspensas em um meio rico em nutrientes que deve permanecer bem misturado e bem oxigenado. O **biorreator de agitação**, uma bolsa flexível que se inclina ritmicamente como um berço, oferece uma alternativa suave e escalável aos tanques acionados por impulsor. No entanto, a mesma agitação que mistura os nutrientes também pode separar as células.
Ajustar esses parâmetros experimentalmente é proibitivamente caro e lento. Cada execução de teste consome instalações estéreis, semanas de tempo de cultura e meios de crescimento caros. A simulação preditiva é, portanto, essencial.

### O desafio científico

Este problema está na interseção da **mecânica de fluidos multifásica não Newtoniana**, **fenômenos de transporte** e **biologia computacional**.
A superfície livre do fluido se move em um **quadro não inercial**, a viscosidade do meio evolui à medida que as células proliferam e as próprias células modificam o campo de fluxo por meio do consumo local de oxigênio e do arrasto.
O CFD convencional não consegue resolver tais dinâmicas acopladas e os modelos biológicos existentes ignoram o fluxo completamente. Nosso objetivo é unificá-los.

### Nossa abordagem

Na Brown, estamos desenvolvendo o primeiro **framework computacional de código aberto** que integra a **dinâmica celular baseada em agentes** dentro de um solucionador multifásico de **volume de fluido (VOF)** para biorreatores de agitação.
Este modelo prevê a transferência de oxigênio, gradientes de nutrientes e tensões de cisalhamento diretamente a partir de princípios básicos, enquanto rastreia como esses campos afetam o crescimento local da biomassa. Como a simulação numérica direta de cada configuração é computacionalmente cara, incorporamos o solucionador em um **modelo substituto baseado em dados** que aprende com execuções de alta fidelidade. Combinado com a **otimização Bayesiana**, isso permite a exploração sistemática de milhares de combinações de design – geometria, frequência de agitação, amplitude, reologia do meio – a uma fração do custo computacional.

Este trabalho estabelece uma ponte entre a **mecânica do contínuo e os sistemas vivos**. Ele estende a modelagem clássica de fluxo multifásico para um regime onde o "fluido" cresce, consome e se adapta.
Ao resolver como o fornecimento de oxigênio e o estresse mecânico influenciam os resultados celulares, o framework fornece critérios quantitativos para ambientes hidrodinâmicos "seguros para células" – algo anteriormente definido apenas empiricamente.

### Impacto mais amplo

O resultado é uma ferramenta preditiva e reproduzível para a biotecnologia sustentável.
Ao substituir a prototipagem física dispendiosa por um design aberto baseado em simulação, podemos acelerar o aumento da produção de carne cultivada e sistemas de bioprodução relacionados, como vacinas, terapias celulares e fabricação de proteínas.
Todo o código e conjuntos de dados são liberados abertamente para promover a validação e reutilização da comunidade.

Para detalhes técnicos, consulte [Kim, Harris & Cimpeanu (2025)](https://arxiv.org/abs/2504.05421) ou explore o [repositório BioReactor](https://github.com/rcsc-group/BioReactor).

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}  
</div>
