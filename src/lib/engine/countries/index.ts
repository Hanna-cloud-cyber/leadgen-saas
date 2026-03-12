/**
 * SYSTÈME MULTI-PAYS
 *
 * Configuration par pays :
 * - Moteurs de recherche locaux
 * - Formats de téléphone
 * - Patterns d'emails courants
 * - Annuaires professionnels locaux
 * - Prénoms courants (pour la détection)
 * - Langue de recherche
 */

export interface CountryConfig {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  nameLocal: string;
  language: string;
  searchEngines: SearchEngineConfig[];
  phoneFormats: PhoneFormat[];
  directories: DirectoryConfig[];
  emailPatterns: string[]; // Patterns les plus courants dans ce pays
  commonFirstNames: string[];
  legalPageKeywords: string[]; // Mots-clés pour trouver les mentions légales
  teamPageKeywords: string[]; // Mots-clés pour trouver la page équipe
  googleDomain: string; // google.fr, google.de, etc.
  currency: string;
}

interface SearchEngineConfig {
  name: string;
  searchUrl: string; // avec {query} et {num} comme placeholders
  parseSelectors: {
    resultContainer: string;
    link: string;
    title: string;
    description: string;
  };
}

interface PhoneFormat {
  regex: RegExp;
  example: string;
  prefix: string; // +33, +44, etc.
}

interface DirectoryConfig {
  name: string;
  url: string;
  searchUrl: string; // avec {query} et {city} comme placeholders
  type: "business" | "person" | "both";
}

// ═══════════════════════════════════════════
// CONFIGURATIONS PAR PAYS
// ═══════════════════════════════════════════

const FRANCE: CountryConfig = {
  code: "FR",
  name: "France",
  nameLocal: "France",
  language: "fr",
  googleDomain: "google.fr",
  currency: "EUR",
  searchEngines: [
    {
      name: "Google France",
      searchUrl: "https://www.google.fr/search?q={query}&num={num}&hl=fr&gl=fr",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /(?:\+33|0033|0)\s*[1-9](?:[\s.-]*\d{2}){4}/g, example: "+33 1 23 45 67 89", prefix: "+33" },
    { regex: /0[1-9](?:[\s.-]?\d{2}){4}/g, example: "01 23 45 67 89", prefix: "+33" },
  ],
  directories: [
    { name: "Pages Jaunes", url: "https://www.pagesjaunes.fr", searchUrl: "https://www.pagesjaunes.fr/annuaire/chercherlespros?quoiqui={query}&ou={city}", type: "business" },
    { name: "Societe.com", url: "https://www.societe.com", searchUrl: "https://www.societe.com/cgi-bin/search?champs={query}", type: "business" },
    { name: "Kompass", url: "https://fr.kompass.com", searchUrl: "https://fr.kompass.com/searchCompanies?text={query}", type: "business" },
  ],
  emailPatterns: ["prenom.nom@domaine", "pnom@domaine", "prenom@domaine"],
  commonFirstNames: ["jean", "pierre", "marie", "michel", "philippe", "nicolas", "thomas", "sophie", "nathalie", "julien", "alexandre", "camille", "léa", "hugo", "lucas"],
  legalPageKeywords: ["mentions-legales", "mentions-légales", "legal", "cgu", "cgv"],
  teamPageKeywords: ["equipe", "notre-equipe", "l-equipe", "a-propos", "qui-sommes-nous"],
};

