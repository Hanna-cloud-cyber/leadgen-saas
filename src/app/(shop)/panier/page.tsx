"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/products";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 rounded-full bg-[var(--cream)] flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[var(--black-soft)] mb-2">Votre panier est vide</h1>
        <p className="text-gray-500 mb-8">Decouvrez notre collection et trouvez votre prochaine abaya preferee.</p>
        <Link href="/boutique" className="btn-gold px-8 py-3 rounded-xl font-medium">
          Decouvrir la boutique
        </Link>
      </div>
    );
  }

  const shipping = totalPrice >= 99 ? 0 : 7.90;
  const grandTotal = totalPrice + shipping;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-[var(--gold)] transition-colors">Accueil</Link>
        <span>/</span>
        <span className="text-[var(--black-soft)]">Panier</span>
      </div>

      <h1 className="text-3xl font-bold text-[var(--black-soft)] mb-8">Mon Panier ({totalItems} article{totalItems > 1 ? "s" : ""})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.productId}-${item.color}-${item.size}`} className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-6 shadow-sm">
              {/* Thumbnail */}
              <div className="w-24 h-32 rounded-xl bg-gradient-to-br from-[var(--cream)] to-[var(--cream-dark)] flex items-center justify-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center text-white text-[8px] font-bold">
                  QTP
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link href={`/produit/${item.productId}`} className="font-semibold text-[var(--black-soft)] hover:text-[var(--gold)] transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-400 mt-1">{item.color} &middot; {item.size}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.color, item.size)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                      className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-[var(--gold)] transition-colors"
                    >
                      -
                    </button>
                    <span className="w-9 h-9 flex items-center justify-center text-sm font-medium border-x border-gray-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-[var(--gold)] transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold text-[var(--black-soft)]">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}

          <button onClick={clearCart} className="text-sm text-gray-400 hover:text-red-500 transition-colors mt-2">
            Vider le panier
          </button>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-fit sticky top-24">
          <h2 className="text-lg font-bold text-[var(--black-soft)] mb-6">Recapitulatif</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Sous-total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Livraison</span>
              <span>{shipping === 0 ? <span className="text-green-600 font-medium">Gratuite</span> : formatPrice(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-[var(--gold)]">
                Plus que {formatPrice(99 - totalPrice)} pour la livraison gratuite !
              </p>
            )}
            <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-[var(--black-soft)] text-base">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <button className="mt-6 w-full btn-gold py-3.5 rounded-xl font-medium text-base">
            Passer commande
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Paiement securise par carte bancaire
          </p>

          <Link href="/boutique" className="block text-center text-sm text-[var(--gold)] hover:underline mt-4">
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
}
