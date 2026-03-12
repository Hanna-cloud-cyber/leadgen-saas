/**
 * SYSTÈME DE CAMPAGNES EMAIL
 *
 * Permet de créer des séquences d'emails automatiques :
 * - Séquence multi-étapes (email 1 → relance J+3 → relance J+7)
 * - Personnalisation IA par contact
 * - Tracking (ouverture, clic, réponse)
 * - Gestion des désabonnements
 * - Scheduling intelligent (pas d'envoi la nuit/week-end)
 */

import { generateProspectionEmail } from "@/lib/engine/email-generator";
import type { Lead, Contact, ProspectionEmail } from "@/types/lead";

// ═══════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════

export interface Campaign {
  id?: string;
  userId: string;
  name: string;
  status: CampaignStatus;
  sequence: EmailStep[];
  recipients: Recipient[];
  settings: CampaignSettings;
  stats: CampaignStats;
  createdAt?: Date;
  startedAt?: Date;
}

export type CampaignStatus = "draft" | "active" | "paused" | "completed" | "archived";

export interface EmailStep {
  stepNumber: number;
  subject: string;
  body: string;
  delayDays: number; // Jours d'attente après l'étape précédente
  skipIfReplied: boolean; // Ne pas envoyer si le contact a répondu
  tone: "formal" | "casual" | "friendly";
  useAI: boolean; // Personnaliser avec l'IA
}

export interface Recipient {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  leadId?: string;
  contactId?: string;
  status: RecipientStatus;
  currentStep: number; // Quelle étape de la séquence
  lastSentAt?: Date;
  nextSendAt?: Date;
  openedAt?: Date;
  repliedAt?: Date;
  unsubscribedAt?: Date;
  bouncedAt?: Date;
}

export type RecipientStatus =
  | "pending" // Pas encore envoyé
  | "active" // En cours de séquence
  | "completed" // Toute la séquence envoyée
  | "replied" // A répondu → on arrête
  | "bounced" // Email invalide
  | "unsubscribed" // Désabonné
  | "paused"; // Mis en pause

export interface CampaignSettings {
  senderName: string;
  senderEmail: string;
  senderCompany: string;
  senderOffer: string;
  dailyLimit: number; // Max emails par jour (défaut: 50)
  sendingWindow: { startHour: number; endHour: number }; // Ex: 9h-18h
  sendOnWeekends: boolean;
  timezone: string; // Ex: "Europe/Paris"
  trackOpens: boolean;
  trackClicks: boolean;
  unsubscribeLink: boolean; // Ajouter un lien de désinscription (obligatoire RGPD)
}

export interface CampaignStats {
  totalRecipients: number;
  sent: number;
  opened: number;
  replied: number;
  bounced: number;
  unsubscribed: number;
  openRate: number; // %
  replyRate: number; // %
  bounceRate: number; // %
}

// ═══════════════════════════════════════════
// TEMPLATES DE SÉQUENCES
// ═══════════════════════════════════════════