const UNITED_STATES: CountryConfig = {
  code: "US",
  name: "United States",
  nameLocal: "United States",
  language: "en",
  googleDomain: "google.com",
  currency: "USD",
  searchEngines: [
    {
      name: "Google US",
      searchUrl: "https://www.google.com/search?q={query}&num={num}&hl=en&gl=us",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, example: "+1 (555) 123-4567", prefix: "+1" },
  ],
  directories: [
    { name: "Yelp", url: "https://www.yelp.com", searchUrl: "https://www.yelp.com/search?find_desc={query}&find_loc={city}", type: "business" },
    { name: "BBB", url: "https://www.bbb.org", searchUrl: "https://www.bbb.org/search?find_text={query}&find_loc={city}", type: "business" },
    { name: "Yellow Pages", url: "https://www.yellowpages.com", searchUrl: "https://www.yellowpages.com/search?search_terms={query}&geo_location_terms={city}", type: "business" },
  ],
  emailPatterns: ["prenom.nom@domaine", "prenomnom@domaine", "pnom@domaine", "prenom@domaine"],
  commonFirstNames: ["james", "john", "robert", "michael", "david", "william", "richard", "joseph", "thomas", "mary", "patricia", "jennifer", "linda", "elizabeth", "sarah", "jessica", "emily", "emma", "olivia"],
  legalPageKeywords: ["privacy-policy", "terms", "legal", "terms-of-service"],
  teamPageKeywords: ["team", "about", "about-us", "our-team", "leadership", "people"],
};

const UNITED_KINGDOM: CountryConfig = {
  code: "GB",
  name: "United Kingdom",
  nameLocal: "United Kingdom",
  language: "en",
  googleDomain: "google.co.uk",
  currency: "GBP",
  searchEngines: [
    {
      name: "Google UK",
      searchUrl: "https://www.google.co.uk/search?q={query}&num={num}&hl=en&gl=uk",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /(?:\+44|0044|0)\s*\d{2,5}[\s.-]?\d{3,6}[\s.-]?\d{0,4}/g, example: "+44 20 7946 0958", prefix: "+44" },
  ],
  directories: [
    { name: "Yell", url: "https://www.yell.com", searchUrl: "https://www.yell.com/ucs/UcsSearchAction.do?keywords={query}&location={city}", type: "business" },
    { name: "Companies House", url: "https://www.gov.uk/get-information-about-a-company", searchUrl: "https://find-and-update.company-information.service.gov.uk/search?q={query}", type: "business" },
  ],
  emailPatterns: ["prenom.nom@domaine", "p.nom@domaine", "prenomnom@domaine"],
  commonFirstNames: ["oliver", "jack", "harry", "george", "charlie", "amelia", "olivia", "isla", "emily", "sophie", "james", "william", "thomas", "daniel", "matthew"],
  legalPageKeywords: ["privacy-policy", "terms", "legal", "cookies-policy"],
  teamPageKeywords: ["team", "about", "about-us", "our-team", "our-people"],
};

const GERMANY: CountryConfig = {
  code: "DE",
  name: "Germany",
  nameLocal: "Deutschland",
  language: "de",
  googleDomain: "google.de",
  currency: "EUR",
  searchEngines: [
    {
      name: "Google Germany",
      searchUrl: "https://www.google.de/search?q={query}&num={num}&hl=de&gl=de",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /(?:\+49|0049|0)\s*\d{2,5}[\s.-/]?\d{3,8}[\s.-]?\d{0,5}/g, example: "+49 30 123456", prefix: "+49" },
  ],
  directories: [
    { name: "Gelbe Seiten", url: "https://www.gelbeseiten.de", searchUrl: "https://www.gelbeseiten.de/suche/{query}/{city}", type: "business" },
    { name: "Das Örtliche", url: "https://www.dasoertliche.de", searchUrl: "https://www.dasoertliche.de/Themen/{query}/{city}", type: "both" },
  ],
  emailPatterns: ["vorname.nachname@domaine", "v.nachname@domaine", "vorname@domaine"],
  commonFirstNames: ["peter", "michael", "thomas", "andreas", "stefan", "christian", "martin", "anna", "maria", "laura", "julia", "sarah", "lisa", "sophie", "maximilian", "alexander", "lukas", "leon", "paul", "felix"],
  legalPageKeywords: ["impressum", "datenschutz", "agb", "rechtliches"],
  teamPageKeywords: ["team", "ueber-uns", "uber-uns", "unser-team", "mitarbeiter"],
};

