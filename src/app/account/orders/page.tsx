const ORDERS = [
  { id: "ORD-3021", supplier: "Lumina Cosmetics Labs", value: "$4,800", status: "In Production", eta: "Aug 28" },
  { id: "ORD-2987", supplier: "Everline Print Studio", value: "$1,250", status: "Shipped", eta: "Aug 12" },
  { id: "ORD-2911", supplier: "Bosphorus Textile Mills", value: "$9,600", status: "Delivered", eta: "Jul 30" },
];

const TONE: Record<string, string> = {
  "In Production": "bg-blue-50 text-blue-700 border-blue-100",
  Shipped: "bg-amber-50 text-amber-700 border-amber-100",
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Orders</h1>
      <p className="text-[13.5px] text-mp-ink-2 mt-1">Track orders placed with suppliers through Veridian.</p>

      <div className="mp-card mt-8 overflow-hidden">
        <table className="w-full text-[13.5px]">
          <thead className="bg-mp-paper text-mp-ink-3 text-[12px] uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Order</th>
              <th className="text-left px-5 py-3 font-medium">Supplier</th>
              <th className="text-left px-5 py-3 font-medium">Value</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">ETA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mp-line">
            {ORDERS.map((o) => (
              <tr key={o.id}>
                <td className="px-5 py-3.5 font-medium text-mp-ink">{o.id}</td>
                <td className="px-5 py-3.5 text-mp-ink-2">{o.supplier}</td>
                <td className="px-5 py-3.5 text-mp-ink-2">{o.value}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-[11.5px] font-medium px-2.5 py-1 rounded-full border ${TONE[o.status]}`}>{o.status}</span>
                </td>
                <td className="px-5 py-3.5 text-mp-ink-3">{o.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
