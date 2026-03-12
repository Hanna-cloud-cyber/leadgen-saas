/**
 * SYSTÈME DE BILLING — Stripe
 *
 * Gestion des abonnements et crédits :
 * - Plans : Free / Starter / Pro / Enterprise
 * - Crédits de leads par mois
 * - Checkout Stripe
 * - Webhooks pour les événements de paiement
 */

// ═══════════════════════════════════════════
// PLANS & PRICING
// ═══════════════════════════════════════════

export interface Plan {
  id: string;
  name: string;
  price: number; // en centimes (ex: 2900 = 29€)
  currency: string;
  interval: "month" | "year";
  features: PlanFeatures;
  stripePriceId: string; // ID Stripe du prix
  popular?: boolean;
}

export interface PlanFeatures {
  leadsPerMonth: number; // Nombre de leads scrappables par mois
  contactsPerMonth: number; // Contacts individuels
  emailVerifications: number; // Vérifications d'emails
  aiEmails: number; // Emails générés par IA
  campaigns: number; // Campagnes actives
  exports: number; // Exports par mois (-1 = illimité)
  countries: number; // Nombre de pays (-1 = tous)
  teamMembers: number; // Membres d'équipe
  apiAccess: boolean;
  webhooks: boolean;
  crmIntegrations: boolean;
  prioritySupport: boolean;
  customBranding: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    currency: "eur",
    interval: "month",
    stripePriceId: "",
    features: {
      leadsPerMonth: 10,
      contactsPerMonth: 10,
      emailVerifications: 50,
      aiEmails: 5,
      campaigns: 0,
      exports: 3,
      countries: 1,
      teamMembers: 1,
      apiAccess: false,
      webhooks: false,
      crmIntegrations: false,
      prioritySupport: false,
      customBranding: false,
    },
  },
  {
    id: "starter",
    name: "Starter",
    price: 2900, // 29€/mois
    currency: "eur",
    interval: "month",
    stripePriceId: "price_starter_monthly", // Remplacer par le vrai ID Stripe
    features: {
      leadsPerMonth: 200,
      contactsPerMonth: 200,
      emailVerifications: 1000,
      aiEmails: 100,
      campaigns: 3,
      exports: -1,
      countries: 5,
      teamMembers: 2,
      apiAccess: false,
      webhooks: false,
      crmIntegrations: false,
      prioritySupport: false,
      customBranding: false,
    },
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 7900, // 79€/mois
    currency: "eur",
    interval: "month",
    stripePriceId: "price_pro_monthly",
    features: {
      leadsPerMonth: 1000,
      contactsPerMonth: 1000,
      emailVerifications: 5000,
      aiEmails: 500,
      campaigns: 10,
      exports: -1,
      countries: -1,
      teamMembers: 5,
      apiAccess: true,
      webhooks: true,
      crmIntegrations: true,
      prioritySupport: true,
      customBranding: false,
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 19900, // 199€/mois
    currency: "eur",
    interval: "month",
    stripePriceId: "price_enterprise_monthly",
    features: {
      leadsPerMonth: 10000,
      contactsPerMonth: 10000,
      emailVerifications: 50000,
      aiEmails: 5000,
      campaigns: -1,
      exports: -1,
      countries: -1,
      teamMembers: -1,
      apiAccess: true,
      webhooks: true,
      crmIntegrations: true,
      prioritySupport: true,
      customBranding: true,
    },
  },
];

// ═══════════════════════════════════════════
// FONCTIONS DE BILLING
// ═══════════════════════════════════════════

/**
 * Récupère un plan par son ID
 */
export function getPlan(planId: string): Plan | undefined {
  return PLANS.find((p) => p.id === planId);
}

/**
 * Vérifie si un utilisateur peut effectuer une action selon son plan
 */
export function checkQuota(
  planId: string,
  usage: { leadsUsed: number; contactsUsed: number; verificationsUsed: number; aiEmailsUsed: number; campaignsActive: number }
): { allowed: boolean; reason?: string; limit?: number; used?: number } {
  const plan = getPlan(planId);
  if (!plan) return { allowed: false, reason: "Plan inconnu" };

  const f = plan.features;

  if (usage.leadsUsed >= f.leadsPerMonth) {
    return { allowed: false, reason: "Limite de leads atteinte", limit: f.leadsPerMonth, used: usage.leadsUsed };
  }
  if (usage.contactsUsed >= f.contactsPerMonth) {
    return { allowed: false, reason: "Limite de contacts atteinte", limit: f.contactsPerMonth, used: usage.contactsUsed };
  }
  if (usage.verificationsUsed >= f.emailVerifications) {
    return { allowed: false, reason: "Limite de vérifications atteinte", limit: f.emailVerifications, used: usage.verificationsUsed };
  }
  if (usage.aiEmailsUsed >= f.aiEmails) {
    return { allowed: false, reason: "Limite d'emails IA atteinte", limit: f.aiEmails, used: usage.aiEmailsUsed };
  }
  if (f.campaigns >= 0 && usage.campaignsActive >= f.campaigns) {
    return { allowed: false, reason: "Limite de campagnes atteinte", limit: f.campaigns, used: usage.campaignsActive };
  }

  return { allowed: true };
}

/**
 * Vérifie l'accès à un pays donné
 */
export function canAccessCountry(planId: string, countryIndex: number): boolean {
  const plan = getPlan(planId);
  if (!plan) return false;
  if (plan.features.countries === -1) return true;
  return countryIndex < plan.features.countries;
}

/**
 * Calcule le pourcentage d'utilisation pour l'affichage
 */
export function getUsagePercentage(
  planId: string,
  metric: keyof PlanFeatures,
  used: number
): number {
  const plan = getPlan(planId);
  if (!plan) return 100;
  const limit = plan.features[metric];
  if (typeof limit !== "number" || limit === -1) return 0;
  return Math.min(100, Math.round((used / limit) * 100));
}

/**
 * Formate un prix en euros
 */
export function formatPrice(priceInCents: number, currency: string = "eur"): string {
  const symbols: Record<string, string> = {
    eur: "€",
    usd: "$",
    gbp: "£",
  };
  const amount = (priceInCents / 100).toFixed(0);
  return `${amount}${symbols[currency] || currency.toUpperCase()}`;
}
