import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.veridian.com"),
  title: {
    default: "Veridian — The Global B2B Sourcing Marketplace",
    template: "%s | Veridian",
  },
  description:
    "Source products from 10,000+ verified manufacturers, wholesalers and distributors across 120+ countries. Compare suppliers, request quotes and build your next product with confidence.",
  keywords: [
    "B2B marketplace",
    "verified suppliers",
    "manufacturers",
    "wholesale suppliers",
    "private label",
    "global sourcing",
    "RFQ",
  ],
  openGraph: {
    title: "Veridian — The Global B2B Sourcing Marketplace",
    description:
      "Discover verified manufacturers, wholesalers and distributors worldwide. Compare, request quotes and source smarter.",
    type: "website",
    siteName: "Veridian",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veridian — The Global B2B Sourcing Marketplace",
    description:
      "Discover verified manufacturers, wholesalers and distributors worldwide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>{children}</body>
    </html>
  );
}
