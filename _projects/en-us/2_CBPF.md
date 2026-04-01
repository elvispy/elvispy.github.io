---
page_id: prj_cbpf
layout: page
title: Spin transport by measurement and inference
description: From LLG-based FMR fits to iSHE deconvolution and materials selection
img: assets/img/spintronics.jpeg
importance: 2
category: work
giscus_comments: true
---

## Quantifying spin transport in thin films

Every transistor that switches generates heat. At the nanoscale, that heat is already a fundamental limit — and the question of whether information can be routed through spin rather than charge is one of the central bets in modern electronics. Spintronics works by injecting and detecting **spin currents**, which carry angular momentum without net charge flow and promise lower dissipation.

This project measured and inferred spin-transport properties in ferromagnetic/normal-metal (FM/NM) thin-film bilayers, constructing an end-to-end pipeline from sample fabrication to signal deconvolution. The two key quantities are the **Gilbert damping parameter** \( \alpha \), which governs how quickly spin precession decays, and the **inverse spin Hall effect (iSHE)** voltage, which converts spin current into a measurable electrical signal.

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/spintronics.jpeg" title="Thin-film bilayers for FMR/iSHE" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        FM/NM thin films used for FMR and iSHE measurements.
    </figcaption>
</figure>

### What makes this hard

The challenge is not measuring a single quantity — it is disentangling several effects that overlap at the same experimental frequency and field. The **anisotropic magnetoresistance (AMR)** of the ferromagnet produces a signal at the same resonance condition as the iSHE, and they cannot be separated geometrically. Meanwhile, damping estimates from FMR linewidths are sensitive to sample oxidation: a thin native oxide on the permalloy (Py) surface adds extrinsic linewidth that mimics a larger \( \alpha \).

We addressed both problems experimentally. Lock-in detection with field modulation resolved the derivative-Lorentzian line shapes needed to extract \( \Delta H \) and \( H_{\mathrm{res}} \) across a frequency sweep. The slope of linewidth versus frequency gives \( \alpha \) directly via the LLG model. For iSHE, we used a **reference-stack subtraction**: Py/Ti (where Ti has negligible spin–orbit coupling) provides the pure AMR baseline, which we subtracted from Py/Pt and Py/W to isolate the symmetric iSHE component. For the cleanest signals, we switched to **YIG/Pt** — an insulating ferromagnet — which eliminates AMR leakage entirely and yields iSHE line shapes that are directly Lorentzian.

### Materials results

Across the stacks studied — Py/Pt, Py/W, Py/Cu, Py/Ti — platinum showed the strongest spin-orbit coupling by both metrics: largest damping enhancement and largest iSHE amplitude. Tungsten ranked second. Copper and titanium were weak, consistent with their low atomic number. **YIG/Pt** confirmed the platinum result under cleaner conditions, and the sign reversal between YIG/Pt and YIG/W matched theoretical expectations for the spin Hall angle. Oxidation in the Py-based stacks, diagnosed via XPS and controlled through capping-layer choice, was identified as the leading confounder for damping estimates: a practical correction strategy — cap-layer control combined with XPS verification — keeps \( \alpha \) estimates reliable.

### A general template for noisy inference

What made this project more than a materials survey was the discipline of separating what the model can identify from what the experiment can measure. Starting from LLG, we chose an experimental observable (linewidth slope) that encodes \( \alpha \) cleanly and built a fitting procedure with explicit nuisance separation. The lab setup itself was treated as a data system: we built a low-cost IoT monitor (ESP8266 + Hall flow sensor) to protect FMR uptime with automated email alerts. That same logic — governing model, identifiable parameters, orthogonal controls — is what distinguishes actionable inference from data collection.

**Methods and data:** [Full report (PDF)](/assets/pdf/Spintronics__The_New_Electronics.pdf)
