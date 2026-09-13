import { getFeaturedSuppliers } from "@/lib/marketplace/data";
import { SupplierMark } from "@/components/marketplace/supplier-mark";
import Link from "next/link";

export default function QuotesPage() {
  const suppliers = getFeaturedSuppliers();
  const quotes = suppliers.map((s, i) => ({
    supplier: s,
    product: ["Organic Skincare Set", "Activewear Leggings", "Smart Home Devices", "LED Beauty Mask"][i % 4],
    price: [`$4.${20 + i}/unit`, `$5.${60 + i}/unit`, `$14.${90 + i}/unit`, `$6.${20 + i}/unit`][i % 4],
    validity: "Valid for 14 days",
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Quotes</h1>
      <p className="text-[13.5px] text-mp-ink-2 mt-1">Quotes received from suppliers in response to your requests.</p>

      <div className="space-y-4 mt-8">
        {quotes.map((q) => (
          <div key={q.supplier.slug} className="mp-card p-5 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3.5">
              <SupplierMark initials={q.supplier.initials} gradient={q.supplier.gradient} size={44} />
              <div>
                <Link href={`/suppliers/${q.supplier.slug}`} className="font-semibold text-[14px] text-mp-ink hover:text-mp-accent">{q.supplier.name}</Link>
                <p className="text-[12.5px] text-mp-ink-2">Quote for {q.product}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-mp-ink">{q.price}</p>
              <p className="text-[12px] text-mp-ink-3">{q.validity}</p>
            </div>
            <div className="flex gap-2">
              <button className="border border-mp-line-2 rounded-lg px-4 py-2 text-[12.5px] font-semibold text-mp-ink">Decline</button>
              <button className="mp-btn-primary rounded-lg px-4 py-2 text-[12.5px] font-semibold">Accept Quote</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
