import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategoryBySlug,
  getSuppliersByCategory,
  getCountryBySlug,
  getAllCountries,
} from "@/lib/marketplace/data";
import { SupplierCard } from "@/components/marketplace/supplier-card";
import { CategoryCard } from "@/components/marketplace/category-card";
import { ArrowRightIcon } from "@/components/marketplace/icons";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `${cat.name} Manufacturers & Suppliers`,
    description: `Discover verified ${cat.name.toLowerCase()} manufacturers and suppliers. Compare MOQ, pricing, private label options and lead times on Veridian.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const suppliers = getSuppliersByCategory(category);
  const countrySlugsPresent = Array.from(new Set(suppliers.map((s) => s.countrySlug)));
  const relatedCountries = countrySlugsPresent.map((c) => getCountryBySlug(c)).filter(Boolean);
  const otherCategories = getAllCategories().filter((c) => c.slug !== category).slice(0, 4);
  const allCountries = getAllCountries();

  return (
    <div className="mp-container py-10">
      <nav className="text-[12.5px] text-mp-ink-3 mb-6">
        <Link href="/search" className="hover:text-mp-ink">Suppliers</Link>
        <span className="mx-1.5">/</span>
        <span className="text-mp-ink">{cat.name}</span>
      </nav>

      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-[40px] font-bold tracking-tight text-mp-ink">
          {cat.name} Manufacturers & Suppliers
        </h1>
        <p className="text-[15px] text-mp-ink-2 mt-4 leading-relaxed">
          Browse {cat.supplierCount.toLocaleString("en-US")}+ verified {cat.name.toLowerCase()} suppliers worldwide, including
          manufacturers offering private label, custom packaging and low-MOQ production. Compare pricing, certifications and
          lead times before you request a quote.
        </p>
      </div>

      {relatedCountries.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {relatedCountries.map((c) => (
            <Link
              key={c!.slug}
              href={`/categories/${category}/${c!.slug}`}
              className="text-[12.5px] font-medium px-3.5 py-1.5 rounded-full border border-mp-line hover:border-mp-line-2 text-mp-ink-2 hover:text-mp-ink transition-colors"
            >
              {c!.flag} {cat.name} in {c!.name}
            </Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
        {suppliers.map((s) => (
          <SupplierCard key={s.slug} supplier={s} />
        ))}
      </div>

      {/* Buying guide */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-xl font-semibold text-mp-ink mb-4">Buying Guide: Sourcing {cat.name}</h2>
        <div className="prose-sm text-[14px] text-mp-ink-2 leading-relaxed space-y-3">
          <p>
            When sourcing {cat.name.toLowerCase()} from international suppliers, buyers typically evaluate minimum order
            quantity (MOQ), production lead times, private label availability and relevant certifications before committing
            to a factory. Requesting samples and comparing at least three verified suppliers is standard practice before
            placing a first order.
          </p>
          <p>
            Veridian verifies every supplier&apos;s business registration and factory identity, so you can focus on comparing
            capabilities rather than vetting legitimacy from scratch.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-14 max-w-3xl">
        <h2 className="text-xl font-semibold text-mp-ink mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: `What is a typical MOQ for ${cat.name.toLowerCase()}?`, a: "MOQs vary widely by supplier, from single-unit print-on-demand production to several thousand units for bulk manufacturing. Use the MOQ filter on the search page to narrow results." },
            { q: "Can I request private label or custom branding?", a: "Many suppliers in this category offer private label and custom packaging — look for the corresponding badges on each supplier card." },
            { q: "How are suppliers verified?", a: "Every supplier completes identity verification, business registration checks and, for manufacturers, factory validation. Learn more on our verification page." },
          ].map((f) => (
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

      {/* Related categories */}
      <section className="mt-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-mp-ink">Related Categories</h2>
          <Link href="/search" className="text-[13px] font-semibold text-mp-accent inline-flex items-center gap-1">
            View all <ArrowRightIcon width={13} height={13} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {otherCategories.map((c, i) => (
            <CategoryCard key={c.slug} category={c} index={i} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-mp-ink mb-5">Browse by Country</h2>
        <div className="flex flex-wrap gap-2">
          {allCountries.map((c) => (
            <Link key={c.slug} href={`/countries/${c.slug}`} className="text-[12.5px] font-medium px-3.5 py-1.5 rounded-full border border-mp-line hover:border-mp-line-2 text-mp-ink-2 hover:text-mp-ink transition-colors">
              {c.flag} {c.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
