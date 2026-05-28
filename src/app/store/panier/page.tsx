"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { getCountryByCode, WORLD_CUP_COUNTRIES, generateProducts } from "@/lib/store/countries";
import ProductCard from "@/components/store/ProductCard";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  // Upsell products
  const upsellProducts = WORLD_CUP_COUNTRIES
    .filter(c => ["fr", "br", "ar"].includes(c.code))
    .flatMap(c => generateProducts(c))
    .filter(p => !items.some(i => i.product.id === p.id))
    .slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-7xl mb-6">🛒</div>
          <h1 className="text-3xl font-black mb-3">Ton panier est vide</h1>
          <p className="text-sm text-muted mb-8">Ajoute des coques ou des Crocs aux couleurs de ton équipe pour la Coupe du Monde 2026 !</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/store/coques" className="btn-primary px-6 py-3.5 text-sm text-center">
              📱 Voir les Coques
            </Link>
            <Link href="/store/crocs" className="btn-secondary px-6 py-3.5 text-sm text-center">
              👟 Voir les Crocs
            </Link>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-20">
          <h2 className="text-lg font-black mb-6">Nos <span className="gradient-text-static">best-sellers</span></h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {upsellProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const shippingFree = totalPrice >= 50;
  const finalTotal = totalPrice + (shippingFree ? 0 : 4.99);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Mon panier
          </h1>
          <p className="text-xs text-muted mt-1">{totalItems} article{totalItems > 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-muted hover:text-red-400 transition-colors font-semibold"
        >
          Vider le panier
        </button>
      </div>

      {/* Free shipping progress */}
      {!shippingFree && (
        <div className="mb-6 surface-elevated rounded-xl p-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-muted">Plus que <strong className="text-accent">{(50 - totalPrice).toFixed(2)}€</strong> pour la livraison gratuite 🚚</span>
            <span className="text-muted">{totalPrice.toFixed(2)}€ / 50€</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all duration-500"
              style={{ width: `${Math.min((totalPrice / 50) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map(item => {
            const country = getCountryByCode(item.product.countryCode);
            const isCase = item.product.type === "case";

            return (
              <div
                key={`${item.product.id}-${item.variant}`}
                className="surface-elevated rounded-xl p-4 sm:p-5 flex gap-4"
              >
                {/* Visual */}
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: country
                      ? `linear-gradient(135deg, ${country.colors[0]}25 0%, ${country.colors[1]}25 100%)`
                      : undefined,
                  }}
                >
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl">{country?.flag}</div>
                    <div className="text-base sm:text-lg">{isCase ? "📱" : "👟"}</div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-sm">{item.product.name}</h3>
                      <p className="text-[11px] text-muted mt-0.5">
                        {isCase ? "Modèle" : "Taille"} : <span className="text-gray-300">{item.variant}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.variant)}
                      className="text-muted hover:text-red-400 transition-colors p-1"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.variant, item.quantity - 1)}
                        className="qty-btn w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.variant, item.quantity + 1)}
                        className="qty-btn w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-bold text-white">
                      {(item.product.price * item.quantity).toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div>
          <div className="surface-elevated rounded-xl p-6 sticky top-28">
            <h2 className="font-black text-base mb-5">Résumé de commande</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Sous-total</span>
                <span className="font-semibold">{totalPrice.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Livraison</span>
                <span className={shippingFree ? "text-success font-semibold" : "font-semibold"}>
                  {shippingFree ? "GRATUITE ✓" : "4,99€"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Code promo</span>
                <span className="text-xs text-accent font-semibold cursor-pointer hover:underline">GOAL26</span>
              </div>

              <div className="border-t border-white/5 pt-4 flex justify-between items-baseline">
                <span className="font-black text-sm">Total</span>
                <span className="text-2xl font-black gradient-text-static">
                  {finalTotal.toFixed(2)}€
                </span>
              </div>
            </div>

            <button className="w-full mt-6 btn-primary py-4 text-sm animate-pulse-glow">
              💳 Passer commande
            </button>

            <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-muted">
              <span>🔒 SSL</span>
              <span>Visa</span>
              <span>Mastercard</span>
              <span>PayPal</span>
              <span>Apple Pay</span>
            </div>

            <Link
              href="/store"
              className="block text-center text-xs text-accent hover:underline mt-4 font-semibold"
            >
              ← Continuer les achats
            </Link>
          </div>
        </div>
      </div>

      {/* Upsell */}
      {upsellProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-lg font-black mb-6">
            Tu pourrais aussi <span className="gradient-text-static">aimer</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {upsellProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
