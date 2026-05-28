import { WORLD_CUP_COUNTRIES, generateProducts, GROUPS } from "@/lib/store/countries";
import ProductCard from "@/components/store/ProductCard";
import Link from "next/link";

export const metadata = {
  title: "Coques Personnalisées Coupe du Monde 2026 | WorldCup Shop",
  description: "Coques de téléphone avec drapeaux et symboles des 32 équipes. iPhone & Samsung. Dès 19,99€.",
};

export default function CoquesPage() {
  const caseProducts = WORLD_CUP_COUNTRIES.map(c => generateProducts(c)[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-10">
        <span className="badge-new text-white px-3 py-1 rounded-full inline-block mb-4 text-xs">📱 32 DESIGNS UNIQUES</span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
          Coques <span className="gradient-text-static">Personnalisées</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm">
          Chaque coque arbore le drapeau officiel et les symboles emblématiques du pays.
          Compatible iPhone 15/16 et Samsung S24/S25.
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="text-2xl font-black gradient-text-static">19,99€</span>
          <span className="text-sm text-muted line-through">29,99€</span>
          <span className="text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded-md">-33%</span>
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
        const groupProducts = caseProducts.filter(p => {
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
        <h3 className="text-xl font-black mb-2">Ajoute les Crocs assorties ! 👟</h3>
        <p className="text-sm text-muted mb-4">Pack Coque + Crocs = <strong className="text-accent">-20%</strong></p>
        <Link href="/store/packs" className="btn-primary px-6 py-3 text-sm inline-block">
          🔥 Voir les Packs
        </Link>
      </div>
    </div>
  );
}
