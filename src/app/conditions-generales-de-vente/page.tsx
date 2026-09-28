import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales de Ventes — Sculptia",
  description: "Conditions générales de vente et d'utilisation de la boutique Sculptia.",
};

export default function TermsPage() {
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
        <h1 className="text-2xl sm:text-3xl font-black uppercase mb-2">
          Conditions générales de vente et d&rsquo;utilisation
        </h1>
        <p className="text-sm text-neutral-400 mb-8">Dernière mise à jour : 20 Septembre 2026</p>

        <div className="space-y-6 text-[15px] text-neutral-700 leading-relaxed">
          <p>
            Les présentes conditions générales de vente et d&rsquo;utilisation régissent
            l&rsquo;utilisation de notre boutique en ligne ainsi que les achats effectués sur
            celle-ci.
          </p>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">1. Produits et services</h2>
            <p>
              Nous nous efforçons de présenter les produits disponibles sur notre boutique de
              manière aussi précise que possible.
            </p>
            <p className="mt-3">
              Les photographies, couleurs et illustrations sont présentées à titre indicatif et
              peuvent légèrement différer du produit réel.
            </p>
            <p className="mt-3">
              Nous nous réservons le droit de modifier ou de supprimer certains produits, ainsi
              que de modifier leurs prix, à tout moment.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">2. Prix</h2>
            <p>
              Les prix affichés sur le site sont indiqués en EUR / USD et incluent les taxes
              applicables lorsque cela est indiqué.
            </p>
            <p className="mt-3">
              Les éventuels frais de livraison sont indiqués avant la validation définitive de la
              commande.
            </p>
            <p className="mt-3">
              Nous nous réservons le droit de modifier nos prix à tout moment. Toutefois, les
              produits sont facturés au prix affiché au moment de la validation de la commande.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">3. Commandes</h2>
            <p>
              En passant commande sur notre site, le client confirme l&rsquo;exactitude des
              informations fournies.
            </p>
            <p className="mt-3">
              La commande devient définitive après validation du paiement et réception d&rsquo;un
              e-mail de confirmation.
            </p>
            <p className="mt-3">
              Nous nous réservons le droit de refuser ou d&rsquo;annuler une commande en cas de
              suspicion de fraude, d&rsquo;erreur manifeste de prix ou de problème lié au paiement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">4. Paiement</h2>
            <p>Les moyens de paiement disponibles sont indiqués lors du passage de la commande.</p>
            <p className="mt-3">
              Le paiement doit être effectué intégralement au moment de la commande, sauf
              indication contraire.
            </p>
            <p className="mt-3">
              Les paiements peuvent être traités par des prestataires tiers sécurisés.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">5. Livraison</h2>
            <p>
              Les commandes sont expédiées à l&rsquo;adresse indiquée par le client au moment de
              la commande.
            </p>
            <p className="mt-3">
              Les délais de livraison indiqués sur le site sont des estimations et peuvent varier
              selon la destination, le transporteur ou des circonstances indépendantes de notre
              volonté.
            </p>
            <p className="mt-3">
              Le client est responsable de fournir une adresse de livraison correcte et complète.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">6. Retours et remboursements</h2>
            <p>
              Les conditions de retour et de remboursement sont précisées dans notre{" "}
              <Link href="/politique-de-retour" className="underline underline-offset-2">
                Politique de retour
              </Link>{" "}
              disponible sur le site.
            </p>
            <p className="mt-3">
              Lorsqu&rsquo;un droit de rétractation est applicable conformément à la législation
              en vigueur, le client peut demander un retour dans le délai légal applicable.
            </p>
            <p className="mt-3">
              Certains produits peuvent être exclus des retours lorsque la loi le permet,
              notamment certains produits personnalisés, périssables ou descellés pour des
              raisons d&rsquo;hygiène.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">7. Produits endommagés ou incorrects</h2>
            <p>
              En cas de réception d&rsquo;un produit endommagé, défectueux ou différent de celui
              commandé, le client peut nous contacter via les coordonnées disponibles sur notre
              boutique.
            </p>
            <p className="mt-3">
              Nous examinerons la demande et proposerons une solution appropriée conformément à
              la réglementation applicable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">8. Propriété intellectuelle</h2>
            <p>
              Tous les contenus présents sur le site, notamment les textes, images, logos,
              photographies, graphismes et éléments visuels, sont protégés par les lois relatives
              à la propriété intellectuelle.
            </p>
            <p className="mt-3">
              Ils ne peuvent être copiés, reproduits, modifiés ou exploités sans autorisation
              préalable, sauf lorsque la loi l&rsquo;autorise.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">9. Utilisation du site</h2>
            <p>
              Il est interdit d&rsquo;utiliser notre site à des fins frauduleuses, illégales ou
              susceptibles de porter atteinte au fonctionnement du site ou à des tiers.
            </p>
            <p className="mt-3">
              Nous pouvons suspendre ou limiter l&rsquo;accès au site en cas d&rsquo;utilisation
              abusive ou contraire aux présentes conditions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">10. Données personnelles</h2>
            <p>
              Les données personnelles collectées lors de l&rsquo;utilisation du site ou
              d&rsquo;une commande sont traitées conformément à notre{" "}
              <Link href="/politique-de-confidentialite" className="underline underline-offset-2">
                Politique de confidentialité
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">11. Limitation de responsabilité</h2>
            <p>
              Nous ne pouvons être tenus responsables des dommages résultant d&rsquo;une mauvaise
              utilisation des produits ou d&rsquo;événements indépendants de notre volonté, dans
              les limites autorisées par la législation applicable.
            </p>
            <p className="mt-3">
              Aucune disposition des présentes conditions ne vise à limiter les droits
              obligatoires dont bénéficie le consommateur.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">12. Liens et services tiers</h2>
            <p>Notre boutique peut contenir des liens vers des sites ou services exploités par des tiers.</p>
            <p className="mt-3">
              Nous ne sommes pas responsables du contenu, des pratiques ou des politiques de ces
              sites tiers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">13. Modification des présentes conditions</h2>
            <p>
              Nous pouvons modifier les présentes conditions afin de tenir compte de changements
              concernant notre activité, nos services ou la réglementation applicable.
            </p>
            <p className="mt-3">La version la plus récente est celle publiée sur notre site.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">14. Droit applicable et litiges</h2>
            <p>Les présentes conditions sont régies par la législation applicable.</p>
            <p className="mt-3">
              En cas de litige, les parties sont invitées à rechercher une solution amiable avant
              toute procédure judiciaire.
            </p>
            <p className="mt-3">Les droits légaux obligatoires du consommateur restent applicables.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">15. Contact</h2>
            <p>
              Pour toute question concernant une commande ou les présentes conditions, vous pouvez
              nous contacter via notre formulaire de contact ou nos coordonnées disponibles sur la
              boutique.
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
