import Link from "next/link";
import BookCover from "@/components/BookCover";
import BuyButton from "@/components/BuyButton";
import { CheckIcon, pillarIcons } from "@/components/Icons";
import SalePrice from "@/components/SalePrice";
import { faqs, included, pillars, store, usd } from "@/data";

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

      {/* Buy */}
      <section id="buy" className="max-w-xl mx-auto px-4 sm:px-6 py-24 scroll-mt-20">
        <div className="frame-gold rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            <span className="text-gold">{store.productName}</span>
          </h2>
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mt-4">{store.promoLabel}</p>
          <div className="flex items-baseline justify-center gap-3 mt-2">
            <span className="font-display text-6xl font-bold text-gold">{usd(store.priceCents)}</span>
            <s className="text-2xl text-muted">{usd(store.compareAtCents)}</s>
          </div>
          <p className="text-xs text-muted mt-2">One-time payment · Digital guide (PDF)</p>
          <ul className="mt-8 space-y-3 inline-block text-left">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <CheckIcon className="mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <BuyButton label={<span>{store.ctaLabel} · <SalePrice className="ml-1 whitespace-nowrap" /></span>} className="w-full py-4 text-sm sm:text-base" />
          </div>
          <p className="text-xs text-muted mt-4">
            Secure checkout · {store.refundDays}-day money-back guarantee
          </p>
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
