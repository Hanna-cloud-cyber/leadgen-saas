import { StatTile } from "@/components/marketplace/dashboard-shell";

const VIEWS_BY_WEEK = [
  { label: "W1", value: 420 },
  { label: "W2", value: 510 },
  { label: "W3", value: 380 },
  { label: "W4", value: 640 },
  { label: "W5", value: 590 },
  { label: "W6", value: 710 },
];

const TRAFFIC_SOURCES = [
  { label: "Search", value: 48 },
  { label: "Category Pages", value: 26 },
  { label: "AI Match", value: 14 },
  { label: "Direct", value: 12 },
];

export default function SupplierAnalyticsPage() {
  const max = Math.max(...VIEWS_BY_WEEK.map((v) => v.value));

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Analytics</h1>
      <p className="text-[13.5px] text-mp-ink-2 mt-1">Track how buyers discover and engage with your profile.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <StatTile label="Profile Views (30d)" value="2,450" hint="+12%" />
        <StatTile label="Contact Requests" value="86" hint="+8%" />
        <StatTile label="Quote Conversion" value="24%" />
        <StatTile label="Avg. Response Time" value="4.2h" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-8">
        <div className="mp-card p-6">
          <h2 className="font-semibold text-[14.5px] text-mp-ink mb-6">Profile Views</h2>
          <div className="flex items-end gap-4 h-48">
            {VIEWS_BY_WEEK.map((w) => (
              <div key={w.label} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg"
                  style={{ height: `${(w.value / max) * 100}%`, background: "linear-gradient(180deg, #635BFF, #2563EB)" }}
                />
                <span className="text-[11.5px] text-mp-ink-3">{w.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mp-card p-6">
          <h2 className="font-semibold text-[14.5px] text-mp-ink mb-5">Traffic Sources</h2>
          <div className="space-y-4">
            {TRAFFIC_SOURCES.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-[12.5px] mb-1.5">
                  <span className="text-mp-ink-2">{s.label}</span>
                  <span className="font-medium text-mp-ink">{s.value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-mp-line overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: "linear-gradient(90deg, #2563EB, #635BFF)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
