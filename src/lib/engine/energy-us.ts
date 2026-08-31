/**
 * MODULE VERTICAL — ÉNERGIE US (B2B)
 *
 * Génère des leads B2B dans le secteur de l'énergie aux États-Unis :
 *   - Construction de requêtes Google ciblées par sous-secteur × état
 *   - Sources publiques sectorielles (annuaires d'associations professionnelles)
 *   - Scoring boosté par signaux sectoriels (NAICS, mots-clés métier)
 *
 * IMPORTANT — usage strictement B2B :
 *   - on cible des entreprises (sites pros, annuaires d'associations)
 *   - on n'agrège pas de contacts B2C / particuliers
 *   - on respecte robots.txt et les CGU des annuaires
 */

import type { Lead } from "@/types/lead";

// ─── États US ─────────────────────────────────────────────

export interface UsState {
  code: string; // "CA"
  name: string; // "California"
  region: "Northeast" | "Midwest" | "South" | "West";
}

export const US_STATES: UsState[] = [
  { code: "AL", name: "Alabama", region: "South" },
  { code: "AK", name: "Alaska", region: "West" },
  { code: "AZ", name: "Arizona", region: "West" },
  { code: "AR", name: "Arkansas", region: "South" },
  { code: "CA", name: "California", region: "West" },
  { code: "CO", name: "Colorado", region: "West" },
  { code: "CT", name: "Connecticut", region: "Northeast" },
  { code: "DE", name: "Delaware", region: "South" },
  { code: "FL", name: "Florida", region: "South" },
  { code: "GA", name: "Georgia", region: "South" },
  { code: "HI", name: "Hawaii", region: "West" },
  { code: "ID", name: "Idaho", region: "West" },
  { code: "IL", name: "Illinois", region: "Midwest" },
  { code: "IN", name: "Indiana", region: "Midwest" },
  { code: "IA", name: "Iowa", region: "Midwest" },
  { code: "KS", name: "Kansas", region: "Midwest" },
  { code: "KY", name: "Kentucky", region: "South" },
  { code: "LA", name: "Louisiana", region: "South" },
  { code: "ME", name: "Maine", region: "Northeast" },
  { code: "MD", name: "Maryland", region: "South" },
  { code: "MA", name: "Massachusetts", region: "Northeast" },
  { code: "MI", name: "Michigan", region: "Midwest" },
  { code: "MN", name: "Minnesota", region: "Midwest" },
  { code: "MS", name: "Mississippi", region: "South" },
  { code: "MO", name: "Missouri", region: "Midwest" },
  { code: "MT", name: "Montana", region: "West" },
  { code: "NE", name: "Nebraska", region: "Midwest" },
  { code: "NV", name: "Nevada", region: "West" },
  { code: "NH", name: "New Hampshire", region: "Northeast" },
  { code: "NJ", name: "New Jersey", region: "Northeast" },
  { code: "NM", name: "New Mexico", region: "West" },
  { code: "NY", name: "New York", region: "Northeast" },
  { code: "NC", name: "North Carolina", region: "South" },
  { code: "ND", name: "North Dakota", region: "Midwest" },
  { code: "OH", name: "Ohio", region: "Midwest" },
  { code: "OK", name: "Oklahoma", region: "South" },
  { code: "OR", name: "Oregon", region: "West" },
  { code: "PA", name: "Pennsylvania", region: "Northeast" },
  { code: "RI", name: "Rhode Island", region: "Northeast" },
  { code: "SC", name: "South Carolina", region: "South" },
  { code: "SD", name: "South Dakota", region: "Midwest" },
  { code: "TN", name: "Tennessee", region: "South" },
  { code: "TX", name: "Texas", region: "South" },
  { code: "UT", name: "Utah", region: "West" },
  { code: "VT", name: "Vermont", region: "Northeast" },
  { code: "VA", name: "Virginia", region: "South" },
  { code: "WA", name: "Washington", region: "West" },
  { code: "WV", name: "West Virginia", region: "South" },
  { code: "WI", name: "Wisconsin", region: "Midwest" },
  { code: "WY", name: "Wyoming", region: "West" },
  { code: "DC", name: "District of Columbia", region: "South" },
];

export function getUsState(code: string): UsState | undefined {
  return US_STATES.find((s) => s.code === code.toUpperCase());
}