export const SEQUENCE_TEMPLATES: { name: string; description: string; steps: Omit<EmailStep, "useAI">[] }[] = [
  {
    name: "Séquence classique 3 étapes",
    description: "Email initial + 2 relances. Le format le plus courant et efficace.",
    steps: [
      {
        stepNumber: 1,
        subject: "{{company}} × {{senderCompany}} — une idée pour vous",
        body: `Bonjour {{firstName}},

Je vois que {{company}} est active dans le secteur {{sector}} à {{city}}.

Chez {{senderCompany}}, nous aidons des entreprises comme la vôtre à {{offer}}.

Seriez-vous disponible pour un échange de 15 minutes cette semaine ?

{{senderName}}`,
        delayDays: 0,
        skipIfReplied: false,
        tone: "friendly",
      },
      {
        stepNumber: 2,
        subject: "Re: {{company}} × {{senderCompany}}",
        body: `Bonjour {{firstName}},

Je me permets de revenir vers vous concernant mon précédent message.

Pour vous donner un exemple concret, nous avons récemment aidé une entreprise similaire à la vôtre à obtenir des résultats significatifs.

Avez-vous 10 minutes pour en discuter ?

{{senderName}}`,
        delayDays: 3,
        skipIfReplied: true,
        tone: "friendly",
      },
      {
        stepNumber: 3,
        subject: "Dernière tentative — {{firstName}}",
        body: `{{firstName}},

Je ne veux pas être insistant, c'est mon dernier message.

Si le timing n'est pas bon, pas de souci. Je reste disponible quand vous le souhaitez.

Bonne continuation,
{{senderName}}`,
        delayDays: 7,
        skipIfReplied: true,
        tone: "casual",
      },
    ],
  },
  {
    name: "Approche valeur d'abord",
    description: "Donner de la valeur avant de demander quoi que ce soit.",
    steps: [
      {
        stepNumber: 1,
        subject: "{{firstName}}, un audit gratuit pour {{company}}",
        body: `Bonjour {{firstName}},

J'ai pris le temps d'analyser rapidement {{website}} et j'ai identifié quelques pistes d'amélioration pour {{company}}.

Voulez-vous que je vous envoie mon analyse ? C'est gratuit et sans engagement.

{{senderName}} — {{senderCompany}}`,
        delayDays: 0,
        skipIfReplied: false,
        tone: "friendly",
      },
      {
        stepNumber: 2,
        subject: "L'analyse de {{website}} est prête",
        body: `{{firstName}},

Comme promis, voici les 3 points clés que j'ai identifiés pour {{company}} :

1. [Point personnalisé #1]
2. [Point personnalisé #2]
3. [Point personnalisé #3]

Si ces points vous parlent, on peut en discuter 15 min ?

{{senderName}}`,
        delayDays: 2,
        skipIfReplied: true,
        tone: "friendly",
      },
      {
        stepNumber: 3,
        subject: "Suite analyse {{company}}",
        body: `{{firstName}},

Avez-vous eu le temps de regarder les points que je vous ai envoyés ?

Je serais ravi d'en discuter plus en détail. Voici mon calendrier si ça vous intéresse : [lien]

{{senderName}}`,
        delayDays: 5,
        skipIfReplied: true,
        tone: "casual",
      },
    ],
  },
  {
    name: "Social proof",
    description: "Utiliser la preuve sociale pour convaincre.",
    steps: [
      {
        stepNumber: 1,
        subject: "Comment [client similaire] a obtenu [résultat]",
        body: `Bonjour {{firstName}},

Nous avons récemment aidé une entreprise de votre secteur ({{sector}}) à {{offer}}.

Résultat : [résultat chiffré concret].

Est-ce que ça vous intéresserait d'obtenir des résultats similaires pour {{company}} ?

{{senderName}} — {{senderCompany}}`,
        delayDays: 0,
        skipIfReplied: false,
        tone: "formal",
      },
      {
        stepNumber: 2,
        subject: "Re: Résultats pour {{company}}",
        body: `{{firstName}},

Pour être plus concret, voici ce que nous avons fait pour [client] :

• Avant : [situation avant]
• Après : [résultat après]
• Délai : [temps]

On peut reproduire ça pour {{company}}. 15 minutes pour en discuter ?

{{senderName}}`,
        delayDays: 4,
        skipIfReplied: true,
        tone: "formal",
      },
    ],
  },
];

// ═══════════════════════════════════════════
// FONCTIONS PRINCIPALES
// ═══════════════════════════════════════════

/**
 * Crée une nouvelle campagne
 */
export function createCampaign(
  userId: string,
  name: string,
  settings: CampaignSettings,
  templateIndex?: number
): Campaign {
  const sequence = templateIndex !== undefined
    ? SEQUENCE_TEMPLATES[templateIndex].steps.map((s) => ({ ...s, useAI: false }))
    : [];

  return {
    userId,
    name,
    status: "draft",
    sequence,
    recipients: [],
    settings,
    stats: {
      totalRecipients: 0,
      sent: 0,
      opened: 0,
      replied: 0,
      bounced: 0,
      unsubscribed: 0,
      openRate: 0,
      replyRate: 0,
      bounceRate: 0,
    },
  };
}

/**
 * Ajoute des leads comme destinataires d'une campagne
 */
