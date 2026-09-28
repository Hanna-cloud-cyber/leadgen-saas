import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique d'expédition — Sculptia",
  description: "Délais de traitement, livraison, suivi de commande et droits de douane pour votre commande Sculptia.",
};

export default function ShippingPolicyPage() {
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
        <h1 className="text-2xl sm:text-3xl font-black uppercase mb-2">Politique d&rsquo;expédition</h1>
        <p className="text-sm text-neutral-400 mb-8">Dernière mise à jour : 20 Septembre 2026</p>

        <div className="space-y-6 text-[15px] text-neutral-700 leading-relaxed">
          <p>
            Nous faisons notre maximum pour traiter et expédier les commandes dans les meilleurs
            délais.
          </p>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Traitement des commandes</h2>
            <p>
              Les commandes sont généralement préparées sous 1 à 3 jours ouvrés après
              confirmation du paiement.
            </p>
            <p className="mt-3">
              Les commandes passées pendant les week-ends ou jours fériés peuvent être traitées le
              jour ouvré suivant.
            </p>
            <p className="mt-3">
              Pendant les périodes de forte demande, le délai de traitement peut
              exceptionnellement être prolongé.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Délais de livraison</h2>
            <p>Les délais de livraison peuvent varier selon la destination.</p>
            <p className="mt-3">À titre indicatif :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>France : environ 5 à 10 jours ouvrés</li>
              <li>Europe : environ 5 à 15 jours ouvrés</li>
              <li>International : environ 7 à 20 jours ouvrés</li>
            </ul>
            <p className="mt-3">
              Ces délais sont des estimations et peuvent varier en fonction du transporteur, des
              contrôles douaniers, de la destination ou d&rsquo;autres circonstances indépendantes
              de notre volonté.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Frais de livraison</h2>
            <p>
              Les frais de livraison sont indiqués lors du passage de la commande, avant le
              paiement.
            </p>
            <p className="mt-3">
              Nous pouvons également proposer la livraison gratuite sur certaines commandes ou
              pendant certaines offres promotionnelles.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Suivi de commande</h2>
            <p>
              Lorsqu&rsquo;un numéro de suivi est disponible, il est envoyé au client par e-mail
              après l&rsquo;expédition de la commande.
            </p>
            <p className="mt-3">
              Veuillez noter qu&rsquo;un délai peut être nécessaire avant que les informations de
              suivi soient mises à jour par le transporteur.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Adresse de livraison</h2>
            <p>
              Le client est responsable de vérifier l&rsquo;exactitude de son adresse de
              livraison avant de valider sa commande.
            </p>
            <p className="mt-3">
              Nous ne pouvons garantir la modification d&rsquo;une adresse une fois la commande
              traitée ou expédiée.
            </p>
            <p className="mt-3">
              En cas d&rsquo;adresse incorrecte ou incomplète fournie par le client, des frais
              supplémentaires peuvent s&rsquo;appliquer pour une nouvelle expédition.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Retards de livraison</h2>
            <p>
              Des retards peuvent survenir en raison de circonstances indépendantes de notre
              volonté, notamment :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>retards du transporteur ;</li>
              <li>périodes de forte activité ;</li>
              <li>conditions météorologiques ;</li>
              <li>contrôles douaniers ;</li>
              <li>jours fériés ;</li>
              <li>événements exceptionnels.</li>
            </ul>
            <p className="mt-3">
              Un retard de livraison ne signifie pas nécessairement que la commande est perdue.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Colis perdu ou non reçu</h2>
            <p>
              Si votre commande n&rsquo;a pas été reçue dans un délai raisonnable après la date de
              livraison estimée, veuillez nous contacter.
            </p>
            <p className="mt-3">
              Nous examinerons la situation avec le transporteur afin de déterminer la solution
              appropriée.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Colis endommagé</h2>
            <p>
              Si votre colis arrive endommagé, veuillez nous contacter dès que possible en
              fournissant votre numéro de commande ainsi que des photos du colis et du produit
              concerné.
            </p>
            <p className="mt-3">Nous examinerons votre demande et proposerons une solution adaptée.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Droits de douane et taxes</h2>
            <p>
              Pour les commandes internationales, des droits de douane, taxes d&rsquo;importation
              ou autres frais peuvent être appliqués par les autorités du pays de destination.
            </p>
            <p className="mt-3">
              Ces frais éventuels sont à la charge du client, sauf indication contraire.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Contact</h2>
            <p>
              Pour toute question concernant votre livraison, vous pouvez nous contacter via les
              coordonnées disponibles sur notre boutique.
            </p>
            <p className="mt-3">
              Adresse de contact :
              <br />
              1234 Sunset Avenue
              <br />
              Miami, FL 33101
              <br />
              United States
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
