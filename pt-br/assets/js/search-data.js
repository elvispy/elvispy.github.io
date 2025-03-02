
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
          description: "Uma crescente coleção de seus projetos interessantes.",
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
          description: "Esta é uma descrição da página. Você pode modificá-la em &#39;_pages/cv.md&#39;. Também pode alterar ou remover o botão no topo de download de pdf.",
          section: "Menu de navegação",
          handler: () => {
            window.location.href = "/pt-br/cv/";
          },
        },{id: "post-a-post-with-image-galleries",
      
        title: "a post with image galleries",
      
      description: "this is what included image galleries could look like",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2024/photo-gallery/";
        
      },
    },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
      
        title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
      section: "Postagens",
      handler: () => {
        
          window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
        
      },
    },{id: "post-a-post-with-tabs",
      
        title: "a post with tabs",
      
      description: "this is what included tabs in a post could look like",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2024/tabs/";
        
      },
    },{id: "post-a-post-with-typograms",
      
        title: "a post with typograms",
      
      description: "this is what included typograms code could look like",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2024/typograms/";
        
      },
    },{id: "post-a-post-that-can-be-cited",
      
        title: "a post that can be cited",
      
      description: "this is what a post that can be cited looks like",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2024/post-citation/";
        
      },
    },{id: "post-a-post-with-pseudo-code",
      
        title: "a post with pseudo code",
      
      description: "this is what included pseudo code could look like",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2024/pseudocode/";
        
      },
    },{id: "post-a-post-with-code-diff",
      
        title: "a post with code diff",
      
      description: "this is how you can display code diffs",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2024/code-diff/";
        
      },
    },{id: "post-a-post-with-advanced-image-components",
      
        title: "a post with advanced image components",
      
      description: "this is what advanced image components could look like",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2024/advanced-images/";
        
      },
    },{id: "post-a-post-with-vega-lite",
      
        title: "a post with vega lite",
      
      description: "this is what included vega lite code could look like",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2024/vega-lite/";
        
      },
    },{id: "post-a-post-with-geojson",
      
        title: "a post with geojson",
      
      description: "this is what included geojson code could look like",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2024/geojson-map/";
        
      },
    },{id: "post-a-post-with-echarts",
      
        title: "a post with echarts",
      
      description: "this is what included echarts code could look like",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2024/echarts/";
        
      },
    },{id: "post-a-post-with-chart-js",
      
        title: "a post with chart.js",
      
      description: "this is what included chart.js code could look like",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2024/chartjs/";
        
      },
    },{id: "post-a-post-with-tikzjax",
      
        title: "a post with TikZJax",
      
      description: "this is what included TikZ code could look like",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2023/tikzjax/";
        
      },
    },{id: "post-a-post-with-bibliography",
      
        title: "a post with bibliography",
      
      description: "an example of a blog post with bibliography",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2023/post-bibliography/";
        
      },
    },{id: "post-a-post-with-jupyter-notebook",
      
        title: "a post with jupyter notebook",
      
      description: "an example of a blog post with jupyter notebook",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2023/jupyter-notebook/";
        
      },
    },{id: "post-a-post-with-custom-blockquotes",
      
        title: "a post with custom blockquotes",
      
      description: "an example of a blog post with custom blockquotes",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2023/custom-blockquotes/";
        
      },
    },{id: "post-a-post-with-table-of-contents-on-a-sidebar",
      
        title: "a post with table of contents on a sidebar",
      
      description: "an example of a blog post with table of contents on a sidebar",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2023/sidebar-table-of-contents/";
        
      },
    },{id: "post-a-post-with-audios",
      
        title: "a post with audios",
      
      description: "this is what included audios could look like",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2023/audios/";
        
      },
    },{id: "post-a-post-with-videos",
      
        title: "a post with videos",
      
      description: "this is what included videos could look like",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2023/videos/";
        
      },
    },{id: "post-displaying-beautiful-tables-with-bootstrap-tables",
      
        title: "displaying beautiful tables with Bootstrap Tables",
      
      description: "an example of how to use Bootstrap Tables",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2023/tables/";
        
      },
    },{id: "post-a-post-with-table-of-contents",
      
        title: "a post with table of contents",
      
      description: "an example of a blog post with table of contents",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2023/table-of-contents/";
        
      },
    },{id: "post-a-post-with-giscus-comments",
      
        title: "a post with giscus comments",
      
      description: "an example of a blog post with giscus comments",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2022/giscus-comments/";
        
      },
    },{id: "post-displaying-external-posts-on-your-al-folio-blog",
      
        title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Postagens",
      handler: () => {
        
          window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
        
      },
    },{id: "post-a-post-with-redirect",
      
        title: "a post with redirect",
      
      description: "you can also redirect to assets like pdf",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/assets/pdf/pt-br/example_pdf.pdf";
        
      },
    },{id: "post-a-post-with-diagrams",
      
        title: "a post with diagrams",
      
      description: "an example of a blog post with diagrams",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2021/diagrams/";
        
      },
    },{id: "post-a-post-with-twitter",
      
        title: "a post with twitter",
      
      description: "an example of a blog post with twitter",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2020/twitter/";
        
      },
    },{id: "post-a-distill-style-blog-post",
      
        title: "a distill-style blog post",
      
      description: "an example of a distill-style blog post and main elements",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2018/distill/";
        
      },
    },{id: "post-a-post-with-disqus-comments",
      
        title: "a post with disqus comments",
      
      description: "an example of a blog post with disqus comments",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2015/disqus-comments/";
        
      },
    },{id: "post-a-post-with-math",
      
        title: "a post with math",
      
      description: "an example of a blog post with some math",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2015/math/";
        
      },
    },{id: "post-uma-postagem-com-código",
      
        title: "uma postagem com código",
      
      description: "um exemplo de uma postagem em um blog com código",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2015/code/";
        
      },
    },{id: "post-a-post-with-images",
      
        title: "a post with images",
      
      description: "this is what included images could look like",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2015/images/";
        
      },
    },{id: "post-a-post-with-formatting-and-links",
      
        title: "a post with formatting and links",
      
      description: "march &amp; april, looking forward to summer",
      section: "Postagens",
      handler: () => {
        
          window.location.href = "/pt-br/blog/2015/formatting-and-links/";
        
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
          section: "Novidades",},{id: "news-our-paper-impact-of-a-rigid-sphere-onto-an-ellastic-membrane-was-accepted-at-the-proceedings-of-the-royal-society-a",
          title: 'Our paper “Impact of a rigid sphere onto an ellastic membrane” was accepted...',
          description: "",
          section: "Novidades",},{id: "news-i-had-the-pleasure-to-visit-and-collaborate-with-the-harris-lab-brown-university",
          title: 'I had the pleasure to visit and collaborate with the Harris Lab @...',
          description: "",
          section: "Novidades",},{id: "news-i-attended-the-wonderful-advanced-school-on-experimental-physics-at-cbpf-where-i-we-did-research-on-foundational-phenomena-for-spintronic-devices",
          title: 'I attended the wonderful Advanced School on Experimental Physics at CBPF, where I...',
          description: "",
          section: "Novidades",},{id: "news-i-will-be-starting-my-phd-at-the-school-of-engineering-of-brown-university-it-will-be-an-excellent-opportunity-to-learn-new-skills",
          title: 'I will be starting my PhD at the School of Engineering of Brown...',
          description: "",
          section: "Novidades",},{id: "news-i-had-the-pleasure-to-be-selected-for-the-cern-summer-student-programme",
          title: 'I had the pleasure to be selected for the CERN summer student programme!...',
          description: "",
          section: "Novidades",},{id: "news-i-presented-my-latest-work-at-the-brazil-china-joint-mathematical-meeting",
          title: 'I presented my latest work at the Brazil-China Joint Mathematical Meeting',
          description: "",
          section: "Novidades",},{id: "news-i-presented-my-latest-work-at-the-annual-meeting-of-the-american-physical-society-division-of-fluid-dynamics",
          title: 'I presented my latest work at the Annual Meeting of the American Physical...',
          description: "",
          section: "Novidades",},{id: "projects-simulating-deformable-impacts",
          title: 'Simulating deformable impacts',
          description: "The kinematic match method",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/1_KM/";
            },},{id: "projects-spintronics",
          title: 'Spintronics',
          description: "Advancibg oyr understanding of spintronic materials",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/2_CBPF/";
            },},{id: "projects-promoting-science-olympiads",
          title: 'Promoting Science Olympiads',
          description: "another without an image",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/4_JT/";
            },},{id: "projects-battling-corruption-in-paraguay",
          title: 'Battling corruption in Paraguay',
          description: "",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/5_Reaccion/";
            },},{id: "projects-mathura",
          title: 'Mathura',
          description: "Promoting education acess in paraguay",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/6_Mathura/";
            },},{id: "projects-similaritysolver-jl",
          title: 'SimilaritySolver.jl',
          description: "A symbolic PDE finder for similarity solutions.",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/7_zsimilarity/";
            },},{id: "projects-plz-learn-to-code",
          title: 'Plz learn to code',
          description: "",
          section: "Projetos",handler: () => {
              window.location.href = "/pt-br/projects/9_PE/";
            },},{id: "projects-i-was-a-summer-intern-at-cern",
          title: 'I was a summer intern at CERN!.',
          description: "",
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
