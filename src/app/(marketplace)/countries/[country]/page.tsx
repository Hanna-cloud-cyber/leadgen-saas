import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCountries,
  getCountryBySlug,
  getSuppliersByCountry,
  getAllCategories,
} from "@/lib/marketplace/data";
import { SupplierCard } from "@/components/marketplace/supplier-card";

export function generateStaticParams() {
  return getAllCountries().map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const c = getCountryBySlug(country);
  if (!c) return {};
  return {
    title: `Suppliers in ${c.name}`,
    description: `Discover ${c.supplierCount.toLocaleString("en-US")}+ verified manufacturers, wholesalers and distributors in ${c.name}.`,
  };
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const c = getCountryBySlug(country);
  if (!c) notFound();

  const suppliers = getSuppliersByCountry(country);
  const categorySlugsPresent = Array.from(new Set(suppliers.flatMap((s) => s.categorySlugs)));
  const categories = getAllCategories().filter((cat) => categorySlugsPresent.includes(cat.slug));
  const otherCountries = getAllCountries().filter((x) => x.slug !== country).slice(0, 8);

  return (
    <div className="mp-container py-10">
      <nav className="text-[12.5px] text-mp-ink-3 mb-6">
        <Link href="/search" className="hover:text-mp-ink">Suppliers</Link>
        <span className="mx-1.5">/</span>
        <span className="text-mp-ink">{c.name}</span>
      </nav>

      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-[40px] font-bold tracking-tight text-mp-ink flex items-center gap-3">
          <span>{c.flag}</span> Suppliers in {c.name}
        </h1>
        <p className="text-[15px] text-mp-ink-2 mt-4 leading-relaxed">
          Explore {c.supplierCount.toLocaleString("en-US")}+ verified manufacturers, wholesalers and distributors based in{" "}
          {c.name}. Filter by category to find the right production partner for your product.
        </p>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}/${country}`}
              className="text-[12.5px] font-medium px-3.5 py-1.5 rounded-full border border-mp-line hover:border-mp-line-2 text-mp-ink-2 hover:text-mp-ink transition-colors"
            >
              {cat.name} in {c.name}
            </Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
        {suppliers.map((s) => (
          <SupplierCard key={s.slug} supplier={s} />
        ))}
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-xl font-semibold text-mp-ink mb-4">Sourcing from {c.name}</h2>
        <p className="text-[14px] text-mp-ink-2 leading-relaxed">
          {c.name} is part of Veridian&apos;s {c.region} sourcing network, covering categories from apparel to electronics.
          All suppliers listed have completed identity and business verification, and can be contacted directly or through
          a Request for Quote submission.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-mp-ink mb-5">Other Sourcing Countries</h2>
        <div className="flex flex-wrap gap-2">
          {otherCountries.map((x) => (
            <Link key={x.slug} href={`/countries/${x.slug}`} className="text-[12.5px] font-medium px-3.5 py-1.5 rounded-full border border-mp-line hover:border-mp-line-2 text-mp-ink-2 hover:text-mp-ink transition-colors">
              {x.flag} {x.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