// ─── Sous-secteurs énergie US ────────────────────────────

export interface EnergySubSector {
  id: string;
  name: string;
  icon: string;
  // codes NAICS qui qualifient le secteur (utilisé pour scoring)
  naics: string[];
  // mots-clés positifs détectés sur les sites (boost de score)
  signals: string[];
  // requêtes Google pré-construites (sans état — ajouté dynamiquement)
  queries: string[];
  // annuaires publics B2B utiles (pages listant des entreprises pros)
  directories?: string[];
  description: string;
}

export const ENERGY_US_SUBSECTORS: EnergySubSector[] = [
  {
    id: "solar_residential",
    name: "Residential Solar Installer",
    icon: "☀️",
    naics: ["238220", "237130"],
    signals: [
      "solar installation",
      "rooftop solar",
      "PV system",
      "NABCEP",
      "net metering",
      "ITC",
      "residential solar",
      "solar financing",
    ],
    queries: [
      "residential solar installer",
      "rooftop solar company",
      "home solar installation",
      "solar panel contractor",
      "NABCEP certified solar installer",
    ],
    directories: [
      "https://www.energysage.com/solar/installers/",
      "https://www.solarpowerworldonline.com/top-solar-contractors/",
    ],
    description:
      "Sociétés d'installation de panneaux solaires résidentiels (homeowners).",
  },
  {
    id: "solar_commercial",
    name: "Commercial / C&I Solar EPC",
    icon: "🏢",
    naics: ["238220", "237130", "221114"],
    signals: [
      "commercial solar",
      "C&I solar",
      "solar EPC",
      "PPA",
      "engineering procurement construction",
      "commercial photovoltaic",
      "industrial solar",
    ],
    queries: [
      "commercial solar EPC",
      "C&I solar contractor",
      "industrial solar installer",
      "commercial photovoltaic contractor",
    ],
    directories: [
      "https://www.solarpowerworldonline.com/top-solar-contractors/",
    ],
    description:
      "EPC (Engineering / Procurement / Construction) solaire pour entreprises et collectivités.",
  },
  {
    id: "solar_utility",
    name: "Utility-Scale Solar Developer",
    icon: "🌅",
    naics: ["221114", "237130"],
    signals: [
      "utility-scale solar",
      "solar farm",
      "solar developer",
      "MWdc",
      "interconnection",
      "PPA",
      "IPP",
    ],
    queries: [
      "utility-scale solar developer",
      "solar farm developer",
      "independent power producer solar",
      "solar IPP",
    ],
    description: "Développeurs / IPP solaires utility-scale (>5 MW).",
  },
  {
    id: "wind",
    name: "Wind Energy",
    icon: "💨",
    naics: ["221115", "237130"],
    signals: [
      "wind farm",
      "wind energy",
      "onshore wind",
      "offshore wind",
      "turbine",
      "BOP balance of plant",
      "wind developer",
    ],
    queries: [
      "wind energy developer",
      "wind farm EPC",
      "offshore wind developer",
      "wind turbine service company",
    ],
    directories: ["https://cleanpower.org/membership/our-members/"],
    description: "Développeurs, EPC et O&M de parcs éoliens onshore/offshore.",
  },
  {
    id: "battery_storage",
    name: "Battery Energy Storage (BESS)",
    icon: "🔋",
    naics: ["335910", "237130", "221114"],
    signals: [
      "battery storage",
      "BESS",
      "energy storage system",
      "lithium-ion",
      "MWh",
      "storage integrator",
      "co-located storage",
    ],
    queries: [
      "battery energy storage integrator",
      "BESS developer",
      "energy storage EPC",
      "utility-scale battery storage",
    ],
    directories: [
      "https://energystorage.org/why-energy-storage/storage-resources/member-directory/",
    ],
    description: "Intégrateurs et développeurs de stockage batterie (BESS).",
  },
  {
    id: "ev_charging_cpo",
    name: "EV Charging Network / CPO",
    icon: "🔌",
    naics: ["811198", "238210", "221122"],
    signals: [
      "EV charging",
      "charging network",
      "CPO charge point operator",
      "fast charging",
      "Level 3",
      "DC fast charger",
      "fleet charging",
    ],
    queries: [
      "EV charging network operator",
      "charge point operator USA",
      "DC fast charging network",
      "fleet EV charging provider",
    ],
    description:
      "Opérateurs de bornes de recharge (Charge Point Operators) et réseaux EV.",
  },
  {
    id: "ev_charger_manufacturer",
    name: "EV Charger Manufacturer / Installer",
    icon: "⚡",
    naics: ["335999", "238210"],
    signals: [
      "EV charger",
      "charging station",
      "Level 2",
      "DC fast charger",
      "charger installation",
      "OCPP",
    ],
    queries: [
      "EV charger manufacturer",
      "EV charging station installer",
      "Level 2 charger company",
      "commercial EV charger installer",
    ],
    description: "Fabricants et installateurs de bornes EV.",
  },
  {
    id: "utility_electric",
    name: "Electric Utility (IOU / Muni / Coop)",
    icon: "🏛️",
    naics: ["221121", "221122"],
    signals: [
      "electric utility",
      "investor-owned utility",
      "municipal utility",
      "rural electric cooperative",
      "T&D",
      "transmission and distribution",
    ],
    queries: [
      "electric utility company",
      "rural electric cooperative",
      "municipal electric utility",
      "investor-owned utility",
    ],
    directories: [
      "https://www.electric.coop/our-organization/co-op-facts-and-figures",
    ],
    description: "Utilities électriques (IOU, munis, coopératives rurales).",
  },
  {
    id: "ipp",
    name: "Independent Power Producer (IPP)",
    icon: "🏗️",
    naics: ["221111", "221112", "221113", "221114", "221115", "221116", "221117", "221118"],
    signals: [
      "independent power producer",
      "IPP",
      "power generation",
      "merchant power",
      "PPA",
      "tolling agreement",
    ],
    queries: [
      "independent power producer USA",
      "IPP power generation",
      "merchant power developer",
    ],
    description: "Producteurs d'électricité indépendants (IPPs).",
  },
  {
    id: "oil_gas_services",
    name: "Oil & Gas Services",
    icon: "🛢️",
    naics: ["213111", "213112", "541360"],
    signals: [
      "oilfield services",
      "drilling services",
      "completion services",
      "well services",
      "midstream",
      "upstream",
      "frac",
      "wellhead",
    ],
    queries: [
      "oilfield services company",
      "drilling services",
      "well completion services",
      "midstream pipeline operator",
    ],
    description: "Sociétés de services pétrole & gaz (NAICS 213111/213112).",
  },
  {
    id: "esco",
    name: "ESCO / Energy Efficiency",
    icon: "💡",
    naics: ["541330", "541620", "238220"],
    signals: [
      "energy services company",
      "ESCO",
      "energy efficiency",
      "energy savings",
      "performance contracting",
      "EPC contracting",
      "retro-commissioning",
      "ESPC",
    ],
    queries: [
      "ESCO energy services company",
      "energy efficiency contractor",
      "energy performance contracting",
      "commercial energy efficiency",
    ],
    description:
      "Energy Services Companies (ESCOs) et entreprises d'efficacité énergétique.",
  },
  {
    id: "energy_consulting",
    name: "Energy Consulting / Auditing",
    icon: "📊",
    naics: ["541620", "541330"],
    signals: [
      "energy audit",
      "energy consulting",
      "energy management",
      "ASHRAE Level",
      "carbon footprint",
      "decarbonization",
      "Scope 1 Scope 2",
      "energy modeling",
    ],
    queries: [
      "energy consulting firm",
      "energy audit company",
      "decarbonization consulting",
      "carbon accounting consultancy",
    ],
    description: "Cabinets de conseil en énergie / audits énergétiques.",
  },
  {
    id: "smart_grid",
    name: "Smart Grid / DERMS / Software",
    icon: "🧠",
    naics: ["541512", "511210"],
    signals: [
      "DERMS",
      "ADMS",
      "grid software",
      "smart grid",
      "VPP virtual power plant",
      "demand response",
      "grid edge",
      "AMI advanced metering",
    ],
    queries: [
      "DERMS software",
      "virtual power plant platform",
      "demand response provider",
      "grid management software",
    ],
    description: "Éditeurs logiciels smart grid, DERMS, VPP, demand response.",
  },
  {
    id: "geothermal",
    name: "Geothermal",
    icon: "♨️",
    naics: ["221116", "237130", "238220"],
    signals: [
      "geothermal",
      "ground source heat pump",
      "GSHP",
      "geothermal HVAC",
      "geo-exchange",
      "EGS enhanced geothermal",
    ],
    queries: [
      "geothermal energy company",
      "geothermal heat pump installer",
      "GSHP contractor",
    ],
    description: "Géothermie résidentielle, commerciale et utility.",
  },
  {
    id: "hydrogen",
    name: "Hydrogen",
    icon: "💧",
    naics: ["325120", "541330"],
    signals: [
      "hydrogen",
      "green hydrogen",
      "blue hydrogen",
      "electrolyzer",
      "fuel cell",
      "H2 hub",
    ],
    queries: [
      "green hydrogen company",
      "electrolyzer manufacturer",
      "hydrogen fuel cell company",
      "hydrogen hub developer",
    ],
    description: "Acteurs de la chaîne hydrogène (production, électrolyse, fuel cells).",
  },
  {
    id: "hvac_commercial",
    name: "Commercial HVAC / Heat Pumps",
    icon: "❄️",
    naics: ["238220"],
    signals: [
      "commercial HVAC",
      "heat pump",
      "VRF variable refrigerant flow",
      "chiller",
      "rooftop unit RTU",
      "building automation",
    ],
    queries: [
      "commercial HVAC contractor",
      "heat pump installer commercial",
      "VRF system installer",
      "chiller plant contractor",
    ],
    description: "HVAC commercial avec focus heat pumps / décarbonation thermique.",
  },
];