const SPAIN: CountryConfig = {
  code: "ES",
  name: "Spain",
  nameLocal: "España",
  language: "es",
  googleDomain: "google.es",
  currency: "EUR",
  searchEngines: [
    {
      name: "Google Spain",
      searchUrl: "https://www.google.es/search?q={query}&num={num}&hl=es&gl=es",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /(?:\+34|0034)\s*[6-9]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}/g, example: "+34 612 345 678", prefix: "+34" },
    { regex: /[6-9]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}/g, example: "612 345 678", prefix: "+34" },
  ],
  directories: [
    { name: "Páginas Amarillas", url: "https://www.paginasamarillas.es", searchUrl: "https://www.paginasamarillas.es/search/{query}/all-ma/{city}/all-is", type: "business" },
    { name: "Infobel", url: "https://www.infobel.com/es", searchUrl: "https://www.infobel.com/es/spain/{query}/{city}", type: "both" },
  ],
  emailPatterns: ["nombre.apellido@domaine", "n.apellido@domaine", "nombre@domaine"],
  commonFirstNames: ["antonio", "jose", "manuel", "francisco", "david", "juan", "carlos", "maria", "carmen", "ana", "laura", "cristina", "marta", "lucia", "paula", "elena", "isabel", "alejandro", "daniel", "pablo"],
  legalPageKeywords: ["aviso-legal", "politica-privacidad", "legal", "terminos"],
  teamPageKeywords: ["equipo", "nuestro-equipo", "sobre-nosotros", "quienes-somos"],
};

const ITALY: CountryConfig = {
  code: "IT",
  name: "Italy",
  nameLocal: "Italia",
  language: "it",
  googleDomain: "google.it",
  currency: "EUR",
  searchEngines: [
    {
      name: "Google Italy",
      searchUrl: "https://www.google.it/search?q={query}&num={num}&hl=it&gl=it",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /(?:\+39|0039)\s*0?\d{2,4}[\s.-]?\d{4,8}/g, example: "+39 02 1234567", prefix: "+39" },
  ],
  directories: [
    { name: "Pagine Gialle", url: "https://www.paginegialle.it", searchUrl: "https://www.paginegialle.it/ricerca/{query}/{city}", type: "business" },
  ],
  emailPatterns: ["nome.cognome@domaine", "n.cognome@domaine", "nome@domaine"],
  commonFirstNames: ["marco", "giuseppe", "andrea", "giovanni", "francesco", "alessandro", "luca", "maria", "anna", "francesca", "giulia", "sara", "valentina", "chiara", "laura", "martina", "elena", "matteo", "lorenzo", "davide"],
  legalPageKeywords: ["privacy-policy", "note-legali", "termini", "cookie-policy"],
  teamPageKeywords: ["team", "chi-siamo", "il-nostro-team", "la-squadra"],
};

const BRAZIL: CountryConfig = {
  code: "BR",
  name: "Brazil",
  nameLocal: "Brasil",
  language: "pt",
  googleDomain: "google.com.br",
  currency: "BRL",
  searchEngines: [
    {
      name: "Google Brazil",
      searchUrl: "https://www.google.com.br/search?q={query}&num={num}&hl=pt-BR&gl=br",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /(?:\+55|0055)\s*\(?\d{2}\)?\s*9?\d{4}[-.\s]?\d{4}/g, example: "+55 (11) 91234-5678", prefix: "+55" },
  ],
  directories: [
    { name: "Telelistas", url: "https://www.telelistas.net", searchUrl: "https://www.telelistas.net/search?q={query}&city={city}", type: "business" },
  ],
  emailPatterns: ["nome.sobrenome@domaine", "nome@domaine", "n.sobrenome@domaine"],
  commonFirstNames: ["joao", "jose", "antonio", "carlos", "paulo", "pedro", "lucas", "maria", "ana", "juliana", "fernanda", "patricia", "camila", "amanda", "bruna", "gabriel", "rafael", "matheus", "gustavo", "felipe"],
  legalPageKeywords: ["politica-privacidade", "termos-uso", "lgpd", "legal"],
  teamPageKeywords: ["equipe", "nossa-equipe", "sobre-nos", "quem-somos"],
};

