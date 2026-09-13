import { Header } from "@/components/marketplace/header";
import { Footer } from "@/components/marketplace/footer";

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mp min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
