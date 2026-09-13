import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheckIcon, CheckIcon, LockIcon, UsersIcon, BoxIcon, StarIcon } from "@/components/marketplace/icons";

export const metadata: Metadata = {
  title: "How Supplier Verification Works",
  description: "Every supplier on Veridian passes identity verification, business documentation checks and, for manufacturers, factory validation.",
};

const STEPS = [
  { icon: UsersIcon, title: "Identity verification", desc: "We confirm the identity of the business owner or authorized representative behind every supplier account." },
  { icon: BoxIcon, title: "Company verification", desc: "Business registration, incorporation records and operating history are checked against official registries." },
  { icon: LockIcon, title: "Business documentation", desc: "Suppliers submit licenses, export documentation and, where applicable, factory ownership records." },
  { icon: ShieldCheckIcon, title: "Certifications review", desc: "Quality, safety and sustainability certifications are validated before being displayed on a supplier profile." },
  { icon: StarIcon, title: "Ongoing buyer reviews", desc: "Verified buyers leave reviews after working with a supplier, adding a continuous trust signal beyond onboarding." },
];

export default function VerificationPage() {
  return (
    <div className="mp-container py-16">
      <div className="max-w-2xl mx-auto text-center">
        <ShieldCheckIcon width={40} height={40} className="text-mp-accent mx-auto" />
        <h1 className="text-3xl md:text-[44px] font-bold tracking-tight text-mp-ink mt-5">How Supplier Verification Works</h1>
        <p className="text-[15px] text-mp-ink-2 mt-4 leading-relaxed">
          Trust is the foundation of global sourcing. Every supplier on Veridian passes a multi-step verification process
          before they can be contacted, listed or receive buyer requests.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mt-14 space-y-5">
        {STEPS.map((s, i) => (
          <div key={s.title} className="mp-card p-6 flex items-start gap-5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-mp-accent shrink-0">
              <s.icon width={20} height={20} />
            </div>
            <div>
              <p className="text-[11.5px] font-semibold text-mp-ink-3 uppercase tracking-wide">Step {i + 1}</p>
              <h3 className="font-semibold text-[15.5px] text-mp-ink mt-1">{s.title}</h3>
              <p className="text-[13.5px] text-mp-ink-2 mt-1.5 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto mt-14 mp-card p-7">
        <h2 className="font-semibold text-lg text-mp-ink mb-4">What buyers can trust</h2>
        <ul className="space-y-3">
          {[
            "Verified suppliers display a Verified Supplier badge on their profile and in search results.",
            "Business documentation is re-checked periodically to keep verification current.",
            "Suppliers that fail to maintain standards or accumulate negative reviews are suspended.",
            "Buyer reviews are tied to completed interactions, not open to anonymous submissions.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-[13.5px] text-mp-ink-2">
              <CheckIcon width={15} height={15} className="text-emerald-600 shrink-0 mt-0.5" /> {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center mt-14">
        <Link href="/search" className="mp-btn-primary inline-block rounded-lg px-7 py-3.5 text-[14px] font-semibold">
          Browse Verified Suppliers
        </Link>
      </div>
    </div>
  );
}
