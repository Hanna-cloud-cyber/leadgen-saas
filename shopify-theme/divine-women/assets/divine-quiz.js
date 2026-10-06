// Free archetype quiz: each answer points to one family; most points wins.
(function () {
  var root = document.querySelector('[data-dw-quiz]');
  if (!root) return;
  var buyUrl = root.getAttribute('data-buy-url');
  var buyLabel = root.getAttribute('data-buy-label');
  var answers = [];
  var data = null;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function render() {
    var q = data.quiz;
    var step = answers.length;
    if (step === q.length) {
      var scores = {};
      answers.forEach(function (a) { scores[a] = (scores[a] || 0) + 1; });
      var ranked = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a]; });
      var fam = data.families.filter(function (f) { return f.id === ranked[0]; })[0];
      var sec = ranked[1] && data.families.filter(function (f) { return f.id === ranked[1]; })[0];
      root.innerHTML =
        '<div class="dw-center"><p class="dw-eyebrow">Your archetype family</p>' +
        '<h1 class="dw-serif dw-gold" style="font-size:40px">' + esc(fam.name) + '</h1>' +
        '<p class="dw-eyebrow" style="color:var(--rose);margin-top:12px">' + esc(fam.essence) + '</p>' +
        '<p class="dw-muted" style="line-height:1.7;margin-top:24px">' + esc(fam.description) + '</p>' +
        (sec ? '<p class="dw-muted" style="font-size:14px">With a strong secondary pull toward <span style="color:var(--cream)">' + esc(sec.name) + '</span>.</p>' : '') +
        '<div class="dw-quiz__chips">' + fam.archetypes.map(function (n) { return '<span class="dw-card">' + esc(n) + '</span>'; }).join('') + '</div>' +
        '<div class="dw-frame dw-quiz__offer"><h2 class="dw-serif"><span class="dw-gold">One of these 6 is you. </span><span class="dw-rose">Find out which.</span></h2>' +
        '<p class="dw-muted" style="font-size:14px;line-height:1.7">The Self-Discovery Test inside the guide reveals your exact archetype out of all 30.</p>' +
        '<div style="max-width:24rem;margin:24px auto 0"><a class="dw-btn dw-btn--gold" href="' + esc(buyUrl) + '">' + esc(buyLabel) + '</a></div></div>' +
        '<button type="button" class="dw-link" data-retake>Retake the quiz</button></div>';
      root.querySelector('[data-retake]').onclick = function () { answers = []; render(); };
      return;
    }
    var cur = q[step];
    root.innerHTML =
      '<div class="dw-quiz__meta"><span>Question ' + (step + 1) + ' / ' + q.length + '</span>' +
      (step > 0 ? '<button type="button" data-back>&larr; Back</button>' : '') + '</div>' +
      '<div class="dw-quiz__bar"><div style="width:' + (step / q.length * 100) + '%"></div></div>' +
      '<h1 class="dw-serif dw-gold">' + esc(cur.q) + '</h1>' +
      '<div class="dw-quiz__answers">' + cur.answers.map(function (a, i) {
        return '<button type="button" class="dw-card dw-quiz__answer" data-i="' + i + '">' + esc(a.text) + '</button>';
      }).join('') + '</div>' +
      '<p class="dw-small dw-center" style="margin-top:32px">No email required.</p>';
    Array.prototype.forEach.call(root.querySelectorAll('[data-i]'), function (b) {
      b.onclick = function () { answers.push(cur.answers[+b.getAttribute('data-i')].family); render(); };
    });
    var back = root.querySelector('[data-back]');
    if (back) back.onclick = function () { answers.pop(); render(); };
  }

  try {
    data = JSON.parse(document.getElementById('dw-quiz-data').textContent);
    render();
  } catch (e) {
    root.innerHTML = '<p class="dw-muted dw-center">The quiz could not load. Please refresh the page.</p>';
  }
})();
