"use client";

import { use, useState } from "react";
import Link from "next/link";
import { getProductById, formatPrice, PRODUCTS } from "@/lib/products";
import { useCart } from "@/lib/store/cart-context";
import ProductCard from "@/components/shop/product-card";

const PRODUCT_GRADIENTS: Record<string, string> = {
  "abaya-kimono-tie-dye-emeraude": "from-emerald-600 via-emerald-400 to-green-200",
  "abaya-kimono-tie-dye-violet": "from-purple-600 via-violet-400 to-purple-200",
  "ensemble-kimono-tie-dye-emeraude": "from-emerald-700 via-emerald-500 to-green-300",
  "abaya-kimono-plisse-degrade": "from-teal-700 via-cyan-400 to-sky-200",
  "bonnet-soie-blanc": "from-stone-100 via-stone-50 to-white",
  "bonnet-soie-noir-or": "from-gray-900 via-gray-800 to-amber-400",
  "bonnet-soie-murier-dore": "from-amber-500 via-yellow-400 to-amber-300",
  "ensemble-kimono-tie-dye-violet": "from-purple-700 via-purple-500 to-violet-300",
  "abaya-kimono-tiedye-bleu": "from-blue-800 via-cyan-500 to-blue-300",
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Produit introuvable</h1>
        <Link href="/boutique" className="btn-gold px-6 py-3 rounded-xl text-sm">Retour à la boutique</Link>
      </div>
    );
  }

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const gradient = PRODUCT_GRADIENTS[product.id] || "from-[var(--cream)] to-[var(--cream-dark)]";

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      color: product.colors[selectedColor],
      size: product.sizes[selectedSize],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/boutique" className="hover:text-[var(--gold)] transition-colors">Boutique</Link>
          <span>/</span>
          <span className="text-[var(--black-soft)]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className={`aspect-[3/4] bg-gradient-to-br ${gradient} rounded-3xl flex items-center justify-center relative overflow-hidden`}>
            <div className="text-center">
              <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                {product.category === "bonnet" ? (
                  <svg className="w-14 h-14 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3c-4.97 0-9 3.13-9 7v4c0 1.1.9 2 2 2h1v-4c0-3.31 2.69-6 6-6s6 2.69 6 6v4h1c1.1 0 2-.9 2-2v-4c0-3.87-4.03-7-9-7z" />
                  </svg>
                ) : (
                  <svg className="w-14 h-14 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v18l7-3 7 3V3H5z" />
                  </svg>
                )}
              </div>
              <p className="text-white/60 text-sm font-medium tracking-wider uppercase">QTP Abayas</p>
              <p className="text-white/40 text-xs mt-1">{product.name}</p>
            </div>
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[var(--gold)] text-white text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
                {product.badge}
              </span>
            )}
            {product.originalPrice && (
              <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-xs text-[var(--gold)] uppercase tracking-[0.2em] font-medium mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold text-[var(--black-soft)]">{product.name}</h1>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold text-[var(--black-soft)]">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="text-gray-500 mt-6 leading-relaxed">{product.longDescription}</p>

            {/* Soie de mûrier badge for bonnets */}
            {product.category === "bonnet" && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium px-3 py-1.5 rounded-full">Soie de mûrier</span>
                <span className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium px-3 py-1.5 rounded-full">Grade 6A</span>
                <span className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium px-3 py-1.5 rounded-full">23 momme</span>
              </div>
            )}

            {/* Color selection */}
            <div className="mt-8">
              <p className="text-sm font-semibold text-[var(--black-soft)] mb-3">
                Couleur : <span className="font-normal text-gray-500">{product.colors[selectedColor]}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(i)}
                    className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                      i === selectedColor
                        ? "border-[var(--gold)] bg-[var(--gold)]/5 text-[var(--gold)] font-medium"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-[var(--black-soft)] mb-3">Taille</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, i) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(i)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                      i === selectedSize
                        ? "border-[var(--gold)] bg-[var(--gold)] text-white"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className={`mt-8 w-full py-4 rounded-xl text-base font-medium transition-all ${
                added ? "bg-green-600 text-white" : "btn-gold"
              }`}
            >
              {added ? "Ajouté au panier !" : "Ajouter au panier"}
            </button>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", label: "Livraison soignée" },
                { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: "Retours 30 jours" },
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Qualité garantie" },
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "Service client réactif" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-[var(--gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                  </svg>
                  {f.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-white py-16 mt-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[var(--black-soft)] mb-8">Vous aimerez aussi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
