import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";

const PRODUCT_GRADIENTS: Record<string, string> = {
  "abaya-kimono-tie-dye-emeraude": "from-emerald-600 via-emerald-400 to-green-200",
  "abaya-kimono-tie-dye-violet": "from-purple-600 via-violet-400 to-purple-200",
  "ensemble-kimono-tie-dye-emeraude": "from-emerald-700 via-emerald-500 to-green-300",
  "abaya-kimono-plisse-degrade": "from-teal-700 via-cyan-400 to-sky-200",
  "bonnet-soie-blanc": "from-stone-100 via-stone-50 to-white",
  "bonnet-soie-noir-or": "from-gray-900 via-gray-800 to-amber-400",
  "bonnet-soie-murier-dore": "from-amber-500 via-yellow-400 to-amber-300",
  "ensemble-kimono-tie-dye-violet": "from-purple-700 via-purple-500 to-violet-300",
  "abaya-kimono-tiedye-bleu": "from-blue-800 via-cyan-500 to-blue-300",
};

export default function ProductCard({ product }: { product: Product }) {
  const gradient = PRODUCT_GRADIENTS[product.id] || "from-[var(--cream)] to-[var(--cream-dark)]";

  return (
    <Link href={`/produit/${product.id}`} className="product-card block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Image placeholder with gradient matching product */}
      <div className={`relative aspect-[3/4] bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
        <div className="product-image text-center p-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
            {product.category === "bonnet" ? (
              <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 3c-4.97 0-9 3.13-9 7v4c0 1.1.9 2 2 2h1v-4c0-3.31 2.69-6 6-6s6 2.69 6 6v4h1c1.1 0 2-.9 2-2v-4c0-3.87-4.03-7-9-7z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 3v18l7-3 7 3V3H5z" />
              </svg>
            )}
          </div>
          <p className="text-xs text-white/70 font-medium tracking-wider uppercase">QTP Abayas</p>
        </div>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[var(--gold)] text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
            {product.badge}
          </span>
        )}

        {/* Discount */}
        {product.originalPrice && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-[10px] text-[var(--gold)] uppercase tracking-[0.15em] font-medium mb-1">{product.category}</p>
        <h3 className="font-semibold text-[var(--black-soft)] text-base leading-snug">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[var(--black-soft)]">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <div className="flex gap-1.5">
            {product.colors.slice(0, 2).map((color) => (
              <span key={color} className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{color}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