const CANADA: CountryConfig = {
  code: "CA",
  name: "Canada",
  nameLocal: "Canada",
  language: "en",
  googleDomain: "google.ca",
  currency: "CAD",
  searchEngines: [
    {
      name: "Google Canada",
      searchUrl: "https://www.google.ca/search?q={query}&num={num}&hl=en&gl=ca",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, example: "+1 (416) 123-4567", prefix: "+1" },
  ],
  directories: [
    { name: "Yellow Pages CA", url: "https://www.yellowpages.ca", searchUrl: "https://www.yellowpages.ca/search/si/1/{query}/{city}", type: "business" },
    { name: "Canada411", url: "https://www.canada411.ca", searchUrl: "https://www.canada411.ca/search/?stype=si&what={query}&where={city}", type: "both" },
  ],
  emailPatterns: ["prenom.nom@domaine", "prenomnom@domaine", "pnom@domaine"],
  commonFirstNames: ["liam", "noah", "oliver", "emma", "olivia", "charlotte", "william", "james", "benjamin", "lucas", "ethan", "jacob", "michael", "alexander", "daniel", "sophia", "ava", "mia", "isabella", "amelia"],
  legalPageKeywords: ["privacy-policy", "terms", "legal"],
  teamPageKeywords: ["team", "about", "about-us", "our-team", "leadership"],
};

const NETHERLANDS: CountryConfig = {
  code: "NL",
  name: "Netherlands",
  nameLocal: "Nederland",
  language: "nl",
  googleDomain: "google.nl",
  currency: "EUR",
  searchEngines: [
    {
      name: "Google Netherlands",
      searchUrl: "https://www.google.nl/search?q={query}&num={num}&hl=nl&gl=nl",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /(?:\+31|0031|0)\s*\d{1,3}[\s.-]?\d{3,4}[\s.-]?\d{2,4}/g, example: "+31 20 123 4567", prefix: "+31" },
  ],
  directories: [
    { name: "Gouden Gids", url: "https://www.goudengids.nl", searchUrl: "https://www.goudengids.nl/zoeken/{query}/{city}/", type: "business" },
  ],
  emailPatterns: ["voornaam.achternaam@domaine", "v.achternaam@domaine"],
  commonFirstNames: ["jan", "peter", "johannes", "cornelis", "willem", "maria", "anna", "johanna", "elisabeth", "emma", "julia", "sophie", "lucas", "daan", "sem", "liam", "noah", "finn", "milan", "bram"],
  legalPageKeywords: ["privacybeleid", "voorwaarden", "juridisch", "privacy"],
  teamPageKeywords: ["team", "over-ons", "ons-team", "medewerkers"],
};

const JAPAN: CountryConfig = {
  code: "JP",
  name: "Japan",
  nameLocal: "日本",
  language: "ja",
  googleDomain: "google.co.jp",
  currency: "JPY",
  searchEngines: [
    {
      name: "Google Japan",
      searchUrl: "https://www.google.co.jp/search?q={query}&num={num}&hl=ja&gl=jp",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /(?:\+81|0081|0)\s*\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{3,4}/g, example: "+81 3-1234-5678", prefix: "+81" },
  ],
  directories: [
    { name: "iTownPage", url: "https://itp.ne.jp", searchUrl: "https://itp.ne.jp/result/?keyword={query}&area={city}", type: "business" },
  ],
  emailPatterns: ["nom.prenom@domaine", "nom@domaine", "prenom.nom@domaine"],
  commonFirstNames: ["hiroshi", "takeshi", "yuki", "kenji", "daisuke", "yuko", "akiko", "haruka", "sakura", "mei", "sota", "haruto", "yuto", "riku", "minato", "himari", "hana", "aoi", "rin", "mio"],
  legalPageKeywords: ["privacy", "プライバシーポリシー", "利用規約", "特定商取引法"],
  teamPageKeywords: ["会社概要", "スタッフ", "チーム", "about", "company"],
};

