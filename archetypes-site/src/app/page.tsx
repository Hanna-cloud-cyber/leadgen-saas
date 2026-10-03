import Link from "next/link";
import BookCover from "@/components/BookCover";
import BuyButton from "@/components/BuyButton";
import { BoltIcon, CheckIcon, LockIcon, ShieldIcon, pillarIcons } from "@/components/Icons";
import { Rule } from "@/components/SiteChrome";
import {
  archetypeCount,
  families,
  faqs,
  included,
  insideEachProfile,
  method,
  pillars,
  store,
  usd,
} from "@/data";

const buyLabel = `Get instant access · ${usd(store.priceCents)}`;

export default function Home() {
  const savePct = Math.round((1 - store.priceCents / store.compareAtCents) * 100);

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
          <p className="text-[10px] sm:text-sm tracking-[0.22em] sm:tracking-[0.35em] mt-4 whitespace-nowrap text-cream">
            THE HIDDEN MAP OF FEMININE DYNAMICS
          </p>
          <p className="font-condensed text-[20px] sm:text-3xl tracking-[0.06em] sm:tracking-[0.08em] mt-8 uppercase">
            Discover your archetype
            <span className="block text-rose">and unlock your feminine power</span>
          </p>
          <p className="text-muted mt-5 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Why are you drawn to the same kind of partner? Why do some women command a room
            effortlessly? The answer is written in your archetype — and this guide teaches you to read it.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
            <Link href="#buy" className="btn-gold px-8 py-4 text-sm">Get the guide</Link>
            <Link href="/quiz" className="btn-ghost px-8 py-4 text-sm">Take the free quiz</Link>
          </div>
          <p className="text-xs text-muted mt-4">
            Instant PDF download · {store.refundDays}-day money-back guarantee
          </p>
        </div>
        <BookCover />
      </section>

      {/* Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x divide-[var(--line)] gap-y-10">
          {pillars.map((p) => {
            const Icon = pillarIcons[p.icon];
            return (
              <div key={p.title} className="text-center px-4">
                <Icon className="mx-auto" size={52} />
                <h3 className="text-sm tracking-[0.2em] uppercase mt-3 text-cream">{p.title}</h3>
                <p className="text-xs text-muted mt-2 leading-relaxed max-w-[220px] mx-auto">{p.text}</p>
              </div>
            );
          })}
        </div>
        <div className="pill-rose rounded-xl mt-14 py-4 px-4 text-center font-semibold text-[11px] sm:text-sm tracking-[0.3em] sm:tracking-[0.4em]">
          UNDERSTAND · EMBRACE · DEVELOP · BECOME
        </div>
      </section>

      {/* Problem / promise */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <p className="eyebrow">Why this guide</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mt-4 leading-tight">
          <span className="text-gold">Every woman carries a hidden map.</span>
          <br />
          <span className="text-rose">Few ever learn to read it.</span>
        </h2>
        <p className="text-muted mt-6 leading-relaxed">
          You repeat the same patterns in love. You feel powerful in some rooms and invisible in others.
          You know there&apos;s a version of you that&apos;s more magnetic, more confident, more <em>you</em> —
          but no one ever handed you the map.
        </p>
        <p className="text-muted mt-4 leading-relaxed">
          Inspired by archetypal psychology, <span className="text-cream">{store.productName}</span> decodes the
          {" "}{archetypeCount} feminine energies that shape how women love, lead, attract, and heal — so you can
          finally understand yourself and choose who you become.
        </p>
      </section>

      {/* The 30 archetypes */}
      <section id="archetypes" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 scroll-mt-24">
        <div className="text-center">
          <p className="eyebrow">The map</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold mt-3">
            <span className="text-gold">5 Families · </span>
            <span className="text-rose">{archetypeCount} Archetypes</span>
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Every woman carries all of them — but one or two lead. Which ones lead you?
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {families.map((f) => (
            <div key={f.id} className="card p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <div>
                  <h3 className="font-display text-2xl font-bold text-gold">{f.name}</h3>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-rose mt-1">{f.essence}</p>
                </div>
                <p className="text-sm text-muted sm:max-w-md sm:text-right">{f.description}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
                {f.archetypes.map((a) => (
                  <div key={a.name} className="rounded-lg border border-[var(--line)] bg-black/20 p-4">
                    <div className="font-display font-semibold text-cream">{a.name}</div>
                    <p className="text-xs text-muted mt-1.5">
                      <span className="text-gold">Gift:</span> {a.gift}
                    </p>
                    <p className="text-xs text-muted mt-1">
                      <span className="text-rose">Shadow:</span> {a.shadow}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz teaser */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="frame-gold rounded-2xl p-8 sm:p-12 text-center">
          <p className="eyebrow">Free · 2 minutes</p>
          <h2 className="font-display text-2xl sm:text-4xl font-bold mt-3">
            <span className="text-gold">Which archetype </span>
            <span className="text-rose">leads you?</span>
          </h2>
          <p className="text-muted mt-4 max-w-lg mx-auto">
            Answer 8 quick questions and discover your archetype family. No email required.
          </p>
          <Link href="/quiz" className="btn-gold px-10 py-4 text-sm mt-8">Start the quiz</Link>
        </div>
      </section>

      {/* Inside */}
      <section id="inside" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-2 gap-12 items-center scroll-mt-24">
        <div>
          <p className="eyebrow">Inside the guide</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 leading-tight">
            <span className="text-gold">A complete profile </span>
            <span className="text-rose">for every archetype</span>
          </h2>
          <p className="text-muted mt-4">
            {store.pages}+ pages, written to be read in one evening and returned to for years. For each of the{" "}
            {archetypeCount} archetypes, you&apos;ll discover:
          </p>
          <ul className="mt-6 space-y-3">
            {insideEachProfile.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px]">
                <CheckIcon className="mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {method.map((m, i) => (
            <div key={m.step} className="card p-5">
              <div className="font-display text-gold text-3xl font-bold">0{i + 1}</div>
              <div className="font-condensed uppercase tracking-[0.2em] text-rose mt-2">{m.step}</div>
              <p className="text-xs text-muted mt-2 leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Buy */}
      <section id="buy" className="max-w-3xl mx-auto px-4 sm:px-6 py-24 scroll-mt-20">
        <div className="text-center mb-10">
          <p className="eyebrow">Your map awaits</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold mt-3">
            <span className="text-gold">Become </span>
            <span className="text-rose">who you are</span>
          </h2>
        </div>
        <div className="frame-gold rounded-2xl p-6 sm:p-10">
          <div className="grid sm:grid-cols-[auto_1fr] gap-8 items-center">
            <div className="hidden sm:block scale-[0.6] -m-16">
              <BookCover />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-cream">{store.productName}</h3>
              <p className="text-xs tracking-[0.25em] uppercase text-muted mt-1">Digital guide · PDF</p>
              <div className="flex items-baseline gap-3 mt-4">
                <span className="font-display text-5xl font-bold text-gold">{usd(store.priceCents)}</span>
                <span className="text-xl text-muted line-through">{usd(store.compareAtCents)}</span>
                <span className="pill-rose text-[11px] font-bold px-2 py-1 rounded">SAVE {savePct}%</span>
              </div>
              <p className="text-xs text-muted mt-1">One-time payment. No subscription.</p>
            </div>
          </div>

          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mt-8">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <CheckIcon className="mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <BuyButton label={buyLabel} className="w-full py-4 text-sm sm:text-base" />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-6 text-center text-[11px] text-muted">
            <div className="flex flex-col items-center gap-1.5"><BoltIcon />Instant download</div>
            <div className="flex flex-col items-center gap-1.5"><ShieldIcon />{store.refundDays}-day guarantee</div>
            <div className="flex flex-col items-center gap-1.5"><LockIcon />Secure checkout</div>
          </div>
        </div>

        <div className="card p-6 mt-6 flex gap-4 items-start">
          <ShieldIcon size={40} className="shrink-0" />
          <div>
            <h3 className="font-display font-bold text-gold">The {store.refundDays}-Day &ldquo;Love It or It&apos;s Free&rdquo; Guarantee</h3>
            <p className="text-sm text-muted mt-1.5 leading-relaxed">
              Read the whole guide. Take the test. If it doesn&apos;t change the way you see yourself, email us within{" "}
              {store.refundDays} days and we&apos;ll refund every cent. No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-10 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold text-center">
          <span className="text-gold">Questions, </span>
          <span className="text-rose">answered</span>
        </h2>
        <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
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

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
        <Rule className="max-w-xs mx-auto" />
        <h2 className="font-display text-3xl sm:text-5xl font-bold mt-8 leading-tight">
          <span className="text-gold">Understand her. Embrace her.</span>
          <br />
          <span className="text-rose">Become her.</span>
        </h2>
        <div className="max-w-sm mx-auto mt-10">
          <BuyButton label={buyLabel} className="w-full py-4 text-sm" />
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
