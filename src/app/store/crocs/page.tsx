import { WORLD_CUP_COUNTRIES, generateProducts, GROUPS } from "@/lib/store/countries";
import ProductCard from "@/components/store/ProductCard";
import Link from "next/link";

export const metadata = {
  title: "Crocs Customisées | Football Jersey — World Cup 2026",
  description: "Crocs avec stickers drapeaux et charms pays des 32 nations. Du 36 au 45. Dès 49,99€.",
};

export default function CrocsPage() {
  const crocsProducts = WORLD_CUP_COUNTRIES.map(c => generateProducts(c)[1]);

  return (
    <div>
      {/* Hero */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Collection</p>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Crocs Customisées</h1>
          <p className="text-sm text-muted mt-3 max-w-lg mx-auto">
            Stickers drapeau + charms Jibbitz™ emblématiques de chaque nation. Du 36 au 45.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-5">
            {["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"].map(s => (
              <span key={s} className="px-3 py-1 text-[10px] font-semibold border border-border text-muted">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wide text-muted mr-2 self-center">Filtrer :</span>
          {GROUPS.map(g => (
            <a key={g} href={`#groupe-${g}`} className="px-4 py-2 text-xs font-semibold uppercase tracking-wide border border-border hover:border-foreground hover:bg-foreground hover:text-white transition-all">
              Groupe {g}
            </a>
          ))}
        </div>

        {GROUPS.map(group => {
          const products = crocsProducts.filter(p => {
            const c = WORLD_CUP_COUNTRIES.find(c => c.code === p.countryCode);
            return c?.group === group;
          });

          return (
            <section key={group} id={`groupe-${group}`} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-lg font-black uppercase tracking-wide">Groupe {group}</h2>
                <div className="flex gap-1.5">
                  {WORLD_CUP_COUNTRIES.filter(c => c.group === group).map(c => (
                    <span key={c.code} className="text-xl">{c.flag}</span>
                  ))}
                </div>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
