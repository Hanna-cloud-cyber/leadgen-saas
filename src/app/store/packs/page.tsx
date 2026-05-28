"use client";

import Link from "next/link";
import { WORLD_CUP_COUNTRIES, getCountryByCode, generateProducts } from "@/lib/store/countries";
import { useCart } from "@/lib/store/cart-context";
import { useState } from "react";

const POPULAR_PACKS = ["fr", "br", "ar", "de", "es", "us", "ma", "jp", "pt", "it", "nl", "be"];

export default function PacksPage() {
  const { addItem } = useCart();
  const [addedPack, setAddedPack] = useState<string | null>(null);

  const handleAddPack = (countryCode: string) => {
    const country = getCountryByCode(countryCode)!;
    const products = generateProducts(country);
    addItem(products[0], products[0].variants?.[0] || "default");
    addItem(products[1], products[1].variants?.[0] || "default");
    setAddedPack(countryCode);
    setTimeout(() => setAddedPack(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <span className="badge-promo px-3 py-1 rounded-full inline-block mb-4">ÉCONOMISE 20%</span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
          Packs <span className="gradient-text-static">Duo</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Coque + Crocs aux couleurs de ton pays. Le combo parfait pour la Coupe du Monde 2026.
          <strong className="text-white"> Économise 20% </strong> sur le pack.
        </p>

        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="text-center">
            <div className="text-xs text-muted line-through">69,98€</div>
            <div className="text-3xl font-black gradient-text-static">55,99€</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-4xl">📱</span>
            <span className="text-xl text-accent font-black">+</span>
            <span className="text-4xl">👟</span>
          </div>
        </div>
      </div>

      {/* Popular packs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {POPULAR_PACKS.map(code => {
          const country = getCountryByCode(code)!;
          const isAdded = addedPack === code;

          return (
            <div
              key={code}
              className="bundle-card rounded-2xl overflow-hidden"
            >
              {/* Pack visual */}
              <div
                className="h-48 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(160deg, ${country.colors[0]}25 0%, ${country.colors[1]}25 50%, rgba(5,5,16,0.9) 100%)`,
                }}
              >
                <div className="flag-shimmer absolute inset-0" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-5xl mb-1">{country.flag}</div>
                    <div className="flex gap-3">
                      <span className="text-3xl">📱</span>
                      <span className="text-3xl">👟</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-3 left-3 z-10">
                  <span className="badge-promo px-2 py-1 rounded-lg">PACK -20%</span>
                </div>

                <div className="absolute top-3 right-3 flex gap-1 z-10">
                  {country.icons.slice(0, 3).map((icon, i) => (
                    <span key={i} className="text-base opacity-50">{icon}</span>
                  ))}
                </div>
              </div>

              {/* Pack info */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted bg-white/5 px-2 py-0.5 rounded-md font-semibold">Gr. {country.group}</span>
                  <div className="stars text-xs">★★★★★</div>
                </div>

                <h3 className="font-black text-base">Pack {country.name} {country.flag}</h3>
                <p className="text-[11px] text-muted mt-1">
                  Coque + Crocs — {country.icons.join(" ")} {country.famousThings.join(" · ")}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                  <div>
                    <span className="text-xs text-muted line-through mr-2">69,98€</span>
                    <span className="text-lg font-black text-white">55,99€</span>
                  </div>
                  <button
                    onClick={() => handleAddPack(code)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isAdded
                        ? "bg-success text-white"
                        : "btn-primary"
                    }`}
                  >
                    {isAdded ? "✓ Ajouté !" : "🛒 Ajouter"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* All countries packs */}
      <div className="mt-16">
        <h2 className="text-xl font-black mb-6">Tous les packs disponibles</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {WORLD_CUP_COUNTRIES.filter(c => !POPULAR_PACKS.includes(c.code)).map(country => (
            <button
              key={country.code}
              onClick={() => handleAddPack(country.code)}
              className="country-card bg-card-bg rounded-xl p-3 text-center hover:bg-card-bg-hover"
            >
              <div className="text-2xl mb-1">{country.flag}</div>
              <div className="text-[10px] font-semibold text-gray-300 truncate">{country.name}</div>
              <div className="text-[10px] font-bold text-accent mt-1">55,99€</div>
            </button>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-16 surface-elevated rounded-2xl p-8 sm:p-10 text-center">
        <h3 className="text-xl font-black mb-6">Pourquoi choisir un pack ?</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl mb-2">💰</div>
            <div className="text-sm font-bold">Économise 20%</div>
            <div className="text-xs text-muted mt-1">55,99€ au lieu de 69,98€</div>
          </div>
          <div>
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-sm font-bold">Look complet</div>
            <div className="text-xs text-muted mt-1">Coque + Crocs assortis</div>
          </div>
          <div>
            <div className="text-3xl mb-2">🚚</div>
            <div className="text-sm font-bold">Livraison offerte</div>
            <div className="text-xs text-muted mt-1">Gratuite dès 50€</div>
          </div>
        </div>
      </div>
    </div>
  );
}
