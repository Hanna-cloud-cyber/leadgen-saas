/**
 * PIPELINE DE GÉNÉRATION DE LEADS
 *
 * C'est LE chef d'orchestre. Il enchaîne toutes les étapes :
 *
 * 1. Recherche Google → liste de sites
 * 2. Scraping des sites → emails, téléphones, réseaux sociaux
 * 3. Scraping des pages Contact → plus d'infos
 * 4. Vérification des emails → emails valides
 * 5. Enrichissement → leads scorés et qualifiés
 * 6. (Optionnel) Génération d'emails de prospection IA
 */

import { searchGoogle, scrapePage, scrapeContactPage } from "./scraper";
import { verifyEmails } from "./email-verifier";
import { pageToLead, enrichLead } from "./enricher";
import { generateProspectionEmail } from "./email-generator";
import type { Lead, SearchQuery, ProspectionEmail } from "@/types/lead";

export interface PipelineOptions {
  query: SearchQuery;
  verifyEmails?: boolean; // défaut: true
  enrichLeads?: boolean; // défaut: true
  generateEmails?: boolean; // défaut: false
  emailOptions?: {
    senderName: string;
    senderCompany: string;
    senderOffer: string;
    tone: "formal" | "casual" | "friendly";
  };
  onProgress?: (step: PipelineStep) => void; // callback de progression
}

export interface PipelineStep {
  stage:
    | "searching"
    | "scraping"
    | "verifying"
    | "enriching"
    | "generating_emails"
    | "done";
  current: number;
  total: number;
  message: string;
}

export interface PipelineResult {
  leads: Lead[];
  emails?: { lead: Lead; email: ProspectionEmail }[];
  stats: {
    sitesFound: number;
    sitesScraped: number;
    emailsFound: number;
    emailsValid: number;
    leadsGenerated: number;
    duration: number; // en ms
  };
}

/**
 * Lance le pipeline complet de génération de leads
 */
export async function runPipeline(
  options: PipelineOptions
): Promise<PipelineResult> {
  const startTime = Date.now();
  const {
    query,
    verifyEmails: shouldVerify = true,
    enrichLeads: shouldEnrich = true,
    generateEmails: shouldGenerate = false,
    onProgress,
  } = options;

  const progress = (step: PipelineStep) => onProgress?.(step);

  // ─── ÉTAPE 1 : Recherche Google ───
  progress({
    stage: "searching",
    current: 0,
    total: 1,
    message: `Recherche "${query.keywords}" ${query.city ? `à ${query.city}` : ""}...`,
  });

  const searchResults = await searchGoogle(query);

  progress({
    stage: "searching",
    current: 1,
    total: 1,
    message: `${searchResults.length} sites trouvés`,
  });

  // ─── ÉTAPE 2 : Scraping des sites ───
  const leads: Lead[] = [];
  let totalEmailsFound = 0;

  for (let i = 0; i < searchResults.length; i++) {
    const result = searchResults[i];

    progress({
      stage: "scraping",
      current: i + 1,
      total: searchResults.length,
      message: `Scraping ${new URL(result.url).hostname}...`,
    });

    try {
      // Scraper la page principale
      const mainPage = await scrapePage(result.url);

      // Scraper aussi la page Contact pour trouver plus d'emails
      const contactPage = await scrapeContactPage(result.url);

      // Combiner les résultats
      const combinedEmails = [
        ...mainPage.emails,
        ...(contactPage?.emails || []),
      ];
      const combinedPhones = [
        ...mainPage.phones,
        ...(contactPage?.phones || []),
      ];

      const mergedPage = {
        ...mainPage,
        emails: [...new Set(combinedEmails)],
        phones: [...new Set(combinedPhones)],
        socialLinks: {
          ...mainPage.socialLinks,
          ...(contactPage?.socialLinks || {}),
        },
      };

      totalEmailsFound += mergedPage.emails.length;

      // Transformer en lead
      const lead = pageToLead(mergedPage, {
        sector: query.keywords,
        city: query.city,
      });

      // On ne garde que les leads avec au moins un email ou téléphone
      if (lead.emails.length > 0 || lead.phone) {
        leads.push(lead);
      }
    } catch {
      // Site inaccessible, on passe au suivant
    }
  }

  // ─── ÉTAPE 3 : Vérification des emails ───
  let validEmailCount = totalEmailsFound;

  if (shouldVerify && leads.length > 0) {
    const allEmails = leads.flatMap((l) => l.emails);

    progress({
      stage: "verifying",
      current: 0,
      total: allEmails.length,
      message: `Vérification de ${allEmails.length} emails...`,
    });

    const verifications = await verifyEmails(allEmails);

    // Créer un Set des emails valides
    const validEmails = new Set(
      verifications.filter((v) => v.isValid).map((v) => v.email)
    );
    validEmailCount = validEmails.size;

    // Filtrer les emails invalides dans chaque lead
    for (const lead of leads) {
      lead.emails = lead.emails.filter((e) => validEmails.has(e));
    }

    progress({
      stage: "verifying",
      current: allEmails.length,
      total: allEmails.length,
      message: `${validEmailCount}/${allEmails.length} emails valides`,
    });
  }

  // ─── ÉTAPE 4 : Enrichissement ───
  if (shouldEnrich) {
    for (let i = 0; i < leads.length; i++) {
      progress({
        stage: "enriching",
        current: i + 1,
        total: leads.length,
        message: `Enrichissement de ${leads[i].company}...`,
      });

      leads[i] = await enrichLead(leads[i]);
    }
  }

  // ─── ÉTAPE 5 : Génération d'emails IA (optionnel) ───
  let generatedEmails: { lead: Lead; email: ProspectionEmail }[] | undefined;

  if (shouldGenerate && options.emailOptions) {
    generatedEmails = [];
    const leadsWithEmails = leads.filter((l) => l.emails.length > 0);

    for (let i = 0; i < leadsWithEmails.length; i++) {
      progress({
        stage: "generating_emails",
        current: i + 1,
        total: leadsWithEmails.length,
        message: `Génération email pour ${leadsWithEmails[i].company}...`,
      });

      try {
        const email = await generateProspectionEmail({
          lead: leadsWithEmails[i],
          ...options.emailOptions,
        });
        generatedEmails.push({ lead: leadsWithEmails[i], email });
      } catch {
        // Erreur IA, on skip
      }
    }
  }

  // Trier les leads par score décroissant
  leads.sort((a, b) => b.score - a.score);

  const duration = Date.now() - startTime;

  progress({
    stage: "done",
    current: 1,
    total: 1,
    message: `Terminé ! ${leads.length} leads générés en ${Math.round(duration / 1000)}s`,
  });

  return {
    leads,
    emails: generatedEmails,
    stats: {
      sitesFound: searchResults.length,
      sitesScraped: searchResults.length,
      emailsFound: totalEmailsFound,
      emailsValid: validEmailCount,
      leadsGenerated: leads.length,
      duration,
    },
  };
}
