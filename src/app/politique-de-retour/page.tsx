import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de retour et de remboursement — Sculptia",
  description: "Conditions de retour, procédure et remboursements pour votre commande Sculptia.",
};

export default function ReturnPolicyPage() {
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
        <h1 className="text-2xl sm:text-3xl font-black uppercase mb-8">
          Politique de retour et de remboursement
        </h1>

        <div className="space-y-6 text-[15px] text-neutral-700 leading-relaxed">
          <p>
            Nous souhaitons que vous soyez pleinement satisfait(e) de votre commande. Si
            toutefois vous n&rsquo;êtes pas satisfait(e) de votre achat, vous disposez d&rsquo;un
            délai de 14 jours à compter de la réception de votre commande pour demander un
            retour.
          </p>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Conditions de retour</h2>
            <p>Pour être accepté, le produit doit :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Être inutilisé et en parfait état.</li>
              <li>Être retourné dans son emballage d&rsquo;origine, lorsque celui-ci est disponible.</li>
              <li>Ne présenter aucune trace d&rsquo;utilisation, de détérioration ou de lavage.</li>
              <li>Être accompagné de votre numéro de commande.</li>
            </ul>
            <p className="mt-3">
              Certains produits peuvent être exclus du droit de retour pour des raisons
              d&rsquo;hygiène ou de protection de la santé lorsqu&rsquo;ils ont été ouverts après
              livraison.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Comment effectuer un retour ?</h2>
            <p>Pour demander un retour, contactez-nous à notre adresse e-mail de service client en indiquant :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Votre nom et prénom</li>
              <li>Votre numéro de commande</li>
              <li>Le ou les produits concernés</li>
              <li>Le motif de votre demande de retour</li>
            </ul>
            <p className="mt-3">
              Notre service client vous indiquera ensuite la procédure à suivre et l&rsquo;adresse
              à laquelle retourner votre colis.
            </p>
            <p className="mt-3">
              Les retours envoyés sans demande préalable peuvent ne pas être acceptés.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Frais de retour</h2>
            <p>
              Les frais d&rsquo;expédition liés au retour sont à la charge du client, sauf en cas
              de produit défectueux, endommagé à la réception ou d&rsquo;erreur de notre part.
            </p>
            <p className="mt-3">
              Nous vous recommandons d&rsquo;utiliser un service d&rsquo;expédition permettant de
              suivre votre colis. Nous ne pouvons être tenus responsables des colis retournés qui
              ne nous parviennent pas.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Remboursements</h2>
            <p>
              Une fois le produit retourné et contrôlé, nous vous confirmerons l&rsquo;acceptation
              ou le refus du remboursement.
            </p>
            <p className="mt-3">
              En cas d&rsquo;acceptation, le remboursement sera effectué sur le moyen de paiement
              utilisé lors de la commande.
            </p>
            <p className="mt-3">
              Le remboursement sera effectué dans les meilleurs délais et au plus tard dans les
              délais prévus par la réglementation applicable.
            </p>
            <p className="mt-3">
              Les éventuels frais de livraison supplémentaires résultant du choix d&rsquo;un mode
              de livraison plus coûteux que le mode de livraison standard proposé ne sont pas
              remboursables.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">
              Produit défectueux ou erreur de commande
            </h2>
            <p>
              Si vous recevez un produit défectueux, endommagé ou qui ne correspond pas à votre
              commande, contactez-nous dans les meilleurs délais avec des photos du produit et de
              son emballage.
            </p>
            <p className="mt-3">
              Après vérification, nous vous proposerons une solution adaptée, pouvant inclure un
              remplacement ou un remboursement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Échanges</h2>
            <p>
              Nous ne proposons pas systématiquement d&rsquo;échange direct. Si vous souhaitez
              changer de produit ou de taille, nous pouvons vous inviter à retourner l&rsquo;article
              concerné et à passer une nouvelle commande.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Droit de rétractation</h2>
            <p>
              Conformément à la réglementation applicable aux consommateurs, vous disposez en
              principe d&rsquo;un droit de rétractation de 14 jours à compter de la réception de
              votre commande, sans avoir à justifier votre décision.
            </p>
            <p className="mt-3">
              Certaines exceptions légales peuvent toutefois s&rsquo;appliquer, notamment pour
              certains produits descellés qui ne peuvent être retournés pour des raisons
              d&rsquo;hygiène ou de protection de la santé.
            </p>
            <p className="mt-3">
              Pour exercer votre droit de rétractation, contactez notre service client dans le
              délai prévu et suivez les instructions qui vous seront communiquées.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">Contact</h2>
            <p>
              Pour toute question concernant un retour ou un remboursement, veuillez contacter
              notre service client à l&rsquo;adresse indiquée sur notre site.
            </p>
          </section>

          <p className="text-sm text-neutral-400 mt-10">
            Cette politique peut être mise à jour à tout moment afin de refléter les évolutions
            de nos services ou de la réglementation applicable.
          </p>
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
