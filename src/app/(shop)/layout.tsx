"use client";

import Navbar from "@/components/shop/navbar";
import Footer from "@/components/shop/footer";
import { CartProvider } from "@/lib/store/cart-context";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Navbar />
        <main className="flex-1 pt-[73px]">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