const INDIA: CountryConfig = {
  code: "IN",
  name: "India",
  nameLocal: "India",
  language: "en",
  googleDomain: "google.co.in",
  currency: "INR",
  searchEngines: [
    {
      name: "Google India",
      searchUrl: "https://www.google.co.in/search?q={query}&num={num}&hl=en&gl=in",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /(?:\+91|0091|0)\s*[6-9]\d{4}[\s.-]?\d{5}/g, example: "+91 98765 43210", prefix: "+91" },
  ],
  directories: [
    { name: "JustDial", url: "https://www.justdial.com", searchUrl: "https://www.justdial.com/{city}/{query}", type: "business" },
    { name: "IndiaMART", url: "https://www.indiamart.com", searchUrl: "https://dir.indiamart.com/search.mp?ss={query}&city={city}", type: "business" },
  ],
  emailPatterns: ["prenom.nom@domaine", "prenom@domaine", "pnom@domaine"],
  commonFirstNames: ["amit", "rajesh", "suresh", "ramesh", "priya", "deepa", "sunita", "anita", "rahul", "vikram", "arun", "sanjay", "ravi", "pooja", "neha", "shreya", "arjun", "rohan", "aditya", "divya"],
  legalPageKeywords: ["privacy-policy", "terms", "legal", "disclaimer"],
  teamPageKeywords: ["team", "about", "about-us", "our-team", "leadership", "management"],
};

const AUSTRALIA: CountryConfig = {
  code: "AU",
  name: "Australia",
  nameLocal: "Australia",
  language: "en",
  googleDomain: "google.com.au",
  currency: "AUD",
  searchEngines: [
    {
      name: "Google Australia",
      searchUrl: "https://www.google.com.au/search?q={query}&num={num}&hl=en&gl=au",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /(?:\+61|0061|0)\s*[2-578]\s*\d{4}\s*\d{4}/g, example: "+61 2 1234 5678", prefix: "+61" },
    { regex: /(?:\+61|0061|0)\s*4\d{2}\s*\d{3}\s*\d{3}/g, example: "+61 412 345 678", prefix: "+61" },
  ],
  directories: [
    { name: "Yellow Pages AU", url: "https://www.yellowpages.com.au", searchUrl: "https://www.yellowpages.com.au/find/{query}/{city}", type: "business" },
    { name: "True Local", url: "https://www.truelocal.com.au", searchUrl: "https://www.truelocal.com.au/find/{query}/{city}", type: "business" },
  ],
  emailPatterns: ["prenom.nom@domaine", "prenomnom@domaine", "pnom@domaine"],
  commonFirstNames: ["oliver", "jack", "william", "noah", "thomas", "charlotte", "olivia", "amelia", "isla", "mia", "james", "ethan", "lucas", "henry", "alexander", "ava", "grace", "chloe", "sophie", "emily"],
  legalPageKeywords: ["privacy-policy", "terms", "legal", "disclaimer"],
  teamPageKeywords: ["team", "about", "about-us", "our-team", "our-people"],
};

