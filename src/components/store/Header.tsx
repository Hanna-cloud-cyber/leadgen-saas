"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";
import { useState } from "react";

export default function Header() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Promo Bar */}
      <div className="promo-bar text-center py-2 px-4">
        <p className="text-xs sm:text-sm font-semibold text-white tracking-wide">
          🏆 COUPE DU MONDE 2026 — Livraison GRATUITE dès 50€ | Code : <span className="text-accent-light font-black">GOAL26</span> = -15%
        </p>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/store" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                <span className="text-lg">⚽</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-base font-extrabold tracking-tight">
                  <span className="gradient-text-static">WORLDCUP</span>
                  <span className="text-white"> SHOP</span>
                </div>
                <div className="text-[10px] text-muted font-medium tracking-widest -mt-0.5">2026 EDITION</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <NavLink href="/store">Accueil</NavLink>
              <NavLink href="/store/coques" badge="32">Coques</NavLink>
              <NavLink href="/store/crocs" badge="32">Crocs</NavLink>
              <NavLink href="/store/packs" hot>Packs</NavLink>
              <NavLink href="/store/pays">Pays</NavLink>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <Link
                href="/store/panier"
                className="relative flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 rounded-xl px-4 py-2.5 transition-all duration-300 group"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300 group-hover:text-accent transition-colors">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors hidden sm:block">Panier</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-light text-white text-[10px] font-black rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className={`w-5 h-0.5 bg-white transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                  <div className={`w-5 h-0.5 bg-white transition-all ${mobileOpen ? "opacity-0" : ""}`} />
                  <div className={`w-5 h-0.5 bg-white transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/5 animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <MobileLink href="/store" onClick={() => setMobileOpen(false)}>🏠 Accueil</MobileLink>
              <MobileLink href="/store/coques" onClick={() => setMobileOpen(false)}>📱 Coques personnalisées</MobileLink>
              <MobileLink href="/store/crocs" onClick={() => setMobileOpen(false)}>👟 Crocs customisées</MobileLink>
              <MobileLink href="/store/packs" onClick={() => setMobileOpen(false)}>🔥 Packs duo</MobileLink>
              <MobileLink href="/store/pays" onClick={() => setMobileOpen(false)}>🌍 Tous les pays</MobileLink>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function NavLink({ href, children, badge, hot }: { href: string; children: React.ReactNode; badge?: string; hot?: boolean }) {
  return (
    <Link
      href={href}
      className="relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
    >
      {children}
      {badge && (
        <span className="text-[10px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded-md">{badge}</span>
      )}
      {hot && (
        <span className="badge-hot text-white px-1.5 py-0.5 rounded-md">HOT</span>
      )}
    </Link>
  );
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
    >
      {children}
    </Link>
  );
}
