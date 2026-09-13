"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAllCategories, getAllCountries, getSupplierBySlug } from "@/lib/marketplace/data";
import { UploadIcon, CheckIcon, CoinsIcon } from "@/components/marketplace/icons";

export function RfqClient() {
  const params = useSearchParams();
  const supplierSlug = params.get("supplier");
  const supplier = supplierSlug ? getSupplierBySlug(supplierSlug) : undefined;
  const categories = getAllCategories();
  const countries = getAllCountries();

  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  if (submitted) {
    return (
      <div className="mp-container py-24 max-w-lg mx-auto text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto">
          <CheckIcon width={24} height={24} className="text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-mp-ink mt-6">Request submitted</h1>
        <p className="text-[14.5px] text-mp-ink-2 mt-3 leading-relaxed">
          Your request has been sent to relevant verified suppliers{supplier ? ` including ${supplier.name}` : ""}. You&apos;ll
          receive quotes in your buyer dashboard as suppliers respond.
        </p>
        <a href="/account/rfqs" className="mp-btn-primary inline-block mt-7 rounded-lg px-6 py-3 text-[13.5px] font-semibold">
          View My RFQs
        </a>
      </div>
    );
  }

  return (
    <div className="mp-container py-14 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">
      <div>
        <p className="text-[12.5px] font-semibold text-mp-accent uppercase tracking-wider">Request for Quote</p>
        <h1 className="text-3xl md:text-[42px] font-bold tracking-tight text-mp-ink mt-3 leading-[1.1]">
          Tell us what you need.
          <br />
          Let suppliers compete for your business.
        </h1>
        <p className="text-[14.5px] text-mp-ink-2 mt-4 max-w-lg leading-relaxed">
          Receive quotes from relevant verified suppliers{supplier ? ` — starting with ${supplier.name}` : ""} without
          contacting each one individually.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="mt-9 space-y-5 max-w-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Product">
              <input required placeholder="e.g. Organic skincare set" className="mp-input" />
            </Field>
            <Field label="Category">
              <select required defaultValue="" className="mp-input">
                <option value="" disabled>Select a category</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Estimated Quantity">
              <input required type="number" min={1} placeholder="e.g. 5000" className="mp-input" />
            </Field>
            <Field label="Target Price (per unit)">
              <input type="text" placeholder="e.g. $4.50" className="mp-input" />
            </Field>
            <Field label="Country / Market">
              <select defaultValue="" className="mp-input">
                <option value="">Any country</option>
                {countries.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Private Label Required?">
              <select defaultValue="Not sure" className="mp-input">
                <option>Yes</option>
                <option>No</option>
                <option>Not sure</option>
              </select>
            </Field>
          </div>

          <Field label="Description">
            <textarea
              required
              rows={4}
              placeholder="Describe your product, target specifications, packaging needs, timeline..."
              className="mp-input resize-none"
            />
          </Field>

          <Field label="Product Image (optional)">
            <label className="flex items-center gap-3 border border-dashed border-mp-line-2 rounded-lg px-4 py-4 cursor-pointer hover:border-mp-accent transition-colors">
              <UploadIcon width={18} height={18} className="text-mp-ink-3" />
              <span className="text-[13px] text-mp-ink-2">{fileName ?? "Click to upload an image"}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
            </label>
          </Field>

          <button type="submit" className="mp-btn-primary rounded-lg px-7 py-3.5 text-[14px] font-semibold w-full sm:w-auto">
            Submit Request
          </button>
          <p className="text-[12px] text-mp-ink-3">By submitting, you agree suppliers matching your request may contact you directly.</p>
        </form>
      </div>

      <aside className="lg:sticky lg:top-24 self-start">
        <p className="text-[12.5px] font-semibold text-mp-ink-2 uppercase tracking-wide mb-3">Preview — supplier side</p>
        <div className="mp-card mp-shadow-lg p-6">
          <div className="flex items-center justify-between">
            <span className="mp-badge">New buyer request</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5">
              High Intent Buyer
            </span>
          </div>
          <div className="mt-5 space-y-4 text-[13.5px]">
            <Row label="Product" value="Private Label Skincare" />
            <Row label="Quantity" value="5,000 units" />
            <Row label="Market" value="United States 🇺🇸" />
            <Row label="Budget" value="$15,000 – $25,000" />
          </div>
          <button className="w-full mt-6 mp-btn-primary rounded-lg py-3 text-[13.5px] font-semibold inline-flex items-center justify-center gap-2">
            <CoinsIcon width={15} height={15} /> Unlock Lead — 3 credits
          </button>
        </div>
        <p className="text-[12px] text-mp-ink-3 mt-3 leading-relaxed">
          This is how your request appears to matching suppliers before they choose to unlock and respond to it.
        </p>
      </aside>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-mp-ink mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-mp-ink-3">{label}</span>
      <span className="font-medium text-mp-ink">{value}</span>
    </div>
  );
}
