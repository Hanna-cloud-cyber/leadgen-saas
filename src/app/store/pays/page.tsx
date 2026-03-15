import Link from "next/link";
import { WORLD_CUP_COUNTRIES, GROUPS } from "@/lib/store/countries";

export const metadata = {
  title: "Tous les pays — Coupe du Monde 2026 | WorldCup Shop",
  description: "Découvrez les 32 équipes de la Coupe du Monde 2026. Coques et Crocs personnalisées pour chaque pays.",
};

export default function PaysPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary-light text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          🌍 32 Équipes
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
          Tous les <span className="gradient-text">Pays</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choisis ton pays et découvre nos coques et Crocs personnalisées aux couleurs de ton équipe favorite !
        </p>
      </div>

      {GROUPS.map(group => {
        const countries = WORLD_CUP_COUNTRIES.filter(c => c.group === group);
        return (
          <section key={group} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-accent">Groupe {group}</h2>
              <div className="flex-1 h-px bg-card-border" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {countries.map(country => (
                <Link key={country.code} href={`/store/pays/${country.code}`}>
                  <div
                    className="country-card bg-card-bg rounded-xl p-5 group cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${country.colors[0]}0a 0%, ${country.colors[1]}0a 100%)`,
                    }}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-4xl">{country.flag}</span>
                      <div>
                        <h3 className="font-bold group-hover:text-accent transition-colors">{country.name}</h3>
                        <span className="text-xs text-gray-500">Groupe {country.group}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {country.famousThings.map((thing, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full">
                          {country.icons[i]} {thing}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-card-border">
                      <span className="text-xs text-gray-500">2 produits disponibles</span>
                      <span className="text-xs text-accent group-hover:underline">Voir →</span>
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
