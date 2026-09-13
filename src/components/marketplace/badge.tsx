import { ShieldCheckIcon, BoltIcon, StarIcon, SparkleIcon } from "./icons";
import type { ComponentType, SVGProps } from "react";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "Verified Supplier": ShieldCheckIcon,
  "Top Supplier": StarIcon,
  "Top Rated": StarIcon,
  "Fast Response": BoltIcon,
  "Premium Supplier": SparkleIcon,
};

const TONE: Record<string, string> = {
  "Verified Supplier": "bg-blue-50 text-blue-700 border-blue-100",
  "Premium Supplier": "bg-violet-50 text-violet-700 border-violet-100",
  "Top Rated": "bg-amber-50 text-amber-700 border-amber-100",
  "Top Supplier": "bg-amber-50 text-amber-700 border-amber-100",
  "Fast Response": "bg-emerald-50 text-emerald-700 border-emerald-100",
};

export function Badge({ label, size = "sm" }: { label: string; size?: "sm" | "xs" }) {
  const Icon = ICONS[label];
  const tone = TONE[label] ?? "bg-mp-paper text-mp-ink-2 border-mp-line-2";
  const pad = size === "xs" ? "px-2 py-[3px] text-[11px]" : "px-2.5 py-1 text-[12px]";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${pad} ${tone}`}>
      {Icon ? <Icon width={size === "xs" ? 11 : 12} height={size === "xs" ? 11 : 12} /> : null}
      {label}
    </span>
  );
}
