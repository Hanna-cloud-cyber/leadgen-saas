(function () {
  "use strict";

  var product = window.__SCP_PRODUCT__;
  var moneyFormat = window.__SCP_MONEY_FORMAT__ || "{{amount}}";
  var root = document.getElementById("scp-root");
  if (!product || !root) return;

  var colorOptionIndex = parseInt(root.dataset.colorOptionIndex, 10);
  var sizeOptionIndex = parseInt(root.dataset.sizeOptionIndex, 10);

  // Map known color-option value names (French or English) to a swatch hex
  // and to one of the bundled photos in /assets. Add entries here to match
  // whatever option values you create on the product in Shopify admin.
  var COLOR_MAP = {
    "noir": { hex: "#17140f", img: "sculptia-colorway-black.jpg" },
    "black": { hex: "#17140f", img: "sculptia-colorway-black.jpg" },
    "gris charbon": { hex: "#4a473f", img: "sculptia-colorway-charcoal.jpg" },
    "charcoal": { hex: "#4a473f", img: "sculptia-colorway-charcoal.jpg" },
    "gris chiné": { hex: "#9a9585", img: "sculptia-colorway-gray-chine.jpg" },
    "heather grey": { hex: "#9a9585", img: "sculptia-colorway-gray-chine.jpg" },
    "beige": { hex: "#d9c9a8", img: "sculptia-colorway-beige.jpg" },
    "marine": { hex: "#243450", img: "sculptia-colorway-navy.jpg" },
    "navy": { hex: "#243450", img: "sculptia-colorway-navy.jpg" },
    "vert olive": { hex: "#5c6b3a", img: "sculptia-colorway-olive.jpg" },
    "olive": { hex: "#5c6b3a", img: "sculptia-colorway-olive.jpg" },
    "kaki foncé": { hex: "#3a3a28", img: "sculptia-colorway-olive-dark.jpg" },
    "dark khaki": { hex: "#3a3a28", img: "sculptia-colorway-olive-dark.jpg" },
    "dark olive": { hex: "#3a3a28", img: "sculptia-colorway-olive-dark.jpg" },
    "lavande": { hex: "#c3c3ec", img: "sculptia-colorway-lavender.jpg" },
    "lavender": { hex: "#c3c3ec", img: "sculptia-colorway-lavender.jpg" },
    "bleu ciel": { hex: "#29b8d8", img: "sculptia-colorway-sky-blue.jpg" },
    "sky blue": { hex: "#29b8d8", img: "sculptia-colorway-sky-blue.jpg" },
    "bleu clair": { hex: "#cfe6f2", img: "sculptia-colorway-light-blue.jpg" },
    "light blue": { hex: "#cfe6f2", img: "sculptia-colorway-light-blue.jpg" },
    "rose fuchsia": { hex: "#e0397d", img: "sculptia-colorway-hot-pink.jpg" },
    "hot pink": { hex: "#e0397d", img: "sculptia-colorway-hot-pink.jpg" },
    "rose clair": { hex: "#f2c9d6", img: "sculptia-colorway-light-pink.jpg" },
    "light pink": { hex: "#f2c9d6", img: "sculptia-colorway-light-pink.jpg" }
  };

  var ASSET_BASE = document
    .currentScript && document.currentScript.src
    ? document.currentScript.src.replace(/sculptia-product\.js.*$/, "")
    : "";

  function assetUrl(filename) {
    return ASSET_BASE + filename;
  }

  function colorInfo(name) {
    var key = (name || "").trim().toLowerCase();
    return COLOR_MAP[key] || { hex: "#c9c4b6", img: null };
  }

  var bundles = [
    { id: "solo", name: "1 Legging", sub: "Try it out", qty: 1, free: 0, badge: null },
    { id: "duo", name: "Buy 2, Get 1 FREE", sub: "One to wear, one to wash, one to spare", qty: 2, free: 1, badge: "MOST POPULAR" },
    { id: "trio", name: "Buy 3, Get 2 FREE", sub: "Free shipping included", qty: 3, free: 2, badge: "BEST VALUE" }
  ];

  var reviewBars = [
    { s: 5, c: 284 }, { s: 4, c: 47 }, { s: 3, c: 15 }, { s: 2, c: 6 }, { s: 1, c: 3 }
  ];

  // Placeholder reviews — written as examples of tone/length, not sourced
  // from any real customer. Swap for genuine Sculptia reviews (real
  // customers, their consent) or a reviews app (Judge.me, Loox, Yotpo...).
  var reviews = [
    { name: "Emily R.", rating: 5, text: "The fabric is really unique — I feel a light massage when I wear it. After a few weeks the difference is visible." },
    { name: "Ashley M.", rating: 5, text: "The waistband never rolls down, even by the end of the day. Perfect fit and it really shapes." },
    { name: "Taylor B.", rating: 4, text: "Super comfortable and opaque even in light colors. Wish there were more length options." }
  ];

  var state = {
    color: colorOptionIndex > -1 && product.options_with_values[colorOptionIndex]
      ? product.options_with_values[colorOptionIndex].values[0] : null,
    size: sizeOptionIndex > -1 && product.options_with_values[sizeOptionIndex]
      ? product.options_with_values[sizeOptionIndex].values[0] : null,
    bundleId: "duo",
    mainImgSrc: null
  };

  function findVariant() {
    return product.variants.find(function (v) {
      var okColor = colorOptionIndex < 0 || v.options[colorOptionIndex] === state.color;
      var okSize = sizeOptionIndex < 0 || v.options[sizeOptionIndex] === state.size;
      return okColor && okSize;
    });
  }

  // --- money formatting (standard Shopify money.js pattern) ---
  function formatMoney(cents, format) {
    if (typeof cents === "string") cents = cents.replace(".", "");
    var value = "";
    var placeholder = /\{\{\s*(\w+)\s*\}\}/;
    var fmt = format || moneyFormat || "{{amount}}";
    function defaultTo(n, d) { return isNaN(n) || n == null ? d : n; }
    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = defaultTo(precision, 2);
      thousands = defaultTo(thousands, ",");
      decimal = defaultTo(decimal, ".");
      if (isNaN(number)) return 0;
      number = (number / 100.0).toFixed(precision);
      var parts = number.split(".");
      var dollars = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + thousands);
      var cents2 = parts[1] ? decimal + parts[1] : "";
      return dollars + cents2;
    }
    switch (fmt.match(placeholder)[1]) {
      case "amount": value = formatWithDelimiters(cents, 2); break;
      case "amount_no_decimals": value = formatWithDelimiters(cents, 0); break;
      case "amount_with_comma_separator": value = formatWithDelimiters(cents, 2, ".", ","); break;
      case "amount_no_decimals_with_comma_separator": value = formatWithDelimiters(cents, 0, ".", ","); break;
      default: value = formatWithDelimiters(cents, 2);
    }
    return fmt.replace(placeholder, value);
  }

  function starsSVG(filled) {
    filled = filled == null ? 5 : filled;
    var out = "";
    for (var i = 0; i < 5; i++) {
      out += '<svg width="16" height="16" viewBox="0 0 20 20" fill="' + (i < filled ? "var(--scp-ink)" : "var(--scp-line-strong)") + '"><path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6.1-5.4-3.2-5.4 3.2 1.3-6.1L1.3 7.7l6.1-.6L10 1.5z"/></svg>';
    }
    return out;
  }

  function el(id) { return document.getElementById(id); }

  function renderStars() {
    ["scp-stars-hero", "scp-stars-summary"].forEach(function (id) {
      var n = el(id);
      if (n) n.innerHTML = starsSVG(5);
    });
  }

  function galleryShots() {
    var shots = [];
    var current = colorInfo(state.color);
    if (current.img) shots.push(assetUrl(current.img));
    ["sculptia-colorway-black.jpg", "sculptia-lifestyle-couch.jpg", "sculptia-lifestyle-yoga.jpg"].forEach(function (f) {
      var u = assetUrl(f);
      if (shots.indexOf(u) === -1) shots.push(u);
    });
    return shots;
  }

  function renderGallery() {
    var shots = galleryShots();
    if (!state.mainImgSrc || shots.indexOf(state.mainImgSrc) === -1) state.mainImgSrc = shots[0];
    el("scp-gallery-main-img").src = state.mainImgSrc;
    var wrap = el("scp-gallery-thumbs");
    wrap.innerHTML = "";
    shots.forEach(function (src) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = src === state.mainImgSrc ? "scp-active" : "";
      b.innerHTML = '<img src="' + src + '" alt="">';
      b.addEventListener("click", function () { state.mainImgSrc = src; renderGallery(); });
      wrap.appendChild(b);
    });
  }

  function renderColors() {
    if (colorOptionIndex < 0) return;
    var values = product.options_with_values[colorOptionIndex].values;
    el("scp-color-label").textContent = state.color;
    var row = el("scp-color-row");
    row.innerHTML = "";
    values.forEach(function (val) {
      var info = colorInfo(val);
      var b = document.createElement("button");
      b.type = "button";
      b.className = "scp-swatch" + (val === state.color ? " scp-active" : "");
      b.style.background = info.hex;
      b.title = val;
      b.setAttribute("aria-label", val);
      b.addEventListener("click", function () {
        state.color = val;
        if (info.img) state.mainImgSrc = assetUrl(info.img);
        renderColors();
        renderGallery();
        renderAvailability();
        updateVariant();
      });
      row.appendChild(b);
    });
  }

  function renderSizes() {
    if (sizeOptionIndex < 0) return;
    var values = product.options_with_values[sizeOptionIndex].values;
    el("scp-size-label").textContent = state.size;
    var row = el("scp-size-row");
    row.innerHTML = "";
    values.forEach(function (val) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "scp-size-btn" + (val === state.size ? " scp-active" : "");
      b.textContent = val;
      b.addEventListener("click", function () {
        state.size = val;
        renderSizes();
        updateVariant();
      });
      row.appendChild(b);
    });
  }

  function renderAvailability() {
    // Disable size buttons that have no in-stock variant for the current color
    if (sizeOptionIndex < 0) return;
    var row = el("scp-size-row");
    if (!row) return;
    Array.prototype.forEach.call(row.children, function (btn) {
      var size = btn.textContent;
      var match = product.variants.find(function (v) {
        var okColor = colorOptionIndex < 0 || v.options[colorOptionIndex] === state.color;
        return okColor && v.options[sizeOptionIndex] === size;
      });
      btn.disabled = !match || !match.available;
    });
  }

  function renderBundles() {
    var wrap = el("scp-bundles");
    wrap.innerHTML = "";
    bundles.forEach(function (b) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "scp-bundle" + (b.id === state.bundleId ? " scp-active" : "");
      btn.innerHTML =
        (b.badge ? '<span class="scp-bundle-badge">' + b.badge + "</span>" : "") +
        '<span class="scp-bundle-radio"></span>' +
        '<span class="scp-bundle-mid">' +
        '<span class="scp-bundle-name">' + b.name + "</span>" +
        '<span class="scp-bundle-sub">' + b.sub + "</span>" +
        "</span>";
      btn.addEventListener("click", function () {
        state.bundleId = b.id;
        renderBundles();
        updateVariant();
      });
      wrap.appendChild(btn);
    });
  }

  function renderReviewBars() {
    var total = reviewBars.reduce(function (a, r) { return a + r.c; }, 0);
    var wrap = el("scp-review-bars");
    if (!wrap) return;
    wrap.innerHTML = reviewBars.map(function (r) {
      var pct = (r.c / total) * 100;
      return (
        '<div class="scp-review-bar-row">' +
        '<span class="scp-lbl">' + r.s + " ★</span>" +
        '<span class="scp-review-bar-track"><span class="scp-review-bar-fill" style="width:' + pct + '%"></span></span>' +
        '<span class="scp-pct scp-num">' + pct.toFixed(0) + "%</span>" +
        "</div>"
      );
    }).join("");
  }

  function renderReviewList() {
    var wrap = el("scp-review-list");
    if (!wrap) return;
    wrap.innerHTML = reviews.map(function (r) {
      return (
        '<div class="scp-review-quote">' +
        '<div class="scp-review-quote-head">' +
        '<div class="scp-stars">' + starsSVG(r.rating) + "</div>" +
        '<span class="scp-review-quote-name">' + r.name + "</span>" +
        "</div>" +
        "<p>&ldquo;" + r.text + "&rdquo;</p>" +
        "</div>"
      );
    }).join("");
  }

  function bundleQty() {
    var b = bundles.find(function (x) { return x.id === state.bundleId; });
    return b ? b.qty : 1;
  }

  function updateVariant() {
    var variant = findVariant();
    var qty = bundleQty();
    var priceEl = el("scp-price-now");
    var wasEl = el("scp-price-was");
    var saveEl = el("scp-price-save");
    var ctaBtn = el("scp-cta-main");
    var ctaPrice = el("scp-cta-price");
    var ctaPriceSticky = el("scp-cta-price-sticky");
    var stockNote = el("scp-stock-note");

    if (!variant) {
      if (ctaBtn) { ctaBtn.disabled = true; }
      if (stockNote) stockNote.textContent = "This combination isn't available.";
      return;
    }

    var unitPrice = variant.price;
    var unitCompare = variant.compare_at_price;
    var totalPrice = unitPrice * qty;

    if (priceEl) priceEl.textContent = formatMoney(unitPrice);
    if (unitCompare && unitCompare > unitPrice) {
      if (wasEl) wasEl.textContent = formatMoney(unitCompare);
      if (saveEl) {
        var pct = Math.round((1 - unitPrice / unitCompare) * 100);
        saveEl.textContent = "SAVE " + pct + "%";
      }
    }

    if (ctaPrice) ctaPrice.textContent = formatMoney(totalPrice);
    if (ctaPriceSticky) ctaPriceSticky.textContent = formatMoney(totalPrice);

    var noteEl = el("scp-cta-note");
    var noteStickyEl = el("scp-cta-note-sticky");
    var bundle = bundles.find(function (x) { return x.id === state.bundleId; });
    var note = bundle && bundle.free > 0 ? "That's " + bundle.qty + " leggings, " + bundle.free + " free" : "1 legging";
    if (noteEl) noteEl.textContent = note;
    if (noteStickyEl) noteStickyEl.textContent = note;

    if (ctaBtn) {
      ctaBtn.disabled = !variant.available;
      ctaBtn.dataset.variantId = variant.id;
      ctaBtn.dataset.qty = qty;
    }
    if (stockNote) {
      stockNote.textContent = variant.available
        ? "In stock · Free shipping · 30-day refund"
        : "Out of stock for this combination.";
    }
  }

  function addToCart() {
    var ctaBtn = el("scp-cta-main");
    var variantId = ctaBtn.dataset.variantId;
    var qty = parseInt(ctaBtn.dataset.qty || "1", 10);
    if (!variantId) return;

    ctaBtn.disabled = true;
    var original = ctaBtn.textContent;
    ctaBtn.textContent = "Adding…";

    fetch(window.Shopify && window.Shopify.routes && window.Shopify.routes.root
      ? window.Shopify.routes.root + "cart/add.js"
      : "/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ items: [{ id: variantId, quantity: qty }] })
    })
      .then(function (r) { return r.json(); })
      .then(function () {
        window.location.href = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root
          ? window.Shopify.routes.root : "/") + "cart";
      })
      .catch(function () {
        ctaBtn.textContent = "Error — try again";
        setTimeout(function () { ctaBtn.textContent = original; ctaBtn.disabled = false; }, 2000);
      });
  }

  function renderFaq() {
    var items = document.querySelectorAll(".scp-faq-item");
    items.forEach(function (item) {
      var q = item.querySelector(".scp-faq-q");
      if (!q) return;
      q.addEventListener("click", function () {
        var wasOpen = item.classList.contains("scp-open");
        items.forEach(function (i) {
          i.classList.remove("scp-open");
          var icon = i.querySelector(".scp-icon");
          if (icon) icon.textContent = "+";
        });
        if (!wasOpen) {
          item.classList.add("scp-open");
          var icon = item.querySelector(".scp-icon");
          if (icon) icon.textContent = "−";
        }
      });
    });
  }

  function startCountdown() {
    var remaining = 29 * 60 + 35;
    var node = el("scp-countdown");
    if (!node) return;
    setInterval(function () {
      if (remaining <= 0) return;
      remaining -= 1;
      var m = Math.floor(remaining / 60), s = remaining % 60;
      node.textContent = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    }, 1000);
  }

  var ctaMain = el("scp-cta-main");
  if (ctaMain) ctaMain.addEventListener("click", addToCart);
  var ctaSticky = el("scp-cta-sticky");
  if (ctaSticky) ctaSticky.addEventListener("click", function () {
    var top = el("scp-top");
    if (top) top.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  renderStars();
  renderColors();
  renderSizes();
  renderAvailability();
  renderGallery();
  renderBundles();
  updateVariant();
  renderReviewBars();
  renderReviewList();
  renderFaq();
  startCountdown();
})();
