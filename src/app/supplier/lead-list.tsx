"use client";

import { useState } from "react";
import { getAllCountries } from "@/lib/marketplace/data";
import { CoinsIcon, CheckIcon } from "@/components/marketplace/icons";

interface Lead {
  id: string;
  product: string;
  quantity: string;
  budget: string;
  market: string;
  credits: number;
  highIntent?: boolean;
  time: string;
}

const countries = getAllCountries();

const LEADS: Lead[] = [
  { id: "L-8891", product: "Private Label Skincare", quantity: "5,000 units", budget: "$15,000 – $25,000", market: `${countries[0].flag} United States`, credits: 5, highIntent: true, time: "2 hours ago" },
  { id: "L-8887", product: "Vegan Lip Balm Line", quantity: "1,200 units", budget: "$3,000 – $6,000", market: `${countries[6].flag} France`, credits: 1, time: "6 hours ago" },
  { id: "L-8874", product: "Custom Serum Packaging", quantity: "8,000 units", budget: "$9,000 – $14,000", market: `${countries[4].flag} United Kingdom`, credits: 3, time: "1 day ago" },
  { id: "L-8860", product: "Sheet Mask Private Label", quantity: "10,000 units", budget: "$20,000+", market: `${countries[0].flag} United States`, credits: 8, highIntent: true, time: "2 days ago" },
];

export function LeadList({ limit }: { limit?: number }) {
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const leads = limit ? LEADS.slice(0, limit) : LEADS;

  return (
    <div className="space-y-4">
      {leads.map((lead) => {
        const isUnlocked = unlocked.includes(lead.id);
        return (
          <div key={lead.id} className="mp-card p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="mp-badge">New buyer request</span>
                  {lead.highIntent && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5">
                      High Intent Buyer
                    </span>
                  )}
                </div>
                <p className="font-semibold text-[14.5px] text-mp-ink mt-2.5">{lead.product}</p>
                <p className="text-[12.5px] text-mp-ink-3 mt-0.5">{lead.time}</p>
              </div>
              {!isUnlocked ? (
                <button
                  onClick={() => setUnlocked((prev) => [...prev, lead.id])}
                  className="mp-btn-primary rounded-lg px-4 py-2.5 text-[12.5px] font-semibold inline-flex items-center gap-2 shrink-0"
                >
                  <CoinsIcon width={14} height={14} /> Unlock — {lead.credits} credit{lead.credits > 1 ? "s" : ""}
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 shrink-0">
                  <CheckIcon width={14} height={14} /> Unlocked
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-mp-line text-[13px]">
              <div>
                <p className="text-mp-ink-3">Quantity</p>
                <p className="font-medium text-mp-ink mt-0.5">{lead.quantity}</p>
              </div>
              <div>
                <p className="text-mp-ink-3">Market</p>
                <p className="font-medium text-mp-ink mt-0.5">{lead.market}</p>
              </div>
              <div>
                <p className="text-mp-ink-3">Budget</p>
                <p className="font-medium text-mp-ink mt-0.5">{lead.budget}</p>
              </div>
            </div>

            {isUnlocked && (
              <div className="mt-4 pt-4 border-t border-mp-line text-[13px] text-mp-ink-2">
                <p><span className="text-mp-ink-3">Buyer contact:</span> <span className="font-medium text-mp-ink">buyer-{lead.id.toLowerCase()}@brandmail.com</span></p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
