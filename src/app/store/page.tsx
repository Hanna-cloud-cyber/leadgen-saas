import Link from "next/link";
import { WORLD_CUP_COUNTRIES, generateProducts, GROUPS } from "@/lib/store/countries";
import ProductCard from "@/components/store/ProductCard";

const FEATURED_CODES = ["fr", "br", "ar", "de", "es", "us", "ma", "jp"];

export default function StorePage() {
  const featuredCountries = WORLD_CUP_COUNTRIES.filter(c => FEATURED_CODES.includes(c.code));
  const featuredProducts = featuredCountries.flatMap(generateProducts);

  return (
    <div>
      {/* Hero */}
      <section className="hero-wc relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in-up opacity-0">
              <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-light text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                🏆 Coupe du Monde 2026 — USA • Mexique • Canada
              </span>
            </div>

            <h1 className="animate-fade-in-up opacity-0 animate-delay-100 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
              Supporte ton équipe{" "}
              <span className="gradient-text">avec style</span>
            </h1>

            <p className="animate-fade-in-up opacity-0 animate-delay-200 mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Coques de téléphone personnalisées avec drapeaux et Crocs customisées
              avec stickers emblématiques de chaque pays. <strong className="text-white">32 équipes disponibles.</strong>
            </p>

            <div className="animate-fade-in-up opacity-0 animate-delay-300 mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/store/coques"
                className="inline-flex items-center justify-center gap-2 bg-accent text-black font-bold px-8 py-3.5 rounded-xl hover:bg-accent-light transition-colors animate-pulse-glow"
              >
                📱 Voir les Coques
              </Link>
              <Link
                href="/store/crocs"
                className="inline-flex items-center justify-center gap-2 bg-card-bg border border-card-border text-white font-bold px-8 py-3.5 rounded-xl hover:border-accent transition-colors"
              >
                👟 Voir les Crocs
              </Link>
            </div>

            {/* Flags parade */}
            <div className="animate-fade-in-up opacity-0 animate-delay-400 mt-12 flex flex-wrap justify-center gap-2">
              {WORLD_CUP_COUNTRIES.map(c => (
                <Link
                  key={c.code}
                  href={`/store/pays/${c.code}`}
                  className="text-2xl hover:scale-125 transition-transform cursor-pointer"
                  title={c.name}
                >
                  {c.flag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-card-border bg-card-bg/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text">32</div>
              <div className="text-sm text-gray-400 mt-1">Équipes</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">64</div>
              <div className="text-sm text-gray-400 mt-1">Produits uniques</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">19,99€</div>
              <div className="text-sm text-gray-400 mt-1">Coques dès</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">48h</div>
              <div className="text-sm text-gray-400 mt-1">Expédition</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Nos collections <span className="gradient-text">World Cup 2026</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Cases */}
          <Link href="/store/coques" className="group">
            <div className="relative bg-card-bg border border-card-border rounded-2xl overflow-hidden p-8 h-64 flex flex-col justify-end hover:border-accent transition-all hover:shadow-lg hover:shadow-accent/10">
              <div className="absolute top-6 right-6 text-7xl opacity-30 group-hover:opacity-60 transition-opacity">
                📱
              </div>
              <div className="absolute top-6 left-6 flex gap-2">
                {["🇫🇷", "🇧🇷", "🇦🇷", "🇩🇪"].map((f, i) => (
                  <span key={i} className="text-3xl animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{f}</span>
                ))}
              </div>
              <h3 className="text-2xl font-bold mb-2">Coques Personnalisées</h3>
              <p className="text-gray-400 text-sm">Drapeau de ton pays + symboles emblématiques. Compatible iPhone & Samsung.</p>
              <span className="mt-3 text-accent font-semibold text-sm group-hover:underline">À partir de 19,99€ →</span>
            </div>
          </Link>

          {/* Crocs */}
          <Link href="/store/crocs" className="group">
            <div className="relative bg-card-bg border border-card-border rounded-2xl overflow-hidden p-8 h-64 flex flex-col justify-end hover:border-accent transition-all hover:shadow-lg hover:shadow-accent/10">
              <div className="absolute top-6 right-6 text-7xl opacity-30 group-hover:opacity-60 transition-opacity">
                👟
              </div>
              <div className="absolute top-6 left-6 flex gap-2">
                {["🇪🇸", "🇯🇵", "🇲🇦", "🇺🇸"].map((f, i) => (
                  <span key={i} className="text-3xl animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{f}</span>
                ))}
              </div>
              <h3 className="text-2xl font-bold mb-2">Crocs Customisées</h3>
              <p className="text-gray-400 text-sm">Stickers drapeau + charms pays avec icônes emblématiques. Du 36 au 45.</p>
              <span className="mt-3 text-accent font-semibold text-sm group-hover:underline">À partir de 49,99€ →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Produits <span className="gradient-text">populaires</span>
          </h2>
          <Link href="/store/pays" className="text-sm text-accent hover:underline">
            Voir tous les pays →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Groups */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Les <span className="gradient-text">8 groupes</span> de la Coupe du Monde
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GROUPS.map(group => {
            const countries = WORLD_CUP_COUNTRIES.filter(c => c.group === group);
            return (
              <div key={group} className="bg-card-bg border border-card-border rounded-xl p-5">
                <h3 className="font-bold text-accent mb-3">Groupe {group}</h3>
                <div className="space-y-2">
                  {countries.map(c => (
                    <Link
                      key={c.code}
                      href={`/store/pays/${c.code}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <span className="text-2xl">{c.flag}</span>
                      <span className="text-sm">{c.name}</span>
                      <div className="ml-auto flex gap-1">
                        {c.icons.slice(0, 2).map((icon, i) => (
                          <span key={i} className="text-sm opacity-50">{icon}</span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative bg-gradient-to-r from-primary/30 to-accent/20 border border-primary/30 rounded-2xl p-8 sm:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 flag-shimmer" />
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              🏆 Prêt pour la Coupe du Monde 2026 ?
            </h2>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Livraison gratuite dès 50€ d&apos;achat. Commande avant le coup d&apos;envoi !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/store/coques"
                className="inline-flex items-center justify-center gap-2 bg-accent text-black font-bold px-8 py-3 rounded-xl hover:bg-accent-light transition-colors"
              >
                📱 Coques — 19,99€
              </Link>
              <Link
                href="/store/crocs"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                👟 Crocs — 49,99€
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
