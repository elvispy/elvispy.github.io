---
page_id: prj_bioreactor
layout: page
title: Otimização do projeto de biorreatores
description: Simulando o Futuro da Carne.
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
---

# 🌱 Simulando o Futuro da Carne: Uma Dança Fluida em Bifes Cultivados em Laboratório

Imagine um mundo onde seu hambúrguer não venha de uma vaca pastando em um campo, mas de um biorreator zumbindo silenciosamente em um laboratório. Isso não é ficção científica – é a promessa da **carne cultivada**, uma alternativa sustentável à pecuária tradicional. Mas aqui está a reviravolta: cultivar carne a partir de células não se trata apenas de biologia. Trata-se também de resolver um _quebra-cabeça de dinâmica de fluidos_.

---

## O Problema: Por que Biorreatores Oscilantes Precisam de um “Toque Gentil”

A carne cultivada começa com células animais se multiplicando em um caldo rico em nutrientes dentro de biorreatores. Entre estes, os **biorreatores oscilantes** – imagine uma bandeja rasa inclinando-se ritmicamente como uma gangorra – são estrelas em ascensão. Eles têm o potencial de serem escaláveis e mais suaves para as células frágeis do que os tanques tradicionais com lâminas giratórias. Mas há um problema: se o movimento de oscilação for muito agressivo, as células são maltratadas por fluxos caóticos. Se for muito tímido, o oxigênio e os nutrientes se acumulam de forma desigual, matando as células de fome.

Então, como encontramos o ritmo perfeito?

---

## Decifrando o Código com Dinâmica dos Fluidos Computacional

Entra o **Basilisk**, uma plataforma de dinâmica de fluidos de código aberto. Meu laboratório trabalha em simulações de um biorreator oscilante – um "saco de células" retangular cheio de água (imitando a cultura celular) e ar {% cite kim2025simulationmodelingframeworkfluid %}. Simulamos como os fluidos se agitam, giram e se misturam à medida que o biorreator se inclina, rastreando tudo, desde bolhas de oxigênio até forças invisíveis que podem estressar as células.

O objetivo? Para responder a três grandes questões:

1. **Como o movimento de oscilação cria "correntes ocultas" que misturam os nutrientes?**
2. **Onde o oxigênio flui – ou estagna – dentro do caldo?**
3. **Quando a agitação suave se transforma em caos prejudicial às células?**

---

## O Efeito “Rio Lento”: Fluxo Contínuo

Imagine um rio fluindo preguiçosamente em loops. Em nossas simulações, descobrimos algo semelhante: quando o biorreator balança, ele gera vórtices giratórios que se fundem ao longo do tempo em **fluxos contínuos**. Esses fluxos atuam como esteiras subaquáticas, empurrando nutrientes e oxigênio em direção às células famintas.

A oscilação mais rápida amplifica esses fluxos, melhorando a mistura – mas apenas até certo ponto. Force demais e o fluxo se fratura em turbulência, como um rio sereno se transformando em corredeiras. As células, como pequenos caiaquistas, não sobreviveriam à viagem.

---

## A Dança Secreta do Oxigênio: Ressonância e Refrescamento

O oxigênio é vida para as células, mas é complicado de fornecer. Nossas simulações revelaram um fenômeno fascinante: em frequências de oscilação específicas, o biorreator entra em **ressonância**. Pense nisso como empurrar um balanço no momento certo – o movimento do fluido sincroniza-se perfeitamente com a oscilação, criando ondas que espirram fluido rico em oxigênio mais profundamente no caldo. Este "ponto ideal" aumenta a transferência de oxigênio sem agitação 粗暴.

Mas a ressonância é uma faca de dois gumes. Em alguns casos, amplificou o estresse perto das paredes – um lembrete de que cada escolha de design requer equilíbrio.

---

## Por que Isso Importa: Do Laboratório à Mesa de Jantar

A carne cultivada pode reduzir drasticamente a pegada ambiental da agricultura, mas aumentar a produção é um desafio monumental. Nosso trabalho une biologia e engenharia, oferecendo um roteiro para:

- **Otimizar projetos de biorreatores computacionalmente** – economizando anos de tentativa e erro.
- **Prever condições amigáveis ​​às células** – chega de adivinhar qual velocidade de oscilação evita a turbulência.
- **Democratizar ferramentas** – nosso código de código aberto permite que pesquisadores em todo o mundo ajustem e testem biorreatores virtuais.

O sonho? Biorreatores acessíveis e de grande escala que produzem bifes suculentos cultivados em laboratório com energia mínima e zero sofrimento animal.

---

## O Que Vem a Seguir?

Estamos expandindo nossas simulações para biorreatores 3D com formatos de sacos de células do mundo real e modelando os fluidos pegajosos e não newtonianos que as culturas de células reais se assemelham. No futuro, integraremos o crescimento celular virtual para prever como pequenos ajustes no fluxo de fluido poderiam multiplicar o rendimento da carne.

---

## Junte-se ao Movimento

Não se trata apenas de equações e código – trata-se de remodelar a forma como a humanidade se alimenta. Se você está curioso para brincar com nossas simulações ou mergulhar mais fundo, confira nosso [repositório GitHub](https://github.com/rcsc-group/BioReactor) ou leia o estudo completo [aqui](https://arxiv.org/abs/2504.05421).

O futuro da alimentação é uma dança de fluidos, células e inovação. Vamos torná-lo sustentável – um biorreator simulado de cada vez. 🌍🔬

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}  
</div>
