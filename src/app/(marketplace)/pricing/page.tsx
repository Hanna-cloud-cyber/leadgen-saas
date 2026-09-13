import type { Metadata } from "next";
import { PricingClient } from "./pricing-client";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for buyers and suppliers. Unlock unlimited supplier access, RFQ tools and lead generation.",
};

export default function PricingPage() {
  return <PricingClient />;
}
