import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllSuppliers,
  getSupplierBySlug,
  getCountryBySlug,
  getCategoryBySlug,
  formatLeadTime,
  formatMOQ,
} from "@/lib/marketplace/data";
import { SupplierMark } from "@/components/marketplace/supplier-mark";
import { Badge } from "@/components/marketplace/badge";
import { SupplierCard } from "@/components/marketplace/supplier-card";
import {
  StarIcon,
  ShieldCheckIcon,
  MessageIcon,
  ClockIcon,
  BoxIcon,
  UsersIcon,
  GlobeIcon,
  CheckIcon,
} from "@/components/marketplace/icons";

export function generateStaticParams() {
  return getAllSuppliers().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supplier = getSupplierBySlug(slug);
  if (!supplier) return {};
  const country = getCountryBySlug(supplier.countrySlug);
  return {
    title: `${supplier.name} — Verified Supplier in ${country?.name}`,
    description: `${supplier.tagline}. ${formatMOQ(supplier.moqUnits)} MOQ, ${formatLeadTime(supplier)} lead time. Request a quote from ${supplier.name} on Veridian.`,
  };
}

const GALLERY_LABELS = ["Factory floor", "Production line", "Product samples", "Packaging & branding"];

const FAQS = [
  { q: "What is the minimum order quantity?", a: "MOQ varies by product line; most orders start as shown in the Capabilities section above and can flex for repeat buyers." },
  { q: "Can I get product samples before ordering?", a: "Yes, sample requests can be made directly through the messaging system after your first contact." },
  { q: "Do you offer private label and custom branding?", a: "This is shown in the Capabilities section — most suppliers on Veridian support at least one form of custom branding." },
  { q: "What payment terms are accepted?", a: "Payment terms are negotiated directly with the supplier; common terms include 30% deposit / 70% before shipment." },
];

