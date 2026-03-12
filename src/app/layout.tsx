import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeadGen AI — Générez des leads qualifiés automatiquement",
  description:
    "Trouvez des entreprises et contacts dans 16 pays. Emails vérifiés, prospection IA, campagnes automatiques. Le SaaS de génération de leads tout-en-un.",
  keywords: "leads, prospection, scraping, email, B2B, CRM, marketing",
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
