/**
 * VÉRIFICATEUR D'EMAILS
 *
 * Vérifie si un email est valide en 3 étapes :
 * 1. Validation du format (regex)
 * 2. Vérification des enregistrements MX du domaine
 * 3. Score de qualité
 */

import dns from "dns";
import { promisify } from "util";
import type { EmailVerification } from "@/types/lead";

const resolveMx = promisify(dns.resolveMx);

// Domaines jetables connus (liste partielle — en prod, utiliser une liste complète)
const DISPOSABLE_DOMAINS = new Set([
  "tempmail.com",
  "throwaway.email",
  "guerrillamail.com",
  "mailinator.com",
  "yopmail.com",
  "trashmail.com",
  "10minutemail.com",
  "tempail.com",
  "fakeinbox.com",
  "sharklasers.com",
  "guerrillamailblock.com",
  "grr.la",
  "dispostable.com",
]);

// Domaines génériques (souvent pas des emails pro)
const GENERIC_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "aol.com",
  "icloud.com",
  "orange.fr",
  "free.fr",
  "sfr.fr",
  "laposte.net",
  "wanadoo.fr",
]);

/**
 * Vérifie un email complet
 */
export async function verifyEmail(email: string): Promise<EmailVerification> {
  // Étape 1 : Format
  if (!isValidFormat(email)) {
    return { email, isValid: false, mxRecords: false, reason: "Format invalide" };
  }

  const domain = email.split("@")[1].toLowerCase();

  // Étape 2 : Domaine jetable ?
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { email, isValid: false, mxRecords: false, reason: "Email jetable détecté" };
  }

  // Étape 3 : Vérification MX
  const hasMx = await checkMxRecords(domain);
  if (!hasMx) {
    return { email, isValid: false, mxRecords: false, reason: "Domaine sans serveur email (pas de MX)" };
  }

  return { email, isValid: true, mxRecords: true };
}

/**
 * Vérifie une liste d'emails en parallèle
 */
export async function verifyEmails(emails: string[]): Promise<EmailVerification[]> {
  const results = await Promise.allSettled(emails.map((email) => verifyEmail(email)));

  return results.map((result, i) => {
    if (result.status === "fulfilled") return result.value;
    return {
      email: emails[i],
      isValid: false,
      mxRecords: false,
      reason: "Erreur de vérification",
    };
  });
}

/**
 * Donne un score de qualité à l'email (0-100)
 *  - Email pro (domaine entreprise) = meilleur score
 *  - Email générique (gmail, etc.) = score moyen
 *  - Patterns courants (info@, contact@) = score bonus
 */
export function scoreEmail(email: string): number {
  let score = 50; // Score de base

  const [local, domain] = email.toLowerCase().split("@");

  // Email pro = +30 points
  if (!GENERIC_DOMAINS.has(domain)) {
    score += 30;
  }

  // Patterns qui indiquent un décideur = +20
  const decisionMakerPatterns = ["ceo", "cto", "cfo", "founder", "directeur", "gerant", "president"];
  if (decisionMakerPatterns.some((p) => local.includes(p))) {
    score += 20;
  }

  // Prénom.nom = probablement une vraie personne = +15
  if (/^[a-z]+\.[a-z]+$/.test(local)) {
    score += 15;
  }

  // Emails génériques (info@, contact@) = -10
  const genericPrefixes = ["info", "contact", "admin", "support", "hello", "bonjour"];
  if (genericPrefixes.includes(local)) {
    score -= 10;
  }

  return Math.max(0, Math.min(100, score));
}

// ─── Helpers ───────────────────────────

function isValidFormat(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email) && email.length < 254;
}

async function checkMxRecords(domain: string): Promise<boolean> {
  try {
    const records = await resolveMx(domain);
    return records.length > 0;
  } catch {
    return false;
  }
}

/**
 * Indique si c'est un email professionnel (pas gmail/yahoo/etc.)
 */
export function isBusinessEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return !!domain && !GENERIC_DOMAINS.has(domain);
}