export function getEnergySubSector(id: string): EnergySubSector | undefined {
  return ENERGY_US_SUBSECTORS.find((s) => s.id === id);
}

// ─── Construction de requêtes Google multi-keywords ──────

export interface BuildQueriesOptions {
  subSectorId: string;
  state?: string; // code "CA" ou nom complet
  city?: string;
  extraKeywords?: string[];
  maxQueries?: number;
}

/**
 * Construit une liste de requêtes Google ciblées pour un sous-secteur × état.
 * Combine queries pré-définies × état × ville × keywords supplémentaires.
 */
export function buildEnergyQueries(opts: BuildQueriesOptions): string[] {
  const sector = getEnergySubSector(opts.subSectorId);
  if (!sector) return [];

  const stateName = opts.state
    ? getUsState(opts.state)?.name ?? opts.state
    : undefined;

  const max = opts.maxQueries ?? 6;
  const out: string[] = [];

  for (const base of sector.queries) {
    const parts: string[] = [base];
    if (opts.city) parts.push(opts.city);
    if (stateName) parts.push(stateName);
    if (opts.extraKeywords?.length) parts.push(opts.extraKeywords.join(" "));
    out.push(parts.join(" "));
    if (out.length >= max) break;
  }

  return out;
}

// ─── Détection NAICS / signaux sectoriels ────────────────

