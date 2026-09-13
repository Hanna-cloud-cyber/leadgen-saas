"use client";

import Link from "next/link";
import { useState } from "react";
import type { Supplier } from "@/lib/marketplace/data";
import { getCountryBySlug, formatLeadTime, formatMOQ, getCategoryBySlug } from "@/lib/marketplace/data";
import { SupplierMark } from "./supplier-mark";
import { Badge } from "./badge";
import { StarIcon, ShieldCheckIcon, ArrowRightIcon } from "./icons";

export function SupplierCard({ supplier, compact = false }: { supplier: Supplier; compact?: boolean }) {
  const [saved, setSaved] = useState(false);
  const country = getCountryBySlug(supplier.countrySlug);

  return (
    <div className="mp-card mp-card-hover mp-shadow-sm p-6 flex flex-col h-full relative">
      <button
        onClick={() => setSaved((v) => !v)}
        aria-label="Save supplier"
        className="absolute top-5 right-5 w-8 h-8 rounded-full border border-mp-line flex items-center justify-center hover:border-mp-line-2 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "#2563EB" : "none"} stroke={saved ? "#2563EB" : "#8a8fa3"} strokeWidth="1.8">
          <path d="M6 3h12v18l-6-4-6 4V3z" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="flex items-start gap-3.5">
        <SupplierMark initials={supplier.initials} gradient={supplier.gradient} />
        <div className="min-w-0 pr-8">
          <Link href={`/suppliers/${supplier.slug}`} className="font-semibold text-[15.5px] text-mp-ink leading-tight hover:text-mp-accent transition-colors line-clamp-1">
            {supplier.name}
          </Link>
          <p className="text-[13px] text-mp-ink-2 mt-0.5 flex items-center gap-1.5">
            <span>{country?.flag}</span>
            {country?.name}
          </p>
        </div>
      </div>

      <p className="text-[13.5px] text-mp-ink-2 mt-3.5 leading-relaxed line-clamp-2">{supplier.tagline}</p>

      <div className="flex items-center gap-1.5 mt-3.5 flex-wrap">
        {supplier.verified && <Badge label="Verified Supplier" size="xs" />}
        <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-mp-ink">
          <StarIcon width={12} height={12} className="text-amber-500" />
          {supplier.rating.toFixed(1)}
        </span>
        <span className="text-[12.5px] text-mp-ink-3">({supplier.reviews} reviews)</span>
      </div>

      {!compact && (
        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {supplier.categorySlugs.slice(0, 3).map((c) => (
            <span key={c} className="text-[11.5px] px-2 py-1 rounded-md bg-mp-paper border border-mp-line text-mp-ink-2">
              {getCategoryBySlug(c)?.name}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-mp-line text-[12.5px]">
        <div>
          <p className="text-mp-ink-3">MOQ</p>
          <p className="font-medium text-mp-ink mt-0.5">{formatMOQ(supplier.moqUnits)}</p>
        </div>
        <div>
          <p className="text-mp-ink-3">Lead Time</p>
          <p className="font-medium text-mp-ink mt-0.5">{formatLeadTime(supplier)}</p>
        </div>
        <div>
          <p className="text-mp-ink-3">Private Label</p>
          <p className="font-medium text-mp-ink mt-0.5">{supplier.privateLabel ? "Available" : "Not available"}</p>
        </div>
        <div>
          <p className="text-mp-ink-3">Custom Branding</p>
          <p className="font-medium text-mp-ink mt-0.5">{supplier.customPackaging ? "Available" : "Not available"}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-5">
        <Link
          href={`/suppliers/${supplier.slug}`}
          className="flex-1 text-center text-[13px] font-semibold border border-mp-line rounded-lg py-2.5 hover:border-mp-ink/30 transition-colors inline-flex items-center justify-center gap-1.5"
        >
          View Profile
          <ArrowRightIcon width={13} height={13} />
        </Link>
        <Link
          href={`/rfq?supplier=${supplier.slug}`}
          className="flex-1 text-center text-[13px] font-semibold mp-btn-primary rounded-lg py-2.5"
        >
          Request Quote
        </Link>
      </div>
    </div>
  );
}

export function VerifiedShield() {
  return <ShieldCheckIcon width={13} height={13} />;
}
