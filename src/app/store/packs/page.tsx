"use client";

import { WORLD_CUP_COUNTRIES, getCountryByCode, generateProducts } from "@/lib/store/countries";
import { useCart } from "@/lib/store/cart-context";
import { useState } from "react";

const POPULAR = ["fr", "br", "ar", "de", "es", "us", "ma", "jp", "pt", "it", "nl", "be"];

export default function PacksPage() {
  const { addItem } = useCart();
  const [addedPack, setAddedPack] = useState<string | null>(null);

  const handleAdd = (code: string) => {
    const country = getCountryByCode(code)!;
    const products = generateProducts(country);
    addItem(products[0], products[0].variants?.[0] || "default");
    addItem(products[1], products[1].variants?.[0] || "default");
    setAddedPack(code);
    setTimeout(() => setAddedPack(null), 2000);
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-dark-bg text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <span className="badge-sale inline-block mb-4">ÉCONOMISE 20%</span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Packs Duo</h1>
          <p className="text-sm text-gray-400 mt-3 max-w-md mx-auto">
            Coque + Crocs aux couleurs de ton pays. Le combo parfait pour supporter ton équipe.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-4xl">📱 <span className="text-lg">+</span> 👟</div>
            <div>
              <span className="text-sm text-gray-500 line-through">69,98 €</span>
              <span className="text-2xl font-black text-white ml-2">55,99 €</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Popular packs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR.map(code => {
            const country = getCountryByCode(code)!;
            const isAdded = addedPack === code;

            return (
              <div key={code} className="border border-border hover:border-accent transition-colors">
                {/* Visual */}
                <div
                  className="h-48 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${country.colors[0]}15 0%, ${country.colors[1]}15 100%)` }}
                >
                  <span className="badge-sale absolute top-0 left-0">-20%</span>
                  <div className="text-center">
                    <div className="text-5xl mb-2">{country.flag}</div>
                    <div className="flex gap-2 justify-center text-2xl">
                      <span>📱</span><span className="text-sm self-center">+</span><span>👟</span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1 opacity-40">
                    {country.icons.slice(0, 3).map((icon, i) => (
                      <span key={i} className="text-sm">{icon}</span>
                    ))}
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Pack Duo — Groupe {country.group}</p>
                  <h3 className="font-bold text-sm mt-1">Pack {country.name} {country.flag}</h3>
                  <p className="text-[11px] text-muted mt-1">{country.famousThings.join(" · ")}</p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-light">
                    <div>
                      <span className="text-xs text-muted line-through mr-2">69,98 €</span>
                      <span className="text-base font-bold">55,99 €</span>
                    </div>
                    <button
                      onClick={() => handleAdd(code)}
                      className={`text-xs font-bold uppercase tracking-wide px-4 py-2.5 transition-all ${
                        isAdded
                          ? "bg-success text-white"
                          : "btn-dark"
                      }`}
                    >
                      {isAdded ? "✓ AJOUTÉ" : "AJOUTER"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* All nations packs */}
        <div className="mt-14">
          <h2 className="text-lg font-black uppercase tracking-wide mb-6">Tous les packs</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {WORLD_CUP_COUNTRIES.filter(c => !POPULAR.includes(c.code)).map(c => (
              <button
                key={c.code}
                onClick={() => handleAdd(c.code)}
                className="flex flex-col items-center gap-1.5 p-3 border border-border hover:border-accent transition-colors"
              >
                <span className="text-2xl">{c.flag}</span>
                <span className="text-[10px] font-semibold text-muted">{c.name}</span>
                <span className="text-[10px] font-bold">55,99 €</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
