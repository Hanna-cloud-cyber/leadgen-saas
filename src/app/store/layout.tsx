import type { Metadata } from "next";
import { CartProvider } from "@/lib/store/cart-context";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

export const metadata: Metadata = {
  title: "Football Jersey — Coupe du Monde 2026™ Official Merch",
  description:
    "Coques personnalisées et Crocs customisées aux couleurs des 32 nations de la Coupe du Monde 2026. Livraison gratuite dès 50€.",
  keywords: "football jersey, coupe du monde 2026, coques, crocs, drapeaux, world cup",
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
