"use client";

import { use, useState } from "react";
import Link from "next/link";
import { getProductById, getCountryByCode, generateProducts, WORLD_CUP_COUNTRIES } from "@/lib/store/countries";
import { useCart } from "@/lib/store/cart-context";
import ProductCard from "@/components/store/ProductCard";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState("");
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "livraison" | "avis">("details");

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-black mb-4">Produit introuvable</h1>
        <Link href="/store" className="text-accent hover:underline">← Retour à la boutique</Link>
      </div>
    );
  }

  const country = getCountryByCode(product.countryCode)!;
  const isCase = product.type === "case";
  const relatedProducts = generateProducts(country).filter(p => p.id !== product.id);

  const otherCodes = ["fr", "br", "ar", "de", "es", "us", "ma", "jp"].filter(c => c !== country.code);
  const otherProducts = otherCodes.slice(0, 4).map(code => {
    const c = getCountryByCode(code)!;
    return generateProducts(c)[isCase ? 0 : 1];
  });

  const handleAddToCart = () => {
    if (!selectedVariant && product.variants?.length) return;
    addItem(product, selectedVariant || "default");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyPack = () => {
    const products = generateProducts(country);
    addItem(products[0], products[0].variants?.[0] || "default");
    addItem(products[1], products[1].variants?.[0] || "default");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const reviews = [
    { name: "Alex P.", rating: 5, text: `Superbe qualité ! Le drapeau ${country.name} est magnifique.`, date: "Il y a 3 jours" },
    { name: "Marie L.", rating: 5, text: `Les détails ${country.icons[0]} ${country.icons[1]} sont incroyables. Livraison rapide !`, date: "Il y a 1 semaine" },
    { name: "Karim B.", rating: 4, text: "Très content de mon achat, conforme à la description. Je recommande.", date: "Il y a 2 semaines" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted mb-8">
        <Link href="/store" className="hover:text-accent transition-colors">Accueil</Link>
        <span className="text-white/20">/</span>
        <Link href={isCase ? "/store/coques" : "/store/crocs"} className="hover:text-accent transition-colors">
          {isCase ? "Coques" : "Crocs"}
        </Link>
        <span className="text-white/20">/</span>
        <span className="text-gray-400">{country.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Product Visual */}
        <div className="space-y-4">
          <div
            className="relative rounded-2xl overflow-hidden h-[400px] lg:h-[520px] flex items-center justify-center group"
            style={{
              background: `linear-gradient(160deg, ${country.colors[0]}30 0%, ${country.colors[1]}30 40%, rgba(5,5,16,0.95) 100%)`,
            }}
          >
            <div className="flag-shimmer absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="text-center z-20">
              <div className="text-[100px] lg:text-[120px] mb-2 drop-shadow-2xl">{country.flag}</div>
              <div className="text-6xl lg:text-7xl">{isCase ? "📱" : "👟"}</div>
              <div className="flex gap-4 justify-center mt-6">
                {country.icons.map((icon, i) => (
                  <span key={i} className="text-3xl animate-float opacity-60" style={{ animationDelay: `${i * 0.5}s` }}>
                    {icon}
                  </span>
                ))}
              </div>
            </div>

            {/* Badge */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <span className="badge-new text-white px-3 py-1.5 rounded-lg text-[11px]">
                {isCase ? "📱 COQUE" : "👟 CROCS"}
              </span>
              <span className="badge-promo px-3 py-1.5 rounded-lg text-[11px]">-33%</span>
            </div>
          </div>

          {/* Mini thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {country.icons.map((icon, i) => (
              <div
                key={i}
                className="h-20 rounded-xl flex items-center justify-center border border-white/5 hover:border-accent/30 transition-colors cursor-pointer"
                style={{ background: `linear-gradient(135deg, ${country.colors[0]}15 0%, ${country.colors[1]}15 100%)` }}
              >
                <span className="text-2xl">{icon}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{country.flag}</span>
            <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-lg">Groupe {country.group}</span>
            <div className="stars text-sm">★★★★★</div>
            <span className="text-xs text-muted">(312 avis)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{product.name}</h1>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">{product.description}</p>

          {/* Famous things */}
          <div className="mt-5">
            <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Symboles inclus</h3>
            <div className="flex flex-wrap gap-2">
              {country.famousThings.map((thing, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl text-xs font-medium">
                  <span className="text-base">{country.icons[i]}</span>
                  {thing}
                </span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-6">
            <span className="text-3xl font-black gradient-text-static">{product.price.toFixed(2)}€</span>
            <span className="text-sm text-muted line-through">{(product.price * 1.5).toFixed(2)}€</span>
            <span className="text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded-md">-33%</span>
          </div>

          {/* Variant selector */}
          {product.variants && (
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3">
                {isCase ? "Modèle de téléphone" : "Taille"}
                {selectedVariant && <span className="text-accent ml-2 normal-case">— {selectedVariant}</span>}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map(variant => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                      selectedVariant === variant
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-white/5 bg-white/5 text-gray-300 hover:border-white/20"
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to cart */}
          <div className="mt-8 space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant && !!product.variants?.length}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                added
                  ? "bg-success text-white"
                  : !selectedVariant && product.variants?.length
                    ? "bg-white/5 text-muted cursor-not-allowed border border-white/5"
                    : "btn-primary animate-pulse-glow"
              }`}
            >
              {added ? "✅ Ajouté au panier !" : `🛒 Ajouter au panier — ${product.price.toFixed(2)}€`}
            </button>

            {/* Pack upsell */}
            <button
              onClick={handleBuyPack}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold bundle-card hover:border-accent/40 transition-all"
            >
              🔥 Pack Coque + Crocs {country.flag} — <span className="line-through text-muted mx-1">69,98€</span> <span className="text-accent">55,99€</span>
            </button>
          </div>

          {/* Trust */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { icon: "🚚", text: "Livraison gratuite dès 50€" },
              { icon: "↩️", text: "Retours gratuits 30 jours" },
              { icon: "📦", text: "Expédié sous 24-48h" },
              { icon: "🔒", text: "Paiement sécurisé SSL" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted">
                <span className="text-sm">{item.icon}</span> {item.text}
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-8 border-t border-white/5 pt-6">
            <div className="flex gap-4 mb-4">
              {(["details", "livraison", "avis"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-colors ${
                    activeTab === tab ? "border-accent text-accent" : "border-transparent text-muted hover:text-white"
                  }`}
                >
                  {tab === "details" ? "Détails" : tab === "livraison" ? "Livraison" : `Avis (${reviews.length})`}
                </button>
              ))}
            </div>

            {activeTab === "details" && (
              <div className="text-xs text-gray-400 space-y-2 animate-fade-in">
                <p>• Drapeau {country.name} {country.flag} imprimé haute résolution</p>
                <p>• Symboles : {country.famousThings.map((t, i) => `${country.icons[i]} ${t}`).join(", ")}</p>
                {isCase ? (
                  <>
                    <p>• Protection anti-choc et anti-rayures</p>
                    <p>• Compatible charge sans fil</p>
                    <p>• Matériau : TPU souple + polycarbonate</p>
                  </>
                ) : (
                  <>
                    <p>• 4 charms Jibbitz™ inclus : {country.icons.join(" ")}</p>
                    <p>• Stickers drapeau résistants à l&apos;eau</p>
                    <p>• Confort Croslite™ amorti</p>
                  </>
                )}
              </div>
            )}

            {activeTab === "livraison" && (
              <div className="text-xs text-gray-400 space-y-2 animate-fade-in">
                <p>• 🇫🇷 France métropolitaine : 2-3 jours ouvrés</p>
                <p>• 🇪🇺 Europe : 3-5 jours ouvrés</p>
                <p>• 🌍 International : 5-10 jours ouvrés</p>
                <p>• Livraison gratuite dès 50€ d&apos;achat</p>
                <p>• Suivi de commande par email</p>
              </div>
            )}

            {activeTab === "avis" && (
              <div className="space-y-4 animate-fade-in">
                {reviews.map((r, i) => (
                  <div key={i} className="surface-elevated rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="stars text-xs">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                        <span className="text-xs font-bold text-white">{r.name}</span>
                      </div>
                      <span className="text-[10px] text-muted">{r.date}</span>
                    </div>
                    <p className="text-xs text-gray-400">{r.text}</p>
                    <span className="text-[10px] text-success mt-1 inline-block">✓ Achat vérifié</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related same country */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-lg font-black">Complète le look {country.name}</h2>
            <span className="text-xl">{country.flag}</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Other popular */}
      <section className="mt-16">
        <h2 className="text-lg font-black mb-6">
          D&apos;autres pays <span className="gradient-text-static">populaires</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {otherProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
