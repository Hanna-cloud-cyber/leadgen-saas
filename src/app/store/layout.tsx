import type { Metadata } from "next";
import { CartProvider } from "@/lib/store/cart-context";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

export const metadata: Metadata = {
  title: "WorldCup Shop 2026 — Coques & Crocs personnalisées",
  description:
    "Boutique officieuse Coupe du Monde 2026. Coques de téléphone avec drapeaux personnalisés et Crocs customisées avec stickers pays. 32 équipes disponibles !",
  keywords:
    "coupe du monde 2026, coques personnalisées, crocs stickers, drapeaux, world cup, football, merchandising",
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
