"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { getCountryByCode } from "@/lib/store/countries";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold mb-4">Ton panier est vide</h1>
        <p className="text-gray-400 mb-8">Ajoute des coques ou des Crocs aux couleurs de ton équipe !</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/store/coques"
            className="inline-flex items-center gap-2 bg-accent text-black font-bold px-6 py-3 rounded-xl hover:bg-accent-light transition-colors"
          >
            📱 Voir les Coques
          </Link>
          <Link
            href="/store/crocs"
            className="inline-flex items-center gap-2 bg-card-bg border border-card-border text-white font-bold px-6 py-3 rounded-xl hover:border-accent transition-colors"
          >
            👟 Voir les Crocs
          </Link>
        </div>
      </div>
    );
  }

  const shippingFree = totalPrice >= 50;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold">
          🛒 Panier <span className="text-gray-400 text-lg font-normal">({totalItems} article{totalItems > 1 ? "s" : ""})</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          Vider le panier
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => {
            const country = getCountryByCode(item.product.countryCode);
            const isCase = item.product.type === "case";

            return (
              <div
                key={`${item.product.id}-${item.variant}`}
                className="bg-card-bg border border-card-border rounded-xl p-4 flex gap-4"
              >
                {/* Mini visual */}
                <div
                  className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: country
                      ? `linear-gradient(135deg, ${country.colors[0]}33 0%, ${country.colors[1]}33 100%)`
                      : "#1e1e3a",
                  }}
                >
                  <div className="text-center">
                    <div className="text-2xl">{country?.flag}</div>
                    <div className="text-lg">{isCase ? "📱" : "👟"}</div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-sm">{item.product.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {isCase ? "Modèle" : "Taille"} : {item.variant}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.variant)}
                      className="text-gray-500 hover:text-red-400 transition-colors text-sm"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.variant, item.quantity - 1)}
                        className="qty-btn w-7 h-7 rounded-lg bg-card-border flex items-center justify-center text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.variant, item.quantity + 1)}
                        className="qty-btn w-7 h-7 rounded-lg bg-card-border flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-bold text-accent">
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-card-bg border border-card-border rounded-xl p-6 sticky top-24">
            <h2 className="font-bold text-lg mb-4">Résumé</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Sous-total</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Livraison</span>
                <span className={shippingFree ? "text-green-400" : ""}>
                  {shippingFree ? "GRATUITE ✅" : "4,99 €"}
                </span>
              </div>
              {!shippingFree && (
                <p className="text-xs text-yellow-400/80">
                  Plus que {(50 - totalPrice).toFixed(2)}€ pour la livraison gratuite !
                </p>
              )}
              <div className="border-t border-card-border pt-3 flex justify-between items-baseline">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-extrabold gradient-text">
                  {(totalPrice + (shippingFree ? 0 : 4.99)).toFixed(2)} €
                </span>
              </div>
            </div>

            <button className="w-full mt-6 bg-accent text-black font-bold py-4 rounded-xl hover:bg-accent-light transition-colors animate-pulse-glow text-lg">
              💳 Commander
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              🔒 Paiement sécurisé • 📦 Expédition sous 48h
            </p>

            <Link
              href="/store"
              className="block text-center text-sm text-accent hover:underline mt-4"
            >
              ← Continuer les achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
