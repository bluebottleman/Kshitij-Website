/* Page-color circle transitions. Clicking a folder grows a circle (in the
   destination page's color) from the click point to cover the screen, then
   navigates. The click point is remembered (sessionStorage) so that when the
   visitor later backs out to the homepage, the circle can shrink back down
   to the exact folder it opened from — "the folder closing" — instead of a
   generic fade. Anywhere else, a fresh/direct page load still gets the
   original "circle eases in from center" reveal; a page landed on straight
   from its own folder click skips that, since the circle already covers it
   in the right color and playing a second shrink read as the color
   "flashing" twice. */
/* Safety net for the browser's back-forward cache. Clicking a folder link
   leaves its transition-circle in the DOM, fully grown, right up until the
   page unloads for a normal navigation — harmless, since the whole page is
   about to be replaced. But some browsers snapshot that exact DOM state for
   instant "Back" restores, circle included, so returning to the page can
   show it frozen mid-transition (solid color, no content). "pageshow" with
   persisted:true fires only on that kind of cache restore, so this only
   ever runs when there's stale animation state to clear. */
window.addEventListener('pageshow', function (e) {
  if (e.persisted) {
    document.querySelectorAll('.transition-circle').forEach(function (el) { el.remove(); });
  }
});

(function () {
  var SECTION_RE = /\/(product|marketing|design)\/?(?:index\.html)?$/;

  function createCircle(color) {
    var el = document.createElement('div');
    el.className = 'transition-circle';
    el.style.background = color;
    document.body.appendChild(el);
    return el;
  }

  function shrinkCircleTo(color, x, y) {
    var circle = createCircle(color);
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
    circle.classList.add('is-active');

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        circle.classList.remove('is-active');
      });
    });

    circle.addEventListener('transitionend', function () {
      circle.remove();
    });
  }

  var referrerIsOwnSite = false;
  try { referrerIsOwnSite = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch (err) {}
  var referrerIsSection = referrerIsOwnSite && SECTION_RE.test(document.referrer);
  var referrerIsHome = referrerIsOwnSite && !referrerIsSection;

  document.querySelectorAll('a[data-transition-color]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      var color = link.dataset.transitionColor;
      if (!href || !color) return;

      e.preventDefault();
      var rect = link.getBoundingClientRect();
      var x = rect.left + rect.width / 2;
      var y = rect.top + rect.height / 2;

      if (link.classList.contains('folder')) {
        sessionStorage.setItem('folderOrigin', JSON.stringify({ x: x, y: y, color: color }));
      }

      var circle = createCircle(color);
      circle.style.left = x + 'px';
      circle.style.top = y + 'px';

      requestAnimationFrame(function () {
        circle.classList.add('is-active');
      });

      setTimeout(function () { window.location.href = href; }, 550);
    });
  });

  var storedOrigin = null;
  try { storedOrigin = JSON.parse(sessionStorage.getItem('folderOrigin')); } catch (err) {}

  var isHome = document.body.classList.contains('page-home');
  var pageColor = document.body.dataset.transitionColor;

  if (isHome && referrerIsSection && storedOrigin) {
    // The return trip: shrink the section's color back down to the exact
    // folder it opened from, revealing the homepage underneath.
    sessionStorage.removeItem('folderOrigin');
    shrinkCircleTo(storedOrigin.color, storedOrigin.x, storedOrigin.y);
  } else if (!isHome && referrerIsHome && storedOrigin && storedOrigin.color === pageColor) {
    // Landed here straight from the matching folder click — the outgoing
    // circle already covers the page in this color, so there's nothing left
    // to visibly "arrive"; skip the extra shrink to avoid a double-flash.
  } else if (pageColor) {
    // Any other load (direct link, refresh, bookmark) still gets the
    // original center-out reveal.
    shrinkCircleTo(pageColor, window.innerWidth / 2, window.innerHeight / 2);
  }
})();

/* Bottom nav hides while the page is actively scrolling, then reappears 1s
   after scrolling stops — keeps it out of the way while reading without
   ever making it feel gone for good. */
(function () {
  var nav = document.querySelector('.pill-nav, .back-nav');
  if (!nav) return;
  var backdrop = document.querySelector('.bottom-nav-backdrop');
  var hideTimer = null;

  window.addEventListener('scroll', function () {
    nav.classList.add('is-nav-hidden');
    if (backdrop) backdrop.classList.add('is-nav-hidden');

    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      nav.classList.remove('is-nav-hidden');
      if (backdrop) backdrop.classList.remove('is-nav-hidden');
    }, 1000);
  }, { passive: true });
})();

/* The underline under "Kshitij Patil" draws in on its own 1s after load,
   regardless of device — it's a "this is clickable" hint, not a hover
   state, so it shouldn't wait for a hover to ever happen. */
(function () {
  var name = document.querySelector('.hero__name');
  if (!name) return;
  setTimeout(function () { name.classList.add('is-underlined'); }, 1000);
})();

/* Tapping "Kshitij Patil" on touch devices reveals the preview photo for 1s,
   then fades it out over the next 1s — desktop just uses :hover in CSS, so
   this only needs to run where there's no fine hover pointer to rely on. */
(function () {
  var name = document.querySelector('.hero__name');
  if (!name || (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches)) return;

  var holdTimer = null;
  var fadeTimer = null;

  name.addEventListener('click', function () {
    clearTimeout(holdTimer);
    clearTimeout(fadeTimer);
    name.classList.remove('is-fading');
    name.classList.add('is-active');

    holdTimer = setTimeout(function () {
      name.classList.remove('is-active');
      name.classList.add('is-fading');
      fadeTimer = setTimeout(function () {
        name.classList.remove('is-fading');
      }, 1000);
    }, 1000);
  });
})();

/* Deep-links straight to a timeline entry (e.g. the homepage's "how this
   site was built" banner linking to product/#how-i-built-this) open that
   entry and scroll it into view on load, closing whichever entry ships
   open by default so the linked-to one is the one actually in focus. */
(function () {
  var hash = window.location.hash;
  if (!hash) return;

  var target;
  try { target = document.querySelector(hash); } catch (err) { return; }
  if (!target || target.tagName !== 'DETAILS') return;

  document.querySelectorAll('.timeline-entry[open]').forEach(function (d) { d.open = false; });
  target.open = true;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
})();
