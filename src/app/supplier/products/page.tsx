import { getAllProducts } from "@/lib/marketplace/data";

export default function SupplierProductsPage() {
  const products = getAllProducts().slice(0, 5);

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Products</h1>
          <p className="text-[13.5px] text-mp-ink-2 mt-1">Manage the products listed on your supplier profile.</p>
        </div>
        <button className="mp-btn-primary rounded-lg px-5 py-2.5 text-[13px] font-semibold">Add Product</button>
      </div>

      <div className="mp-card mt-8 overflow-hidden">
        <table className="w-full text-[13.5px]">
          <thead className="bg-mp-paper text-mp-ink-3 text-[12px] uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Product</th>
              <th className="text-left px-5 py-3 font-medium">Price</th>
              <th className="text-left px-5 py-3 font-medium">MOQ</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mp-line">
            {products.map((p) => (
              <tr key={p.slug}>
                <td className="px-5 py-3.5 font-medium text-mp-ink">{p.name}</td>
                <td className="px-5 py-3.5 text-mp-ink-2">${p.priceFrom.toFixed(2)}/unit</td>
                <td className="px-5 py-3.5 text-mp-ink-2">{p.moqUnits.toLocaleString("en-US")}</td>
                <td className="px-5 py-3.5">
                  <span className="text-[11.5px] font-medium px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-100">Live</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
