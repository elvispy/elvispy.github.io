
const currentUrl = window.location.href;
const siteUrl = "https://elvispy.github.io"; 
let updatedUrl = currentUrl.replace("https://elvispy.github.io", "");
if (currentUrl.length == updatedUrl.length && currentUrl.startsWith("http://127.0.0.1")) {
  const otherSiteUrl = siteUrl.replace("localhost", "127.0.0.1");
  updatedUrl = currentUrl.replace(otherSiteUrl + "", "");
}
if ("".length > 0) {
  updatedUrl = updatedUrl.replace("/", "");
}
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation menu",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of my cool projects.",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "Edit the `_data/repositories.yml` and change the `github_users` and `github_repos` lists to include your own GitHub profile and repositories.",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
      
        title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
      section: "Posts",
      handler: () => {
        
          window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
        
      },
    },{id: "post-displaying-external-posts-on-your-al-folio-blog",
      
        title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
        
      },
    },{id: "news-um-anúncio-simples-em-uma-linha",
          title: 'Um anúncio simples em uma linha.',
          description: "",
          section: "News",},{id: "news-um-anúncio-longo-com-detalhes",
          title: 'Um anúncio longo com detalhes',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-um-anúncio-simples-em-uma-linha-com-markdown-emoji-sparkles-smile",
          title: 'Um anúncio simples em uma linha com Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "news-our-paper-impact-of-a-rigid-sphere-onto-an-ellastic-membrane-was-accepted-at-the-proceedings-of-the-royal-society-a",
          title: 'Our paper “Impact of a rigid sphere onto an ellastic membrane” was accepted...',
          description: "",
          section: "News",},{id: "news-i-had-the-pleasure-to-visit-and-collaborate-with-the-harris-lab-brown-university",
          title: 'I had the pleasure to visit and collaborate with the Harris Lab @...',
          description: "",
          section: "News",},{id: "news-i-attended-the-wonderful-advanced-school-on-experimental-physics-at-cbpf-where-i-we-did-research-on-foundational-phenomena-for-spintronic-devices",
          title: 'I attended the wonderful Advanced School on Experimental Physics at CBPF, where I...',
          description: "",
          section: "News",},{id: "news-i-will-be-starting-my-phd-at-the-school-of-engineering-of-brown-university-it-will-be-an-excellent-opportunity-to-learn-new-skills",
          title: 'I will be starting my PhD at the School of Engineering of Brown...',
          description: "",
          section: "News",},{id: "news-i-had-the-pleasure-to-be-selected-for-the-cern-summer-student-programme",
          title: 'I had the pleasure to be selected for the CERN summer student programme!...',
          description: "",
          section: "News",},{id: "news-i-presented-my-latest-work-at-the-brazil-china-joint-mathematical-meeting",
          title: 'I presented my latest work at the Brazil-China Joint Mathematical Meeting',
          description: "",
          section: "News",},{id: "news-i-presented-my-latest-work-at-the-annual-meeting-of-the-american-physical-society-division-of-fluid-dynamics",
          title: 'I presented my latest work at the Annual Meeting of the American Physical...',
          description: "",
          section: "News",},{id: "news-our-latest-preprint-droplet-rebounds-off-a-fluid-bath-kinematic-match-simulations-and-experiments-is-available-in-arxiv",
          title: 'Our latest preprint “Droplet rebounds off a fluid bath: kinematic match simulations and...',
          description: "",
          section: "News",},{id: "news-our-new-preprint-drop-rebound-at-low-weber-number-is-available-in-arxiv",
          title: 'Our new preprint “Drop rebound at low weber number” is available in arxiv...',
          description: "",
          section: "News",},{id: "news-i-am-attending-the-umass-amherst-summer-school-on-soft-matter-and-complex-fluids",
          title: 'I am attending the UMass Amherst Summer School on Soft Matter and Complex...',
          description: "",
          section: "News",},{id: "projects-coupling-growth-flow-and-optimization-in-complex-systems",
          title: 'Coupling Growth, Flow, and Optimization in Complex Systems',
          description: "Integrating biological growth and fluid dynamics across vast design spaces",
          section: "Projects",handler: () => {
              window.location.href = "/projects/0_bioreactor/";
            },},{id: "projects-kinematic-match-a-smooth-contact-framework-for-deformable-impacts",
          title: 'Kinematic Match: a smooth-contact framework for deformable impacts',
          description: "A geometric constraint that makes collisions stable, accurate, and optimization-ready",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_KM/";
            },},{id: "projects-spin-transport-by-measurement-and-inference",
          title: 'Spin transport by measurement and inference',
          description: "From LLG-based FMR fits to iSHE deconvolution and materials selection",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_CBPF/";
            },},{id: "projects-interfacial-locomotion",
          title: 'Interfacial locomotion',
          description: "Differentiable physics for wave-driven robots",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_surferbot/";
            },},{id: "projects-promoting-science-olympiads",
          title: 'Promoting Science Olympiads',
          description: "Providing access to quality opportunities to young and talented high-school students",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_JT/";
            },},{id: "projects-battling-corruption-in-paraguay",
          title: 'Battling corruption in Paraguay',
          description: "Promoting open contracting data standards and transparency in the paraguayan government",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_Reaccion/";
            },},{id: "projects-democratizing-access-to-higher-education-in-paraguay",
          title: 'Democratizing access to higher education in Paraguay',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_Mathura/";
            },},{id: "projects-dynamic-similarity-solver-for-pdes",
          title: 'Dynamic-similarity solver for PDEs',
          description: "Symbolic search for scaling reductions from PDE → ODE",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_zsimilarity/";
            },},{id: "projects-plz-learn-to-code",
          title: 'Plz learn to code',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_PE/";
            },},{id: "projects-julia-at-scale-on-heterogeneous-clusters",
          title: 'Julia at scale on heterogeneous clusters',
          description: "Precompilation + CVMFS artifact delivery for fast, reproducible starts",
          section: "Projects",handler: () => {
              window.location.href = "/projects/announcement_2/";
            },},{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/elvispy", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/elvisaguero", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=D3sDR9EAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://sites.brown.edu/harrislab/", "_blank");
        },
      },{
          id: 'lang-pt-br',
          title: 'pt-br',
          section: 'Languages',
          handler: () => {
            window.location.href = "/pt-br" + updatedUrl;
          },
        },{
          id: 'lang-es',
          title: 'es',
          section: 'Languages',
          handler: () => {
            window.location.href = "/es" + updatedUrl;
          },
        },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
