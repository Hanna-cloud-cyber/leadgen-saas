(function () {
  "use strict";

  var DATA = window.SOLSTICE_DATA;
  var STORAGE_KEY = "solstice-demandes";
  var euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

  function $(sel) { return document.querySelector(sel); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Petit générateur pseudo-aléatoire déterministe : chaque destination garde le même dessin.
  function seeded(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return function () {
      h += 0x6d2b79f5;
      var t = Math.imul(h ^ (h >>> 15), 1 | h);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function ridge(rnd, base, amp, steps, sharp) {
    var pts = ["0,300", "0," + base];
    for (var i = 1; i <= steps; i++) {
      var x = (400 / steps) * i;
      var y = base - rnd() * amp;
      if (sharp && i % 2 === 0) y = base - amp * (0.6 + rnd() * 0.4);
      pts.push(x.toFixed(1) + "," + y.toFixed(1));
    }
    pts.push("400,300");
    return pts.join(" ");
  }

  function dunes(rnd, base, amp) {
    var d = "M0," + base;
    for (var x = 0; x < 400; x += 100) {
      var c = base - amp * (0.4 + rnd());
      d += " Q" + (x + 50) + "," + c.toFixed(1) + " " + (x + 100) + "," + (base - rnd() * amp * 0.3).toFixed(1);
    }
    return d + " L400,300 L0,300 Z";
  }

  // Illustration vectorielle de chaque destination (pas de photo à charger).
  function scene(d) {
    var rnd = seeded(d.id);
    var g = "g-" + d.id;
    var top = d.sky[0], low = d.sky[1];
    var dark = "#0d1c18";
    var sunX = 80 + rnd() * 240;
    var s = '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + esc(d.name) + '">';
    s += '<defs><linearGradient id="' + g + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + top + '"/><stop offset="1" stop-color="' + low + '"/></linearGradient>';
    s += '<linearGradient id="' + g + '-a" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6ef0b4" stop-opacity="0"/><stop offset=".5" stop-color="#6ef0b4" stop-opacity=".75"/><stop offset="1" stop-color="#a98bff" stop-opacity="0"/></linearGradient></defs>';
    s += '<rect width="400" height="300" fill="url(#' + g + ')"/>';

    switch (d.scene) {
      case "ocean":
        s += '<circle cx="' + sunX + '" cy="170" r="38" fill="#fff4dc" opacity=".85"/>';
        s += '<rect y="180" width="400" height="120" fill="' + top + '"/>';
        s += '<rect y="180" width="400" height="120" fill="' + dark + '" opacity=".25"/>';
        for (var w = 0; w < 7; w++) {
          s += '<rect x="' + (sunX - 40 + rnd() * 20) + '" y="' + (190 + w * 9) + '" width="' + (70 - w * 6) + '" height="2" fill="#fff4dc" opacity="' + (0.6 - w * 0.07) + '"/>';
        }
        s += '<path d="M250,182 Q300,140 350,182 Z" fill="' + dark + '" opacity=".8"/>';
        for (var b = 0; b < 5; b++) {
          var bx = 30 + b * 34;
          s += '<rect x="' + (bx + 3) + '" y="195" width="2" height="16" fill="' + dark + '"/><rect x="' + (bx + 19) + '" y="195" width="2" height="16" fill="' + dark + '"/>';
          s += '<path d="M' + bx + ',197 L' + (bx + 12) + ',185 L' + (bx + 24) + ',197 Z" fill="' + dark + '"/>';
        }
        s += '<rect x="30" y="205" width="160" height="2" fill="' + dark + '"/>';
        break;
      case "mountain":
        s += '<circle cx="' + sunX + '" cy="70" r="22" fill="#fff" opacity=".7"/>';
        s += '<polygon points="' + ridge(rnd, 190, 120, 8, true) + '" fill="' + dark + '" opacity=".35"/>';
        s += '<polygon points="' + ridge(rnd, 215, 90, 6, true) + '" fill="' + dark + '" opacity=".6"/>';
        s += '<rect y="235" width="400" height="65" fill="#5f8fa3" opacity=".9"/>';
        s += '<polygon points="' + ridge(rnd, 270, 30, 10, false) + '" fill="' + dark + '"/>';
        break;
      case "savanna":
        s += '<circle cx="' + sunX + '" cy="190" r="56" fill="#ffd79a" opacity=".85"/>';
        s += '<rect y="215" width="400" height="85" fill="' + dark + '" opacity=".85"/>';
        s += '<rect x="112" y="150" width="6" height="70" fill="' + dark + '"/>';
        s += '<ellipse cx="115" cy="150" rx="62" ry="12" fill="' + dark + '"/>';
        s += '<ellipse cx="130" cy="140" rx="40" ry="9" fill="' + dark + '"/>';
        var hx = 250 + rnd() * 80;
        s += '<circle cx="' + hx + '" cy="70" r="20" fill="' + dark + '" opacity=".75"/><path d="M' + (hx - 15) + ',82 L' + (hx - 5) + ',100 L' + (hx + 5) + ',100 L' + (hx + 15) + ',82 Z" fill="' + dark + '" opacity=".75"/><rect x="' + (hx - 5) + '" y="100" width="10" height="7" fill="' + dark + '" opacity=".75"/>';
        for (var a = 0; a < 9; a++) {
          var ax = 190 + a * 22 + rnd() * 8;
          s += '<ellipse cx="' + ax + '" cy="212" rx="7" ry="4" fill="' + dark + '"/>';
        }
        break;
      case "ice":
        for (var st = 0; st < 40; st++) {
          s += '<circle cx="' + (rnd() * 400).toFixed(0) + '" cy="' + (rnd() * 170).toFixed(0) + '" r="' + (rnd() * 1.2 + 0.3).toFixed(1) + '" fill="#fff" opacity=".8"/>';
        }
        s += '<path d="M-20,120 C80,40 160,150 250,80 S380,60 430,110" stroke="url(#' + g + '-a)" stroke-width="38" fill="none" opacity=".7"/>';
        s += '<path d="M-20,150 C90,90 180,170 260,120 S370,100 430,140" stroke="url(#' + g + '-a)" stroke-width="16" fill="none" opacity=".5"/>';
        s += '<path d="' + dunes(rnd, 240, 40) + '" fill="#dfeaf0"/>';
        s += '<path d="M150,242 A34,34 0 0 1 218,242 Z" fill="#b8e6ff" opacity=".35" stroke="#fff" stroke-width="1.5"/>';
        s += '<circle cx="184" cy="232" r="5" fill="#ffd79a"/>';
        for (var p = 0; p < 6; p++) {
          var px = 250 + p * 26 + rnd() * 10, ph = 30 + rnd() * 25;
          s += '<polygon points="' + px + ',' + (238 - ph) + ' ' + (px - 9) + ',240 ' + (px + 9) + ',240" fill="' + dark + '"/>';
        }
        break;
      case "desert":
        s += '<circle cx="' + sunX + '" cy="120" r="30" fill="#ffe2b0" opacity=".9"/>';
        s += '<path d="M40,230 L55,150 Q80,120 105,150 L118,230 Z" fill="' + dark + '" opacity=".55"/>';
        s += '<path d="M270,230 L282,165 Q305,140 330,170 L345,230 Z" fill="' + dark + '" opacity=".55"/>';
        s += '<path d="' + dunes(rnd, 235, 40) + '" fill="#c77b4d" opacity=".9"/>';
        s += '<path d="' + dunes(rnd, 265, 30) + '" fill="' + dark + '" opacity=".75"/>';
        break;
      case "coast":
        s += '<circle cx="' + sunX + '" cy="95" r="26" fill="#fff4dc" opacity=".9"/>';
        s += '<rect y="175" width="400" height="125" fill="#1f5f86"/>';
        s += '<path d="M400,300 L400,90 Q330,110 300,170 Q270,210 230,300 Z" fill="' + dark + '" opacity=".85"/>';
        var cols = ["#f3d9b1", "#e9a58a", "#f6efe4", "#e6c27a"];
        for (var h = 0; h < 12; h++) {
          var cx = 300 + (h % 4) * 22 + rnd() * 6, cy = 120 + Math.floor(h / 4) * 26 + rnd() * 6;
          s += '<rect x="' + cx.toFixed(0) + '" y="' + cy.toFixed(0) + '" width="16" height="14" fill="' + cols[h % 4] + '"/>';
        }
        s += '<path d="M60,236 L130,236 L120,246 L70,246 Z" fill="#f6efe4"/><rect x="92" y="212" width="2" height="24" fill="#f6efe4"/><path d="M95,214 L118,232 L95,232 Z" fill="#f6efe4"/>';
        break;
      case "city":
        s += '<circle cx="' + sunX + '" cy="85" r="30" fill="#fff0e0" opacity=".85"/>';
        s += '<polygon points="' + ridge(rnd, 200, 70, 6, false) + '" fill="' + dark + '" opacity=".3"/>';
        var tx = 250;
        for (var t = 0; t < 5; t++) {
          var y = 110 + t * 24, wdt = 30 + t * 10;
          s += '<path d="M' + (tx - wdt) + ',' + (y + 12) + ' Q' + tx + ',' + (y - 4) + ' ' + (tx + wdt) + ',' + (y + 12) + ' Z" fill="' + dark + '"/>';
          s += '<rect x="' + (tx - wdt * 0.55) + '" y="' + (y + 12) + '" width="' + wdt * 1.1 + '" height="12" fill="' + dark + '"/>';
        }
        s += '<rect x="248" y="90" width="4" height="22" fill="' + dark + '"/>';
        s += '<polygon points="' + ridge(rnd, 245, 25, 12, false) + '" fill="' + dark + '"/>';
        for (var c = 0; c < 5; c++) {
          s += '<circle cx="' + (40 + c * 30) + '" cy="' + (238 - rnd() * 16) + '" r="' + (12 + rnd() * 6) + '" fill="#e9a3b4" opacity=".75"/>';
        }
        break;
    }
    return s + "</svg>";
  }

  // ---------- Tableau des départs ----------
  function renderBoard() {
    var rows = $("#board-rows");
    var list = DATA.destinations.slice();
    var offset = 0;
    var statuses = ["À l'heure", "Embarquement", "Confirmé", "Dernières places"];
    function draw(animate) {
      var html = "";
      for (var i = 0; i < 4; i++) {
        var d = list[(offset + i) % list.length];
        html += '<div class="board-row' + (animate ? " flip" : "") + '"><b>' + esc(d.name) + "</b><span>" + esc(d.coords.split(" · ")[0]) + '</span><span class="st">' + statuses[(offset + i) % statuses.length] + "</span></div>";
      }
      rows.innerHTML = html;
    }
    draw(false);
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setInterval(function () { offset = (offset + 1) % list.length; draw(true); }, 3200);
    $("#hero-scene").innerHTML = scene({ id: "hero", scene: "ocean", sky: ["#0f3e4a", "#d69a6a"], name: "Lagon au coucher du soleil" });
  }

  // ---------- Destinations ----------
  var activeRegion = "Toutes";

  function renderFilters() {
    var counts = { Toutes: DATA.destinations.length };
    DATA.destinations.forEach(function (d) { counts[d.region] = (counts[d.region] || 0) + 1; });
    var html = "";
    Object.keys(counts).forEach(function (r) {
      html += '<button type="button" class="chip" data-region="' + esc(r) + '" aria-pressed="' + (r === activeRegion) + '">' + esc(r) + '<span class="n">' + counts[r] + "</span></button>";
    });
    $("#filters").innerHTML = html;
  }

  function renderDestinations() {
    var html = "";
    DATA.destinations.forEach(function (d) {
      if (activeRegion !== "Toutes" && d.region !== activeRegion) return;
      html += '<article class="dest">' +
        '<div class="art">' + scene(d) + '<span class="coords">' + esc(d.coords) + "</span></div>" +
        '<div class="body">' +
        '<span class="where">' + esc(d.country) + " · " + esc(d.region) + "</span>" +
        "<h3>" + esc(d.name) + "</h3>" +
        '<p class="stay">' + esc(d.stay) + "</p>" +
        '<p class="text">' + esc(d.text) + "</p>" +
        "<dl><div><dt>Saison</dt><dd>" + esc(d.season) + "</dd></div><div><dt>Vol</dt><dd>" + esc(d.flight) + "</dd></div><div><dt>Durée</dt><dd>" + d.nights + " nuits</dd></div></dl>" +
        '<div class="foot"><span class="price">À partir de<b>' + euro.format(d.price) + '</b></span><button type="button" class="link-btn" data-pick="' + esc(d.name + " · " + d.country) + '">Composer ce voyage</button></div>' +
        "</div></article>";
    });
    $("#dest-grid").innerHTML = html;
  }

  $("#filters").addEventListener("click", function (e) {
    var btn = e.target.closest(".chip");
    if (!btn) return;
    activeRegion = btn.getAttribute("data-region");
    renderFilters();
    renderDestinations();
  });

  // ---------- Expériences, voyage signature, avis ----------
  function renderExperiences() {
    $("#exp-list").innerHTML = DATA.experiences.map(function (x) {
      return '<div class="exp"><div><h3>' + esc(x.title) + '</h3><div class="meta">' + esc(x.place) + " · " + esc(x.duration) + "</div></div>" +
        "<p>" + esc(x.text) + "</p>" +
        '<span class="price">Par personne<b>' + euro.format(x.price) + "</b></span></div>";
    }).join("");
  }

  function renderSignature() {
    var s = DATA.signature;
    $("#sig-title").innerHTML = esc(s.title.replace(/ en jet privé$/, "")) + " <em>en jet privé</em>";
    $("#sig-dep").textContent = s.departure + ". Six escales, un seul avion, aucune file d'attente.";
    $("#sig-sum").innerHTML =
      "<div><strong>" + s.days + " jours</strong>de voyage</div>" +
      "<div><strong>" + esc(s.guests) + "</strong>maximum</div>" +
      "<div><strong>" + euro.format(s.price) + "</strong>par personne</div>";
    $("#sig-route").innerHTML = s.stops.map(function (st) {
      return '<li><span class="d">' + esc(st.days) + '</span><span><span class="p">' + esc(st.place) + '</span><span class="n">' + esc(st.note) + "</span></span></li>";
    }).join("");
  }

  function renderQuotes() {
    $("#quotes").innerHTML = DATA.testimonials.map(function (t) {
      return "<figure><blockquote>« " + esc(t.quote) + " »</blockquote><figcaption><b>" + esc(t.who) + "</b><br>" + esc(t.trip) + "</figcaption></figure>";
    }).join("");
  }

  // ---------- Formulaire de devis ----------
  var form = $("#quote-form");
  var destSelect = $("#f-dest");
  var SIGNATURE_LABEL = "Tour du monde en jet privé";

  function fillDestinations() {
    var html = '<option value="">Choisir une destination</option>';
    DATA.destinations.forEach(function (d) {
      var label = d.name + " · " + d.country;
      html += '<option value="' + esc(label) + '">' + esc(label) + "</option>";
    });
    html += '<option value="' + SIGNATURE_LABEL + '">' + SIGNATURE_LABEL + "</option>";
    html += '<option value="Autre">Autre idée, à discuter</option>';
    destSelect.innerHTML = html;
  }

  function priceFor(label) {
    if (label === SIGNATURE_LABEL) return DATA.signature.price;
    for (var i = 0; i < DATA.destinations.length; i++) {
      var d = DATA.destinations[i];
      if (d.name + " · " + d.country === label) return d.price;
    }
    return null;
  }

  function updateEstimate() {
    var p = priceFor(destSelect.value);
    var guests = parseInt($("#f-guests").value, 10) || 1;
    var el = $("#estimate");
    if (p) {
      el.innerHTML = "Budget indicatif pour " + guests + (guests > 1 ? " voyageurs" : " voyageur") + " : à partir de <b>" + euro.format(p * guests) + "</b>. Le devis final dépend des dates et des options.";
    } else {
      el.textContent = "Choisissez une destination pour voir un budget indicatif.";
    }
  }

  function setError(input, msg) {
    var field = input.closest(".field");
    var err = field.querySelector(".err");
    if (!msg) { if (err) err.remove(); input.removeAttribute("aria-invalid"); return; }
    if (!err) { err = document.createElement("span"); err.className = "err"; field.appendChild(err); }
    err.textContent = msg;
    input.setAttribute("aria-invalid", "true");
  }

  function validate() {
    var ok = true;
    var name = $("#f-name"), email = $("#f-email"), date = $("#f-date");
    setError(name, name.value.trim() ? "" : "Indiquez votre nom.");
    setError(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "" : "Indiquez une adresse e-mail valide, par exemple nom@domaine.fr.");
    setError(destSelect, destSelect.value ? "" : "Choisissez une destination ou « Autre idée ».");
    setError(date, date.value ? "" : "Indiquez un mois de départ.");
    [name, email, destSelect, date].forEach(function (i) { if (i.hasAttribute("aria-invalid")) ok = false; });
    return ok;
  }

  function saveRequest(req) {
    try {
      var list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      list.push(req);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) { /* stockage indisponible : la demande reste affichée à l'écran */ }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) { var first = form.querySelector("[aria-invalid]"); if (first) first.focus(); return; }
    var req = {
      name: $("#f-name").value.trim(),
      email: $("#f-email").value.trim(),
      destination: destSelect.value,
      date: $("#f-date").value,
      guests: $("#f-guests").value,
      notes: $("#f-notes").value.trim(),
      createdAt: new Date().toISOString(),
    };
    saveRequest(req);
    var month = new Date(req.date + "-01T12:00:00").toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
    var done = $("#done");
    done.innerHTML = "Merci " + esc(req.name) + ". Votre demande pour <b>" + esc(req.destination) + "</b> en " + esc(month) + " est enregistrée. Un conseiller vous écrira à " + esc(req.email) + " sous 48 heures.";
    done.hidden = false;
  });

  destSelect.addEventListener("change", updateEstimate);
  $("#f-guests").addEventListener("change", updateEstimate);

  // Les boutons « Composer ce voyage » pré-remplissent le formulaire.
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-pick]");
    if (!el) return;
    destSelect.value = el.getAttribute("data-pick");
    updateEstimate();
    if (el.tagName === "BUTTON") document.getElementById("demande").scrollIntoView({ behavior: "smooth" });
  });

  renderBoard();
  renderFilters();
  renderDestinations();
  renderExperiences();
  renderSignature();
  renderQuotes();
  fillDestinations();
  destSelect.value = "Atoll de Baa · Maldives";
  updateEstimate();
})();
