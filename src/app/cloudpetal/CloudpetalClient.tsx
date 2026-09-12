"use client";

import { useState } from "react";
import type { CatalogProduct } from "./data";
import ProductArt from "./ProductArt";
import { useCart } from "./useCart";
import CartDrawer from "./CartDrawer";

function usd(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function CloudpetalClient({
  products,
  shopifyEnabled,
}: {
  products: CatalogProduct[];
  shopifyEnabled: boolean;
}) {
  const [cartOpen, setCartOpen] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const {
    cart,
    loading: cartLoading,
    error: cartError,
    addLine,
    updateLineQuantity,
    removeLine,
    setError: setCartError,
  } = useCart();

  const bundlePrice = products.reduce((sum, p) => sum + p.price, 0);
  const bundleCompareAt = products.reduce((sum, p) => sum + (p.compareAt ?? p.price), 0);

  async function handleAddToCart(product: CatalogProduct) {
    if (!shopifyEnabled || !product.variantId) {
      setCartError("Store checkout isn't connected yet — see README-CLOUDPETAL.md to enable it.");
      return;
    }
    setAddingId(product.id);
    try {
      await addLine(product.variantId, 1);
      setCartOpen(true);
    } catch {
      // error already captured in cartError by the hook
    } finally {
      setAddingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#faf7f0] text-[#28321f] font-sans">
      {/* Announcement bar */}
      <div className="bg-[#3f5b45] text-white text-[11px] sm:text-xs font-semibold tracking-wide text-center py-2 px-2">
        THE FULL RITUAL SET — SAVE {usd(bundleCompareAt - bundlePrice)} WHEN YOU SHOP ALL 6
      </div>

      {/* Header */}
      <header className="border-b border-[#e4ddcc] sticky top-0 bg-[#faf7f0]/95 backdrop-blur z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <span className="hidden sm:block text-[11px] font-semibold tracking-widest text-[#6b7a5e]">
            SKINCARE RITUALS
          </span>
          <span className="text-2xl font-black tracking-[0.25em]">CLOUDPETAL</span>
          <button className="relative" aria-label="Cart" onClick={() => setCartOpen(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#28321f" strokeWidth="1.8">
              <path d="M6 8h12l-1 12H7L6 8z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {cart && cart.totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#3f5b45] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.totalQuantity}
              </span>
            )}
          </button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden text-white"
          style={{
            background:
              "linear-gradient(135deg, #d99a3f 0%, #e0b84f 35%, #a7c9a0 70%, #3f5b45 100%)",
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
            <p className="text-[11px] tracking-[0.35em] font-semibold text-white/80">
              A SIMPLE, EFFECTIVE ROUTINE
            </p>
            <h1 className="text-4xl sm:text-6xl font-black uppercase mt-3 tracking-tight drop-shadow-sm">
              Slow Down, Glow Up
            </h1>
            <p className="max-w-lg mx-auto mt-4 text-white/90 text-[15px] sm:text-base">
              Six gentle, plant-powered essentials — cleanse, tone, treat, and protect —
              designed to work together as one calm daily ritual.
            </p>
            <a
              href="#shop"
              className="inline-block bg-white text-[#28321f] font-bold tracking-wide px-8 py-4 mt-8 hover:bg-[#faf7f0] transition-colors"
            >
              SHOP THE RITUAL
            </a>
          </div>
        </section>

        {/* Product grid */}
        <section id="shop" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold tracking-[0.3em] text-[#6b7a5e]">THE RITUAL</p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase mt-2">Six Steps, One Routine</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-[#e4ddcc] flex flex-col">
                <div className="aspect-[4/5] relative">
                  <ProductArt icon={product.icon} accent={product.accent} />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-[15px]">{product.title}</h3>
                  {product.tagline && (
                    <p className="text-xs text-[#6b7a5e] mt-1">{product.tagline}</p>
                  )}
                  <p className="text-sm text-[#4a5540] mt-2 flex-1">{product.description}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="font-black text-lg">{usd(product.price)}</span>
                    {product.compareAt && (
                      <span className="text-sm text-[#a3ac97] line-through">
                        {usd(product.compareAt)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={cartLoading && addingId === product.id}
                    className="w-full bg-[#28321f] text-white font-bold tracking-wide text-sm py-3 mt-4 hover:bg-[#1c2416] transition-colors disabled:opacity-60"
                  >
                    {cartLoading && addingId === product.id ? "ADDING…" : "ADD TO BAG"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {cartError && (
            <p className="text-center text-sm text-red-600 mt-6">{cartError}</p>
          )}

          {/* Bundle CTA */}
          <div className="mt-12 bg-[#28321f] text-white text-center py-10 px-6">
            <p className="text-[11px] tracking-[0.3em] font-semibold text-white/70">BEST VALUE</p>
            <h3 className="text-2xl font-black uppercase mt-2">The Full Ritual Set</h3>
            <p className="text-white/80 mt-2 text-sm">
              All 6 essentials, one clean routine.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="text-3xl font-black">{usd(bundlePrice)}</span>
              <span className="text-lg text-white/50 line-through">{usd(bundleCompareAt)}</span>
            </div>
            <p className="text-white/60 text-xs mt-3">
              Add each step above to build the full set in your bag.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white border-t border-[#e4ddcc] py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
            {[
              ["Plant-derived actives", "Fermented rice, plum, and centella at effective concentrations."],
              ["Fragrance-conscious", "Formulated to be gentle on sensitive, reactive skin."],
              ["Cruelty-free", "Never tested on animals, at any stage."],
            ].map(([t, d]) => (
              <div key={t}>
                <h3 className="font-bold">{t}</h3>
                <p className="text-sm text-[#6b7a5e] mt-2">{d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f0ead9] border-t border-[#e4ddcc] py-12 px-4 sm:px-6 mt-8">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="text-xl font-black tracking-[0.25em] mb-3">CLOUDPETAL</div>
            <p className="text-[#6b7a5e]">
              A simple, plant-powered skincare ritual — six steps, one calm routine.
            </p>
          </div>
          <div>
            <div className="font-bold mb-3">Help</div>
            <ul className="space-y-2 text-[#6b7a5e]">
              <li>Order tracking</li>
              <li>Returns &amp; exchanges</li>
              <li>Shipping</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-3">Newsletter</div>
            <p className="text-[#6b7a5e] mb-3">Get 10% off your first ritual.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 border border-[#c9c0a6] bg-white px-3 py-2 text-sm"
              />
              <button className="bg-[#28321f] text-white px-4 text-sm font-semibold">OK</button>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-[#a3ac97] mt-10">
          © {new Date().getFullYear()} Cloudpetal. All rights reserved.
        </p>
      </footer>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        loading={cartLoading}
        onUpdateQuantity={updateLineQuantity}
        onRemove={removeLine}
      />
    </div>
  );
}
