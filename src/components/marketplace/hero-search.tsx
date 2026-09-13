"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchIcon } from "./icons";

const SUGGESTIONS = ["Clothing", "Beauty", "Electronics", "Home", "Jewelry", "Packaging", "Private Label"];

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const submit = (e?: React.FormEvent, override?: string) => {
    e?.preventDefault();
    const q = override ?? query;
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <div className="mp-fade-up" style={{ animationDelay: "150ms" }}>
      <form
        onSubmit={submit}
        className="flex flex-col sm:flex-row items-stretch gap-2 bg-white border border-mp-line-2 rounded-2xl p-2 mp-shadow-lg max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-2.5 flex-1 px-3.5">
          <SearchIcon width={18} height={18} className="text-mp-ink-3 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, suppliers or categories..."
            className="w-full py-3 text-[14.5px] outline-none placeholder:text-mp-ink-3 bg-transparent"
          />
        </div>
        <button type="submit" className="mp-btn-primary rounded-xl px-6 py-3.5 text-[14px] font-semibold whitespace-nowrap">
          Search Suppliers
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => submit(undefined, s)}
            className="text-[12.5px] font-medium text-mp-ink-2 bg-white/70 border border-mp-line rounded-full px-3.5 py-1.5 hover:border-mp-line-2 hover:text-mp-ink transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
