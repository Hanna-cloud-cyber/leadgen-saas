"use client";

import { useState } from "react";
import Link from "next/link";
import { matchSuppliers, type MatchResult } from "@/lib/marketplace/ai-match";
import { getCountryBySlug, formatMOQ, formatLeadTime } from "@/lib/marketplace/data";
import { SupplierMark } from "@/components/marketplace/supplier-mark";
import { Badge } from "@/components/marketplace/badge";
import { SparkleIcon, CheckIcon, StarIcon } from "@/components/marketplace/icons";

const EXAMPLE = "I want a manufacturer for premium women's activewear, MOQ under 500, shipping to the US.";

export function AiMatchClient() {
  const [description, setDescription] = useState("");
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  const runMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResults(matchSuppliers(description));
      setLoading(false);
    }, 700);
  };

  return (
    <div className="mp-container py-14">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-violet-50 border border-violet-100 text-violet-700 rounded-full px-3.5 py-1.5 text-[12px] font-semibold">
          <SparkleIcon width={12} height={12} /> AI Sourcing Assistant
        </div>
        <h1 className="text-3xl md:text-[46px] font-bold tracking-tight text-mp-ink mt-5">AI Supplier Match</h1>
        <p className="text-[15px] text-mp-ink-2 mt-4 leading-relaxed">
          Describe what you&apos;re sourcing in plain language. Our matching engine scores every verified supplier against your
          requirements — category, MOQ, shipping and more.
        </p>
      </div>

      <form onSubmit={runMatch} className="max-w-2xl mx-auto mt-10">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder={EXAMPLE}
          className="mp-input resize-none text-[14.5px]"
        />
        <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setDescription(EXAMPLE)}
            className="text-[12.5px] text-mp-ink-3 hover:text-mp-ink-2 underline underline-offset-2"
          >
            Try an example
          </button>
          <button type="submit" disabled={loading} className="mp-btn-primary rounded-lg px-6 py-3 text-[13.5px] font-semibold disabled:opacity-60">
            {loading ? "Matching..." : "Find Matches"}
          </button>
        </div>
      </form>

      {results && (
        <div className="max-w-3xl mx-auto mt-14">
          <h2 className="text-lg font-semibold text-mp-ink mb-5">Best Matches</h2>
          <div className="space-y-4">
            {results.map((r) => (
              <MatchCard key={r.supplier.slug} result={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MatchCard({ result }: { result: MatchResult }) {
  const { supplier, score, reasons } = result;
  const country = getCountryBySlug(supplier.countrySlug);
  const tone = score >= 90 ? "text-emerald-600 bg-emerald-50 border-emerald-100" : score >= 75 ? "text-blue-600 bg-blue-50 border-blue-100" : "text-mp-ink-2 bg-mp-paper border-mp-line";

  return (
    <div className="mp-card p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3.5">
          <SupplierMark initials={supplier.initials} gradient={supplier.gradient} size={44} />
          <div>
            <Link href={`/suppliers/${supplier.slug}`} className="font-semibold text-[14.5px] text-mp-ink hover:text-mp-accent">
              {supplier.name}
            </Link>
            <p className="text-[12.5px] text-mp-ink-2 mt-0.5">{country?.flag} {country?.name} · {formatMOQ(supplier.moqUnits)} · {formatLeadTime(supplier)}</p>
          </div>
        </div>
        <span className={`text-[13px] font-bold px-3 py-1.5 rounded-full border ${tone}`}>{score}% Match</span>
      </div>

      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <Badge label="Verified Supplier" size="xs" />
        <span className="inline-flex items-center gap-1 text-[12px] text-mp-ink-2">
          <StarIcon width={11} height={11} className="text-amber-500" /> {supplier.rating.toFixed(1)}
        </span>
      </div>

      {reasons.length > 0 && (
        <div className="mt-4 pt-4 border-t border-mp-line">
          <p className="text-[11.5px] font-semibold text-mp-ink-3 uppercase tracking-wide mb-2">Why this supplier matches</p>
          <ul className="space-y-1.5">
            {reasons.map((r) => (
              <li key={r} className="flex items-center gap-2 text-[13px] text-mp-ink-2">
                <CheckIcon width={13} height={13} className="text-emerald-600 shrink-0" /> {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-2 mt-4">
        <Link href={`/suppliers/${supplier.slug}`} className="flex-1 text-center text-[12.5px] font-semibold border border-mp-line rounded-lg py-2 hover:border-mp-ink/30 transition-colors">
          View Profile
        </Link>
        <Link href={`/rfq?supplier=${supplier.slug}`} className="flex-1 text-center text-[12.5px] font-semibold mp-btn-primary rounded-lg py-2">
          Request Quote
        </Link>
      </div>
    </div>
  );
}
