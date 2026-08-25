"use client";

import Image from "next/image";
import type { Cart } from "./useCart";

function usd(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function CartDrawer({
  open,
  onClose,
  cart,
  loading,
  onUpdateQuantity,
  onRemove,
}: {
  open: boolean;
  onClose: () => void;
  cart: Cart | null;
  loading: boolean;
  onUpdateQuantity: (lineId: string, quantity: number) => void;
  onRemove: (lineId: string) => void;
}) {
  if (!open) return null;

  const isEmpty = !cart || cart.lines.length === 0;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white flex flex-col shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
          <h2 className="font-bold uppercase tracking-wide text-sm">
            Your Cart {cart && cart.totalQuantity > 0 ? `(${cart.totalQuantity})` : ""}
          </h2>
          <button onClick={onClose} aria-label="Close cart" className="text-2xl leading-none px-1">
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {isEmpty ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 gap-2">
              <p className="font-semibold">Your cart is empty</p>
              <p className="text-sm">Add a Sculptia legging to get started.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.lines.map((line) => (
                <li key={line.id} className="flex gap-3">
                  <div className="relative w-16 h-20 bg-neutral-100 flex-shrink-0 overflow-hidden">
                    {line.image && (
                      <Image
                        src={line.image.url}
                        alt={line.image.altText ?? line.title}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{line.title}</p>
                    <p className="text-xs text-neutral-500">{line.variantTitle}</p>
                    {!line.availableForSale && (
                      <p className="text-xs text-red-600 font-semibold mt-0.5">Out of stock</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-neutral-300">
                        <button
                          disabled={loading || line.quantity <= 1}
                          onClick={() => onUpdateQuantity(line.id, line.quantity - 1)}
                          className="w-7 h-7 text-sm disabled:opacity-30"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm tabular-nums">{line.quantity}</span>
                        <button
                          disabled={loading}
                          onClick={() => onUpdateQuantity(line.id, line.quantity + 1)}
                          className="w-7 h-7 text-sm disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-sm">{usd(line.price * line.quantity)}</span>
                    </div>
                    <button
                      disabled={loading}
                      onClick={() => onRemove(line.id)}
                      className="text-xs text-neutral-400 underline underline-offset-2 mt-1.5 disabled:opacity-30"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!isEmpty && (
          <div className="border-t border-neutral-200 px-5 py-4">
            <div className="flex items-center justify-between font-bold mb-3">
              <span>Subtotal</span>
              <span>{usd(cart.subtotal)}</span>
            </div>
            <a
              href={cart.checkoutUrl}
              className="block w-full text-center bg-[#161616] text-white font-bold tracking-wide py-3.5 hover:bg-neutral-800 transition-colors"
            >
              CHECKOUT
            </a>
            <p className="text-center text-[11px] text-neutral-400 mt-2">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
