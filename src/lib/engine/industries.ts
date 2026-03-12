/**
 * TAXONOMIE D'INDUSTRIES / DOMAINES
 *
 * Arbre de secteurs pour permettre une recherche précise.
 * Chaque secteur a des mots-clés de recherche optimisés par langue.
 */

export interface Industry {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  keywords: Record<string, string[]>; // langue → mots-clés de recherche
  subIndustries: SubIndustry[];
}

export interface SubIndustry {
  id: string;
  name: string;
  nameEn: string;
  keywords: Record<string, string[]>;
}

export const INDUSTRIES: Industry[] = [
  {
    id: "real_estate",
    name: "Immobilier",
    nameEn: "Real Estate",
    icon: "🏠",
    keywords: {
      fr: ["agence immobilière", "immobilier", "agent immobilier", "syndic copropriété"],
      en: ["real estate agency", "realtor", "property management", "real estate broker"],
      de: ["Immobilienmakler", "Immobilienagentur", "Hausverwaltung"],
      es: ["agencia inmobiliaria", "inmobiliaria", "agente inmobiliario"],
    },
    subIndustries: [
      { id: "real_estate_residential", name: "Résidentiel", nameEn: "Residential", keywords: { fr: ["immobilier résidentiel", "appartement", "maison"], en: ["residential real estate", "apartments", "homes"] } },
      { id: "real_estate_commercial", name: "Commercial", nameEn: "Commercial", keywords: { fr: ["immobilier commercial", "bureaux", "locaux commerciaux"], en: ["commercial real estate", "office space", "retail space"] } },
      { id: "real_estate_luxury", name: "Luxe", nameEn: "Luxury", keywords: { fr: ["immobilier de luxe", "propriété prestige"], en: ["luxury real estate", "luxury property"] } },
    ],
  },
  {
    id: "tech",
    name: "Technologie & IT",
    nameEn: "Technology & IT",
    icon: "💻",
    keywords: {
      fr: ["agence web", "développement logiciel", "ESN", "startup tech", "SSII"],
      en: ["software company", "IT company", "tech startup", "web development agency", "SaaS company"],
      de: ["Softwareunternehmen", "IT-Unternehmen", "Webagentur"],
      es: ["empresa de software", "empresa tecnológica", "desarrollo web"],
    },
    subIndustries: [
      { id: "tech_saas", name: "SaaS", nameEn: "SaaS", keywords: { fr: ["éditeur SaaS", "logiciel en ligne"], en: ["SaaS company", "cloud software"] } },
      { id: "tech_agency", name: "Agence digitale", nameEn: "Digital Agency", keywords: { fr: ["agence digitale", "agence web", "agence marketing digital"], en: ["digital agency", "web agency", "marketing agency"] } },
      { id: "tech_consulting", name: "Conseil IT", nameEn: "IT Consulting", keywords: { fr: ["conseil informatique", "consulting IT", "ESN"], en: ["IT consulting", "technology consulting"] } },
      { id: "tech_cybersecurity", name: "Cybersécurité", nameEn: "Cybersecurity", keywords: { fr: ["cybersécurité", "sécurité informatique"], en: ["cybersecurity", "information security"] } },
    ],
  },
  {
    id: "marketing",
    name: "Marketing & Communication",
    nameEn: "Marketing & Advertising",
    icon: "📢",
    keywords: {
      fr: ["agence de communication", "agence marketing", "agence publicité", "agence SEO"],
      en: ["marketing agency", "advertising agency", "PR firm", "SEO agency"],
      de: ["Marketingagentur", "Werbeagentur", "PR-Agentur"],
      es: ["agencia de marketing", "agencia de publicidad", "agencia de comunicación"],
    },
    subIndustries: [
      { id: "marketing_seo", name: "SEO / SEA", nameEn: "SEO / SEM", keywords: { fr: ["agence SEO", "référencement naturel", "agence Google Ads"], en: ["SEO agency", "SEM agency", "PPC agency"] } },
      { id: "marketing_social", name: "Social Media", nameEn: "Social Media", keywords: { fr: ["community manager", "agence social media", "gestion réseaux sociaux"], en: ["social media agency", "social media management"] } },
      { id: "marketing_content", name: "Content Marketing", nameEn: "Content Marketing", keywords: { fr: ["agence de contenu", "rédaction web", "content marketing"], en: ["content marketing agency", "copywriting agency"] } },
      { id: "marketing_pr", name: "Relations Presse", nameEn: "Public Relations", keywords: { fr: ["agence RP", "relations presse", "relations publiques"], en: ["PR agency", "public relations firm"] } },
    ],
  },
  {
    id: "finance",
    name: "Finance & Assurance",
    nameEn: "Finance & Insurance",
    icon: "💰",
    keywords: {
      fr: ["cabinet comptable", "expert-comptable", "courtier assurance", "gestion patrimoine"],
      en: ["accounting firm", "financial advisor", "insurance broker", "wealth management"],
      de: ["Steuerberater", "Versicherungsmakler", "Finanzberater"],
      es: ["asesoría fiscal", "corredor de seguros", "asesor financiero"],
    },
    subIndustries: [
      { id: "finance_accounting", name: "Comptabilité", nameEn: "Accounting", keywords: { fr: ["expert-comptable", "cabinet comptable", "commissaire aux comptes"], en: ["CPA", "accounting firm", "bookkeeper"] } },
      { id: "finance_insurance", name: "Assurance", nameEn: "Insurance", keywords: { fr: ["courtier assurance", "agent assurance", "assureur"], en: ["insurance broker", "insurance agent"] } },
      { id: "finance_wealth", name: "Gestion de patrimoine", nameEn: "Wealth Management", keywords: { fr: ["gestion de patrimoine", "conseiller patrimoine"], en: ["wealth management", "financial planning"] } },
    ],
  },
  {
    id: "legal",
    name: "Juridique",
    nameEn: "Legal",
    icon: "⚖️",
    keywords: {
      fr: ["cabinet d'avocats", "avocat", "notaire", "juriste"],
      en: ["law firm", "attorney", "lawyer", "legal services"],
      de: ["Rechtsanwalt", "Anwaltskanzlei", "Notar"],
      es: ["despacho de abogados", "abogado", "notaría"],
    },
    subIndustries: [
      { id: "legal_corporate", name: "Droit des affaires", nameEn: "Corporate Law", keywords: { fr: ["avocat droit des affaires", "droit commercial"], en: ["corporate lawyer", "business law"] } },
      { id: "legal_ip", name: "Propriété intellectuelle", nameEn: "IP Law", keywords: { fr: ["avocat propriété intellectuelle", "droit des marques"], en: ["IP lawyer", "patent attorney", "trademark lawyer"] } },
      { id: "legal_labor", name: "Droit du travail", nameEn: "Employment Law", keywords: { fr: ["avocat droit du travail", "droit social"], en: ["employment lawyer", "labor law"] } },
    ],
  },
  {
    id: "healthcare",
    name: "Santé & Médical",
    nameEn: "Healthcare & Medical",
    icon: "🏥",
    keywords: {
      fr: ["clinique", "cabinet médical", "laboratoire", "pharmacie", "hôpital"],
      en: ["clinic", "medical practice", "hospital", "pharmacy", "healthcare provider"],
      de: ["Klinik", "Arztpraxis", "Krankenhaus", "Apotheke"],
      es: ["clínica", "consultorio médico", "hospital", "farmacia"],
    },
    subIndustries: [
      { id: "healthcare_dental", name: "Dentaire", nameEn: "Dental", keywords: { fr: ["dentiste", "cabinet dentaire", "chirurgien-dentiste"], en: ["dentist", "dental clinic", "dental practice"] } },
      { id: "healthcare_pharma", name: "Pharma", nameEn: "Pharmaceutical", keywords: { fr: ["laboratoire pharmaceutique", "industrie pharma"], en: ["pharmaceutical company", "pharma"] } },
      { id: "healthcare_wellness", name: "Bien-être", nameEn: "Wellness", keywords: { fr: ["spa", "centre bien-être", "coach santé", "naturopathe"], en: ["wellness center", "spa", "health coach"] } },
    ],
  },
  {
    id: "construction",
    name: "BTP & Construction",
    nameEn: "Construction",
    icon: "🏗️",
    keywords: {
      fr: ["entreprise BTP", "construction", "maître d'oeuvre", "architecte", "promoteur immobilier"],
      en: ["construction company", "general contractor", "builder", "architect"],
      de: ["Bauunternehmen", "Architekt", "Bauträger"],
      es: ["empresa constructora", "constructor", "arquitecto"],
    },
    subIndustries: [
      { id: "construction_residential", name: "Résidentiel", nameEn: "Residential", keywords: { fr: ["constructeur maison", "rénovation habitat"], en: ["home builder", "residential contractor"] } },
      { id: "construction_commercial", name: "Commercial", nameEn: "Commercial", keywords: { fr: ["construction commerciale", "bâtiment industriel"], en: ["commercial construction", "industrial building"] } },
    ],
  },
  {
    id: "retail",
    name: "Commerce & Distribution",
    nameEn: "Retail & Distribution",
    icon: "🛒",
    keywords: {
      fr: ["commerce de détail", "grossiste", "distributeur", "e-commerce"],
      en: ["retail store", "wholesaler", "distributor", "e-commerce"],
      de: ["Einzelhandel", "Großhandel", "E-Commerce"],
      es: ["comercio minorista", "mayorista", "distribuidor", "e-commerce"],
    },
    subIndustries: [
      { id: "retail_ecommerce", name: "E-commerce", nameEn: "E-commerce", keywords: { fr: ["boutique en ligne", "e-commerce", "vente en ligne"], en: ["online store", "e-commerce", "online retail"] } },
      { id: "retail_food", name: "Alimentation", nameEn: "Food & Beverage", keywords: { fr: ["grossiste alimentaire", "épicerie", "traiteur"], en: ["food distributor", "grocery", "catering"] } },
    ],
  },
  {
    id: "education",
    name: "Éducation & Formation",
    nameEn: "Education & Training",
    icon: "🎓",
    keywords: {
      fr: ["centre de formation", "école", "organisme formation", "coaching"],
      en: ["training center", "school", "education provider", "coaching"],
      de: ["Bildungseinrichtung", "Schule", "Weiterbildung"],
      es: ["centro de formación", "escuela", "academia"],
    },
    subIndustries: [
      { id: "education_professional", name: "Formation pro", nameEn: "Professional Training", keywords: { fr: ["formation professionnelle", "formation continue", "CPF"], en: ["professional development", "corporate training"] } },
      { id: "education_language", name: "Langues", nameEn: "Language School", keywords: { fr: ["école de langues", "cours d'anglais", "formation linguistique"], en: ["language school", "ESL school"] } },
    ],
  },
  {
    id: "hospitality",
    name: "Hôtellerie & Restauration",
    nameEn: "Hospitality & Tourism",
    icon: "🏨",
    keywords: {
      fr: ["hôtel", "restaurant", "tourisme", "agence de voyage"],
      en: ["hotel", "restaurant", "tourism", "travel agency"],
      de: ["Hotel", "Restaurant", "Tourismus", "Reisebüro"],
      es: ["hotel", "restaurante", "turismo", "agencia de viajes"],
    },
    subIndustries: [
      { id: "hospitality_hotel", name: "Hôtellerie", nameEn: "Hotels", keywords: { fr: ["hôtel", "hébergement", "résidence"], en: ["hotel", "accommodation", "resort"] } },
      { id: "hospitality_restaurant", name: "Restauration", nameEn: "Restaurants", keywords: { fr: ["restaurant", "traiteur", "restauration"], en: ["restaurant", "catering", "food service"] } },
    ],
  },
  {
    id: "manufacturing",
    name: "Industrie & Production",
    nameEn: "Manufacturing",
    icon: "🏭",
    keywords: {
      fr: ["usine", "fabricant", "industrie", "production", "sous-traitant"],
      en: ["manufacturer", "factory", "industrial", "production", "OEM"],
      de: ["Hersteller", "Fabrik", "Produktion", "Industrie"],
      es: ["fabricante", "fábrica", "industria", "producción"],
    },
    subIndustries: [
      { id: "manufacturing_food", name: "Agroalimentaire", nameEn: "Food Manufacturing", keywords: { fr: ["industrie agroalimentaire", "usine alimentaire"], en: ["food manufacturer", "food processing"] } },
      { id: "manufacturing_auto", name: "Automobile", nameEn: "Automotive", keywords: { fr: ["industrie automobile", "équipementier auto"], en: ["automotive manufacturer", "auto parts"] } },
    ],
  },
  {
    id: "logistics",
    name: "Transport & Logistique",
    nameEn: "Transport & Logistics",
    icon: "🚛",
    keywords: {
      fr: ["transport", "logistique", "livraison", "transitaire", "déménagement"],
      en: ["logistics company", "freight", "shipping", "trucking", "moving company"],
      de: ["Logistikunternehmen", "Spedition", "Transport"],
      es: ["empresa de transporte", "logística", "envíos"],
    },
    subIndustries: [
      { id: "logistics_freight", name: "Fret", nameEn: "Freight", keywords: { fr: ["fret", "transitaire", "transport international"], en: ["freight forwarder", "international shipping"] } },
      { id: "logistics_last_mile", name: "Dernier km", nameEn: "Last Mile", keywords: { fr: ["livraison dernier kilomètre", "coursier"], en: ["last mile delivery", "courier"] } },
    ],
  },
  {
    id: "energy",
    name: "Énergie & Environnement",
    nameEn: "Energy & Environment",
    icon: "⚡",
    keywords: {
      fr: ["énergie renouvelable", "panneau solaire", "installateur photovoltaïque", "isolation"],
      en: ["renewable energy", "solar panel", "energy company", "insulation"],
      de: ["erneuerbare Energie", "Solaranlage", "Energieunternehmen"],
      es: ["energía renovable", "panel solar", "empresa energética"],
    },
    subIndustries: [
      { id: "energy_solar", name: "Solaire", nameEn: "Solar", keywords: { fr: ["installateur panneaux solaires", "photovoltaïque"], en: ["solar installer", "solar company"] } },
      { id: "energy_consulting", name: "Conseil énergie", nameEn: "Energy Consulting", keywords: { fr: ["audit énergétique", "conseil énergie", "bilan carbone"], en: ["energy audit", "energy consulting", "carbon footprint"] } },
    ],
  },
  {
    id: "hr",
    name: "Ressources Humaines",
    nameEn: "Human Resources",
    icon: "👥",
    keywords: {
      fr: ["cabinet recrutement", "agence intérim", "RH", "chasseur de têtes"],
      en: ["recruitment agency", "staffing agency", "HR consulting", "headhunter"],
      de: ["Personalberatung", "Zeitarbeit", "Headhunter"],
      es: ["agencia de empleo", "consultoría RRHH", "headhunter"],
    },
    subIndustries: [
      { id: "hr_recruiting", name: "Recrutement", nameEn: "Recruiting", keywords: { fr: ["cabinet recrutement", "chasseur de têtes"], en: ["recruitment firm", "executive search"] } },
      { id: "hr_temp", name: "Intérim", nameEn: "Temp Staffing", keywords: { fr: ["agence intérim", "travail temporaire"], en: ["temp agency", "staffing firm"] } },
    ],
  },
];

/**
 * Trouve une industrie par son ID
 */
export function getIndustry(id: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.id === id);
}

/**
 * Trouve une sous-industrie par son ID
 */
export function getSubIndustry(id: string): { industry: Industry; sub: SubIndustry } | undefined {
  for (const industry of INDUSTRIES) {
    const sub = industry.subIndustries.find((s) => s.id === id);
    if (sub) return { industry, sub };
  }
  return undefined;
}

/**
 * Récupère les mots-clés de recherche pour une industrie dans une langue
 */
export function getSearchKeywords(industryId: string, language: string = "fr"): string[] {
  const industry = getIndustry(industryId);
  if (!industry) return [];
  return industry.keywords[language] || industry.keywords["en"] || [];
}

/**
 * Recherche d'industries par texte libre
 */
export function searchIndustries(query: string): Industry[] {
  const q = query.toLowerCase();
  return INDUSTRIES.filter(
    (i) =>
      i.name.toLowerCase().includes(q) ||
      i.nameEn.toLowerCase().includes(q) ||
      Object.values(i.keywords).flat().some((k) => k.toLowerCase().includes(q))
  );
}
