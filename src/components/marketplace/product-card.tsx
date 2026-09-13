import Link from "next/link";
import type { Product } from "@/lib/marketplace/data";

const TAG_TONE: Record<string, string> = {
  Trending: "bg-blue-600 text-white",
  "High Demand": "bg-amber-500 text-white",
  "Low MOQ": "bg-emerald-600 text-white",
  "Private Label": "bg-violet-600 text-white",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/search?category=${product.categorySlug}`} className="mp-card mp-card-hover mp-shadow-sm overflow-hidden flex flex-col group">
      <div
        className="h-36 relative flex items-end p-4"
        style={{ background: `linear-gradient(135deg, ${product.gradient[0]}18, ${product.gradient[1]}30)` }}
      >
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {product.tags.map((t) => (
            <span key={t} className={`text-[10.5px] font-semibold px-2 py-1 rounded-full ${TAG_TONE[t]}`}>
              {t}
            </span>
          ))}
        </div>
        <div
          className="w-14 h-14 rounded-2xl mx-auto mb-2 opacity-90 group-hover:scale-105 transition-transform"
          style={{ background: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})` }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[14.5px] text-mp-ink">{product.name}</h3>
        <p className="text-[13px] text-mp-ink-2 mt-1">
          From <span className="font-semibold text-mp-ink">${product.priceFrom.toFixed(2)}</span>/unit
        </p>
        <div className="flex items-center justify-between mt-3 text-[12px] text-mp-ink-3">
          <span>MOQ {product.moqUnits.toLocaleString("en-US")}</span>
          <span>{product.supplierCount} suppliers</span>
        </div>
      </div>
    </Link>
  );
}
