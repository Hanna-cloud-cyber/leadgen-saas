import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategoryBySlug,
  getProductsByCategory,
  getSuppliersByCategory,
} from "@/lib/marketplace/data";
import { ProductCard } from "@/components/marketplace/product-card";
import { SupplierCard } from "@/components/marketplace/supplier-card";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `${cat.name} Products`,
    description: `Trending ${cat.name.toLowerCase()} products with verified suppliers, MOQ and pricing.`,
  };
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const products = getProductsByCategory(category);
  const suppliers = getSuppliersByCategory(category).slice(0, 3);

  return (
    <div className="mp-container py-10">
      <nav className="text-[12.5px] text-mp-ink-3 mb-6">
        <Link href="/products" className="hover:text-mp-ink">Products</Link>
        <span className="mx-1.5">/</span>
        <span className="text-mp-ink">{cat.name}</span>
      </nav>

      <h1 className="text-3xl md:text-[40px] font-bold tracking-tight text-mp-ink">{cat.name} Products</h1>
      <p className="text-[15px] text-mp-ink-2 mt-4 max-w-2xl leading-relaxed">{cat.description}</p>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-[13.5px] text-mp-ink-2 mt-10">
          No trending products indexed for this category yet — browse{" "}
          <Link href={`/categories/${category}`} className="text-mp-accent font-medium">
            all {cat.name} suppliers
          </Link>{" "}
          instead.
        </p>
      )}

      <section className="mt-16">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-mp-ink">Suppliers for {cat.name}</h2>
          <Link href={`/categories/${category}`} className="text-[13px] font-semibold text-mp-accent">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {suppliers.map((s) => (
            <SupplierCard key={s.slug} supplier={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
