import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllCategories,
  getFeaturedSuppliers,
  getAllProducts,
  getAllCountries,
} from "@/lib/marketplace/data";
import { HeroSearch } from "@/components/marketplace/hero-search";
import { CategoryCard } from "@/components/marketplace/category-card";
import { SupplierCard } from "@/components/marketplace/supplier-card";
import { ProductCard } from "@/components/marketplace/product-card";
import { StatCounter } from "@/components/marketplace/stat-counter";
import { SupplierMark } from "@/components/marketplace/supplier-mark";
import { Badge } from "@/components/marketplace/badge";
import {
  ShieldCheckIcon,
  GlobeIcon,
  MessageIcon,
  BoxIcon,
  StarIcon,
  LayersIcon,
  SearchIcon,
  BoltIcon,
  ArrowRightIcon,
  CoinsIcon,
} from "@/components/marketplace/icons";

export const metadata: Metadata = {
  title: "The Global B2B Sourcing Marketplace",
  description:
    "Discover trusted manufacturers, wholesalers and distributors across the US, Europe and Asia. Compare suppliers, request quotes and build better products faster.",
};

const HOW_IT_WORKS = [
  { step: "01", title: "Search", desc: "Browse thousands of verified suppliers by product, category or country.", icon: SearchIcon },
  { step: "02", title: "Compare", desc: "Compare pricing, MOQ, capabilities, reviews and production times.", icon: LayersIcon },
  { step: "03", title: "Connect", desc: "Contact suppliers directly or request multiple quotes at once.", icon: MessageIcon },
  { step: "04", title: "Launch", desc: "Choose your supplier and start producing your next product.", icon: BoltIcon },
];

const WHY_US = [
  { icon: ShieldCheckIcon, title: "Verified suppliers", desc: "Every supplier goes through a rigorous identity and business verification process." },
  { icon: LayersIcon, title: "Transparent sourcing", desc: "Compare MOQ, pricing, production capabilities and lead times side by side." },
  { icon: MessageIcon, title: "Direct communication", desc: "Message manufacturers and wholesalers directly — no middlemen, no markups." },
  { icon: GlobeIcon, title: "Global network", desc: "Access verified suppliers across North America, Europe, Asia and the Middle East." },
  { icon: BoxIcon, title: "Private label ready", desc: "Filter for suppliers offering custom packaging, branding and manufacturing." },
  { icon: StarIcon, title: "Supplier reviews", desc: "Read verified feedback from other buyers before you make a decision." },
];

