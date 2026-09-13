import type { Metadata } from "next";
import { CompareClient } from "./compare-client";

export const metadata: Metadata = {
  title: "Compare Suppliers",
  description: "Compare up to 4 verified suppliers side by side — rating, MOQ, lead time, private label and certifications.",
};

export default function ComparePage() {
  return <CompareClient />;
}
