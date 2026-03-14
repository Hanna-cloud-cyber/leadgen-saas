import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QTP Abayas — Élégance & Modestie",
  description:
    "Découvrez notre collection exclusive d'abayas de luxe. Designs modernes, tissus premium, livraison mondiale. QTP Abayas — L'élégance au quotidien.",
  keywords: "abayas, mode modeste, hijab, robe islamique, abaya luxe, mode femme musulmane, QTP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
