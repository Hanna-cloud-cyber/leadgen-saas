/**
 * Liste des pays supportés par le moteur de leadgen.
 * Utilisé dans la landing page et le formulaire de recherche.
 */

export interface Country {
  code: string;       // ISO 3166-1 alpha-2
  name: string;       // nom EN
  nameLocal: string;  // nom local
  flag: string;       // emoji drapeau
  language: string;   // code ISO langue par défaut (fr, en, de, es)
  googleHl: string;   // paramètre hl Google
  googleTld: string;  // TLD Google search (.fr, .com, ...)
}

export const COUNTRIES: Country[] = [
  { code: "US", name: "United States", nameLocal: "United States", flag: "🇺🇸", language: "en", googleHl: "en", googleTld: "com" },
  { code: "FR", name: "France", nameLocal: "France", flag: "🇫🇷", language: "fr", googleHl: "fr", googleTld: "fr" },
  { code: "GB", name: "United Kingdom", nameLocal: "United Kingdom", flag: "🇬🇧", language: "en", googleHl: "en-GB", googleTld: "co.uk" },
  { code: "CA", name: "Canada", nameLocal: "Canada", flag: "🇨🇦", language: "en", googleHl: "en", googleTld: "ca" },
  { code: "DE", name: "Germany", nameLocal: "Deutschland", flag: "🇩🇪", language: "de", googleHl: "de", googleTld: "de" },
  { code: "ES", name: "Spain", nameLocal: "España", flag: "🇪🇸", language: "es", googleHl: "es", googleTld: "es" },
  { code: "IT", name: "Italy", nameLocal: "Italia", flag: "🇮🇹", language: "it", googleHl: "it", googleTld: "it" },
  { code: "NL", name: "Netherlands", nameLocal: "Nederland", flag: "🇳🇱", language: "nl", googleHl: "nl", googleTld: "nl" },
  { code: "BE", name: "Belgium", nameLocal: "Belgique", flag: "🇧🇪", language: "fr", googleHl: "fr", googleTld: "be" },
  { code: "CH", name: "Switzerland", nameLocal: "Suisse", flag: "🇨🇭", language: "fr", googleHl: "fr", googleTld: "ch" },
  { code: "PT", name: "Portugal", nameLocal: "Portugal", flag: "🇵🇹", language: "pt", googleHl: "pt-PT", googleTld: "pt" },
  { code: "IE", name: "Ireland", nameLocal: "Ireland", flag: "🇮🇪", language: "en", googleHl: "en", googleTld: "ie" },
  { code: "AU", name: "Australia", nameLocal: "Australia", flag: "🇦🇺", language: "en", googleHl: "en", googleTld: "com.au" },
  { code: "MX", name: "Mexico", nameLocal: "México", flag: "🇲🇽", language: "es", googleHl: "es", googleTld: "com.mx" },
];

export function getAllCountries(): Country[] {
  return COUNTRIES;
}

export function getCountry(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code.toUpperCase());
}
