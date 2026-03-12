/**
 * SCRAPER DE CONTACTS INDIVIDUELS
 *
 * Extrait des personnes (nom, prénom, email, téléphone, poste)
 * depuis différentes sources publiques :
 *
 * 1. Pages "Équipe" / "About" des sites d'entreprise
 * 2. Résultats Google (recherche ciblée de profils)
 * 3. Annuaires professionnels
 * 4. Mentions légales (gérant, directeur)
 * 5. Données structurées (schema.org Person)
 */

import * as cheerio from "cheerio";
import type {
  Contact,
  ContactSearchQuery,
  ScrapedContact,
  ContactSource,
} from "@/types/lead";
import { guessEmails } from "./email-guesser";
import { verifyEmails } from "./email-verifier";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const FETCH_TIMEOUT = 10_000;

// ─── Prénoms français courants (pour détecter les noms dans le texte) ───
const FRENCH_FIRST_NAMES = new Set([
  "jean", "pierre", "marie", "michel", "philippe", "alain", "nicolas", "patrick",
  "jacques", "christophe", "laurent", "thomas", "david", "stéphane", "daniel",
  "julien", "eric", "sophie", "nathalie", "isabelle", "catherine", "christine",
  "sylvie", "sandrine", "valérie", "céline", "aurélie", "julie", "caroline",
  "virginie", "françois", "frédéric", "guillaume", "sébastien", "olivier",
  "alexandre", "maxime", "antoine", "paul", "vincent", "louis", "gabriel",
  "hugo", "lucas", "léa", "emma", "chloé", "camille", "sarah", "clara",
  "manon", "marine", "laura", "marion", "pauline", "charlotte", "anaïs",
  "mathieu", "romain", "florian", "kevin", "jérôme", "arnaud", "benoit",
  "marc", "bruno", "pascal", "gérard", "yves", "dominique", "thierry",
  "bernard", "robert", "andré", "claude", "henri", "charles", "matthieu",
  "baptiste", "adrien", "clément", "quentin", "benjamin", "anthony", "raphaël",
  "elodie", "mélanie", "emilie", "alexandra", "jessica", "audrey", "lucie",
  "margaux", "amandine", "justine", "morgane", "mathilde", "océane", "agathe",
]);

