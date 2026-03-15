"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart-context";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 glass border-b border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/store" className="flex items-center gap-3 group">
            <span className="text-2xl">⚽</span>
            <div>
              <span className="text-lg font-bold gradient-text">WorldCup Shop</span>
              <span className="hidden sm:inline text-xs text-gray-500 ml-2">2026 🇺🇸🇲🇽🇨🇦</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/store" className="text-sm text-gray-300 hover:text-accent transition-colors">
              Accueil
            </Link>
            <Link href="/store/coques" className="text-sm text-gray-300 hover:text-accent transition-colors">
              📱 Coques
            </Link>
            <Link href="/store/crocs" className="text-sm text-gray-300 hover:text-accent transition-colors">
              👟 Crocs
            </Link>
            <Link href="/store/pays" className="text-sm text-gray-300 hover:text-accent transition-colors">
              🌍 Pays
            </Link>
          </nav>

          {/* Cart */}
          <Link
            href="/store/panier"
            className="relative flex items-center gap-2 bg-card-bg border border-card-border rounded-full px-4 py-2 hover:border-accent transition-colors"
          >
            <span className="text-lg">🛒</span>
            <span className="text-sm text-gray-300">Panier</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-light text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center gap-4 pb-3 overflow-x-auto">
          <Link href="/store" className="text-xs text-gray-400 hover:text-accent whitespace-nowrap">Accueil</Link>
          <Link href="/store/coques" className="text-xs text-gray-400 hover:text-accent whitespace-nowrap">📱 Coques</Link>
          <Link href="/store/crocs" className="text-xs text-gray-400 hover:text-accent whitespace-nowrap">👟 Crocs</Link>
          <Link href="/store/pays" className="text-xs text-gray-400 hover:text-accent whitespace-nowrap">🌍 Pays</Link>
        </nav>
      </div>
    </header>
  );
}
