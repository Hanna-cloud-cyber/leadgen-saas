import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — Sculptia",
  description: "Comment Sculptia collecte, utilise et protège vos informations personnelles.",
};

export default function PrivacyPolicyPage() {
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
          Politique de Confidentialité
        </h1>
        <p className="text-sm text-neutral-400 mb-8">Dernière mise à jour : 20 Septembre 2026</p>

        <div className="space-y-6 text-[15px] text-neutral-700 leading-relaxed">
          <p>
            La présente Politique de confidentialité explique comment Sculptia collecte, utilise
            et protège les informations personnelles des utilisateurs de sa boutique en ligne.
          </p>
          <p>
            En utilisant notre site ou en passant une commande, vous reconnaissez avoir pris
            connaissance de la présente politique.
          </p>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">1. Informations que nous collectons</h2>
            <p>
              Lorsque vous utilisez notre boutique ou effectuez un achat, nous pouvons collecter
              certaines informations personnelles, notamment :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>nom et prénom ;</li>
              <li>adresse postale ;</li>
              <li>adresse de livraison ;</li>
              <li>adresse e-mail ;</li>
              <li>numéro de téléphone ;</li>
              <li>informations relatives à votre commande ;</li>
              <li>informations de paiement traitées par nos prestataires de paiement ;</li>
              <li>adresse IP ;</li>
              <li>informations relatives à votre appareil et à votre navigateur ;</li>
              <li>données de navigation et d&rsquo;utilisation du site.</li>
            </ul>
            <p className="mt-3">
              Nous ne recevons pas nécessairement l&rsquo;intégralité de vos informations
              bancaires, celles-ci pouvant être traitées directement par des prestataires de
              paiement sécurisés.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">2. Utilisation de vos informations</h2>
            <p>Nous pouvons utiliser vos informations personnelles afin de :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>traiter et expédier vos commandes ;</li>
              <li>gérer les paiements ;</li>
              <li>vous envoyer des confirmations de commande et des informations de livraison ;</li>
              <li>répondre à vos demandes ;</li>
              <li>assurer le service client ;</li>
              <li>prévenir les fraudes et abus ;</li>
              <li>améliorer notre boutique, nos produits et nos services ;</li>
              <li>respecter nos obligations légales ;</li>
              <li>
                vous envoyer des communications commerciales lorsque cela est autorisé et,
                lorsque nécessaire, avec votre consentement.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">3. Shopify et prestataires tiers</h2>
            <p>Notre boutique est exploitée à l&rsquo;aide de la plateforme Shopify.</p>
            <p className="mt-3">
              Certaines données peuvent être traitées par Shopify et par des prestataires tiers
              nécessaires au fonctionnement de notre boutique, notamment les services de
              paiement, de livraison, d&rsquo;analyse et de communication.
            </p>
            <p className="mt-3">
              Ces prestataires peuvent traiter certaines informations personnelles uniquement
              dans le cadre des services qu&rsquo;ils nous fournissent et conformément à leurs
              propres politiques de confidentialité.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">4. Paiements</h2>
            <p>
              Les paiements effectués sur notre boutique sont traités par des prestataires de
              paiement sécurisés.
            </p>
            <p className="mt-3">
              Les informations de paiement peuvent être collectées et traitées directement par
              ces prestataires selon leurs propres conditions et politiques de confidentialité.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">5. Cookies</h2>
            <p>
              Notre site peut utiliser des cookies et technologies similaires afin d&rsquo;assurer
              son fonctionnement et d&rsquo;améliorer l&rsquo;expérience utilisateur.
            </p>
            <p className="mt-3">Ces technologies peuvent notamment être utilisées pour :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>mémoriser le contenu de votre panier ;</li>
              <li>maintenir certaines préférences ;</li>
              <li>analyser l&rsquo;utilisation du site ;</li>
              <li>mesurer les performances de notre boutique ;</li>
              <li>proposer, lorsque cela est autorisé, du contenu ou de la publicité personnalisée.</li>
            </ul>
            <p className="mt-3">
              Selon votre lieu de résidence et la réglementation applicable, votre consentement
              peut être demandé avant l&rsquo;utilisation de certains cookies non essentiels.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">6. Partage des informations</h2>
            <p>Nous ne vendons pas vos informations personnelles.</p>
            <p className="mt-3">
              Nous pouvons toutefois partager certaines données avec des prestataires nécessaires
              à notre activité, notamment :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Shopify ;</li>
              <li>prestataires de paiement ;</li>
              <li>transporteurs et partenaires logistiques ;</li>
              <li>services d&rsquo;hébergement ;</li>
              <li>outils de service client ;</li>
              <li>outils d&rsquo;analyse et de mesure d&rsquo;audience ;</li>
              <li>autorités compétentes lorsque la loi nous y oblige.</li>
            </ul>
            <p className="mt-3">
              Nous limitons ce partage aux informations nécessaires à la fourniture des services
              concernés.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">7. Conservation des données</h2>
            <p>
              Nous conservons vos informations personnelles pendant la durée nécessaire à la
              gestion de votre commande, à la fourniture de nos services et au respect de nos
              obligations légales.
            </p>
            <p className="mt-3">
              La durée de conservation peut varier selon la nature des données et les
              obligations juridiques applicables.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">8. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures raisonnables destinées à protéger les
              informations personnelles contre la perte, l&rsquo;utilisation abusive, l&rsquo;accès
              non autorisé, la modification ou la divulgation.
            </p>
            <p className="mt-3">
              Toutefois, aucune transmission de données sur Internet ne peut être garantie comme
              totalement sécurisée.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">9. Vos droits</h2>
            <p>
              Selon la législation applicable à votre situation, vous pouvez disposer de certains
              droits concernant vos données personnelles, notamment :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>demander l&rsquo;accès à vos données ;</li>
              <li>demander leur rectification ;</li>
              <li>demander leur suppression dans certaines situations ;</li>
              <li>demander la limitation de leur traitement ;</li>
              <li>vous opposer à certains traitements ;</li>
              <li>retirer votre consentement lorsqu&rsquo;un traitement repose sur celui-ci ;</li>
              <li>demander, lorsque cela est applicable, la portabilité de certaines données.</li>
            </ul>
            <p className="mt-3">
              Pour exercer vos droits, vous pouvez nous contacter à l&rsquo;adresse indiquée
              ci-dessous.
            </p>
            <p className="mt-3">
              Nous pouvons demander certaines informations permettant de vérifier votre identité
              avant de traiter votre demande.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">10. Communications commerciales</h2>
            <p>
              Si vous acceptez de recevoir nos communications commerciales, nous pouvons vous
              envoyer des offres, nouveautés ou informations relatives à Sculptia.
            </p>
            <p className="mt-3">
              Vous pouvez vous désabonner à tout moment en utilisant le lien de désinscription
              présent dans nos e-mails ou en nous contactant directement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">11. Mineurs</h2>
            <p>
              Notre boutique n&rsquo;est pas destinée à collecter volontairement des données
              personnelles concernant des enfants lorsqu&rsquo;une autorisation parentale est
              légalement requise.
            </p>
            <p className="mt-3">
              Si vous pensez qu&rsquo;un mineur nous a transmis des informations personnelles de
              manière inappropriée, veuillez nous contacter.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">12. Transferts internationaux de données</h2>
            <p>
              Dans le cadre de l&rsquo;utilisation de Shopify et de certains prestataires
              techniques, vos informations peuvent être traitées ou stockées dans des pays
              différents de votre pays de résidence.
            </p>
            <p className="mt-3">
              Lorsque la législation l&rsquo;exige, des mécanismes appropriés peuvent être
              utilisés afin d&rsquo;encadrer ces transferts de données.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">13. Liens vers des sites tiers</h2>
            <p>Notre site peut contenir des liens vers des sites exploités par des tiers.</p>
            <p className="mt-3">
              Nous ne sommes pas responsables des pratiques de confidentialité de ces sites. Nous
              vous invitons à consulter leurs propres politiques avant de leur transmettre des
              informations personnelles.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">14. Modification de la présente politique</h2>
            <p>
              Nous pouvons mettre à jour la présente Politique de confidentialité afin de tenir
              compte de changements concernant nos services, nos pratiques ou les obligations
              légales applicables.
            </p>
            <p className="mt-3">La version la plus récente sera publiée sur cette page.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#161616] mt-8 mb-3">15. Contact</h2>
            <p>
              Pour toute question concernant cette Politique de confidentialité ou
              l&rsquo;utilisation de vos données personnelles, vous pouvez nous contacter à :
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
