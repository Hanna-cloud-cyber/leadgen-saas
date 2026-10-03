import type { Metadata } from "next";
import { Cinzel, Montserrat, Oswald } from "next/font/google";
import { AnnouncementBar, Footer, Header } from "@/components/SiteChrome";
import { store } from "@/data";
import "./globals.css";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-cinzel" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-montserrat" });
const oswald = Oswald({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-oswald" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${store.brandName} · ${store.productName}`,
    template: `%s · ${store.brandName}`,
  },
  description:
    "Discover your archetype and unlock your feminine power. 30 archetypes, psychological insights, practical guidance, and a self-discovery test — instant digital download.",
  openGraph: {
    title: store.productName,
    description: "Discover your archetype and unlock your feminine power.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${montserrat.variable} ${oswald.variable}`}>
      <body className="antialiased min-h-screen">
        <AnnouncementBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
