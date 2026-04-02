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

  function buildCard(anchor, data) {
    var repo = anchor.getAttribute('data-repo');
    var parts = repo.split('/');
    var showOwner = anchor.getAttribute('data-show-owner') === 'true';
    anchor.innerHTML =
      '<div class="github-pin-card">'
      + '<div class="gpc-header">'
      + '<svg class="gpc-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/></svg>'
      + '<span class="gpc-title">'
      + (showOwner ? '<span class="gpc-owner">' + parts[0] + ' / </span>' : '')
      + parts[1]
      + '</span></div>'
      + '<p class="gpc-description">' + (data.description || '') + '</p>'
      + '<div class="gpc-footer">'
      + (data.language ? '<span class="gpc-lang"><span class="gpc-lang-dot" style="background:' + (LANG_COLORS[data.language] || '#8b949e') + '"></span>' + data.language + '</span>' : '')
      + '<span class="gpc-stars"><svg viewBox="0 0 16 16" width="14" height="14" fill="#586069"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg> ' + fmt(data.stargazers_count) + '</span>'
      + '<span class="gpc-forks"><svg viewBox="0 0 16 16" width="14" height="14" fill="#586069"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/></svg> ' + fmt(data.forks_count) + '</span>'
      + '</div></div>';
  }

  function activateFallback(anchor) {
    if (anchor._fallbackFetched) return;
    anchor._fallbackFetched = true;
    fetch('https://api.github.com/repos/' + anchor.getAttribute('data-repo'))
      .then(function(r) { return r.ok ? r.json() : null; })
      .then(function(d) { if (d) buildCard(anchor, d); })
      .catch(function(){});
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.github-stats-img').forEach(function (img) {
      var anchor = img.closest('a[data-repo]');
      if (!anchor) return;
      img.onerror = function () { activateFallback(anchor); };
      if (img.complete && img.naturalWidth === 0) activateFallback(anchor);
    });
  });
}());
