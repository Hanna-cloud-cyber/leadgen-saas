import { createSupabaseServer } from "@/lib/auth/supabase-server";
import Link from "next/link";

export default async function DashboardPage() {
  let profile: Record<string, unknown> | null = null;
  let leadsCount = 0;
  let contactsCount = 0;
  let searchesCount = 0;
  let campaignsCount = 0;
  let recentLeads: Record<string, unknown>[] = [];
  let recentSearches: Record<string, unknown>[] = [];

  try {
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const [profileRes, leadsRes, contactsRes, searchesRes, campaignsRes, recentLeadsRes, recentSearchesRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("contacts").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("searches").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("campaigns").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("leads").select("company, city, sector, score, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
        supabase.from("searches").select("keywords, city, country, results_count, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
      ]);

      profile = profileRes.data;
      leadsCount = leadsRes.count || 0;
      contactsCount = contactsRes.count || 0;
      searchesCount = searchesRes.count || 0;
      campaignsCount = campaignsRes.count || 0;
      recentLeads = recentLeadsRes.data || [];
      recentSearches = recentSearchesRes.data || [];
    }
  } catch {
    // Supabase non configuré
  }

  const plan = (profile?.plan as string) || "free";
  const used = (profile?.leads_used_this_month as number) || 0;
  const limit = (profile?.leads_limit as number) || 10;
  const percentage = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;
  const firstName = ((profile?.full_name as string) || "").split(" ")[0] || "là";

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Bonjour, {firstName} <span className="opacity-70">👋</span>
        </h1>
        <p className="text-gray-500 mt-1">
          Voici un aperçu de votre activité
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Leads trouvés"
          value={leadsCount}
          icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          color="indigo"
          href="/leads"
        />
        <StatCard
          label="Contacts"
          value={contactsCount}
          icon="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2m22-4l-6 6m0-6l6 6"
          color="purple"
          href="/contacts"
        />
        <StatCard
          label="Recherches"
          value={searchesCount}
          icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          color="blue"
        />
        <StatCard
          label="Campagnes"
          value={campaignsCount}
          icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          color="emerald"
          href="/campaigns"
        />
      </div>

      {/* Usage + Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Usage card */}
        <div className="gradient-border bg-gray-900/50 rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Utilisation ce mois</h3>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-4xl font-bold">{used}</span>
            <span className="text-gray-500 text-lg mb-1">/ {limit} leads</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                percentage >= 80
                  ? "bg-gradient-to-r from-red-500 to-orange-500"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{percentage}% utilisé</span>
            <span className="capitalize">Plan {plan}</span>
          </div>
          {percentage >= 80 && (
            <Link
              href="/settings"
              className="mt-4 block text-center text-xs bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg py-2.5 font-medium transition-all duration-200"
            >
              Passer au plan supérieur
            </Link>
          )}
        </div>

        {/* Quick actions */}
        <div className="lg:col-span-2 gradient-border bg-gray-900/50 rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Actions rapides</h3>
          <div className="grid grid-cols-2 gap-3">
            <QuickAction
              href="/leads"
              icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              title="Chercher des leads"
              desc="Trouvez des entreprises par secteur et ville"
            />
            <QuickAction
              href="/contacts"
              icon="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2m22-4l-6 6m0-6l6 6"
              title="Trouver des contacts"
              desc="Recherchez des personnes par poste et entreprise"
            />
            <QuickAction
              href="/campaigns"
              icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              title="Nouvelle campagne"
              desc="Créez une séquence d'emails automatisée"
            />
            <QuickAction
              href="/settings"
              icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              title="Paramètres"
              desc="Gérez votre abonnement et intégrations"
            />
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent leads */}
        <div className="gradient-border bg-gray-900/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-400">Derniers leads</h3>
            <Link href="/leads" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
              Voir tout
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Aucun lead pour le moment</p>
              <Link href="/leads" className="text-xs text-indigo-400 hover:text-indigo-300 mt-2 inline-block">
                Lancer votre première recherche
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800/30 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{lead.company as string}</p>
                    <p className="text-xs text-gray-500">
                      {lead.city as string}{lead.sector ? ` · ${lead.sector}` : ""}
                    </p>
                  </div>
                  {(lead.score as number) > 0 && (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      (lead.score as number) >= 70
                        ? "bg-green-900/30 text-green-400"
                        : (lead.score as number) >= 40
                        ? "bg-yellow-900/30 text-yellow-400"
                        : "bg-gray-800 text-gray-400"
                    }`}>
                      {lead.score as number}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent searches */}
        <div className="gradient-border bg-gray-900/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-400">Dernières recherches</h3>
          </div>
          {recentSearches.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Aucune recherche effectuée</p>
              <Link href="/leads" className="text-xs text-indigo-400 hover:text-indigo-300 mt-2 inline-block">
                Commencer à prospecter
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSearches.map((search, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800/30 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{search.keywords as string}</p>
                    <p className="text-xs text-gray-500">
                      {search.city as string || "Toutes villes"} · {search.country as string}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {search.results_count as number} résultat{(search.results_count as number) !== 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, href }: {
  label: string;
  value: number;
  icon: string;
  color: "indigo" | "purple" | "blue" | "emerald";
  href?: string;
}) {
  const colorMap = {
    indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", glow: "group-hover:bg-indigo-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", glow: "group-hover:bg-purple-500/20" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", glow: "group-hover:bg-blue-500/20" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", glow: "group-hover:bg-emerald-500/20" },
  };
  const c = colorMap[color];

  const content = (
    <div className="group gradient-border bg-gray-900/50 rounded-xl p-5 hover:bg-gray-900 transition-all duration-300 cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${c.bg} ${c.glow} flex items-center justify-center transition-colors duration-300`}>
          <svg className={`w-5 h-5 ${c.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
          </svg>
        </div>
      </div>
      <p className="text-3xl font-bold">{value.toLocaleString("fr-FR")}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

function QuickAction({ href, icon, title, desc }: { href: string; icon: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/60 border border-gray-800/30 hover:border-gray-700/50 transition-all duration-200"
    >
      <div className="w-9 h-9 rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20 flex items-center justify-center shrink-0 transition-colors duration-200">
        <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium group-hover:text-white transition-colors">{title}</p>
        <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">{desc}</p>
      </div>
    </Link>
  );
}
