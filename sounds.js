/* Folder bounce sound — plays once (timed to the folderPop keyframes: 5s
   run, pop starts at 88%, matching each folder's own stagger delay of
   0s/0.15s/0.3s so the sound leads the jump instead of trailing it) each
   time .folders enters view near the vertical center of the viewport — see
   the IntersectionObserver below, which also toggles the .is-in-view class
   the CSS animation itself is gated on (removing/re-adding that class is
   what makes the animation replay). It does NOT repeat while the folders
   stay in view; leaving view and coming back (or reloading the page) is
   what resets it for another single play. Hover/click still play the sound
   regardless of scroll position, since those are direct interactions, not
   the ambient "is anyone looking at this" moment. Browsers also block
   audio until the user has interacted with the page at least once; the
   one-time "unlock" listener fixes that from then on.
   None of this runs at mobile widths at all — the bounce itself is barely
   visible that small and impossible to time against the sound, so mobile
   just shows the folder labels permanently instead (see styles.css). */
(function () {
  var container = document.querySelector('.folders');
  var folders = [
    { el: document.querySelector('.folder--marketing'), delay: 0 },
    { el: document.querySelector('.folder--product'), delay: 150 },
    { el: document.querySelector('.folder--design'), delay: 300 }
  ].filter(function (f) { return f.el; });
  if (!container || !folders.length) return;
  if (window.matchMedia && window.matchMedia('(max-width: 640px)').matches) return;

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var POP_OFFSET = 4400;
  var audios = folders.map(function () {
    var audio = new Audio('sounds/folder-jump.mp3');
    audio.volume = 0.18;
    return audio;
  });

  function play(audio) {
    audio.currentTime = 0;
    audio.play().catch(function () {});
  }

  folders.forEach(function (f, i) {
    var audio = audios[i];
    f.el.addEventListener('mouseenter', function () { play(audio); });
    f.el.addEventListener('click', function () { play(audio); });
  });

  var timers = [];
  function reset() {
    container.classList.remove('is-in-view');
    timers.forEach(clearTimeout);
    timers = [];
  }
  function playOnce() {
    if (reducedMotion) return;
    container.classList.add('is-in-view');
    folders.forEach(function (f, i) {
      var audio = audios[i];
      timers.push(setTimeout(function () { play(audio); }, f.delay + POP_OFFSET));
    });
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) playOnce(); else reset();
      });
    }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 }).observe(container);
  } else {
    playOnce();
  }

  var unlocked = false;
  function unlock() {
    if (unlocked) return;
    unlocked = true;
    audios.forEach(function (audio) {
      audio.play().then(function () {
        audio.pause();
        audio.currentTime = 0;
      }).catch(function () {});
    });
    document.removeEventListener('click', unlock);
    document.removeEventListener('touchstart', unlock);
    document.removeEventListener('keydown', unlock);
  }
  document.addEventListener('click', unlock);
  document.addEventListener('touchstart', unlock);
  document.addEventListener('keydown', unlock);
})();
