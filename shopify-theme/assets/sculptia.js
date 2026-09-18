(function () {
  "use strict";

  var IMAGE_BY_COLOR = {
    Black: "sculptia-black.png",
    "Heather Grey": "sculptia-heather-grey.png",
    Beige: "sculptia-beige.png",
    Navy: "sculptia-navy.png",
    "Dark Olive": "sculptia-dark-olive.png",
    "Hot Pink": "sculptia-hot-pink.png",
    "Light Pink": "sculptia-light-pink.png",
    "Light Blue": "sculptia-light-blue.png"
  };

  var EXTRA_GALLERY_IMAGES = [
    "sculptia-black.png",
    "sculptia-lifestyle-couch.png",
    "sculptia-lifestyle-yoga.png"
  ];

  var dataEl = document.getElementById("sculptia-variants-data");
  if (!dataEl) return;
  var variants = JSON.parse(dataEl.textContent);

  var state = {
    color: null,
    size: null,
    qty: 2,
    free: 1
  };

  // Seed state from whichever swatch/size button is marked selected server-side.
  var initialSwatch = document.querySelector(".sculptia-swatch.is-selected");
  var initialSize = document.querySelector(".sculptia-size-btn.is-selected");
  state.color = initialSwatch ? initialSwatch.getAttribute("data-color") : null;
  state.size = initialSize ? initialSize.getAttribute("data-size") : null;

  function findVariant(color, size) {
    for (var i = 0; i < variants.length; i++) {
      var v = variants[i];
      var opts = v.title.split(" / ");
      if (opts[0] === color && opts[1] === size) return v;
    }
    return null;
  }

  function money(cents) {
    return "$" + (cents / 100).toFixed(2);
  }

  var ASSET_BASE = (function () {
    var script = document.querySelector('script[src*="sculptia.js"]');
    return script ? script.src.replace(/sculptia\.js.*$/, "") : "";
  })();

  function assetUrl(filename) {
    return ASSET_BASE + filename;
  }

  function setGallery(color) {
    var main = document.getElementById("sculptia-main-image");
    var thumbs = document.getElementById("sculptia-gallery-thumbs");
    var colorImage = IMAGE_BY_COLOR[color] || "sculptia-black.png";
    var images = [colorImage];
    EXTRA_GALLERY_IMAGES.forEach(function (img) {
      if (images.indexOf(img) === -1) images.push(img);
    });

    main.src = assetUrl(images[0]);
    thumbs.innerHTML = "";
    images.forEach(function (img, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "" + (i === 0 ? "is-selected" : "");
      var thumbImg = document.createElement("img");
      thumbImg.src = assetUrl(img);
      thumbImg.alt = "";
      btn.appendChild(thumbImg);
      btn.addEventListener("click", function () {
        main.src = assetUrl(img);
        Array.prototype.forEach.call(thumbs.children, function (c) {
          c.classList.remove("is-selected");
        });
        btn.classList.add("is-selected");
      });
      thumbs.appendChild(btn);
    });
  }

  function updatePriceUI() {
    var variant = findVariant(state.color, state.size);
    if (!variant) return;

    var priceEl = document.getElementById("sculptia-price");
    var compareEl = document.getElementById("sculptia-compare-at");
    var saveEl = document.getElementById("sculptia-save");
    priceEl.textContent = money(variant.price);
    if (variant.compare_at_price && variant.compare_at_price > variant.price) {
      if (compareEl) {
        compareEl.textContent = money(variant.compare_at_price);
        compareEl.style.display = "";
      }
      if (saveEl) {
        var pct = Math.round((1 - variant.price / variant.compare_at_price) * 100);
        saveEl.textContent = "SAVE " + pct + "%";
        saveEl.style.display = "";
      }
    } else {
      if (compareEl) compareEl.style.display = "none";
      if (saveEl) saveEl.style.display = "none";
    }

    var addBtn = document.getElementById("sculptia-add-to-cart");
    var addBtnMobile = document.getElementById("sculptia-add-to-cart-mobile");
    var bundlePrice = variant.price * state.qty;
    var label = "ADD TO CART · " + money(bundlePrice);
    addBtn.textContent = label;
    addBtnMobile.textContent = label;

    var note = state.free > 0
      ? "That's " + (state.qty + state.free) + " leggings, " + state.free + " free"
      : "1 legging";
    document.getElementById("sculptia-bundle-note").textContent = note;
    document.getElementById("sculptia-bundle-note-mobile").textContent = note;

    // Bundle card prices, derived from the real variant price so they stay
    // in sync automatically if the base price ever changes in Shopify.
    var soloCompareAt = variant.compare_at_price || variant.price;
    document.querySelectorAll(".sculptia-bundle").forEach(function (card) {
      var qty = parseInt(card.getAttribute("data-qty"), 10);
      var free = parseInt(card.getAttribute("data-free"), 10);
      var priceNow = variant.price * qty;
      var priceWas = soloCompareAt * (qty + free);
      var priceEl = card.querySelector(".sculptia-bundle-price");
      var saveLine = card.querySelector(".sculptia-bundle-save");
      priceEl.innerHTML =
        '<span class="sculptia-bp-now">' + money(priceNow) + "</span>" +
        '<span class="sculptia-bp-was">' + money(priceWas) + "</span>";
      saveLine.textContent = "Save " + money(priceWas - priceNow) + " · " + money(priceNow / qty) + "/pair";
    });
  }

  function selectColor(color) {
    state.color = color;
    document.getElementById("sculptia-color-label").textContent = color;
    document.querySelectorAll(".sculptia-swatch").forEach(function (btn) {
      btn.classList.toggle("is-selected", btn.getAttribute("data-color") === color);
    });
    setGallery(color);
    updatePriceUI();
  }

  function selectSize(size) {
    state.size = size;
    document.getElementById("sculptia-size-label").textContent = size;
    document.querySelectorAll(".sculptia-size-btn").forEach(function (btn) {
      btn.classList.toggle("is-selected", btn.getAttribute("data-size") === size);
    });
    updatePriceUI();
  }

  function selectBundle(qty, free) {
    state.qty = qty;
    state.free = free;
    document.querySelectorAll(".sculptia-bundle").forEach(function (btn) {
      var match = parseInt(btn.getAttribute("data-qty"), 10) === qty;
      btn.classList.toggle("is-selected", match);
    });
    updatePriceUI();
  }

  document.querySelectorAll(".sculptia-swatch").forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectColor(btn.getAttribute("data-color"));
    });
  });

  document.querySelectorAll(".sculptia-size-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectSize(btn.getAttribute("data-size"));
    });
  });

  document.querySelectorAll(".sculptia-bundle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectBundle(parseInt(btn.getAttribute("data-qty"), 10), parseInt(btn.getAttribute("data-free"), 10));
    });
  });

  function showError(message) {
    [document.getElementById("sculptia-cart-error")].forEach(function (el) {
      if (!el) return;
      el.textContent = message;
      el.hidden = !message;
    });
  }

  function addToCart() {
    var variant = findVariant(state.color, state.size);
    if (!variant) {
      showError("This color/size isn't available right now.");
      return;
    }
    if (!variant.available) {
      showError("This color/size is out of stock right now.");
      return;
    }

    showError("");
    var addBtn = document.getElementById("sculptia-add-to-cart");
    var addBtnMobile = document.getElementById("sculptia-add-to-cart-mobile");
    addBtn.disabled = true;
    addBtnMobile.disabled = true;
    var originalLabel = addBtn.textContent;
    addBtn.textContent = "ADDING…";
    addBtnMobile.textContent = "ADDING…";

    fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ id: variant.id, quantity: state.qty + state.free })
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Could not add to cart.");
        return res.json();
      })
      .then(function () {
        window.location.href = "/cart";
      })
      .catch(function () {
        showError("Could not add to cart. Please try again.");
        addBtn.disabled = false;
        addBtnMobile.disabled = false;
        addBtn.textContent = originalLabel;
        addBtnMobile.textContent = originalLabel;
      });
  }

  document.getElementById("sculptia-add-to-cart").addEventListener("click", addToCart);
  document.getElementById("sculptia-add-to-cart-mobile").addEventListener("click", addToCart);

  // Countdown to local midnight.
  function msUntilMidnight() {
    var now = new Date();
    var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    return midnight.getTime() - now.getTime();
  }
  function formatCountdown(ms) {
    var totalSeconds = Math.max(0, Math.floor(ms / 1000));
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    function pad(n) { return String(n).padStart(2, "0"); }
    return hours > 0 ? pad(hours) + ":" + pad(minutes) + ":" + pad(seconds) : pad(minutes) + ":" + pad(seconds);
  }
  var countdownEl = document.getElementById("sculptia-countdown");
  if (countdownEl) {
    function tick() {
      countdownEl.textContent = formatCountdown(msUntilMidnight());
    }
    tick();
    setInterval(tick, 1000);
  }

  // Initial paint.
  if (state.color) setGallery(state.color);
  selectBundle(2, 1);
})();
