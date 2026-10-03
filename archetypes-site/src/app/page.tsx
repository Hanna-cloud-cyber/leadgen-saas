import Link from "next/link";
import BookCover from "@/components/BookCover";
import BuyButton from "@/components/BuyButton";
import { pillarIcons } from "@/components/Icons";
import SalePrice from "@/components/SalePrice";
import Image from "next/image";
import { faqs, pillars, reviews, store, usd } from "@/data";

export default function Home() {
  return (
    <main>
      {/* Hero: the book, then the price */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 text-center">
        {/* Title is on the cover itself; kept for search engines and screen readers. */}
        <h1 className="sr-only">{store.productName}</h1>
        <div>
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
          <BuyButton label={<span>{store.ctaLabel} · <SalePrice className="ml-1 whitespace-nowrap" /></span>} className="w-full px-4 py-4 text-[13px] sm:text-sm whitespace-nowrap" />
          <Link href="/quiz" className="btn-ghost px-8 py-4 text-sm">Free quiz</Link>
        </div>
        <p className="text-xs text-muted mt-3">Secure checkout · {store.refundDays}-day money-back guarantee</p>
        </div>

        <p className="font-condensed text-[17px] sm:text-3xl tracking-[0.04em] sm:tracking-[0.08em] mt-12 uppercase">
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

      {/* Reader reviews */}
      <section id="reviews" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 scroll-mt-24">
        {reviews.length > 0 ? (
          <>
          <div className="text-center">
            <p className="eyebrow">Reader stories</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3">
              <span className="text-gold">What Women </span>
              <span className="text-rose">Are Saying</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {reviews.map((r) => (
              <figure key={r.name} className="card p-6 flex gap-4">
                <div className="shrink-0">
                  {r.photo ? (
                    <Image
                      src={r.photo}
                      alt={r.name}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-full object-cover frame-gold"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full frame-gold flex items-center justify-center font-display text-xl">
                      <span className="text-gold">{r.name[0]}</span>
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <figcaption className="font-display font-bold text-cream">{r.name}</figcaption>
                    <span className="text-gold text-sm tracking-widest" aria-label={`${r.rating} out of 5`}>
                      {"★".repeat(r.rating)}
                    </span>
                  </div>
                  <blockquote className="text-sm text-muted mt-2 leading-relaxed">
                    <span className="text-gold font-display text-lg leading-none">&ldquo;</span>
                    {r.text}
                    <span className="text-gold font-display text-lg leading-none">&rdquo;</span>
                  </blockquote>
                  {r.disclosure && <p className="text-[11px] text-muted/70 mt-2 italic">{r.disclosure}</p>}
                </div>
              </figure>
            ))}
          </div>
          </>
        ) : (
          <div className="frame-gold rounded-2xl p-8 sm:p-10 text-center max-w-xl mx-auto">
            <p className="eyebrow">The Divine Women Club</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mt-3">
              <span className="text-gold">Join </span>
              <span className="text-rose">the Club</span>
            </h2>
            <p className="text-sm text-muted mt-4 leading-relaxed">
              If you&apos;d like to join the club of women who embody the Divine Woman, to transcend your
              life and grow into new opportunities around the world, send me an email.
            </p>
            <a href={`mailto:${store.supportEmail}?subject=${encodeURIComponent("Join the Divine Women Club")}`} className="btn-gold px-6 py-3.5 text-xs mt-6">
              Email me
            </a>
            <p className="text-sm text-cream mt-4 select-all">{store.supportEmail}</p>
          </div>
        )}
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
