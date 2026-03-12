"use client";

import { buildConversionFunnel, type QuotaUsage } from "@/lib/analytics";

// Données de démonstration pour l'affichage
const demoFunnel = buildConversionFunnel({
  searches: 150,
  leadsFound: 1200,
  withEmail: 840,
  emailsVerified: 720,
  emailsSent: 350,
  replies: 42,
});

const demoQuota: QuotaUsage = {
  leads: { used: 3, limit: 10, percentage: 30 },
  contacts: { used: 5, limit: 10, percentage: 50 },
  verifications: { used: 28, limit: 50, percentage: 56 },
  aiEmails: { used: 2, limit: 5, percentage: 40 },
  campaigns: { used: 0, limit: 0, percentage: 0 },
};

const demoStats = {
  totalLeads: 156,
  totalContacts: 89,
  totalEmailsSent: 350,
  totalReplies: 42,
  leadsThisMonth: 45,
  leadsLastMonth: 32,
  growthRate: 41,
  avgLeadScore: 62,
};

const topSectors = [
  { label: "Immobilier", count: 34, percentage: 22 },
  { label: "Tech & IT", count: 28, percentage: 18 },
  { label: "Marketing", count: 22, percentage: 14 },
  { label: "Finance", count: 18, percentage: 12 },
  { label: "Juridique", count: 15, percentage: 10 },
];

const topCountries = [
  { label: "France", count: 89, percentage: 57 },
  { label: "Belgique", count: 23, percentage: 15 },
  { label: "Suisse", count: 18, percentage: 12 },
  { label: "Canada", count: 15, percentage: 10 },
  { label: "Maroc", count: 11, percentage: 7 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-gray-400 mt-1">Vue d&apos;ensemble de votre activité</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Leads ce mois", value: demoStats.leadsThisMonth, change: `+${demoStats.growthRate}%`, positive: true },
          { label: "Total contacts", value: demoStats.totalContacts, change: "+12", positive: true },
          { label: "Emails envoyés", value: demoStats.totalEmailsSent, change: "+87", positive: true },
          { label: "Réponses", value: demoStats.totalReplies, change: `${Math.round((demoStats.totalReplies / demoStats.totalEmailsSent) * 100)}%`, positive: true },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-3xl font-bold text-white">{kpi.value}</p>
            <p className="text-sm text-gray-400 mt-1">{kpi.label}</p>
            <p className={`text-xs mt-2 ${kpi.positive ? "text-green-400" : "text-red-400"}`}>
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Funnel de conversion</h2>
          <div className="space-y-3">
            {demoFunnel.map((step) => (
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
        </div>

        {/* Quota Usage */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Utilisation des quotas</h2>
          <div className="space-y-4">
            {Object.entries(demoQuota).map(([key, data]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300 capitalize">{key}</span>
                  <span className="text-gray-400">{data.used}/{data.limit === 0 ? "N/A" : data.limit}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      data.percentage >= 80 ? "bg-red-500" :
                      data.percentage >= 50 ? "bg-yellow-500" :
                      "bg-indigo-500"
                    }`}
                    style={{ width: `${data.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sectors */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Top secteurs</h2>
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
        </div>

        {/* Top Countries */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Top pays</h2>
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
                strokeDasharray={`${demoStats.avgLeadScore}, 100`}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
              {demoStats.avgLeadScore}
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
