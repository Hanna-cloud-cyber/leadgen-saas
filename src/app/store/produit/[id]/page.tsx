"use client";

import { use, useState } from "react";
import Link from "next/link";
import { getProductById, getCountryByCode, generateProducts } from "@/lib/store/countries";
import { useCart } from "@/lib/store/cart-context";
import ProductCard from "@/components/store/ProductCard";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState("");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-black uppercase">Produit introuvable</h1>
        <Link href="/store" className="text-accent text-sm mt-4 inline-block hover:underline">← Retour à la boutique</Link>
      </div>
    );
  }

  const country = getCountryByCode(product.countryCode)!;
  const isCase = product.type === "case";
  const relatedProducts = generateProducts(country).filter(p => p.id !== product.id);
  const otherCodes = ["fr", "br", "ar", "de", "es", "us", "ma", "jp"].filter(c => c !== country.code);
  const otherProducts = otherCodes.slice(0, 4).map(code => {
    const c = getCountryByCode(code)!;
    return generateProducts(c)[isCase ? 0 : 1];
  });

  const handleAdd = () => {
    if (!selectedVariant && product.variants?.length) return;
    addItem(product, selectedVariant || "default");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted mb-8">
        <Link href="/store" className="hover:text-accent">Accueil</Link>
        <span>/</span>
        <Link href={isCase ? "/store/coques" : "/store/crocs"} className="hover:text-accent">
          {isCase ? "Coques" : "Crocs"}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{country.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Product Image */}
        <div>
          <div
            className="aspect-square flex items-center justify-center border border-border"
            style={{ background: `linear-gradient(135deg, ${country.colors[0]}12 0%, ${country.colors[1]}12 100%)` }}
          >
            <div className="text-center">
              <div className="text-[120px] lg:text-[150px] leading-none">{country.flag}</div>
              <div className="text-5xl lg:text-6xl mt-2">{isCase ? "📱" : "👟"}</div>
              <div className="flex gap-4 justify-center mt-6">
                {country.icons.map((icon, i) => (
                  <span key={i} className="text-3xl opacity-50">{icon}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {country.icons.map((icon, i) => (
              <div
                key={i}
                className="aspect-square flex items-center justify-center border border-border hover:border-accent transition-colors cursor-pointer"
                style={{ background: `linear-gradient(135deg, ${country.colors[0]}08 0%, ${country.colors[1]}08 100%)` }}
              >
                <span className="text-2xl">{icon}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
            {isCase ? "Coque personnalisée" : "Crocs customisées"} — Groupe {country.group}
          </p>

          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-2">
            {product.name}
          </h1>

          <p className="text-sm text-muted mt-3 leading-relaxed">{product.description}</p>

          {/* Icons */}
          <div className="flex flex-wrap gap-2 mt-5">
            {country.famousThings.map((thing, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-xs font-medium border border-border px-3 py-1.5">
                <span className="text-base">{country.icons[i]}</span>
                {thing}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-6">
            <span className="text-2xl font-black">{product.price.toFixed(2)} €</span>
            <span className="text-sm text-muted line-through">{(product.price * 1.5).toFixed(2)} €</span>
            <span className="badge-sale ml-1">-33%</span>
          </div>

          {/* Variants */}
          {product.variants && (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wide mb-3">
                {isCase ? "Modèle" : "Taille"}
                {selectedVariant && <span className="text-accent font-normal normal-case ml-2">— {selectedVariant}</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map(v => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2.5 text-xs font-semibold border transition-all ${
                      selectedVariant === v
                        ? "border-foreground bg-foreground text-white"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to cart */}
          <div className="mt-8">
            <button
              onClick={handleAdd}
              disabled={!selectedVariant && !!product.variants?.length}
              className={`w-full py-4 text-sm font-bold uppercase tracking-wide transition-all ${
                added
                  ? "bg-success text-white"
                  : !selectedVariant && product.variants?.length
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "btn-dark"
              }`}
            >
              {added ? "✓ AJOUTÉ AU PANIER" : `AJOUTER AU PANIER — ${product.price.toFixed(2)} €`}
            </button>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
            {[
              { icon: "🚚", text: "Livraison gratuite dès 50€" },
              { icon: "↩️", text: "Retours gratuits 30 jours" },
              { icon: "📦", text: "Expédié sous 24-48h" },
              { icon: "🔒", text: "Paiement sécurisé" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted">
                <span>{t.icon}</span>{t.text}
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-xs font-bold uppercase tracking-wide mb-3">Détails du produit</h3>
            <ul className="text-xs text-muted space-y-1.5">
              <li>• Drapeau {country.name} {country.flag} haute résolution</li>
              <li>• Symboles : {country.famousThings.map((t, i) => `${country.icons[i]} ${t}`).join(", ")}</li>
              {isCase ? (
                <>
                  <li>• Protection anti-choc et anti-rayures</li>
                  <li>• Compatible charge sans fil</li>
                  <li>• TPU souple + polycarbonate</li>
                </>
              ) : (
                <>
                  <li>• 4 charms Jibbitz™ inclus : {country.icons.join(" ")}</li>
                  <li>• Stickers drapeau résistants à l&apos;eau</li>
                  <li>• Confort Croslite™ amorti</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-10 border-t border-border">
          <h2 className="text-lg font-black uppercase tracking-wide mb-6">Complète le look {country.flag}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Others */}
      <section className="mt-16 pt-10 border-t border-border">
        <h2 className="text-lg font-black uppercase tracking-wide mb-6">Vous aimerez aussi</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {otherProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
