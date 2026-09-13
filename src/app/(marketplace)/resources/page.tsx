import type { Metadata } from "next";
import Link from "next/link";
import { getAllCategories } from "@/lib/marketplace/data";
import { ArrowRightIcon } from "@/components/marketplace/icons";

export const metadata: Metadata = {
  title: "Sourcing Resources",
  description: "Guides, market insights and product trends to help you source smarter.",
};

const GUIDES = [
  { title: "How to Vet a Manufacturer Before You Order", desc: "A step-by-step checklist for evaluating certifications, samples and factory audits." },
  { title: "Understanding MOQ, Lead Time and Pricing Tiers", desc: "What buyers should expect at each production volume and how to negotiate." },
  { title: "Private Label vs. White Label: What's the Difference?", desc: "Choosing the right manufacturing model for your brand." },
  { title: "A Buyer's Guide to Requesting Quotes", desc: "How to write an RFQ that gets fast, accurate responses from suppliers." },
];

export default function ResourcesPage() {
  const categories = getAllCategories().slice(0, 8);

  return (
    <div className="mp-container py-14">
      <h1 className="text-3xl md:text-[44px] font-bold tracking-tight text-mp-ink">Sourcing Resources</h1>
      <p className="text-[15px] text-mp-ink-2 mt-4 max-w-xl leading-relaxed">
        Guides, market insights and product trends to help you source smarter and build supplier relationships that last.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        {GUIDES.map((g) => (
          <div key={g.title} className="mp-card mp-card-hover p-6">
            <h3 className="font-semibold text-[15px] text-mp-ink">{g.title}</h3>
            <p className="text-[13.5px] text-mp-ink-2 mt-2 leading-relaxed">{g.desc}</p>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mp-accent mt-4">
              Read guide <ArrowRightIcon width={13} height={13} />
            </span>
          </div>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-mp-ink mb-5">Explore Product Trends by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.slug} href={`/products/${c.slug}`} className="text-[12.5px] font-medium px-3.5 py-1.5 rounded-full border border-mp-line hover:border-mp-line-2 text-mp-ink-2 hover:text-mp-ink transition-colors">
              {c.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
