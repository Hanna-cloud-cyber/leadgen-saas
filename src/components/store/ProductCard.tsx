"use client";

import Link from "next/link";
import { getCountryByCode, type Product } from "@/lib/store/countries";
import { useCart } from "@/lib/store/cart-context";
import { useState } from "react";

export default function ProductCard({ product, featured }: { product: Product; featured?: boolean }) {
  const country = getCountryByCode(product.countryCode);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!country) return null;

  const isCase = product.type === "case";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants?.[0] || "default";
    addItem(product, defaultVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/store/produit/${product.id}`} className="block group">
      <div className={`product-card ${featured ? "ring-1 ring-accent/20" : ""}`}>
        {/* Image Area */}
        <div
          className="relative h-52 sm:h-60 flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(160deg, ${country.colors[0]}18 0%, ${country.colors[1]}18 50%, rgba(5,5,16,0.8) 100%)`,
          }}
        >
          <div className="card-image text-center z-20 relative">
            <div className="text-6xl sm:text-7xl mb-1 drop-shadow-lg">{country.flag}</div>
            <div className="text-3xl sm:text-4xl">{isCase ? "📱" : "👟"}</div>
          </div>

          {/* Floating country icons */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
            {country.icons.slice(0, 3).map((icon, i) => (
              <span
                key={i}
                className="text-base opacity-40 group-hover:opacity-80 transition-opacity duration-500"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                {icon}
              </span>
            ))}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
            <span className={`${isCase ? "badge-new" : "badge-new"} text-white px-2.5 py-1 rounded-lg`}>
              {isCase ? "COQUE" : "CROCS"}
            </span>
            {featured && (
              <span className="badge-hot text-white px-2.5 py-1 rounded-lg">BEST</span>
            )}
          </div>

          {/* Shimmer overlay */}
          <div className="flag-shimmer absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Quick Add Button */}
          <div className="quick-add absolute bottom-3 left-3 right-3 z-30">
            <button
              onClick={handleQuickAdd}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                added
                  ? "bg-success text-white"
                  : "btn-primary"
              }`}
            >
              {added ? "✓ Ajouté !" : "⚡ Ajout rapide"}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold text-muted bg-white/5 px-2 py-0.5 rounded-md">
              Gr. {country.group}
            </span>
            <div className="stars text-xs">★★★★★</div>
            <span className="text-[10px] text-muted">(127)</span>
          </div>

          <h3 className="font-bold text-sm text-gray-100 group-hover:text-white transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-[11px] text-muted mt-1 line-clamp-1">
            {country.icons.join(" ")} {country.famousThings.join(" · ")}
          </p>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-white">{product.price.toFixed(2)}€</span>
              <span className="text-xs text-muted line-through">{(product.price * 1.5).toFixed(2)}€</span>
            </div>
            <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-md">-33%</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
