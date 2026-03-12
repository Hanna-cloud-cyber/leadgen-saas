"use client";

import { useState } from "react";
import { getAllCountries } from "@/lib/engine/countries";
import { INDUSTRIES } from "@/lib/engine/industries";
import type { Contact } from "@/types/lead";

export default function ContactsPage() {
  const [keywords, setKeywords] = useState("");
  const [sector, setSector] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("FR");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState("");
  const [showCampaignSelect, setShowCampaignSelect] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<{ id: string; name: string }[]>([]);
  const [campaignsLoading, setCampaignsLoading] = useState(false);
  const [campaignAdded, setCampaignAdded] = useState<string | null>(null);

  const countries = getAllCountries();

  async function handleShowCampaigns(contactIndex: string) {
    if (showCampaignSelect === contactIndex) {
      setShowCampaignSelect(null);
      return;
    }
    setShowCampaignSelect(contactIndex);
    setCampaignsLoading(true);
    setCampaignAdded(null);
    try {
      const res = await fetch("/api/campaigns");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      setCampaigns(data.campaigns || data.data || []);
    } catch {
      setError("Impossible de charger les campagnes");
      setShowCampaignSelect(null);
    } finally {
      setCampaignsLoading(false);
    }
  }

  async function handleAddToCampaign(campaignId: string, contact: Contact) {
    try {
      const res = await fetch(`/api/campaigns/${campaignId}/recipients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: contact.email,
          fullName: contact.fullName,
          firstName: contact.firstName,
          lastName: contact.lastName,
          company: contact.company,
          jobTitle: contact.jobTitle,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      setCampaignAdded(campaignId);
      setTimeout(() => {
        setShowCampaignSelect(null);
        setCampaignAdded(null);
      }, 1500);
    } catch {
      setError("Impossible d'ajouter le contact à la campagne");
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keywords,
          sector,
          city,
          country: countries.find((c) => c.code === country)?.name || "France",
          maxResults: 20,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setContacts(data.data.contacts);
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
      body: JSON.stringify({ type: "contacts", data: contacts, format, excelCompatible: true }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Recherche de contacts</h1>
        <p className="text-gray-400 mt-1">Trouvez des personnes avec nom, email, téléphone et poste</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Poste / Rôle</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="directeur commercial, CEO..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Secteur</label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="">Tous</option>
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
              placeholder="Paris, Lyon..."
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
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="submit"
            disabled={loading || !keywords}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {loading ? "Recherche..." : "Trouver des contacts"}
          </button>
          {contacts.length > 0 && (
            <div className="flex gap-2">
              <button type="button" onClick={() => handleExport("csv")} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-xs">Export CSV</button>
              <button type="button" onClick={() => handleExport("json")} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-xs">Export JSON</button>
            </div>
          )}
        </div>
      </form>

      {error && (
        <div className="mt-4 bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-400 text-sm">{error}</div>
      )}

      {stats && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Pages scrapées", value: stats.pagesScraped },
            { label: "Contacts trouvés", value: stats.contactsRaw },
            { label: "Contacts enrichis", value: stats.contactsEnriched },
            { label: "Emails vérifiés", value: stats.emailsVerified },
          ].map((s) => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="mt-8 flex flex-col items-center py-12">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-400 text-sm">Scraping des contacts en cours...</p>
        </div>
      )}

      {/* Results */}
      {contacts.length > 0 && (
        <div className="mt-6 grid gap-4">
          {contacts.map((contact, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-indigo-900/30 flex items-center justify-center text-indigo-400 font-bold text-lg">
                    {contact.firstName?.[0]}{contact.lastName?.[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{contact.fullName}</h3>
                    {contact.jobTitle && <p className="text-sm text-indigo-400">{contact.jobTitle}</p>}
                    {contact.company && <p className="text-xs text-gray-400">{contact.company}</p>}
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    contact.score >= 70 ? "bg-green-900/30 text-green-400" :
                    contact.score >= 40 ? "bg-yellow-900/30 text-yellow-400" :
                    "bg-red-900/30 text-red-400"
                  }`}
                >
                  Score: {contact.score}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Email</p>
                  <p className="text-gray-300">{contact.email || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Téléphone</p>
                  <p className="text-gray-300">{contact.phone || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Ville</p>
                  <p className="text-gray-300">{contact.city || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Source</p>
                  <p className="text-gray-300">{contact.source}</p>
                </div>
              </div>

              {/* Email guesses */}
              {contact.emailGuesses.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <p className="text-xs text-gray-500 mb-2">Emails probables :</p>
                  <div className="flex flex-wrap gap-2">
                    {contact.emailGuesses.slice(0, 5).map((guess) => (
                      <span
                        key={guess.email}
                        className={`px-2 py-1 rounded text-xs ${
                          guess.verified
                            ? "bg-green-900/20 text-green-400 border border-green-800"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {guess.email} ({guess.confidence}%)
                        {guess.verified && " verified"}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="mt-3 flex gap-3 relative">
                {contact.linkedin && (
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">
                    LinkedIn
                  </a>
                )}
                <div className="relative">
                  <button
                    onClick={() => handleShowCampaigns(String(i))}
                    className="text-xs bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded transition-colors"
                  >
                    Ajouter à une campagne
                  </button>
                  {showCampaignSelect === String(i) && (
                    <div className="absolute left-0 top-8 z-10 bg-gray-800 border border-gray-700 rounded-lg shadow-xl min-w-[220px] p-2">
                      {campaignsLoading ? (
                        <div className="flex items-center gap-2 text-gray-400 text-xs p-2">
                          <div className="w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                          Chargement...
                        </div>
                      ) : campaigns.length === 0 ? (
                        <p className="text-xs text-gray-400 p-2">Aucune campagne trouvée</p>
                      ) : (
                        campaigns.map((campaign) => (
                          <button
                            key={campaign.id}
                            onClick={() => handleAddToCampaign(campaign.id, contact)}
                            className={`w-full text-left text-xs px-3 py-2 rounded hover:bg-gray-700 transition-colors ${
                              campaignAdded === campaign.id ? "text-green-400" : "text-gray-300"
                            }`}
                          >
                            {campaignAdded === campaign.id ? "Ajouté !" : campaign.name}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
