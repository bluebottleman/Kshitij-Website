/* Submits the contact form with fetch instead of a full-page POST, so a
   failed or misconfigured submission shows an inline message here instead
   of dumping the visitor onto Netlify's generic 404 page. This does not
   change whether Netlify actually records the submission — that still
   depends on Netlify having detected the form (data-netlify + the hidden
   form-name field) at deploy time. Check Site settings -> Forms in the
   Netlify dashboard to confirm "contact" is listed there. */
(function () {
  var form = document.querySelector('.contact-form');
  var status = document.querySelector('.contact-form__status');
  if (!form) return;

  function showStatus(text, isError) {
    if (!status) return;
    status.textContent = text;
    status.classList.toggle('is-error', !!isError);
    status.classList.add('is-visible');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var body = new URLSearchParams(new FormData(form)).toString();

    fetch(form.getAttribute('action') || '/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body
    }).then(function (response) {
      if (response.ok) {
        showStatus('Thanks — I’ll get back to you soon.', false);
        form.reset();
      } else {
        showStatus('Something went wrong — please try again or email me directly.', true);
      }
    }).catch(function () {
      showStatus('Something went wrong — please try again or email me directly.', true);
    });
  });
})();
