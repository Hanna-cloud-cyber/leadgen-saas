"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { useState } from "react";

export default function Header() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="top-bar text-center py-2 px-4">
        <p className="text-xs font-medium tracking-wide">
          LIVRAISON GRATUITE DÈS 50€ D&apos;ACHAT | COUPE DU MONDE 2026™
        </p>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/store" className="flex items-center gap-2 shrink-0">
              <span className="text-xl sm:text-2xl font-black tracking-tight uppercase">
                Football <span className="text-accent">Jersey</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/store" className="nav-link">Accueil</Link>
              <Link href="/store/coques" className="nav-link">Coques</Link>
              <Link href="/store/crocs" className="nav-link">Crocs</Link>
              <Link href="/store/packs" className="nav-link relative">
                Packs
                <span className="absolute -top-1 -right-6 badge-hot text-[8px] px-1">HOT</span>
              </Link>
              <Link href="/store/pays" className="nav-link">Shop by Nation</Link>
            </nav>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link href="/store/panier" className="relative flex items-center gap-2 hover:text-accent transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-accent text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile menu */}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-1">
                {mobileOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border animate-fade-in bg-white">
            <div className="max-w-[1400px] mx-auto px-4 py-4 space-y-1">
              {[
                { href: "/store", label: "Accueil" },
                { href: "/store/coques", label: "Coques personnalisées" },
                { href: "/store/crocs", label: "Crocs customisées" },
                { href: "/store/packs", label: "Packs duo" },
                { href: "/store/pays", label: "Shop by Nation" },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm font-semibold uppercase tracking-wide border-b border-border-light hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
