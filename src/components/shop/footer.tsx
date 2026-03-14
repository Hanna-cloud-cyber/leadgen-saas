import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--black-soft)] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center text-white text-sm font-bold">
                QTP
              </div>
              <div>
                <h3 className="font-bold tracking-wide">QTP Abayas</h3>
                <p className="text-[10px] text-[var(--gold-light)] tracking-[0.2em] uppercase">Elegance & Modestie</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Des abayas de qualité premium pour la femme moderne. Élégance, confort et modestie au quotidien.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-[var(--gold-light)]">Boutique</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/boutique" className="hover:text-white transition-colors">Toutes les abayas</Link></li>
              <li><Link href="/boutique?cat=classique" className="hover:text-white transition-colors">Classiques</Link></li>
              <li><Link href="/boutique?cat=brodee" className="hover:text-white transition-colors">Brodées</Link></li>
              <li><Link href="/boutique?cat=kimono" className="hover:text-white transition-colors">Kimonos</Link></li>
              <li><Link href="/boutique?cat=ensemble" className="hover:text-white transition-colors">Ensembles</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-[var(--gold-light)]">Informations</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Guide des tailles</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Livraison & Retours</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Entretien des tissus</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-[var(--gold-light)]">Nous suivre</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Instagram</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">TikTok</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Facebook</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Pinterest</span></li>
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-3 text-[var(--gold-light)]">Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--gold)]"
                />
                <button className="btn-gold px-4 py-2 rounded-lg text-sm font-medium">OK</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>2024 QTP Abayas. Tous droits reservs.</p>
          <div className="flex gap-6">
            <span className="hover:text-gray-300 cursor-pointer">Mentions lgales</span>
            <span className="hover:text-gray-300 cursor-pointer">Politique de confidentialit</span>
            <span className="hover:text-gray-300 cursor-pointer">CGV</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
