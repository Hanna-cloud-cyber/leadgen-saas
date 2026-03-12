/**
 * MOTEUR DE SCRAPING — Le coeur du système
 *
 * Ce module cherche des entreprises sur Google,
 * visite leurs sites, et extrait les informations de contact.
 */

import * as cheerio from "cheerio";
import type { SearchQuery, ScrapedPage, SocialProfiles } from "@/types/lead";

// User-Agent réaliste pour éviter les blocages
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const FETCH_TIMEOUT = 10_000; // 10 secondes

/**
 * Recherche Google : construit l'URL de recherche et parse les résultats
 */
export async function searchGoogle(
  query: SearchQuery
): Promise<{ url: string; title: string; description: string }[]> {
  const searchTerms = [query.keywords, query.city, query.country]
    .filter(Boolean)
    .join(" ");

  const maxResults = query.maxResults ?? 20;

  // Google Search via scraping (pour MVP — en production, utiliser SerpAPI ou ScraperAPI)
  const url = `https://www.google.com/search?q=${encodeURIComponent(searchTerms)}&num=${maxResults}&hl=fr`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "fr-FR,fr;q=0.9",
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
  });

  if (!response.ok) {
    throw new Error(`Google search failed: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const results: { url: string; title: string; description: string }[] = [];

  // Parser les résultats Google
  $("div.g, div[data-sokoban-container]").each((_, element) => {
    const linkEl = $(element).find("a[href]").first();
    const href = linkEl.attr("href");
    const title = $(element).find("h3").first().text().trim();
    const description = $(element).find("[data-sncf], .VwiC3b, span.st").first().text().trim();

    if (href && title && !href.includes("google.com") && href.startsWith("http")) {
      results.push({ url: href, title, description });
    }
  });

  return results.slice(0, maxResults);
}

/**
 * Visite un site web et extrait toutes les infos de contact
 */
export async function scrapePage(url: string): Promise<ScrapedPage> {
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Extraire le titre
  const title = $("title").text().trim() || $("h1").first().text().trim();

  // Extraire la description
  const description =
    $('meta[name="description"]').attr("content") ||
    $("p").first().text().trim().slice(0, 200);

  // Extraire les emails
  const emails = extractEmails(html);

  // Extraire les numéros de téléphone
  const phones = extractPhones(html);

  // Extraire les liens sociaux
  const socialLinks = extractSocialLinks($);

  return {
    url,
    title,
    description,
    emails: [...new Set(emails)], // dédupliquer
    phones: [...new Set(phones)],
    socialLinks,
  };
}

/**
 * Scrape aussi la page Contact si elle existe (souvent là où sont les emails)
 */
export async function scrapeContactPage(
  baseUrl: string
): Promise<ScrapedPage | null> {
  const contactPaths = [
    "/contact",
    "/contactez-nous",
    "/nous-contacter",
    "/contact-us",
    "/about",
    "/a-propos",
    "/mentions-legales",
    "/impressum",
  ];

  const origin = new URL(baseUrl).origin;

  for (const path of contactPaths) {
    try {
      const page = await scrapePage(origin + path);
      if (page.emails.length > 0 || page.phones.length > 0) {
        return page;
      }
    } catch {
      // Page n'existe pas, on continue
    }
  }

  return null;
}

// ─── Fonctions d'extraction ───────────────────────────

/**
 * Trouve tous les emails dans le HTML via regex
 */
function extractEmails(html: string): string[] {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = html.match(emailRegex) || [];

  // Filtrer les faux positifs (images, fichiers, etc.)
  const blacklist = [".png", ".jpg", ".gif", ".svg", ".css", ".js", "example.com", "email.com", "test.com"];

  return matches.filter(
    (email) =>
      !blacklist.some((bl) => email.toLowerCase().includes(bl)) &&
      email.length < 60
  );
}

/**
 * Trouve les numéros de téléphone (format FR et international)
 */
function extractPhones(html: string): string[] {
  const phoneRegex =
    /(?:\+33|0033|0)\s*[1-9](?:[\s.-]*\d{2}){4}|\+\d{1,3}[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}/g;

  const matches = html.match(phoneRegex) || [];
  return matches.map((phone) => phone.replace(/\s+/g, " ").trim());
}

/**
 * Extrait les liens vers les réseaux sociaux
 */
function extractSocialLinks($: cheerio.CheerioAPI): SocialProfiles {
  const socialLinks: SocialProfiles = {};
  const allLinks: string[] = [];

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (href) allLinks.push(href);
  });

  for (const link of allLinks) {
    if (link.includes("linkedin.com/company") || link.includes("linkedin.com/in")) {
      socialLinks.linkedin = link;
    } else if (link.includes("twitter.com/") || link.includes("x.com/")) {
      socialLinks.twitter = link;
    } else if (link.includes("facebook.com/") && !link.includes("facebook.com/sharer")) {
      socialLinks.facebook = link;
    } else if (link.includes("instagram.com/")) {
      socialLinks.instagram = link;
    }
  }

  return socialLinks;
}