const MOROCCO: CountryConfig = {
  code: "MA",
  name: "Morocco",
  nameLocal: "المغرب / Maroc",
  language: "fr",
  googleDomain: "google.co.ma",
  currency: "MAD",
  searchEngines: [
    {
      name: "Google Morocco",
      searchUrl: "https://www.google.co.ma/search?q={query}&num={num}&hl=fr&gl=ma",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /(?:\+212|00212|0)\s*[5-7]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}/g, example: "+212 661 234 567", prefix: "+212" },
  ],
  directories: [
    { name: "Pages Jaunes Maroc", url: "https://www.pagesjaunes.ma", searchUrl: "https://www.pagesjaunes.ma/search?q={query}&where={city}", type: "business" },
    { name: "Kerix", url: "https://www.kerix.net", searchUrl: "https://www.kerix.net/recherche?q={query}", type: "business" },
  ],
  emailPatterns: ["prenom.nom@domaine", "pnom@domaine", "prenom@domaine"],
  commonFirstNames: ["mohammed", "ahmed", "youssef", "omar", "fatima", "khadija", "aicha", "sara", "meryem", "houda", "hamza", "amine", "mehdi", "rachid", "karim", "nadia", "laila", "samira", "hassan", "said"],
  legalPageKeywords: ["mentions-legales", "legal", "confidentialite"],
  teamPageKeywords: ["equipe", "notre-equipe", "a-propos", "qui-sommes-nous"],
};

const UAE: CountryConfig = {
  code: "AE",
  name: "United Arab Emirates",
  nameLocal: "الإمارات العربية المتحدة",
  language: "en",
  googleDomain: "google.ae",
  currency: "AED",
  searchEngines: [
    {
      name: "Google UAE",
      searchUrl: "https://www.google.ae/search?q={query}&num={num}&hl=en&gl=ae",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /(?:\+971|00971|0)\s*[2-9]\d[\s.-]?\d{3}[\s.-]?\d{4}/g, example: "+971 50 123 4567", prefix: "+971" },
  ],
  directories: [
    { name: "Yellow Pages UAE", url: "https://www.yellowpages-uae.com", searchUrl: "https://www.yellowpages-uae.com/search/{query}", type: "business" },
  ],
  emailPatterns: ["prenom.nom@domaine", "prenom@domaine", "pnom@domaine"],
  commonFirstNames: ["mohammed", "ahmed", "ali", "omar", "khalid", "fatima", "aisha", "sara", "maryam", "noura", "rashid", "sultan", "hamad", "abdullah", "mansour", "hessa", "latifa", "shamma", "maitha", "reem"],
  legalPageKeywords: ["privacy-policy", "terms", "legal", "disclaimer"],
  teamPageKeywords: ["team", "about", "about-us", "our-team", "leadership"],
};

const SWITZERLAND: CountryConfig = {
  code: "CH",
  name: "Switzerland",
  nameLocal: "Suisse / Schweiz",
  language: "fr",
  googleDomain: "google.ch",
  currency: "CHF",
  searchEngines: [
    {
      name: "Google Switzerland",
      searchUrl: "https://www.google.ch/search?q={query}&num={num}&hl=fr&gl=ch",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /(?:\+41|0041|0)\s*\d{2}[\s.]?\d{3}[\s.]?\d{2}[\s.]?\d{2}/g, example: "+41 22 123 45 67", prefix: "+41" },
  ],
  directories: [
    { name: "local.ch", url: "https://www.local.ch", searchUrl: "https://www.local.ch/fr/q/{query}/{city}", type: "both" },
  ],
  emailPatterns: ["prenom.nom@domaine", "p.nom@domaine", "prenom@domaine"],
  commonFirstNames: ["jean", "pierre", "marc", "daniel", "thomas", "marie", "anna", "laura", "sarah", "julia", "nicolas", "david", "michael", "christian", "patrick", "sandra", "andrea", "claudia", "nicole", "monika"],
  legalPageKeywords: ["mentions-legales", "impressum", "datenschutz", "legal"],
  teamPageKeywords: ["equipe", "notre-equipe", "team", "ueber-uns", "a-propos"],
};

