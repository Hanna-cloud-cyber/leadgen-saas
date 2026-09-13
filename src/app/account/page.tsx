import { StatTile } from "@/components/marketplace/dashboard-shell";
import { getFeaturedSuppliers } from "@/lib/marketplace/data";
import { SupplierMark } from "@/components/marketplace/supplier-mark";
import Link from "next/link";

const ACTIVITY = [
  { text: "Lumina Cosmetics Labs sent you a quote for Organic Skincare Set", time: "2 hours ago" },
  { text: "Your RFQ for Private Label Skincare received 3 new responses", time: "5 hours ago" },
  { text: "Solstice Activewear Mfg accepted your message request", time: "1 day ago" },
  { text: "You saved Meridian Electronics Group to your supplier list", time: "2 days ago" },
];

export default function AccountOverviewPage() {
  const suggestions = getFeaturedSuppliers().slice(0, 3);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Welcome back, Maria</h1>
      <p className="text-[13.5px] text-mp-ink-2 mt-1">Here&apos;s what&apos;s happening with your sourcing activity.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <StatTile label="Saved Suppliers" value="12" />
        <StatTile label="Open RFQs" value="3" />
        <StatTile label="New Quotes" value="8" hint="+3 this week" />
        <StatTile label="Unread Messages" value="5" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-8">
        <div className="mp-card p-6">
          <h2 className="font-semibold text-[14.5px] text-mp-ink mb-4">Recent Activity</h2>
          <ul className="divide-y divide-mp-line">
            {ACTIVITY.map((a) => (
              <li key={a.text} className="py-3.5 flex items-center justify-between gap-4">
                <p className="text-[13.5px] text-mp-ink-2">{a.text}</p>
                <span className="text-[12px] text-mp-ink-3 whitespace-nowrap">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mp-card p-6">
          <h2 className="font-semibold text-[14.5px] text-mp-ink mb-4">Suggested for You</h2>
          <div className="space-y-4">
            {suggestions.map((s) => (
              <Link key={s.slug} href={`/suppliers/${s.slug}`} className="flex items-center gap-3 group">
                <SupplierMark initials={s.initials} gradient={s.gradient} size={36} />
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-mp-ink group-hover:text-mp-accent truncate">{s.name}</p>
                  <p className="text-[12px] text-mp-ink-3">{s.rating.toFixed(1)} rating · {s.reviews} reviews</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