/**
 * Cherche un code NAICS dans le HTML (souvent dans footer / about).
 */
export function detectNaics(html: string, candidates: string[]): string | null {
  for (const code of candidates) {
    if (html.includes(code)) return code;
  }
  return null;
}

/**
 * Compte le nombre de signaux sectoriels présents dans le contenu.
 */
export function countSignals(text: string, signals: string[]): number {
  const lower = text.toLowerCase();
  return signals.filter((s) => lower.includes(s.toLowerCase())).length;
}

/**
 * Booste le score d'un lead selon les signaux sectoriels détectés.
 * - +5 si NAICS détecté
 * - +3 par signal métier (cap à +20)
 * - +5 si ".com" + adresse US dans contenu
 */
export function applyEnergyScoring(
  lead: Lead,
  pageHtml: string,
  pageText: string,
  sector: EnergySubSector
): Lead {
  let bonus = 0;

  if (detectNaics(pageHtml, sector.naics)) bonus += 5;

  const signalHits = countSignals(pageText, sector.signals);
  bonus += Math.min(20, signalHits * 3);

  // Heuristique adresse US (ZIP code 5 digits)
  if (/\b\d{5}(?:-\d{4})?\b/.test(pageText)) bonus += 3;

  return { ...lead, score: Math.min(100, lead.score + bonus) };
}

// ─── Exports utilitaires ─────────────────────────────────

export const ENERGY_US_SUBSECTOR_IDS = ENERGY_US_SUBSECTORS.map((s) => s.id);
