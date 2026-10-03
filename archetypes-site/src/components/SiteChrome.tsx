import Link from "next/link";
import { store, usd } from "@/data";

export function AnnouncementBar() {
  return (
    <div className="pill-rose text-center text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] py-2 px-3 uppercase">
      Launch price {usd(store.priceCents)} <span className="line-through opacity-60">{usd(store.compareAtCents)}</span>
      <span className="hidden sm:inline"> · Instant digital access · {store.refundDays}-day guarantee</span>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(11,8,6,0.85)] backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
        <Link href="/" className="font-display font-bold leading-none">
          <span className="text-gold text-lg">THE 30 </span>
          <span className="text-rose text-lg">ARCHETYPES</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-[11px] tracking-[0.25em] uppercase text-muted">
          <Link href="/#archetypes" className="hover:text-cream">The 30</Link>
          <Link href="/#inside" className="hover:text-cream">Inside</Link>
          <Link href="/quiz" className="hover:text-cream">Free Quiz</Link>
          <Link href="/#faq" className="hover:text-cream">FAQ</Link>
        </nav>
        <Link href="/#buy" className="btn-gold text-[11px] px-5 py-2.5">
          Get the guide
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--line)] mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-3 text-sm">
        <div>
          <div className="font-display font-bold">
            <span className="text-gold">THE 30 </span>
            <span className="text-rose">ARCHETYPES</span>
          </div>
          <p className="text-muted mt-3 leading-relaxed">
            {store.tagline}. A digital guide to understanding, embracing, and developing your feminine power.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-3">Explore</div>
          <ul className="space-y-2 text-muted">
            <li><Link href="/#archetypes" className="hover:text-cream">The 30 Archetypes</Link></li>
            <li><Link href="/quiz" className="hover:text-cream">Free Archetype Quiz</Link></li>
            <li><Link href="/#faq" className="hover:text-cream">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-cream">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-3">Legal</div>
          <ul className="space-y-2 text-muted">
            <li><Link href="/terms" className="hover:text-cream">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-cream">Privacy Policy</Link></li>
            <li><Link href="/refund-policy" className="hover:text-cream">Refund Policy</Link></li>
            <li><Link href="/disclaimer" className="hover:text-cream">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 md:pb-10 text-[11px] text-muted/70 leading-relaxed">
        <p>
          This guide is for educational and self-reflection purposes only and is not a substitute for
          professional psychological, medical, or relationship advice.
        </p>
        <p className="mt-2">© {year} {store.legalName}. All rights reserved. Prices in USD.</p>
      </div>
    </footer>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <div className={`rule text-[10px] ${className}`} aria-hidden>◆</div>;
}
