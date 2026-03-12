"use client";

import { useState, useEffect, useCallback } from "react";
import { SEQUENCE_TEMPLATES, type CampaignSettings } from "@/lib/campaigns";

interface CampaignRow {
  id: string;
  user_id: string;
  name: string;
  status: string;
  sequence: { stepNumber: number; subject: string; body: string; delayDays: number; skipIfReplied: boolean; tone: string; useAI: boolean }[];
  settings: Record<string, unknown>;
  stats: {
    totalRecipients: number;
    sent: number;
    opened: number;
    replied: number;
    bounced: number;
    unsubscribed: number;
    openRate: number;
    replyRate: number;
    bounceRate: number;
  };
  created_at: string;
  started_at: string | null;
  updated_at: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [campaignName, setCampaignName] = useState("");
  const [settings, setSettings] = useState<Partial<CampaignSettings>>({
    senderName: "",
    senderEmail: "",
    senderCompany: "",
    senderOffer: "",
    dailyLimit: 50,
    sendingWindow: { startHour: 9, endHour: 18 },
    sendOnWeekends: false,
    timezone: "Europe/Paris",
    trackOpens: true,
    trackClicks: true,
    unsubscribeLink: true,
  });

  const fetchCampaigns = useCallback(async () => {
    try {
      const res = await fetch("/api/campaigns");
      if (!res.ok) throw new Error("Erreur de chargement");
      const json = await res.json();
      setCampaigns(json.data || []);
    } catch (err) {
      console.error("Failed to load campaigns:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  async function handleCreateCampaign() {
    setSaving(true);
    try {
      const sequence = SEQUENCE_TEMPLATES[selectedTemplate].steps.map((s) => ({ ...s, useAI: false }));
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: campaignName || `Campagne ${campaigns.length + 1}`,
          sequence,
          settings,
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de la création");
      const json = await res.json();
      setCampaigns([json.data, ...campaigns]);
      setShowCreate(false);
      setCampaignName("");
    } catch (err) {
      console.error("Failed to create campaign:", err);
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateStatus(campaignId: string, newStatus: string) {
    try {
      const res = await fetch(`/api/campaigns/${campaignId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Erreur de mise à jour");
      const json = await res.json();
      setCampaigns(campaigns.map((c) => (c.id === campaignId ? json.data : c)));
    } catch (err) {
      console.error("Failed to update campaign status:", err);
    }
  }

  async function handleDeleteCampaign(campaignId: string) {
    try {
      const res = await fetch(`/api/campaigns/${campaignId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur de suppression");
      setCampaigns(campaigns.filter((c) => c.id !== campaignId));
    } catch (err) {
      console.error("Failed to delete campaign:", err);
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Campagnes email</h1>
          <p className="text-gray-400 mt-1">Créez des séquences d&apos;emails automatisées</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Nouvelle campagne
        </button>
      </div>

      {/* Create Campaign Modal */}
      {showCreate && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Créer une campagne</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Nom de la campagne</label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Ma campagne de prospection"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Votre nom</label>
              <input
                type="text"
                value={settings.senderName}
                onChange={(e) => setSettings({ ...settings, senderName: e.target.value })}
                placeholder="Jean Dupont"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Votre entreprise</label>
              <input
                type="text"
                value={settings.senderCompany}
                onChange={(e) => setSettings({ ...settings, senderCompany: e.target.value })}
                placeholder="Mon Entreprise"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Votre offre (en 1 phrase)</label>
              <input
                type="text"
                value={settings.senderOffer}
                onChange={(e) => setSettings({ ...settings, senderOffer: e.target.value })}
                placeholder="générer 50 leads qualifiés par mois"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Templates */}
          <h3 className="text-sm font-medium text-gray-300 mb-3">Choisir un template de séquence :</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {SEQUENCE_TEMPLATES.map((template, i) => (
              <button
                key={i}
                onClick={() => setSelectedTemplate(i)}
                className={`text-left p-4 rounded-lg border transition-colors ${
                  selectedTemplate === i
                    ? "border-indigo-500 bg-indigo-900/20"
                    : "border-gray-800 bg-gray-800/50 hover:border-gray-700"
                }`}
              >
                <p className="font-medium text-sm">{template.name}</p>
                <p className="text-xs text-gray-400 mt-1">{template.description}</p>
                <p className="text-xs text-indigo-400 mt-2">{template.steps.length} étapes</p>
              </button>
            ))}
          </div>

          {/* Preview selected template */}
          <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Aperçu de la séquence :</h4>
            {SEQUENCE_TEMPLATES[selectedTemplate].steps.map((step) => (
              <div key={step.stepNumber} className="flex items-start gap-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-indigo-900/30 flex items-center justify-center text-xs text-indigo-400 font-bold shrink-0">
                  {step.stepNumber}
                </div>
                <div>
                  <p className="text-sm text-white">
                    {step.delayDays === 0 ? "Envoi immédiat" : `J+${step.delayDays}`} — {step.subject}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{step.body.slice(0, 100)}...</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCreateCampaign}
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {saving ? "Création..." : "Créer la campagne"}
            </button>
            <button
              onClick={() => setShowCreate(false)}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
          <p className="text-gray-400 text-sm">Chargement des campagnes...</p>
        </div>
      )}

      {/* Campaigns List */}
      {!loading && campaigns.length === 0 && !showCreate && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
          <div className="text-4xl mb-3">&#x2709;</div>
          <h3 className="text-lg font-semibold">Aucune campagne</h3>
          <p className="text-gray-400 text-sm mt-1">
            Créez votre première campagne pour commencer à prospecter automatiquement.
          </p>
        </div>
      )}

      {campaigns.map((campaign) => (
        <div key={campaign.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white">{campaign.name}</h3>
              <p className="text-xs text-gray-400 mt-1">
                {campaign.sequence.length} étapes &middot; {campaign.stats.totalRecipients} destinataires
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                campaign.status === "draft" ? "bg-gray-800 text-gray-400" :
                campaign.status === "active" ? "bg-green-900/30 text-green-400" :
                campaign.status === "paused" ? "bg-yellow-900/30 text-yellow-400" :
                campaign.status === "completed" ? "bg-blue-900/30 text-blue-400" :
                "bg-gray-800 text-gray-500"
              }`}>
                {campaign.status}
              </span>
              {(campaign.status === "draft" || campaign.status === "paused") && (
                <button
                  onClick={() => handleUpdateStatus(campaign.id, "active")}
                  className="bg-green-700 hover:bg-green-600 px-3 py-1.5 rounded text-xs font-medium transition-colors"
                >
                  Lancer
                </button>
              )}
              {campaign.status === "active" && (
                <button
                  onClick={() => handleUpdateStatus(campaign.id, "paused")}
                  className="bg-yellow-700 hover:bg-yellow-600 px-3 py-1.5 rounded text-xs font-medium transition-colors"
                >
                  Pause
                </button>
              )}
              <button
                onClick={() => handleDeleteCampaign(campaign.id)}
                className="bg-gray-800 hover:bg-red-900/50 hover:text-red-400 px-3 py-1.5 rounded text-xs transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { label: "Envoyés", value: campaign.stats.sent },
              { label: "Ouverts", value: campaign.stats.opened },
              { label: "Réponses", value: campaign.stats.replied },
              { label: "Taux ouverture", value: `${campaign.stats.openRate}%` },
              { label: "Taux réponse", value: `${campaign.stats.replyRate}%` },
              { label: "Bounces", value: campaign.stats.bounced },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-lg font-bold text-white">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
