import Link from "next/link";
import { Logo } from "./logo";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Marketplace",
    links: [
      { label: "Find Suppliers", href: "/search" },
      { label: "Categories", href: "/#categories" },
      { label: "Products", href: "/products" },
      { label: "Countries", href: "/#countries" },
    ],
  },
  {
    title: "For Buyers",
    links: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Buyer Protection", href: "/verification" },
      { label: "Request a Quote", href: "/rfq" },
    ],
  },
  {
    title: "For Suppliers",
    links: [
      { label: "Join Marketplace", href: "/for-suppliers" },
      { label: "Supplier Plans", href: "/pricing#suppliers" },
      { label: "Sell Leads", href: "/pricing#credits" },
      { label: "Supplier Dashboard", href: "/supplier" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Sourcing Guides", href: "/resources" },
      { label: "Market Insights", href: "/resources" },
      { label: "Product Trends", href: "/products" },
      { label: "AI Supplier Match", href: "/ai-match" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-mp-navy text-white">
      <div className="mp-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Logo dark />
            <p className="text-sm text-white/50 mt-4 max-w-xs leading-relaxed">
              The global B2B sourcing platform connecting founders and brands with verified manufacturers, wholesalers and distributors worldwide.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-semibold text-white/90 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[13.5px] text-white/50 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mp-container py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-white/40">
          <p>© 2026 Veridian, Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="/verification" className="hover:text-white/70 transition-colors">Trust & Safety</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
