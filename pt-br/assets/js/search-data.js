
const currentUrl = window.location.href;
const siteUrl = "https://elvispy.github.io"; 
let updatedUrl = currentUrl.replace("https://elvispy.github.io", "");
if (currentUrl.length == updatedUrl.length && currentUrl.startsWith("http://127.0.0.1")) {
  const otherSiteUrl = siteUrl.replace("localhost", "127.0.0.1");
  updatedUrl = currentUrl.replace(otherSiteUrl + "", "");
}
if ("pt-br".length > 0) {
  updatedUrl = updatedUrl.replace("/pt-br", "");
}
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-sobre",
    title: "sobre",
    section: "Menu de navegação",
    handler: () => {
      window.location.href = "/pt-br/";
    },
  },{id: "nav-projetos",
          title: "projetos",
          description: "Uma coleção crescente dos meus projetos legais.",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/projects/";
          },
        },{id: "nav-repositórios",
          title: "repositórios",
          description: "Uma coleção dos meus repositórios favoritos!",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/cv/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
      
        title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
      section: "Postagens",
      handler: () => {
        
          window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
        
      },
    },{id: "post-displaying-external-posts-on-your-al-folio-blog",
      
        title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Postagens",
      handler: () => {
        
          window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
        
      },
    },{id: "news-um-anúncio-simples-em-uma-linha",
          title: 'Um anúncio simples em uma linha.',
          description: "",
          section: "Novidades",},{id: "news-um-anúncio-longo-com-detalhes",
          title: 'Um anúncio longo com detalhes',
          description: "",
          section: "Novidades",handler: () => {
              window.location.href = "/pt-br/news/announcement_2/";
            },},{id: "news-um-anúncio-simples-em-uma-linha-com-markdown-emoji-sparkles-smile",
          title: 'Um anúncio simples em uma linha com Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "Novidades",},{id: "news-nosso-artigo-impact-of-a-rigid-sphere-onto-an-ellastic-membrane-foi-aceito-no-proceedings-of-the-royal-society-a",
          title: 'Nosso artigo “Impact of a rigid sphere onto an ellastic membrane” foi aceito...',
          description: "",
          section: "Novidades",},{id: "news-tive-o-prazer-de-visitar-e-colaborar-com-o-harris-lab-brown-university",
          title: 'Tive o prazer de visitar e colaborar com o Harris Lab @ Brown...',
          description: "",
          section: "Novidades",},{id: "news-participei-da-maravilhosa-escola-avançada-de-física-experimental-no-cbpf-onde-realizamos-pesquisas-sobre-fenômenos-fundamentais-para-dispositivos-de-spintrônica",
          title: 'Participei da maravilhosa Escola Avançada de Física Experimental no CBPF, onde realizamos pesquisas...',
          description: "",
          section: "Novidades",},{id: "news-iniciarei-meu-doutorado-na-school-of-engineering-da-brown-university-será-uma-excelente-oportunidade-para-aprender-novas-habilidades",
          title: 'Iniciarei meu doutorado na School of Engineering da Brown University! Será uma excelente...',
          description: "",
          section: "Novidades",},{id: "news-tive-o-prazer-de-ser-selecionado-para-o-programa-de-estudantes-de-verão-do-cern",
          title: 'Tive o prazer de ser selecionado para o programa de estudantes de verão...',
          description: "",
          section: "Novidades",},{id: "news-apresentei-meu-trabalho-mais-recente-no-brazil-china-joint-mathematical-meeting",
          title: 'Apresentei meu trabalho mais recente no Brazil-China Joint Mathematical Meeting',
          description: "",
          section: "Novidades",},{id: "news-apresentei-meu-trabalho-mais-recente-no-annual-meeting-of-the-american-physical-society-division-of-fluid-dynamics",
          title: 'Apresentei meu trabalho mais recente no Annual Meeting of the American Physical Society...',
          description: "",
          section: "Novidades",},{id: "news-nosso-preprint-mais-recente-droplet-rebounds-off-a-fluid-bath-kinematic-match-simulations-and-experiments-está-disponível-no-arxiv",
          title: 'Nosso preprint mais recente “Droplet rebounds off a fluid bath: kinematic match simulations...',
          description: "",
          section: "Novidades",},{id: "news-nosso-novo-preprint-drop-rebound-at-low-weber-number-está-disponível-no-arxiv",
          title: 'Nosso novo preprint “Drop rebound at low weber number” está disponível no arxiv...',
          description: "",
          section: "Novidades",},{id: "news-estou-participando-da-umass-amherst-summer-school-on-soft-matter-and-complex-fluids",
          title: 'Estou participando da UMass Amherst Summer School on Soft Matter and Complex Fluids!...',
          description: "",
          section: "Novidades",},{id: "news-apresentei-meu-trabalho-mais-recente-no-annual-meeting-of-the-american-physical-society-division-of-fluid-dynamics",
          title: 'Apresentei meu trabalho mais recente no Annual Meeting of the American Physical Society...',
          description: "",
          section: "Novidades",},{id: "news-fui-selecionado-para-me-inscrever-no-campeonato-de-xadrez-inter-ivy-que-será-realizado-na-university-of-pennsylvania",
          title: 'Fui selecionado para me inscrever no campeonato de xadrez Inter-Ivy, que será realizado...',
          description: "",
          section: "Novidades",},{id: "projects-design-de-multi-fidelidade-para-biorreatores-de-balanço",
          title: 'Design de multi-fidelidade para biorreatores de balanço',
          description: "Design acoplado de transferência de oxigênio e cisalhamento com CFD de multi-fidelidade",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/0_bioreactor/";
            },},{id: "projects-construindo-a-próxima-geração-de-software-de-impacto-deformável",
          title: 'Construindo a próxima geração de software de impacto deformável',
          description: "Dinâmica de contato espectral para gotas impactando um banho",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/1_KM/";
            },},{id: "projects-transporte-de-spin-por-medição-e-inferência",
          title: 'Transporte de spin por medição e inferência',
          description: "De ajustes de FMR baseados em LLG à deconvolução de iSHE e seleção de materiais",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/2_CBPF/";
            },},{id: "projects-surferbot-flexível",
          title: 'Surferbot Flexível',
          description: "Propulsão impulsionada por ondas através de uma balsa flexível",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/3_surferbot/";
            },},{id: "projects-promovendo-olimpíadas-científicas",
          title: 'Promovendo Olimpíadas Científicas',
          description: "Proporcionando acesso a oportunidades de qualidade para jovens e talentosos estudantes do ensino médio",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/4_JT/";
            },},{id: "projects-combatendo-a-corrupção-no-paraguai",
          title: 'Combatendo a corrupção no Paraguai',
          description: "Promovendo padrões de dados de contratação aberta e transparência no governo paraguaio",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/5_Reaccion/";
            },},{id: "projects-democratizando-o-acesso-ao-ensino-superior-no-paraguai",
          title: 'Democratizando o acesso ao ensino superior no Paraguai',
          description: "",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/6_Mathura/";
            },},{id: "projects-solver-de-auto-similaridade-dinâmica-para-edps",
          title: 'Solver de auto-similaridade dinâmica para EDPs',
          description: "Busca simbólica por reduções de escala de EDP → EDO",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/7_zsimilarity/";
            },},{id: "projects-a3dasm-loops-científicos-para-engenharia-de-agentes",
          title: 'a3dasm: loops científicos para engenharia de agentes',
          description: "Um fluxo de trabalho aberto e orientado por evidências para agentes resolverem problemas de engenharia baseados em dados",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/8_agentic/";
            },},{id: "projects-por-favor-aprenda-a-programar",
          title: 'Por favor, aprenda a programar',
          description: "",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/9_PE/";
            },},{id: "projects-julia-em-escala-em-clusters-heterogêneos",
          title: 'Julia em escala em clusters heterogêneos',
          description: "Pré-compilação + entrega de artefatos CVMFS para inicializações rápidas e reprodutíveis",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/announcement_2/";
            },},{
        id: 'social-github',
        title: 'GitHub',
        section: 'Redes sociais',
        handler: () => {
          window.open("https://github.com/elvispy", "_blank");
        },
      },{
        id: 'social-lichess_username',
        title: 'Lichess_username',
        section: 'Redes sociais',
        handler: () => {
          window.open("", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Redes sociais',
        handler: () => {
          window.open("https://www.linkedin.com/in/elvisaguero", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Redes sociais',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=D3sDR9EAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Redes sociais',
        handler: () => {
          window.open("https://sites.brown.edu/harrislab/", "_blank");
        },
      },{
          id: 'lang-en-us',
          title: 'en-us',
          section: 'Idiomas',
          handler: () => {
            window.location.href = "" + updatedUrl;
          },
        },{
          id: 'lang-es',
          title: 'es',
          section: 'Idiomas',
          handler: () => {
            window.location.href = "/es" + updatedUrl;
          },
        },{
      id: 'light-theme',
      title: 'Muda o tema para claro',
      description: 'Muda o tema do site para claro',
      section: 'Tema',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Muda o tema para escuro',
      description: 'Muda o tema do site para escuro',
      section: 'Tema',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Usa o tema padrão do sistema',
      description: 'Muda o tema do site para o padrão do sistema',
      section: 'Tema',
      handler: () => {
        setThemeSetting("system");
      },
    },];
