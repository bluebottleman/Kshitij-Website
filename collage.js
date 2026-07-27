/* Intro banner collage on /product/ and /marketing/. Pool of images comes
   straight from every project's gallery further down the same page (not a
   separate hardcoded list), so it can't drift out of sync with the actual
   projects listed. A tile swaps to a fresh, not-currently-shown image every
   few seconds via a quick fade, so the wall feels alive without anything
   jarring. */
(function () {
  var collage = document.querySelector('.project-collage');
  if (!collage) return;

  var pool = Array.prototype.map.call(
    document.querySelectorAll('.timeline-card__images img'),
    function (img) { return img.currentSrc || img.src; }
  );
  if (!pool.length) return;

  var tiles = Array.prototype.slice.call(collage.querySelectorAll('.project-collage__tile img'));
  var shuffled = pool.slice().sort(function () { return Math.random() - 0.5; });

  tiles.forEach(function (img, i) {
    img.src = shuffled[i % shuffled.length];
  });

  function swapRandomTile() {
    if (pool.length <= tiles.length) return;

    var img = tiles[Math.floor(Math.random() * tiles.length)];
    var used = tiles.map(function (t) { return t.src; });
    var candidates = pool.filter(function (src) { return used.indexOf(src) === -1; });
    if (!candidates.length) return;

    var next = candidates[Math.floor(Math.random() * candidates.length)];
    img.style.opacity = 0;
    setTimeout(function () {
      img.src = next;
      img.style.opacity = 1;
    }, 400);
  }

  setInterval(swapRandomTile, 3500);
})();
