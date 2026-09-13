import type { Metadata } from "next";
import { getAllProducts, getAllCategories } from "@/lib/marketplace/data";
import { ProductCard } from "@/components/marketplace/product-card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trending Products",
  description: "Explore trending, high-demand and low-MOQ products with verified suppliers ready to produce.",
};

export default function ProductsPage() {
  const products = getAllProducts();
  const categories = getAllCategories();

  return (
    <div className="mp-container py-10">
      <h1 className="text-3xl md:text-[40px] font-bold tracking-tight text-mp-ink">Trending Products</h1>
      <p className="text-[15px] text-mp-ink-2 mt-4 max-w-2xl leading-relaxed">
        Discover in-demand products already being manufactured by verified suppliers — with transparent pricing, MOQ and
        supplier counts so you know exactly where to start sourcing.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-mp-ink mb-5">Browse Products by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.slug} href={`/products/${c.slug}`} className="text-[12.5px] font-medium px-3.5 py-1.5 rounded-full border border-mp-line hover:border-mp-line-2 text-mp-ink-2 hover:text-mp-ink transition-colors">
              {c.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
