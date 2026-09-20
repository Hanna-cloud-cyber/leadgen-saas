"use client";

import { useEffect, useState } from "react";
import type { Finish, LucentDermProduct } from "./data";
import { useCart } from "./useCart";
import CartDrawer from "./CartDrawer";
import { DeviceAngled, DeviceStudio, FaceZoneMap, KitFlatlay } from "./DeviceArt";

function usd(n: number) {
  return `$${n.toFixed(2)}`;
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

export default function LucentDermClient({ product }: { product: LucentDermProduct }) {
  const {
    finishes,
    bundles,
    reviewAverage,
    reviewBreakdown,
    reviewTotal,
    reviews,
    faqs,
    variantMap,
    shopifyEnabled,
  } = product;

  const [finish, setFinish] = useState<Finish>(finishes[0]);
  const [bundleId, setBundleId] = useState("duo");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, loading: cartLoading, error: cartError, addLine, updateLineQuantity, removeLine, setError: setCartError } = useCart();

  const bundle = bundles.find((b) => b.id === bundleId)!;
  const solo = bundles.find((b) => b.id === "solo")!;

  const gallery = [
    { key: "studio", render: () => <DeviceStudio finish={finish.swatch} /> },
    { key: "angled", render: () => <DeviceAngled finish={finish.swatch} /> },
    { key: "zones", render: () => <FaceZoneMap /> },
    { key: "kit", render: () => <KitFlatlay finish={finish.swatch} /> },
  ];

  async function handleAddToCart() {
    if (!shopifyEnabled) {
      setCartError("Store checkout isn't connected yet — see README-LUCENTDERM.md to enable it.");
      return;
    }

    const variantId = variantMap[finish.label];
    if (!variantId) {
      setCartError("This finish isn't available right now.");
      return;
    }

    try {
      await addLine(variantId, bundle.qty);
      setCartOpen(true);
    } catch {
      // error already captured in cartError by the hook
    }
  }

  const addToCartLabel = cartLoading ? "ADDING…" : `ADD TO CART · ${usd(bundle.price)}`;

  return (
    <div id="top" className="min-h-screen bg-white text-[#161616] font-sans">
      {/* Announcement bar */}
      <div className="bg-[#161616] text-white text-[8.5px] sm:text-xs font-semibold tracking-normal sm:tracking-wide text-center py-2 px-2 whitespace-nowrap overflow-hidden">
        FREE SHIPPING OVER {usd(solo.compareAt)} &nbsp;·&nbsp; 2-YEAR WARRANTY INCLUDED
      </div>

      {/* Header */}
      <header className="border-b border-neutral-200 sticky top-0 bg-white/95 backdrop-blur z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <span className="hidden sm:block text-[11px] font-semibold tracking-widest text-neutral-500">
            THE GLOW WAND
          </span>
          <span className="text-2xl font-black tracking-[0.2em]">LUCENTDERM</span>
          <button className="relative" aria-label="Cart" onClick={() => setCartOpen(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="1.8">
              <path d="M6 8h12l-1 12H7L6 8z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {cart && cart.totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#161616] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.totalQuantity}
              </span>
            )}
          </button>
        </div>
      </header>

      <main>
        {/* Hero: gallery + buy box */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="aspect-[4/5] bg-neutral-100 overflow-hidden rounded-sm relative">
              {gallery[galleryIndex].render()}
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {gallery.map((g, i) => (
                <button
                  key={g.key}
                  onClick={() => setGalleryIndex(i)}
                  className={`aspect-square relative bg-neutral-100 overflow-hidden rounded-sm border-2 ${
                    i === galleryIndex ? "border-[#161616]" : "border-transparent"
                  }`}
                >
                  {g.render()}
                </button>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div>
            <span className="inline-block bg-[#161616] text-white text-[11px] font-bold tracking-wider px-3 py-1 mb-4">
              DERMATOLOGIST-INSPIRED
            </span>
            <h1 className="text-[19px] sm:text-3xl font-black uppercase leading-tight tracking-tight">
              LucentDerm Glow Wand — Dual LED Light Therapy
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

            {/* Finish selector */}
            <div className="mt-5">
              <span className="text-xs font-bold tracking-wide">
                FINISH: <span className="font-normal text-neutral-600">{finish.label}</span>
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {finishes.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setFinish(f);
                      setGalleryIndex(0);
                    }}
                    title={f.label}
                    className={`w-9 h-9 rounded-full border-2 ${
                      finish.id === f.id ? "border-[#161616]" : "border-transparent"
                    } ring-1 ring-neutral-200`}
                    style={{ backgroundColor: f.swatch }}
                  />
                ))}
              </div>
            </div>

            <ul className="mt-6 space-y-2">
              {[
                "Visibly reduces breakouts & post-acne marks",
                "Softens fine lines and boosts radiance",
                "Calms redness and evens skin tone",
                "Just 3 minutes a day, cordless & travel-ready",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-[15px]">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  {b}
                </li>
              ))}
            </ul>

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
                      Save {usd(b.compareAt - b.price)} · {usd(b.price / b.qty)}/wand
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
              disabled={cartLoading}
              className="w-full bg-[#161616] text-white font-bold tracking-wide py-4 mt-5 hover:bg-neutral-800 transition-colors disabled:opacity-60"
            >
              {addToCartLabel}
            </button>
            {cartError && (
              <p className="text-center text-xs text-red-600 mt-1.5">{cartError}</p>
            )}
            <p className="text-center text-xs text-neutral-400 mt-1.5">
              {bundle.qty > 1 ? `${bundle.qty} wands` : "1 wand"}
            </p>

            <p className="text-center text-xs text-neutral-500 mt-2">
              In stock · Free shipping · 2-year warranty
            </p>

            <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-neutral-200 text-center text-[11px] text-neutral-600">
              <div className="flex flex-col items-center gap-1">
                <TruckIcon />
                Free shipping {usd(solo.compareAt)}+
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldIcon />
                2-year warranty
              </div>
              <div className="flex flex-col items-center gap-1">
                <LockIcon />
                Secure checkout
              </div>
            </div>
          </div>
        </section>

        {/* Promise banner */}
        <section className="bg-[#161616] text-white text-center py-14 px-4">
          <p className="text-[11px] tracking-[0.3em] font-semibold text-neutral-400">
            THE LUCENTDERM PROMISE
          </p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase mt-2">
            Clear, Luminous Skin
          </h2>
          <p className="max-w-md mx-auto text-neutral-300 mt-3 text-[15px]">
            Three minutes a day changes everything: it calms, clarifies, and reveals a healthier-looking glow.
          </p>
        </section>

        {/* Result / Mechanism / Zones / Routine */}
        <ImageTextRow
          eyebrow="THE RESULT"
          title="A visibly clearer, more even complexion"
          text="Consistent light therapy sessions help calm visible congestion and even out tone, session after session."
          bullets={["Fewer visible breakouts", "Smoother, more refined texture", "A natural, healthy-looking glow"]}
          art={<DeviceStudio finish={finish.swatch} />}
        />
        <ImageTextRow
          eyebrow="THE TECHNOLOGY"
          title="Two wavelengths, one ritual"
          text=""
          bullets={[]}
          art={<DeviceAngled finish={finish.swatch} />}
          reverse
          richBullets={[
            { title: "630nm red light.", text: "Supports the skin's natural renewal process and softens the look of fine lines." },
            { title: "415nm blue light.", text: "Targets the environment where blemish-causing bacteria thrive, helping congestion look calmer." },
            { title: "Gentle warmth + micro-vibration.", text: "Helps serum glide and absorb, and relaxes the muscles of the face." },
          ]}
        />
        <ImageTextRow
          eyebrow="TARGETED ZONES"
          title="Built for every corner of your face"
          text="Glide the contoured head along your forehead, cheeks, chin, and jawline — reaching where fingers can't."
          bullets={[]}
          art={<FaceZoneMap />}
          richBullets={[
            { title: "Without LucentDerm.", text: "Uneven tone, visible congestion, a dull-looking complexion." },
            { title: "With LucentDerm.", text: "Smoother texture, a calmer tone, a visible glow." },
          ]}
        />

        {/* Timeline */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 border-t border-neutral-200">
          <div className="grid grid-cols-3 text-center gap-4">
            {[
              ["Day 1", "Calmer, hydrated skin"],
              ["2 Weeks", "Less visible congestion"],
              ["4 Weeks", "Clearer, more even tone"],
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
              ["Dual-wavelength LED", "Red + blue light in one wand."],
              ["Cordless & travel-ready", "45-minute charge, weeks of use."],
              ["Whisper-quiet motor", "Gentle micro-vibration massage."],
              ["Auto shut-off timer", "3-minute sessions, every time."],
            ].map(([t, d]) => (
              <div key={t} className="bg-white border border-neutral-200 p-6">
                <h3 className="font-bold">{t}</h3>
                <p className="text-sm text-neutral-500 mt-1">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Daily use */}
        <ImageTextRow
          eyebrow="YOUR ROUTINE"
          title="A 3-minute ritual, morning or night"
          text="Cleanse, glide, glow — cordless and quiet enough for a plane, a hotel room, or your own bathroom mirror."
          bullets={[]}
          tags={["MORNING", "EVENING", "TRAVEL", "SPA NIGHT"]}
          art={<KitFlatlay finish={finish.swatch} />}
        />

        {/* Specs */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center border-t border-neutral-200">
          <h2 className="text-2xl font-black uppercase">Engineered to feel like a spa, not a chore</h2>
          <p className="text-neutral-500 mt-3">
            Medical-grade stainless steel head, 630nm red + 415nm blue LEDs, USB-C charging, IPX6 water-resistant for use in the shower.
          </p>
          <p className="text-neutral-400 mt-4 text-xs max-w-md mx-auto">
            *Results vary. LucentDerm is a cosmetic device and is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </section>

        {/* Final CTA */}
        <section className="bg-[#161616] text-white text-center py-16 px-4">
          <h2 className="text-2xl sm:text-3xl font-black uppercase">
            Ready for clearer, more luminous skin?
          </h2>
          <p className="text-neutral-300 mt-3 text-sm">
            Share the Glow bundle today · Free shipping over {usd(solo.compareAt)} · 2-year warranty
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
            Loved by over 5,000 clear-skin converts
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
            More LucentDerm customer reviews will be added over time.
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
          disabled={cartLoading}
          className="w-full bg-[#161616] text-white font-bold tracking-wide py-3 disabled:opacity-60"
        >
          {addToCartLabel}
        </button>
        <p className="text-center text-[11px] text-neutral-400 mt-1">
          {bundle.qty > 1 ? `${bundle.qty} wands` : "1 wand"}
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-50 border-t border-neutral-200 py-12 px-4 sm:px-6 mt-8 pb-24 lg:pb-12">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="text-xl font-black tracking-[0.2em] mb-3">LUCENTDERM</div>
            <p className="text-neutral-500">
              Dermatologist-inspired light therapy for calmer, clearer, more luminous skin.
            </p>
          </div>
          <div>
            <div className="font-bold mb-3">Help</div>
            <ul className="space-y-2 text-neutral-500">
              <li>Order tracking</li>
              <li>Warranty &amp; returns</li>
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
          © {new Date().getFullYear()} LucentDerm. All rights reserved.
        </p>
      </footer>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        loading={cartLoading}
        onUpdateQuantity={updateLineQuantity}
        onRemove={removeLine}
      />
    </div>
  );
}

function ImageTextRow({
  eyebrow,
  title,
  text,
  bullets,
  art,
  reverse,
  tags,
  richBullets,
}: {
  eyebrow: string;
  title: string;
  text: string;
  bullets: string[];
  art: React.ReactNode;
  reverse?: boolean;
  tags?: string[];
  richBullets?: { title: string; text: string }[];
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-2 gap-8 items-center">
      <div className={`relative aspect-[4/5] bg-neutral-100 ${reverse ? "md:order-2" : ""}`}>{art}</div>
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
    // Deliberately client-only: computing this during render would mismatch
    // between server render time and client hydration time.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="1.6">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9.5 12l1.8 1.8L14.5 10" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="1.6">
      <rect x="5" y="10" width="14" height="10" rx="1.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
