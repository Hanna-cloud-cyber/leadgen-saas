import Link from "next/link";

const RFQS = [
  { id: "RFQ-1042", product: "Private Label Skincare Set", quantity: "5,000 units", status: "Open", responses: 6, submitted: "3 days ago" },
  { id: "RFQ-1039", product: "Custom Gym Apparel", quantity: "1,200 units", status: "Open", responses: 3, submitted: "6 days ago" },
  { id: "RFQ-1021", product: "Eco Packaging Boxes", quantity: "10,000 units", status: "Closed", responses: 9, submitted: "3 weeks ago" },
];

const STATUS_TONE: Record<string, string> = {
  Open: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Closed: "bg-mp-paper text-mp-ink-2 border-mp-line-2",
};

export default function RfqsPage() {
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-mp-ink">My RFQs</h1>
          <p className="text-[13.5px] text-mp-ink-2 mt-1">Requests for quote you&apos;ve submitted to the marketplace.</p>
        </div>
        <Link href="/rfq" className="mp-btn-primary rounded-lg px-5 py-2.5 text-[13px] font-semibold">New Request</Link>
      </div>

      <div className="mp-card mt-8 overflow-hidden">
        <table className="w-full text-[13.5px]">
          <thead className="bg-mp-paper text-mp-ink-3 text-[12px] uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-medium">RFQ</th>
              <th className="text-left px-5 py-3 font-medium">Product</th>
              <th className="text-left px-5 py-3 font-medium">Quantity</th>
              <th className="text-left px-5 py-3 font-medium">Responses</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mp-line">
            {RFQS.map((r) => (
              <tr key={r.id}>
                <td className="px-5 py-3.5 font-medium text-mp-ink">{r.id}</td>
                <td className="px-5 py-3.5 text-mp-ink-2">{r.product}</td>
                <td className="px-5 py-3.5 text-mp-ink-2">{r.quantity}</td>
                <td className="px-5 py-3.5 text-mp-ink-2">{r.responses}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-[11.5px] font-medium px-2.5 py-1 rounded-full border ${STATUS_TONE[r.status]}`}>{r.status}</span>
                </td>
                <td className="px-5 py-3.5 text-mp-ink-3">{r.submitted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
