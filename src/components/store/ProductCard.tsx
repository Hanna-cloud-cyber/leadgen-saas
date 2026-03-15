"use client";

import Link from "next/link";
import { getCountryByCode, type Product } from "@/lib/store/countries";

export default function ProductCard({ product }: { product: Product }) {
  const country = getCountryByCode(product.countryCode);
  if (!country) return null;

  const isCase = product.type === "case";

  return (
    <Link href={`/store/produit/${product.id}`} className="block">
      <div className="product-card bg-card-bg border border-card-border rounded-2xl overflow-hidden group">
        {/* Visual */}
        <div
          className="relative h-56 flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${country.colors[0]}22 0%, ${country.colors[1]}22 100%)`,
          }}
        >
          {/* Flag shimmer overlay */}
          <div className="flag-shimmer absolute inset-0 z-10" />

          {/* Product visual */}
          <div className="text-center z-20">
            <div className="text-6xl mb-2">{country.flag}</div>
            <div className="text-3xl">{isCase ? "📱" : "👟"}</div>
          </div>

          {/* Country icons floating */}
          <div className="absolute top-3 right-3 flex gap-1">
            {country.icons.slice(0, 3).map((icon, i) => (
              <span key={i} className="text-lg opacity-60">{icon}</span>
            ))}
          </div>

          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span className="badge-new text-xs font-bold text-white px-2 py-1 rounded-full">
              {isCase ? "COQUE" : "CROCS"}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-sm group-hover:text-accent transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{product.description}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-card-border">
            <span className="text-lg font-bold text-accent">{product.price.toFixed(2)} €</span>
            <span className="text-xs text-gray-500 bg-card-border/50 px-2 py-1 rounded-full">
              Groupe {country.group}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
