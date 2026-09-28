import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales — Sculptia",
  description: "Éditeur et hébergeur du site Sculptia.",
};

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen bg-white text-[#161616] font-sans">
      <header className="border-b border-neutral-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/" className="text-xl font-black tracking-[0.3em]">
            SCULPTIA
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-2xl sm:text-3xl font-black uppercase mb-2">Mentions légales</h1>
        <p className="text-sm text-neutral-400 mb-8">Dernière mise à jour : 20 Septembre 2026</p>

        <div className="space-y-6 text-[15px] text-neutral-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Éditeur du site</h2>
            <p>Le présent site internet est édité par :</p>
            <p className="mt-3">Nom commercial : Sculptia</p>
            <p className="mt-3">
              Adresse :
              <br />
              1234 Sunset Avenue
              <br />
              Miami, FL 33101
              <br />
              United States
            </p>
            <p className="mt-3">Téléphone : +1 (202) 555-0147</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Hébergement du site</h2>
            <p>Le site est exploité à l&rsquo;aide de la plateforme Shopify.</p>
            <p className="mt-3">
              Hébergeur / fournisseur de plateforme :
              <br />
              Shopify Inc.
              <br />
              151 O&rsquo;Connor Street, Ground Floor
              <br />
              Ottawa, Ontario K2P 2L8
              <br />
              Canada
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="inline-block mt-12 text-sm font-semibold underline underline-offset-2 text-neutral-600 hover:text-neutral-900"
        >
          ← Retour à la boutique
        </Link>
      </main>
    </div>
  );
}
