
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
  },{id: "nav-projects",
          title: "projects",
          description: "Uma coleção crescente dos meus projetos legais.",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/projects/";
          },
        },{id: "nav-repositórios",
          title: "repositórios",
          description: "Edite o `_data/repositories.yml` e mude as listas `github_users` e `github_repos` para incluir seu próprio perfil do GitHub e repositórios.",
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
          section: "Novidades",},{id: "news-nosso-artigo-impacto-de-uma-esfera-rígida-sobre-uma-membrana-elástica-foi-aceito-nos-proceedings-of-the-royal-society-a",
          title: 'Nosso artigo “Impacto de uma esfera rígida sobre uma membrana elástica” foi aceito...',
          description: "",
          section: "Novidades",},{id: "news-tive-o-prazer-de-visitar-e-colaborar-com-o-laboratório-harris-brown-university",
          title: 'Tive o prazer de visitar e colaborar com o Laboratório Harris @ Brown...',
          description: "",
          section: "Novidades",},{id: "news-eu-participei-da-maravilhosa-escola-avançada-de-física-experimental-no-cbpf-onde-realizamos-pesquisa-sobre-fenômenos-fundamentais-para-dispositivos-espintrônicos",
          title: 'Eu participei da maravilhosa Escola Avançada de Física Experimental no CBPF, onde realizamos...',
          description: "",
          section: "Novidades",},{id: "news-começarei-meu-doutorado-na-escola-de-engenharia-da-brown-university-será-uma-excelente-oportunidade-para-aprender-novas-habilidades",
          title: 'Começarei meu doutorado na Escola de Engenharia da Brown University!. Será uma excelente...',
          description: "",
          section: "Novidades",},{id: "news-tive-o-prazer-de-ser-selecionado-para-o-programa-de-estudantes-de-verão-do-cern",
          title: 'Tive o prazer de ser selecionado para o programa de estudantes de verão...',
          description: "",
          section: "Novidades",},{id: "news-apresentei-meu-trabalho-mais-recente-na-conferência-matemática-conjunta-brasil-china",
          title: 'Apresentei meu trabalho mais recente na Conferência Matemática Conjunta Brasil-China',
          description: "",
          section: "Novidades",},{id: "news-apresentei-meu-trabalho-mais-recente-na-reunião-anual-da-divisão-de-dinâmica-dos-fluidos-da-sociedade-americana-de-física",
          title: 'Apresentei meu trabalho mais recente na Reunião Anual da Divisão de Dinâmica dos...',
          description: "",
          section: "Novidades",},{id: "news-nosso-preprint-mais-recente-rebote-de-gotículas-em-um-banho-de-fluido-simulações-e-experimentos-de-correspondência-cinemática-está-disponível-em-arxiv",
          title: 'Nosso preprint mais recente “Rebote de gotículas em um banho de fluido: simulações...',
          description: "",
          section: "Novidades",},{id: "news-nosso-novo-preprint-drop-rebound-at-low-weber-number-está-disponível-no-arxiv",
          title: 'Nosso novo preprint “Drop rebound at low weber number” está disponível no arxiv...',
          description: "",
          section: "Novidades",},{id: "news-estou-participando-da-escola-de-verão-da-umass-amherst-sobre-matéria-mole-e-fluidos-complexos",
          title: 'Estou participando da Escola de Verão da UMass Amherst sobre Matéria Mole e...',
          description: "",
          section: "Novidades",},{id: "projects-acoplamento-de-crescimento-fluxo-e-otimização-em-sistemas-complexos",
          title: 'Acoplamento de Crescimento, Fluxo e Otimização em Sistemas Complexos',
          description: "Integrando crescimento biológico e dinâmica de fluidos em vastos espaços de design",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/0_bioreactor/";
            },},{id: "projects-correspondência-cinemática-uma-estrutura-de-contato-suave-para-impactos-deformáveis",
          title: 'Correspondência Cinemática, uma estrutura de contato suave para impactos deformáveis',
          description: "Uma restrição geométrica que torna as colisões estáveis, precisas e prontas para otimização",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/1_KM/";
            },},{id: "projects-transporte-de-spin-por-medição-e-inferência",
          title: 'Transporte de spin por medição e inferência',
          description: "De ajustes de FMR baseados em LLG à deconvolução de iSHE e seleção de materiais",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/2_CBPF/";
            },},{id: "projects-locomoção-interfacial",
          title: 'Locomoção Interfacial',
          description: "Física diferenciável para robôs movidos por ondas",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/3_surferbot/";
            },},{id: "projects-promovendo-olimpíadas-de-ciência",
          title: 'Promovendo Olimpíadas de Ciência',
          description: "Fornecendo acesso a oportunidades de qualidade para jovens e talentosos estudantes do ensino médio",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/4_JT/";
            },},{id: "projects-combatendo-a-corrupção-no-paraguai",
          title: 'Combatendo a corrupção no Paraguai',
          description: "Promovendo padrões de dados de contratos abertos e transparência no governo paraguaio",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/5_Reaccion/";
            },},{id: "projects-democratizando-o-acesso-ao-ensino-superior-no-paraguai",
          title: 'Democratizando o acesso ao ensino superior no Paraguai',
          description: "",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/6_Mathura/";
            },},{id: "projects-um-solucionador-de-similaridade-dinâmico-para-dinâmica-de-fluidos",
          title: 'Um solucionador de similaridade dinâmico para dinâmica de fluidos.',
          description: "Um localizador simbólico de EDPs para soluções de similaridade.",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/7_zsimilarity/";
            },},{id: "projects-plz-learn-to-code",
          title: 'Plz learn to code',
          description: "",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/9_PE/";
            },},{id: "projects-julia-em-escala-em-clusters-heterogêneos",
          title: 'Julia em escala em clusters heterogêneos',
          description: "Pré-compilação + entrega de artefatos CVMFS para inicializações rápidas e reproduzíveis",
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
