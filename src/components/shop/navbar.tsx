"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { useState } from "react";

export default function Navbar() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-[var(--cream-dark)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center text-white text-sm font-bold tracking-wider">
            QTP
          </div>
          <div>
            <h1 className="text-lg font-bold text-[var(--black-soft)] tracking-wide">QTP Abayas</h1>
            <p className="text-[10px] text-[var(--gold)] tracking-[0.2em] uppercase -mt-0.5">Elegance & Modestie</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-gray-600 hover:text-[var(--gold)] transition-colors">Accueil</Link>
          <Link href="/boutique" className="text-sm text-gray-600 hover:text-[var(--gold)] transition-colors">Boutique</Link>
          <Link href="/boutique?cat=brodee" className="text-sm text-gray-600 hover:text-[var(--gold)] transition-colors">Brodées</Link>
          <Link href="/boutique?cat=kimono" className="text-sm text-gray-600 hover:text-[var(--gold)] transition-colors">Kimonos</Link>
          <Link href="/contact" className="text-sm text-gray-600 hover:text-[var(--gold)] transition-colors">Contact</Link>
        </div>

        {/* Cart + Mobile */}
        <div className="flex items-center gap-4">
          <Link href="/panier" className="relative p-2 hover:bg-[var(--cream)] rounded-lg transition-colors">
            <svg className="w-6 h-6 text-[var(--black-soft)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[var(--gold)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--cream-dark)] bg-white px-6 py-4 space-y-3">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-600 hover:text-[var(--gold)]">Accueil</Link>
          <Link href="/boutique" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-600 hover:text-[var(--gold)]">Boutique</Link>
          <Link href="/boutique?cat=brodee" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-600 hover:text-[var(--gold)]">Brodées</Link>
          <Link href="/boutique?cat=kimono" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-600 hover:text-[var(--gold)]">Kimonos</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-600 hover:text-[var(--gold)]">Contact</Link>
        </div>
      )}
    </nav>
  );
}
