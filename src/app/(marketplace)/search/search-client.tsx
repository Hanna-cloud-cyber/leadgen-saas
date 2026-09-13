"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getAllSuppliers,
  getAllCategories,
  getAllCountries,
  type Supplier,
  type SupplierType,
} from "@/lib/marketplace/data";
import { SupplierCard } from "@/components/marketplace/supplier-card";
import { GridIcon, ListIcon, FilterIcon, ShieldCheckIcon } from "@/components/marketplace/icons";

type SortKey = "recommended" | "top-rated" | "lowest-moq" | "newest";

const MOQ_OPTIONS = [
  { label: "Any MOQ", value: 0 },
  { label: "Under 100 units", value: 100 },
  { label: "Under 500 units", value: 500 },
  { label: "Under 1,000 units", value: 1000 },
];

const SUPPLIER_TYPES: SupplierType[] = ["Manufacturer", "Wholesaler", "Distributor"];

export function SearchClient() {
  const params = useSearchParams();
  const allSuppliers = getAllSuppliers();
  const categories = getAllCategories();
  const countries = getAllCountries();

  const [query, setQuery] = useState(params.get("q") ?? "");
  const [categorySlugs, setCategorySlugs] = useState<string[]>(params.get("category") ? [params.get("category")!] : []);
  const [countrySlugs, setCountrySlugs] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [privateLabel, setPrivateLabel] = useState(false);
  const [customPackaging, setCustomPackaging] = useState(false);
  const [maxMoq, setMaxMoq] = useState(0);
  const [types, setTypes] = useState<SupplierType[]>([]);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = <T,>(arr: T[], value: T, setter: (v: T[]) => void) => {
    setter(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = allSuppliers.filter((s: Supplier) => {
      if (q) {
        const haystack = `${s.name} ${s.tagline} ${s.categorySlugs.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (categorySlugs.length && !categorySlugs.some((c) => s.categorySlugs.includes(c))) return false;
      if (countrySlugs.length && !countrySlugs.includes(s.countrySlug)) return false;
      if (verifiedOnly && !s.verified) return false;
      if (privateLabel && !s.privateLabel) return false;
      if (customPackaging && !s.customPackaging) return false;
      if (maxMoq && s.moqUnits > maxMoq) return false;
      if (types.length && !types.includes(s.type)) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "top-rated") return b.rating - a.rating;
      if (sort === "lowest-moq") return a.moqUnits - b.moqUnits;
      if (sort === "newest") return a.yearsInBusiness - b.yearsInBusiness;
      return Number(b.featured) - Number(a.featured) || b.rating - a.rating;
    });

    return list;
  }, [allSuppliers, query, categorySlugs, countrySlugs, verifiedOnly, privateLabel, customPackaging, maxMoq, types, sort]);

  return (
    <div className="mp-container py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Find Suppliers</h1>
          <p className="text-[13.5px] text-mp-ink-2 mt-1">Search verified manufacturers, wholesalers and distributors worldwide.</p>
        </div>
        <div className="relative w-full sm:w-80">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search suppliers, products, categories..."
            className="w-full border border-mp-line-2 rounded-lg pl-4 pr-4 py-2.5 text-[13.5px] outline-none focus:border-mp-accent transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        {/* Filters */}
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="lg:hidden flex items-center gap-2 border border-mp-line-2 rounded-lg px-4 py-2.5 text-[13px] font-medium mb-2"
        >
          <FilterIcon width={15} height={15} /> Filters
        </button>

        <aside className={`${filtersOpen ? "block" : "hidden"} lg:block space-y-7`}>
          <FilterGroup title="Supplier Type">
            {SUPPLIER_TYPES.map((t) => (
              <Checkbox key={t} label={t} checked={types.includes(t)} onChange={() => toggle(types, t, setTypes)} />
            ))}
          </FilterGroup>

          <FilterGroup title="Category">
            <div className="max-h-52 overflow-y-auto pr-1 space-y-2.5">
              {categories.map((c) => (
                <Checkbox
                  key={c.slug}
                  label={c.name}
                  checked={categorySlugs.includes(c.slug)}
                  onChange={() => toggle(categorySlugs, c.slug, setCategorySlugs)}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Country">
            <div className="max-h-52 overflow-y-auto pr-1 space-y-2.5">
              {countries.map((c) => (
                <Checkbox
                  key={c.slug}
                  label={`${c.flag} ${c.name}`}
                  checked={countrySlugs.includes(c.slug)}
                  onChange={() => toggle(countrySlugs, c.slug, setCountrySlugs)}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Minimum Order Quantity">
            <div className="space-y-2.5">
              {MOQ_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 text-[13px] text-mp-ink-2 cursor-pointer">
                  <input
                    type="radio"
                    name="moq"
                    checked={maxMoq === opt.value}
                    onChange={() => setMaxMoq(opt.value)}
                    className="accent-blue-600"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Capabilities">
            <Checkbox label="Verified only" checked={verifiedOnly} onChange={() => setVerifiedOnly((v) => !v)} icon={ShieldCheckIcon} />
            <Checkbox label="Private label" checked={privateLabel} onChange={() => setPrivateLabel((v) => !v)} />
            <Checkbox label="Custom packaging" checked={customPackaging} onChange={() => setCustomPackaging((v) => !v)} />
          </FilterGroup>
        </aside>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <p className="text-[13.5px] text-mp-ink-2">
              <span className="font-semibold text-mp-ink">{results.length.toLocaleString("en-US")}</span> suppliers found
            </p>
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="border border-mp-line-2 rounded-lg px-3 py-2 text-[13px] outline-none bg-white"
              >
                <option value="recommended">Recommended</option>
                <option value="top-rated">Top Rated</option>
                <option value="lowest-moq">Lowest MOQ</option>
                <option value="newest">Newest</option>
              </select>
              <div className="flex items-center border border-mp-line-2 rounded-lg overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2.5 ${view === "grid" ? "bg-mp-ink text-white" : "text-mp-ink-2"}`}
                  aria-label="Grid view"
                >
                  <GridIcon width={15} height={15} />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2.5 ${view === "list" ? "bg-mp-ink text-white" : "text-mp-ink-2"}`}
                  aria-label="List view"
                >
                  <ListIcon width={15} height={15} />
                </button>
              </div>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="mp-card p-12 text-center text-mp-ink-2 text-sm">
              No suppliers match your filters. Try adjusting your search.
            </div>
          ) : (
            <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" : "flex flex-col gap-4"}>
              {results.map((s) => (
                <SupplierCard key={s.slug} supplier={s} compact={view === "list"} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pb-6 border-b border-mp-line last:border-0">
      <h3 className="text-[12.5px] font-semibold text-mp-ink uppercase tracking-wide mb-3">{title}</h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
  icon: Icon,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  icon?: React.ComponentType<{ width?: number; height?: number; className?: string }>;
}) {
  return (
    <label className="flex items-center gap-2.5 text-[13px] text-mp-ink-2 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-blue-600 w-3.5 h-3.5" />
      {Icon && <Icon width={13} height={13} className="text-mp-ink-3" />}
      {label}
    </label>
  );
}
