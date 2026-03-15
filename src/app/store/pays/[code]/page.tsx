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
        <h1 className="text-3xl font-bold mb-4">Pays introuvable</h1>
        <Link href="/store/pays" className="text-accent hover:underline">← Voir tous les pays</Link>
      </div>
    );
  }

  const products = generateProducts(country);
  const groupCountries = getCountriesByGroup(country.group).filter(c => c.code !== country.code);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/store" className="hover:text-accent">Accueil</Link>
        <span>/</span>
        <Link href="/store/pays" className="hover:text-accent">Pays</Link>
        <span>/</span>
        <span className="text-gray-300">{country.name}</span>
      </nav>

      {/* Country Hero */}
      <div
        className="relative rounded-2xl overflow-hidden p-8 sm:p-12 mb-12"
        style={{
          background: `linear-gradient(135deg, ${country.colors[0]}33 0%, ${country.colors[1]}33 100%)`,
        }}
      >
        <div className="flag-shimmer absolute inset-0" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl sm:text-8xl">{country.flag}</span>
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold">{country.name}</h1>
              <span className="text-accent font-semibold">Groupe {country.group}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {country.famousThings.map((thing, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-sm"
              >
                <span className="text-lg">{country.icons[i]}</span>
                {thing}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <h2 className="text-2xl font-bold mb-6">
        Nos produits <span className="gradient-text">{country.name}</span> {country.flag}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Same group countries */}
      {groupCountries.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-6">
            Autres pays du <span className="gradient-text">Groupe {country.group}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {groupCountries.map(c => (
              <Link key={c.code} href={`/store/pays/${c.code}`}>
                <div className="country-card bg-card-bg rounded-xl p-5 group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{c.flag}</span>
                    <div>
                      <h3 className="font-bold group-hover:text-accent transition-colors">{c.name}</h3>
                      <div className="flex gap-1 mt-1">
                        {c.icons.map((icon, i) => (
                          <span key={i} className="text-sm opacity-60">{icon}</span>
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
