import { StatTile } from "@/components/marketplace/dashboard-shell";
import { LeadList } from "./lead-list";

export default function SupplierOverviewPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Welcome back, Lumina Cosmetics Labs</h1>
      <p className="text-[13.5px] text-mp-ink-2 mt-1">Here&apos;s how your profile is performing this month.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <StatTile label="Profile Views" value="2,450" hint="+12% vs last month" />
        <StatTile label="Buyer Leads" value="86" />
        <StatTile label="Quote Requests" value="32" />
        <StatTile label="Response Rate" value="96%" />
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-[15px] text-mp-ink mb-4">Recent Buyer Opportunities</h2>
        <LeadList limit={3} />
      </div>
    </div>
  );
}
