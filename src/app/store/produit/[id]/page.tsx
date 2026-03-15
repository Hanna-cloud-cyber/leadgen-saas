"use client";

import { use } from "react";
import Link from "next/link";
import { getProductById, getCountryByCode, generateProducts } from "@/lib/store/countries";
import { useCart } from "@/lib/store/cart-context";
import { useState } from "react";
import ProductCard from "@/components/store/ProductCard";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState("");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Produit introuvable</h1>
        <Link href="/store" className="text-accent hover:underline">← Retour à la boutique</Link>
      </div>
    );
  }

  const country = getCountryByCode(product.countryCode)!;
  const isCase = product.type === "case";

  // Related products from same country
  const relatedProducts = generateProducts(country).filter(p => p.id !== product.id);

  // Other popular products
  const otherCountryCodes = ["fr", "br", "ar", "de", "es", "us", "ma", "jp"].filter(c => c !== country.code);
  const otherProducts = otherCountryCodes.slice(0, 4).map(code => {
    const c = getCountryByCode(code)!;
    return generateProducts(c)[isCase ? 0 : 1];
  });

  const handleAddToCart = () => {
    if (!selectedVariant && product.variants?.length) {
      return;
    }
    addItem(product, selectedVariant || "default");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/store" className="hover:text-accent">Accueil</Link>
        <span>/</span>
        <Link href={isCase ? "/store/coques" : "/store/crocs"} className="hover:text-accent">
          {isCase ? "Coques" : "Crocs"}
        </Link>
        <span>/</span>
        <span className="text-gray-300">{country.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Visual */}
        <div
          className="relative rounded-2xl overflow-hidden h-96 lg:h-[500px] flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${country.colors[0]}33 0%, ${country.colors[1]}33 100%)`,
          }}
        >
          <div className="flag-shimmer absolute inset-0 z-10" />

          <div className="text-center z-20">
            <div className="text-8xl mb-4">{country.flag}</div>
            <div className="text-6xl mb-4">{isCase ? "📱" : "👟"}</div>
            <div className="flex gap-3 justify-center">
              {country.icons.map((icon, i) => (
                <span key={i} className="text-3xl animate-float" style={{ animationDelay: `${i * 0.4}s` }}>
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {/* Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="badge-new text-sm font-bold text-white px-3 py-1.5 rounded-full">
              {isCase ? "📱 COQUE" : "👟 CROCS"} — Groupe {country.group}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{country.flag}</span>
            <span className="text-sm text-gray-400 bg-card-bg border border-card-border px-3 py-1 rounded-full">
              Groupe {country.group}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{product.name}</h1>

          <p className="text-gray-400 text-lg mb-6">{product.description}</p>

          {/* Famous things */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm text-accent mb-2">Symboles du pays inclus :</h3>
            <div className="flex flex-wrap gap-2">
              {country.famousThings.map((thing, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-card-bg border border-card-border px-3 py-1.5 rounded-full text-sm">
                  <span>{country.icons[i]}</span>
                  {thing}
                </span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-extrabold gradient-text">{product.price.toFixed(2)} €</span>
            <span className="text-sm text-gray-500 line-through">{(product.price * 1.5).toFixed(2)} €</span>
            <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">-33%</span>
          </div>

          {/* Variant selector */}
          {product.variants && (
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3">
                {isCase ? "Modèle de téléphone :" : "Taille :"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map(variant => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                      selectedVariant === variant
                        ? "border-accent bg-accent/10 text-accent font-semibold"
                        : "border-card-border bg-card-bg text-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
              {!selectedVariant && (
                <p className="text-xs text-yellow-400/80 mt-2">⚠️ Sélectionne {isCase ? "un modèle" : "une taille"}</p>
              )}
            </div>
          )}

          {/* Add to cart */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant && !!product.variants?.length}
              className={`flex-1 flex items-center justify-center gap-2 font-bold py-4 rounded-xl text-lg transition-all ${
                added
                  ? "bg-green-500 text-white"
                  : !selectedVariant && product.variants?.length
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-accent text-black hover:bg-accent-light animate-pulse-glow"
              }`}
            >
              {added ? (
                <>✅ Ajouté au panier !</>
              ) : (
                <>🛒 Ajouter au panier</>
              )}
            </button>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>🚚</span> Livraison gratuite dès 50€
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>↩️</span> Retour sous 30 jours
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>📦</span> Expédition sous 48h
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>🔒</span> Paiement sécurisé
            </div>
          </div>
        </div>
      </div>

      {/* Related from same country */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-6">
            Aussi pour {country.name} {country.flag}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Other popular */}
      <section className="mt-16">
        <h2 className="text-xl font-bold mb-6">
          Autres pays <span className="gradient-text">populaires</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
