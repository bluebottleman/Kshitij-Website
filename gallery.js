/* Timeline project image galleries. Each .timeline-card__images holds every
   photo for that project (CSS only shows the first 4), so clicking any
   thumbnail opens the full set in a shared full-screen lightbox — prev/next
   buttons, arrow keys, swipe on touch, and a "+N" badge on the 4th tile
   hinting there's more beyond the preview grid. */
(function () {
  var galleries = document.querySelectorAll('.timeline-card__images');
  if (!galleries.length) return;

  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Close">&times;</button>' +
    '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous image">&#8249;</button>' +
    '<img class="lightbox__img" alt="">' +
    '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next image">&#8250;</button>' +
    '<p class="lightbox__counter"></p>';
  document.body.appendChild(overlay);

  var imgEl = overlay.querySelector('.lightbox__img');
  var counterEl = overlay.querySelector('.lightbox__counter');
  var currentImages = [];
  var currentIndex = 0;

  function show(index) {
    currentIndex = (index + currentImages.length) % currentImages.length;
    var item = currentImages[currentIndex];
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    counterEl.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
  }

  function open(images, index) {
    currentImages = images;
    show(index);
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  galleries.forEach(function (gallery) {
    var imgs = Array.prototype.slice.call(gallery.querySelectorAll('img'));
    if (!imgs.length) return;

    var images = imgs.map(function (img) { return { src: img.currentSrc || img.src, alt: img.alt }; });

    if (images.length > 4) {
      var slots = gallery.querySelectorAll('.timeline-card__image-slot');
      var fourth = slots[3];
      if (fourth) {
        var badge = document.createElement('span');
        badge.className = 'timeline-card__image-slot__more';
        badge.setAttribute('aria-hidden', 'true');
        badge.textContent = '+' + (images.length - 4);
        fourth.appendChild(badge);
      }
    }

    imgs.forEach(function (img, i) {
      var slot = img.closest('.timeline-card__image-slot');
      if (!slot) return;
      slot.setAttribute('role', 'button');
      slot.setAttribute('tabindex', '0');
      slot.setAttribute('aria-label', 'View image ' + (i + 1) + ' of ' + images.length);
      slot.addEventListener('click', function () { open(images, i); });
      slot.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(images, i);
        }
      });
    });
  });

  overlay.querySelector('.lightbox__close').addEventListener('click', close);
  overlay.querySelector('.lightbox__nav--prev').addEventListener('click', function () { show(currentIndex - 1); });
  overlay.querySelector('.lightbox__nav--next').addEventListener('click', function () { show(currentIndex + 1); });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentIndex + 1);
  });

  var touchStartX = null;
  overlay.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  overlay.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) show(currentIndex + (dx < 0 ? 1 : -1));
    touchStartX = null;
  }, { passive: true });
})();
