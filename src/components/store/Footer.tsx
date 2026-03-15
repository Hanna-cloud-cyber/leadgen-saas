import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-card-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚽</span>
              <span className="text-lg font-bold gradient-text">WorldCup Shop 2026</span>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              Coques de téléphone personnalisées et Crocs customisées aux couleurs des 32 équipes
              de la Coupe du Monde 2026. Représente ton pays avec style ! 🇺🇸🇲🇽🇨🇦
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-accent mb-4">Produits</h3>
            <ul className="space-y-2">
              <li><Link href="/store/coques" className="text-sm text-gray-400 hover:text-white transition-colors">📱 Coques personnalisées</Link></li>
              <li><Link href="/store/crocs" className="text-sm text-gray-400 hover:text-white transition-colors">👟 Crocs avec stickers</Link></li>
              <li><Link href="/store/pays" className="text-sm text-gray-400 hover:text-white transition-colors">🌍 Tous les pays</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-accent mb-4">Informations</h3>
            <ul className="space-y-2">
              <li><span className="text-sm text-gray-400">🚚 Livraison gratuite dès 50€</span></li>
              <li><span className="text-sm text-gray-400">↩️ Retours sous 30 jours</span></li>
              <li><span className="text-sm text-gray-400">🔒 Paiement sécurisé</span></li>
              <li><span className="text-sm text-gray-400">📦 Expédition sous 48h</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-card-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2026 WorldCup Shop. Site non affilié à la FIFA. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">🏆 Coupe du Monde 2026 — USA • Mexique • Canada</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
