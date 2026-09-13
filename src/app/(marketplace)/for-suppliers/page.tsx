import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon, GlobeIcon, CoinsIcon, ShieldCheckIcon, ArrowRightIcon } from "@/components/marketplace/icons";

export const metadata: Metadata = {
  title: "For Suppliers — Join the Marketplace",
  description: "List your factory or wholesale business on Veridian and reach thousands of verified buyers actively sourcing products.",
};

const BENEFITS = [
  { icon: GlobeIcon, title: "Reach global buyers", desc: "Get discovered by founders, brands and retailers actively sourcing in your category." },
  { icon: CoinsIcon, title: "Pay only for real leads", desc: "Unlock buyer requests with credits — no flat directory fees for leads you don't want." },
  { icon: ShieldCheckIcon, title: "Build instant credibility", desc: "The Verified Supplier badge signals trust the moment a buyer lands on your profile." },
];

export default function ForSuppliersPage() {
  return (
    <div>
      <section className="mp-hero-mesh py-24">
        <div className="mp-container text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-mp-line-2 rounded-full px-4 py-1.5 text-[12.5px] font-medium text-mp-ink-2 mp-shadow-sm">
            For Manufacturers, Wholesalers & Distributors
          </div>
          <h1 className="text-4xl md:text-[56px] font-bold tracking-tight text-mp-ink mt-6 leading-[1.1]">
            Get discovered by <span className="mp-gradient-text">serious buyers</span> worldwide.
          </h1>
          <p className="text-[15px] text-mp-ink-2 mt-5 leading-relaxed">
            Join Veridian to list your business, receive qualified buyer requests, and grow your export sales — without the noise of a generic directory.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            <Link href="/signup" className="mp-btn-primary rounded-lg px-7 py-3.5 text-[14px] font-semibold">Join Marketplace</Link>
            <Link href="/pricing#suppliers" className="border border-mp-line-2 bg-white rounded-lg px-7 py-3.5 text-[14px] font-semibold text-mp-ink">
              View Supplier Plans
            </Link>
          </div>
        </div>
      </section>

      <section className="mp-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BENEFITS.map((b) => (
            <div key={b.title} className="mp-card p-6">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-mp-accent">
                <b.icon width={20} height={20} />
              </div>
              <h3 className="font-semibold text-[15.5px] text-mp-ink mt-4">{b.title}</h3>
              <p className="text-[13.5px] text-mp-ink-2 mt-2 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-mp-line">
        <div className="mp-container py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-mp-ink">What you get with a Veridian listing</h2>
            <ul className="mt-6 space-y-3">
              {[
                "A professional, verified supplier profile with capabilities, certifications and reviews",
                "Direct messaging with buyers — no middlemen or commission on your sales",
                "Buyer leads matched to your categories, MOQ and shipping regions",
                "Analytics on profile views, inquiries and quote conversion",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-[14px] text-mp-ink-2">
                  <CheckIcon width={16} height={16} className="text-emerald-600 shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="mp-btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[13.5px] font-semibold mt-8">
              Create Your Listing <ArrowRightIcon width={14} height={14} />
            </Link>
          </div>
          <div className="mp-card p-7">
            <p className="text-[12px] font-semibold text-mp-ink-3 uppercase tracking-wide mb-4">Supplier Onboarding</p>
            <ol className="space-y-4">
              {["Create your account and company profile", "Submit business documentation for verification", "Add products, certifications and pricing", "Start receiving buyer messages and leads"].map((s, i) => (
                <li key={s} className="flex items-start gap-3 text-[13.5px] text-mp-ink-2">
                  <span className="w-6 h-6 rounded-full bg-mp-navy text-white text-[11px] font-semibold flex items-center justify-center shrink-0">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
