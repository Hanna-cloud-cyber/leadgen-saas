import Link from "next/link";
import { WORLD_CUP_COUNTRIES, GROUPS } from "@/lib/store/countries";

export const metadata = {
  title: "Shop by Nation | Football Jersey — World Cup 2026",
  description: "Coques et Crocs pour les 32 nations de la Coupe du Monde 2026.",
};

export default function PaysPage() {
  return (
    <div>
      <div className="bg-surface border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Coupe du Monde 2026</p>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Shop by Nation</h1>
          <p className="text-sm text-muted mt-3 max-w-lg mx-auto">
            32 nations, 64 produits uniques. Sélectionnez votre pays.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {GROUPS.map(group => {
          const countries = WORLD_CUP_COUNTRIES.filter(c => c.group === group);
          return (
            <section key={group} className="mb-10">
              <div className="flex items-center gap-4 mb-5">
                <h2 className="text-sm font-black uppercase tracking-widest">Groupe {group}</h2>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {countries.map(country => (
                  <Link key={country.code} href={`/store/pays/${country.code}`}>
                    <div className="border border-border p-5 hover:border-accent transition-colors group">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-4xl group-hover:scale-110 transition-transform">{country.flag}</span>
                        <div>
                          <h3 className="font-bold text-sm group-hover:text-accent transition-colors">{country.name}</h3>
                          <span className="text-[10px] text-muted uppercase tracking-wide">Groupe {country.group}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {country.famousThings.map((t, i) => (
                          <span key={i} className="inline-flex items-center gap-1 text-[10px] text-muted bg-surface px-2 py-1 border border-border-light">
                            {country.icons[i]} {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border-light">
                        <span className="text-[10px] text-muted">2 produits</span>
                        <span className="text-[10px] font-bold uppercase tracking-wide text-accent group-hover:underline">Voir →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
