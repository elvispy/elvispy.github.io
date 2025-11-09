---
page_id: prj_surferbot
layout: page
title: Locomoción Interfacial
description: Física diferenciable para robots impulsados por olas
img: assets/img/surferbot.gif
importance: 1
category: work
related_publications: true
---

# Surfeando la Interfaz: física diferenciable para la locomoción impulsada por ondas

Un "vibrobot" vibratorio puede surfear sobre el agua al **dar forma a las olas que crea**. Esa simple idea abre un programa cuantitativo: construir un modelo donde **las ondas superficiales, el movimiento del cuerpo y la actuación** co-evolucionen, luego hacer que toda la tubería sea **diferenciable** para que el diseño y el control puedan optimizarse directamente.

Nuestro trabajo toma el concepto de SurferBot {% cite Rhee_2022 %} y lo convierte en un **laboratorio computacional** para la locomoción interfacial, basado en la teoría {% cite Benham_Devauchelle_Thomson_2024 %} e implementado en **Julia** con solucionadores diferenciables.

<div style="width: 100%; display: flex; justify-content: center;">
  <div style="position: relative; width: 80%; padding-bottom: 45%; height: 0; overflow: hidden;">
    <iframe 
      src="https://www.youtube.com/embed/PQF6yGAs-TA?autoplay=1&mute=1&si=0qH_j8Lccw4ljD_3" 
      title="Reproductor de video de YouTube"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin" 
      allowfullscreen>
    </iframe>
  </div>
</div>

---

## Por qué este problema importa

En una interfaz aire-agua, **la tensión superficial, las ondas de gravedad y los efectos de masa añadida** dominan. Los pequeños actuadores pueden crear **campos de ondas asimétricos** que transportan momento y generan empuje. Diseñar tales sistemas por prueba y error es lento porque el rendimiento depende de muchas opciones acopladas: forma del cuerpo, distribución de masa, **ubicación del motor**, **frecuencia de accionamiento y forma de onda**, y parámetros ambientales.

Un simulador diferenciable nos permite **optimizar** estas opciones directamente con respecto a objetivos como la velocidad promedio, el empuje por potencia o el seguimiento de trayectoria, con **gradientes de la física**, no heurísticas.

---

## Enfoque de modelado

Modelamos el robot como un cuerpo flotante, posiblemente flexible, restringido a la interfaz e impulsado por un actuador interno que varía con el tiempo. El fluido circundante está representado por un **modelo de superficie libre de pequeña amplitud que resuelve la interfaz**, compatible con la capilaridad y la amortiguación viscosa en las escalas de interés. El acoplamiento cuerpo-onda produce una deriva neta cuando las ondas radiadas están **sesgadas direccionalmente** (como en {% cite Benham_Devauchelle_Thomson_2024 %}).

Las salidas clave incluyen la velocidad promediada en el tiempo, el empuje, la potencia hidrodinámica y el flujo de momento de onda. Estos se calculan a partir del estado y se utilizan como **funciones de pérdida** para el diseño y el control.

---

## Simulación totalmente diferenciable en Julia

La tubería es **diferenciable de extremo a extremo** con respecto a los parámetros \(\theta\) (geometría, ubicación del actuador, frecuencia, coeficientes de forma de onda):

- La actualización de estado utiliza soluciones lineales y no lineales \(A(\theta)\,y=b(\theta)\) con reglas de modo inverso personalizadas para que \(\nabla_\theta \mathcal{L}\) se obtenga mediante **dos soluciones lineales** (directa y adjunta) por paso de tiempo, manteniendo la memoria limitada y los gradientes estables.
- La cinemática de las ondas y la dinámica del cuerpo están codificadas para evitar interruptores no diferenciables; el contacto con la interfaz se maneja a través de restricciones suaves consistentes con la teoría de pendiente pequeña.
- Exponemos los productos Jacobiano-vector y vector-Jacobiano a la AD, lo que permite **métodos de primer orden** y actualizaciones **cuasi-Newton** sobre grandes espacios de parámetros.

Esto produce **gradientes basados en la física** para objetivos como la velocidad, el empuje por vatio o la robustez a las perturbaciones.

---

## Optimización sobre diseño y control

Con los gradientes disponibles, exploramos:

- **Parámetros de diseño:** longitud/ancho del casco, distribución de masa, **posición del motor**, rigidez de montaje.
- **Parámetros de control:** **frecuencia** de accionamiento, coeficientes de forma de onda multiarmónica, ciclos de trabajo.
- **Entorno:** tensión superficial, viscosidad, profundidad, corrientes de fondo.

Ejecutamos la **optimización de gradiente de inicio múltiple** para ubicar regiones de alto rendimiento, luego ajustamos **sustitutos** para barridos rápidos y **optimización bayesiana** para la búsqueda global bajo restricciones (por ejemplo, presupuesto de energía, geometrías fabricables).

---

## Preguntas científicas que abordamos

1. **Generación de empuje:** ¿cómo crean modos de onda específicos y relaciones de fase un flujo de momento direccional en la interfaz?
2. **Eficiencia:** ¿qué combinaciones de ubicación y accionamiento reducen la radiación desperdiciada al tiempo que maximizan la deriva neta?
3. **Robustez:** ¿qué diseños mantienen el rendimiento ante los cambios en las propiedades del fluido o los pequeños errores de fabricación?
4. **Control:** ¿podemos dar forma a los paquetes de ondas en el tiempo para navegar o mantener la estación contra las perturbaciones?

---

## De la teoría al hardware

El simulador predice las **ventanas operativas** donde la radiación de ondas produce propulsión sin saturar las pérdidas por amortiguación viscosa o generar modos contraproducentes. Debido a que los gradientes provienen de las ecuaciones gobernantes, el mismo marco admite la **inferencia de parámetros** de las trayectorias experimentales y el **ajuste del controlador** en dispositivos reales.

---

## Referencias y trabajos relacionados

- Concepto y experimentos de SurferBot: {% cite Rhee_2022 %}
- Teoría de la propulsión impulsada por ondas en interfaces: {% cite Benham_Devauchelle_Thomson_2024 %}

---

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='elvispy/flexible_surferbot_v2' %}
    {% include repository/repo.liquid repository='elvispy/surferbot-differentiable' %}
</div>
