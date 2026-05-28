import Link from "next/link";
import { WORLD_CUP_COUNTRIES, generateProducts, GROUPS } from "@/lib/store/countries";
import ProductCard from "@/components/store/ProductCard";
import Countdown from "@/components/store/Countdown";

const FEATURED_CODES = ["fr", "br", "ar", "de", "es", "us", "ma", "jp"];
const TRENDING_CODES = ["pt", "nl", "jp", "be", "co", "sn"];

export default function StorePage() {
  const featuredCountries = WORLD_CUP_COUNTRIES.filter(c => FEATURED_CODES.includes(c.code));
  const featuredProducts = featuredCountries.flatMap(generateProducts);
  const trendingProducts = WORLD_CUP_COUNTRIES
    .filter(c => TRENDING_CODES.includes(c.code))
    .flatMap(c => generateProducts(c));

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="hero-premium relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 text-8xl opacity-[0.04] animate-float" style={{ animationDelay: "0s" }}>⚽</div>
          <div className="absolute top-40 right-20 text-7xl opacity-[0.04] animate-float" style={{ animationDelay: "1s" }}>🏆</div>
          <div className="absolute bottom-40 left-1/4 text-6xl opacity-[0.04] animate-float" style={{ animationDelay: "2s" }}>🇫🇷</div>
          <div className="absolute bottom-20 right-1/3 text-7xl opacity-[0.04] animate-float" style={{ animationDelay: "1.5s" }}>🇧🇷</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <div className="animate-fade-in-up opacity-0">
                <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                  🏆 Édition limitée 2026
                </span>
              </div>

              <h1 className="animate-fade-in-up opacity-0 animate-delay-100 text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.95] mt-6 tracking-tight">
                Supporte ton<br />
                équipe avec<br />
                <span className="gradient-text">du style.</span>
              </h1>

              <p className="animate-fade-in-up opacity-0 animate-delay-200 mt-6 text-base sm:text-lg text-gray-400 max-w-lg leading-relaxed">
                Coques personnalisées et Crocs customisées aux couleurs des
                <strong className="text-white"> 32 équipes</strong> de la Coupe du Monde.
                Chaque pièce est unique.
              </p>

              <div className="animate-fade-in-up opacity-0 animate-delay-300 mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/store/coques" className="btn-primary px-8 py-4 text-center text-sm animate-pulse-glow">
                  📱 Coques — dès 19,99€
                </Link>
                <Link href="/store/crocs" className="btn-secondary px-8 py-4 text-center text-sm">
                  👟 Crocs — dès 49,99€
                </Link>
              </div>

              {/* Social proof */}
              <div className="animate-fade-in-up opacity-0 animate-delay-400 mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["🇫🇷", "🇧🇷", "🇦🇷", "🇩🇪", "🇪🇸"].map((f, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-card-bg border-2 border-background flex items-center justify-center text-sm">
                      {f}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="stars text-xs">★★★★★</div>
                  <p className="text-[11px] text-muted mt-0.5"><strong className="text-white">2,847+</strong> supporters satisfaits</p>
                </div>
              </div>
            </div>

            {/* Right: Countdown + Featured flags */}
            <div className="flex flex-col items-center lg:items-end gap-8">
              <div className="animate-fade-in-up opacity-0 animate-delay-300 text-center lg:text-right">
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Coup d&apos;envoi dans</p>
                <Countdown />
              </div>

              {/* Flag grid */}
              <div className="animate-fade-in-up opacity-0 animate-delay-400 grid grid-cols-8 gap-2">
                {WORLD_CUP_COUNTRIES.map((c, i) => (
                  <Link
                    key={c.code}
                    href={`/store/pays/${c.code}`}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 flex items-center justify-center text-xl hover:scale-110 transition-all duration-200 hover:bg-white/10"
                    title={c.name}
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    {c.flag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="border-y border-white/5 bg-surface py-3 marquee-container">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {[...Array(2)].flatMap((_, i) =>
            WORLD_CUP_COUNTRIES.map(c => (
              <span key={`${c.code}-${i}`} className="inline-flex items-center gap-2 text-sm text-muted">
                <span className="text-lg">{c.flag}</span>
                <span className="font-medium">{c.name}</span>
                <span className="text-accent">•</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ═══ TRUST BAR ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🚚", title: "Livraison gratuite", sub: "Dès 50€ d'achat" },
            { icon: "↩️", title: "Retours gratuits", sub: "Sous 30 jours" },
            { icon: "🔒", title: "Paiement sécurisé", sub: "SSL 256-bit" },
            { icon: "📦", title: "Expédition express", sub: "Sous 24-48h" },
          ].map((item, i) => (
            <div key={i} className="trust-icon surface-elevated rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-xs font-bold text-white">{item.title}</div>
              <div className="text-[10px] text-muted mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ COLLECTIONS ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">Collections</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">
            Choisis ton <span className="gradient-text-static">style</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Cases collection */}
          <Link href="/store/coques" className="group">
            <div className="relative bg-card-bg border border-card-border rounded-2xl overflow-hidden h-80 flex flex-col justify-end transition-all duration-500 group-hover:border-accent/30 group-hover:shadow-2xl group-hover:shadow-accent/5">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
              <div className="absolute top-8 right-8 flex gap-3 z-20">
                {["🇫🇷", "🇧🇷", "🇦🇷", "🇩🇪"].map((f, i) => (
                  <span key={i} className="text-4xl animate-float" style={{ animationDelay: `${i * 0.4}s` }}>{f}</span>
                ))}
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl opacity-20 group-hover:opacity-40 transition-opacity duration-500">📱</div>

              <div className="relative z-20 p-8">
                <span className="badge-promo px-2 py-1 rounded-md mb-3 inline-block">32 DESIGNS</span>
                <h3 className="text-2xl sm:text-3xl font-black">Coques Personnalisées</h3>
                <p className="text-gray-400 text-sm mt-2 max-w-sm">Drapeau officiel, symboles emblématiques. Compatible iPhone & Samsung.</p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-accent font-extrabold text-lg">Dès 19,99€</span>
                  <span className="text-xs font-semibold text-white group-hover:text-accent transition-colors">Découvrir →</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Crocs collection */}
          <Link href="/store/crocs" className="group">
            <div className="relative bg-card-bg border border-card-border rounded-2xl overflow-hidden h-80 flex flex-col justify-end transition-all duration-500 group-hover:border-accent/30 group-hover:shadow-2xl group-hover:shadow-accent/5">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
              <div className="absolute top-8 right-8 flex gap-3 z-20">
                {["🇪🇸", "🇯🇵", "🇲🇦", "🇺🇸"].map((f, i) => (
                  <span key={i} className="text-4xl animate-float" style={{ animationDelay: `${i * 0.4}s` }}>{f}</span>
                ))}
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl opacity-20 group-hover:opacity-40 transition-opacity duration-500">👟</div>

              <div className="relative z-20 p-8">
                <span className="badge-hot text-white px-2 py-1 rounded-md mb-3 inline-block">BEST-SELLER</span>
                <h3 className="text-2xl sm:text-3xl font-black">Crocs Customisées</h3>
                <p className="text-gray-400 text-sm mt-2 max-w-sm">Stickers drapeau + charms Jibbitz™ emblématiques du pays. Du 36 au 45.</p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-accent font-extrabold text-lg">Dès 49,99€</span>
                  <span className="text-xs font-semibold text-white group-hover:text-accent transition-colors">Découvrir →</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Pack duo banner */}
        <Link href="/store/packs" className="block mt-6 group">
          <div className="bundle-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center -space-x-2">
                <span className="text-4xl">📱</span>
                <span className="text-3xl">+</span>
                <span className="text-4xl">👟</span>
              </div>
              <div>
                <span className="badge-promo px-2 py-0.5 rounded-md text-[10px]">ÉCONOMISE 20%</span>
                <h3 className="text-lg font-black mt-1">Pack Duo — Coque + Crocs</h3>
                <p className="text-xs text-muted">Le combo parfait pour le supporter ultime</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-muted line-through">69,98€</div>
                <div className="text-2xl font-black gradient-text-static">55,99€</div>
              </div>
              <span className="btn-primary px-5 py-3 text-sm">Voir les packs</span>
            </div>
          </div>
        </Link>
      </section>

      {/* ═══ BEST-SELLERS ═══ */}
      <section className="section-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-accent uppercase tracking-widest">Best-sellers</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-1 tracking-tight">
                Les plus <span className="gradient-text-static">demandés</span>
              </h2>
            </div>
            <Link href="/store/pays" className="text-xs font-semibold text-accent hover:text-accent-light transition-colors">
              Voir tout →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.slice(0, 8).map((product, i) => (
              <div key={product.id} className="animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 80}ms` }}>
                <ProductCard product={product} featured={i < 2} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRENDING ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-primary-light uppercase tracking-widest">🔥 Tendance</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 tracking-tight">En ce moment</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ═══ GROUPS ═══ */}
      <section className="section-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">Coupe du Monde 2026</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
              Les <span className="gradient-text-static">8 groupes</span>
            </h2>
            <p className="text-sm text-muted mt-2">Clique sur un pays pour voir ses produits</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {GROUPS.map(group => {
              const countries = WORLD_CUP_COUNTRIES.filter(c => c.group === group);
              return (
                <div key={group} className="surface-elevated rounded-xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-black text-accent bg-accent/10 px-2.5 py-1 rounded-lg">
                      GROUPE {group}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {countries.map(c => (
                      <Link
                        key={c.code}
                        href={`/store/pays/${c.code}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <span className="text-xl">{c.flag}</span>
                        <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors flex-1">{c.name}</span>
                        <div className="flex gap-0.5 opacity-40">
                          {c.icons.slice(0, 2).map((icon, i) => (
                            <span key={i} className="text-[11px]">{icon}</span>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">Avis clients</span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
            Ils <span className="gradient-text-static">supportent</span> déjà
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { name: "Mehdi B.", flag: "🇲🇦", text: "La coque Maroc est incroyable, les détails sont ouf ! Le tajine et la mosquée sont super bien représentés.", product: "Coque Maroc" },
            { name: "Lucas M.", flag: "🇫🇷", text: "Les Crocs France avec les charms Tour Eiffel et baguette, tout le monde me demande où je les ai achetées !", product: "Crocs France" },
            { name: "Sofia R.", flag: "🇦🇷", text: "Pack Coque + Crocs Argentine reçu en 2 jours. Qualité au top, je suis prête pour la Coupe du Monde !", product: "Pack Argentine" },
          ].map((review, i) => (
            <div key={i} className="surface-elevated rounded-xl p-6">
              <div className="stars text-sm mb-3">★★★★★</div>
              <p className="text-sm text-gray-300 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm">
                  {review.flag}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{review.name}</div>
                  <div className="text-[10px] text-muted">{review.product}</div>
                </div>
                <span className="ml-auto text-[10px] font-semibold text-success">✓ Achat vérifié</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative hero-premium rounded-2xl p-8 sm:p-14 text-center overflow-hidden border border-white/5">
          <div className="flag-shimmer absolute inset-0" />
          <div className="relative z-10">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Édition limitée</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Prêt pour le coup<br />d&apos;envoi ? 🏆
            </h2>
            <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm">
              Les stocks sont limités. Commande maintenant et reçois ta tenue de supporter avant le match !
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link href="/store/coques" className="btn-primary px-8 py-4 text-sm animate-pulse-glow">
                📱 Coques — 19,99€
              </Link>
              <Link href="/store/crocs" className="btn-secondary px-8 py-4 text-sm">
                👟 Crocs — 49,99€
              </Link>
              <Link href="/store/packs" className="btn-secondary px-8 py-4 text-sm border-accent/30 text-accent">
                🔥 Packs — 55,99€
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
