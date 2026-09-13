"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckIcon, CoinsIcon, SparkleIcon } from "@/components/marketplace/icons";

const BUYER_PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Explore the marketplace and get a feel for verified sourcing.",
    features: ["Limited supplier browsing", "Limited direct contacts", "Save suppliers"],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$99",
    period: "/month",
    desc: "For founders and brands actively sourcing products.",
    features: ["Unlimited supplier access", "Direct contacts", "Supplier comparisons", "RFQ access", "Advanced filters"],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Business",
    price: "$299–499",
    period: "/month",
    desc: "For teams and agencies sourcing at scale.",
    features: ["Everything in Pro", "Team accounts", "Priority sourcing", "Buyer requests", "Advanced data", "Supplier intelligence", "Priority support"],
    cta: "Talk to Sales",
  },
];

const SUPPLIER_PLANS = [
  {
    name: "Supplier Free",
    price: "$0",
    period: "forever",
    desc: "Get discovered with a basic listing.",
    features: ["Basic listing", "Standard search placement"],
    cta: "Create Listing",
  },
  {
    name: "Supplier Pro",
    price: "$99",
    period: "/month",
    desc: "Stand out and start receiving buyer inquiries.",
    features: ["Enhanced profile", "More visibility", "Buyer inquiries", "Analytics"],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Supplier Premium",
    price: "$299–499",
    period: "/month",
    desc: "Maximum visibility and lead volume.",
    features: ["Top placement", "Unlimited leads", "Advanced analytics", "Verified badge", "Featured listings"],
    cta: "Talk to Sales",
  },
];

const CREDIT_PACKS = [
  { credits: 10, price: "$199", perLead: "≈ $19.90 / credit" },
  { credits: 30, price: "$499", perLead: "≈ $16.60 / credit", popular: true },
  { credits: 100, price: "$1,299", perLead: "≈ $12.99 / credit" },
];

const LEAD_COST = [
  { tier: "Small buyer request", cost: "1 credit" },
  { tier: "Medium buyer request", cost: "3 credits" },
  { tier: "High-value buyer request", cost: "5–10 credits" },
];

export function PricingClient() {
  const [tab, setTab] = useState<"buyers" | "suppliers">("buyers");
  const plans = tab === "buyers" ? BUYER_PLANS : SUPPLIER_PLANS;

  return (
    <div className="mp-container py-14">
      <div className="text-center max-w-xl mx-auto">
        <p className="text-[12.5px] font-semibold text-mp-accent uppercase tracking-wider">Pricing</p>
        <h1 className="text-3xl md:text-[46px] font-bold tracking-tight text-mp-ink mt-3">Simple, transparent pricing</h1>
        <p className="text-[15px] text-mp-ink-2 mt-4">Start free. Upgrade as your sourcing — or your leads — grow.</p>
      </div>

      <div className="flex justify-center mt-9">
        <div className="inline-flex bg-mp-paper border border-mp-line rounded-full p-1">
          <button
            onClick={() => setTab("buyers")}
            className={`px-5 py-2 rounded-full text-[13.5px] font-semibold transition-colors ${tab === "buyers" ? "bg-white shadow-sm text-mp-ink" : "text-mp-ink-2"}`}
          >
            For Buyers
          </button>
          <button
            onClick={() => setTab("suppliers")}
            id="suppliers"
            className={`px-5 py-2 rounded-full text-[13.5px] font-semibold transition-colors ${tab === "suppliers" ? "bg-white shadow-sm text-mp-ink" : "text-mp-ink-2"}`}
          >
            For Suppliers
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-7 flex flex-col ${plan.popular ? "border-2 border-mp-accent mp-shadow-lg relative" : "border border-mp-line mp-shadow-sm"}`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-7 mp-btn-primary text-[11px] font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1">
                <SparkleIcon width={11} height={11} /> Most Popular
              </span>
            )}
            <h3 className="font-semibold text-lg text-mp-ink">{plan.name}</h3>
            <p className="text-[13px] text-mp-ink-2 mt-1.5 min-h-[36px]">{plan.desc}</p>
            <p className="mt-4">
              <span className="text-4xl font-bold tracking-tight text-mp-ink">{plan.price}</span>
              <span className="text-[13px] text-mp-ink-3 font-normal"> {plan.period}</span>
            </p>
            <ul className="mt-6 space-y-2.5 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[13.5px] text-mp-ink-2">
                  <CheckIcon width={15} height={15} className="text-mp-accent shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className={`mt-7 text-center rounded-lg py-2.5 text-[13.5px] font-semibold ${plan.popular ? "mp-btn-primary" : "border border-mp-line-2 text-mp-ink hover:border-mp-ink/30 transition-colors"}`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Lead credits */}
      <div id="credits" className="mt-24 max-w-5xl mx-auto scroll-mt-24">
        <div className="text-center max-w-xl mx-auto">
          <p className="text-[12.5px] font-semibold text-mp-accent uppercase tracking-wider">Lead Monetization</p>
          <h2 className="text-2xl md:text-[36px] font-bold tracking-tight text-mp-ink mt-3">Buy lead credits</h2>
          <p className="text-[14.5px] text-mp-ink-2 mt-3">Unlock buyer requests that match your capabilities. Pay only for the leads you want.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {CREDIT_PACKS.map((pack) => (
            <div key={pack.credits} className={`mp-card p-6 text-center ${pack.popular ? "border-2 border-mp-accent" : ""}`}>
              <CoinsIcon width={26} height={26} className="text-mp-accent mx-auto" />
              <p className="text-2xl font-bold text-mp-ink mt-3">{pack.credits} Credits</p>
              <p className="text-3xl font-bold text-mp-ink mt-2">{pack.price}</p>
              <p className="text-[12px] text-mp-ink-3 mt-1">{pack.perLead}</p>
              <Link href="/supplier/billing" className="mt-5 block mp-btn-primary rounded-lg py-2.5 text-[13px] font-semibold">
                Buy Credits
              </Link>
            </div>
          ))}
        </div>

        <div className="mp-card p-6 mt-8">
          <h3 className="font-semibold text-[14.5px] text-mp-ink mb-4">How lead credit cost is determined</h3>
          <div className="divide-y divide-mp-line">
            {LEAD_COST.map((row) => (
              <div key={row.tier} className="flex items-center justify-between py-3 text-[13.5px]">
                <span className="text-mp-ink-2">{row.tier}</span>
                <span className="font-semibold text-mp-ink">{row.cost}</span>
              </div>
            ))}
          </div>
          <p className="text-[12.5px] text-mp-ink-3 mt-3">
            Buyer requests flagged as <span className="font-medium text-amber-600">High Intent Buyer</span> indicate larger
            budgets or quantities and cost more credits to unlock.
          </p>
        </div>
      </div>
    </div>
  );
}
