"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import ProductCard from "@/components/shop/product-card";

function BoutiqueContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const [activeCategory, setActiveCategory] = useState<string | null>(catParam);
  const [sortBy, setSortBy] = useState<string>("featured");

  const filtered = useMemo(() => {
    let products = activeCategory ? PRODUCTS.filter((p) => p.category === activeCategory) : [...PRODUCTS];

    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "featured":
      default:
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    return products;
  }, [activeCategory, sortBy]);

  return (
    <>
      {/* Header */}
      <section className="hero-abaya pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-[var(--black-soft)]">Boutique</span>
            {activeCategory && (
              <>
                <span>/</span>
                <span className="text-[var(--gold)]">{CATEGORIES.find((c) => c.id === activeCategory)?.name}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--black-soft)]">
            {activeCategory ? CATEGORIES.find((c) => c.id === activeCategory)?.name : "Toute la Collection"}
          </h1>
          <p className="text-gray-500 mt-2">{filtered.length} articles</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !activeCategory
                  ? "bg-[var(--gold)] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[var(--gold)] hover:text-[var(--gold)]"
              }`}
            >
              Tout
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-[var(--gold)] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 focus:outline-none focus:border-[var(--gold)]"
          >
            <option value="featured">Mis en avant</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix decroissant</option>
          </select>
        </div>

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Aucun article dans cette categorie.</p>
            <button onClick={() => setActiveCategory(null)} className="mt-4 btn-outline-gold px-6 py-2 rounded-lg text-sm">
              Voir tout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default function BoutiquePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Chargement...</div>}>
      <BoutiqueContent />
    </Suspense>
  );
}
