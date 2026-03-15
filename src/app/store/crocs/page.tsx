import { WORLD_CUP_COUNTRIES, generateProducts, GROUPS } from "@/lib/store/countries";
import ProductCard from "@/components/store/ProductCard";
import Link from "next/link";

export const metadata = {
  title: "Crocs Personnalisées Coupe du Monde 2026 | WorldCup Shop",
  description: "Crocs customisées avec stickers drapeaux et charms pays des 32 équipes de la Coupe du Monde 2026. Du 36 au 45.",
};

export default function CrocsPage() {
  const crocsProducts = WORLD_CUP_COUNTRIES.map(c => generateProducts(c)[1]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-light text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          👟 Collection Crocs
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
          Crocs <span className="gradient-text">Customisées</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Crocs uniques avec stickers drapeau et charms emblématiques de chaque pays participant.
          Chaque paire inclut des Jibbitz™ aux symboles du pays ! Du 36 au 45.
        </p>
      </div>

      {/* Size guide */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <span className="text-sm text-gray-500">Tailles disponibles :</span>
        {["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"].map(size => (
          <span key={size} className="px-3 py-1 bg-card-bg border border-card-border rounded-full text-xs text-gray-400">
            {size}
          </span>
        ))}
      </div>

      {/* Filter by group */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {GROUPS.map(group => (
          <a
            key={group}
            href={`#groupe-${group}`}
            className="px-4 py-2 bg-card-bg border border-card-border rounded-full text-sm hover:border-accent hover:text-accent transition-colors"
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
          <section key={group} id={`groupe-${group}`} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold">Groupe {group}</h2>
              <div className="flex gap-1">
                {WORLD_CUP_COUNTRIES.filter(c => c.group === group).map(c => (
                  <span key={c.code} className="text-lg">{c.flag}</span>
                ))}
              </div>
              <div className="flex-1 h-px bg-card-border" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {groupProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Upsell */}
      <div className="mt-16 text-center bg-card-bg border border-card-border rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-2">Et la coque assortie ? 📱</h3>
        <p className="text-gray-400 text-sm mb-4">Matche tes Crocs avec une coque aux couleurs de ton pays !</p>
        <Link
          href="/store/coques"
          className="inline-flex items-center gap-2 bg-accent text-black font-bold px-6 py-3 rounded-xl hover:bg-accent-light transition-colors"
        >
          📱 Voir les Coques
        </Link>
      </div>
    </div>
  );
}
