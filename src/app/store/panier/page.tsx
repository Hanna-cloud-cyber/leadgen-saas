"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { getCountryByCode } from "@/lib/store/countries";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black uppercase">Votre panier est vide</h1>
        <p className="text-sm text-muted mt-3">Découvrez nos produits aux couleurs de la Coupe du Monde 2026.</p>
        <div className="flex gap-3 justify-center mt-8">
          <Link href="/store/coques" className="btn-dark">Shop Coques</Link>
          <Link href="/store/crocs" className="btn-outline">Shop Crocs</Link>
        </div>
      </div>
    );
  }

  const shippingFree = totalPrice >= 50;
  const finalTotal = totalPrice + (shippingFree ? 0 : 4.99);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black uppercase">
          Panier ({totalItems})
        </h1>
        <button onClick={clearCart} className="text-xs text-muted hover:text-red-500 font-semibold uppercase tracking-wide transition-colors">
          Vider
        </button>
      </div>

      {/* Free shipping bar */}
      {!shippingFree && (
        <div className="mb-6 border border-border p-4">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-muted">Plus que <strong className="text-foreground">{(50 - totalPrice).toFixed(2)} €</strong> pour la livraison gratuite</span>
            <span className="text-muted">{totalPrice.toFixed(2)} € / 50 €</span>
          </div>
          <div className="h-1 bg-border-light">
            <div className="h-full bg-accent transition-all" style={{ width: `${Math.min((totalPrice / 50) * 100, 100)}%` }} />
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 text-[10px] font-bold uppercase tracking-widest text-muted pb-3 border-b border-border">
            <div className="col-span-6">Produit</div>
            <div className="col-span-2 text-center">Prix</div>
            <div className="col-span-2 text-center">Quantité</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <div className="divide-y divide-border">
            {items.map(item => {
              const country = getCountryByCode(item.product.countryCode);
              const isCase = item.product.type === "case";

              return (
                <div key={`${item.product.id}-${item.variant}`} className="grid grid-cols-12 gap-4 py-5 items-center">
                  {/* Product */}
                  <div className="col-span-12 sm:col-span-6 flex gap-4">
                    <div
                      className="w-20 h-20 flex items-center justify-center flex-shrink-0 border border-border"
                      style={{
                        background: country ? `linear-gradient(135deg, ${country.colors[0]}10 0%, ${country.colors[1]}10 100%)` : undefined,
                      }}
                    >
                      <div className="text-center">
                        <div className="text-2xl">{country?.flag}</div>
                        <div className="text-sm">{isCase ? "📱" : "👟"}</div>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold">{item.product.name}</h3>
                      <p className="text-[11px] text-muted mt-0.5">{isCase ? "Modèle" : "Taille"} : {item.variant}</p>
                      <button
                        onClick={() => removeItem(item.product.id, item.variant)}
                        className="text-[11px] text-muted hover:text-red-500 mt-1 underline transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="hidden sm:flex col-span-2 justify-center">
                    <span className="text-sm">{item.product.price.toFixed(2)} €</span>
                  </div>

                  {/* Qty */}
                  <div className="col-span-6 sm:col-span-2 flex justify-center">
                    <div className="flex items-center">
                      <button onClick={() => updateQuantity(item.product.id, item.variant, item.quantity - 1)} className="qty-btn text-xs">−</button>
                      <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.variant, item.quantity + 1)} className="qty-btn text-xs">+</button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="col-span-6 sm:col-span-2 text-right">
                    <span className="text-sm font-bold">{(item.product.price * item.quantity).toFixed(2)} €</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="border border-border p-6 sticky top-28">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-5">Résumé de commande</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Sous-total</span>
                <span className="font-semibold">{totalPrice.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Livraison</span>
                <span className={`font-semibold ${shippingFree ? "text-success" : ""}`}>
                  {shippingFree ? "GRATUITE" : "4,99 €"}
                </span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-bold uppercase text-xs tracking-wide">Total</span>
                <span className="text-xl font-black">{finalTotal.toFixed(2)} €</span>
              </div>
            </div>

            <button className="btn-dark w-full mt-6 py-4">
              PASSER COMMANDE
            </button>

            <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-muted">
              <span>Visa</span><span>Mastercard</span><span>PayPal</span><span>Apple Pay</span>
            </div>

            <Link href="/store" className="block text-center text-xs text-accent hover:underline mt-4 font-semibold uppercase tracking-wide">
              ← Continuer les achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
