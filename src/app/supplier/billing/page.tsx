import { CoinsIcon, CheckIcon } from "@/components/marketplace/icons";

const CREDIT_PACKS = [
  { credits: 10, price: "$199" },
  { credits: 30, price: "$499", popular: true },
  { credits: 100, price: "$1,299" },
];

export default function SupplierBillingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Billing</h1>
      <p className="text-[13.5px] text-mp-ink-2 mt-1">Manage your subscription plan and lead credit balance.</p>

      <div className="mp-card p-7 mt-8 max-w-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] font-semibold text-mp-accent uppercase tracking-wide">Current Plan</p>
            <h2 className="text-2xl font-bold text-mp-ink mt-1">Supplier Pro</h2>
          </div>
          <p className="text-2xl font-bold text-mp-ink">$99<span className="text-[13px] text-mp-ink-3 font-normal">/mo</span></p>
        </div>
        <ul className="mt-5 space-y-2.5">
          {["Enhanced profile", "More visibility", "Buyer inquiries", "Analytics"].map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-[13.5px] text-mp-ink-2">
              <CheckIcon width={15} height={15} className="text-mp-accent shrink-0" /> {f}
            </li>
          ))}
        </ul>
        <a href="/pricing#suppliers" className="mp-btn-primary inline-block mt-6 rounded-lg px-5 py-2.5 text-[13px] font-semibold">Upgrade to Premium</a>
      </div>

      <div className="mt-10 max-w-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[15px] text-mp-ink">Lead Credit Balance</h2>
          <span className="text-2xl font-bold text-mp-ink">14 credits</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {CREDIT_PACKS.map((pack) => (
            <div key={pack.credits} className={`mp-card p-5 text-center ${pack.popular ? "border-2 border-mp-accent" : ""}`}>
              <CoinsIcon width={22} height={22} className="text-mp-accent mx-auto" />
              <p className="font-bold text-mp-ink mt-2">{pack.credits} Credits</p>
              <p className="text-[13px] text-mp-ink-2 mt-1">{pack.price}</p>
              <button className="mt-3 w-full mp-btn-primary rounded-lg py-2 text-[12px] font-semibold">Buy</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
