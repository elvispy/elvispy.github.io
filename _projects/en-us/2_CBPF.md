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

A thin native oxide on permalloy (Py) inflates FMR linewidths and biases the **Gilbert damping parameter** α upward — invisible unless you track the slope across many frequencies and cross-check surface chemistry by XPS. Extracting the spin Hall angle of the adjacent heavy-metal layer via the **inverse spin Hall effect (iSHE)** is further complicated by anisotropic magnetoresistance (AMR) of the ferromagnet, which generates a voltage at the same resonance condition that cannot be separated from the iSHE signal by geometry alone.

<figure style="float: left; margin: 10px; max-width: 300px;">
    {% include figure.liquid loading="eager" path="assets/img/spintronics.jpeg" title="Thin-film bilayers for FMR/iSHE" class="img-fluid rounded z-depth-1" style="width: 100%;" %}
    <figcaption style="text-align: center; margin-top: 5px;">
        FM/NM thin films used for FMR and iSHE measurements.
    </figcaption>
</figure>

We measured four bilayer systems — Py/Pt, Py/W, Py/Cu, Py/Ti — and later YIG/Pt and YIG/W. For α, lock-in detection with field modulation extracted derivative-Lorentzian line shapes, and XPS-guided capping-layer selection kept the oxide contribution identifiable. For iSHE, Py/Ti served as the AMR reference: titanium has negligible spin–orbit coupling, so the voltage in that stack is pure baseline. Subtracting it from Py/Pt and Py/W isolates the symmetric iSHE component. Switching to YIG — an insulating ferromagnet with no charge current in the magnetic layer — removed the leakage entirely, leaving purely Lorentzian iSHE line shapes.

Platinum's spin-orbit coupling was the strongest by both measures simultaneously — largest damping enhancement and largest iSHE amplitude — a consistency that points to a real material effect rather than artefact. Tungsten was clearly second; copper and titanium were effectively zero, consistent with their weak spin–orbit coupling. The sign reversal between YIG/Pt and YIG/W confirmed the theoretical prediction for the spin Hall angle. To keep the FMR rig running through overnight sweeps, we added a low-cost IoT monitor (ESP8266 + Hall flow sensor) with automated email alerts — it caught at least two coolant interruptions before they could spoil measurements.

**Methods and data:** [Full report (PDF)](/assets/pdf/Spintronics__The_New_Electronics.pdf)
