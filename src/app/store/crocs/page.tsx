import { WORLD_CUP_COUNTRIES, generateProducts, GROUPS } from "@/lib/store/countries";
import ProductCard from "@/components/store/ProductCard";
import Link from "next/link";

export const metadata = {
  title: "Crocs Customisées Coupe du Monde 2026 | WorldCup Shop",
  description: "Crocs avec stickers drapeaux et charms pays des 32 équipes. Du 36 au 45. Dès 49,99€.",
};

export default function CrocsPage() {
  const crocsProducts = WORLD_CUP_COUNTRIES.map(c => generateProducts(c)[1]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-10">
        <span className="badge-hot text-white px-3 py-1 rounded-full inline-block mb-4 text-xs">👟 BEST-SELLER</span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
          Crocs <span className="gradient-text-static">Customisées</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm">
          Chaque paire est livrée avec stickers drapeau et charms Jibbitz™ emblématiques du pays.
          Du 36 au 45.
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="text-2xl font-black gradient-text-static">49,99€</span>
          <span className="text-sm text-muted line-through">74,99€</span>
          <span className="text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded-md">-33%</span>
        </div>

        {/* Size chips */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          <span className="text-xs text-muted font-semibold mr-1">Tailles :</span>
          {["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"].map(s => (
            <span key={s} className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-semibold text-muted">{s}</span>
          ))}
        </div>
      </div>

      {/* Group filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {GROUPS.map(group => (
          <a
            key={group}
            href={`#groupe-${group}`}
            className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-semibold hover:border-accent/30 hover:text-accent transition-all"
          >
            Groupe {group}
          </a>
        ))}
      </div>

      {/* Products by group */}
      {GROUPS.map(group => {
        const groupProducts = crocsProducts.filter(p => {
          const c = WORLD_CUP_COUNTRIES.find(c => c.code === p.countryCode);
          return c?.group === group;
        });

        return (
          <section key={group} id={`groupe-${group}`} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-black text-accent bg-accent/10 px-3 py-1.5 rounded-lg">GROUPE {group}</span>
              <div className="flex gap-1.5">
                {WORLD_CUP_COUNTRIES.filter(c => c.group === group).map(c => (
                  <span key={c.code} className="text-lg">{c.flag}</span>
                ))}
              </div>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {groupProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Upsell */}
      <div className="mt-8 bundle-card rounded-2xl p-8 text-center">
        <h3 className="text-xl font-black mb-2">La coque assortie ? 📱</h3>
        <p className="text-sm text-muted mb-4">Pack Coque + Crocs = <strong className="text-accent">-20%</strong></p>
        <Link href="/store/packs" className="btn-primary px-6 py-3 text-sm inline-block">
          🔥 Voir les Packs
        </Link>
      </div>
    </div>
  );
}
