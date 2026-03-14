import Link from "next/link";
import { getFeaturedProducts, CATEGORIES, formatPrice } from "@/lib/products";
import ProductCard from "@/components/shop/product-card";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="hero-abaya pt-20 pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="animate-fade-in-up inline-block px-4 py-1.5 bg-[var(--gold)]/10 border border-[var(--gold)]/20 rounded-full text-xs text-[var(--gold)] mb-6 tracking-wide">
                Nouvelle Collection 2024
              </div>
              <h1 className="animate-fade-in-up animate-delay-100 text-4xl md:text-6xl font-bold leading-[1.1] text-[var(--black-soft)] tracking-tight">
                L&apos;elegance
                <span className="block text-[var(--gold)]">au quotidien</span>
              </h1>
              <p className="animate-fade-in-up animate-delay-200 text-lg text-gray-500 mt-6 leading-relaxed max-w-lg">
                Decouvrez notre collection exclusive d&apos;abayas de luxe. Designs modernes, tissus premium, confection soignee.
              </p>
              <div className="animate-fade-in-up animate-delay-300 mt-8 flex items-center gap-4">
                <Link href="/boutique" className="btn-gold px-8 py-3.5 rounded-xl font-medium text-base">
                  Decouvrir la collection
                </Link>
                <Link href="/boutique?cat=brodee" className="btn-outline-gold px-8 py-3.5 rounded-xl font-medium text-base">
                  Abayas brodees
                </Link>
              </div>
              <div className="animate-fade-in-up animate-delay-400 mt-10 flex items-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Livraison gratuite ds 99
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Retours sous 30 jours
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="animate-fade-in-up animate-delay-300 hidden md:flex justify-center">
              <div className="relative w-80 h-[440px] rounded-3xl bg-gradient-to-br from-[var(--cream)] to-[var(--cream-dark)] border border-[var(--gold)]/10 flex items-center justify-center overflow-hidden shadow-lg">
                <div className="text-center">
                  <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-white/50 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center text-white text-2xl font-bold tracking-wider">
                      QTP
                    </div>
                  </div>
                  <p className="text-[var(--gold-dark)] font-medium text-sm tracking-[0.2em] uppercase">Collection</p>
                  <p className="text-[var(--gold)] text-2xl font-bold mt-1">2024</p>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-[var(--gold)]/20" />
                <div className="absolute bottom-10 left-8 w-8 h-8 rounded-full border border-[var(--gold)]/15" />
                <div className="absolute top-1/3 left-4 w-1 h-16 bg-gradient-to-b from-[var(--gold)]/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-y border-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 text-sm text-gray-500">
          {[
            { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", label: "Livraison soignee" },
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Paiement securise" },
            { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: "Retours 30 jours" },
            { icon: "M5 13l4 4L19 7", label: "Qualite premium" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <svg className="w-5 h-5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--black-soft)]">Nos Categories</h2>
          <div className="divider-gold mt-4 mb-4" />
          <p className="text-gray-500">Trouvez l&apos;abaya parfaite pour chaque occasion</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/boutique?cat=${cat.id}`}
              className="category-card bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm"
            >
              <div className="category-icon w-12 h-12 mx-auto rounded-xl bg-[var(--cream)] flex items-center justify-center text-xl mb-3">
                {cat.icon}
              </div>
              <h3 className="font-semibold text-sm text-[var(--black-soft)]">{cat.name}</h3>
              <p className="text-[11px] text-gray-400 mt-1">{cat.count} articles</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--black-soft)]">Nos Best-sellers</h2>
            <div className="divider-gold mt-4 mb-4" />
            <p className="text-gray-500">Les pieces les plus aimees par nos clientes</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/boutique" className="btn-outline-gold px-10 py-3 rounded-xl font-medium text-sm inline-block">
              Voir toute la collection
            </Link>
          </div>
        </div>
      </section>

      {/* About / Values */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[var(--black-soft)] mb-2">Notre Histoire</h2>
            <div className="divider-gold !mx-0 mb-6" />
            <p className="text-gray-500 leading-relaxed mb-4">
              QTP Abayas est nee de la passion de creer des vetements modestes qui ne compromettent jamais le style.
              Chaque piece est concue avec soin, alliant tradition et modernite.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              Nos tissus sont selectionnes pour leur qualite exceptionnelle : crepe premium, lin naturel,
              velours de luxe, soie de Medine. Chaque couture est verifiee pour garantir une finition impeccable.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: "2000+", label: "Clientes satisfaites" },
                { num: "50+", label: "Modeles uniques" },
                { num: "15", label: "Pays livres" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-[var(--gold)]">{stat.num}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-[var(--cream)] to-[var(--cream-dark)] p-12 flex items-center justify-center aspect-square border border-[var(--gold)]/10">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center text-white text-3xl font-bold tracking-wider">
                QTP
              </div>
              <p className="text-[var(--gold-dark)] tracking-[0.3em] uppercase text-sm font-medium">Elegance</p>
              <p className="text-[var(--gold)] tracking-[0.3em] uppercase text-sm font-medium">&</p>
              <p className="text-[var(--gold-dark)] tracking-[0.3em] uppercase text-sm font-medium">Modestie</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[var(--cream)] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--black-soft)]">Ce que disent nos clientes</h2>
            <div className="divider-gold mt-4 mb-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Fatima R.", text: "La qualite est incroyable. Le tissu est doux et le tombé est parfait. Je recommande a 100% !", stars: 5 },
              { name: "Amina K.", text: "Ma premiere commande et je suis conquise. L'abaya brodee or est magnifique, les photos ne rendent pas justice.", stars: 5 },
              { name: "Sarah M.", text: "Livraison rapide et emballage soigne. L'ensemble abaya + hijab est parfaitement coordonne. Merci QTP !", stars: 5 },
            ].map((review) => (
              <div key={review.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[var(--gold)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
                <p className="text-sm font-semibold text-[var(--black-soft)]">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--black-soft)] tracking-tight">
            Prete a decouvrir votre prochaine abaya preferee ?
          </h2>
          <p className="text-lg text-gray-500 mt-4">Livraison gratuite des 99. Retours sous 30 jours.</p>
          <Link
            href="/boutique"
            className="inline-block mt-8 btn-gold px-10 py-4 rounded-xl text-lg font-medium"
          >
            Explorer la boutique
          </Link>
        </div>
      </section>
    </>
  );
}
