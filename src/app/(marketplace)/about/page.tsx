import type { Metadata } from "next";
import { StatCounter } from "@/components/marketplace/stat-counter";

export const metadata: Metadata = {
  title: "About Veridian",
  description: "Veridian is the global B2B sourcing platform connecting brands with verified manufacturers, wholesalers and distributors.",
};

export default function AboutPage() {
  return (
    <div className="mp-container py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl md:text-[46px] font-bold tracking-tight text-mp-ink">Building the trust layer for global sourcing</h1>
        <p className="text-[15px] text-mp-ink-2 mt-5 leading-relaxed">
          Veridian was founded on a simple belief: sourcing a product internationally shouldn&apos;t require blind trust in a
          directory listing. Every supplier on our platform is verified, every buyer request is real, and every
          conversation happens directly between the two parties who matter — no middlemen, no markups.
        </p>
        <p className="text-[15px] text-mp-ink-2 mt-4 leading-relaxed">
          Today, thousands of founders, e-commerce brands, retailers and agencies use Veridian to find manufacturing and
          wholesale partners across North America, Europe, Asia and the Middle East.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 border-t border-mp-line pt-12">
        <StatCounter value={10000} suffix="+" label="Verified Suppliers" />
        <StatCounter value={120} suffix="+" label="Countries" />
        <StatCounter value={50000} suffix="+" label="Products" />
        <StatCounter value={2500} suffix="+" label="Buyer Requests / month" />
      </div>
    </div>
  );
}
