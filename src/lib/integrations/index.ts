/**
 * INTÉGRATIONS CRM & WEBHOOKS
 *
 * Permet d'envoyer les leads/contacts vers :
 * - HubSpot
 * - Pipedrive
 * - Salesforce
 * - Brevo (ex-SendinBlue)
 * - Webhooks personnalisés
 * - Zapier / Make (via webhooks)
 * - Google Sheets
 */

import type { Lead, Contact } from "@/types/lead";

// ═══════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════

export interface Integration {
  id: string;
  userId: string;
  type: IntegrationType;
  name: string;
  config: IntegrationConfig;
  isActive: boolean;
  lastSyncAt?: Date;
  createdAt?: Date;
}

export type IntegrationType =
  | "hubspot"
  | "pipedrive"
  | "salesforce"
  | "brevo"
  | "webhook"
  | "zapier"
  | "google_sheets";

export type IntegrationConfig =
  | HubSpotConfig
  | PipedriveConfig
  | SalesforceConfig
  | BrevoConfig
  | WebhookConfig
  | GoogleSheetsConfig;

interface HubSpotConfig { apiKey: string; portalId?: string }
interface PipedriveConfig { apiToken: string; domain: string }
interface SalesforceConfig { accessToken: string; instanceUrl: string; refreshToken: string }
interface BrevoConfig { apiKey: string; listId?: number }
interface WebhookConfig { url: string; secret?: string; events: WebhookEvent[] }
interface GoogleSheetsConfig { spreadsheetId: string; sheetName: string; credentials: string }

export type WebhookEvent =
  | "lead.created"
  | "lead.updated"
  | "contact.created"
  | "contact.updated"
  | "campaign.sent"
  | "campaign.replied";

// ═══════════════════════════════════════════
// WEBHOOKS — Le plus flexible
// ═══════════════════════════════════════════

/**
 * Envoie un événement via webhook
 */
export async function sendWebhook(
  config: WebhookConfig,
  event: WebhookEvent,
  data: Record<string, unknown>
): Promise<{ success: boolean; statusCode?: number; error?: string }> {
  if (!config.events.includes(event)) {
    return { success: true }; // Événement non souscrit, on skip
  }

  const payload = {
    event,
    timestamp: new Date().toISOString(),
    data,
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Signer le webhook si un secret est configuré
  if (config.secret) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(config.secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(JSON.stringify(payload))
    );
    headers["X-Webhook-Signature"] = Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  try {
    const response = await fetch(config.url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

    return { success: response.ok, statusCode: response.status };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown" };
  }
}

// ═══════════════════════════════════════════
// HUBSPOT
// ═══════════════════════════════════════════

/**
 * Envoie un lead vers HubSpot comme contact
 */
export async function pushToHubSpot(
  config: HubSpotConfig,
  lead: Lead
): Promise<{ success: boolean; hubspotId?: string; error?: string }> {
  try {
    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        properties: {
          email: lead.emails[0],
          company: lead.company,
          phone: lead.phone || "",
          website: lead.website,
          city: lead.city || "",
          country: lead.country || "",
          industry: lead.sector,
          hs_lead_status: "NEW",
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return { success: false, error: err };
    }

    const result = await response.json();
    return { success: true, hubspotId: result.id };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown" };
  }
}

/**
 * Envoie un contact individuel vers HubSpot
 */
export async function pushContactToHubSpot(
  config: HubSpotConfig,
  contact: Contact
): Promise<{ success: boolean; hubspotId?: string; error?: string }> {
  try {
    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        properties: {
          firstname: contact.firstName,
          lastname: contact.lastName,
          email: contact.email || contact.emailGuesses.find((g) => g.verified)?.email || "",
          phone: contact.phone || "",
          mobilephone: contact.mobile || "",
          jobtitle: contact.jobTitle || "",
          company: contact.company || "",
          website: contact.companyWebsite || "",
          city: contact.city || "",
          country: contact.country || "",
          hs_lead_status: "NEW",
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return { success: false, error: err };
    }

    const result = await response.json();
    return { success: true, hubspotId: result.id };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown" };
  }
}

// ═══════════════════════════════════════════
// PIPEDRIVE
// ═══════════════════════════════════════════

export async function pushToPipedrive(
  config: PipedriveConfig,
  lead: Lead
): Promise<{ success: boolean; pipedriveId?: number; error?: string }> {
  try {
    // Créer une organisation
    const orgResponse = await fetch(
      `https://${config.domain}.pipedrive.com/api/v1/organizations?api_token=${config.apiToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: lead.company, address: lead.address }),
      }
    );

    const orgResult = await orgResponse.json();
    const orgId = orgResult?.data?.id;

    // Créer un deal
    const dealResponse = await fetch(
      `https://${config.domain}.pipedrive.com/api/v1/deals?api_token=${config.apiToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Lead — ${lead.company}`,
          org_id: orgId,
          status: "open",
        }),
      }
    );

    const dealResult = await dealResponse.json();
    return { success: true, pipedriveId: dealResult?.data?.id };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown" };
  }
}

// ═══════════════════════════════════════════
// BREVO (ex-SendinBlue)
// ═══════════════════════════════════════════

export async function pushToBrevo(
  config: BrevoConfig,
  contact: Contact
): Promise<{ success: boolean; error?: string }> {
  try {
    const email = contact.email || contact.emailGuesses.find((g) => g.verified)?.email;
    if (!email) return { success: false, error: "Pas d'email" };

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": config.apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: contact.firstName,
          LASTNAME: contact.lastName,
          COMPANY: contact.company || "",
          PHONE: contact.phone || "",
        },
        listIds: config.listId ? [config.listId] : [],
        updateEnabled: true,
      }),
    });

    return { success: response.ok };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown" };
  }
}

// ═══════════════════════════════════════════
// SYNC EN MASSE
// ═══════════════════════════════════════════

/**
 * Synchronise une liste de leads vers toutes les intégrations actives
 */
export async function syncLeads(
  leads: Lead[],
  integrations: Integration[]
): Promise<{ integration: string; success: number; failed: number }[]> {
  const results: { integration: string; success: number; failed: number }[] = [];

  for (const integration of integrations.filter((i) => i.isActive)) {
    let success = 0;
    let failed = 0;

    for (const lead of leads) {
      let result: { success: boolean };

      switch (integration.type) {
        case "hubspot":
          result = await pushToHubSpot(integration.config as HubSpotConfig, lead);
          break;
        case "pipedrive":
          result = await pushToPipedrive(integration.config as PipedriveConfig, lead);
          break;
        case "webhook":
        case "zapier":
          result = await sendWebhook(integration.config as WebhookConfig, "lead.created", { lead });
          break;
        default:
          result = { success: false };
      }

      if (result.success) success++;
      else failed++;
    }

    results.push({ integration: integration.name, success, failed });
  }

  return results;
}
