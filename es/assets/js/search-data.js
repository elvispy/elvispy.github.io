
const currentUrl = window.location.href;
const siteUrl = "https://elvispy.github.io"; 
let updatedUrl = currentUrl.replace("https://elvispy.github.io", "");
if (currentUrl.length == updatedUrl.length && currentUrl.startsWith("http://127.0.0.1")) {
  const otherSiteUrl = siteUrl.replace("localhost", "127.0.0.1");
  updatedUrl = currentUrl.replace(otherSiteUrl + "", "");
}
if ("es".length > 0) {
  updatedUrl = updatedUrl.replace("/es", "");
}
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-acerca-de",
    title: "acerca de",
    section: "",
    handler: () => {
      window.location.href = "/es/";
    },
  },{id: "nav-proyectos",
          title: "proyectos",
          description: "Una colección creciente de mis proyectos geniales.",
          section: "",
          handler: () => {
            window.location.href = "/es/projects/";
          },
        },{id: "nav-repositorios",
          title: "repositorios",
          description: "¡Una colección de mis repositorios favoritos!",
          section: "",
          handler: () => {
            window.location.href = "/es/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "",
          handler: () => {
            window.location.href = "/es/cv/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
      
        title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
      section: "",
      handler: () => {
        
          window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
        
      },
    },{id: "post-displaying-external-posts-on-your-al-folio-blog",
      
        title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "",
      handler: () => {
        
          window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
        
      },
    },{id: "news-um-anúncio-simples-em-uma-linha",
          title: 'Um anúncio simples em uma linha.',
          description: "",
          section: "",},{id: "news-um-anúncio-longo-com-detalhes",
          title: 'Um anúncio longo com detalhes',
          description: "",
          section: "",handler: () => {
              window.location.href = "/es/news/announcement_2/";
            },},{id: "news-um-anúncio-simples-em-uma-linha-com-markdown-emoji-sparkles-smile",
          title: 'Um anúncio simples em uma linha com Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "",},{id: "news-nuestro-artículo-impact-of-a-rigid-sphere-onto-an-ellastic-membrane-fue-aceptado-en-el-proceedings-of-the-royal-society-a",
          title: 'Nuestro artículo “Impact of a rigid sphere onto an ellastic membrane” fue aceptado...',
          description: "",
          section: "",},{id: "news-tuve-el-placer-de-visitar-y-colaborar-con-el-harris-lab-brown-university",
          title: '¡Tuve el placer de visitar y colaborar con el Harris Lab @ Brown...',
          description: "",
          section: "",},{id: "news-asistí-a-la-maravillosa-escuela-avanzada-de-física-experimental-en-el-cbpf-donde-realizamos-investigaciones-sobre-fenómenos-fundamentales-para-dispositivos-espintrónicos",
          title: 'Asistí a la maravillosa Escuela Avanzada de Física Experimental en el CBPF, donde...',
          description: "",
          section: "",},{id: "news-comenzaré-mi-doctorado-en-la-escuela-de-ingeniería-de-la-universidad-de-brown-será-una-excelente-oportunidad-para-aprender-nuevas-habilidades",
          title: '¡Comenzaré mi doctorado en la Escuela de Ingeniería de la Universidad de Brown!...',
          description: "",
          section: "",},{id: "news-tuve-el-placer-de-ser-seleccionado-para-el-programa-de-estudiantes-de-verano-del-cern",
          title: '¡Tuve el placer de ser seleccionado para el programa de estudiantes de verano...',
          description: "",
          section: "",},{id: "news-presenté-mi-trabajo-más-reciente-en-la-reunión-matemática-conjunta-brasil-china",
          title: 'Presenté mi trabajo más reciente en la Reunión Matemática Conjunta Brasil-China',
          description: "",
          section: "",},{id: "news-presenté-mi-trabajo-más-reciente-en-la-reunión-anual-de-la-división-de-dinámica-de-fluidos-de-la-american-physical-society",
          title: 'Presenté mi trabajo más reciente en la Reunión Anual de la División de...',
          description: "",
          section: "",},{id: "news-nuestro-último-preprint-droplet-rebounds-off-a-fluid-bath-kinematic-match-simulations-and-experiments-está-disponible-en-arxiv",
          title: 'Nuestro último preprint “Droplet rebounds off a fluid bath: kinematic match simulations and...',
          description: "",
          section: "",},{id: "news-nuestro-nuevo-preprint-drop-rebound-at-low-weber-number-está-disponible-en-arxiv",
          title: 'Nuestro nuevo preprint “Drop rebound at low weber number” está disponible en arxiv...',
          description: "",
          section: "",},{id: "news-asistiré-a-la-escuela-de-verano-de-umass-amherst-sobre-materia-blanda-y-fluidos-complejos",
          title: '¡Asistiré a la Escuela de Verano de UMass Amherst sobre Materia Blanda y...',
          description: "",
          section: "",},{id: "news-presenté-mi-trabajo-más-reciente-en-la-reunión-anual-de-la-división-de-dinámica-de-fluidos-de-la-american-physical-society",
          title: 'Presenté mi trabajo más reciente en la Reunión Anual de la División de...',
          description: "",
          section: "",},{id: "news-fui-seleccionado-para-postularme-al-campeonato-de-ajedrez-inter-ivy-que-se-llevará-a-cabo-en-la-universidad-de-pensilvania",
          title: '¡Fui seleccionado para postularme al campeonato de ajedrez Inter-Ivy que se llevará a...',
          description: "",
          section: "",},{id: "projects-acoplamiento-de-crecimiento-flujo-y-optimización-en-sistemas-complejos",
          title: 'Acoplamiento de Crecimiento, Flujo y Optimización en Sistemas Complejos',
          description: "Integrando crecimiento biológico y dinámica de fluidos en vastos espacios de diseño",
          section: "",handler: () => {
              window.location.href = "/es/projects/0_bioreactor/";
            },},{id: "projects-kinematic-match-un-marco-de-contacto-suave-para-impactos-deformables",
          title: 'Kinematic Match: un marco de contacto suave para impactos deformables',
          description: "Una restricción geométrica que hace que las colisiones sean estables, precisas y listas para la optimización",
          section: "",handler: () => {
              window.location.href = "/es/projects/1_KM/";
            },},{id: "projects-transporte-de-espín-por-medición-e-inferencia",
          title: 'Transporte de espín por medición e inferencia',
          description: "De ajustes de FMR basados en LLG a la deconvolución de iSHE y selección de materiales",
          section: "",handler: () => {
              window.location.href = "/es/projects/2_CBPF/";
            },},{id: "projects-locomoción-interfacial",
          title: 'Locomoción interfacial',
          description: "Física diferenciable para robots impulsados por ondas",
          section: "",handler: () => {
              window.location.href = "/es/projects/3_surferbot/";
            },},{id: "projects-promoviendo-las-olimpiadas-de-ciencias",
          title: 'Promoviendo las Olimpiadas de Ciencias',
          description: "Brindando acceso a oportunidades de calidad a jóvenes estudiantes talentosos de secundaria",
          section: "",handler: () => {
              window.location.href = "/es/projects/4_JT/";
            },},{id: "projects-luchando-contra-la-corrupción-en-paraguay",
          title: 'Luchando contra la corrupción en Paraguay',
          description: "Promoviendo estándares de datos de contrataciones abiertas y transparencia en el gobierno paraguayo",
          section: "",handler: () => {
              window.location.href = "/es/projects/5_Reaccion/";
            },},{id: "projects-democratizando-el-acceso-a-la-educación-superior-en-paraguay",
          title: 'Democratizando el acceso a la educación superior en Paraguay',
          description: "",
          section: "",handler: () => {
              window.location.href = "/es/projects/6_Mathura/";
            },},{id: "projects-solucionador-de-similitud-dinámica-para-edps",
          title: 'Solucionador de similitud dinámica para EDPs',
          description: "Búsqueda simbólica de reducciones de escala de EDP → EDO",
          section: "",handler: () => {
              window.location.href = "/es/projects/7_zsimilarity/";
            },},{id: "projects-por-favor-aprende-a-programar",
          title: 'Por favor, aprende a programar',
          description: "",
          section: "",handler: () => {
              window.location.href = "/es/projects/9_PE/";
            },},{id: "projects-julia-a-escala-en-clústeres-heterogéneos",
          title: 'Julia a escala en clústeres heterogéneos',
          description: "Precompilación + entrega de artefactos CVMFS para inicios rápidos y reproducibles",
          section: "",handler: () => {
              window.location.href = "/es/projects/announcement_2/";
            },},{
        id: 'social-github',
        title: 'GitHub',
        section: '',
        handler: () => {
          window.open("https://github.com/elvispy", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: '',
        handler: () => {
          window.open("https://www.linkedin.com/in/elvisaguero", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: '',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=D3sDR9EAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: '',
        handler: () => {
          window.open("https://sites.brown.edu/harrislab/", "_blank");
        },
      },{
          id: 'lang-en-us',
          title: 'en-us',
          section: '',
          handler: () => {
            window.location.href = "" + updatedUrl;
          },
        },{
          id: 'lang-pt-br',
          title: 'pt-br',
          section: '',
          handler: () => {
            window.location.href = "/pt-br" + updatedUrl;
          },
        },{
      id: 'light-theme',
      title: '',
      description: '',
      section: '',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: '',
      description: '',
      section: '',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: '',
      description: '',
      section: '',
      handler: () => {
        setThemeSetting("system");
      },
    },];
