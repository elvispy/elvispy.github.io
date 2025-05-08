---
page_id: prj_bioreactor
layout: page
title: Optimización del diseño de biorreactores
description: Simulando el futuro de la carne.
img: assets/img/bioreactor.gif
importance: 1
category: work
related_publications: true
---

# 🌱 Simulando el futuro de la carne: Una danza de fluidos en filetes cultivados en laboratorio

Imagina un mundo donde tu hamburguesa no provenga de una vaca pastando en un campo, sino de un biorreactor zumbando silenciosamente en un laboratorio. Esto no es ciencia ficción: es la promesa de la **carne cultivada**, una alternativa sostenible a la ganadería tradicional. Pero aquí está el giro: cultivar carne a partir de células no se trata solo de biología. También se trata de resolver un _rompecabezas de dinámica de fluidos_.

<div style="text-align: center; margin: 2em 0;">
  <img src="{{ '/assets/img/bioreactor.gif' | relative_url }}" alt="Simulación de biorreactor" style="max-width: 80%; height: auto;" />
  <p style="font-style: italic; font-size: 0.9em; margin-top: 0.5em;">
    Una de las simulaciones realizadas en {% cite kim2025simulationmodelingframeworkfluid %}.
  </p>
</div>

---

## Cuando el balanceo es demasiado brusco y el reposo demasiado estático

La carne cultivada comienza con células animales que proliferan en un caldo rico en nutrientes dentro de biorreactores. Entre estos, los **biorreactores oscilantes** (imagina una bandeja poco profunda que se inclina rítmicamente como un balancín) son opciones prometedoras. Tienen el potencial de ser escalables y más suaves con las células frágiles que los tanques tradicionales con aspas giratorias. Pero hay una trampa: si el movimiento de balanceo es demasiado agresivo, las células se ven golpeadas por flujos caóticos. Si es demasiado tímido, el oxígeno y los nutrientes se acumulan de manera desigual, matando de hambre a las células.

Entonces, ¿cómo encontramos el ritmo perfecto?

---

## Descifrando el código con Dinámica de Fluidos Computacional

Utilizamos **Basilisk**, una plataforma de dinámica de fluidos de código abierto. Mi laboratorio trabajó en simulaciones de un biorreactor oscilante: una "bolsa celular" rectangular llena de agua (imitando el cultivo celular) y aire {% cite kim2025simulationmodelingframeworkfluid %}. Simulamos cómo los fluidos chapotean, giran y se mezclan a medida que el biorreactor se inclina, rastreando todo, desde el oxígeno y el transporte de especies.

¿El objetivo? Responder a tres grandes preguntas:

1. **¿Cómo crea el movimiento de balanceo "corrientes ocultas" que mezclan los nutrientes?**
2. **¿Dónde fluye (o se estanca) el oxígeno dentro del caldo?**
3. **¿Cuándo la agitación suave se convierte en caos que daña las células?**
4. **¿Podemos optimizar el diseño del biorreactor para maximizar el crecimiento celular?**

---

## Corrientes lentas agitan, constantes y seguras

Imagina un río que fluye perezosamente en bucles. En nuestras simulaciones, descubrimos algo similar: cuando el biorreactor se balancea, genera vórtices giratorios que se fusionan con el tiempo en **corrientes constantes**. Estas corrientes actúan como cintas transportadoras submarinas, empujando nutrientes y oxígeno hacia las células hambrientas.

Un balanceo más rápido amplifica estas corrientes, mejorando la mezcla, pero solo hasta cierto punto. Si se empuja demasiado, el flujo se fractura en turbulencias, como un río sereno que se transforma en rápidos de aguas bravas. Las células, como pequeños kayakistas, no sobrevivirían al viaje.

---

## La danza secreta del oxígeno: resonancia y refresco

El oxígeno es vida para las células, pero es difícil de administrar. Creemos que, a frecuencias de balanceo específicas, el biorreactor entra en **resonancia**. Piénsalo como empujar un columpio en el momento justo: el movimiento del fluido se sincroniza perfectamente con el balanceo, creando ondas que salpican fluido rico en oxígeno más profundamente en el caldo. Este "punto óptimo" aumenta la transferencia de oxígeno sin agitación brusca.

Pero la resonancia es un arma de doble filo. En algunos casos, amplificó el estrés cerca de las paredes, un recordatorio de que cada elección de diseño requiere equilibrio.

---

## De bandejas de agitación a filetes chisporroteantes

La carne cultivada podría reducir drásticamente la huella ambiental de la agricultura, pero escalar la producción es un desafío monumental. Nuestro trabajo une la biología y la ingeniería, ofreciendo una hoja de ruta para:

- **Optimizar los diseños de biorreactores computacionalmente**, ahorrando años de prueba y error.
- **Predecir condiciones amigables para las células**, sin tener que adivinar qué velocidad de balanceo evita las turbulencias.
- **Democratizar las herramientas**: nuestro código de código abierto permite a los investigadores de todo el mundo modificar y probar biorreactores virtuales.

---

## ¿Qué sigue?

Estamos expandiendo nuestras simulaciones a biorreactores 3D con formas de bolsas celulares del mundo real y modelando los fluidos viscosos no newtonianos que se asemejan a los cultivos celulares reales. En el futuro, integraremos el crecimiento celular virtual para predecir cómo los pequeños ajustes al flujo de fluidos podrían multiplicar los rendimientos de carne.

Esto no se trata solo de ecuaciones y código: se trata de remodelar la forma en que come la humanidad. Si tienes curiosidad por jugar con nuestras simulaciones o profundizar, consulta nuestro [repositorio de GitHub](https://github.com/rcsc-group/BioReactor) o lee el estudio completo [aquí](https://arxiv.org/abs/2504.05421).

El futuro de la alimentación es una danza de fluidos, células e innovación. Hagámoslo sostenible, un biorreactor simulado a la vez. 🌍🔬

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='rcsc-group/BioReactor' %}  
</div>
