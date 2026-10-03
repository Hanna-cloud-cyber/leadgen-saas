import Link from "next/link";
import BookCover from "@/components/BookCover";
import BuyButton from "@/components/BuyButton";
import { pillarIcons } from "@/components/Icons";
import SalePrice from "@/components/SalePrice";
import { faqs, phoenixStories, pillars, store, usd } from "@/data";

export default function Home() {
  return (
    <main>
      {/* Hero: title, then the book, then the price */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-16 text-center">
        <h1 className="font-display font-bold leading-[1.05] whitespace-nowrap">
          <span className="block text-[22px] sm:text-4xl">
            <span className="text-gold">THE 30 </span>
            <span className="text-rose">ARCHETYPES</span>
          </span>
          <span className="block text-gold text-[24px] sm:text-[44px]">OF WOMEN</span>
        </h1>
        <div className="mt-4">
          <BookCover src="/cover.webp" />
        </div>

        <div id="buy" className="scroll-mt-24">
        <p className="text-[11px] tracking-[0.3em] uppercase text-rose mt-10">{store.promoLabel}</p>
        <div className="flex items-baseline justify-center gap-3 mt-1">
          <span className="font-display text-6xl font-bold text-gold">{usd(store.priceCents)}</span>
          <s className="text-2xl text-muted">{usd(store.compareAtCents)}</s>
        </div>
        <p className="text-xs text-muted mt-2">One-time payment · Instant PDF download</p>

        <div className="mt-6 flex flex-col gap-3 max-w-md mx-auto">
          <BuyButton label={<span>{store.ctaLabel} · <SalePrice className="ml-1 whitespace-nowrap" /></span>} className="w-full px-6 py-4 text-sm" />
          <Link href="/quiz" className="btn-ghost px-8 py-4 text-sm">Free quiz</Link>
        </div>
        <p className="text-xs text-muted mt-3">Secure checkout · {store.refundDays}-day money-back guarantee</p>
        </div>

        <p className="font-condensed text-[20px] sm:text-3xl tracking-[0.06em] sm:tracking-[0.08em] mt-12 uppercase">
          Discover your archetype
          <span className="block text-rose">and unlock your feminine power</span>
        </p>
      </section>

      {/* Pillars, as on the cover */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x divide-[var(--line)] gap-y-10">
          {pillars.map((p) => {
            const Icon = pillarIcons[p.icon];
            return (
              <div key={p.title} className="text-center px-4">
                <Icon className="mx-auto" size={52} />
                <h3 className="text-xs sm:text-sm tracking-[0.2em] uppercase mt-3 text-cream">{p.title}</h3>
              </div>
            );
          })}
        </div>
        <div className="pill-rose rounded-xl mt-14 py-4 px-4 text-center font-semibold text-[11px] sm:text-sm tracking-[0.3em] sm:tracking-[0.4em]">
          UNDERSTAND · EMBRACE · DEVELOP · BECOME
        </div>
      </section>

      {/* Phoenix: who the guide is for */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="eyebrow">For the women who rise again</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3">
          <span className="text-gold">Rise Like </span>
          <span className="text-rose">the Phoenix</span>
        </h2>
        <p className="text-muted mt-4 max-w-xl mx-auto leading-relaxed">
          This guide was written for women who have been through the fire and are ready to
          meet the woman they are becoming.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mt-10 text-left">
          {phoenixStories.map((p) => (
            <div key={p.title} className="card p-6">
              <h3 className="font-display font-bold text-gold">{p.title}</h3>
              <p className="text-sm text-muted mt-2 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-2xl mx-auto px-4 sm:px-6 pb-16 scroll-mt-24">
        <h2 className="font-display text-2xl font-bold text-center text-gold">FAQ</h2>
        <div className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex items-center justify-between cursor-pointer font-semibold">
                {f.q}
                <span className="faq-icon text-gold text-2xl leading-none ml-4 transition-transform">+</span>
              </summary>
              <p className="text-muted mt-3 text-[15px] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-[var(--line)] bg-[rgba(11,8,6,0.95)] backdrop-blur p-3">
        <Link href="#buy" className="btn-gold w-full py-3.5 text-sm">
          <span>{store.ctaLabel} · <SalePrice className="ml-1 whitespace-nowrap" /></span>
        </Link>
      </div>
    </main>
  );
}
