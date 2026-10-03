import { store, usd } from "@/data";

// "$39 $66" with the regular price struck through.
export default function SalePrice({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      {usd(store.priceCents)}{" "}
      <s className="opacity-60 font-normal">{usd(store.compareAtCents)}</s>
    </span>
  );
}
