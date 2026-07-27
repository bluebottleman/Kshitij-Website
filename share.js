/* Homepage share button. Uses the native share sheet where available
   (mobile browsers, and some desktop browsers); falls back to copying the
   page URL to the clipboard and flashing a confirmation message, styled and
   timed the same way as the tic-tac-toe status text. */
(function () {
  var button = document.getElementById('share-button');
  var status = document.querySelector('.share-status');
  if (!button) return;

  function showStatus(text) {
    if (!status) return;
    status.textContent = text;
    status.classList.add('is-visible');
    setTimeout(function () {
      status.classList.remove('is-visible');
    }, 2000);
  }

  button.addEventListener('click', function () {
    var shareData = { title: document.title, url: window.location.href };

    if (navigator.share) {
      navigator.share(shareData).catch(function () {});
      return;
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareData.url)
        .then(function () { showStatus('Link copied!'); })
        .catch(function () { showStatus('Could not copy link'); });
    }
  });
})();
