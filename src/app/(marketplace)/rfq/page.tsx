import type { Metadata } from "next";
import { Suspense } from "react";
import { RfqClient } from "./rfq-client";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Submit your sourcing requirements and receive quotes from relevant verified suppliers.",
};

export default function RfqPage() {
  return (
    <Suspense fallback={null}>
      <RfqClient />
    </Suspense>
  );
}