export function addLeadsToRecipients(leads: Lead[]): Recipient[] {
  return leads
    .filter((l) => l.emails.length > 0)
    .map((lead) => ({
      id: crypto.randomUUID(),
      email: lead.emails[0],
      firstName: undefined,
      lastName: undefined,
      company: lead.company,
      leadId: lead.id,
      status: "pending" as const,
      currentStep: 0,
    }));
}

/**
 * Ajoute des contacts comme destinataires
 */
export function addContactsToRecipients(contacts: Contact[]): Recipient[] {
  return contacts
    .filter((c) => c.email || c.emailGuesses.some((g) => g.verified))
    .map((contact) => ({
      id: crypto.randomUUID(),
      email: contact.email || contact.emailGuesses.find((g) => g.verified)?.email || "",
      firstName: contact.firstName,
      lastName: contact.lastName,
      company: contact.company,
      contactId: contact.id,
      status: "pending" as const,
      currentStep: 0,
    }));
}

/**
 * Personnalise le contenu d'un email avec les variables du destinataire
 */
export function personalizeEmail(
  template: string,
  recipient: Recipient,
  settings: CampaignSettings,
  extra?: Record<string, string>
): string {
  let result = template;

  const replacements: Record<string, string> = {
    "{{firstName}}": recipient.firstName || "Bonjour",
    "{{lastName}}": recipient.lastName || "",
    "{{company}}": recipient.company || "",
    "{{email}}": recipient.email,
    "{{senderName}}": settings.senderName,
    "{{senderCompany}}": settings.senderCompany,
    "{{offer}}": settings.senderOffer,
    ...extra,
  };

  for (const [key, value] of Object.entries(replacements)) {
    result = result.replaceAll(key, value);
  }

  return result;
}

/**
 * Personnalise un email avec l'IA (Claude) pour chaque destinataire
 */
export async function personalizeWithAI(
  step: EmailStep,
  recipient: Recipient,
  settings: CampaignSettings
): Promise<ProspectionEmail> {
  const lead: Lead = {
    company: recipient.company || "Inconnue",
    website: "",
    emails: [recipient.email],
    sector: "",
    socialProfiles: {},
    score: 50,
    source: "manual",
  };

  return generateProspectionEmail({
    lead,
    senderName: settings.senderName,
    senderCompany: settings.senderCompany,
    senderOffer: settings.senderOffer,
    tone: step.tone,
  });
}

/**
 * Calcule quand envoyer le prochain email (respecte les horaires + week-end)
 */
export function calculateNextSendTime(
  settings: CampaignSettings,
  delayDays: number,
  fromDate: Date = new Date()
): Date {
  const next = new Date(fromDate);
  next.setDate(next.getDate() + delayDays);

  // Ajuster pour les week-ends
  if (!settings.sendOnWeekends) {
    const day = next.getDay();
    if (day === 0) next.setDate(next.getDate() + 1); // Dimanche → Lundi
    if (day === 6) next.setDate(next.getDate() + 2); // Samedi → Lundi
  }

  // Ajuster pour la fenêtre d'envoi
  next.setHours(
    settings.sendingWindow.startHour + Math.floor(Math.random() * (settings.sendingWindow.endHour - settings.sendingWindow.startHour)),
    Math.floor(Math.random() * 60), // minute aléatoire pour paraître humain
    0,
    0
  );

  return next;
}

/**
 * Met à jour les stats d'une campagne
 */
export function updateCampaignStats(campaign: Campaign): CampaignStats {
  const recipients = campaign.recipients;
  const total = recipients.length;

  const sent = recipients.filter((r) => r.currentStep > 0).length;
  const opened = recipients.filter((r) => r.openedAt).length;
  const replied = recipients.filter((r) => r.repliedAt).length;
  const bounced = recipients.filter((r) => r.status === "bounced").length;
  const unsubscribed = recipients.filter((r) => r.status === "unsubscribed").length;

  return {
    totalRecipients: total,
    sent,
    opened,
    replied,
    bounced,
    unsubscribed,
    openRate: sent > 0 ? Math.round((opened / sent) * 100) : 0,
    replyRate: sent > 0 ? Math.round((replied / sent) * 100) : 0,
    bounceRate: sent > 0 ? Math.round((bounced / sent) * 100) : 0,
  };
}
