/**
 * GÉNÉRATEUR DE PATTERNS D'EMAILS
 *
 * Quand on connaît le nom d'une personne et le domaine de son entreprise,
 * on peut deviner son email avec des patterns courants.
 *
 * Ex: Jean Dupont @ acme.fr →
 *   - jean.dupont@acme.fr (le plus courant en France)
 *   - j.dupont@acme.fr
 *   - jdupont@acme.fr
 *   - jean@acme.fr
 *   - dupont@acme.fr
 *   etc.
 */

import type { EmailGuess } from "@/types/lead";

/**
 * Fréquence des patterns d'emails en entreprise (données approximatives)
 * Plus la confiance est haute, plus ce pattern est courant
 */
const EMAIL_PATTERNS: { pattern: string; confidence: number; build: (f: string, l: string, d: string) => string }[] = [
  {
    pattern: "prenom.nom@domaine",
    confidence: 55,
    build: (f, l, d) => `${f}.${l}@${d}`,
  },
  {
    pattern: "pnom@domaine",
    confidence: 20,
    build: (f, l, d) => `${f[0]}${l}@${d}`,
  },
  {
    pattern: "prenom@domaine",
    confidence: 15,
    build: (f, l, d) => `${f}@${d}`,
  },
  {
    pattern: "prenomnom@domaine",
    confidence: 15,
    build: (f, l, d) => `${f}${l}@${d}`,
  },
  {
    pattern: "nom.prenom@domaine",
    confidence: 12,
    build: (f, l, d) => `${l}.${f}@${d}`,
  },
  {
    pattern: "p.nom@domaine",
    confidence: 12,
    build: (f, l, d) => `${f[0]}.${l}@${d}`,
  },
  {
    pattern: "nom@domaine",
    confidence: 10,
    build: (f, l, d) => `${l}@${d}`,
  },
  {
    pattern: "prenom-nom@domaine",
    confidence: 8,
    build: (f, l, d) => `${f}-${l}@${d}`,
  },
  {
    pattern: "prenom_nom@domaine",
    confidence: 5,
    build: (f, l, d) => `${f}_${l}@${d}`,
  },
  {
    pattern: "pn@domaine",
    confidence: 3,
    build: (f, l, d) => `${f[0]}${l[0]}@${d}`,
  },
];

/**
 * Génère toutes les combinaisons d'emails possibles pour une personne
 */
export function guessEmails(
  firstName: string,
  lastName: string,
  domain: string
): EmailGuess[] {
  if (!firstName || !lastName || !domain) return [];

  // Normaliser (minuscules, sans accents)
  const f = normalize(firstName);
  const l = normalize(lastName);
  const d = domain.toLowerCase().replace(/^www\./, "");

  if (!f || !l) return [];

  const guesses: EmailGuess[] = [];
  const seen = new Set<string>();

  for (const pattern of EMAIL_PATTERNS) {
    try {
      const email = pattern.build(f, l, d);

      // Éviter les doublons
      if (seen.has(email)) continue;
      seen.add(email);

      // Validation basique
      if (isValidEmailFormat(email)) {
        guesses.push({
          email,
          pattern: pattern.pattern,
          confidence: pattern.confidence,
        });
      }
    } catch {
      // Pattern impossible (ex: nom vide)
    }
  }

  return guesses.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Si on connaît le pattern d'une entreprise (ex: un email trouvé),
 * on peut deviner les emails de tous les employés
 */
export function detectEmailPattern(
  knownEmail: string,
  firstName: string,
  lastName: string
): string | null {
  const f = normalize(firstName);
  const l = normalize(lastName);
  const [localPart, domain] = knownEmail.toLowerCase().split("@");

  if (!localPart || !domain || !f || !l) return null;

  // Tester chaque pattern pour voir lequel correspond
  for (const pattern of EMAIL_PATTERNS) {
    const generated = pattern.build(f, l, domain).split("@")[0];
    if (generated === localPart) {
      return pattern.pattern;
    }
  }

  return null;
}

/**
 * Utilise un pattern détecté pour générer un email pour quelqu'un d'autre
 */
export function applyPattern(
  patternName: string,
  firstName: string,
  lastName: string,
  domain: string
): string | null {
  const f = normalize(firstName);
  const l = normalize(lastName);
  const d = domain.toLowerCase().replace(/^www\./, "");

  const pattern = EMAIL_PATTERNS.find((p) => p.pattern === patternName);
  if (!pattern || !f || !l) return null;

  return pattern.build(f, l, d);
}

// ─── Helpers ───────────────────────────

/**
 * Normalise un nom/prénom : minuscules, sans accents, sans espaces
 */
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/[^a-z]/g, ""); // Garder seulement les lettres
}

function isValidEmailFormat(email: string): boolean {
  return /^[a-z0-9][a-z0-9._-]*@[a-z0-9.-]+\.[a-z]{2,}$/.test(email);
}
