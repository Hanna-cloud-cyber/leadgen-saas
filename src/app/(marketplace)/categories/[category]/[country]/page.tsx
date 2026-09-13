import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getAllCountries,
  getCategoryBySlug,
  getCountryBySlug,
  getSuppliersByCategoryAndCountry,
} from "@/lib/marketplace/data";
import { SupplierCard } from "@/components/marketplace/supplier-card";

export function generateStaticParams() {
  const params: { category: string; country: string }[] = [];
  for (const c of getAllCategories()) {
    for (const country of getAllCountries()) {
      if (getSuppliersByCategoryAndCountry(c.slug, country.slug).length > 0) {
        params.push({ category: c.slug, country: country.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; country: string }>;
}): Promise<Metadata> {
  const { category, country } = await params;
  const cat = getCategoryBySlug(category);
  const c = getCountryBySlug(country);
  if (!cat || !c) return {};
  return {
    title: `Best ${cat.name} Manufacturers in ${c.name}`,
    description: `Discover verified ${cat.name.toLowerCase()} manufacturers in ${c.name} offering private label, custom production and wholesale services.`,
  };
}

export default async function CategoryCountryPage({
  params,
}: {
  params: Promise<{ category: string; country: string }>;
}) {
  const { category, country } = await params;
  const cat = getCategoryBySlug(category);
  const c = getCountryBySlug(country);
  if (!cat || !c) notFound();

  const suppliers = getSuppliersByCategoryAndCountry(category, country);

  return (
    <div className="mp-container py-10">
      <nav className="text-[12.5px] text-mp-ink-3 mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href="/search" className="hover:text-mp-ink">Suppliers</Link>
        <span>/</span>
        <Link href={`/categories/${category}`} className="hover:text-mp-ink">{cat.name}</Link>
        <span>/</span>
        <span className="text-mp-ink">{c.name}</span>
      </nav>

      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-[40px] font-bold tracking-tight text-mp-ink leading-[1.1]">
          Best {cat.name} Manufacturers in {c.name}
        </h1>
        <p className="text-[15px] text-mp-ink-2 mt-4 leading-relaxed">
          Discover verified {c.name.toLowerCase()} {cat.name.toLowerCase()} manufacturers offering private label, custom
          production and wholesale services. Every supplier below has completed Veridian&apos;s identity and business
          verification process.
        </p>
      </div>

      {suppliers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
          {suppliers.map((s) => (
            <SupplierCard key={s.slug} supplier={s} />
          ))}
        </div>
      ) : (
        <div className="mp-card p-10 mt-10 text-center text-mp-ink-2 text-sm">
          No suppliers matched this exact combination yet.{" "}
          <Link href={`/categories/${category}`} className="text-mp-accent font-medium">
            Browse all {cat.name} suppliers →
          </Link>
        </div>
      )}

      <section className="mt-16 max-w-3xl">
        <h2 className="text-xl font-semibold text-mp-ink mb-4">
          Sourcing {cat.name} from {c.name}
        </h2>
        <p className="text-[14px] text-mp-ink-2 leading-relaxed">
          {c.name} is a well-established sourcing market for {cat.name.toLowerCase()}, with manufacturers ranging from small
          specialist workshops to large-scale export factories. Buyers typically compare MOQ, certifications and shipping
          capability before requesting samples.
        </p>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-xl font-semibold text-mp-ink mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: `Are ${cat.name.toLowerCase()} manufacturers in ${c.name} verified?`, a: "Yes — every supplier listed has passed Veridian's identity and business verification process before being published." },
            { q: "Can I request a quote from multiple suppliers at once?", a: "Yes, use the Request for Quote form to reach several relevant verified suppliers with one submission." },
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
    </div>
  );
}
