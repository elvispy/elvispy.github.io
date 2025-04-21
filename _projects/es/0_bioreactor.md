---
page_id: prj_bioreactor
layout: page
title: Optimización del diseño de biorreactores
description: Simulando el Futuro de la Carne.
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
---

# 🌱 Simulando el Futuro de la Carne: Una Danza de Fluidos en Filetes Cultivados en Laboratorio

Imagina un mundo donde tu hamburguesa no provenga de una vaca pastando en un campo, sino de un biorreactor zumbando silenciosamente en un laboratorio. Esto no es ciencia ficción, es la promesa de la **carne cultivada**, una alternativa sostenible a la ganadería tradicional. Pero aquí está el giro: cultivar carne a partir de células no se trata solo de biología. También se trata de resolver un _rompecabezas de dinámica de fluidos_.

---

## El Problema: Por qué los Biorreactores Oscilantes Necesitan un "Toque Suave"

La carne cultivada comienza con células animales multiplicándose en un caldo rico en nutrientes dentro de biorreactores. Entre estos, los **biorreactores oscilantes** (piensa en una bandeja poco profunda que se inclina rítmicamente como un balancín) son estrellas en ascenso. Tienen el potencial de ser escalables y más suaves con las células frágiles que los tanques tradicionales con cuchillas giratorias. Pero hay una trampa: si el movimiento de balanceo es demasiado agresivo, las células se ven golpeadas por flujos caóticos. Si es demasiado tímido, el oxígeno y los nutrientes se acumulan de manera desigual, matando de hambre a las células.

Entonces, ¿cómo encontramos el ritmo perfecto?

---

## Descifrando el Código con Dinámica de Fluidos Computacional

Usamos **Basilisk**, una plataforma de dinámica de fluidos de código abierto. Mi laboratorio trabaja en simulaciones de un biorreactor oscilante: una "bolsa celular" rectangular llena de agua (imitando el cultivo celular) y aire cite kim2025simulationmodelingframeworkfluid . Simulamos cómo los fluidos chapotean, giran y se mezclan a medida que el biorreactor se inclina, rastreando todo, desde burbujas de oxígeno hasta fuerzas invisibles que podrían estresar a las células.

¿El objetivo? Responder tres grandes preguntas:

1. **¿Cómo crea el movimiento de balanceo "corrientes ocultas" que mezclan los nutrientes?**
2. **¿Dónde fluye (o se estanca) el oxígeno dentro del caldo?**
3. **¿Cuándo la agitación suave se convierte en caos que daña las células?**

---

## El Efecto "Río Lento": Flujo Constante

Imagínate un río que fluye perezosamente en bucles. En nuestras simulaciones, descubrimos algo similar: cuando el biorreactor se balancea, genera vórtices giratorios que se fusionan con el tiempo en **corrientes constantes**. Estas corrientes actúan como cintas transportadoras submarinas, empujando nutrientes y oxígeno hacia las células hambrientas.

Un balanceo más rápido amplifica estas corrientes, mejorando la mezcla, pero solo hasta cierto punto. Si se empuja demasiado, el flujo se fractura en turbulencias, como un río sereno que se transforma en rápidos de aguas bravas. Las células, como pequeños kayakistas, no sobrevivirían al viaje.

---

## La Danza Secreta del Oxígeno: Resonancia y Refresco

El oxígeno es vida para las células, pero es difícil de administrar. Nuestras simulaciones revelaron un fenómeno fascinante: a frecuencias de balanceo específicas, el biorreactor entra en **resonancia**. Piensa en ello como empujar un columpio en el momento justo: el movimiento del fluido se sincroniza perfectamente con el balanceo, creando ondas que salpican fluido rico en oxígeno más profundamente en el caldo. Este "punto óptimo" aumenta la transferencia de oxígeno sin agitación bruta.

Pero la resonancia es un arma de doble filo. En algunos casos, amplificó el estrés cerca de las paredes, un recordatorio de que cada elección de diseño requiere equilibrio.

---

## Por Qué Esto Importa: Del Laboratorio a la Mesa

La carne cultivada podría reducir drásticamente la huella ambiental de la agricultura, pero escalar la producción es un desafío monumental. Nuestro trabajo une la biología y la ingeniería, ofreciendo una hoja de ruta para:

- **Optimizar los diseños de biorreactores computacionalmente**, ahorrando años de prueba y error.
- **Predecir condiciones amigables para las células**, sin tener que adivinar qué velocidad de balanceo evita las turbulencias.
- **Democratizar las herramientas**: nuestro código de código abierto permite a los investigadores de todo el mundo modificar y probar biorreactores virtuales.

¿El sueño? Biorreactores asequibles y a gran escala que produzcan jugosos filetes cultivados en laboratorio con una energía mínima y cero sufrimiento animal.

---

## ¿Qué Sigue?

Estamos expandiendo nuestras simulaciones a biorreactores 3D con formas de bolsas celulares del mundo real y modelando los fluidos viscosos no newtonianos que se asemejan a los cultivos celulares reales. En el futuro, integraremos el crecimiento celular virtual para predecir cómo los pequeños ajustes al flujo de fluidos podrían multiplicar los rendimientos de carne.

---

## Únete al Movimiento

Esto no se trata solo de ecuaciones y código, se trata de remodelar la forma en que come la humanidad. Si tienes curiosidad por jugar con nuestras simulaciones o profundizar, consulta nuestro [repositorio de GitHub](https://github.com/rcsc-group/BioReactor) o lee el estudio completo [aquí](https://arxiv.org/abs/2504.05421).

El futuro de la alimentación es una danza de fluidos, células e innovación. Hagámoslo sostenible, un biorreactor simulado a la vez. 🌍🔬

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}  
</div>
