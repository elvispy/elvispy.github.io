---
page_id: prj_cbpf
layout: page
title: Transporte de espín por medición e inferencia
description: Desde ajustes de FMR basados en LLG hasta deconvolución de iSHE y selección de materiales
img: assets/img/spintronics.jpeg
importance: 2
category: work
giscus_comments: true
---

## Cuantificación del transporte de espín con experimentos basados en modelos

Los dispositivos modernos se enfrentan a límites térmicos y cuánticos. La espintrónica enruta la información a través de **corrientes de espín** en lugar de solo carga, prometiendo una menor disipación. Este proyecto midió e **infirió** las propiedades de transporte de espín en bicapas delgadas FM/NM utilizando un pipeline que vincula el modelo de **Landau–Lifshitz–Gilbert (LLG)**, la espectroscopia de **resonancia ferromagnética (FMR)** y el **efecto Hall de espín inverso (iSHE)**. El trabajo abarca desde la fabricación de muestras hasta el procesamiento de señales y vincula cada decisión a una cantidad computable: el **amortiguamiento de Gilbert** \( \alpha \) y un proxy de voltaje iSHE para la corriente de espín. :contentReference[oaicite:1]{index=1}

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/spintronics.jpeg" title="Bicapas de película delgada para FMR/iSHE" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        Películas delgadas FM/NM utilizadas para mediciones de FMR e iSHE.
    </figcaption>
</figure>

### Qué medimos y por qué es difícil
- **LLG → Ancho de línea FMR:** Usando LLG, la pendiente ancho de línea-frecuencia de FMR da el **amortiguamiento** \( \alpha \). Las estimaciones limpias requieren detección lock-in, modelado de la forma de la línea y un manejo cuidadoso de la anisotropía. Construimos un pipeline de FMR de barrido de frecuencia y ajustamos **lorentzianas simétricas/antisimétricas** para extraer \( \Delta H \), \( H_{\mathrm{res}} \) y \( \alpha \). :contentReference[oaicite:2]{index=2}
- **Voltaje iSHE bajo factores de confusión:** Las señales iSHE son pequeñas y a menudo están **contaminadas por AMR**. Medimos iSHE con modulación de intensidad y utilizamos una **pila de referencia** (Py/Ti) para aislar el componente AMR antisimétrico, luego lo restamos de Py/Pt (y Py/W) para recuperar la contribución iSHE simétrica. :contentReference[oaicite:3]{index=3}

### Diseño experimental a cadena de inferencia
1. **Fabricación y calibración:** Pulverización de pilas de **Py(30 nm)/NM(6 nm)** (NM ∈ {Pt, W, Cu, Ti}); verificación del grosor y la rugosidad con **XRR**; uso de **XPS** para diagnosticar la oxidación en Py. :contentReference[oaicite:4]{index=4}
2. **Espectroscopia FMR:** Detección Lock-in con modulación de campo; ajuste de formas de línea lorentzianas derivadas para obtener el ancho de línea vs. frecuencia → **pendiente lineal → \( \alpha \)** por pila. :contentReference[oaicite:5]{index=5}
3. **Señal de materiales:** Se observó una mayor mejora del amortiguamiento con un NM de mayor número atómico (Pt, W), consistente con un acoplamiento espín-órbita más fuerte; se controló la oxidación de Py utilizando Ti como una capa de recubrimiento débilmente perturbadora y cambiando a **YIG** (FM aislante) para eliminar la fuga de AMR. **YIG/Pt** produjo el iSHE más limpio. :contentReference[oaicite:6]{index=6}
4. **Deconvolución iSHE:** Se calculó el iSHE restando la traza de Py/Ti dominada por AMR de Py/Pt y Py/W; para **YIG/NM**, la línea iSHE es directamente lorentziana con signos opuestos para Pt vs W, coincidiendo con las expectativas del signo espín-órbita. :contentReference[oaicite:7]{index=7}

### Resultados (relevantes para la decisión)
- **Ranking para la inyección de corriente de espín:** Pt > W ≫ Cu, Ti tanto en la mejora del amortiguamiento como en la amplitud de iSHE; **YIG/Pt** es el par más robusto debido al FM aislante y al NM fuerte de espín-órbita. :contentReference[oaicite:8]{index=8}
- **Control de factores de confusión:** La oxidación de Py sesga \( \alpha \); se estableció una estrategia de corrección práctica (control de la capa de recubrimiento + confirmación XPS) y una línea de base más limpia con YIG. :contentReference[oaicite:9]{index=9}
- **Separación de señales:** El desenredamiento AMR/iSHE a través de la **sustracción de la pila de referencia** produce estimaciones de iSHE estables incluso con baja SNR. :contentReference[oaicite:10]{index=10}

### Por qué esto importa más allá de la espintrónica
Esta es una plantilla general de **medir e inferir** bajo ruido y confusión:
- Comience con un modelo rector (LLG), diseñe un experimento que produzca **parámetros identificables** y construya un procedimiento de ajuste con **separación explícita de molestias** (AMR vs iSHE).
- Valide las hipótesis de materiales utilizando **sondas ortogonales** (XRR, XPS) y una **pila de referencia/control**.
- Trate el laboratorio como un sistema de datos: *también construimos un monitor IoT de bajo costo* (ESP8266 + sensor de flujo Hall) para proteger el tiempo de actividad de FMR con alertas de correo electrónico automatizadas. :contentReference[oaicite:11]{index=11}

**Métodos y datos:** [Informe completo (PDF)](/assets/pdf/Spintronics__The_New_Electronics.pdf)
**Habilidades centrales:** diseño experimental basado en modelos, ajuste de la forma de la línea, detección lock-in, manejo de la incertidumbre, fabricación y validación de películas delgadas, deconvolución basada en referencias e instrumentación práctica. :contentReference[oaicite:12]{index=12}
