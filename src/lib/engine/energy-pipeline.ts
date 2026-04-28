/**
 * PIPELINE ÉNERGIE US — orchestrateur dédié au vertical énergie B2B.
 *
 * Étapes :
 *   1. Construction des requêtes (sous-secteur × état × keywords)
 *   2. Recherche Google parallèle + scraping d'annuaires sectoriels publics
 *   3. Déduplication par domaine
 *   4. Scraping des sites + pages contact
 *   5. Vérification d'emails (optionnel)
 *   6. Scoring sectoriel (NAICS, signaux métiers)
 *   7. Tri + retour
 */

import * as cheerio from "cheerio";
import { searchGoogle, scrapePage, scrapeContactPage } from "./scraper";
import { verifyEmails } from "./email-verifier";
import { pageToLead } from "./enricher";
import {
  buildEnergyQueries,
  getEnergySubSector,
  getUsState,
  applyEnergyScoring,
  type EnergySubSector,
} from "./energy-us";
import type { Lead } from "@/types/lead";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const FETCH_TIMEOUT = 12_000;

export interface EnergyPipelineOptions {
  subSectorId: string;
  state?: string;          // ex: "CA"
  city?: string;           // ex: "San Diego"
  extraKeywords?: string[];
  excludeKeywords?: string[];
  maxPerQuery?: number;    // Google results per query (défaut 10)
  maxQueries?: number;     // nombre de variantes de requêtes (défaut 4)
  scrapeDirectories?: boolean;  // scraper aussi les annuaires sectoriels (défaut true)
  verify?: boolean;        // vérifier MX des emails (défaut true)
  concurrency?: number;    // nb de scrapes en parallèle (défaut 4)
  onProgress?: (s: EnergyPipelineStep) => void;
}

export interface EnergyPipelineStep {
  stage:
    | "building_queries"
    | "searching"
    | "scraping_directories"
    | "scraping_sites"
    | "verifying"
    | "scoring"
    | "done";
  current: number;
  total: number;
  message: string;
}

export interface EnergyPipelineResult {
  leads: Lead[];
  stats: {
    queriesUsed: number;
    sitesFound: number;
    directoriesScraped: number;
    sitesScraped: number;
    emailsFound: number;
    emailsValid: number;
    leadsGenerated: number;
    duration: number;
  };
}

// ─── Helpers ──────────────────────────────────────────────

/**
 * Récupère la liste des liens externes d'un annuaire (membres / participants).
 * Garde uniquement les liens vers des domaines tiers (entreprises listées).
 */
async function fetchDirectoryLinks(directoryUrl: string): Promise<string[]> {
  try {
    const res = await fetch(directoryUrl, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
      redirect: "follow",
    });

    if (!res.ok) return [];

    const html = await res.text();
    const $ = cheerio.load(html);
    const directoryHost = new URL(directoryUrl).hostname;

    const externalLinks = new Set<string>();
    $("a[href]").each((_, el) => {
      const href = $(el).attr("href");
      if (!href) return;

      try {
        const url = new URL(href, directoryUrl);
        if (
          url.protocol.startsWith("http") &&
          url.hostname !== directoryHost &&
          !url.hostname.endsWith(directoryHost) &&
          !isBlacklistedDomain(url.hostname)
        ) {
          externalLinks.add(`${url.protocol}//${url.hostname}`);
        }
      } catch {
        // URL malformée
      }
    });

    return [...externalLinks];
  } catch {
    return [];
  }
}

const SOCIAL_AND_INFRA = [
  "facebook.com", "twitter.com", "x.com", "linkedin.com",
  "youtube.com", "instagram.com", "tiktok.com",
  "google.com", "googletagmanager.com", "googleapis.com",
  "gstatic.com", "wikipedia.org", "wp.com",
  "bing.com", "amazon.com", "cloudfront.net",
];

function isBlacklistedDomain(hostname: string): boolean {
  return SOCIAL_AND_INFRA.some((d) => hostname.endsWith(d));
}

/**
 * Mini limiteur de concurrence (sans dépendance externe).
 */
