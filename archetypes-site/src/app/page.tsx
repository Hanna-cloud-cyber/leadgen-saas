import Link from "next/link";
import BookCover from "@/components/BookCover";
import BuyButton from "@/components/BuyButton";
import { CheckIcon, pillarIcons } from "@/components/Icons";
import { Rule } from "@/components/SiteChrome";
import { faqs, included, pillars, store, usd } from "@/data";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
        <div className="text-center lg:text-left">
          <h1 className="font-display font-bold leading-[0.95]">
            <span className="block">
              <span className="text-gold text-4xl sm:text-6xl">THE </span>
              <span className="text-gold text-7xl sm:text-[120px]">30</span>
            </span>
            <span className="block text-rose text-[44px] sm:text-[88px] tracking-tight">ARCHETYPES</span>
            <span className="block text-gold">
              <span className="text-3xl sm:text-5xl">OF </span>
              <span className="text-6xl sm:text-[96px]">WOMEN</span>
            </span>
          </h1>
          <Rule className="mt-6 max-w-md mx-auto lg:mx-0" />
          <p className="text-[10px] sm:text-sm tracking-[0.22em] sm:tracking-[0.35em] mt-4 text-cream whitespace-nowrap">
            THE HIDDEN MAP OF FEMININE DYNAMICS
          </p>
          <p className="font-condensed text-[20px] sm:text-3xl tracking-[0.06em] sm:tracking-[0.08em] mt-8 uppercase">
            Discover your archetype
            <span className="block text-rose">and unlock your feminine power</span>
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
            <Link href="#buy" className="btn-gold px-8 py-4 text-sm">Get the guide · {usd(store.priceCents)}</Link>
            <Link href="/quiz" className="btn-ghost px-8 py-4 text-sm">Free quiz</Link>
          </div>
        </div>
        <BookCover src="/cover.webp" />
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
          <div className="font-display text-6xl font-bold text-gold mt-6">{usd(store.priceCents)}</div>
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
            <BuyButton label={`Get instant access · ${usd(store.priceCents)}`} className="w-full py-4 text-sm sm:text-base" />
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
          Get the guide · {usd(store.priceCents)}
        </Link>
      </div>
    </main>
  );
}
