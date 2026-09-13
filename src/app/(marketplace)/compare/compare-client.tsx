"use client";

import { useState } from "react";
import Link from "next/link";
import { getAllSuppliers, getCountryBySlug, formatLeadTime, formatMOQ } from "@/lib/marketplace/data";
import { SupplierMark } from "@/components/marketplace/supplier-mark";
import { StarIcon, CheckIcon, CompareIcon } from "@/components/marketplace/icons";

const MAX = 4;

export function CompareClient() {
  const all = getAllSuppliers();
  const [selected, setSelected] = useState<string[]>([all[0].slug, all[3].slug]);
  const [picker, setPicker] = useState("");

  const suppliers = selected.map((slug) => all.find((s) => s.slug === slug)!).filter(Boolean);
  const available = all.filter((s) => !selected.includes(s.slug));

  const addSupplier = (slug: string) => {
    if (!slug || selected.length >= MAX) return;
    setSelected((prev) => [...prev, slug]);
    setPicker("");
  };

  const removeSupplier = (slug: string) => setSelected((prev) => prev.filter((s) => s !== slug));

  return (
    <div className="mp-container py-10">
      <div className="flex items-center gap-3">
        <CompareIcon width={22} height={22} className="text-mp-accent" />
        <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Compare Suppliers</h1>
      </div>
      <p className="text-[14px] text-mp-ink-2 mt-2 max-w-xl">
        Select up to {MAX} suppliers to compare pricing approach, MOQ, lead time and certifications side by side.
      </p>

      {selected.length < MAX && (
        <div className="mt-6 flex items-center gap-3">
          <select
            value={picker}
            onChange={(e) => addSupplier(e.target.value)}
            className="mp-input max-w-xs"
          >
            <option value="">+ Add a supplier to compare</option>
            {available.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
          <span className="text-[12.5px] text-mp-ink-3">{selected.length}/{MAX} selected</span>
        </div>
      )}

      {suppliers.length === 0 ? (
        <div className="mp-card p-12 text-center text-mp-ink-2 text-sm mt-8">Add suppliers above to start comparing.</div>
      ) : (
        <div className="overflow-x-auto mt-8 -mx-6 px-6">
          <table className="w-full border-collapse min-w-[720px]">
            <thead>
              <tr>
                <th className="text-left text-[12px] font-semibold text-mp-ink-3 uppercase tracking-wide py-3 pr-4 w-40">Supplier</th>
                {suppliers.map((s) => (
                  <th key={s.slug} className="text-left align-top py-3 px-4 border-b border-mp-line min-w-[200px]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <SupplierMark initials={s.initials} gradient={s.gradient} size={36} />
                        <Link href={`/suppliers/${s.slug}`} className="font-semibold text-[13.5px] text-mp-ink hover:text-mp-accent">
                          {s.name}
                        </Link>
                      </div>
                      <button onClick={() => removeSupplier(s.slug)} className="text-mp-ink-3 hover:text-mp-ink text-lg leading-none">×</button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[13.5px]">
              <CompareRow label="Country" values={suppliers.map((s) => `${getCountryBySlug(s.countrySlug)?.flag} ${getCountryBySlug(s.countrySlug)?.name}`)} />
              <CompareRow
                label="Rating"
                values={suppliers.map((s) => (
                  <span key={s.slug} className="inline-flex items-center gap-1 font-medium">
                    <StarIcon width={13} height={13} className="text-amber-500" /> {s.rating.toFixed(1)} ({s.reviews})
                  </span>
                ))}
              />
              <CompareRow label="Supplier Type" values={suppliers.map((s) => s.type)} />
              <CompareRow label="MOQ" values={suppliers.map((s) => formatMOQ(s.moqUnits))} />
              <CompareRow label="Pricing" values={suppliers.map(() => "Custom quote via RFQ")} />
              <CompareRow label="Lead Time" values={suppliers.map((s) => formatLeadTime(s))} />
              <CompareRow label="Private Label" values={suppliers.map((s) => (s.privateLabel ? <Yes key="y" /> : <No key="n" />))} />
              <CompareRow label="Custom Packaging" values={suppliers.map((s) => (s.customPackaging ? <Yes key="y" /> : <No key="n" />))} />
              <CompareRow label="Certifications" values={suppliers.map((s) => s.certifications.join(", ") || "—")} />
              <CompareRow label="Response Time" values={suppliers.map((s) => s.responseTimeLabel)} />
              <tr>
                <td className="py-4 pr-4 text-[12px] text-mp-ink-3">Actions</td>
                {suppliers.map((s) => (
                  <td key={s.slug} className="py-4 px-4">
                    <Link href={`/rfq?supplier=${s.slug}`} className="mp-btn-primary inline-block rounded-lg px-4 py-2 text-[12.5px] font-semibold">
                      Request Quote
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CompareRow({ label, values }: { label: string; values: React.ReactNode[] }) {
  return (
    <tr className="border-b border-mp-line">
      <td className="py-4 pr-4 text-[12px] font-medium text-mp-ink-3 uppercase tracking-wide align-top">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="py-4 px-4 text-mp-ink align-top">{v}</td>
      ))}
    </tr>
  );
}

function Yes() {
  return (
    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
      <CheckIcon width={14} height={14} /> Available
    </span>
  );
}

function No() {
  return <span className="text-mp-ink-3">Not available</span>;
}
