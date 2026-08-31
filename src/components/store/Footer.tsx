import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-bg text-white mt-20">
      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-black uppercase tracking-tight mb-4">
              Football <span className="text-accent">Jersey</span>
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Coques personnalisées et Crocs customisées aux couleurs des 32 nations de la Coupe du Monde 2026.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Boutique</h4>
            <ul className="space-y-3">
              <FooterLink href="/store/coques">Coques personnalisées</FooterLink>
              <FooterLink href="/store/crocs">Crocs customisées</FooterLink>
              <FooterLink href="/store/packs">Packs duo</FooterLink>
              <FooterLink href="/store/pays">Shop by Nation</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Support</h4>
            <ul className="space-y-3">
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Guide des tailles</FooterLink>
              <FooterLink href="#">Suivi de commande</FooterLink>
              <FooterLink href="#">Contactez-nous</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Informations</h4>
            <ul className="space-y-3">
              <FooterLink href="#">Conditions générales</FooterLink>
              <FooterLink href="#">Politique de confidentialité</FooterLink>
              <FooterLink href="#">Politique de retour</FooterLink>
              <FooterLink href="#">Mentions légales</FooterLink>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © 2026 Football Jersey. Non affilié à la FIFA. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  );
}
