import { getAllSuppliers } from "@/lib/marketplace/data";
import { SupplierCard } from "@/components/marketplace/supplier-card";

export default function SavedSuppliersPage() {
  const saved = getAllSuppliers().slice(0, 6);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Saved Suppliers</h1>
      <p className="text-[13.5px] text-mp-ink-2 mt-1">Suppliers you&apos;ve bookmarked for later.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
        {saved.map((s) => (
          <SupplierCard key={s.slug} supplier={s} />
        ))}
      </div>
    </div>
  );
}
