/**
 * MODULE D'EXPORT
 *
 * Exporte les leads et contacts en différents formats :
 * - CSV (compatible Excel, Google Sheets)
 * - JSON (pour intégrations API)
 * - Excel-compatible CSV (avec BOM UTF-8 pour les accents)
 */

import type { Lead, Contact } from "@/types/lead";

// ═══════════════════════════════════════════
// EXPORT CSV
// ═══════════════════════════════════════════

const LEAD_CSV_HEADERS = [
  "Entreprise",
  "Site Web",
  "Emails",
  "Téléphone",
  "Adresse",
  "Secteur",
  "Ville",
  "Pays",
  "LinkedIn",
  "Twitter",
  "Facebook",
  "Instagram",
  "Score",
  "Source",
  "Statut",
];

const CONTACT_CSV_HEADERS = [
  "Prénom",
  "Nom",
  "Nom Complet",
  "Email",
  "Emails Devinés",
  "Téléphone",
  "Mobile",
  "Poste",
  "Entreprise",
  "Site Web",
  "LinkedIn",
  "Twitter",
  "Ville",
  "Pays",
  "Score",
  "Source",
];

/**
 * Exporte des leads en CSV
 */
export function leadsToCSV(leads: Lead[], options?: ExportOptions): string {
  const sep = options?.separator || ",";
  const includeHeaders = options?.includeHeaders !== false;

  const rows: string[] = [];

  if (includeHeaders) {
    rows.push(LEAD_CSV_HEADERS.join(sep));
  }

  for (const lead of leads) {
    const row = [
      escapeCSV(lead.company),
      escapeCSV(lead.website),
      escapeCSV(lead.emails.join("; ")),
      escapeCSV(lead.phone || ""),
      escapeCSV(lead.address || ""),
      escapeCSV(lead.sector),
      escapeCSV(lead.city || ""),
      escapeCSV(lead.country || ""),
      escapeCSV(lead.socialProfiles.linkedin || ""),
      escapeCSV(lead.socialProfiles.twitter || ""),
      escapeCSV(lead.socialProfiles.facebook || ""),
      escapeCSV(lead.socialProfiles.instagram || ""),
      String(lead.score),
      escapeCSV(lead.source),
      "",
    ];
    rows.push(row.join(sep));
  }

  // BOM UTF-8 pour Excel
  const bom = options?.excelCompatible ? "\uFEFF" : "";
  return bom + rows.join("\n");
}

/**
 * Exporte des contacts en CSV
 */
export function contactsToCSV(contacts: Contact[], options?: ExportOptions): string {
  const sep = options?.separator || ",";
  const includeHeaders = options?.includeHeaders !== false;

  const rows: string[] = [];

  if (includeHeaders) {
    rows.push(CONTACT_CSV_HEADERS.join(sep));
  }

  for (const contact of contacts) {
    const bestGuesses = contact.emailGuesses
      .filter((g) => g.verified || g.confidence >= 50)
      .map((g) => `${g.email} (${g.confidence}%)`)
      .join("; ");

    const row = [
      escapeCSV(contact.firstName),
      escapeCSV(contact.lastName),
      escapeCSV(contact.fullName),
      escapeCSV(contact.email || ""),
      escapeCSV(bestGuesses),
      escapeCSV(contact.phone || ""),
      escapeCSV(contact.mobile || ""),
      escapeCSV(contact.jobTitle || ""),
      escapeCSV(contact.company || ""),
      escapeCSV(contact.companyWebsite || ""),
      escapeCSV(contact.linkedin || ""),
      escapeCSV(contact.twitter || ""),
      escapeCSV(contact.city || ""),
      escapeCSV(contact.country || ""),
      String(contact.score),
      escapeCSV(contact.source),
    ];
    rows.push(row.join(sep));
  }

  const bom = options?.excelCompatible ? "\uFEFF" : "";
  return bom + rows.join("\n");
}

// ═══════════════════════════════════════════
// EXPORT JSON
// ═══════════════════════════════════════════

/**
 * Exporte des leads en JSON propre
 */
export function leadsToJSON(leads: Lead[], pretty: boolean = true): string {
  const cleaned = leads.map((lead) => ({
    company: lead.company,
    website: lead.website,
    emails: lead.emails,
    phone: lead.phone || null,
    address: lead.address || null,
    sector: lead.sector,
    city: lead.city || null,
    country: lead.country || null,
    social: {
      linkedin: lead.socialProfiles.linkedin || null,
      twitter: lead.socialProfiles.twitter || null,
      facebook: lead.socialProfiles.facebook || null,
      instagram: lead.socialProfiles.instagram || null,
    },
    score: lead.score,
    source: lead.source,
  }));

  return JSON.stringify({ leads: cleaned, count: cleaned.length, exportedAt: new Date().toISOString() }, null, pretty ? 2 : 0);
}

/**
 * Exporte des contacts en JSON propre
 */
export function contactsToJSON(contacts: Contact[], pretty: boolean = true): string {
  const cleaned = contacts.map((c) => ({
    firstName: c.firstName,
    lastName: c.lastName,
    fullName: c.fullName,
    email: c.email || null,
    emailGuesses: c.emailGuesses.filter((g) => g.confidence >= 30),
    phone: c.phone || null,
    mobile: c.mobile || null,
    jobTitle: c.jobTitle || null,
    company: c.company || null,
    companyWebsite: c.companyWebsite || null,
    linkedin: c.linkedin || null,
    twitter: c.twitter || null,
    city: c.city || null,
    country: c.country || null,
    score: c.score,
    source: c.source,
  }));

  return JSON.stringify({ contacts: cleaned, count: cleaned.length, exportedAt: new Date().toISOString() }, null, pretty ? 2 : 0);
}

// ═══════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════

interface ExportOptions {
  separator?: "," | ";" | "\t";
  includeHeaders?: boolean;
  excelCompatible?: boolean; // Ajoute BOM UTF-8 + séparateur ;
}

function escapeCSV(value: string): string {
  if (!value) return '""';
  // Si la valeur contient des guillemets, virgules ou retours à la ligne, l'encadrer
  if (value.includes('"') || value.includes(",") || value.includes(";") || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return `"${value}"`;
}
