/* Scroll-reveal: any element marked .reveal starts lower + transparent (see
   styles.css) and floats up into place the first time it crosses into view.
   One shared IntersectionObserver handles every .reveal element on the
   page — cheap even with a lot of them, since it's one observer, not one
   per element. Each element is unobserved right after it reveals, so this
   only ever plays once per page load, not on every scroll up/down. Skipped
   entirely under prefers-reduced-motion (the CSS also shows everything
   immediately in that case, so this isn't strictly required, but avoids
   pointless observer work). */
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('reveal--visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('reveal--visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

  items.forEach(function (el) { io.observe(el); });
})();
