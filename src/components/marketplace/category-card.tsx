import Link from "next/link";
import type { Category } from "@/lib/marketplace/data";
import { ArrowUpRightIcon } from "./icons";

const GRADIENTS = [
  ["#EFF3FF", "#DCE6FF"],
  ["#F1EEFF", "#E3DBFF"],
  ["#EAF6FF", "#D6EEFF"],
  ["#F5F0FF", "#E8DEFF"],
];

export function CategoryCard({ category, index = 0 }: { category: Category; index?: number }) {
  const [c1, c2] = GRADIENTS[index % GRADIENTS.length];
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="mp-card mp-card-hover mp-shadow-sm group p-5 flex flex-col justify-between h-[168px]"
    >
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-[13px] font-bold text-mp-accent"
          style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
        >
          {category.glyph}
        </div>
        <ArrowUpRightIcon width={16} height={16} className="text-mp-ink-3 group-hover:text-mp-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
      <div>
        <h3 className="font-semibold text-[14.5px] text-mp-ink leading-snug">{category.name}</h3>
        <p className="text-[12.5px] text-mp-ink-3 mt-1">{category.supplierCount.toLocaleString("en-US")} suppliers</p>
      </div>
    </Link>
  );
}
