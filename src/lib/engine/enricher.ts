/**
 * ENRICHISSEUR DE LEADS
 *
 * Enrichit un lead brut avec des données supplémentaires :
 * - Infos entreprise depuis le site web
 * - Réseaux sociaux
 * - Score de qualité
 * - Catégorisation
 */

import * as cheerio from "cheerio";
import type { Lead, ScrapedPage, SocialProfiles } from "@/types/lead";
import { scoreEmail, isBusinessEmail } from "./email-verifier";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

/**
 * Transforme une page scrapée en lead enrichi
 */
export function pageToLead(
  page: ScrapedPage,
  query: { sector: string; city?: string }
): Lead {
  const domain = new URL(page.url).hostname.replace("www.", "");

  // Scorer les emails et garder les meilleurs
  const scoredEmails = page.emails
    .map((email) => ({ email, score: scoreEmail(email) }))
    .sort((a, b) => b.score - a.score);

  // Score global du lead
  const leadScore = calculateLeadScore(page, scoredEmails);

  return {
    company: cleanCompanyName(page.title, domain),
    website: page.url,
    emails: scoredEmails.map((e) => e.email),
    phone: page.phones[0],
    sector: query.sector,
    city: query.city,
    country: "France",
    socialProfiles: page.socialLinks,
    score: leadScore,
    source: "google",
  };
}

/**
 * Enrichit un lead existant en revisitant son site
 */
export async function enrichLead(lead: Lead): Promise<Lead> {
  try {
    const response = await fetch(lead.website, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) return lead;

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extraire des métadonnées supplémentaires
    const enriched = { ...lead };

    // Chercher l'adresse
    const address = extractAddress($);
    if (address) enriched.address = address;

    // Compléter les réseaux sociaux
    enriched.socialProfiles = {
      ...lead.socialProfiles,
      ...extractAllSocialLinks($),
    };

    // Chercher des informations sur la taille de l'entreprise
    // (schema.org, données structurées)
    const structuredData = extractStructuredData($);
    if (structuredData) {
      enriched.company = structuredData.name || enriched.company;
      enriched.address = structuredData.address || enriched.address;
      enriched.phone = structuredData.phone || enriched.phone;
    }

    // Recalculer le score avec les nouvelles données
    enriched.score = calculateEnrichedScore(enriched);

    return enriched;
  } catch {
    return lead; // En cas d'erreur, retourner le lead tel quel
  }
}

// ─── Helpers ───────────────────────────

/**
 * Calcule le score d'un lead (0-100)
 */
function calculateLeadScore(
  page: ScrapedPage,
  scoredEmails: { email: string; score: number }[]
): number {
  let score = 0;

  // A des emails = +30
  if (page.emails.length > 0) score += 30;

  // A des emails pro = +20
  if (page.emails.some(isBusinessEmail)) score += 20;

  // A un téléphone = +15
  if (page.phones.length > 0) score += 15;

  // A un LinkedIn = +15
  if (page.socialLinks.linkedin) score += 15;

  // A d'autres réseaux sociaux = +5 chacun
  if (page.socialLinks.twitter) score += 5;
  if (page.socialLinks.facebook) score += 5;
  if (page.socialLinks.instagram) score += 5;

  // Bonus qualité du meilleur email
  if (scoredEmails.length > 0) {
    score += Math.round(scoredEmails[0].score / 10);
  }

  return Math.min(100, score);
}

function calculateEnrichedScore(lead: Lead): number {
  let score = lead.score;

  if (lead.address) score += 5;
  if (lead.socialProfiles.linkedin) score += 10;
  if (lead.phone) score += 5;

  return Math.min(100, score);
}

/**
 * Nettoie le nom de l'entreprise depuis le titre de la page
 */
function cleanCompanyName(pageTitle: string, domain: string): string {
  // Souvent le titre est "Nom Entreprise - description"
  const separators = [" - ", " | ", " — ", " · ", " :: "];
  for (const sep of separators) {
    if (pageTitle.includes(sep)) {
      return pageTitle.split(sep)[0].trim();
    }
  }

  // Si le titre est trop long, utiliser le domaine
  if (pageTitle.length > 60) {
    return domain
      .replace(/\.(com|fr|net|org|io|co)$/i, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return pageTitle;
}

/**
 * Cherche une adresse physique dans la page
 */
function extractAddress($: cheerio.CheerioAPI): string | undefined {
  // Chercher dans les microdonnées schema.org
  const streetAddress = $('[itemprop="streetAddress"]').text().trim();
  const postalCode = $('[itemprop="postalCode"]').text().trim();
  const city = $('[itemprop="addressLocality"]').text().trim();

  if (streetAddress || postalCode) {
    return [streetAddress, postalCode, city].filter(Boolean).join(", ");
  }

  // Chercher un code postal français dans le texte
  const bodyText = $("body").text();
  const cpMatch = bodyText.match(/\d{5}\s+[A-ZÀ-Ü][a-zà-ü]+/);
  if (cpMatch) return cpMatch[0];

  return undefined;
}

function extractAllSocialLinks($: cheerio.CheerioAPI): SocialProfiles {
  const links: SocialProfiles = {};

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") || "";
    if (href.includes("linkedin.com")) links.linkedin = href;
    else if (href.includes("twitter.com") || href.includes("x.com"))
      links.twitter = href;
    else if (href.includes("facebook.com") && !href.includes("sharer"))
      links.facebook = href;
    else if (href.includes("instagram.com")) links.instagram = href;
  });

  return links;
}

/**
 * Extrait les données structurées JSON-LD (schema.org)
 */
function extractStructuredData(
  $: cheerio.CheerioAPI
): { name?: string; address?: string; phone?: string } | null {
  const jsonLd = $('script[type="application/ld+json"]').first().html();
  if (!jsonLd) return null;

  try {
    const data = JSON.parse(jsonLd);
    const org = data["@type"] === "Organization" ? data : data["@graph"]?.find((d: Record<string, string>) => d["@type"] === "Organization");

    if (!org) return null;

    return {
      name: org.name,
      phone: org.telephone,
      address:
        typeof org.address === "string"
          ? org.address
          : org.address?.streetAddress,
    };
  } catch {
    return null;
  }
}