// ─── Titres de postes courants ───
const JOB_TITLE_PATTERNS = [
  // Direction
  /(?:PDG|CEO|Président|Directeur|Directrice|Gérant|Gérante|Fondateur|Fondatrice|Co-?fondateur|Co-?fondatrice)/i,
  /(?:Chief\s+\w+\s+Officer|CTO|CFO|COO|CMO|CDO)/i,
  /(?:Directeur|Directrice)\s+(?:Général|Commerci|Techniqu|Market|Financ|Artistiqu)/i,
  // Management
  /(?:Responsable|Manager|Head\s+of|VP|Vice-?Président)/i,
  /(?:Chef\s+de\s+(?:projet|service|département))/i,
  // Ventes / Marketing
  /(?:Commercial|Chargé\s+(?:d'affaires|de\s+clientèle|de\s+communication))/i,
  /(?:Consultant|Expert|Ingénieur|Développeur|Designer)/i,
  // Juridique / Finance
  /(?:Avocat|Notaire|Expert-?comptable|Comptable|Juriste)/i,
  // Immobilier
  /(?:Agent\s+immobilier|Négociateur|Conseiller)/i,
];

// ═══════════════════════════════════════════
// RECHERCHE DE CONTACTS VIA GOOGLE
// ═══════════════════════════════════════════

/**
 * Recherche des contacts individuels via Google
 */
export async function searchContacts(
  query: ContactSearchQuery
): Promise<string[]> {
  // Construire des requêtes Google ciblées
  const queries = buildContactSearchQueries(query);
  const allUrls: string[] = [];

  for (const searchQuery of queries) {
    try {
      const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&num=10&hl=fr`;

      const response = await fetch(url, {
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html",
          "Accept-Language": "fr-FR,fr;q=0.9",
        },
        signal: AbortSignal.timeout(FETCH_TIMEOUT),
      });

      if (!response.ok) continue;

      const html = await response.text();
      const $ = cheerio.load(html);

      $("div.g a[href]").each((_, el) => {
        const href = $(el).attr("href");
        if (href && href.startsWith("http") && !href.includes("google.com")) {
          allUrls.push(href);
        }
      });
    } catch {
      // Continue avec la prochaine requête
    }
  }

  return [...new Set(allUrls)];
}

/**
 * Construit des requêtes Google optimisées pour trouver des contacts
 */
function buildContactSearchQueries(query: ContactSearchQuery): string[] {
  const base = [query.keywords, query.sector, query.city].filter(Boolean).join(" ");

  return [
    // Recherche directe de personnes
    `"${query.keywords}" ${query.city || ""} email contact`,
    // Pages équipe
    `${base} site:linkedin.com/in`,
    // Annuaires
    `${base} "téléphone" "email"`,
    // Pages équipe d'entreprises
    `${query.sector || query.keywords} ${query.city || ""} "notre équipe" OR "l'équipe" OR "about us"`,
    // Mentions légales (souvent le nom du gérant)
    `${query.sector || query.keywords} ${query.city || ""} "mentions légales" "gérant" OR "président"`,
  ];
}

// ═══════════════════════════════════════════
// EXTRACTION DE CONTACTS DEPUIS LES PAGES WEB
// ═══════════════════════════════════════════

/**
 * Visite une page et extrait tous les contacts trouvés
 */
export async function scrapeContactsFromPage(
  url: string,
  source: ContactSource = "team_page"
): Promise<ScrapedContact[]> {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
    });

    if (!response.ok) return [];
    const html = await response.text();
    const $ = cheerio.load(html);

    const contacts: ScrapedContact[] = [];

    // Méthode 1 : Données structurées schema.org Person
    contacts.push(...extractSchemaPersons($, source));

    // Méthode 2 : Cartes de membres d'équipe (pattern HTML courant)
    contacts.push(...extractTeamCards($, source));

    // Méthode 3 : Mentions légales — chercher le gérant/président
    contacts.push(...extractFromLegalMentions($, source));

    // Méthode 4 : Pattern "Prénom NOM — Poste" dans le texte
    contacts.push(...extractFromTextPatterns($, source));

    // Méthode 5 : VCards / hCards
    contacts.push(...extractFromVCards($, source));

    // Dédupliquer par nom
    return deduplicateContacts(contacts);
  } catch {
    return [];
  }
}

/**
 * Scrape les pages "Équipe" / "About" d'un site
 */
export async function scrapeTeamPages(baseUrl: string): Promise<ScrapedContact[]> {
  const teamPaths = [
    "/equipe",
    "/notre-equipe",
    "/l-equipe",
    "/team",
    "/our-team",
    "/about",
    "/about-us",
    "/a-propos",
    "/qui-sommes-nous",
    "/mentions-legales",
    "/legal",
  ];

  const origin = new URL(baseUrl).origin;
  const allContacts: ScrapedContact[] = [];

  for (const path of teamPaths) {
    try {
      const contacts = await scrapeContactsFromPage(
        origin + path,
        path.includes("legal") || path.includes("mentions") ? "mentions_legales" : "team_page"
      );
      allContacts.push(...contacts);
    } catch {
      // Page n'existe pas, on continue
    }
  }

  return deduplicateContacts(allContacts);
}

// ═══════════════════════════════════════════
// MÉTHODES D'EXTRACTION
// ═══════════════════════════════════════════

/**
 * Méthode 1 : schema.org Person (données structurées JSON-LD)
 */
function extractSchemaPersons(
  $: cheerio.CheerioAPI,
  source: ContactSource
): ScrapedContact[] {
  const contacts: ScrapedContact[] = [];

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).html() || "");
      const persons = Array.isArray(data) ? data : data["@graph"] || [data];

      for (const item of persons) {
        if (item["@type"] === "Person" && item.name) {
          const { firstName, lastName } = splitName(item.name);
          contacts.push({
            fullName: item.name,
            firstName,
            lastName,
            jobTitle: item.jobTitle,
            email: item.email,
            phone: item.telephone,
            linkedin: extractLinkedInFromUrls(item.sameAs || []),
            source,
          });
        }
      }
    } catch {
      // JSON invalide
    }
  });

  return contacts;
}

/**
 * Méthode 2 : Cartes d'équipe (divs avec image + nom + poste)
 */
function extractTeamCards(
  $: cheerio.CheerioAPI,
  source: ContactSource
): ScrapedContact[] {
  const contacts: ScrapedContact[] = [];

  // Patterns courants pour les cartes d'équipe
  const cardSelectors = [
    ".team-member",
    ".member",
    ".team-card",
    ".staff-member",
    ".person",
    ".equipe-member",
    '[class*="team"] [class*="card"]',
    '[class*="team"] [class*="member"]',
    '[class*="equipe"] [class*="member"]',
    ".elementor-team-member",
    ".wp-block-team-member",
  ];

  for (const selector of cardSelectors) {
    $(selector).each((_, card) => {
      const name =
        $(card).find("h2, h3, h4, .name, .member-name, [class*='name']").first().text().trim();
      const title =
        $(card).find(".title, .position, .job-title, .role, [class*='title'], [class*='position']").first().text().trim();
      const email =
        $(card).find('a[href^="mailto:"]').attr("href")?.replace("mailto:", "").trim();
      const phone =
        $(card).find('a[href^="tel:"]').attr("href")?.replace("tel:", "").trim();
      const linkedin =
        $(card).find('a[href*="linkedin.com"]').attr("href");

      if (name && name.length > 3 && name.length < 60 && looksLikeName(name)) {
        const { firstName, lastName } = splitName(name);
        contacts.push({
          fullName: name,
          firstName,
          lastName,
          jobTitle: title || undefined,
          email: email || undefined,
          phone: phone || undefined,
          linkedin: linkedin || undefined,
          source,
        });
      }
    });
  }

  return contacts;
}

/**
 * Méthode 3 : Mentions légales (gérant, président, directeur de publication)
 */
function extractFromLegalMentions(
  $: cheerio.CheerioAPI,
  source: ContactSource
): ScrapedContact[] {
  const contacts: ScrapedContact[] = [];
  const text = $("body").text();

  // Patterns courants dans les mentions légales françaises
  const patterns = [
    /(?:Gérant|Gérante|Président|Présidente|Directeur de (?:la )?publication|Responsable de publication)\s*[:\-–]\s*(?:M(?:me|lle|r)?\.?\s+)?([A-ZÀ-Ü][a-zà-ü]+(?:\s+[A-ZÀ-Ü][a-zà-ü]+){1,3})/g,
    /(?:Représentant légal|Dirigeant)\s*[:\-–]\s*(?:M(?:me|lle|r)?\.?\s+)?([A-ZÀ-Ü][a-zà-ü]+(?:\s+[A-ZÀ-Ü][a-zà-ü]+){1,3})/g,
    /(?:édité par|publié par)\s+(?:la société\s+)?[^,]+,\s+(?:dont le |)(?:gérant|président|directeur)\s+(?:est\s+)?(?:M(?:me|lle|r)?\.?\s+)?([A-ZÀ-Ü][a-zà-ü]+(?:\s+[A-ZÀ-Ü][a-zà-ü]+){1,3})/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const name = match[1].trim();
      if (name && looksLikeName(name)) {
        const { firstName, lastName } = splitName(name);
        contacts.push({
          fullName: name,
          firstName,
          lastName,
          jobTitle: match[0].split(/[:\-–]/)[0].trim(),
          source: "mentions_legales",
        });
      }
    }
  }

  return contacts;
}

/**
 * Méthode 4 : Patterns textuels "Prénom NOM — Titre"
 */
function extractFromTextPatterns(
  $: cheerio.CheerioAPI,
  source: ContactSource
): ScrapedContact[] {
  const contacts: ScrapedContact[] = [];

  // Chercher des patterns comme "Jean DUPONT - Directeur Commercial"
  // ou "Jean Dupont, CEO"
  const text = $("body").text();

  // Pattern : Prénom NOM (tout en majuscules) + séparateur + titre de poste
  const nameJobPattern =
    /([A-ZÀ-Ü][a-zà-ü]+)\s+([A-ZÀ-Ü]{2,}(?:\s+[A-ZÀ-Ü]{2,})?)\s*[,\-–—|]\s*([^\n,]{5,50})/g;

  let match;
  while ((match = nameJobPattern.exec(text)) !== null) {
    const firstName = match[1];
    const lastName = match[2];
    const jobTitle = match[3].trim();

    // Vérifier que le prénom est plausible
    if (FRENCH_FIRST_NAMES.has(firstName.toLowerCase()) && isJobTitle(jobTitle)) {
      contacts.push({
        fullName: `${firstName} ${lastName}`,
        firstName,
        lastName: capitalizeFirst(lastName),
        jobTitle,
        source,
      });
    }
  }

  return contacts;
}

/**
 * Méthode 5 : vCards / hCards (microformats)
 */
function extractFromVCards(
  $: cheerio.CheerioAPI,
  source: ContactSource
): ScrapedContact[] {
  const contacts: ScrapedContact[] = [];

  $(".vcard, .h-card").each((_, card) => {
    const name =
      $(card).find(".fn, .p-name").first().text().trim();
    const title =
      $(card).find(".title, .p-job-title, .role").first().text().trim();
    const email =
      $(card).find(".email, .u-email").first().text().trim() ||
      $(card).find('a[href^="mailto:"]').attr("href")?.replace("mailto:", "");
    const phone =
      $(card).find(".tel, .p-tel").first().text().trim() ||
      $(card).find('a[href^="tel:"]').attr("href")?.replace("tel:", "");

    if (name && looksLikeName(name)) {
      const { firstName, lastName } = splitName(name);
      contacts.push({
        fullName: name,
        firstName,
        lastName,
        jobTitle: title || undefined,
        email: email || undefined,
        phone: phone || undefined,
        source,
      });
    }
  });

  return contacts;
}

// ═══════════════════════════════════════════
// CONVERSION : ScrapedContact → Contact enrichi
// ═══════════════════════════════════════════

/**
 * Transforme un contact brut en contact enrichi avec emails devinés
 */
export async function enrichContact(
  scraped: ScrapedContact,
  companyDomain?: string
): Promise<Contact> {
  // Deviner les emails si on a le domaine de l'entreprise
  let emailGuesses = companyDomain
    ? guessEmails(scraped.firstName || "", scraped.lastName || "", companyDomain)
    : [];

  // Vérifier les emails devinés
  if (emailGuesses.length > 0) {
    const verifications = await verifyEmails(emailGuesses.map((g) => g.email));
    emailGuesses = emailGuesses.map((guess, i) => ({
      ...guess,
      verified: verifications[i]?.isValid || false,
      // Augmenter la confiance si l'email est vérifié
      confidence: verifications[i]?.isValid
        ? Math.min(100, guess.confidence + 30)
        : guess.confidence,
    }));
  }

  // Calculer le score du contact
  const score = scoreContact(scraped, emailGuesses);

  return {
    firstName: scraped.firstName || "",
    lastName: scraped.lastName || "",
    fullName: scraped.fullName,
    email: scraped.email || emailGuesses.find((g) => g.verified)?.email,
    emailGuesses,
    phone: scraped.phone,
    jobTitle: scraped.jobTitle,
    linkedin: scraped.linkedin,
    source: scraped.source,
    score,
  };
}

/**
 * Score un contact de 0 à 100
 */
function scoreContact(
  contact: ScrapedContact,
  emailGuesses: { verified?: boolean; confidence: number }[]
): number {
  let score = 20; // Base

  // Nom complet (prénom + nom) = +10
  if (contact.firstName && contact.lastName) score += 10;

  // Email direct trouvé = +30
  if (contact.email) score += 30;

  // Email deviné et vérifié = +25
  if (emailGuesses.some((g) => g.verified)) score += 25;

  // Téléphone = +15
  if (contact.phone) score += 15;

  // Titre de poste = +10
  if (contact.jobTitle) score += 10;

  // LinkedIn = +10
  if (contact.linkedin) score += 10;

  // Poste de décideur = +10
  if (
    contact.jobTitle &&
    /CEO|CTO|PDG|Directeur|Gérant|Fondateur|Président/i.test(contact.jobTitle)
  ) {
    score += 10;
  }

  return Math.min(100, score);
}

// ═══════════════════════════════════════════
// UTILITAIRES
// ═══════════════════════════════════════════

/**
 * Sépare "Jean Dupont" en { firstName: "Jean", lastName: "Dupont" }
 */
function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  if (parts.length === 2) return { firstName: parts[0], lastName: parts[1] };

  // Si 3+ mots, le premier est le prénom, le reste est le nom
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/**
 * Vérifie si un texte ressemble à un nom de personne
 */
function looksLikeName(text: string): boolean {
  const words = text.trim().split(/\s+/);
  if (words.length < 2 || words.length > 4) return false;

  // Au moins un mot doit commencer par une majuscule
  const hasCapital = words.some((w) => /^[A-ZÀ-Ü]/.test(w));
  if (!hasCapital) return false;

  // Ne doit pas contenir de chiffres ou caractères spéciaux (sauf tirets/accents)
  if (/[0-9@#$%^&*()=+\[\]{}|<>]/.test(text)) return false;

  // Vérifier si un des mots est un prénom connu
  const hasKnownFirstName = words.some((w) =>
    FRENCH_FIRST_NAMES.has(w.toLowerCase())
  );

  return hasKnownFirstName || words.length >= 2;
}

/**
 * Vérifie si un texte ressemble à un titre de poste
 */
function isJobTitle(text: string): boolean {
  return JOB_TITLE_PATTERNS.some((pattern) => pattern.test(text));
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function extractLinkedInFromUrls(urls: string | string[]): string | undefined {
  const urlArray = Array.isArray(urls) ? urls : [urls];
  return urlArray.find((u) => typeof u === "string" && u.includes("linkedin.com"));
}

function deduplicateContacts(contacts: ScrapedContact[]): ScrapedContact[] {
  const seen = new Map<string, ScrapedContact>();
  for (const contact of contacts) {
    const key = contact.fullName.toLowerCase();
    const existing = seen.get(key);
    if (!existing) {
      seen.set(key, contact);
    } else {
      // Fusionner les infos
      seen.set(key, {
        ...existing,
        email: existing.email || contact.email,
        phone: existing.phone || contact.phone,
        jobTitle: existing.jobTitle || contact.jobTitle,
        linkedin: existing.linkedin || contact.linkedin,
      });
    }
  }
  return Array.from(seen.values());
}
