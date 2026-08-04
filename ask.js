/* "Ask about my work" section — a small on-site search, not a real AI. It
   matches a visitor's question (typed, or one of the curated FAQ chips)
   against window.SITE_QA_INDEX (ask-data.js) by whole-word keyword overlap
   and returns a short, first-person answer plus an optional link to the
   matching case study. The "prefer email?" link lives once, permanently,
   near the input — it used to repeat on every single reply, which read as
   noisy in a growing conversation, so now it's one persistent affordance
   instead of a stamp on every message. No network calls, no API key,
   nothing that can go off-script. Enhances the static markup in index.html
   rather than building its own DOM, since this lives inline on the
   homepage instead of floating on every page. */
(function () {
  var index = window.SITE_QA_INDEX || [];
  var log = document.getElementById('ask-log');
  var form = document.getElementById('ask-form');
  var input = document.getElementById('ask-input');
  var chips = document.querySelectorAll('.ask-section__chip');
  var mailLink = document.getElementById('ask-mail-link');
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
     that whole class of false positive. Keyword hits are worth more than
     title/answer hits since they're a deliberately curated signal, not a
     coincidental word overlap — widening the keyword lists in ask-data.js
     is the safe way to catch more real questions, rather than lowering
     this threshold and risking more confident-but-wrong matches. */
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
      : "That one's outside what I've got written up here — try asking it a different way, or just email me directly (there's a link right below).";
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

  if (mailLink) {
    mailLink.addEventListener('click', function (e) {
      e.preventDefault();
      var contact = document.getElementById('contact');
      if (!contact) return;
      contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(function () {
        var messageField = document.getElementById('contact-message');
        if (messageField) messageField.focus();
      }, 500);
    });
  }
})();
