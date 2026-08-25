"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Colorway, SculptiaProduct } from "./data";

const ASSETS = "/sculptia/product-assets";

function usd(n: number) {
  return `$${n.toFixed(2)}`;
}

// Colorway studio photos have a lot of headroom above the model; a plain
// centered object-cover crops into her forehead on the 4:5 product frame.
// Bias the crop upward for those specifically — lifestyle photos are
// already framed tightly and don't need it.
function photoObjectPosition(src: string) {
  return src.includes("colorway-") ? "object-[center_35%]" : "object-center";
}

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i <= Math.round(rating) ? "#161616" : "#e5e5e5"}
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6.1-5.4-3.2-5.4 3.2 1.3-6.1L1.3 7.7l6.1-.6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function SculptiaClient({ product }: { product: SculptiaProduct }) {
  const {
    colorways,
    sizes,
    bundles,
    reviewAverage,
    reviewBreakdown,
    reviewTotal,
    reviews,
    faqs,
    variantMap,
    shopifyEnabled,
  } = product;

  const [color, setColor] = useState<Colorway>(colorways[0]);
  const [size, setSize] = useState(sizes.includes("M") ? "M" : sizes[0]);
  const [bundleId, setBundleId] = useState("duo");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [cartStatus, setCartStatus] = useState<"idle" | "loading" | "error">("idle");
  const [cartMessage, setCartMessage] = useState<string | null>(null);

  const bundle = bundles.find((b) => b.id === bundleId)!;
  const solo = bundles.find((b) => b.id === "solo")!;

  const gallery = Array.from(
    new Set([
      color.image,
      `${ASSETS}/colorway-black.png`,
      `${ASSETS}/lifestyle-couch.png`,
      `${ASSETS}/lifestyle-yoga.png`,
    ])
  );

  async function handleAddToCart() {
    if (!shopifyEnabled) {
      setCartStatus("error");
      setCartMessage("Store checkout isn't connected yet — see README-SHOPIFY.md to enable it.");
      return;
    }

    const variantId = variantMap[`${color.label}|${size}`];
    if (!variantId) {
      setCartStatus("error");
      setCartMessage("This color/size isn't available right now.");
      return;
    }

    setCartStatus("loading");
    setCartMessage(null);
    try {
      const res = await fetch("/api/sculptia/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, quantity: bundle.qty }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Checkout unavailable.");
      }
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setCartStatus("error");
      setCartMessage(err instanceof Error ? err.message : "Something went wrong — try again.");
    }
  }

  const addToCartLabel =
    cartStatus === "loading" ? "ADDING…" : `ADD TO CART · ${usd(bundle.price)}`;

  return (
    <div className="min-h-screen bg-white text-[#161616] font-sans">
      {/* Announcement bar */}
      <div className="bg-[#161616] text-white text-[8.5px] sm:text-xs font-semibold tracking-normal sm:tracking-wide text-center py-2 px-2 whitespace-nowrap overflow-hidden">
        FREE SHIPPING OVER {usd(solo.compareAt)} &nbsp;·&nbsp; BUY 2 GET 1 FREE — TODAY ONLY
      </div>

      {/* Header */}
      <header className="border-b border-neutral-200 sticky top-0 bg-white/95 backdrop-blur z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <span className="hidden sm:block text-[11px] font-semibold tracking-widest text-neutral-500">
            THE LEGGING
          </span>
          <span className="text-2xl font-black tracking-[0.3em]">SCULPTIA</span>
          <button className="relative" aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="1.8">
              <path d="M6 8h12l-1 12H7L6 8z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
          </button>
        </div>
      </header>

      <main>
        {/* Hero: gallery + buy box */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="aspect-[4/5] bg-neutral-100 overflow-hidden rounded-sm relative">
              <Image
                src={gallery[galleryIndex]}
                alt={`Sculptia 3D Anti-Cellulite Legging — ${color.label}`}
                fill
                className={`object-cover ${photoObjectPosition(gallery[galleryIndex])}`}
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setGalleryIndex(i)}
                  className={`aspect-square relative bg-neutral-100 overflow-hidden rounded-sm border-2 ${
                    i === galleryIndex ? "border-[#161616]" : "border-transparent"
                  }`}
                >
                  <Image src={src} alt="" fill className={`object-cover ${photoObjectPosition(src)}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div>
            <span className="inline-block bg-[#161616] text-white text-[11px] font-bold tracking-wider px-3 py-1 mb-4">
              BEST-SELLER
            </span>
            <h1 className="text-[19px] sm:text-3xl font-black uppercase leading-tight tracking-tight whitespace-nowrap sm:whitespace-normal">
              Sculptia 3D Anti-Cellulite Legging
            </h1>

            <div className="flex items-center gap-2 mt-3">
              <Stars rating={reviewAverage} />
              <span className="font-semibold text-sm">{reviewAverage}</span>
              <a href="#reviews" className="text-sm text-neutral-500 underline underline-offset-2">
                ({reviewTotal} reviews)
              </a>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <span className="text-3xl font-black">{usd(solo.price)}</span>
              <span className="text-lg text-neutral-400 line-through">{usd(solo.compareAt)}</span>
              <span className="bg-neutral-100 text-xs font-bold px-2 py-1">
                SAVE {Math.round((1 - solo.price / solo.compareAt) * 100)}%
              </span>
            </div>

            <ul className="mt-5 space-y-2">
              {[
                "Visibly reduces cellulite faster",
                "Tones your legs effortlessly",
                "Lifts and shapes your butt instantly",
                "Squat-proof, zero see-through",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-[15px]">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Color selector */}
            <div className="mt-6">
              <span className="text-xs font-bold tracking-wide">
                COLOR: <span className="font-normal text-neutral-600">{color.label}</span>
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {colorways.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setColor(c);
                      setGalleryIndex(0);
                    }}
                    title={c.label}
                    className={`w-9 h-9 rounded-full border-2 ${
                      color.id === c.id ? "border-[#161616]" : "border-transparent"
                    } ring-1 ring-neutral-200`}
                    style={{ backgroundColor: c.swatch }}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mt-5">
              <span className="text-xs font-bold tracking-wide">
                SIZE: <span className="font-normal text-neutral-600">{size}</span>
              </span>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-2 text-sm font-semibold border ${
                      size === s
                        ? "bg-[#161616] text-white border-[#161616]"
                        : "border-neutral-300 hover:border-neutral-500"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="mt-5 bg-neutral-100 text-center py-3 text-sm font-semibold flex items-center justify-center gap-2">
              <span>OFFER ENDS TONIGHT</span>
              <span className="text-neutral-500">·</span>
              <CountdownBadge />
            </div>

            {/* Bundles */}
            <div className="mt-4 space-y-2">
              {bundles.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBundleId(b.id)}
                  className={`w-full text-left border p-4 flex items-start gap-3 relative ${
                    bundleId === b.id ? "border-[#161616] bg-neutral-50" : "border-neutral-200"
                  }`}
                >
                  {b.badge && (
                    <span className="absolute -top-3 right-3 bg-[#161616] text-white text-[10px] font-bold px-2 py-1">
                      {b.badge}
                    </span>
                  )}
                  <span
                    className={`mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                      bundleId === b.id ? "border-[#161616] bg-[#161616]" : "border-neutral-300"
                    }`}
                  />
                  <span className="flex-1">
                    <span className="block font-bold text-sm text-[#161616]">{b.label}</span>
                    <span className="block text-xs text-neutral-500">{b.sublabel}</span>
                    <span className="block text-xs text-neutral-500 mt-1">
                      Save {usd(b.compareAt - b.price)} · {usd(b.price / b.qty)}/pair
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block font-black text-[#161616]">{usd(b.price)}</span>
                    <span className="block text-xs text-neutral-400 line-through">{usd(b.compareAt)}</span>
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={cartStatus === "loading"}
              className="w-full bg-[#161616] text-white font-bold tracking-wide py-4 mt-5 hover:bg-neutral-800 transition-colors disabled:opacity-60"
            >
              {addToCartLabel}
            </button>
            {cartMessage && (
              <p className="text-center text-xs text-red-600 mt-1.5">{cartMessage}</p>
            )}
            <p className="text-center text-xs text-neutral-400 mt-1.5">
              {bundle.free > 0
                ? `That's ${bundle.qty} leggings, ${bundle.free} free`
                : "1 legging"}
            </p>

            <p className="text-center text-xs text-neutral-500 mt-2">
              In stock · Free shipping · 30-day refund
            </p>

            <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-neutral-200 text-center text-[11px] text-neutral-600">
              <div className="flex flex-col items-center gap-1">
                <TruckIcon />
                Free shipping {usd(solo.compareAt)}+
              </div>
              <div className="flex flex-col items-center gap-1">
                <ReturnIcon />
                30-day returns
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldIcon />
                Secure checkout
              </div>
            </div>
          </div>
        </section>

        {/* Promise banner */}
        <section className="bg-[#161616] text-white text-center py-14 px-4">
          <p className="text-[11px] tracking-[0.3em] font-semibold text-neutral-400">
            THE SCULPTIA PROMISE
          </p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase mt-2">
            Sculpt Your Silhouette
          </h2>
          <p className="max-w-md mx-auto text-neutral-300 mt-3 text-[15px]">
            One legging changes everything: it shapes, lifts, and smooths from the very first wear.
          </p>
        </section>

        {/* Result / Mechanism / Circulation / Waist / Skin */}
        <ImageTextRow
          eyebrow="THE RESULT"
          title="A visibly more sculpted silhouette"
          text="The high waistband shapes your tummy, the back panels lift your glutes, and the compression slims your thighs."
          bullets={["Visibly slimmer waist", "Lifted, rounder glutes", "Smoother thighs, no marks"]}
          image={`${ASSETS}/lifestyle-yoga.png`}
        />
        <ImageTextRow
          eyebrow="THE MECHANISM"
          title="3D structure makes the difference"
          text=""
          bullets={[]}
          image={`${ASSETS}/lifestyle-couch.png`}
          reverse
          richBullets={[
            { title: "Honeycomb mesh.", text: "Raised cells create a micro-massage with every step." },
            { title: "Contoured panels.", text: "Lift your glutes like an invisible hand." },
            { title: "Graduated compression.", text: "Firm at the waist, flexible at the knee." },
          ]}
        />
        <ImageTextRow
          eyebrow="CIRCULATION"
          title="Fabric that massages with every move"
          text="3D drainage lines boost circulation and lymphatic drainage from the moment you put them on."
          bullets={[]}
          image={`${ASSETS}/colorway-gray-chine.png`}
          richBullets={[
            { title: "Without Sculptia.", text: "Sluggish circulation, stubborn cellulite." },
            { title: "With Sculptia.", text: "Boosted circulation, smoother skin." },
          ]}
        />
        <ImageTextRow
          eyebrow="THE WAISTBAND"
          title="High waist, flat tummy"
          text="The wide waistband holds your tummy gently in place and shapes your silhouette — without ever rolling down."
          bullets={["Gentle, secure hold", "Never rolls, never slips", "Naturally flattering shape"]}
          image={`${ASSETS}/colorway-navy.png`}
          reverse
        />
        <ImageTextRow
          eyebrow="YOUR SKIN"
          title="Visibly smoother-looking skin"
          text="The textured mesh stimulates your skin with every move. The look of dimpled skin visibly fades."
          bullets={[]}
          image={`${ASSETS}/colorway-charcoal.png`}
        />

        {/* Timeline */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 border-t border-neutral-200">
          <div className="grid grid-cols-3 text-center gap-4">
            {[
              ["Day 1", "Instant lift"],
              ["2 Weeks", "Firmer skin"],
              ["4 Weeks", "Smoother look"],
            ].map(([t, d]) => (
              <div key={t}>
                <div className="text-xl font-black">{t}</div>
                <div className="text-sm text-neutral-500 mt-1">{d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature grid */}
        <section className="bg-neutral-50 py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-4">
            {[
              ["Never rolls down", "Stays put, even in a squat."],
              ["100% opaque", "Zero see-through, squat-tested."],
              ["No annoying seams", "No chafing, no pinching."],
              ["Breathable", "Wicks moisture, dries fast."],
            ].map(([t, d]) => (
              <div key={t} className="bg-white border border-neutral-200 p-6">
                <h3 className="font-bold">{t}</h3>
                <p className="text-sm text-neutral-500 mt-1 whitespace-nowrap">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Daily use */}
        {/*
          NOTE: no outdoor/"walking in the city" photo available among the
          supplied visuals — every shot received is studio or indoor. Using a
          different colorway here in the meantime so it doesn't repeat a
          photo used elsewhere; swap in a real outdoor lifestyle photo when
          you have one.
        */}
        <ImageTextRow
          eyebrow="EVERYDAY WEAR"
          title="From workouts to everyday life"
          text="Wear it with sneakers or boots, from morning yoga to Sunday brunch."
          bullets={[]}
          tags={["WORKOUT", "OFFICE", "TRAVEL", "CITY"]}
          image={`${ASSETS}/colorway-beige.png`}
        />

        {/* Material */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center border-t border-neutral-200">
          <h2 className="text-2xl font-black uppercase">Sculpting without sacrificing comfort</h2>
          <p className="text-neutral-500 mt-3">
            70% nylon, 30% spandex — a second-skin fabric you&apos;ll forget you&apos;re wearing.
          </p>
        </section>

        {/* Final CTA */}
        <section className="bg-[#161616] text-white text-center py-16 px-4">
          <h2 className="text-2xl sm:text-3xl font-black uppercase">
            Ready to reveal your shape?
          </h2>
          <p className="text-neutral-300 mt-3 text-sm">
            Buy 2 get 1 FREE today · Free shipping over {usd(solo.compareAt)}
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            <span className="whitespace-nowrap">· 30-day refund</span>
          </p>
          <a
            href="#top"
            className="inline-block bg-white text-[#161616] font-bold tracking-wide px-8 py-4 mt-6"
          >
            CHOOSE MY BUNDLE
          </a>
        </section>

        {/* Reviews */}
        <section id="reviews" className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-2xl font-black uppercase text-center">
            Loved by over 7,000 women
          </h2>

          <div className="border border-neutral-200 p-6 mt-8 text-center">
            <div className="text-4xl font-black">{reviewAverage}</div>
            <div className="flex justify-center my-2">
              <Stars rating={reviewAverage} size={20} />
            </div>
            <div className="text-sm text-neutral-500">{reviewTotal} verified reviews</div>

            <div className="mt-7 space-y-3 text-left">
              {reviewBreakdown.map((r) => {
                const pct = (r.count / reviewTotal) * 100;
                return (
                  <div key={r.stars} className="flex items-center gap-3 text-sm">
                    <span className="w-10 shrink-0 font-semibold">{r.stars} ★</span>
                    <div className="flex-1 h-3 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#161616] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-12 shrink-0 text-right text-neutral-500 tabular-nums">
                      {pct.toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {reviews.map((r) => (
              <blockquote key={r.name} className="border border-neutral-200 p-6">
                <div className="flex items-center justify-between">
                  <Stars rating={r.rating} />
                  <span className="text-xs font-semibold text-neutral-500">{r.name}</span>
                </div>
                <p className="mt-3 text-[15px]">&ldquo;{r.text}&rdquo;</p>
              </blockquote>
            ))}
          </div>

          <p className="text-center text-xs text-neutral-400 mt-4">
            More Sculptia customer reviews will be added over time.
          </p>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 border-t border-neutral-200">
          <h2 className="text-2xl font-black uppercase mb-6">Frequently Asked Questions</h2>
          <div className="divide-y divide-neutral-200">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left font-bold"
                >
                  {f.q}
                  <span className="text-xl font-normal ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className="text-neutral-600 pb-4 text-[15px]">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 p-3 lg:hidden z-40">
        <button
          onClick={handleAddToCart}
          disabled={cartStatus === "loading"}
          className="w-full bg-[#161616] text-white font-bold tracking-wide py-3 disabled:opacity-60"
        >
          {addToCartLabel}
        </button>
        <p className="text-center text-[11px] text-neutral-400 mt-1">
          {bundle.free > 0 ? `That's ${bundle.qty} leggings, ${bundle.free} free` : "1 legging"}
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-50 border-t border-neutral-200 py-12 px-4 sm:px-6 mt-8 pb-24 lg:pb-12">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="text-xl font-black tracking-[0.3em] mb-3">SCULPTIA</div>
            <p className="text-neutral-500">
              Leggings engineered to sculpt, smooth, and elevate your shape every day.
            </p>
          </div>
          <div>
            <div className="font-bold mb-3">Help</div>
            <ul className="space-y-2 text-neutral-500">
              <li>Order tracking</li>
              <li>Returns &amp; exchanges</li>
              <li>Shipping</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-3">Newsletter</div>
            <p className="text-neutral-500 mb-3">Get 10% off your first order.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 border border-neutral-300 px-3 py-2 text-sm"
              />
              <button className="bg-[#161616] text-white px-4 text-sm font-semibold">OK</button>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-neutral-400 mt-10">
          © {new Date().getFullYear()} Sculptia. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function ImageTextRow({
  eyebrow,
  title,
  text,
  bullets,
  image,
  reverse,
  tags,
  richBullets,
}: {
  eyebrow: string;
  title: string;
  text: string;
  bullets: string[];
  image: string;
  reverse?: boolean;
  tags?: string[];
  richBullets?: { title: string; text: string }[];
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-2 gap-8 items-center">
      <div className={`relative aspect-[4/5] bg-neutral-100 ${reverse ? "md:order-2" : ""}`}>
        <Image src={image} alt={title} fill className={`object-cover ${photoObjectPosition(image)}`} />
      </div>
      <div className={reverse ? "md:order-1" : ""}>
        <p className="text-[11px] font-bold tracking-[0.25em] text-neutral-400">{eyebrow}</p>
        <h2 className="text-[21px] sm:text-3xl font-black uppercase mt-2 leading-tight tracking-tight sm:tracking-normal">{title}</h2>
        {text && <p className="text-neutral-500 mt-4">{text}</p>}
        {bullets.length > 0 && (
          <ul className="mt-4 space-y-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[15px]">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                {b}
              </li>
            ))}
          </ul>
        )}
        {richBullets && (
          <ul className="mt-4 space-y-3">
            {richBullets.map((b) => (
              <li key={b.title} className="text-[15px]">
                <span className="font-bold">{b.title}</span> <span className="text-neutral-500">{b.text}</span>
              </li>
            ))}
          </ul>
        )}
        {tags && (
          <div className="flex flex-wrap gap-2 mt-5">
            {tags.map((t) => (
              <span key={t} className="border border-neutral-300 px-4 py-2 text-xs font-semibold">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function msUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return hours > 0
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;
}

function CountdownBadge() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    setRemaining(msUntilMidnight());
    const id = setInterval(() => setRemaining(msUntilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  if (remaining === null) {
    return <span className="font-mono font-bold">&nbsp;</span>;
  }

  return <span className="font-mono font-bold">{formatCountdown(remaining)}</span>;
}

function TruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="1.6">
      <path d="M2 7h13v9H2z" />
      <path d="M15 10h4l3 3v3h-7z" />
      <circle cx="6.5" cy="18.5" r="1.5" />
      <circle cx="17.5" cy="18.5" r="1.5" />
    </svg>
  );
}
function ReturnIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="1.6">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="1.6">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9.5 12l1.8 1.8L14.5 10" />
    </svg>
  );
}
