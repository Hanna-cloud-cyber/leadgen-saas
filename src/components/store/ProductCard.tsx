"use client";

import Link from "next/link";
import { getCountryByCode, type Product } from "@/lib/store/countries";
import { useCart } from "@/lib/store/cart-context";
import { useState } from "react";

export default function ProductCard({ product, badge }: { product: Product; badge?: string }) {
  const country = getCountryByCode(product.countryCode);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!country) return null;

  const isCase = product.type === "case";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.variants?.[0] || "default");
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/store/produit/${product.id}`} className="block group">
      <div className="product-card">
        {/* Image */}
        <div
          className="relative aspect-square flex items-center justify-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${country.colors[0]}12 0%, ${country.colors[1]}12 100%)` }}
        >
          <div className="card-image text-center">
            <div className="text-7xl sm:text-8xl mb-1">{country.flag}</div>
            <div className="text-3xl sm:text-4xl">{isCase ? "📱" : "👟"}</div>
          </div>

          {/* Badge */}
          {badge && (
            <div className="absolute top-0 left-0">
              <span className={badge === "SALE" ? "badge-sale" : badge === "NEW" ? "badge-new" : "badge-hot"}>
                {badge}
              </span>
            </div>
          )}

          {/* Quick add on hover */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur py-3 text-center opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleQuickAdd}
              className={`text-xs font-bold uppercase tracking-wide transition-colors ${
                added ? "text-success" : "text-foreground hover:text-accent"
              }`}
            >
              {added ? "✓ AJOUTÉ" : "+ AJOUT RAPIDE"}
            </button>
          </div>

          {/* Country icons */}
          <div className="absolute top-3 right-3 flex gap-1 opacity-40">
            {country.icons.slice(0, 2).map((icon, i) => (
              <span key={i} className="text-sm">{icon}</span>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-[11px] text-muted uppercase tracking-wide font-medium">
            {isCase ? "Coque personnalisée" : "Crocs customisées"} — Groupe {country.group}
          </p>
          <h3 className="text-sm font-bold mt-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-sm font-bold">{product.price.toFixed(2)} €</span>
            <span className="text-xs text-muted line-through">{(product.price * 1.5).toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
