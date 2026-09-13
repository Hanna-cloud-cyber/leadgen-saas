import Link from "next/link";
import { CheckIcon } from "@/components/marketplace/icons";

export default function SubscriptionPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Subscription</h1>
      <p className="text-[13.5px] text-mp-ink-2 mt-1">Manage your Veridian buyer plan and billing.</p>

      <div className="mp-card p-7 mt-8 max-w-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] font-semibold text-mp-accent uppercase tracking-wide">Current Plan</p>
            <h2 className="text-2xl font-bold text-mp-ink mt-1">Pro</h2>
          </div>
          <p className="text-2xl font-bold text-mp-ink">$99<span className="text-[13px] text-mp-ink-3 font-normal">/mo</span></p>
        </div>
        <ul className="mt-5 space-y-2.5">
          {["Unlimited supplier access", "Direct contacts", "Supplier comparisons", "RFQ access", "Advanced filters"].map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-[13.5px] text-mp-ink-2">
              <CheckIcon width={15} height={15} className="text-mp-accent shrink-0" /> {f}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 mt-6">
          <Link href="/pricing" className="mp-btn-primary rounded-lg px-5 py-2.5 text-[13px] font-semibold">Upgrade to Business</Link>
          <button className="border border-mp-line-2 rounded-lg px-5 py-2.5 text-[13px] font-semibold text-mp-ink">Manage Billing</button>
        </div>
      </div>
    </div>
  );
}
