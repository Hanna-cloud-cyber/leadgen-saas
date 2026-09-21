"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  PACKS,
  PRICING_TIERS,
  FAQS,
  TESTIMONIALS,
  HOW_IT_WORKS,
  WHATS_INSIDE,
  COMPARISON,
  SAMPLE_ROW,
  TOTAL_SUPPLIERS,
} from "./data";
import { CategoryIcon, TruckIcon, ShieldIcon, RefreshIcon, CheckIcon } from "./icons";

function usd(n: number) {
  return `$${n}`;
}

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i <= rating ? "#f5b942" : "#3a3a3a"}>
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6.1-5.4-3.2-5.4 3.2 1.3-6.1L1.3 7.7l6.1-.6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full">
      <CheckIcon className="w-3 h-3" /> VERIFIED
    </span>
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
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function CountdownBadge() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(msUntilMidnight());
    const id = setInterval(() => setRemaining(msUntilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  if (remaining === null) {
    return <span className="font-mono font-bold">&nbsp;</span>;
  }

  return <span className="font-mono font-bold text-amber-400">{formatCountdown(remaining)}</span>;
}

export default function SupplierBusinessClient() {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const selectedPackName = PACKS.find((p) => p.id === selectedPack)?.name;

  const filteredPacks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PACKS;
    return PACKS.filter((p) => p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q));
  }, [query]);

  return (
    <div id="top" className="min-h-screen bg-black text-white font-sans selection:bg-amber-400 selection:text-black">
      {/* Announcement bar */}
      <div className="bg-neutral-950 text-amber-400 text-[11px] sm:text-xs font-semibold tracking-wide text-center py-2.5 px-3 border-b border-neutral-800">
        FOUNDING MEMBER PRICING ENDS TONIGHT &nbsp;·&nbsp; <CountdownBadge />
      </div>

      {/* Header */}
      <header className="border-b border-neutral-900 sticky top-0 bg-black/90 backdrop-blur z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <span className="text-xl sm:text-2xl font-black tracking-tight">
            Supplier<span className="text-amber-400">Business</span>
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
            <a href="#packs" className="hover:text-white transition-colors">Packs</a>
            <a href="#inside" className="hover:text-white transition-colors">What&apos;s Inside</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <a
            href="#pricing"
            className="bg-amber-400 hover:bg-amber-300 text-black text-sm font-bold px-4 sm:px-5 py-2.5 rounded-full transition-colors"
          >
            Get Access
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245,185,66,0.12) 0%, transparent 70%), radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "auto, 28px 28px",
            }}
          />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-full">
                9 NICHES &middot; {TOTAL_SUPPLIERS}+ VERIFIED SUPPLIERS
              </span>
              <h1 className="text-4xl sm:text-6xl font-black leading-[1.05] tracking-tight mt-6">
                The Supplier Packs Behind
                <span className="block text-amber-400">Profitable Online Stores</span>
              </h1>
              <p className="text-neutral-400 text-base sm:text-lg mt-6 max-w-xl leading-relaxed">
                Skip months of cold emails and dead directories. Get instant access to hand-vetted
                suppliers, real minimum order quantities, and ready-to-send outreach templates &mdash;
                organized by niche.
              </p>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mt-9">
                <a
                  href="#pricing"
                  className="w-full sm:w-auto text-center bg-amber-400 hover:bg-amber-300 text-black font-bold px-8 py-4 rounded-full transition-colors"
                >
                  Unlock My Supplier Packs
                </a>
                <a
                  href="#packs"
                  className="w-full sm:w-auto text-center border border-neutral-700 hover:border-neutral-500 px-8 py-4 rounded-full text-neutral-300 transition-colors"
                >
                  See What&apos;s Inside
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-xs text-neutral-500">
                <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4 text-amber-400" /> No subscription required</span>
                <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4 text-amber-400" /> Updated every month</span>
                <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4 text-amber-400" /> 30-day access guarantee</span>
              </div>
            </div>

            {/* Pack preview mockup */}
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-400/10 blur-3xl rounded-full pointer-events-none" />
              <div className="relative rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <CategoryIcon icon="electronics" className="w-5 h-5 text-amber-400" />
                    Electronics Pack
                  </div>
                  <VerifiedBadge />
                </div>
                <div className="p-5 space-y-4">
                  <div className="rounded-xl border border-neutral-800 bg-black p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{SAMPLE_ROW.name}</span>
                      <VerifiedBadge />
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">{SAMPLE_ROW.location}</p>
                    <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                      <div>
                        <div className="text-neutral-500">Min. order</div>
                        <div className="font-semibold mt-0.5">{SAMPLE_ROW.moq}</div>
                      </div>
                      <div>
                        <div className="text-neutral-500">Sample price</div>
                        <div className="font-semibold mt-0.5">{SAMPLE_ROW.sample}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 opacity-40">
                    <div className="h-10 rounded-lg border border-neutral-800 bg-black" />
                    <div className="h-10 rounded-lg border border-neutral-800 bg-black" />
                  </div>
                  <p className="text-center text-[11px] text-neutral-600">+ {TOTAL_SUPPLIERS - 1} more suppliers inside</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-y border-neutral-900 bg-neutral-950/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">{TOTAL_SUPPLIERS}+</div>
              <div className="text-[11px] sm:text-xs text-neutral-500 mt-1 uppercase tracking-wide">Verified suppliers</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">9</div>
              <div className="text-[11px] sm:text-xs text-neutral-500 mt-1 uppercase tracking-wide">Niche packs</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">Monthly</div>
              <div className="text-[11px] sm:text-xs text-neutral-500 mt-1 uppercase tracking-wide">Data refresh</div>
            </div>
          </div>
        </section>

        {/* Packs grid */}
        <section id="packs" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-8">
            <p className="text-amber-400 text-xs font-bold tracking-widest uppercase">Choose your niche</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-3">9 Supplier Packs. One Membership.</h2>
            <p className="text-neutral-400 mt-3 max-w-xl mx-auto">
              Search or tap a pack to select it, or unlock all 9 with the All-Access Bundle below.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-10 relative">
            <svg viewBox="0 0 24 24" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a niche (e.g. beauty, scooters...)"
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400/60 outline-none rounded-full pl-11 pr-4 py-3 text-sm placeholder:text-neutral-600 transition-colors"
            />
          </div>

          {filteredPacks.length === 0 ? (
            <p className="text-center text-neutral-500 text-sm">No pack matches &ldquo;{query}&rdquo;.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPacks.map((pack) => (
                <button
                  key={pack.id}
                  onClick={() => setSelectedPack(pack.id)}
                  className={`text-left rounded-2xl p-6 border transition-all duration-200 ${
                    selectedPack === pack.id
                      ? "border-amber-400 bg-amber-400/5"
                      : "border-neutral-800 bg-neutral-950/60 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                      <CategoryIcon icon={pack.icon} className="w-6 h-6" />
                    </div>
                    <VerifiedBadge />
                  </div>
                  <h3 className="font-bold text-lg mt-4">{pack.name}</h3>
                  <p className="text-sm text-neutral-500 mt-1.5 leading-relaxed">{pack.tagline}</p>
                  <div className="flex items-center gap-3 mt-4 text-xs text-neutral-500">
                    <span className="font-semibold text-neutral-300">{pack.suppliers}+ suppliers</span>
                    <span>&middot;</span>
                    <span>{pack.countries} countries</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* How it works */}
        <section className="bg-neutral-950/60 border-y border-neutral-900 py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-black tracking-tight text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {HOW_IT_WORKS.map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-black font-black flex items-center justify-center mx-auto text-lg">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-lg mt-4">{s.title}</h3>
                  <p className="text-sm text-neutral-500 mt-2 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's inside */}
        <section id="inside" className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-xs font-bold tracking-widest uppercase">What&apos;s inside</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-3">Everything You Need to Start Ordering</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHATS_INSIDE.map((f) => (
              <div key={f.title} className="flex items-start gap-4 rounded-xl border border-neutral-800 bg-neutral-950/60 p-5">
                <div className="w-9 h-9 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                  <CheckIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">{f.title}</h3>
                  <p className="text-sm text-neutral-500 mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section className="bg-neutral-950/60 border-y border-neutral-900 py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-black tracking-tight text-center">SupplierBusiness vs. Free Lists</h2>
            <p className="text-neutral-400 text-center mt-3">Why sellers stop using random directories after one pack.</p>
            <div className="mt-10 rounded-2xl border border-neutral-800 overflow-hidden">
              <div className="grid grid-cols-3 bg-black text-xs font-bold uppercase tracking-wide text-neutral-500">
                <div className="px-4 py-3">&nbsp;</div>
                <div className="px-4 py-3 text-center text-amber-400">SupplierBusiness</div>
                <div className="px-4 py-3 text-center">Free directories</div>
              </div>
              {COMPARISON.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 items-center text-sm ${i % 2 === 0 ? "bg-neutral-950/60" : "bg-black"}`}
                >
                  <div className="px-4 py-3.5 text-neutral-300">{row.label}</div>
                  <div className="px-4 py-3.5 text-center">
                    {row.us === true ? (
                      <CheckIcon className="w-5 h-5 text-emerald-400 mx-auto" />
                    ) : (
                      <span className="text-amber-400 font-semibold">{row.us}</span>
                    )}
                  </div>
                  <div className="px-4 py-3.5 text-center text-neutral-600">
                    {row.free === false ? "—" : row.free === true ? (
                      <CheckIcon className="w-5 h-5 text-neutral-500 mx-auto" />
                    ) : (
                      row.free
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantee banner */}
        <section className="py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 mx-auto">
              <ShieldIcon className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-4">30-Day Access Guarantee</h2>
            <p className="text-neutral-400 mt-3 leading-relaxed">
              If you don&apos;t find at least 3 suppliers worth contacting in your pack, show us you
              reached out and we&apos;ll refund you in full &mdash; no questions asked.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-4">
            <p className="text-amber-400 text-xs font-bold tracking-widest uppercase">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-3">
              {selectedPackName ? (
                <>Get the <span className="text-amber-400">{selectedPackName}</span> Pack</>
              ) : (
                "Simple, One-Time Pricing"
              )}
            </h2>
            <p className="text-neutral-400 mt-3">Founding member pricing &mdash; ends when the timer runs out.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-7 flex flex-col ${
                  tier.badge
                    ? "border-2 border-amber-400 bg-amber-400/5 md:-translate-y-2"
                    : "border border-neutral-800 bg-neutral-950/60"
                }`}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[10px] font-black tracking-wider px-3 py-1 rounded-full">
                    {tier.badge}
                  </span>
                )}
                <h3 className="font-bold text-lg">{tier.name}</h3>
                <p className="text-sm text-neutral-500 mt-1">{tier.sublabel}</p>
                <div className="flex items-baseline gap-2 mt-5">
                  <span className="text-4xl font-black">{usd(tier.price)}</span>
                  <span className="text-neutral-500 line-through">{usd(tier.compareAt)}</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">{tier.packCount} &middot; one-time payment</p>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-300">
                      <CheckIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block text-center mt-7 py-3.5 rounded-full font-bold transition-colors ${
                    tier.badge
                      ? "bg-amber-400 hover:bg-amber-300 text-black"
                      : "bg-neutral-800 hover:bg-neutral-700 text-white"
                  }`}
                >
                  Get {tier.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5"><TruckIcon className="w-4 h-4" /> Instant digital access</span>
            <span className="flex items-center gap-1.5"><RefreshIcon className="w-4 h-4" /> Monthly refresh</span>
            <span className="flex items-center gap-1.5"><ShieldIcon className="w-4 h-4" /> 30-day guarantee</span>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-neutral-950/60 border-y border-neutral-900 py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-center">Trusted by Online Sellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-12">
              {TESTIMONIALS.map((t) => (
                <blockquote key={t.name} className="rounded-xl border border-neutral-800 bg-black p-6">
                  <Stars rating={t.rating} />
                  <p className="mt-3 text-[15px] text-neutral-200">&ldquo;{t.text}&rdquo;</p>
                  <footer className="mt-4 text-sm text-neutral-500">
                    <span className="font-semibold text-neutral-300">{t.name}</span> &mdash; {t.role}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-black tracking-tight text-center mb-10">Frequently Asked Questions</h2>
          <div className="divide-y divide-neutral-800">
            {FAQS.map((f, i) => (
              <div key={f.q}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left font-bold"
                >
                  {f.q}
                  <span className="text-xl font-normal ml-4 text-amber-400">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="text-neutral-400 pb-5 text-[15px] leading-relaxed">{f.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden border-t border-neutral-900">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(245,185,66,0.1) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-24 pb-28 lg:pb-24 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Stop Searching. Start Selling.</h2>
            <p className="text-neutral-400 mt-4">
              {TOTAL_SUPPLIERS}+ verified suppliers across 9 niches, ready the moment you check out.
            </p>
            <a
              href="#pricing"
              className="inline-block mt-8 bg-amber-400 hover:bg-amber-300 text-black font-bold px-10 py-4 rounded-full transition-colors"
            >
              Unlock My Supplier Packs
            </a>
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 inset-x-0 bg-neutral-950/95 backdrop-blur border-t border-neutral-800 p-3 lg:hidden z-40">
        <a
          href="#pricing"
          className="block text-center w-full bg-amber-400 text-black font-bold py-3 rounded-full"
        >
          Unlock My Supplier Packs
        </a>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-900 px-4 sm:px-6 py-10 pb-24 lg:pb-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
          <span className="font-black tracking-tight text-neutral-400">
            Supplier<span className="text-amber-400">Business</span>
          </span>
          <div className="flex gap-6">
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">Contact</span>
          </div>
        </div>
        <p className="text-center text-xs text-neutral-700 mt-6">
          &copy; {new Date().getFullYear()} SupplierBusiness. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