async function runWithConcurrency<T, R>(
  items: T[],
  worker: (item: T, index: number) => Promise<R>,
  concurrency: number
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;

  async function next(): Promise<void> {
    const i = cursor++;
    if (i >= items.length) return;
    try {
      results[i] = await worker(items[i], i);
    } catch (err) {
      results[i] = err as R;
    }
    return next();
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => next())
  );
  return results;
}

function dedupeByDomain(urls: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const u of urls) {
    try {
      const host = new URL(u).hostname.replace(/^www\./, "");
      if (!seen.has(host)) {
        seen.add(host);
        out.push(u);
      }
    } catch {
      // skip
    }
  }
  return out;
}

function matchesExclusions(text: string, exclude: string[]): boolean {
  if (!exclude.length) return false;
  const lower = text.toLowerCase();
  return exclude.some((kw) => lower.includes(kw.toLowerCase()));
}

// ─── Pipeline principal ───────────────────────────────────

export async function runEnergyUsPipeline(
  opts: EnergyPipelineOptions
): Promise<EnergyPipelineResult> {
  const start = Date.now();
  const sector = getEnergySubSector(opts.subSectorId);

  if (!sector) {
    throw new Error(`Sous-secteur inconnu: ${opts.subSectorId}`);
  }

  const stateName = opts.state ? getUsState(opts.state)?.name : undefined;
  const concurrency = opts.concurrency ?? 4;
  const maxPerQuery = opts.maxPerQuery ?? 10;
  const maxQueries = opts.maxQueries ?? 4;
  const scrapeDirs = opts.scrapeDirectories ?? true;
  const shouldVerify = opts.verify ?? true;
  const exclude = opts.excludeKeywords ?? [];

  const progress = (s: EnergyPipelineStep) => opts.onProgress?.(s);

  // ── 1. Build queries ──
  progress({
    stage: "building_queries",
    current: 0,
    total: 1,
    message: `Construction des requêtes ${sector.name}${stateName ? ` (${stateName})` : ""}...`,
  });

  const queries = buildEnergyQueries({
    subSectorId: opts.subSectorId,
    state: opts.state,
    city: opts.city,
    extraKeywords: opts.extraKeywords,
    maxQueries,
  });

  // ── 2. Recherches Google parallèles ──
  progress({
    stage: "searching",
    current: 0,
    total: queries.length,
    message: `Lancement de ${queries.length} recherches Google...`,
  });

  const searchResults = await runWithConcurrency(
    queries,
    async (q, idx) => {
      try {
        const res = await searchGoogle({
          keywords: q,
          country: "United States",
          maxResults: maxPerQuery,
        });
        progress({
          stage: "searching",
          current: idx + 1,
          total: queries.length,
          message: `${res.length} sites trouvés pour "${q}"`,
        });
        return res;
      } catch {
        return [];
      }
    },
    Math.min(concurrency, 3)
  );

  const flatGoogleUrls = searchResults
    .flat()
    .map((r) => r.url)
    .filter(Boolean);

  // ── 3. Annuaires sectoriels (optionnel) ──
  let directoryUrls: string[] = [];
  let directoriesScraped = 0;

  if (scrapeDirs && sector.directories?.length) {
    progress({
      stage: "scraping_directories",
      current: 0,
      total: sector.directories.length,
      message: `Scraping de ${sector.directories.length} annuaires sectoriels...`,
    });

    const dirResults = await runWithConcurrency(
      sector.directories,
      async (url, idx) => {
        const links = await fetchDirectoryLinks(url);
        progress({
          stage: "scraping_directories",
          current: idx + 1,
          total: sector.directories!.length,
          message: `${links.length} entreprises listées dans ${new URL(url).hostname}`,
        });
        return links;
      },
      Math.min(concurrency, 2)
    );

    directoryUrls = dirResults.flat();
    directoriesScraped = sector.directories.length;
  }

  // ── 4. Dédup + filtre ──
  const allCandidateUrls = dedupeByDomain([...flatGoogleUrls, ...directoryUrls]);

  // ── 5. Scraping ──
  progress({
    stage: "scraping_sites",
    current: 0,
    total: allCandidateUrls.length,
    message: `Scraping de ${allCandidateUrls.length} sites...`,
  });

  let totalEmailsFound = 0;
  const leads: Lead[] = [];

  await runWithConcurrency(
    allCandidateUrls,
    async (url, idx) => {
      try {
        const main = await scrapePage(url);
        const contact = await scrapeContactPage(url).catch(() => null);

        const emails = [...new Set([...main.emails, ...(contact?.emails ?? [])])];
        const phones = [...new Set([...main.phones, ...(contact?.phones ?? [])])];

        if (emails.length === 0 && phones.length === 0) return null;

        // Filtre exclusions textuelles
        const haystack = `${main.title} ${main.description}`;
        if (matchesExclusions(haystack, exclude)) return null;

        const merged = {
          ...main,
          emails,
          phones,
          socialLinks: {
            ...main.socialLinks,
            ...(contact?.socialLinks ?? {}),
          },
        };

        totalEmailsFound += emails.length;

        let lead = pageToLead(merged, {
          sector: sector.name,
          city: opts.city,
        });

        // Forcer pays US + état
        lead.country = "United States";
        if (stateName) {
          lead.address = lead.address
            ? `${lead.address}, ${stateName}`
            : stateName;
        }

        // Récupérer le HTML brut pour le scoring sectoriel (NAICS, signaux)
        const fullText = `${main.title}\n${main.description}\n${emails.join(" ")}`;
        try {
          const r = await fetch(url, {
            headers: { "User-Agent": USER_AGENT },
            signal: AbortSignal.timeout(FETCH_TIMEOUT),
          });
          if (r.ok) {
            const html = await r.text();
            const $ = cheerio.load(html);
            const text = `${fullText}\n${$("body").text().slice(0, 5000)}`;
            lead = applyEnergyScoring(lead, html, text, sector);
          }
        } catch {
          // fallback : score sectoriel basé sur les seules infos déjà extraites
          lead = applyEnergyScoring(lead, "", fullText, sector);
        }

        leads.push(lead);

        progress({
          stage: "scraping_sites",
          current: idx + 1,
          total: allCandidateUrls.length,
          message: `${leads.length} leads jusqu'ici (${new URL(url).hostname})`,
        });

        return lead;
      } catch {
        return null;
      }
    },
    concurrency
  );

  // ── 6. Vérification d'emails ──
  let validCount = totalEmailsFound;

  if (shouldVerify && leads.length > 0) {
    const allEmails = leads.flatMap((l) => l.emails);
    progress({
      stage: "verifying",
      current: 0,
      total: allEmails.length,
      message: `Vérification de ${allEmails.length} emails...`,
    });

    const verifications = await verifyEmails(allEmails);
    const valid = new Set(verifications.filter((v) => v.isValid).map((v) => v.email));
    validCount = valid.size;

    for (const lead of leads) {
      lead.emails = lead.emails.filter((e) => valid.has(e));
    }

    progress({
      stage: "verifying",
      current: allEmails.length,
      total: allEmails.length,
      message: `${validCount}/${allEmails.length} emails valides`,
    });
  }

  // ── 7. Tri + cleanup ──
  progress({
    stage: "scoring",
    current: 1,
    total: 1,
    message: "Tri par score sectoriel...",
  });

  // Garder les leads avec au moins un email valide ou un téléphone
  const finalLeads = leads
    .filter((l) => l.emails.length > 0 || l.phone)
    .sort((a, b) => b.score - a.score);

  const duration = Date.now() - start;

  progress({
    stage: "done",
    current: 1,
    total: 1,
    message: `${finalLeads.length} leads en ${Math.round(duration / 1000)}s`,
  });

  return {
    leads: finalLeads,
    stats: {
      queriesUsed: queries.length,
      sitesFound: flatGoogleUrls.length,
      directoriesScraped,
      sitesScraped: allCandidateUrls.length,
      emailsFound: totalEmailsFound,
      emailsValid: validCount,
      leadsGenerated: finalLeads.length,
      duration,
    },
  };
}

// Re-export pour usage externe
export type { EnergySubSector };
