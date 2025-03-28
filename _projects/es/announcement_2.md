---
layout: page
title: ¡Fui becario de verano en el CERN!.
description:
importance: 2
category: work
---

## Trabajé en el grupo de software para experimentos (EP-SFT) bajo la supervisión de Graeme Stewart en el CERN.

Este año, tuve la suerte de ser seleccionado para el [Programa de Estudiantes de Verano del CERN](https://home.cern/summer-student-programme) para la promoción de 2024. Incluso ha habido cobertura mediática sobre mi experiencia:

<div style="float: left; margin: 10px;">
    <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7233730225589673984?compact=1" 
        height="600" width="450" frameborder="0" allowfullscreen="" title="Embedded post">
    </iframe>
</div>
El programa de estudiantes de verano es una oportunidad para trabajar en un proyecto en el Gran Colisionador de Hadrones más grande del mundo. Me asignaron un proyecto en el grupo de software para experimentos en el CERN, bajo la supervisión de Graeme Stewart.

### Optimización de Julia para aplicaciones de física de altas energías

Julia ha surgido como una herramienta poderosa para la computación científica, combinando la funcionalidad de alto nivel con un rendimiento que rivaliza con C/C++. Sin embargo, su dependencia de archivos precompilados causa retrasos en el inicio, lo que plantea desafíos para los sistemas distribuidos. Para abordar esto, desarrollamos un flujo de trabajo que precompila y almacena en caché las dependencias de Julia en el sistema de archivos compartido CernVM-FS (CVMFS), lo que permite una distribución perfecta entre los nodos de cómputo.

Probando con los paquetes Julia Jet Reconstruction y Geant4 wrapper, logramos reducciones en el tiempo de inicio de hasta el 97%. Nuestro framework también admite la compilación cruzada para diversas microarquitecturas, lo que garantiza un rendimiento eficiente sin degradación. Este enfoque hace que Julia sea más accesible para la física de altas energías y los entornos de computación distribuida.

Presenté mi trabajo en el [Julia for High Energy Physics 2024 Workshop](https://indico.cern.ch/event/1410341/contributions/6135602/).

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% include repository/repo.liquid repository='JuliaComputing/DepotDelivery.jl' %}

</div>
