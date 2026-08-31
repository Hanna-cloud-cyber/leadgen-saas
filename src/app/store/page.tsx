import Link from "next/link";
import { WORLD_CUP_COUNTRIES, generateProducts, GROUPS } from "@/lib/store/countries";
import ProductCard from "@/components/store/ProductCard";

const FEATURED = ["fr", "br", "ar", "de", "es", "us", "ma", "jp"];
const NEW_ARRIVALS = ["pt", "nl", "jp", "be", "co", "sn", "it", "kr"];

export default function StorePage() {
  const featuredProducts = WORLD_CUP_COUNTRIES
    .filter(c => FEATURED.includes(c.code))
    .flatMap(generateProducts);

  const newProducts = WORLD_CUP_COUNTRIES
    .filter(c => NEW_ARRIVALS.includes(c.code))
    .flatMap(c => generateProducts(c));

  return (
    <div>
      {/* ═══ HERO BANNER ═══ */}
      <section className="relative bg-dark-bg overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                Coupe du Monde 2026™
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] uppercase tracking-tight">
                Représente<br />
                ton pays.<br />
                <span className="text-accent">32 nations.</span>
              </h1>
              <p className="text-base text-gray-400 mt-6 max-w-md leading-relaxed">
                Coques personnalisées et Crocs customisées aux couleurs officielles. Édition limitée Coupe du Monde 2026.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/store/coques" className="btn-accent">Shop Coques</Link>
                <Link href="/store/crocs" className="btn-dark border border-white/20">Shop Crocs</Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-4 gap-3">
                {WORLD_CUP_COUNTRIES.slice(0, 16).map((c, i) => (
                  <Link
                    key={c.code}
                    href={`/store/pays/${c.code}`}
                    className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center text-3xl hover:bg-white/10 hover:scale-110 transition-all"
                    title={c.name}
                  >
                    {c.flag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES BANNER ═══ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Coques */}
          <Link href="/store/coques" className="group">
            <div className="relative bg-surface border border-border h-64 flex flex-col justify-end p-6 overflow-hidden hover:border-accent transition-colors">
              <div className="absolute top-6 right-6 text-7xl opacity-20 group-hover:opacity-40 transition-opacity">📱</div>
              <div className="absolute top-4 left-4 flex gap-2">
                {["🇫🇷", "🇧🇷", "🇩🇪"].map((f, i) => (
                  <span key={i} className="text-2xl">{f}</span>
                ))}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">32 Designs</p>
              <h3 className="text-xl font-black uppercase">Coques</h3>
              <p className="text-xs text-muted mt-1">Dès 19,99 €</p>
              <span className="text-xs font-bold uppercase tracking-wide text-accent mt-3 group-hover:underline">Shop Now →</span>
            </div>
          </Link>

          {/* Crocs */}
          <Link href="/store/crocs" className="group">
            <div className="relative bg-surface border border-border h-64 flex flex-col justify-end p-6 overflow-hidden hover:border-accent transition-colors">
              <div className="absolute top-6 right-6 text-7xl opacity-20 group-hover:opacity-40 transition-opacity">👟</div>
              <div className="absolute top-4 left-4 flex gap-2">
                {["🇦🇷", "🇪🇸", "🇲🇦"].map((f, i) => (
                  <span key={i} className="text-2xl">{f}</span>
                ))}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Best-seller</p>
              <h3 className="text-xl font-black uppercase">Crocs</h3>
              <p className="text-xs text-muted mt-1">Dès 49,99 €</p>
              <span className="text-xs font-bold uppercase tracking-wide text-accent mt-3 group-hover:underline">Shop Now →</span>
            </div>
          </Link>

          {/* Packs */}
          <Link href="/store/packs" className="group">
            <div className="relative bg-dark-bg text-white h-64 flex flex-col justify-end p-6 overflow-hidden hover:bg-black transition-colors">
              <div className="absolute top-6 right-6 flex items-center gap-1 text-5xl opacity-30">
                <span>📱</span><span className="text-2xl">+</span><span>👟</span>
              </div>
              <span className="badge-sale inline-block w-fit mb-2">-20%</span>
              <h3 className="text-xl font-black uppercase">Packs Duo</h3>
              <p className="text-xs text-gray-400 mt-1">Coque + Crocs — 55,99 €</p>
              <span className="text-xs font-bold uppercase tracking-wide text-accent mt-3 group-hover:underline">Shop Now →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ═══ BEST SELLERS ═══ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Best-sellers</p>
            <h2 className="section-title">Les plus demandés</h2>
          </div>
          <Link href="/store/pays" className="text-xs font-bold uppercase tracking-wide text-accent hover:underline">
            Voir tout →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.slice(0, 8).map((p, i) => (
            <ProductCard key={p.id} product={p} badge={i < 2 ? "SALE" : undefined} />
          ))}
        </div>
      </section>

      {/* ═══ FULL WIDTH BANNER ═══ */}
      <section className="bg-dark-bg">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Édition limitée</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                Pack Duo<br />Coque + Crocs
              </h2>
              <p className="text-sm text-gray-400 mt-4 max-w-md">
                Le combo parfait pour la Coupe du Monde. Économise 20% en combinant ta coque et tes Crocs aux couleurs de ton équipe.
              </p>
              <div className="flex items-baseline gap-4 mt-6">
                <span className="text-3xl font-black text-white">55,99 €</span>
                <span className="text-lg text-gray-500 line-through">69,98 €</span>
              </div>
              <Link href="/store/packs" className="btn-accent inline-block mt-6">Shop Packs</Link>
            </div>
            <div className="flex justify-center gap-4">
              {["🇫🇷", "🇧🇷", "🇦🇷", "🇩🇪"].map((flag, i) => (
                <div key={i} className="w-24 h-24 bg-white/5 border border-white/10 flex items-center justify-center text-5xl">
                  {flag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NEW ARRIVALS ═══ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Nouveautés</p>
            <h2 className="section-title">New Arrivals</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {newProducts.slice(0, 8).map((p, i) => (
            <ProductCard key={p.id} product={p} badge={i < 4 ? "NEW" : undefined} />
          ))}
        </div>
      </section>

      {/* ═══ SHOP BY NATION ═══ */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Coupe du Monde 2026</p>
            <h2 className="section-title">Shop by Nation</h2>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {WORLD_CUP_COUNTRIES.map(c => (
              <Link
                key={c.code}
                href={`/store/pays/${c.code}`}
                className="flex flex-col items-center gap-2 p-3 bg-white border border-border hover:border-accent hover:shadow-md transition-all group"
              >
                <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">{c.flag}</span>
                <span className="text-[10px] font-semibold text-center leading-tight text-muted group-hover:text-foreground transition-colors">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES BAR ═══ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: "🚚", title: "Livraison gratuite", desc: "Dès 50€ d'achat" },
            { icon: "↩️", title: "Retours gratuits", desc: "Sous 30 jours" },
            { icon: "🔒", title: "Paiement sécurisé", desc: "Cryptage SSL" },
            { icon: "📦", title: "Expédition rapide", desc: "Sous 24-48h" },
          ].map((f, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-xs font-bold uppercase tracking-wide">{f.title}</h3>
              <p className="text-xs text-muted mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
