(function () {
  var LANG_COLORS = {
    "Julia":"#a270ba","Python":"#3572A5","JavaScript":"#f1e05a",
    "TypeScript":"#3178c6","C++":"#f34b7d","C":"#555555","C#":"#178600",
    "Rust":"#dea584","Go":"#00ADD8","Java":"#b07219","Kotlin":"#A97BFF",
    "MATLAB":"#e16737","R":"#198CE7","Shell":"#89e051","HTML":"#e34c26",
    "CSS":"#563d7c","Fortran":"#4d41b1","Jupyter Notebook":"#DA5B0B",
    "TeX":"#3D6117","Lua":"#000080","Makefile":"#427819"
  };

  function fmt(n) { return n >= 1000 ? (n/1000).toFixed(1)+'k' : String(n); }

  function htmlCard(repo, showOwner, data) {
    var parts = repo.split('/');
    return '<div class="github-pin-card">'
      + '<div class="gpc-header">'
      + '<svg class="gpc-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/></svg>'
      + '<span class="gpc-title">'
      + (showOwner ? '<span class="gpc-owner">' + parts[0] + ' / </span>' : '')
      + parts[1]
      + '</span></div>'
      + '<p class="gpc-description">' + ((data && data.description) || '') + '</p>'
      + '<div class="gpc-footer">'
      + (data && data.language ? '<span class="gpc-lang"><span class="gpc-lang-dot" style="background:' + (LANG_COLORS[data.language] || '#8b949e') + '"></span>' + data.language + '</span>' : '')
      + '<span class="gpc-stars"><svg viewBox="0 0 16 16" width="14" height="14" fill="#586069"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg> ' + (data ? fmt(data.stargazers_count) : '—') + '</span>'
      + '<span class="gpc-forks"><svg viewBox="0 0 16 16" width="14" height="14" fill="#586069"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/></svg> ' + (data ? fmt(data.forks_count) : '—') + '</span>'
      + '</div></div>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.repo[data-repo]').forEach(function (div) {
      var repo      = div.getAttribute('data-repo');
      var showOwner = div.getAttribute('data-show-owner') === 'true';
      var anchor    = div.querySelector('a');
      if (!anchor) return;

      // Show HTML card immediately — never blank
      anchor.innerHTML = htmlCard(repo, showOwner, null);

      // Fetch real data then try SVG upgrade
      fetch('https://api.github.com/repos/' + repo)
        .then(function(r) { return r.ok ? r.json() : null; })
        .then(function(data) {
          if (!data) { return; }

          var statsBase   = div.getAttribute('data-stats-url');
          var themeLight  = div.getAttribute('data-theme-light');
          var themeDark   = div.getAttribute('data-theme-dark');
          var locale      = div.getAttribute('data-locale');
          var lines       = div.getAttribute('data-lines');
          var parts       = repo.split('/');
          var isDark      = document.documentElement.getAttribute('data-theme') === 'dark';
          var activeTheme = isDark ? themeDark : themeLight;

          var svgUrl = statsBase + '/api/pin/?username=' + parts[0] + '&repo=' + parts[1]
                     + '&theme=' + activeTheme + '&locale=' + locale
                     + '&show_owner=' + showOwner + '&description_lines_count=' + lines;

          var probe = new Image();
          probe.onload = function () {
            // Stats service reachable — use the original SVG images
            anchor.innerHTML =
              '<img class="only-light w-100" alt="' + repo + '" src="'
              + statsBase + '/api/pin/?username=' + parts[0] + '&repo=' + parts[1]
              + '&theme=' + themeLight + '&locale=' + locale
              + '&show_owner=' + showOwner + '&description_lines_count=' + lines + '">'
              + '<img class="only-dark w-100" alt="' + repo + '" src="'
              + statsBase + '/api/pin/?username=' + parts[0] + '&repo=' + parts[1]
              + '&theme=' + themeDark + '&locale=' + locale
              + '&show_owner=' + showOwner + '&description_lines_count=' + lines + '">';
          };
          probe.onerror = function () {
            // Stats service down — show HTML card with real data
            anchor.innerHTML = htmlCard(repo, showOwner, data);
          };
          probe.src = svgUrl;
        })
        .catch(function() {});
    });
  });
}());
