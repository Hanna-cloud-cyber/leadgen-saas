"use client";

import { useState } from "react";
import { getAllCountries } from "@/lib/engine/countries";
import { INDUSTRIES } from "@/lib/engine/industries";
import type { Lead } from "@/types/lead";

export default function LeadsPage() {
  const [keywords, setKeywords] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("FR");
  const [industry, setIndustry] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState("");
  const [contactingIndex, setContactingIndex] = useState<number | null>(null);
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string; body: string } | null>(null);
  const [contactLoading, setContactLoading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const countries = getAllCountries();

  async function handleContact(index: number) {
    const lead = leads[index];
    if (!lead.emails.length) return;

    setContactingIndex(index);
    setGeneratedEmail(null);
    setContactLoading(true);
    setEmailSent(false);

    try {
      const res = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: lead.emails[0], company: lead.company, website: lead.website }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de la génération");
      setGeneratedEmail({ subject: data.subject, body: data.body });
    } catch {
      setError("Impossible de générer l'email");
      setContactingIndex(null);
    } finally {
      setContactLoading(false);
    }
  }

  async function handleSendEmail(index: number) {
    if (!generatedEmail) return;
    const lead = leads[index];

    setSendingEmail(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: lead.emails[0],
          subject: generatedEmail.subject,
          body: generatedEmail.body,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'envoi");
      setEmailSent(true);
    } catch {
      setError("Impossible d'envoyer l'email");
    } finally {
      setSendingEmail(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setLeads([]);
    setStats(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keywords: keywords || industry,
          city,
          country: countries.find((c) => c.code === country)?.name || "France",
          maxResults: 20,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

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
    a.download = `leads.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Recherche de leads</h1>
        <p className="text-gray-400 mt-1">Trouvez des entreprises et leurs coordonnées partout dans le monde</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Mots-clés</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="agence immobilière, dentiste..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Secteur</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="">Tous les secteurs</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind.id} value={ind.keywords.fr?.[0] || ind.nameEn}>
                  {ind.icon} {ind.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Ville</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Paris, Lyon, New York..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Pays</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="submit"
            disabled={loading || (!keywords && !industry)}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {loading ? "Recherche en cours..." : "Lancer la recherche"}
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
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Sites trouvés", value: stats.sitesFound },
            { label: "Sites scrapés", value: stats.sitesScraped },
            { label: "Emails trouvés", value: stats.emailsFound },
            { label: "Emails valides", value: stats.emailsValid },
            { label: "Leads générés", value: stats.leadsGenerated },
          ].map((s) => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-8 flex flex-col items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-400 text-sm">Scraping en cours... Cela peut prendre quelques minutes.</p>
        </div>
      )}

      {/* Results Table */}
      {leads.length > 0 && (
        <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="text-left p-4">Score</th>
                  <th className="text-left p-4">Entreprise</th>
                  <th className="text-left p-4">Emails</th>
                  <th className="text-left p-4">Téléphone</th>
                  <th className="text-left p-4">Ville</th>
                  <th className="text-left p-4">Social</th>
                  <th className="text-left p-4">Actions</th>
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
                              ? "bg-yellow-900/30 text-yellow-400"
                              : "bg-red-900/30 text-red-400"
                        }`}
                      >
                        {lead.score}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-white">{lead.company}</p>
                      <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:underline">
                        {new URL(lead.website).hostname}
                      </a>
                    </td>
                    <td className="p-4">
                      {lead.emails.map((email) => (
                        <p key={email} className="text-xs text-gray-300">{email}</p>
                      ))}
                      {lead.emails.length === 0 && <span className="text-gray-600 text-xs">Aucun</span>}
                    </td>
                    <td className="p-4 text-gray-300 text-xs">{lead.phone || "—"}</td>
                    <td className="p-4 text-gray-300 text-xs">{lead.city || "—"}</td>
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
                    <td className="p-4">
                      <button
                        onClick={() => handleContact(i)}
                        disabled={lead.emails.length === 0}
                        className="text-xs bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed px-3 py-1 rounded transition-colors"
                      >
                        Contacter
                      </button>
                    </td>
                  </tr>
                  {contactingIndex === i && (
                    <tr className="border-b border-gray-800/50">
                      <td colSpan={7} className="p-4">
                        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                          {contactLoading && (
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                              <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                              Génération de l&apos;email...
                            </div>
                          )}
                          {generatedEmail && (
                            <>
                              {emailSent ? (
                                <div className="text-green-400 text-sm font-medium">Email envoyé avec succès !</div>
                              ) : (
                                <>
                                  <div>
                                    <label className="block text-xs text-gray-400 mb-1">Objet</label>
                                    <input
                                      type="text"
                                      value={generatedEmail.subject}
                                      onChange={(e) => setGeneratedEmail({ ...generatedEmail, subject: e.target.value })}
                                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-400 mb-1">Corps</label>
                                    <textarea
                                      value={generatedEmail.body}
                                      onChange={(e) => setGeneratedEmail({ ...generatedEmail, body: e.target.value })}
                                      rows={6}
                                      className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleSendEmail(i)}
                                      disabled={sendingEmail}
                                      className="text-xs bg-green-600 hover:bg-green-500 disabled:bg-gray-700 px-4 py-2 rounded font-medium transition-colors"
                                    >
                                      {sendingEmail ? "Envoi..." : "Envoyer"}
                                    </button>
                                    <button
                                      onClick={() => { setContactingIndex(null); setGeneratedEmail(null); setEmailSent(false); }}
                                      className="text-xs bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors"
                                    >
                                      Fermer
                                    </button>
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
