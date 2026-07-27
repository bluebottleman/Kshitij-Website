/* "Designs" flips rapidly through a stack of very different display fonts
   on load — like an Apple device's startup splash cycling through
   languages/scripts — then settles back onto the site's own Headland One
   for the rest of the visit. Ten fonts x 180ms is ~1.8s, brief enough to
   read as a flourish rather than a distraction. */
(function () {
  var el = document.querySelector('.font-cycle');
  if (!el) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var fonts = [
    "'Bungee', sans-serif",
    "'Pacifico', cursive",
    "'Righteous', sans-serif",
    "'Permanent Marker', cursive",
    "'Press Start 2P', monospace",
    "'Lobster', cursive",
    "'Bebas Neue', sans-serif",
    "'Caveat', cursive",
    "'Abril Fatface', serif",
    "'Monoton', cursive"
  ];

  var i = 0;
  var STEP = 180;

  var interval = setInterval(function () {
    el.style.fontFamily = fonts[i % fonts.length];
    i++;
    if (i > fonts.length) {
      clearInterval(interval);
      el.style.fontFamily = '';
    }
  }, STEP);
})();
