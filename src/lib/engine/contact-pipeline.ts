/**
 * PIPELINE DE SCRAPING DE CONTACTS
 *
 * Orchestre la recherche de contacts individuels :
 *
 * 1. Recherche Google → URLs pertinentes
 * 2. Scraping des pages équipe/about → contacts bruts
 * 3. Scraping des annuaires → contacts supplémentaires
 * 4. Devinette d'emails (patterns) → emails probables
 * 5. Vérification des emails → emails confirmés
 * 6. Scoring et tri → contacts qualifiés
 */

import { searchGoogle } from "./scraper";
import {
  searchContacts,
  scrapeContactsFromPage,
  scrapeTeamPages,
  enrichContact,
} from "./contact-scraper";
import { detectEmailPattern, applyPattern } from "./email-guesser";
import type {
  Contact,
  ContactSearchQuery,
  ScrapedContact,
} from "@/types/lead";

export interface ContactPipelineOptions {
  query: ContactSearchQuery;
  scrapeTeamPages?: boolean; // Scraper les pages équipe (défaut: true)
  guessEmails?: boolean; // Deviner les emails (défaut: true)
  verifyGuesses?: boolean; // Vérifier les emails devinés (défaut: true)
  onProgress?: (step: ContactPipelineStep) => void;
}

export interface ContactPipelineStep {
  stage: "searching" | "scraping" | "enriching" | "verifying" | "done";
  current: number;
  total: number;
  message: string;
}

export interface ContactPipelineResult {
  contacts: Contact[];
  stats: {
    urlsFound: number;
    pagesScraped: number;
    contactsRaw: number;
    contactsEnriched: number;
    emailsGuessed: number;
    emailsVerified: number;
    duration: number;
  };
}

/**
 * Lance le pipeline complet de recherche de contacts
 */
export async function runContactPipeline(
  options: ContactPipelineOptions
): Promise<ContactPipelineResult> {
  const startTime = Date.now();
  const {
    query,
    scrapeTeamPages: shouldScrapeTeam = true,
    guessEmails: shouldGuessEmails = true,
    verifyGuesses: shouldVerify = true,
    onProgress,
  } = options;

  const progress = (step: ContactPipelineStep) => onProgress?.(step);

  // ─── ÉTAPE 1 : Rechercher des URLs pertinentes ───
  progress({
    stage: "searching",
    current: 0,
    total: 1,
    message: `Recherche de "${query.keywords}" ${query.city ? `à ${query.city}` : ""}...`,
  });

  // Double recherche : Google classique + recherche ciblée contacts
  const [googleResults, contactUrls] = await Promise.all([
    searchGoogle({
      keywords: query.keywords + (query.sector ? ` ${query.sector}` : ""),
      city: query.city,
      country: query.country,
      maxResults: query.maxResults || 20,
    }),
    searchContacts(query),
  ]);

  const allUrls = [
    ...new Set([
      ...googleResults.map((r) => r.url),
      ...contactUrls,
    ]),
  ];

  progress({
    stage: "searching",
    current: 1,
    total: 1,
    message: `${allUrls.length} URLs trouvées`,
  });

  // ─── ÉTAPE 2 : Scraper les pages ───
  const allRawContacts: ScrapedContact[] = [];
  const domainsWithContacts = new Map<string, ScrapedContact[]>(); // domaine → contacts trouvés

  for (let i = 0; i < allUrls.length; i++) {
    const url = allUrls[i];

    progress({
      stage: "scraping",
      current: i + 1,
      total: allUrls.length,
      message: `Scraping ${new URL(url).hostname}...`,
    });

    try {
      // Scraper la page directe
      const pageContacts = await scrapeContactsFromPage(url, "google");
      allRawContacts.push(...pageContacts);

      // Scraper les pages équipe si demandé
      if (shouldScrapeTeam) {
        const teamContacts = await scrapeTeamPages(url);
        allRawContacts.push(...teamContacts);
      }

      // Garder trace des contacts par domaine (pour la détection de pattern)
      const domain = new URL(url).hostname.replace("www.", "");
      if (!domainsWithContacts.has(domain)) {
        domainsWithContacts.set(domain, []);
      }
      domainsWithContacts.get(domain)!.push(...pageContacts);
    } catch {
      // URL inaccessible
    }
  }

  // Dédupliquer
  const uniqueContacts = deduplicateByName(allRawContacts);

  progress({
    stage: "scraping",
    current: allUrls.length,
    total: allUrls.length,
    message: `${uniqueContacts.length} contacts trouvés`,
  });

  // ─── ÉTAPE 3 : Enrichir les contacts (deviner emails + vérifier) ───
  const enrichedContacts: Contact[] = [];
  let emailsGuessed = 0;
  let emailsVerified = 0;

  for (let i = 0; i < uniqueContacts.length; i++) {
    const raw = uniqueContacts[i];

    progress({
      stage: "enriching",
      current: i + 1,
      total: uniqueContacts.length,
      message: `Enrichissement de ${raw.fullName}...`,
    });

    // Trouver le domaine de l'entreprise
    let companyDomain: string | undefined;

    // Si on a un email direct, extraire le domaine
    if (raw.email) {
      companyDomain = raw.email.split("@")[1];
    }

    // Essayer de détecter le pattern email de l'entreprise
    if (companyDomain && raw.email && raw.firstName && raw.lastName) {
      const pattern = detectEmailPattern(raw.email, raw.firstName, raw.lastName);

      if (pattern) {
        // Appliquer ce pattern aux autres contacts de la même entreprise
        const sameDomainContacts = domainsWithContacts.get(
          companyDomain.replace("www.", "")
        );

        if (sameDomainContacts) {
          for (const sibling of sameDomainContacts) {
            if (!sibling.email && sibling.firstName && sibling.lastName) {
              sibling.email =
                applyPattern(pattern, sibling.firstName, sibling.lastName, companyDomain) ||
                undefined;
            }
          }
        }
      }
    }

    const enriched = await enrichContact(
      raw,
      shouldGuessEmails ? companyDomain : undefined
    );

    emailsGuessed += enriched.emailGuesses.length;
    emailsVerified += enriched.emailGuesses.filter((g) => g.verified).length;

    enrichedContacts.push(enriched);
  }

  // Trier par score décroissant
  enrichedContacts.sort((a, b) => b.score - a.score);

  const duration = Date.now() - startTime;

  progress({
    stage: "done",
    current: 1,
    total: 1,
    message: `${enrichedContacts.length} contacts enrichis en ${Math.round(duration / 1000)}s`,
  });

  return {
    contacts: enrichedContacts,
    stats: {
      urlsFound: allUrls.length,
      pagesScraped: allUrls.length,
      contactsRaw: allRawContacts.length,
      contactsEnriched: enrichedContacts.length,
      emailsGuessed,
      emailsVerified,
      duration,
    },
  };
}

// ─── Helpers ───

function deduplicateByName(contacts: ScrapedContact[]): ScrapedContact[] {
  const seen = new Map<string, ScrapedContact>();

  for (const contact of contacts) {
    const key = contact.fullName.toLowerCase().trim();
    if (!key || key.length < 3) continue;

    const existing = seen.get(key);
    if (!existing) {
      seen.set(key, contact);
    } else {
      // Fusionner les données
      seen.set(key, {
        ...existing,
        email: existing.email || contact.email,
        phone: existing.phone || contact.phone,
        jobTitle: existing.jobTitle || contact.jobTitle,
        linkedin: existing.linkedin || contact.linkedin,
        firstName: existing.firstName || contact.firstName,
        lastName: existing.lastName || contact.lastName,
      });
    }
  }

  return Array.from(seen.values());
}
