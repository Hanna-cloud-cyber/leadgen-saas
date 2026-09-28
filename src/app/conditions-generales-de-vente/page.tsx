import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales de vente — Sculptia",
  description: "Conditions générales de vente de la boutique Sculptia.",
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
        <h1 className="text-2xl sm:text-3xl font-black uppercase mb-2">Conditions générales de vente</h1>
        <p className="text-sm text-neutral-400 mb-8">Dernière mise à jour : 20 Septembre 2026</p>

        <div className="space-y-6 text-[15px] text-neutral-700 leading-relaxed">
          <p>
            Les présentes Conditions générales de vente régissent les commandes effectuées sur la
            boutique en ligne Sculptia.
          </p>
          <p>
            En passant une commande sur notre site, le client reconnaît avoir pris connaissance
            des présentes conditions et les accepter.
          </p>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">1. Produits</h2>
            <p>
              Nous nous efforçons de présenter nos produits de manière aussi fidèle et précise
              que possible.
            </p>
            <p className="mt-3">
              Les photographies, couleurs, dimensions et illustrations présentées sur le site sont
              fournies à titre indicatif. De légères différences peuvent exister entre les images
              présentées et le produit reçu.
            </p>
            <p className="mt-3">Les produits sont proposés dans la limite des stocks disponibles.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">2. Prix</h2>
            <p>Les prix applicables sont ceux affichés sur notre boutique au moment de la commande.</p>
            <p className="mt-3">
              Les éventuels frais de livraison ou autres frais supplémentaires sont indiqués au
              client avant la validation définitive de la commande.
            </p>
            <p className="mt-3">
              Nous nous réservons le droit de modifier nos prix à tout moment. Toute commande déjà
              validée conserve toutefois le prix applicable au moment de son achat.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">3. Commandes</h2>
            <p>
              Le client est responsable de l&rsquo;exactitude des informations renseignées lors de
              sa commande, notamment son nom, son adresse de livraison et ses coordonnées.
            </p>
            <p className="mt-3">
              Après validation du paiement, un e-mail de confirmation peut être envoyé au client.
            </p>
            <p className="mt-3">
              Nous nous réservons le droit de refuser ou d&rsquo;annuler une commande notamment en
              cas de :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>suspicion de fraude ;</li>
              <li>paiement refusé ou non validé ;</li>
              <li>erreur manifeste concernant le prix ou les informations du produit ;</li>
              <li>indisponibilité du produit ;</li>
              <li>informations de commande incorrectes ou incomplètes.</li>
            </ul>
            <p className="mt-3">
              En cas d&rsquo;annulation d&rsquo;une commande déjà payée, le remboursement sera
              effectué conformément aux règles applicables.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">4. Paiement</h2>
            <p>
              Le paiement est effectué au moment de la commande par l&rsquo;intermédiaire des
              moyens de paiement proposés sur notre boutique.
            </p>
            <p className="mt-3">
              Les transactions peuvent être traitées par des prestataires de paiement tiers
              sécurisés.
            </p>
            <p className="mt-3">
              Nous n&rsquo;avons pas nécessairement accès à l&rsquo;intégralité des informations
              bancaires utilisées lors de la transaction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">5. Livraison</h2>
            <p>Les commandes sont expédiées à l&rsquo;adresse indiquée par le client lors de son achat.</p>
            <p className="mt-3">
              Les délais de préparation et de livraison sont précisés dans notre{" "}
              <Link href="/politiques-expedition" className="underline underline-offset-2">
                Politique d&rsquo;expédition
              </Link>
              .
            </p>
            <p className="mt-3">
              Les délais annoncés sont des estimations et peuvent varier en raison du
              transporteur, de la destination, des formalités douanières, des périodes de forte
              activité ou d&rsquo;autres circonstances indépendantes de notre volonté.
            </p>
            <p className="mt-3">Le client doit vérifier son adresse avant de confirmer sa commande.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">6. Retours et remboursements</h2>
            <p>
              Les demandes de retour, d&rsquo;échange ou de remboursement sont traitées
              conformément à notre{" "}
              <Link href="/politique-de-retour" className="underline underline-offset-2">
                Politique de remboursement
              </Link>
              .
            </p>
            <p className="mt-3">
              Lorsque la législation applicable accorde au client un droit de rétractation,
              celui-ci reste pleinement applicable.
            </p>
            <p className="mt-3">
              Les produits retournés doivent respecter les conditions indiquées dans notre
              Politique de remboursement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">7. Produits défectueux ou endommagés</h2>
            <p>
              Si un produit est reçu endommagé, défectueux ou incorrect, le client doit nous
              contacter dès que possible.
            </p>
            <p className="mt-3">
              Nous pouvons demander le numéro de commande ainsi que des photographies permettant
              de constater le problème.
            </p>
            <p className="mt-3">
              Après examen de la demande, une solution appropriée pourra être proposée, par
              exemple un remplacement ou un remboursement, selon les circonstances et les règles
              applicables.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">8. Disponibilité</h2>
            <p>Tous les produits sont proposés sous réserve de disponibilité.</p>
            <p className="mt-3">
              Si un produit devient indisponible après la validation d&rsquo;une commande, nous
              pouvons annuler tout ou partie de celle-ci et rembourser le montant correspondant.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">9. Promotions et codes de réduction</h2>
            <p>Les promotions et codes de réduction peuvent être soumis à des conditions particulières.</p>
            <p className="mt-3">
              Sauf indication contraire, plusieurs codes promotionnels ne peuvent pas
              nécessairement être cumulés.
            </p>
            <p className="mt-3">
              Nous nous réservons le droit de modifier ou de mettre fin à une offre promotionnelle
              conformément aux conditions annoncées.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">10. Utilisation des produits</h2>
            <p>
              Le client est responsable de l&rsquo;utilisation des produits conformément à leur
              destination et aux éventuelles instructions fournies.
            </p>
            <p className="mt-3">
              Sculptia ne peut être tenue responsable d&rsquo;une mauvaise utilisation d&rsquo;un
              produit, sous réserve des responsabilités qui ne peuvent légalement être exclues ou
              limitées.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">11. Propriété intellectuelle</h2>
            <p>
              Les textes, images, logos, graphismes, photographies et autres contenus présents
              sur notre boutique sont protégés par les règles applicables en matière de propriété
              intellectuelle.
            </p>
            <p className="mt-3">
              Toute reproduction ou exploitation non autorisée est interdite, sauf lorsque la loi
              l&rsquo;autorise.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">12. Données personnelles</h2>
            <p>
              Les informations personnelles recueillies dans le cadre des commandes et de
              l&rsquo;utilisation du site sont traitées conformément à notre{" "}
              <Link href="/politique-de-confidentialite" className="underline underline-offset-2">
                Politique de confidentialité
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">13. Responsabilité</h2>
            <p>
              Nous nous efforçons d&rsquo;assurer le bon fonctionnement de notre boutique et
              l&rsquo;exactitude des informations qui y sont présentées.
            </p>
            <p className="mt-3">
              Notre responsabilité ne peut être exclue ou limitée lorsqu&rsquo;une telle exclusion
              ou limitation est interdite par la législation applicable.
            </p>
            <p className="mt-3">
              Les droits obligatoires accordés aux consommateurs restent applicables.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">14. Modification des conditions</h2>
            <p>
              Nous pouvons modifier les présentes Conditions générales de vente afin de tenir
              compte de changements relatifs à nos produits, nos services, notre activité ou à la
              réglementation applicable.
            </p>
            <p className="mt-3">
              La version applicable à une commande est celle en vigueur au moment de sa
              validation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">15. Droit applicable et litiges</h2>
            <p>
              En cas de désaccord concernant une commande, le client est invité à nous contacter
              afin de rechercher une solution amiable.
            </p>
            <p className="mt-3">
              Les présentes conditions sont soumises aux règles légales applicables, sans priver
              le consommateur des protections impératives dont il bénéficie dans son pays de
              résidence lorsque celles-ci s&rsquo;appliquent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">16. Contact</h2>
            <p>
              Pour toute question relative à une commande ou aux présentes Conditions générales de
              vente, vous pouvez nous contacter à l&rsquo;adresse suivante :
            </p>
            <p className="mt-3">
              Sculptia
              <br />
              E-mail : sculptiapro@gmail.com
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
