/* "Ask Kshitij" — a small on-site search, not a real AI. It matches a
   visitor's question against window.SITE_QA_INDEX (ask-data.js) by keyword
   overlap and returns a short answer + a link to the matching case study.
   No network calls, no API key, nothing that can go off-script — if
   nothing scores well enough, it says so plainly and points to the contact
   form instead of guessing. Builds its own DOM so the same widget works on
   every page from one script include, no markup duplication needed. */
(function () {
  var index = window.SITE_QA_INDEX || [];
  if (!index.length) return;

  var STOPWORDS = ['a', 'an', 'the', 'is', 'are', 'was', 'were', 'do', 'does', 'did',
    'what', 'who', 'how', 'why', 'when', 'where', 'tell', 'me', 'about', 'your', 'you',
    'i', 'to', 'of', 'on', 'in', 'for', 'and', 'or', 'can', 'could', 'please', 'with'];

  function tokenize(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)
      .filter(function (w) { return w && STOPWORDS.indexOf(w) === -1; });
  }

  /* Whole-word matching only — substring matching (tok inside a longer
     string) was scoring "like" as a hit inside "dreamlike," "art" inside
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

  var linkPrefix = /\/(product|marketing|design)\/?(?:index\.html)?$/.test(location.pathname) ? '../' : '';

  var wrap = document.createElement('div');
  wrap.className = 'ask-widget';
  wrap.innerHTML =
    '<button type="button" class="ask-widget__toggle" aria-expanded="false" aria-label="Ask about my work">' +
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 17.5v.01M9.5 9.3a2.5 2.5 0 1 1 3.4 2.33c-.9.36-1.4 1.1-1.4 1.87v.5"/><circle cx="12" cy="12" r="9.5"/></svg>' +
    '</button>' +
    '<div class="ask-widget__panel" hidden>' +
      '<p class="ask-widget__heading">Ask about my work</p>' +
      '<p class="ask-widget__subheading">A quick search over this site, not a live AI. It only knows what is on these pages.</p>' +
      '<div class="ask-widget__log" aria-live="polite"></div>' +
      '<form class="ask-widget__form">' +
        '<input type="text" class="ask-widget__input" placeholder="e.g. What did you do at Treebo?" aria-label="Ask a question">' +
        '<button type="submit" class="ask-widget__send">Ask</button>' +
      '</form>' +
    '</div>';
  document.body.appendChild(wrap);

  var toggle = wrap.querySelector('.ask-widget__toggle');
  var panel = wrap.querySelector('.ask-widget__panel');
  var log = wrap.querySelector('.ask-widget__log');
  var form = wrap.querySelector('.ask-widget__form');
  var input = wrap.querySelector('.ask-widget__input');

  toggle.addEventListener('click', function () {
    var open = panel.hasAttribute('hidden');
    if (open) {
      panel.removeAttribute('hidden');
      toggle.setAttribute('aria-expanded', 'true');
      input.focus();
    } else {
      panel.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  function addBubble(text, cls) {
    var bubble = document.createElement('p');
    bubble.className = 'ask-widget__bubble ' + cls;
    bubble.textContent = text;
    log.appendChild(bubble);
    log.scrollTop = log.scrollHeight;
  }

  function addAnswerBubble(entry) {
    var bubble = document.createElement('div');
    bubble.className = 'ask-widget__bubble ask-widget__bubble--bot';
    var p = document.createElement('p');
    p.textContent = entry.answer;
    bubble.appendChild(p);
    var a = document.createElement('a');
    a.href = (linkPrefix + entry.page.replace(/^\//, '')) || '#';
    a.textContent = 'See ' + entry.title + ' →';
    bubble.appendChild(a);
    log.appendChild(bubble);
    log.scrollTop = log.scrollHeight;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = input.value.trim();
    if (!q) return;
    addBubble(q, 'ask-widget__bubble--user');
    input.value = '';

    var match = bestMatch(q);
    if (match) {
      addAnswerBubble(match);
    } else {
      addBubble("I don't have anything on that here — feel free to reach out through the contact form on the homepage if you'd like to ask directly.", 'ask-widget__bubble--bot');
    }
  });
})();
