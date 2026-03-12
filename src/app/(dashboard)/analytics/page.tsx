"use client";

import { useEffect, useState } from "react";
import { buildConversionFunnel, type QuotaUsage, type RankingItem, type FunnelStep } from "@/lib/analytics";

interface AnalyticsStats {
  totalLeads: number;
  totalContacts: number;
  totalEmailsSent: number;
  totalReplies: number;
  leadsThisMonth: number;
  leadsLastMonth: number;
  growthRate: number;
  avgLeadScore: number;
}

interface FunnelData {
  searches: number;
  leadsFound: number;
  withEmail: number;
  emailsVerified: number;
  emailsSent: number;
  replies: number;
}

interface AnalyticsData {
  stats: AnalyticsStats;
  topSectors: RankingItem[];
  topCountries: RankingItem[];
  funnel: FunnelData;
  quota: QuotaUsage;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/analytics");
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Erreur lors du chargement des analytics");
        }
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-gray-400 mt-1">Chargement...</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5 animate-pulse">
              <div className="h-8 bg-gray-800 rounded w-16 mb-2"></div>
              <div className="h-4 bg-gray-800 rounded w-24"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 animate-pulse">
              <div className="h-5 bg-gray-800 rounded w-40 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-4 bg-gray-800 rounded w-full"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-red-400 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  const stats = data?.stats ?? {
    totalLeads: 0,
    totalContacts: 0,
    totalEmailsSent: 0,
    totalReplies: 0,
    leadsThisMonth: 0,
    leadsLastMonth: 0,
    growthRate: 0,
    avgLeadScore: 0,
  };

  const funnel: FunnelStep[] = data
    ? buildConversionFunnel(data.funnel)
    : [];

  const quota: QuotaUsage = data?.quota ?? {
    leads: { used: 0, limit: 0, percentage: 0 },
    contacts: { used: 0, limit: 0, percentage: 0 },
    verifications: { used: 0, limit: 0, percentage: 0 },
    aiEmails: { used: 0, limit: 0, percentage: 0 },
    campaigns: { used: 0, limit: 0, percentage: 0 },
  };

  const topSectors = data?.topSectors ?? [];
  const topCountries = data?.topCountries ?? [];

  const replyRate = stats.totalEmailsSent > 0
    ? Math.round((stats.totalReplies / stats.totalEmailsSent) * 100)
    : 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-gray-400 mt-1">Vue d&apos;ensemble de votre activité</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Leads ce mois", value: stats.leadsThisMonth, change: `+${stats.growthRate}%`, positive: stats.growthRate >= 0 },
          { label: "Total contacts", value: stats.totalContacts, change: "", positive: true },
          { label: "Emails envoyés", value: stats.totalEmailsSent, change: "", positive: true },
          { label: "Réponses", value: stats.totalReplies, change: `${replyRate}%`, positive: true },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-3xl font-bold text-white">{kpi.value}</p>
            <p className="text-sm text-gray-400 mt-1">{kpi.label}</p>
            {kpi.change && (
              <p className={`text-xs mt-2 ${kpi.positive ? "text-green-400" : "text-red-400"}`}>
                {kpi.change}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Funnel de conversion</h2>
          {funnel.length > 0 ? (
            <div className="space-y-3">
              {funnel.map((step) => (
                <div key={step.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{step.label}</span>
                    <span className="text-gray-400">{step.count} ({step.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full transition-all"
                      style={{ width: `${step.percentage}%`, backgroundColor: step.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Aucune donnée</p>
          )}
        </div>

        {/* Quota Usage */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Utilisation des quotas</h2>
          <div className="space-y-4">
            {Object.entries(quota).map(([key, qData]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300 capitalize">{key}</span>
                  <span className="text-gray-400">{qData.used}/{qData.limit === 0 ? "N/A" : qData.limit}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      qData.percentage >= 80 ? "bg-red-500" :
                      qData.percentage >= 50 ? "bg-yellow-500" :
                      "bg-indigo-500"
                    }`}
                    style={{ width: `${qData.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sectors */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Top secteurs</h2>
          {topSectors.length > 0 ? (
            <div className="space-y-3">
              {topSectors.map((sector, i) => (
                <div key={sector.label} className="flex items-center gap-3">
                  <span className="text-gray-500 text-sm w-4">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{sector.label}</span>
                      <span className="text-gray-400">{sector.count}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${sector.percentage}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Aucune donnée</p>
          )}
        </div>

        {/* Top Countries */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Top pays</h2>
          {topCountries.length > 0 ? (
            <div className="space-y-3">
              {topCountries.map((country, i) => (
                <div key={country.label} className="flex items-center gap-3">
                  <span className="text-gray-500 text-sm w-4">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{country.label}</span>
                      <span className="text-gray-400">{country.count}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${country.percentage}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Aucune donnée</p>
          )}
        </div>
      </div>

      {/* Score moyen */}
      <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Score moyen des leads</h2>
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#1f2937"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeDasharray={`${stats.avgLeadScore}, 100`}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
              {stats.avgLeadScore}
            </span>
          </div>
          <div>
            <p className="text-gray-300">Score moyen de qualité de vos leads</p>
            <p className="text-sm text-gray-500 mt-1">
              Les leads avec un score {">"}70 ont 3x plus de chances de convertir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
