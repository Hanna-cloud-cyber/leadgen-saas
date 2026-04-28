"use client";

import React, { useMemo, useState } from "react";
import { US_STATES } from "@/lib/engine/energy-us";
import type { Lead } from "@/types/lead";

interface SubSectorOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  naics: string[];
  directoriesCount: number;
}

interface Stats {
  queriesUsed: number;
  sitesFound: number;
  directoriesScraped: number;
  sitesScraped: number;
  emailsFound: number;
  emailsValid: number;
  leadsGenerated: number;
  duration: number;
}

const SUBSECTORS: SubSectorOption[] = [
  { id: "solar_residential", name: "Residential Solar Installer", icon: "☀️", description: "Installateurs solaire résidentiel (homeowners).", naics: ["238220"], directoriesCount: 2 },
  { id: "solar_commercial", name: "Commercial / C&I Solar EPC", icon: "🏢", description: "EPC solaire commercial & industriel.", naics: ["238220"], directoriesCount: 1 },
  { id: "solar_utility", name: "Utility-Scale Solar Developer", icon: "🌅", description: "Développeurs / IPP solaire utility-scale.", naics: ["221114"], directoriesCount: 0 },
  { id: "wind", name: "Wind Energy", icon: "💨", description: "Éolien onshore / offshore (developers, EPC, O&M).", naics: ["221115"], directoriesCount: 1 },
  { id: "battery_storage", name: "Battery Energy Storage (BESS)", icon: "🔋", description: "Intégrateurs et développeurs BESS.", naics: ["335910"], directoriesCount: 1 },
  { id: "ev_charging_cpo", name: "EV Charging Network / CPO", icon: "🔌", description: "Charge Point Operators / réseaux EV.", naics: ["811198"], directoriesCount: 0 },
  { id: "ev_charger_manufacturer", name: "EV Charger Manufacturer / Installer", icon: "⚡", description: "Fabricants & installateurs de bornes EV.", naics: ["335999"], directoriesCount: 0 },
  { id: "utility_electric", name: "Electric Utility (IOU / Muni / Coop)", icon: "🏛️", description: "Utilities électriques US.", naics: ["221121"], directoriesCount: 1 },
  { id: "ipp", name: "Independent Power Producer (IPP)", icon: "🏗️", description: "Producteurs indépendants d'électricité.", naics: ["221111"], directoriesCount: 0 },
  { id: "oil_gas_services", name: "Oil & Gas Services", icon: "🛢️", description: "Services pétrole & gaz.", naics: ["213112"], directoriesCount: 0 },
  { id: "esco", name: "ESCO / Energy Efficiency", icon: "💡", description: "Energy Services Companies.", naics: ["541330"], directoriesCount: 0 },
  { id: "energy_consulting", name: "Energy Consulting / Auditing", icon: "📊", description: "Conseil & audits énergétiques.", naics: ["541620"], directoriesCount: 0 },
  { id: "smart_grid", name: "Smart Grid / DERMS", icon: "🧠", description: "Software smart grid, DERMS, VPP.", naics: ["541512"], directoriesCount: 0 },
  { id: "geothermal", name: "Geothermal", icon: "♨️", description: "Géothermie résidentielle & commerciale.", naics: ["221116"], directoriesCount: 0 },
  { id: "hydrogen", name: "Hydrogen", icon: "💧", description: "Hydrogène vert / fuel cells.", naics: ["325120"], directoriesCount: 0 },
  { id: "hvac_commercial", name: "Commercial HVAC / Heat Pumps", icon: "❄️", description: "HVAC commercial / heat pumps.", naics: ["238220"], directoriesCount: 0 },
];

const STATE_REGIONS: Record<string, typeof US_STATES> = {
  Northeast: US_STATES.filter((s) => s.region === "Northeast"),
  Midwest: US_STATES.filter((s) => s.region === "Midwest"),
  South: US_STATES.filter((s) => s.region === "South"),
  West: US_STATES.filter((s) => s.region === "West"),
};

