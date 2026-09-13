import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchClient } from "./search-client";

export const metadata: Metadata = {
  title: "Search Suppliers",
  description: "Search and filter 10,000+ verified manufacturers, wholesalers and distributors worldwide.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchClient />
    </Suspense>
  );
}