const BELGIUM: CountryConfig = {
  code: "BE",
  name: "Belgium",
  nameLocal: "Belgique / België",
  language: "fr",
  googleDomain: "google.be",
  currency: "EUR",
  searchEngines: [
    {
      name: "Google Belgium",
      searchUrl: "https://www.google.be/search?q={query}&num={num}&hl=fr&gl=be",
      parseSelectors: {
        resultContainer: "div.g",
        link: "a[href]",
        title: "h3",
        description: ".VwiC3b",
      },
    },
  ],
  phoneFormats: [
    { regex: /(?:\+32|0032|0)\s*[1-9]\d{1,2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}/g, example: "+32 2 123 45 67", prefix: "+32" },
  ],
  directories: [
    { name: "Pages d'Or", url: "https://www.pagesdor.be", searchUrl: "https://www.pagesdor.be/recherche/{query}/{city}", type: "business" },
    { name: "Infobel Belgium", url: "https://www.infobel.com/fr/belgium", searchUrl: "https://www.infobel.com/fr/belgium/{query}/{city}", type: "both" },
  ],
  emailPatterns: ["prenom.nom@domaine", "pnom@domaine", "prenom@domaine"],
  commonFirstNames: ["jean", "marc", "philippe", "luc", "patrick", "marie", "anne", "nathalie", "isabelle", "sophie", "thomas", "kevin", "nicolas", "pieter", "jan", "emma", "julie", "laura", "sarah", "lisa"],
  legalPageKeywords: ["mentions-legales", "legal", "vie-privee", "privacy"],
  teamPageKeywords: ["equipe", "notre-equipe", "a-propos", "team", "over-ons"],
};

// ═══════════════════════════════════════════
// REGISTRE ET FONCTIONS D'ACCÈS
// ═══════════════════════════════════════════

const COUNTRY_REGISTRY: Record<string, CountryConfig> = {
  FR: FRANCE,
  US: UNITED_STATES,
  GB: UNITED_KINGDOM,
  DE: GERMANY,
  ES: SPAIN,
  IT: ITALY,
  BR: BRAZIL,
  CA: CANADA,
  NL: NETHERLANDS,
  JP: JAPAN,
  IN: INDIA,
  AU: AUSTRALIA,
  MA: MOROCCO,
  AE: UAE,
  CH: SWITZERLAND,
  BE: BELGIUM,
};

/**
 * Récupère la config d'un pays par son code ISO
 */
export function getCountryConfig(code: string): CountryConfig | null {
  return COUNTRY_REGISTRY[code.toUpperCase()] || null;
}

/**
 * Liste tous les pays supportés
 */
export function getAllCountries(): { code: string; name: string; nameLocal: string }[] {
  return Object.values(COUNTRY_REGISTRY).map((c) => ({
    code: c.code,
    name: c.name,
    nameLocal: c.nameLocal,
  }));
}

/**
 * Récupère les formats de téléphone pour un pays
 */
export function getPhoneFormats(countryCode: string): PhoneFormat[] {
  return COUNTRY_REGISTRY[countryCode.toUpperCase()]?.phoneFormats || [];
}

/**
 * Extrait les numéros de téléphone selon le pays
 */
export function extractPhonesForCountry(html: string, countryCode: string): string[] {
  const config = getCountryConfig(countryCode);
  if (!config) return [];

  const phones: string[] = [];
  for (const format of config.phoneFormats) {
    const matches = html.match(format.regex) || [];
    phones.push(...matches.map((p) => p.trim()));
  }
  return [...new Set(phones)];
}

/**
 * Construit l'URL de recherche Google pour un pays donné
 */
export function buildSearchUrl(
  query: string,
  countryCode: string,
  maxResults: number = 20
): string {
  const config = getCountryConfig(countryCode);
  if (!config) {
    return `https://www.google.com/search?q=${encodeURIComponent(query)}&num=${maxResults}`;
  }

  const engine = config.searchEngines[0];
  return engine.searchUrl
    .replace("{query}", encodeURIComponent(query))
    .replace("{num}", String(maxResults));
}

/**
 * Récupère les annuaires professionnels pour un pays
 */
export function getDirectories(countryCode: string): DirectoryConfig[] {
  return COUNTRY_REGISTRY[countryCode.toUpperCase()]?.directories || [];
}
