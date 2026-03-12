/**
 * MODULE ANALYTICS & REPORTING
 *
 * Métriques clés pour le dashboard :
 * - Leads générés (par jour, semaine, mois)
 * - Taux de conversion (lead → contact → email → réponse)
 * - Top secteurs / pays
 * - Performance des campagnes
 * - Utilisation des quotas
 */

// ═══════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════

export interface DashboardStats {
  overview: OverviewStats;
  leadsOverTime: TimeSeriesData[];
  topSectors: RankingItem[];
  topCountries: RankingItem[];
  conversionFunnel: FunnelStep[];
  recentActivity: ActivityItem[];
  quotaUsage: QuotaUsage;
}

export interface OverviewStats {
  totalLeads: number;
  totalContacts: number;
  totalEmailsSent: number;
  totalReplies: number;
  leadsThisMonth: number;
  leadsLastMonth: number;
  growthRate: number; // % de croissance mois/mois
  avgLeadScore: number;
}

export interface TimeSeriesData {
  date: string; // "2024-01-15"
  leads: number;
  contacts: number;
  emails: number;
}

export interface RankingItem {
  label: string;
  count: number;
  percentage: number;
}

export interface FunnelStep {
  label: string;
  count: number;
  percentage: number; // % par rapport à l'étape précédente
  color: string;
}

export interface ActivityItem {
  type: "lead" | "contact" | "email" | "campaign" | "reply";
  description: string;
  timestamp: Date;
  metadata?: Record<string, string>;
}

export interface QuotaUsage {
  leads: { used: number; limit: number; percentage: number };
  contacts: { used: number; limit: number; percentage: number };
  verifications: { used: number; limit: number; percentage: number };
  aiEmails: { used: number; limit: number; percentage: number };
  campaigns: { used: number; limit: number; percentage: number };
}

// ═══════════════════════════════════════════
// CALCULS D'ANALYTICS
// ═══════════════════════════════════════════

/**
 * Calcule le taux de croissance entre deux périodes
 */
export function calculateGrowthRate(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

/**
 * Construit le funnel de conversion
 */
export function buildConversionFunnel(data: {
  searches: number;
  leadsFound: number;
  withEmail: number;
  emailsVerified: number;
  emailsSent: number;
  replies: number;
}): FunnelStep[] {
  const total = data.searches || 1;

  return [
    { label: "Recherches", count: data.searches, percentage: 100, color: "#6366f1" },
    { label: "Leads trouvés", count: data.leadsFound, percentage: Math.round((data.leadsFound / total) * 100), color: "#8b5cf6" },
    { label: "Avec email", count: data.withEmail, percentage: data.leadsFound ? Math.round((data.withEmail / data.leadsFound) * 100) : 0, color: "#a78bfa" },
    { label: "Emails vérifiés", count: data.emailsVerified, percentage: data.withEmail ? Math.round((data.emailsVerified / data.withEmail) * 100) : 0, color: "#c4b5fd" },
    { label: "Emails envoyés", count: data.emailsSent, percentage: data.emailsVerified ? Math.round((data.emailsSent / data.emailsVerified) * 100) : 0, color: "#22c55e" },
    { label: "Réponses", count: data.replies, percentage: data.emailsSent ? Math.round((data.replies / data.emailsSent) * 100) : 0, color: "#16a34a" },
  ];
}

/**
 * Calcule les top secteurs à partir d'une liste de leads
 */
export function calculateTopSectors(
  leads: { sector: string }[]
): RankingItem[] {
  const counts = new Map<string, number>();

  for (const lead of leads) {
    const sector = lead.sector || "Inconnu";
    counts.set(sector, (counts.get(sector) || 0) + 1);
  }

  const total = leads.length || 1;

  return Array.from(counts.entries())
    .map(([label, count]) => ({
      label,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

/**
 * Calcule les top pays
 */
export function calculateTopCountries(
  leads: { country?: string }[]
): RankingItem[] {
  const counts = new Map<string, number>();

  for (const lead of leads) {
    const country = lead.country || "Inconnu";
    counts.set(country, (counts.get(country) || 0) + 1);
  }

  const total = leads.length || 1;

  return Array.from(counts.entries())
    .map(([label, count]) => ({
      label,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

/**
 * Agrège des données par jour pour les graphiques
 */
export function aggregateByDay(
  items: { createdAt?: Date | string }[],
  days: number = 30
): TimeSeriesData[] {
  const now = new Date();
  const result: Map<string, { leads: number; contacts: number; emails: number }> = new Map();

  // Initialiser les jours
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split("T")[0];
    result.set(key, { leads: 0, contacts: 0, emails: 0 });
  }

  // Compter
  for (const item of items) {
    if (!item.createdAt) continue;
    const date = new Date(item.createdAt).toISOString().split("T")[0];
    const day = result.get(date);
    if (day) {
      day.leads += 1;
    }
  }

  return Array.from(result.entries()).map(([date, data]) => ({
    date,
    ...data,
  }));
}