export default function HomePage() {
  const categories = getAllCategories().slice(0, 8);
  const featured = getFeaturedSuppliers();
  const products = getAllProducts().slice(0, 8);
  const countries = getAllCountries();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative mp-hero-mesh pt-16 pb-28 overflow-hidden">
        <div className="absolute inset-0 mp-grid-bg pointer-events-none" />
        <div className="mp-container relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mp-fade-up inline-flex items-center gap-2 bg-white border border-mp-line-2 rounded-full px-4 py-1.5 text-[12.5px] font-medium text-mp-ink-2 mp-shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              10,000+ verified suppliers worldwide
            </div>

            <h1 className="mp-fade-up text-[40px] leading-[1.08] sm:text-6xl md:text-[68px] font-bold tracking-tight text-mp-ink mt-6" style={{ animationDelay: "60ms" }}>
              Find the right supplier.
              <br />
              <span className="mp-gradient-text">Build the next great brand.</span>
            </h1>

            <p className="mp-fade-up text-[16px] md:text-lg text-mp-ink-2 mt-6 max-w-xl mx-auto leading-relaxed" style={{ animationDelay: "110ms" }}>
              Discover trusted manufacturers, wholesalers and distributors across the US, Europe and Asia. Compare suppliers, request quotes and build better products faster.
            </p>

            <div className="mt-9">
              <HeroSearch />
            </div>

            <div className="mp-fade-up flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 text-[13px] text-mp-ink-2" style={{ animationDelay: "220ms" }}>
              {[
                { icon: ShieldCheckIcon, label: "Verified suppliers" },
                { icon: GlobeIcon, label: "Global sourcing" },
                { icon: MessageIcon, label: "Direct contact" },
                { icon: BoltIcon, label: "Secure platform" },
              ].map((it) => (
                <span key={it.label} className="inline-flex items-center gap-1.5">
                  <it.icon width={15} height={15} className="text-mp-accent" />
                  {it.label}
                </span>
              ))}
            </div>
          </div>

          {/* Floating supplier card composition */}
          <div className="hidden lg:block">
            <div className="absolute top-8 -left-4 w-72 mp-float" style={{ animationDelay: "0.4s" }}>
              <MiniSupplierCard
                name="Lumina Cosmetics Labs"
                country="South Korea 🇰🇷"
                initials="LC"
                gradient={["#2563EB", "#635BFF"]}
                moq="500 units"
                rating="4.9"
              />
            </div>
            <div className="absolute bottom-2 -right-2 w-72 mp-float" style={{ animationDelay: "1.4s" }}>
              <MiniSupplierCard
                name="Solstice Activewear Mfg"
                country="China 🇨🇳"
                initials="SA"
                gradient={["#0EA5E9", "#2563EB"]}
                moq="400 units"
                rating="4.9"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────── */}
      <section className="border-y border-mp-line bg-white">
        <div className="mp-container py-14">
          <p className="text-center text-[13px] text-mp-ink-3 mb-10">
            Trusted by founders, brands and e-commerce businesses worldwide
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <StatCounter value={10000} suffix="+" label="Verified Suppliers" />
            <StatCounter value={120} suffix="+" label="Countries" />
            <StatCounter value={50000} suffix="+" label="Products" />
            <StatCounter value={2500} suffix="+" label="Buyer Requests / month" />
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────── */}
      <section id="categories" className="mp-container py-24">
        <SectionHeading eyebrow="Categories" title="Explore suppliers by category" subtitle="From fashion to electronics — find verified manufacturers in every product category." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {categories.map((c, i) => (
            <CategoryCard key={c.slug} category={c} index={i} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/search" className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-mp-accent hover:gap-2.5 transition-all">
            View all categories <ArrowRightIcon width={14} height={14} />
          </Link>
        </div>
      </section>

      {/* ── Featured suppliers ───────────────────────────── */}
      <section className="bg-white border-y border-mp-line">
        <div className="mp-container py-24">
          <SectionHeading eyebrow="Marketplace" title="Featured verified suppliers" subtitle="Discover manufacturers and wholesalers trusted by businesses around the world." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {featured.map((s) => (
              <SupplierCard key={s.slug} supplier={s} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/search" className="mp-btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[13.5px] font-semibold">
              Browse All Suppliers <ArrowRightIcon width={14} height={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trending products ────────────────────────────── */}
      <section className="mp-container py-24">
        <SectionHeading eyebrow="Sourcing" title="Trending products" subtitle="High-demand products with verified suppliers ready to produce." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="bg-mp-navy text-white">
        <div className="mp-container py-24">
          <div className="text-center max-w-xl mx-auto">
            <p className="text-[12.5px] font-semibold text-blue-400 uppercase tracking-wider">How it works</p>
            <h2 className="text-3xl md:text-[44px] font-bold tracking-tight mt-3">Source smarter. Launch faster.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-14">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="border border-white/10 rounded-2xl p-6 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-white/30">{item.step}</span>
                  <item.icon width={20} height={20} className="text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg mt-5">{item.title}</h3>
                <p className="text-[13.5px] text-white/50 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us ───────────────────────────────────────── */}
      <section className="mp-container py-24">
        <SectionHeading eyebrow="Why Veridian" title="Why businesses choose Veridian" subtitle="Built for serious sourcing — not another supplier directory." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {WHY_US.map((item) => (
            <div key={item.title} className="mp-card p-6">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-mp-accent">
                <item.icon width={20} height={20} />
              </div>
              <h3 className="font-semibold text-[15.5px] text-mp-ink mt-4">{item.title}</h3>
              <p className="text-[13.5px] text-mp-ink-2 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RFQ teaser ───────────────────────────────────── */}
      <section className="bg-white border-y border-mp-line">
        <div className="mp-container py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[12.5px] font-semibold text-mp-accent uppercase tracking-wider">Request for Quote</p>
            <h2 className="text-3xl md:text-[44px] font-bold tracking-tight text-mp-ink mt-3 leading-[1.1]">
              Tell us what you need.
              <br />
              Let suppliers compete for your business.
            </h2>
            <p className="text-[15px] text-mp-ink-2 mt-5 leading-relaxed max-w-md">
              Submit one request and receive quotes from relevant verified suppliers — no need to contact each one individually.
            </p>
            <Link href="/rfq" className="mp-btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-[13.5px] font-semibold mt-7">
              Submit Request <ArrowRightIcon width={14} height={14} />
            </Link>
          </div>

          <div className="mp-card mp-shadow-lg p-6 max-w-sm ml-auto w-full">
            <div className="flex items-center justify-between">
              <span className="mp-badge">New buyer request</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5">
                High Intent Buyer
              </span>
            </div>
            <div className="mt-5 space-y-4 text-[13.5px]">
              <Row label="Product" value="Private Label Skincare" />
              <Row label="Quantity" value="5,000 units" />
              <Row label="Market" value="United States 🇺🇸" />
              <Row label="Budget" value="$15,000 – $25,000" />
            </div>
            <button className="w-full mt-6 mp-btn-primary rounded-lg py-3 text-[13.5px] font-semibold inline-flex items-center justify-center gap-2">
              <CoinsIcon width={15} height={15} /> Unlock Lead — 3 credits
            </button>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────── */}
      <section className="mp-hero-mesh py-28">
        <div className="mp-container text-center">
          <h2 className="text-4xl md:text-[52px] font-bold tracking-tight text-mp-ink leading-[1.1]">
            Stop searching.
            <br />
            <span className="mp-gradient-text">Start sourcing.</span>
          </h2>
          <p className="text-[15px] md:text-base text-mp-ink-2 mt-5 max-w-md mx-auto">
            Find verified suppliers for your next product today.
          </p>
          <div className="flex items-center justify-center gap-3 mt-9 flex-wrap">
            <Link href="/search" className="mp-btn-primary rounded-lg px-7 py-3.5 text-[14px] font-semibold">
              Find Suppliers
            </Link>
            <Link href="/for-suppliers" className="border border-mp-line-2 bg-white rounded-lg px-7 py-3.5 text-[14px] font-semibold text-mp-ink hover:border-mp-ink/30 transition-colors">
              Join as Supplier
            </Link>
          </div>
        </div>
      </section>

      {/* Anchor for footer country links */}
      <span id="countries" className="sr-only">
        {countries.length} countries supported
      </span>
    </>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="text-center max-w-xl mx-auto">
      <p className="text-[12.5px] font-semibold text-mp-accent uppercase tracking-wider">{eyebrow}</p>
      <h2 className="text-3xl md:text-[42px] font-bold tracking-tight text-mp-ink mt-3">{title}</h2>
      <p className="text-[15px] text-mp-ink-2 mt-4 leading-relaxed">{subtitle}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-mp-ink-3">{label}</span>
      <span className="font-medium text-mp-ink">{value}</span>
    </div>
  );
}

function MiniSupplierCard({
  name,
  country,
  initials,
  gradient,
  moq,
  rating,
}: {
  name: string;
  country: string;
  initials: string;
  gradient: [string, string];
  moq: string;
  rating: string;
}) {
  return (
    <div className="mp-card mp-shadow-lg p-4 bg-white/95 backdrop-blur">
      <div className="flex items-center gap-3">
        <SupplierMark initials={initials} gradient={gradient} size={40} />
        <div>
          <p className="font-semibold text-[13px] text-mp-ink leading-tight">{name}</p>
          <p className="text-[12px] text-mp-ink-3">{country}</p>
        </div>
      </div>
      <div className="mt-3">
        <Badge label="Verified Supplier" size="xs" />
      </div>
      <div className="flex items-center justify-between mt-3 text-[12px] text-mp-ink-2">
        <span>MOQ: {moq}</span>
        <span className="inline-flex items-center gap-1 font-medium text-mp-ink">
          <StarIcon width={11} height={11} className="text-amber-500" /> {rating}
        </span>
      </div>
    </div>
  );
}
