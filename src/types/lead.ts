// Types centraux pour le système de génération de leads

export interface Lead {
  id?: string;
  company: string;
  website: string;
  emails: string[];
  phone?: string;
  address?: string;
  sector: string;
  city?: string;
  country?: string;
  socialProfiles: SocialProfiles;
  score: number; // 0-100, qualité du lead
  source: LeadSource;
  createdAt?: Date;
}

export interface SocialProfiles {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export type LeadSource = "google" | "bing" | "directory" | "manual";

export interface SearchQuery {
  keywords: string; // ex: "agence immobilière"
  city?: string; // ex: "Paris"
  country?: string; // ex: "France"
  maxResults?: number; // défaut: 20
}

export interface ScrapedPage {
  url: string;
  title: string;
  description: string;
  emails: string[];
  phones: string[];
  socialLinks: SocialProfiles;
}

export interface EmailVerification {
  email: string;
  isValid: boolean;
  mxRecords: boolean;
  reason?: string;
}

export interface ProspectionEmail {
  to: string;
  subject: string;
  body: string;
  tone: "formal" | "casual" | "friendly";
}

// ─── CONTACTS INDIVIDUELS ───────────────────

export interface Contact {
  id?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email?: string;
  emailGuesses: EmailGuess[]; // Emails devinés via patterns
  phone?: string;
  mobile?: string;
  jobTitle?: string;
  company?: string;
  companyWebsite?: string;
  linkedin?: string;
  twitter?: string;
  city?: string;
  country?: string;
  source: ContactSource;
  score: number; // 0-100
  createdAt?: Date;
}

export interface EmailGuess {
  email: string;
  pattern: string; // ex: "prenom.nom@domaine.fr"
  confidence: number; // 0-100, probabilité que ce soit le bon
  verified?: boolean;
}

export type ContactSource =
  | "team_page" // Page "Équipe" / "About" d'un site
  | "directory" // Annuaire pro (Pages Jaunes, Societe.com)
  | "linkedin_public" // Page LinkedIn publique
  | "whois" // Données WHOIS du domaine
  | "mentions_legales" // Mentions légales du site
  | "google" // Résultats Google
  | "manual";

export interface ContactSearchQuery {
  keywords: string; // ex: "directeur commercial"
  sector?: string; // ex: "immobilier"
  city?: string;
  country?: string;
  maxResults?: number;
}

export interface ScrapedContact {
  fullName: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  source: ContactSource;
}
