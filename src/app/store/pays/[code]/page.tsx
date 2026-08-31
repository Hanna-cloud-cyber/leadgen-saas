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
      <div className="max-w-[1400px] mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-black uppercase">Pays introuvable</h1>
        <Link href="/store/pays" className="text-accent text-sm mt-4 inline-block hover:underline">← Tous les pays</Link>
      </div>
    );
  }

  const products = generateProducts(country);
  const groupCountries = getCountriesByGroup(country.group).filter(c => c.code !== country.code);

  return (
    <div>
      {/* Country Hero */}
      <div
        className="border-b border-border"
        style={{ background: `linear-gradient(135deg, ${country.colors[0]}10 0%, ${country.colors[1]}10 100%)` }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-xs text-muted mb-6">
            <Link href="/store" className="hover:text-accent">Accueil</Link>
            <span>/</span>
            <Link href="/store/pays" className="hover:text-accent">Pays</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{country.name}</span>
          </nav>

          <div className="flex items-center gap-6">
            <span className="text-7xl sm:text-8xl">{country.flag}</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Groupe {country.group}</p>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">{country.name}</h1>
              <div className="flex flex-wrap gap-2 mt-3">
                {country.famousThings.map((t, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-xs border border-border bg-white px-3 py-1.5">
                    <span className="text-base">{country.icons[i]}</span> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Products */}
        <h2 className="text-lg font-black uppercase tracking-wide mb-6">Collection {country.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {products.map(p => <ProductCard key={p.id} product={p} badge="NEW" />)}
        </div>

        {/* Same group */}
        {groupCountries.length > 0 && (
          <section className="pt-10 border-t border-border">
            <h2 className="text-lg font-black uppercase tracking-wide mb-6">Groupe {country.group}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {groupCountries.map(c => (
                <Link key={c.code} href={`/store/pays/${c.code}`}>
                  <div className="border border-border p-5 hover:border-accent transition-colors group flex items-center gap-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{c.flag}</span>
                    <div>
                      <h3 className="font-bold text-sm group-hover:text-accent transition-colors">{c.name}</h3>
                      <div className="flex gap-1 mt-1 opacity-50">
                        {c.icons.map((icon, i) => <span key={i} className="text-xs">{icon}</span>)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