export default async function SupplierProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supplier = getSupplierBySlug(slug);
  if (!supplier) notFound();

  const country = getCountryBySlug(supplier.countrySlug);
  const related = getAllSuppliers()
    .filter((s) => s.slug !== supplier.slug && s.categorySlugs.some((c) => supplier.categorySlugs.includes(c)))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: supplier.name,
    description: supplier.about,
    address: { "@type": "PostalAddress", addressCountry: country?.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: supplier.rating,
      reviewCount: supplier.reviews,
    },
  };

  return (
    <div className="mp-container py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="text-[12.5px] text-mp-ink-3 mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href="/search" className="hover:text-mp-ink">Suppliers</Link>
        <span>/</span>
        <Link href={`/countries/${supplier.countrySlug}`} className="hover:text-mp-ink">{country?.name}</Link>
        <span>/</span>
        <span className="text-mp-ink">{supplier.name}</span>
      </nav>

      {/* Header */}
      <div className="mp-card p-7 mb-10">
        <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div className="flex items-start gap-5">
            <SupplierMark initials={supplier.initials} gradient={supplier.gradient} size={72} />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-bold text-mp-ink tracking-tight">{supplier.name}</h1>
                <Badge label="Verified Supplier" />
              </div>
              <p className="text-[14px] text-mp-ink-2 mt-1.5">{supplier.tagline}</p>
              <div className="flex items-center gap-4 mt-3 text-[13px] text-mp-ink-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5">{country?.flag} {country?.name}</span>
                <span className="inline-flex items-center gap-1 font-medium text-mp-ink">
                  <StarIcon width={13} height={13} className="text-amber-500" /> {supplier.rating.toFixed(1)}
                </span>
                <span>({supplier.reviews} reviews)</span>
                <span className="text-mp-ink-3">{supplier.type}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link href={`/rfq?supplier=${supplier.slug}`} className="mp-btn-primary rounded-lg px-5 py-2.5 text-[13.5px] font-semibold">
              Request Quote
            </Link>
            <Link href={`/account/messages?supplier=${supplier.slug}`} className="border border-mp-line-2 rounded-lg px-5 py-2.5 text-[13.5px] font-semibold text-mp-ink inline-flex items-center gap-1.5 hover:border-mp-ink/30 transition-colors">
              <MessageIcon width={14} height={14} /> Contact
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-mp-line">
          {supplier.badges.map((b) => (
            <Badge key={b} label={b} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        {/* Main */}
        <div className="space-y-14">
          <section id="about">
            <h2 className="text-lg font-semibold text-mp-ink mb-3">Company Overview</h2>
            <p className="text-[14.5px] text-mp-ink-2 leading-relaxed">{supplier.about}</p>
          </section>

          <section id="capabilities">
            <h2 className="text-lg font-semibold text-mp-ink mb-4">Capabilities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Spec label="Minimum Order Quantity" value={formatMOQ(supplier.moqUnits)} />
              <Spec label="Lead Time" value={formatLeadTime(supplier)} />
              <Spec label="Years in Business" value={`${supplier.yearsInBusiness} years`} />
              <Spec label="Team Size" value={supplier.teamSize} />
              <Spec label="Factory Location" value={supplier.factoryLocation} />
              <Spec label="Private Label" value={supplier.privateLabel ? "Available" : "Not offered"} />
              <Spec label="Custom Packaging" value={supplier.customPackaging ? "Available" : "Not offered"} />
              <Spec label="Shipping Destinations" value={supplier.shippingRegions.join(", ")} />
              <Spec label="Supplier Type" value={supplier.type} />
            </div>
          </section>

          <section id="products">
            <h2 className="text-lg font-semibold text-mp-ink mb-4">Product Categories</h2>
            <div className="flex flex-wrap gap-2.5">
              {supplier.categorySlugs.map((c) => {
                const cat = getCategoryBySlug(c);
                return (
                  <Link key={c} href={`/categories/${c}`} className="px-4 py-2 rounded-lg border border-mp-line bg-mp-paper text-[13px] font-medium text-mp-ink hover:border-mp-line-2 transition-colors">
                    {cat?.name}
                  </Link>
                );
              })}
            </div>
          </section>

          <section id="certifications">
            <h2 className="text-lg font-semibold text-mp-ink mb-4">Certifications</h2>
            <div className="flex flex-wrap gap-2.5">
              {supplier.certifications.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-mp-line text-[13px] text-mp-ink-2">
                  <CheckIcon width={13} height={13} className="text-emerald-600" /> {c}
                </span>
              ))}
            </div>
          </section>

          <section id="gallery">
            <h2 className="text-lg font-semibold text-mp-ink mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {GALLERY_LABELS.map((label) => (
                <div
                  key={label}
                  className="aspect-square rounded-xl flex items-end p-3"
                  style={{ background: `linear-gradient(135deg, ${supplier.gradient[0]}22, ${supplier.gradient[1]}33)` }}
                >
                  <span className="text-[11px] font-medium text-mp-ink-2 bg-white/80 rounded-md px-2 py-1">{label}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="reviews">
            <h2 className="text-lg font-semibold text-mp-ink mb-4">Buyer Reviews</h2>
            <div className="space-y-4">
              {[
                { name: "M. Chen", role: "E-commerce Brand Owner", text: "Communication was fast and samples matched exactly what we discussed. Production quality has been consistent across three reorders." },
                { name: "A. Dupont", role: "Retail Buyer", text: "Great partner for private label — they guided us through packaging options we hadn't considered and kept lead times as promised." },
              ].map((r) => (
                <div key={r.name} className="mp-card p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[13.5px] text-mp-ink">{r.name}</p>
                      <p className="text-[12px] text-mp-ink-3">{r.role}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} width={13} height={13} className="text-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[13.5px] text-mp-ink-2 mt-3 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="faq">
            <h2 className="text-lg font-semibold text-mp-ink mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQS.map((f) => (
                <details key={f.q} className="mp-card p-5 group">
                  <summary className="font-medium text-[13.5px] text-mp-ink cursor-pointer list-none flex items-center justify-between">
                    {f.q}
                    <span className="text-mp-ink-3 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-[13px] text-mp-ink-2 mt-2.5 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-24 self-start">
          <div className="mp-card p-5">
            <h3 className="text-[13px] font-semibold text-mp-ink-2 uppercase tracking-wide mb-4">Performance</h3>
            <div className="space-y-4">
              <StatRow icon={MessageIcon} label="Response Rate" value={`${supplier.responseRate}%`} />
              <StatRow icon={ClockIcon} label="Typical Response Time" value={supplier.responseTimeLabel} />
              <StatRow icon={BoxIcon} label="Orders Completed" value={`${supplier.ordersCompleted.toLocaleString("en-US")}+`} />
              <StatRow icon={UsersIcon} label="Team Size" value={supplier.teamSize} />
              <StatRow icon={GlobeIcon} label="Ships To" value={supplier.shippingRegions.join(", ")} />
            </div>
          </div>

          <div className="mp-card p-5 text-center" style={{ background: `linear-gradient(135deg, ${supplier.gradient[0]}0d, ${supplier.gradient[1]}14)` }}>
            <ShieldCheckIcon width={26} height={26} className="text-mp-accent mx-auto" />
            <p className="text-[13.5px] font-semibold text-mp-ink mt-2.5">Identity & Business Verified</p>
            <p className="text-[12.5px] text-mp-ink-2 mt-1.5 leading-relaxed">
              This supplier has passed Veridian&apos;s document and factory verification process.
            </p>
            <Link href="/verification" className="text-[12.5px] font-semibold text-mp-accent mt-2 inline-block">
              How verification works →
            </Link>
          </div>

          <Link href={`/rfq?supplier=${supplier.slug}`} className="mp-btn-primary block text-center rounded-xl py-3.5 text-[14px] font-semibold">
            Request Quote
          </Link>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-lg font-semibold text-mp-ink mb-5">Similar Suppliers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((s) => (
              <SupplierCard key={s.slug} supplier={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-mp-line rounded-lg p-3.5">
      <p className="text-[11.5px] text-mp-ink-3">{label}</p>
      <p className="text-[13.5px] font-medium text-mp-ink mt-1">{value}</p>
    </div>
  );
}

function StatRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ width?: number; height?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center gap-2 text-[13px] text-mp-ink-2">
        <Icon width={14} height={14} className="text-mp-ink-3" /> {label}
      </span>
      <span className="text-[13px] font-semibold text-mp-ink">{value}</span>
    </div>
  );
}
