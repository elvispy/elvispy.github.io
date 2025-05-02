
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
    id: "nav-sobre",
    title: "sobre",
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
          description: "Edit the `_data/repositories.yml` and change the `github_users` and `github_repos` lists to include your own GitHub profile and repositories.",
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
        },{id: "post-a-post-with-image-galleries",
      
        title: "a post with image galleries",
      
      description: "this is what included image galleries could look like",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2024/photo-gallery/";
        
      },
    },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
      
        title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
      section: "",
      handler: () => {
        
          window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
        
      },
    },{id: "post-a-post-with-tabs",
      
        title: "a post with tabs",
      
      description: "this is what included tabs in a post could look like",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2024/tabs/";
        
      },
    },{id: "post-a-post-with-typograms",
      
        title: "a post with typograms",
      
      description: "this is what included typograms code could look like",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2024/typograms/";
        
      },
    },{id: "post-a-post-that-can-be-cited",
      
        title: "a post that can be cited",
      
      description: "this is what a post that can be cited looks like",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2024/post-citation/";
        
      },
    },{id: "post-a-post-with-pseudo-code",
      
        title: "a post with pseudo code",
      
      description: "this is what included pseudo code could look like",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2024/pseudocode/";
        
      },
    },{id: "post-a-post-with-code-diff",
      
        title: "a post with code diff",
      
      description: "this is how you can display code diffs",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2024/code-diff/";
        
      },
    },{id: "post-a-post-with-advanced-image-components",
      
        title: "a post with advanced image components",
      
      description: "this is what advanced image components could look like",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2024/advanced-images/";
        
      },
    },{id: "post-a-post-with-vega-lite",
      
        title: "a post with vega lite",
      
      description: "this is what included vega lite code could look like",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2024/vega-lite/";
        
      },
    },{id: "post-a-post-with-geojson",
      
        title: "a post with geojson",
      
      description: "this is what included geojson code could look like",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2024/geojson-map/";
        
      },
    },{id: "post-a-post-with-echarts",
      
        title: "a post with echarts",
      
      description: "this is what included echarts code could look like",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2024/echarts/";
        
      },
    },{id: "post-a-post-with-chart-js",
      
        title: "a post with chart.js",
      
      description: "this is what included chart.js code could look like",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2024/chartjs/";
        
      },
    },{id: "post-a-post-with-tikzjax",
      
        title: "a post with TikZJax",
      
      description: "this is what included TikZ code could look like",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2023/tikzjax/";
        
      },
    },{id: "post-a-post-with-bibliography",
      
        title: "a post with bibliography",
      
      description: "an example of a blog post with bibliography",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2023/post-bibliography/";
        
      },
    },{id: "post-a-post-with-jupyter-notebook",
      
        title: "a post with jupyter notebook",
      
      description: "an example of a blog post with jupyter notebook",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2023/jupyter-notebook/";
        
      },
    },{id: "post-a-post-with-custom-blockquotes",
      
        title: "a post with custom blockquotes",
      
      description: "an example of a blog post with custom blockquotes",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2023/custom-blockquotes/";
        
      },
    },{id: "post-a-post-with-table-of-contents-on-a-sidebar",
      
        title: "a post with table of contents on a sidebar",
      
      description: "an example of a blog post with table of contents on a sidebar",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2023/sidebar-table-of-contents/";
        
      },
    },{id: "post-a-post-with-audios",
      
        title: "a post with audios",
      
      description: "this is what included audios could look like",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2023/audios/";
        
      },
    },{id: "post-a-post-with-videos",
      
        title: "a post with videos",
      
      description: "this is what included videos could look like",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2023/videos/";
        
      },
    },{id: "post-displaying-beautiful-tables-with-bootstrap-tables",
      
        title: "displaying beautiful tables with Bootstrap Tables",
      
      description: "an example of how to use Bootstrap Tables",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2023/tables/";
        
      },
    },{id: "post-a-post-with-table-of-contents",
      
        title: "a post with table of contents",
      
      description: "an example of a blog post with table of contents",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2023/table-of-contents/";
        
      },
    },{id: "post-a-post-with-giscus-comments",
      
        title: "a post with giscus comments",
      
      description: "an example of a blog post with giscus comments",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2022/giscus-comments/";
        
      },
    },{id: "post-displaying-external-posts-on-your-al-folio-blog",
      
        title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "",
      handler: () => {
        
          window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
        
      },
    },{id: "post-a-post-with-redirect",
      
        title: "a post with redirect",
      
      description: "you can also redirect to assets like pdf",
      section: "",
      handler: () => {
        
          window.location.href = "/es/assets/pdf/en-us/example_pdf.pdf";
        
      },
    },{id: "post-a-post-with-diagrams",
      
        title: "a post with diagrams",
      
      description: "an example of a blog post with diagrams",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2021/diagrams/";
        
      },
    },{id: "post-a-post-with-twitter",
      
        title: "a post with twitter",
      
      description: "an example of a blog post with twitter",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2020/twitter/";
        
      },
    },{id: "post-a-distill-style-blog-post",
      
        title: "a distill-style blog post",
      
      description: "an example of a distill-style blog post and main elements",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2018/distill/";
        
      },
    },{id: "post-a-post-with-disqus-comments",
      
        title: "a post with disqus comments",
      
      description: "an example of a blog post with disqus comments",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2015/disqus-comments/";
        
      },
    },{id: "post-a-post-with-math",
      
        title: "a post with math",
      
      description: "an example of a blog post with some math",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2015/math/";
        
      },
    },{id: "post-a-post-with-code",
      
        title: "a post with code",
      
      description: "an example of a blog post with some code",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2015/code/";
        
      },
    },{id: "post-a-post-with-images",
      
        title: "a post with images",
      
      description: "this is what included images could look like",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2015/images/";
        
      },
    },{id: "post-a-post-with-formatting-and-links",
      
        title: "a post with formatting and links",
      
      description: "march &amp; april, looking forward to summer",
      section: "",
      handler: () => {
        
          window.location.href = "/es/blog/2015/formatting-and-links/";
        
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
          section: "",},{id: "news-nuestro-artículo-impacto-de-una-esfera-rígida-sobre-una-membrana-elástica-fue-aceptado-en-las-proceedings-of-the-royal-society-a",
          title: 'Nuestro artículo “Impacto de una esfera rígida sobre una membrana elástica” fue aceptado...',
          description: "",
          section: "",},{id: "news-tuve-el-placer-de-visitar-y-colaborar-con-el-laboratorio-harris-en-la-universidad-de-brown",
          title: 'Tuve el placer de visitar y colaborar con el Laboratorio Harris en la...',
          description: "",
          section: "",},{id: "news-asistí-a-la-maravillosa-escuela-avanzada-de-física-experimental-en-cbpf-donde-investigamos-fenómenos-fundamentales-para-dispositivos-espintrónicos",
          title: 'Asistí a la maravillosa Escuela Avanzada de Física Experimental en CBPF, donde investigamos...',
          description: "",
          section: "",},{id: "news-comenzaré-mi-doctorado-en-la-escuela-de-ingeniería-de-la-universidad-de-brown-será-una-excelente-oportunidad-para-aprender-nuevas-habilidades",
          title: '¡Comenzaré mi doctorado en la Escuela de Ingeniería de la Universidad de Brown!....',
          description: "",
          section: "",},{id: "news-tuve-el-placer-de-ser-seleccionado-para-el-programa-de-estudiantes-de-verano-del-cern",
          title: '¡Tuve el placer de ser seleccionado para el programa de estudiantes de verano...',
          description: "",
          section: "",},{id: "news-presenté-mi-último-trabajo-en-el-encuentro-matemático-conjunto-brasil-china",
          title: 'Presenté mi último trabajo en el Encuentro Matemático Conjunto Brasil-China',
          description: "",
          section: "",},{id: "news-presenté-mi-trabajo-más-reciente-en-la-reunión-anual-de-la-división-de-dinámica-de-fluidos-de-la-sociedad-estadounidense-de-física",
          title: 'Presenté mi trabajo más reciente en la Reunión Anual de la División de...',
          description: "",
          section: "",},{id: "projects-optimización-del-diseño-de-biorreactores",
          title: 'Optimización del diseño de biorreactores',
          description: "Simulando el Futuro de la Carne.",
          section: "",handler: () => {
              window.location.href = "/es/projects/0_bioreactor/";
            },},{id: "projects-simulación-de-impactos-deformables",
          title: 'Simulación de impactos deformables',
          description: "El método de correspondencia cinemática",
          section: "",handler: () => {
              window.location.href = "/es/projects/1_KM/";
            },},{id: "projects-la-nueva-electrónica",
          title: 'La nueva electrónica',
          description: "Avanzando en nuestra comprensión de los materiales espintrónicos",
          section: "",handler: () => {
              window.location.href = "/es/projects/2_CBPF/";
            },},{id: "projects-interfacial-locomotion",
          title: 'Interfacial locomotion',
          description: "Enabling low-cost robots to surf on water.",
          section: "",handler: () => {
              window.location.href = "/es/projects/3_surferbot/";
            },},{id: "projects-promoviendo-las-olimpiadas-de-ciencias",
          title: 'Promoviendo las Olimpiadas de Ciencias',
          description: "otro sin imagen",
          section: "",handler: () => {
              window.location.href = "/es/projects/4_JT/";
            },},{id: "projects-luchando-contra-la-corrupción-en-paraguay",
          title: 'Luchando contra la corrupción en Paraguay',
          description: "",
          section: "",handler: () => {
              window.location.href = "/es/projects/5_Reaccion/";
            },},{id: "projects-democratización-del-acceso-a-becas-en-paraguay",
          title: 'Democratización del acceso a becas en Paraguay',
          description: "Promoción del acceso a la educación en Paraguay",
          section: "",handler: () => {
              window.location.href = "/es/projects/6_Mathura/";
            },},{id: "projects-un-solucionador-de-similitud-dinámica-para-la-dinámica-de-fluidos",
          title: 'Un solucionador de similitud dinámica para la dinámica de fluidos.',
          description: "Un buscador simbólico de Ecuaciones Diferenciales Parciales (EDP) para soluciones de similitud.",
          section: "",handler: () => {
              window.location.href = "/es/projects/7_zsimilarity/";
            },},{id: "projects-por-favor-aprende-a-programar",
          title: 'Por favor, aprende a programar',
          description: "",
          section: "",handler: () => {
              window.location.href = "/es/projects/9_PE/";
            },},{id: "projects-mi-pasantía-de-verano-en-el-cern",
          title: '¡Mi pasantía de verano en el CERN!',
          description: "",
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
