/* "Ask about my work" section — a small on-site search, not a real AI. It
   matches a visitor's question (typed, or one of the curated FAQ chips)
   against window.SITE_QA_INDEX (ask-data.js) by whole-word keyword overlap
   and returns a short answer, an optional link to the matching case study,
   and a "Send me a mail" link that scrolls down to the real contact form
   below — every response gets that link, matched or not, so there's always
   one direct next step instead of a dead end. No network calls, no API
   key, nothing that can go off-script. Enhances the static markup in
   index.html rather than building its own DOM, since this now lives inline
   on the homepage instead of floating on every page. */
(function () {
  var index = window.SITE_QA_INDEX || [];
  var log = document.getElementById('ask-log');
  var form = document.getElementById('ask-form');
  var input = document.getElementById('ask-input');
  var chips = document.querySelectorAll('.ask-section__chip');
  if (!index.length || !log || !form) return;

  var byId = {};
  index.forEach(function (entry) { byId[entry.id] = entry; });

  var STOPWORDS = ['a', 'an', 'the', 'is', 'are', 'was', 'were', 'do', 'does', 'did',
    'what', 'who', 'how', 'why', 'when', 'where', 'tell', 'me', 'about', 'your', 'you',
    'i', 'to', 'of', 'on', 'in', 'for', 'and', 'or', 'can', 'could', 'please', 'with'];

  function tokenize(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)
      .filter(function (w) { return w && STOPWORDS.indexOf(w) === -1; });
  }

  /* Whole-word matching only — substring matching (tok inside a longer
     string) scored "like" as a hit inside "dreamlike," "art" inside
     "start," etc., producing confident-looking answers to unrelated
     questions. Tokenizing both sides and checking exact membership avoids
     that whole class of false positive. */
  function bestMatch(query) {
    var qTokens = tokenize(query);
    if (!qTokens.length) return null;

    var best = null;
    var bestScore = 0;
    index.forEach(function (entry) {
      var keywordTokens = tokenize(entry.keywords.join(' '));
      var titleTokens = tokenize(entry.title);
      var answerTokens = tokenize(entry.answer);
      var score = 0;
      qTokens.forEach(function (tok) {
        if (keywordTokens.indexOf(tok) !== -1) score += 3;
        if (titleTokens.indexOf(tok) !== -1) score += 2;
        if (answerTokens.indexOf(tok) !== -1) score += 1;
      });
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    });

    return bestScore >= 3 ? best : null;
  }

  var emptyState = log.querySelector('.ask-section__empty');
  function clearEmptyState() {
    if (emptyState) {
      emptyState.remove();
      emptyState = null;
    }
  }

  function addUserBubble(text) {
    var bubble = document.createElement('p');
    bubble.className = 'ask-bubble ask-bubble--user';
    bubble.textContent = text;
    log.appendChild(bubble);
  }

  function addBotBubble(entry) {
    var bubble = document.createElement('div');
    bubble.className = 'ask-bubble ask-bubble--bot';

    var p = document.createElement('p');
    p.textContent = entry ? entry.answer
      : "I don't have anything on that here — but here's a direct line if you'd rather ask in person.";
    bubble.appendChild(p);

    /* Homepage-only entries (page === "/") have nowhere new to send someone
       — they're already here — so only real subpage/case-study links get
       shown. */
    if (entry && entry.page && entry.page !== '/') {
      var a = document.createElement('a');
      a.href = entry.page;
      a.textContent = 'See ' + entry.title + ' →';
      bubble.appendChild(a);
    }

    var mail = document.createElement('a');
    mail.href = '#contact';
    mail.className = 'ask-bubble__mail';
    mail.textContent = 'Send me a mail →';
    mail.addEventListener('click', function (e) {
      e.preventDefault();
      var contact = document.getElementById('contact');
      if (!contact) return;
      contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(function () {
        var messageField = document.getElementById('contact-message');
        if (messageField) messageField.focus();
      }, 500);
    });
    bubble.appendChild(mail);

    log.appendChild(bubble);
    log.scrollTop = log.scrollHeight;
  }

  function ask(questionText, entry) {
    clearEmptyState();
    addUserBubble(questionText);
    addBotBubble(entry);
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var entry = byId[chip.dataset.qaId];
      ask(chip.textContent, entry);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = input.value.trim();
    if (!q) return;
    ask(q, bestMatch(q));
    input.value = '';
  });
})();
