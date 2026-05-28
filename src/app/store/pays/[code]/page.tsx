import Link from "next/link";
import { WORLD_CUP_COUNTRIES, getCountryByCode, generateProducts, getCountriesByGroup } from "@/lib/store/countries";
import ProductCard from "@/components/store/ProductCard";

export function generateStaticParams() {
  return WORLD_CUP_COUNTRIES.map(c => ({ code: c.code }));
}

export default async function CountryPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const country = getCountryByCode(code);

  if (!country) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-black mb-4">Pays introuvable</h1>
        <Link href="/store/pays" className="text-accent hover:underline">← Voir tous les pays</Link>
      </div>
    );
  }

  const products = generateProducts(country);
  const groupCountries = getCountriesByGroup(country.group).filter(c => c.code !== country.code);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted mb-8">
        <Link href="/store" className="hover:text-accent transition-colors">Accueil</Link>
        <span className="text-white/20">/</span>
        <Link href="/store/pays" className="hover:text-accent transition-colors">Pays</Link>
        <span className="text-white/20">/</span>
        <span className="text-gray-400">{country.name}</span>
      </nav>

      {/* Country Hero */}
      <div
        className="relative rounded-2xl overflow-hidden p-8 sm:p-12 lg:p-16 mb-12"
        style={{
          background: `linear-gradient(160deg, ${country.colors[0]}35 0%, ${country.colors[1]}35 40%, rgba(5,5,16,0.95) 100%)`,
        }}
      >
        <div className="flag-shimmer absolute inset-0" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <span className="text-7xl sm:text-8xl lg:text-[100px] drop-shadow-2xl">{country.flag}</span>
          <div>
            <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-lg">Groupe {country.group}</span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-2">{country.name}</h1>
            <div className="flex flex-wrap gap-2 mt-4">
              {country.famousThings.map((thing, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-xl text-xs font-medium"
                >
                  <span className="text-base">{country.icons[i]}</span>
                  {thing}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="mb-6">
        <span className="text-xs font-bold text-accent uppercase tracking-widest">Produits</span>
        <h2 className="text-xl font-black mt-1">
          Collection {country.name} {country.flag}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {products.map(product => (
          <ProductCard key={product.id} product={product} featured />
        ))}
      </div>

      {/* Bundle CTA */}
      <div className="bundle-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{country.flag}</span>
          <div>
            <span className="badge-promo px-2 py-0.5 rounded-md text-[10px]">-20%</span>
            <h3 className="text-base font-black mt-1">Pack {country.name}</h3>
            <p className="text-xs text-muted">Coque + Crocs assorties</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-muted line-through">69,98€</div>
            <div className="text-xl font-black gradient-text-static">55,99€</div>
          </div>
          <Link href="/store/packs" className="btn-primary px-5 py-3 text-xs">
            Voir le pack
          </Link>
        </div>
      </div>

      {/* Same group */}
      {groupCountries.length > 0 && (
        <section>
          <span className="text-xs font-bold text-accent uppercase tracking-widest">Même groupe</span>
          <h2 className="text-lg font-black mt-1 mb-6">
            Groupe {country.group}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {groupCountries.map(c => (
              <Link key={c.code} href={`/store/pays/${c.code}`}>
                <div className="country-card bg-card-bg rounded-xl p-5 group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{c.flag}</span>
                    <div>
                      <h3 className="font-bold text-sm group-hover:text-accent transition-colors">{c.name}</h3>
                      <div className="flex gap-1 mt-1">
                        {c.icons.map((icon, i) => (
                          <span key={i} className="text-xs opacity-50">{icon}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
