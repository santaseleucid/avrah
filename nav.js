// ══ Active Tab by Path ══
(function() {
  var links = document.querySelectorAll('.nav-links a');
  var current = location.pathname.replace(/\/index\.html$/, '/');
  links.forEach(function(a) {
    // a.href resolves relative URLs to absolute automatically
    var linkPath = a.href.replace(location.origin, '').replace(/\/index\.html$/, '/');
    if (linkPath === current) {
      a.classList.add('active-tab');
    }
  });
})();
