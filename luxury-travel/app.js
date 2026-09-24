(function () {
  "use strict";

  const D = window.BLUEHOUR_DATA;
  const app = document.getElementById("app");
  const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const NOW = new Date();
  const CUR_MONTH = NOW.getMonth();
  const MONTHS = D.months;
  const MONTHS_SHORT = ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."];
  const REGIONS = [...new Set(D.destinations.map((d) => d.region))];
  const byId = (id) => D.destinations.find((d) => d.id === id);
  const collById = (id) => D.collections.find((c) => c.id === id);

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);

  // ---------- Stockage local (tolérant aux navigateurs qui le bloquent) ----------
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* stockage indisponible */ }
    },
  };

  // ---------- Carnet d'envies ----------
  const wishes = new Set(store.get("bluehour-envies", []).filter(byId));
  function syncWishes() {
    store.set("bluehour-envies", [...wishes]);
    const count = document.getElementById("wish-count");
    count.textContent = wishes.size;
    count.hidden = wishes.size === 0;
    document.querySelectorAll("[data-wish]").forEach((b) => {
      const on = wishes.has(b.dataset.wish);
      b.setAttribute("aria-pressed", on);
      if (b.classList.contains("btn-heart")) b.lastChild.textContent = on ? "Dans mes envies" : "Ajouter à mes envies";
      else b.setAttribute("aria-label", (on ? "Retirer de mes envies : " : "Ajouter à mes envies : ") + byId(b.dataset.wish).name);
    });
  }

  const HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.3A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.6c0 5.7-7.5 10.3-7.5 10.3Z"/></svg>';

  // ---------- Composants ----------
  function card(d, opts = {}) {
    const tag = opts.tag || (d.months[CUR_MONTH] === 2 ? "Idéal en " + lower(MONTHS[CUR_MONTH]) : collById(d.collections[0]).short);
    return `<article class="card">
      <div class="card-media">
        <img src="${d.image}" alt="${esc(d.name)} : ${esc(d.tagline)}" loading="lazy">
        <span class="card-tag">${esc(tag)}</span>
        <button type="button" class="heart" data-wish="${d.id}" aria-pressed="false">${HEART}</button>
      </div>
      <div class="card-body">
        <div class="card-meta"><span>${esc(d.region)}</span><span>${esc(d.flight)} de vol</span></div>
        <h3><a href="#${d.id}">${esc(d.name)}</a></h3>
        <p class="card-tagline">${esc(d.tagline)}</p>
        <p class="card-price">${d.nights} nuits, à partir de <b>${euro.format(d.price)}</b> par personne</p>
      </div>
    </article>`;
  }

  function monthList(levels, level) {
    const names = levels.map((l, i) => (l === level ? lower(MONTHS[i]) : null)).filter(Boolean);
    if (!names.length) return "";
    if (names.length === 1) return names[0];
    return names.slice(0, -1).join(", ") + " et " + names[names.length - 1];
  }

  function ctaFinal(title, text) {
    return `<section class="wrap cta-final">
      <p class="label">Sur mesure</p>
      <h2>${title}</h2>
      <p>${text}</p>
      <a class="btn btn-solid" href="#concevoir">Concevoir mon voyage</a>
    </section>`;
  }

  // ---------- Accueil ----------
  const HERO_SETS = [
    ["dubai", "maldives", "new-york"],
    ["monaco", "bali", "seychelles"],
    ["kauai", "ibiza", "chicago"],
    ["miami", "cancun", "marbella"],
  ];
  let heroTimer = null;
  let heroIndex = 0;

  function viewHome() {
    const featured = ["maldives", "dubai", "new-york", "bali", "monaco", "seychelles", "kauai", "miami"].map(byId);
    const panels = HERO_SETS[0].map((id, i) => {
      const d = byId(id);
      return `<figure class="hero-panel" data-panel="${i}">
        <img class="is-shown" src="${d.image}" alt="${esc(d.name)} : ${esc(d.tagline)}" ${i === 0 ? 'fetchpriority="high"' : ""}>
        <figcaption><span>${esc(d.name)}</span><span>${esc(d.coords.split(" · ")[0])}</span></figcaption>
      </figure>`;
    }).join("");

    return `
    <section class="hero" aria-label="Présentation">
      <div class="hero-panels">${panels}</div>
      <div class="wrap hero-copy">
        <p class="label">Voyages de luxe sur mesure · depuis 2009</p>
        <h1>L'extraordinaire, sur mesure.</h1>
        <p class="sub">Penthouses au-dessus des skylines, villas sur le lagon, terrasses sur la Riviera. Nous avons séjourné dans chaque adresse que nous vous proposons.</p>
      </div>
      <div class="hero-dots" role="group" aria-label="Changer les images">
        ${HERO_SETS.map((s, i) => `<button type="button" data-hero="${i}" aria-pressed="${i === 0}" aria-label="Série ${i + 1} : ${s.map((id) => byId(id).name).join(", ")}"></button>`).join("")}
      </div>
    </section>

    <div class="wrap finder">
      <form id="finder" aria-label="Trouver un voyage">
        <div class="f">
          <label for="fi-coll">Une envie</label>
          <select id="fi-coll"><option value="all">Toutes les envies</option>${D.collections.map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join("")}</select>
        </div>
        <div class="f">
          <label for="fi-region">Une région</label>
          <select id="fi-region"><option value="all">Le monde entier</option>${REGIONS.map((r) => `<option>${esc(r)}</option>`).join("")}</select>
        </div>
        <div class="f">
          <label for="fi-month">Un mois</label>
          <select id="fi-month"><option value="all">N'importe quand</option>${MONTHS.map((m, i) => `<option value="${i}">${m}</option>`).join("")}</select>
        </div>
        <button class="btn btn-solid" type="submit">Voir les voyages</button>
      </form>
    </div>

    <section class="section wrap">
      <div class="statement">
        <p class="label">La Maison Bluehour</p>
        <div>
          <h2>Nous ne vendons pas de catalogue. Nous dessinons <em>un voyage à la fois</em>, autour de vous, dans des lieux où nous sommes allés nous-mêmes.</h2>
        </div>
        <div class="facts">
          <div><strong class="num">12</strong><span>destinations d'exception</span></div>
          <div><strong class="num">48 h</strong><span>pour recevoir votre itinéraire</span></div>
          <div><strong class="num">24/7</strong><span>conciergerie pendant le voyage</span></div>
          <div><strong class="num">100 %</strong><span>des adresses testées par nos conseillers</span></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap section-head">
        <div>
          <p class="label">À la une</p>
          <h2>Où partir cette saison</h2>
        </div>
        <div class="rail-ctrl">
          <button type="button" data-rail="-1" aria-label="Destinations précédentes">←</button>
          <button type="button" data-rail="1" aria-label="Destinations suivantes">→</button>
        </div>
      </div>
      <div class="rail" id="rail">${featured.map((d) => card(d)).join("")}</div>
      <div class="wrap" style="margin-top:44px"><a class="text-link" href="#destinations">Toutes les destinations</a></div>
    </section>

    <section class="section">
      <div class="wrap section-head">
        <div>
          <p class="label">Voyager selon vos envies</p>
          <h2>Quatre façons de voir le monde</h2>
        </div>
        <p class="lead">Choisissez une atmosphère plutôt qu'un pays. Nous trouvons l'endroit.</p>
      </div>
      <div class="collections">
        ${D.collections.map((c) => {
          const n = D.destinations.filter((d) => d.collections.includes(c.id)).length;
          return `<a class="coll" href="#${c.id}">
            <img src="${c.image}" alt="" loading="lazy">
            <div class="coll-text"><span class="coll-count">${n} destinations</span><h3>${esc(c.name)}</h3><p>${esc(c.text)}</p></div>
          </a>`;
        }).join("")}
      </div>
    </section>

    <section class="when">
      <div class="wrap">
        <div class="section-head">
          <div>
            <p class="label">Le bon moment</p>
            <h2>Où partir en <span id="when-title">${lower(MONTHS[CUR_MONTH])}</span> ?</h2>
          </div>
          <p class="lead">La saison compte autant que l'adresse. Choisissez un mois, nous vous montrons où la météo est au rendez-vous.</p>
        </div>
        <div class="months" role="group" aria-label="Choisir un mois">
          ${MONTHS_SHORT.map((m, i) => `<button type="button" class="month-btn" data-month="${i}" aria-pressed="${i === CUR_MONTH}">${m}</button>`).join("")}
        </div>
        <div class="when-grid" id="when-grid">${whenItems(CUR_MONTH)}</div>
      </div>
    </section>

    <section class="section wrap">
      <div class="section-head">
        <div>
          <p class="label">Expériences</p>
          <h2>Ce qui ne se réserve pas en ligne</h2>
        </div>
        <a class="text-link" href="#experiences">Toutes les expériences</a>
      </div>
      ${D.experiences.slice(0, 2).map((x, i) => story(x, i % 2 === 1)).join("")}
    </section>

    ${grandTourBand()}

    <section class="section wrap">
      <div class="section-head">
        <div>
          <p class="label">Ils sont rentrés</p>
          <h2>Ce que nos voyageurs racontent</h2>
        </div>
      </div>
      ${quotes()}
    </section>

    ${ctaFinal("Votre prochain voyage commence par une conversation.", "Trente minutes avec un conseiller qui connaît les lieux. Vous recevez un itinéraire détaillé sous 48 heures, sans engagement.")}`;
  }

  function whenItems(m) {
    const list = D.destinations
      .filter((d) => d.months[m] > 0)
      .sort((a, b) => b.months[m] - a.months[m] || a.price - b.price);
    return list.map((d) => `<a class="when-item" href="#${d.id}">
      <img src="${d.image}" alt="" loading="lazy">
      <div><span class="pill ${d.months[m] === 2 ? "" : "good"}">${d.months[m] === 2 ? "Idéal" : "Agréable"}</span><h4>${esc(d.name)}</h4><span>${esc(d.flight)} de vol · dès ${euro.format(d.price)}</span></div>
    </a>`).join("");
  }

  function story(x, reverse) {
    const d = byId(x.dest);
    return `<article class="story${reverse ? " reverse" : ""}">
      <div class="story-media"><img src="${x.image}" alt="${esc(x.title)}" loading="lazy"></div>
      <div class="story-text">
        <p class="label">${esc(x.place)}</p>
        <h3>${esc(x.title)}</h3>
        <p>${esc(x.text)}</p>
        <div class="story-meta"><span>Durée<b>${esc(x.duration)}</b></span><span>Par personne<b>${euro.format(x.price)}</b></span></div>
        <a class="text-link" href="#${d.id}">Découvrir ${esc(d.name)}</a>
      </div>
    </article>`;
  }

  function grandTourBand() {
    const g = D.grandTour;
    return `<section class="band no-gap">
      <div class="band-inner">
        <div class="band-media"><img src="${g.image}" alt="Terrasse face à l'océan aux Seychelles" loading="lazy"></div>
        <div class="band-text">
          <p class="label">Le Grand Tour Bluehour</p>
          <h2>${esc(g.title)}</h2>
          <p>${esc(g.text)}</p>
          <ol class="route">
            ${g.stops.map((s) => `<li><span class="n">${s.nights} nuits</span><div><h4>${esc(byId(s.dest).name)}</h4><p>${esc(s.note)}</p></div></li>`).join("")}
          </ol>
          <div class="band-foot">
            <span class="price">${g.nights} nuits, par personne<b>${euro.format(g.price)}</b></span>
            <a class="btn btn-light" href="#grand-tour">Voir le Grand Tour</a>
          </div>
        </div>
      </div>
    </section>`;
  }

  function quotes() {
    return `<div class="quotes">${D.testimonials.map((t) => `<figure><blockquote>« ${esc(t.quote)} »</blockquote><figcaption><b>${esc(t.who)}</b>${esc(t.trip)}</figcaption></figure>`).join("")}</div>`;
  }

  function startHero() {
    stopHero();
    heroIndex = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    heroTimer = setInterval(() => showHeroSet((heroIndex + 1) % HERO_SETS.length), 6500);
  }
  function stopHero() { if (heroTimer) clearInterval(heroTimer); heroTimer = null; }

  function showHeroSet(n) {
    heroIndex = n;
    document.querySelectorAll("[data-hero]").forEach((b) => b.setAttribute("aria-pressed", Number(b.dataset.hero) === n));
    HERO_SETS[n].forEach((id, i) => {
      const panel = document.querySelector(`[data-panel="${i}"]`);
      if (!panel) return;
      const d = byId(id);
      setTimeout(() => {
        const old = panel.querySelector("img:not(.is-leaving)");
        const img = new Image();
        img.src = d.image;
        img.alt = d.name + " : " + d.tagline;
        img.className = "is-hidden";
        panel.insertBefore(img, panel.querySelector("figcaption"));
        const reveal = () => requestAnimationFrame(() => {
          img.classList.remove("is-hidden");
          img.classList.add("is-shown");
          if (old) { old.classList.add("is-leaving", "is-hidden"); setTimeout(() => old.remove(), 1500); }
          panel.querySelector("figcaption").innerHTML = `<span>${esc(d.name)}</span><span>${esc(d.coords.split(" · ")[0])}</span>`;
        });
        if (img.complete) reveal(); else img.onload = reveal;
      }, i * 260);
    });
  }

  // ---------- Destinations ----------
  const filters = { coll: "all", region: "all", month: "all", sort: "reco" };

  function viewDestinations() {
    const c = filters.coll !== "all" ? collById(filters.coll) : null;
    return `<div class="wrap">
      <header class="page-head">
        <nav class="crumbs" aria-label="Fil d'Ariane"><a href="#accueil">Accueil</a><span aria-hidden="true">/</span><span>Destinations</span></nav>
        <h1>${c ? esc(c.name) : "Nos destinations"}</h1>
        <p class="lead">${c ? esc(c.text) : "Douze adresses sur six régions du monde, chacune visitée par un conseiller Bluehour. Filtrez par envie, par région ou par mois de départ."}</p>
      </header>
      <div class="toolbar">
        <div class="chips" role="group" aria-label="Filtrer par envie">
          <button type="button" class="chip" data-coll="all" aria-pressed="${filters.coll === "all"}">Toutes</button>
          ${D.collections.map((x) => `<button type="button" class="chip" data-coll="${x.id}" aria-pressed="${filters.coll === x.id}">${esc(x.short)}</button>`).join("")}
        </div>
        <div class="selects">
          <div class="select"><label class="sr-only" for="flt-region">Région</label><select id="flt-region" data-filter="region"><option value="all">Toutes les régions</option>${REGIONS.map((r) => `<option ${filters.region === r ? "selected" : ""}>${esc(r)}</option>`).join("")}</select></div>
          <div class="select"><label class="sr-only" for="flt-month">Mois de départ</label><select id="flt-month" data-filter="month"><option value="all">Tous les mois</option>${MONTHS.map((m, i) => `<option value="${i}" ${String(filters.month) === String(i) ? "selected" : ""}>Partir en ${lower(m)}</option>`).join("")}</select></div>
          <div class="select"><label class="sr-only" for="flt-sort">Trier</label><select id="flt-sort" data-filter="sort">
            <option value="reco" ${filters.sort === "reco" ? "selected" : ""}>Nos recommandations</option>
            <option value="price-asc" ${filters.sort === "price-asc" ? "selected" : ""}>Prix croissant</option>
            <option value="price-desc" ${filters.sort === "price-desc" ? "selected" : ""}>Prix décroissant</option>
            <option value="flight" ${filters.sort === "flight" ? "selected" : ""}>Vol le plus court</option>
          </select></div>
        </div>
      </div>
      <div id="results">${results()}</div>
    </div>`;
  }

  const flightMinutes = (s) => { const m = s.match(/(\d+)\s*h\s*(\d+)?/); return m ? Number(m[1]) * 60 + Number(m[2] || 0) : 0; };

  function results() {
    const m = filters.month === "all" ? null : Number(filters.month);
    let list = D.destinations.filter((d) =>
      (filters.coll === "all" || d.collections.includes(filters.coll)) &&
      (filters.region === "all" || d.region === filters.region) &&
      (m === null || d.months[m] > 0));
    if (filters.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (filters.sort === "flight") list.sort((a, b) => flightMinutes(a.flight) - flightMinutes(b.flight));
    if (filters.sort === "reco" && m !== null) list.sort((a, b) => b.months[m] - a.months[m]);
    if (!list.length) {
      return `<div class="empty"><h2>Aucune destination ne correspond.</h2><p>Élargissez la région ou le mois, ou demandez-nous : nous connaissons d'autres adresses.</p><button type="button" class="btn btn-line" data-reset>Effacer les filtres</button></div>`;
    }
    const tagFor = (d) => (m !== null ? (d.months[m] === 2 ? "Idéal en " : "Agréable en ") + lower(MONTHS[m]) : undefined);
    return `<p class="result-count">${list.length} destination${list.length > 1 ? "s" : ""}</p><div class="grid">${list.map((d) => card(d, { tag: tagFor(d) })).join("")}</div>`;
  }

  // ---------- Fiche destination ----------
  function viewDestination(d) {
    const exps = D.experiences.filter((x) => x.dest === d.id);
    const related = D.destinations
      .filter((x) => x.id !== d.id)
      .sort((a, b) => Number(b.collections.some((c) => d.collections.includes(c))) - Number(a.collections.some((c) => d.collections.includes(c))))
      .slice(0, 3);
    const ideal = monthList(d.months, 2);
    const good = monthList(d.months, 1);

    return `<section class="dest-hero">
      <div class="dest-hero-text">
        <nav class="crumbs" aria-label="Fil d'Ariane"><a href="#accueil">Accueil</a><span aria-hidden="true">/</span><a href="#destinations">Destinations</a><span aria-hidden="true">/</span><span>${esc(d.name)}</span></nav>
        <p class="label">${esc(d.country)} · ${d.collections.map((c) => esc(collById(c).short)).join(" · ")}</p>
        <h1>${esc(d.name)}</h1>
        <p class="tagline">${esc(d.tagline)}</p>
        <p class="lead">${esc(d.intro)}</p>
        <dl class="keyfacts">
          <div><dt>Vol depuis Paris</dt><dd>${esc(d.flight)}</dd></div>
          <div><dt>Décalage</dt><dd>${esc(d.timezone)}</dd></div>
          <div><dt>Durée conseillée</dt><dd>${d.nights} nuits</dd></div>
          <div><dt>À partir de</dt><dd>${euro.format(d.price)}</dd></div>
        </dl>
        <div class="actions">
          <a class="btn btn-solid" href="#concevoir" data-plan="${d.id}">Concevoir ce voyage</a>
          <button type="button" class="btn btn-line btn-heart" data-wish="${d.id}" aria-pressed="false">${HEART.replace("<svg", '<svg width="18" height="18" style="fill:none;stroke:currentColor;stroke-width:1.5"')}<span>Ajouter à mes envies</span></button>
        </div>
      </div>
      <div class="dest-hero-media">
        <img src="${d.image}" alt="${esc(d.name)} : ${esc(d.tagline)}" fetchpriority="high">
        <span class="coords">${esc(d.coords)}</span>
      </div>
    </section>

    <section class="section wrap detail-grid">
      <div><p class="label">Pourquoi y aller</p><h2 style="margin-top:14px">Ce que nous aimons à ${esc(d.name)}</h2></div>
      <ul class="highlights">${d.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
    </section>

    <section class="section wrap detail-grid">
      <div><p class="label">Quand partir</p><h2 style="margin-top:14px">Le calendrier de ${esc(d.name)}</h2></div>
      <div>
        <div class="calendar" role="img" aria-label="Idéal en ${ideal}${good ? ", agréable en " + good : ""}.">
          ${d.months.map((l, i) => `<div class="cal-cell${i === CUR_MONTH ? " now" : ""}"><div class="cal-bar l${l}"></div><span>${MONTHS_SHORT[i]}</span></div>`).join("")}
        </div>
        <div class="cal-legend"><span><i style="background:var(--ideal)"></i>Idéal</span><span><i style="background:var(--good)"></i>Agréable</span><span><i style="background:var(--poor)"></i>Déconseillé</span></div>
        <p class="cal-summary">Idéal en ${ideal}.${good ? " Agréable en " + good + "." : ""}</p>
      </div>
    </section>

    <section class="section">
      <div class="stay">
        <div class="stay-media"><img src="${d.gallery || d.image}" alt="${esc(d.stay)}" loading="lazy"></div>
        <div class="stay-text">
          <p class="label">Où vous séjournerez</p>
          <h2>${esc(d.stay)}</h2>
          <p>Un conseiller Bluehour a séjourné dans cette adresse. Votre carnet de voyage vous proposera aussi deux alternatives, selon vos dates et votre budget.</p>
          <p class="card-price">${d.nights} nuits, vols en classe affaires et transferts privés inclus, à partir de <b>${euro.format(d.price)}</b> par personne.</p>
        </div>
      </div>
    </section>

    <section class="section wrap detail-grid">
      <div>
        <p class="label">Itinéraire</p>
        <h2 style="margin-top:14px">Une première idée de voyage</h2>
        <p class="lead" style="margin-top:18px">Chaque étape s'ajuste à votre rythme. Rien n'est figé avant votre validation.</p>
      </div>
      <ol class="timeline">${d.itinerary.map((s) => `<li><span class="d">${esc(s.day)}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join("")}</ol>
    </section>

    ${exps.length ? `<section class="section wrap"><div class="section-head"><div><p class="label">Expérience signature</p><h2>À vivre sur place</h2></div></div>${exps.map((x, i) => story(x, i % 2 === 1)).join("")}</section>` : ""}

    <section class="section wrap">
      <div class="section-head"><div><p class="label">À découvrir aussi</p><h2>Dans le même esprit</h2></div><a class="text-link" href="#destinations">Toutes les destinations</a></div>
      <div class="grid">${related.map((x) => card(x)).join("")}</div>
    </section>

    ${ctaFinal("Et si c'était votre prochain voyage ?", `Dites-nous vos dates : nous vous envoyons un itinéraire détaillé pour ${esc(d.name)} sous 48 heures.`)}`;
  }

  // ---------- Expériences ----------
  function viewExperiences() {
    return `<div class="wrap">
      <header class="page-head">
        <nav class="crumbs" aria-label="Fil d'Ariane"><a href="#accueil">Accueil</a><span aria-hidden="true">/</span><span>Expériences</span></nav>
        <h1>Expériences</h1>
        <p class="lead">Des moments privatisés que nous négocions directement avec nos partenaires sur place. Chacun s'ajoute à un séjour Bluehour.</p>
      </header>
      <div class="exp-grid">
        ${D.experiences.map((x) => {
          const d = byId(x.dest);
          return `<article class="exp-card">
            <div class="card-media"><img src="${x.image}" alt="${esc(x.title)}" loading="lazy"><span class="card-tag">${esc(x.place)}</span></div>
            <h3>${esc(x.title)}</h3>
            <p>${esc(x.text)}</p>
            <div class="foot"><span>${esc(x.duration)} · <b>${euro.format(x.price)}</b> par pers.</span><a class="text-link" href="#${d.id}">${esc(d.name)}</a></div>
          </article>`;
        }).join("")}
      </div>
    </div>
    ${ctaFinal("Une idée qui n'est pas dans la liste ?", "Un dîner dans un lieu fermé au public, une demande en mariage, un anniversaire sur une île : nous organisons aussi l'inattendu.")}`;
  }

  // ---------- Grand Tour ----------
  function viewGrandTour() {
    const g = D.grandTour;
    return `<section class="dest-hero">
      <div class="dest-hero-text">
        <nav class="crumbs" aria-label="Fil d'Ariane"><a href="#accueil">Accueil</a><span aria-hidden="true">/</span><span>Grand Tour</span></nav>
        <p class="label">Le Grand Tour Bluehour 2027</p>
        <h1>${esc(g.title)}</h1>
        <p class="tagline">${esc(g.subtitle)}</p>
        <p class="lead">${esc(g.text)}</p>
        <dl class="keyfacts">
          <div><dt>Durée</dt><dd>${g.nights} nuits</dd></div>
          <div><dt>Escales</dt><dd>${g.stops.length}</dd></div>
          <div><dt>Transport</dt><dd>Jet privé</dd></div>
          <div><dt>Par personne</dt><dd>${euro.format(g.price)}</dd></div>
        </dl>
        <div class="actions"><a class="btn btn-solid" href="#concevoir" data-plan="${g.stops.map((s) => s.dest).join(",")}">Réserver une place</a></div>
      </div>
      <div class="dest-hero-media"><img src="${g.image}" alt="Terrasse face à l'océan aux Seychelles" fetchpriority="high"></div>
    </section>

    <section class="section wrap">
      <div class="section-head"><div><p class="label">Les escales</p><h2>Trois étapes, un seul fil</h2></div></div>
      <div class="stops">
        ${g.stops.map((s, i) => {
          const d = byId(s.dest);
          return `<a class="stop" href="#${d.id}">
            <div class="card-media"><img src="${d.image}" alt="${esc(d.name)}" loading="lazy"></div>
            <span class="n">Escale ${i + 1} · ${s.nights} nuits</span>
            <h3>${esc(d.name)}</h3>
            <p>${esc(s.note)}</p>
          </a>`;
        }).join("")}
      </div>
    </section>

    <section class="section wrap detail-grid">
      <div><p class="label">Inclus</p><h2 style="margin-top:14px">Tout est compris</h2></div>
      <ul class="included">${g.included.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
    </section>

    <section class="section wrap detail-grid">
      <div><p class="label">Départs 2027</p><h2 style="margin-top:14px">Trois dates, douze voyageurs</h2></div>
      <ul class="departures">${g.departures.map((x) => `<li><span>Départ le ${esc(x)}</span><span>${euro.format(g.price)} / pers.</span></li>`).join("")}</ul>
    </section>

    ${ctaFinal("Réservez votre place.", "Nous vous rappelons pour confirmer la date, les chambres et les options, puis nous bloquons votre place.")}`;
  }

  // ---------- La Maison ----------
  function viewMaison() {
    return `<div class="wrap">
      <header class="page-head">
        <nav class="crumbs" aria-label="Fil d'Ariane"><a href="#accueil">Accueil</a><span aria-hidden="true">/</span><span>La Maison</span></nav>
        <h1>La Maison Bluehour</h1>
        <p class="lead">Une équipe de onze conseillers à Paris. Chacun a une spécialité, et chacun a dormi dans les adresses qu'il vous recommande.</p>
      </header>
    </div>
    <section class="stay">
      <div class="stay-media"><img src="images/monaco.jpg" alt="Terrasse sur la Riviera au crépuscule" loading="lazy"></div>
      <div class="stay-text">
        <p class="label">Notre conviction</p>
        <h2>Le luxe, c'est de ne penser à rien.</h2>
        <p>Pas de file d'attente, pas de mauvaise chambre, pas de détail oublié. Nous réglons tout en amont pour que votre seul travail soit de profiter.</p>
      </div>
    </section>
    <section class="section wrap">
      <div class="section-head"><div><p class="label">Notre méthode</p><h2>De la première idée au retour</h2></div></div>
      <ol class="steps">
        <li><h3>Un échange</h3><p>Trente minutes avec votre conseiller pour comprendre vos envies, votre rythme et vos dates.</p></li>
        <li><h3>Un itinéraire</h3><p>Sous 48 heures, un carnet de voyage détaillé avec deux options d'hébergement par étape.</p></li>
        <li><h3>Les détails</h3><p>Vols, transferts, tables, guides privés : tout est confirmé avant votre départ.</p></li>
        <li><h3>Le voyage</h3><p>Une conciergerie joignable 24 h/24 et un contact local à chaque étape.</p></li>
      </ol>
    </section>
    <section class="section wrap">
      <div class="section-head"><div><p class="label">Nos engagements</p><h2>Ce que nous garantissons</h2></div></div>
      <div class="promise">
        <div><h3>Des lieux vérifiés</h3><p>Nous ne proposons aucune adresse qu'un membre de l'équipe n'a pas visitée au cours des trois dernières années.</p></div>
        <div><h3>Un seul interlocuteur</h3><p>Le conseiller qui conçoit votre voyage vous suit jusqu'au retour, avec une conciergerie en relais la nuit.</p></div>
        <div><h3>Votre voyage protégé</h3><p>Garantie financière, assurance responsabilité civile professionnelle et assistance rapatriement incluses.</p></div>
      </div>
    </section>
    <section class="section wrap">
      <div class="section-head"><div><p class="label">Ils sont rentrés</p><h2>Ce que nos voyageurs racontent</h2></div></div>
      ${quotes()}
    </section>
    ${ctaFinal("Venez nous voir, rue de Castiglione.", "Sur rendez-vous, du lundi au samedi. Ou par téléphone au +33 1 84 60 20 27.")}`;
  }

  // ---------- Mes envies ----------
  function viewWishes() {
    const list = [...wishes].map(byId);
    return `<div class="wrap">
      <header class="page-head">
        <nav class="crumbs" aria-label="Fil d'Ariane"><a href="#accueil">Accueil</a><span aria-hidden="true">/</span><span>Mes envies</span></nav>
        <h1>Mes envies</h1>
        <p class="lead">${list.length ? "Les destinations que vous avez gardées. Envoyez-les à un conseiller, il composera un voyage qui les relie." : "Touchez le cœur sur une destination pour la garder ici. Votre liste reste dans ce navigateur."}</p>
      </header>
      ${list.length
        ? `<div class="actions" style="margin-bottom:48px"><a class="btn btn-solid" href="#concevoir" data-plan="${list.map((d) => d.id).join(",")}">Concevoir un voyage avec mes envies</a></div><div class="grid">${list.map((d) => card(d)).join("")}</div>`
        : `<div class="empty"><a class="btn btn-solid" href="#destinations">Parcourir les destinations</a></div>`}
    </div>`;
  }

  // ---------- Concevoir mon voyage ----------
  const plan = {
    step: 1, done: false,
    dests: new Set(), colls: new Set(),
    month: "", nights: "7 à 9 nuits", adults: "2", children: "0", budget: "10 000 – 20 000 €",
    first: "", last: "", email: "", phone: "", contact: "E-mail", message: "",
  };
  const STEPS = ["Vos envies", "Quand et avec qui", "Vos coordonnées"];

  function upcomingMonths() {
    const out = [];
    for (let i = 0; i < 18; i++) {
      const dt = new Date(NOW.getFullYear(), NOW.getMonth() + i, 1);
      out.push({ value: dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0"), label: MONTHS[dt.getMonth()] + " " + dt.getFullYear(), m: dt.getMonth() });
    }
    return out;
  }

  const radios = (name, values) => `<div class="radio-row">${values.map((v) => `<label><input type="radio" name="${name}" value="${esc(v)}" data-p="${name}" ${plan[name] === v ? "checked" : ""}><span>${esc(v)}</span></label>`).join("")}</div>`;

  function viewPlanner() {
    return `<div class="wrap">
      <header class="page-head">
        <nav class="crumbs" aria-label="Fil d'Ariane"><a href="#accueil">Accueil</a><span aria-hidden="true">/</span><span>Concevoir mon voyage</span></nav>
        <h1>Concevoir mon voyage</h1>
        <p class="lead">Trois étapes, deux minutes. Un conseiller vous répond sous 48 heures avec un premier itinéraire, sans engagement.</p>
      </header>
      <div class="planner">
        <div id="planner-main">${plan.done ? planConfirm() : planStep()}</div>
        <aside class="summary" id="summary" aria-live="polite">${planSummary()}</aside>
      </div>
    </div>`;
  }

  function planStep() {
    const progress = `<ol class="progress" aria-label="Progression">${STEPS.map((s, i) => `<li class="${i + 1 < plan.step ? "is-done" : ""}${i + 1 === plan.step ? " is-current" : ""}" ${i + 1 === plan.step ? 'aria-current="step"' : ""}>${i + 1}. ${s}</li>`).join("")}</ol>`;
    let body = "";
    if (plan.step === 1) {
      body = `<h2>Où rêvez-vous d'aller ?</h2><p>Choisissez une ou plusieurs destinations, ou simplement une envie.</p>
        <fieldset><legend>Destinations</legend><div class="picks">
          ${D.destinations.map((d) => `<label class="pick"><input type="checkbox" value="${d.id}" data-p="dests" ${plan.dests.has(d.id) ? "checked" : ""}><span class="pick-inner"><img src="${d.image}" alt="" loading="lazy"><span>${esc(d.name)}</span></span></label>`).join("")}
        </div></fieldset>
        <fieldset><legend>Ou une envie</legend><div class="radio-row">
          ${D.collections.map((c) => `<label><input type="checkbox" value="${c.id}" data-p="colls" ${plan.colls.has(c.id) ? "checked" : ""}><span>${esc(c.name)}</span></label>`).join("")}
        </div></fieldset>
        <p class="err" id="err-1" role="alert" style="color:var(--danger)"></p>`;
    } else if (plan.step === 2) {
      body = `<h2>Quand et avec qui ?</h2><p>Une idée approximative suffit, nous affinerons ensemble.</p>
        <div class="fields">
          <div class="field full"><label for="p-month">Mois de départ</label>
            <select id="p-month" data-p="month"><option value="">Choisir un mois</option>${upcomingMonths().map((o) => `<option value="${o.value}" ${plan.month === o.value ? "selected" : ""}>${o.label}</option>`).join("")}</select>
          </div>
          <div class="field full"><label>Durée</label>${radios("nights", ["4 à 6 nuits", "7 à 9 nuits", "10 à 14 nuits", "15 nuits et plus"])}</div>
          <div class="field"><label for="p-adults">Adultes</label><select id="p-adults" data-p="adults">${[1, 2, 3, 4, 5, 6, 7, 8].map((n) => `<option ${plan.adults === String(n) ? "selected" : ""}>${n}</option>`).join("")}</select></div>
          <div class="field"><label for="p-children">Enfants</label><select id="p-children" data-p="children">${[0, 1, 2, 3, 4, 5, 6].map((n) => `<option ${plan.children === String(n) ? "selected" : ""}>${n}</option>`).join("")}</select></div>
          <div class="field full"><label>Budget par personne</label>${radios("budget", ["Moins de 5 000 €", "5 000 – 10 000 €", "10 000 – 20 000 €", "Plus de 20 000 €"])}</div>
        </div>
        <p class="err" id="err-2" role="alert" style="color:var(--danger);margin-top:16px"></p>`;
    } else {
      body = `<h2>Comment vous joindre ?</h2><p>Votre conseiller vous contacte sous 48 heures.</p>
        <div class="fields">
          <div class="field"><label for="p-first">Prénom</label><input id="p-first" data-p="first" autocomplete="given-name" value="${esc(plan.first)}"></div>
          <div class="field"><label for="p-last">Nom</label><input id="p-last" data-p="last" autocomplete="family-name" value="${esc(plan.last)}"></div>
          <div class="field"><label for="p-email">E-mail</label><input id="p-email" type="email" data-p="email" autocomplete="email" value="${esc(plan.email)}"></div>
          <div class="field"><label for="p-phone">Téléphone</label><input id="p-phone" type="tel" data-p="phone" autocomplete="tel" value="${esc(plan.phone)}"></div>
          <div class="field full"><label>Je préfère être contacté par</label>${radios("contact", ["E-mail", "Téléphone"])}</div>
          <div class="field full"><label for="p-message">Votre voyage idéal</label><textarea id="p-message" data-p="message" placeholder="Une occasion à fêter, des habitudes, ce que vous voulez éviter…">${esc(plan.message)}</textarea></div>
        </div>`;
    }
    return `<form class="step" id="plan-form" novalidate>${progress}${body}
      <div class="step-nav">
        ${plan.step > 1 ? '<button type="button" class="btn btn-line" data-step="-1">Retour</button>' : "<span></span>"}
        <button type="submit" class="btn btn-solid">${plan.step < 3 ? "Continuer" : "Envoyer ma demande"}</button>
      </div>
    </form>`;
  }

  function travellers() { return Number(plan.adults) + Number(plan.children); }
  function monthLabel(v) { const o = upcomingMonths().find((x) => x.value === v); return o ? o.label : "À définir"; }

  function planSummary() {
    const dests = [...plan.dests].map(byId);
    const est = dests.reduce((s, d) => s + d.price, 0) * travellers();
    return `<p class="label">Votre voyage</p>
      <h3>${dests.length ? esc(dests.map((d) => d.name).join(", ")) : "Destination à définir"}</h3>
      <dl>
        <div><dt>Envies</dt><dd>${plan.colls.size ? esc([...plan.colls].map((c) => collById(c).short).join(", ")) : "—"}</dd></div>
        <div><dt>Départ</dt><dd>${plan.month ? esc(monthLabel(plan.month)) : "À définir"}</dd></div>
        <div><dt>Durée</dt><dd>${esc(plan.nights)}</dd></div>
        <div><dt>Voyageurs</dt><dd>${plan.adults} adulte${plan.adults === "1" ? "" : "s"}${plan.children !== "0" ? ", " + plan.children + " enfant" + (plan.children === "1" ? "" : "s") : ""}</dd></div>
        <div><dt>Budget / pers.</dt><dd>${esc(plan.budget)}</dd></div>
      </dl>
      ${est ? `<p class="est">Estimation indicative<b>à partir de ${euro.format(est)}</b>pour ${travellers()} voyageur${travellers() > 1 ? "s" : ""}, vols en classe affaires inclus.</p>` : '<p class="est">Choisissez une destination pour voir une estimation.</p>'}`;
  }

  function planConfirm() {
    const dests = [...plan.dests].map((id) => byId(id).name);
    return `<div class="confirm">
      <p class="label">Demande enregistrée</p>
      <h2>Merci ${esc(plan.first)}.</h2>
      <p>Votre demande${dests.length ? " pour " + esc(dests.join(", ")) : ""}, au départ en ${esc(lower(monthLabel(plan.month)))}, est enregistrée. Un conseiller vous contactera par ${plan.contact === "Téléphone" ? "téléphone au " + esc(plan.phone) : "e-mail à " + esc(plan.email)} sous 48 heures.</p>
      <div class="actions"><a class="btn btn-line" href="#destinations">Continuer à explorer</a><button type="button" class="btn btn-line" data-plan-reset>Faire une autre demande</button></div>
    </div>`;
  }

  function setError(input, msg) {
    const field = input.closest(".field");
    let err = field.querySelector(".err");
    if (!msg) { if (err) err.remove(); input.removeAttribute("aria-invalid"); return true; }
    if (!err) { err = document.createElement("span"); err.className = "err"; field.appendChild(err); }
    err.textContent = msg;
    input.setAttribute("aria-invalid", "true");
    return false;
  }

  function validateStep() {
    if (plan.step === 1) {
      const ok = plan.dests.size > 0 || plan.colls.size > 0;
      document.getElementById("err-1").textContent = ok ? "" : "Choisissez au moins une destination ou une envie.";
      return ok;
    }
    if (plan.step === 2) {
      return setError(document.getElementById("p-month"), plan.month ? "" : "Choisissez un mois de départ, même approximatif.");
    }
    const checks = [
      setError(document.getElementById("p-first"), plan.first.trim() ? "" : "Indiquez votre prénom."),
      setError(document.getElementById("p-last"), plan.last.trim() ? "" : "Indiquez votre nom."),
      setError(document.getElementById("p-email"), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(plan.email.trim()) ? "" : "Indiquez une adresse e-mail valide, par exemple nom@domaine.fr."),
      setError(document.getElementById("p-phone"), plan.contact === "Téléphone" && plan.phone.replace(/\D/g, "").length < 8 ? "Indiquez un numéro pour être rappelé." : ""),
    ];
    return checks.every(Boolean);
  }

  function renderPlanner(focus) {
    document.getElementById("planner-main").innerHTML = plan.done ? planConfirm() : planStep();
    document.getElementById("summary").innerHTML = planSummary();
    if (focus) {
      const h = document.querySelector("#planner-main h2");
      if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
      document.getElementById("planner-main").scrollIntoView({ block: "start" });
    }
  }

  // ---------- Routage ----------
  const PAGES = {
    accueil: [viewHome, "Voyages de luxe sur mesure"],
    destinations: [viewDestinations, "Destinations"],
    experiences: [viewExperiences, "Expériences"],
    "grand-tour": [viewGrandTour, "Grand Tour"],
    maison: [viewMaison, "La Maison"],
    envies: [viewWishes, "Mes envies"],
    concevoir: [viewPlanner, "Concevoir mon voyage"],
  };
  let firstRender = true;

  function route() {
    let key = decodeURIComponent(location.hash.slice(1)) || "accueil";
    let html, title, nav = key;
    stopHero();
    if (collById(key)) { filters.coll = key; key = "destinations"; nav = "destinations"; }
    const dest = byId(key);
    if (dest) { html = viewDestination(dest); title = dest.name; nav = "destinations"; }
    else {
      const page = PAGES[key] || PAGES.accueil;
      if (!PAGES[key]) key = "accueil";
      html = page[0]();
      title = page[1];
    }
    app.innerHTML = `<div class="view">${html}</div>`;
    document.title = key === "accueil" ? "Bluehour Travel" : title + " · Bluehour Travel";
    document.body.classList.toggle("home", key === "accueil");
    document.querySelectorAll("[data-nav]").forEach((a) => (a.dataset.nav === nav ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
    closeMenu();
    syncWishes();
    onScroll();
    if (key === "accueil") startHero();
    if (!firstRender) { window.scrollTo(0, 0); app.focus({ preventScroll: true }); }
    firstRender = false;
  }

  // ---------- En-tête et menu ----------
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  function closeMenu() {
    menu.hidden = true;
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
    document.body.classList.remove("menu-open");
  }
  burger.addEventListener("click", () => {
    const open = menu.hidden;
    menu.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    document.body.classList.toggle("menu-open", open);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { closeMenu(); burger.focus(); } });

  function onScroll() {
    const hero = document.querySelector(".hero");
    const over = !!hero && window.scrollY < hero.offsetHeight - 90;
    document.body.classList.toggle("over-hero", over);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---------- Événements délégués ----------
  document.addEventListener("click", (e) => {
    const t = e.target;
    const wish = t.closest("[data-wish]");
    if (wish) {
      e.preventDefault();
      const id = wish.dataset.wish;
      wishes.has(id) ? wishes.delete(id) : wishes.add(id);
      syncWishes();
      if (location.hash === "#envies") route();
      return;
    }
    if (t.closest('a[href="#destinations"]')) Object.assign(filters, { coll: "all", region: "all", month: "all", sort: "reco" });
    const heroBtn = t.closest("[data-hero]");
    if (heroBtn) { stopHero(); showHeroSet(Number(heroBtn.dataset.hero)); return; }

    const rail = t.closest("[data-rail]");
    if (rail) {
      const r = document.getElementById("rail");
      r.scrollBy({ left: Number(rail.dataset.rail) * r.clientWidth * 0.8, behavior: "smooth" });
      return;
    }
    const month = t.closest("[data-month]");
    if (month) {
      const m = Number(month.dataset.month);
      document.querySelectorAll("[data-month]").forEach((b) => b.setAttribute("aria-pressed", b === month));
      document.getElementById("when-title").textContent = lower(MONTHS[m]);
      document.getElementById("when-grid").innerHTML = whenItems(m);
      return;
    }
    const coll = t.closest("[data-coll]");
    if (coll) {
      filters.coll = coll.dataset.coll;
      if (location.hash !== "#destinations") { location.hash = "destinations"; return; }
      route();
      return;
    }
    if (t.closest("[data-reset]")) {
      Object.assign(filters, { coll: "all", region: "all", month: "all", sort: "reco" });
      if (location.hash !== "#destinations") location.hash = "destinations"; else route();
      return;
    }
    const planLink = t.closest("[data-plan]");
    if (planLink) {
      plan.dests = new Set(planLink.dataset.plan.split(","));
      plan.step = 1;
      plan.done = false;
      if (location.hash === "#concevoir") { e.preventDefault(); route(); }
      return;
    }
    const stepBtn = t.closest("[data-step]");
    if (stepBtn) { plan.step = Math.max(1, plan.step + Number(stepBtn.dataset.step)); renderPlanner(true); return; }
    if (t.closest("[data-plan-reset]")) {
      Object.assign(plan, { step: 1, done: false, dests: new Set(), colls: new Set(), month: "", message: "" });
      renderPlanner(true);
    }
  });

  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset.filter) {
      filters[t.dataset.filter] = t.value;
      document.getElementById("results").innerHTML = results();
      syncWishes();
      return;
    }
    if (t.dataset.p) updatePlan(t);
  });
  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t.dataset.p && (t.tagName === "TEXTAREA" || t.tagName === "INPUT") && t.type !== "checkbox" && t.type !== "radio") updatePlan(t);
  });

  function updatePlan(t) {
    const k = t.dataset.p;
    if (k === "dests" || k === "colls") { t.checked ? plan[k].add(t.value) : plan[k].delete(t.value); }
    else plan[k] = t.value;
    if (t.getAttribute("aria-invalid")) setError(t, "");
    if (k === "dests" || k === "colls") { const err = document.getElementById("err-1"); if (err) err.textContent = ""; }
    document.getElementById("summary").innerHTML = planSummary();
  }

  document.addEventListener("submit", (e) => {
    const form = e.target;
    e.preventDefault();
    if (form.id === "finder") {
      filters.coll = document.getElementById("fi-coll").value;
      filters.region = document.getElementById("fi-region").value;
      filters.month = document.getElementById("fi-month").value;
      filters.sort = "reco";
      location.hash = "destinations";
      return;
    }
    if (form.id === "plan-form") {
      if (!validateStep()) { const bad = form.querySelector("[aria-invalid]"); if (bad) bad.focus(); return; }
      if (plan.step < 3) { plan.step += 1; renderPlanner(true); return; }
      const requests = store.get("bluehour-demandes", []);
      requests.push({
        destinations: [...plan.dests], envies: [...plan.colls], depart: plan.month, duree: plan.nights,
        adultes: plan.adults, enfants: plan.children, budget: plan.budget,
        prenom: plan.first, nom: plan.last, email: plan.email, telephone: plan.phone,
        contact: plan.contact, message: plan.message, creeLe: new Date().toISOString(),
      });
      store.set("bluehour-demandes", requests);
      plan.done = true;
      renderPlanner(true);
      return;
    }
    if (form.id === "newsletter-form") {
      const input = document.getElementById("nl-email");
      const note = document.getElementById("nl-note");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) { note.textContent = "Indiquez une adresse e-mail valide, par exemple nom@domaine.fr."; input.focus(); return; }
      const list = store.get("bluehour-newsletter", []);
      list.push(input.value.trim());
      store.set("bluehour-newsletter", list);
      note.textContent = "Merci, votre inscription est enregistrée. Première lettre au début du mois prochain.";
      input.value = "";
    }
  });

  // ---------- Pied de page ----------
  document.getElementById("footer-dest").innerHTML = D.destinations.slice(0, 7).map((d) => `<li><a href="#${d.id}">${esc(d.name)}</a></li>`).join("") + '<li><a href="#destinations">Toutes les destinations</a></li>';
  document.getElementById("footer-coll").innerHTML = D.collections.map((c) => `<li><a href="#${c.id}">${esc(c.name)}</a></li>`).join("");

  window.addEventListener("hashchange", route);
  route();
})();
