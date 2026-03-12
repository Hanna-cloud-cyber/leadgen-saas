/**
 * Point d'entrée du moteur de génération de leads
 * Exporte tous les modules pour un accès simplifié
 */

export { searchGoogle, scrapePage, scrapeContactPage } from "./scraper";
export { verifyEmail, verifyEmails, scoreEmail, isBusinessEmail } from "./email-verifier";
export { pageToLead, enrichLead } from "./enricher";
export { generateProspectionEmail, generateBulkEmails, generateEmailVariations } from "./email-generator";
export { runPipeline } from "./pipeline";
export type { PipelineOptions, PipelineResult, PipelineStep } from "./pipeline";

// Contacts individuels
export { searchContacts, scrapeContactsFromPage, scrapeTeamPages, enrichContact } from "./contact-scraper";
export { guessEmails, detectEmailPattern, applyPattern } from "./email-guesser";
export { runContactPipeline } from "./contact-pipeline";
export type { ContactPipelineOptions, ContactPipelineResult, ContactPipelineStep } from "./contact-pipeline";
