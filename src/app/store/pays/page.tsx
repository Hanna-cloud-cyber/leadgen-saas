import Link from "next/link";
import { WORLD_CUP_COUNTRIES, GROUPS } from "@/lib/store/countries";

export const metadata = {
  title: "32 Équipes — Coupe du Monde 2026 | WorldCup Shop",
  description: "Coques et Crocs personnalisées pour les 32 équipes de la Coupe du Monde 2026.",
};

export default function PaysPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-accent uppercase tracking-widest">🌍 32 Équipes</span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-2 mb-4">
          Tous les <span className="gradient-text-static">Pays</span>
        </h1>
        <p className="text-sm text-muted max-w-xl mx-auto">
          Choisis ton pays et découvre les coques et Crocs personnalisées aux couleurs de ton équipe.
        </p>
      </div>

      {GROUPS.map(group => {
        const countries = WORLD_CUP_COUNTRIES.filter(c => c.group === group);
        return (
          <section key={group} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-black text-accent bg-accent/10 px-3 py-1.5 rounded-lg">GROUPE {group}</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {countries.map(country => (
                <Link key={country.code} href={`/store/pays/${country.code}`}>
                  <div
                    className="country-card bg-card-bg rounded-xl p-5 group cursor-pointer"
                    style={{
                      background: `linear-gradient(160deg, ${country.colors[0]}08 0%, ${country.colors[1]}08 100%)`,
                    }}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{country.flag}</span>
                      <div>
                        <h3 className="font-bold text-sm group-hover:text-accent transition-colors">{country.name}</h3>
                        <span className="text-[10px] text-muted">Groupe {country.group}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {country.famousThings.map((thing, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-[10px] text-muted bg-white/5 px-2 py-1 rounded-lg">
                          {country.icons[i]} {thing}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-[10px] text-muted font-semibold">2 produits</span>
                      <span className="text-[10px] font-bold text-accent group-hover:underline">Voir les produits →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
