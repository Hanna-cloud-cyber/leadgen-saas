"use client";

import { useState, useEffect } from "react";
import { PLANS, formatPrice } from "@/lib/billing";
import { createSupabaseBrowser } from "@/lib/auth/supabase-browser";

export default function SettingsPage() {
  const [currentPlan, setCurrentPlan] = useState("free");
  const [activeTab, setActiveTab] = useState<"billing" | "integrations" | "api" | "account">("billing");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const { data } = await res.json();
          if (data) {
            setCurrentPlan(data.plan || "free");
            setFullName(data.full_name || "");
            setEmail(data.email || "");
            setCompanyName(data.company_name || "");
          }
        }
      } catch {
        // Ignore
      }
    }
    loadProfile();
  }, []);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveMessage("");
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, company_name: companyName }),
      });
      setSaveMessage(res.ok ? "Profil mis à jour !" : "Erreur lors de la sauvegarde");
    } catch {
      setSaveMessage("Erreur réseau");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Paramètres</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-900 rounded-lg p-1 w-fit">
        {(["billing", "integrations", "api", "account"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              activeTab === tab ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab === "billing" ? "Abonnement" :
             tab === "integrations" ? "Intégrations" :
             tab === "api" ? "API" : "Compte"}
          </button>
        ))}
      </div>

      {/* Billing Tab */}
      {activeTab === "billing" && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Choisissez votre plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-xl p-6 border transition-colors ${
                  currentPlan === plan.id
                    ? "border-indigo-500 bg-indigo-900/10"
                    : plan.popular
                      ? "border-purple-500/50 bg-gray-900"
                      : "border-gray-800 bg-gray-900"
                }`}
              >
                {plan.popular && (
                  <span className="text-xs bg-purple-600 px-2 py-0.5 rounded-full">Populaire</span>
                )}
                <h3 className="text-lg font-bold mt-2">{plan.name}</h3>
                <p className="text-3xl font-bold mt-2">
                  {plan.price === 0 ? "Gratuit" : formatPrice(plan.price)}
                  {plan.price > 0 && <span className="text-sm text-gray-400 font-normal">/mois</span>}
                </p>

                <ul className="mt-4 space-y-2 text-sm">
                  <Feature label={`${plan.features.leadsPerMonth} leads/mois`} />
                  <Feature label={`${plan.features.contactsPerMonth} contacts/mois`} />
                  <Feature label={`${plan.features.emailVerifications} vérifications`} />
                  <Feature label={`${plan.features.aiEmails} emails IA`} />
                  <Feature
                    label={plan.features.campaigns === -1 ? "Campagnes illimitées" : plan.features.campaigns === 0 ? "Pas de campagnes" : `${plan.features.campaigns} campagnes`}
                    disabled={plan.features.campaigns === 0}
                  />
                  <Feature
                    label={plan.features.countries === -1 ? "Tous les pays" : `${plan.features.countries} pays`}
                  />
                  <Feature label="Accès API" disabled={!plan.features.apiAccess} />
                  <Feature label="Webhooks" disabled={!plan.features.webhooks} />
                  <Feature label="Intégrations CRM" disabled={!plan.features.crmIntegrations} />
                </ul>

                <button
                  className={`w-full mt-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPlan === plan.id
                      ? "bg-gray-800 text-gray-400 cursor-default"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white"
                  }`}
                  disabled={currentPlan === plan.id}
                >
                  {currentPlan === plan.id ? "Plan actuel" : "Choisir ce plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === "integrations" && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Intégrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "HubSpot", desc: "Synchronisez vos leads automatiquement", status: "Connecter", color: "text-orange-400" },
              { name: "Pipedrive", desc: "Créez des deals automatiquement", status: "Connecter", color: "text-green-400" },
              { name: "Salesforce", desc: "Import/export de contacts", status: "Connecter", color: "text-blue-400" },
              { name: "Brevo", desc: "Ajoutez les contacts à vos listes", status: "Connecter", color: "text-indigo-400" },
              { name: "Zapier", desc: "Connectez 5000+ applications", status: "Connecter", color: "text-orange-400" },
              { name: "Webhook", desc: "Envoyez les données en temps réel", status: "Configurer", color: "text-gray-400" },
            ].map((integration) => (
              <div key={integration.name} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <h3 className={`font-semibold ${integration.color}`}>{integration.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{integration.desc}</p>
                <button className="mt-3 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded text-xs transition-colors">
                  {integration.status}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API Tab */}
      {activeTab === "api" && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Clé API</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-4">
              Utilisez l&apos;API pour intégrer LeadGen AI dans vos propres applications.
            </p>
            <div className="flex gap-3">
              <input
                type="password"
                value="lgai_sk_••••••••••••••••••••••••"
                readOnly
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono"
              />
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                Copier
              </button>
              <button className="bg-red-900/30 hover:bg-red-900/50 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors">
                Regénérer
              </button>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-sm mb-2">Endpoints disponibles :</h3>
              <div className="bg-gray-800 rounded-lg p-4 font-mono text-xs space-y-1 text-gray-300">
                <p><span className="text-green-400">POST</span> /api/leads — Rechercher des leads</p>
                <p><span className="text-green-400">POST</span> /api/contacts — Rechercher des contacts</p>
                <p><span className="text-green-400">POST</span> /api/verify-email — Vérifier des emails</p>
                <p><span className="text-green-400">POST</span> /api/generate-email — Générer un email IA</p>
                <p><span className="text-green-400">POST</span> /api/enrich — Enrichir un lead</p>
                <p><span className="text-blue-400">POST</span> /api/export — Exporter en CSV/JSON</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Tab */}
      {activeTab === "account" && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Mon compte</h2>
          <form onSubmit={handleSaveProfile} className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Nom complet</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jean Dupont" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                <input type="email" value={email} readOnly className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Entreprise</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Mon Entreprise" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" />
              </div>
              {saveMessage && (
                <p className={`text-sm ${saveMessage.includes("Erreur") ? "text-red-400" : "text-green-400"}`}>{saveMessage}</p>
              )}
              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  {saving ? "Sauvegarde..." : "Sauvegarder"}
                </button>
                <button type="button" onClick={handleLogout} className="bg-red-900/30 hover:bg-red-900/50 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors">
                  Déconnexion
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Feature({ label, disabled }: { label: string; disabled?: boolean }) {
  return (
    <li className={`flex items-center gap-2 ${disabled ? "text-gray-600" : "text-gray-300"}`}>
      <span className={disabled ? "text-gray-700" : "text-indigo-400"}>
        {disabled ? "x" : "\u2713"}
      </span>
      {label}
    </li>
  );
}