export default function EnergyUsPage() {
  const [subSectorId, setSubSectorId] = useState<string>("solar_residential");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState("");
  const [extra, setExtra] = useState("");
  const [exclude, setExclude] = useState("residential lease");
  const [maxQueries, setMaxQueries] = useState(4);
  const [maxPerQuery, setMaxPerQuery] = useState(10);
  const [scrapeDirectories, setScrapeDirectories] = useState(true);
  const [verify, setVerify] = useState(true);
  const [advanced, setAdvanced] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  const selectedSector = useMemo(
    () => SUBSECTORS.find((s) => s.id === subSectorId),
    [subSectorId]
  );

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setLeads([]);
    setStats(null);

    try {
      const res = await fetch("/api/energy-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subSectorId,
          state: state || undefined,
          city: city || undefined,
          extraKeywords: extra ? extra.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
          excludeKeywords: exclude ? exclude.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
          maxQueries,
          maxPerQuery,
          scrapeDirectories,
          verify,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");

      setLeads(data.data.leads);
      setStats(data.data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  async function handleExport(format: "csv" | "json") {
    const res = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "leads", data: leads, format, excelCompatible: true }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `energy-us-leads.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-3xl">⚡</span> Énergie US — Lead Generation B2B
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            Scraping ciblé de sociétés US dans 16 sous-secteurs (solaire, éolien, BESS, EV, utilities, IPP, ESCO, hydrogène...).
            Sources : Google + annuaires sectoriels publics. Scoring boosté par signaux NAICS et mots-clés métier.
          </p>
        </div>
      </div>

      {/* Sub-sector picker */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2 font-medium">1. Sous-secteur</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {SUBSECTORS.map((s) => {
            const active = s.id === subSectorId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSubSectorId(s.id)}
                className={`text-left p-3 rounded-lg border transition-all ${
                  active
                    ? "bg-gradient-to-br from-amber-900/40 to-orange-900/20 border-amber-500/40 shadow-[0_0_12px_rgba(251,191,36,0.15)]"
                    : "bg-gray-900 border-gray-800 hover:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{s.icon}</span>
                  <span className={`text-xs font-medium ${active ? "text-amber-200" : "text-gray-200"}`}>{s.name}</span>
                </div>
                {s.directoriesCount > 0 && (
                  <span className="mt-1.5 inline-block text-[10px] text-amber-400/80">
                    +{s.directoriesCount} annuaire{s.directoriesCount > 1 ? "s" : ""}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {selectedSector && (
          <p className="text-xs text-gray-500 mt-2">
            <span className="text-gray-400">{selectedSector.icon} {selectedSector.name}</span> · {selectedSector.description}
            {selectedSector.naics.length > 0 && (
              <> · NAICS {selectedSector.naics.join(", ")}</>
            )}
          </p>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSearch} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <label className="block text-sm text-gray-400 mb-2 font-medium">2. Localisation</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">État (optionnel)</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            >
              <option value="">— Tous les États-Unis —</option>
              {Object.entries(STATE_REGIONS).map(([region, states]) => (
                <optgroup key={region} label={region}>
                  {states.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.code} — {s.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Ville (optionnel)</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Houston, San Diego, Boston..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Mots-clés additionnels (csv)</label>
            <input
              type="text"
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              placeholder="commercial, fleet, EPC..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Advanced */}
        <button
          type="button"
          onClick={() => setAdvanced((v) => !v)}
          className="mt-4 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          {advanced ? "▾ Masquer" : "▸ Afficher"} les options avancées
        </button>

        {advanced && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-950/50 rounded-lg border border-gray-800/50">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Mots-clés exclus (csv)</label>
              <input
                type="text"
                value={exclude}
                onChange={(e) => setExclude(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Variantes de requête (1-8)</label>
              <input
                type="number"
                min={1}
                max={8}
                value={maxQueries}
                onChange={(e) => setMaxQueries(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Résultats / requête (1-20)</label>
              <input
                type="number"
                min={1}
                max={20}
                value={maxPerQuery}
                onChange={(e) => setMaxPerQuery(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <label className="flex items-center gap-2 text-xs text-gray-300">
                <input
                  type="checkbox"
                  checked={scrapeDirectories}
                  onChange={(e) => setScrapeDirectories(e.target.checked)}
                  className="accent-amber-500"
                />
                Scraper annuaires sectoriels
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-300">
                <input
                  type="checkbox"
                  checked={verify}
                  onChange={(e) => setVerify(e.target.checked)}
                  className="accent-amber-500"
                />
                Vérifier emails (MX records)
              </label>
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center gap-3 flex-wrap">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-orange-900/20"
          >
            {loading ? "Scraping en cours..." : `⚡ Lancer le scraping ${selectedSector?.name ?? ""}`}
          </button>

          {leads.length > 0 && (
            <div className="flex gap-2">
              <button type="button" onClick={() => handleExport("csv")} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-xs transition-colors">
                Export CSV
              </button>
              <button type="button" onClick={() => handleExport("json")} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-xs transition-colors">
                Export JSON
              </button>
            </div>
          )}
        </div>
      </form>

      {error && (
        <div className="mt-4 bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: "Requêtes", value: stats.queriesUsed },
            { label: "Sites Google", value: stats.sitesFound },
            { label: "Annuaires", value: stats.directoriesScraped },
            { label: "Sites scrapés", value: stats.sitesScraped },
            { label: "Emails", value: stats.emailsFound },
            { label: "Emails valides", value: stats.emailsValid },
            { label: "Leads", value: stats.leadsGenerated, accent: true },
          ].map((s) => (
            <div key={s.label} className={`bg-gray-900 border rounded-lg p-4 ${(s as { accent?: boolean }).accent ? "border-amber-700/40 shadow-[0_0_12px_rgba(251,191,36,0.08)]" : "border-gray-800"}`}>
              <p className={`text-2xl font-bold ${(s as { accent?: boolean }).accent ? "text-amber-300" : "text-white"}`}>{s.value}</p>
              <p className="text-[11px] text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-8 flex flex-col items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-400 text-sm">Recherche multi-requêtes + scraping... 1-3 min selon le périmètre.</p>
        </div>
      )}

      {/* Results */}
      {leads.length > 0 && (
        <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="text-left p-4">Score</th>
                  <th className="text-left p-4">Entreprise</th>
                  <th className="text-left p-4">Sous-secteur</th>
                  <th className="text-left p-4">Emails</th>
                  <th className="text-left p-4">Téléphone</th>
                  <th className="text-left p-4">Localisation</th>
                  <th className="text-left p-4">Social</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-xs font-bold ${
                          lead.score >= 70
                            ? "bg-green-900/30 text-green-400"
                            : lead.score >= 40
                              ? "bg-amber-900/30 text-amber-400"
                              : "bg-red-900/30 text-red-400"
                        }`}
                      >
                        {lead.score}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-white">{lead.company}</p>
                      <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400 hover:underline">
                        {(() => { try { return new URL(lead.website).hostname; } catch { return lead.website; } })()}
                      </a>
                    </td>
                    <td className="p-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-900/20 text-amber-300 border border-amber-700/30">
                        {lead.sector}
                      </span>
                    </td>
                    <td className="p-4">
                      {lead.emails.slice(0, 3).map((email) => (
                        <p key={email} className="text-xs text-gray-300">{email}</p>
                      ))}
                      {lead.emails.length === 0 && <span className="text-gray-600 text-xs">—</span>}
                      {lead.emails.length > 3 && (
                        <span className="text-[10px] text-gray-500">+{lead.emails.length - 3}</span>
                      )}
                    </td>
                    <td className="p-4 text-gray-300 text-xs">{lead.phone || "—"}</td>
                    <td className="p-4 text-gray-300 text-xs">
                      {[lead.city, lead.address].filter(Boolean).join(" · ") || "—"}
                    </td>
                    <td className="p-4 flex gap-2">
                      {lead.socialProfiles.linkedin && (
                        <a href={lead.socialProfiles.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-xs">
                          LI
                        </a>
                      )}
                      {lead.socialProfiles.twitter && (
                        <a href={lead.socialProfiles.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 text-xs">
                          TW
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Info conformité — visible discrètement en bas */}
      <div className="mt-10 text-[11px] text-gray-600 leading-relaxed max-w-3xl">
        <p>
          ℹ️ Source des données : recherche web publique + annuaires d&apos;associations professionnelles (SEIA,
          ACP, ESA, NRECA, etc.). Usage strictement B2B (contacts professionnels publiquement listés).
          Toute campagne de prospection sortante doit respecter CAN-SPAM (US), TCPA pour les SMS/voix,
          et inclure un opt-out fonctionnel. Les données ne sont pas revendues.
        </p>
      </div>
    </div>
  );
}
