export interface Country {
  code: string;
  name: string;
  flag: string;
  group: string;
  famousThings: string[];
  colors: [string, string]; // primary, secondary
  icons: string[]; // emoji icons representing the country
}

export const WORLD_CUP_COUNTRIES: Country[] = [
  // Groupe A
  { code: "us", name: "États-Unis", flag: "🇺🇸", group: "A", famousThings: ["Statue de la Liberté", "Aigle", "Basketball", "Hollywood"], colors: ["#002868", "#BF0A30"], icons: ["🗽", "🦅", "🏀", "🎬"] },
  { code: "mx", name: "Mexique", flag: "🇲🇽", group: "A", famousThings: ["Sombrero", "Cactus", "Tacos", "Luchador"], colors: ["#006847", "#CE1126"], icons: ["🌮", "🌵", "🎭", "🦅"] },
  { code: "ca", name: "Canada", flag: "🇨🇦", group: "A", famousThings: ["Érable", "Hockey", "Orignal", "Sirop d'érable"], colors: ["#FF0000", "#FFFFFF"], icons: ["🍁", "🏒", "🫎", "🍯"] },
  { code: "co", name: "Colombie", flag: "🇨🇴", group: "A", famousThings: ["Café", "Cumbia", "Émeraudes", "Carnaval"], colors: ["#FCD116", "#003893"], icons: ["☕", "💃", "💎", "🎉"] },

  // Groupe B
  { code: "br", name: "Brésil", flag: "🇧🇷", group: "B", famousThings: ["Samba", "Christ Rédempteur", "Carnaval", "Pelé"], colors: ["#009C3B", "#FFDF00"], icons: ["💃", "⛪", "🎭", "⚽"] },
  { code: "ar", name: "Argentine", flag: "🇦🇷", group: "B", famousThings: ["Tango", "Maradona", "Mate", "Gaucho"], colors: ["#74ACDF", "#FFFFFF"], icons: ["💃", "⚽", "🧉", "🤠"] },
  { code: "fr", name: "France", flag: "🇫🇷", group: "B", famousThings: ["Tour Eiffel", "Baguette", "Vin", "Béret"], colors: ["#002395", "#ED2939"], icons: ["🗼", "🥖", "🍷", "👨‍🎨"] },
  { code: "de", name: "Allemagne", flag: "🇩🇪", group: "B", famousThings: ["Bretzel", "Bière", "Château Neuschwanstein", "Automobile"], colors: ["#000000", "#DD0000"], icons: ["🥨", "🍺", "🏰", "🚗"] },

  // Groupe C
  { code: "es", name: "Espagne", flag: "🇪🇸", group: "C", famousThings: ["Flamenco", "Taureau", "Paella", "Sagrada Familia"], colors: ["#AA151B", "#F1BF00"], icons: ["💃", "🐂", "🥘", "⛪"] },
  { code: "pt", name: "Portugal", flag: "🇵🇹", group: "C", famousThings: ["Pastéis de Nata", "Fado", "Coq", "Azulejos"], colors: ["#006600", "#FF0000"], icons: ["🍮", "🎵", "🐓", "🎨"] },
  { code: "gb-eng", name: "Angleterre", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "C", famousThings: ["Big Ben", "Thé", "Double-decker", "Queen's Guard"], colors: ["#FFFFFF", "#CE1124"], icons: ["🕐", "🫖", "🚌", "💂"] },
  { code: "nl", name: "Pays-Bas", flag: "🇳🇱", group: "C", famousThings: ["Tulipes", "Moulin", "Fromage", "Vélo"], colors: ["#FF6600", "#FFFFFF"], icons: ["🌷", "🌬️", "🧀", "🚲"] },

  // Groupe D
  { code: "it", name: "Italie", flag: "🇮🇹", group: "D", famousThings: ["Pizza", "Colisée", "Vespa", "Gondole"], colors: ["#008C45", "#CD212A"], icons: ["🍕", "🏛️", "🛵", "🛶"] },
  { code: "jp", name: "Japon", flag: "🇯🇵", group: "D", famousThings: ["Sakura", "Sushi", "Samurai", "Mont Fuji"], colors: ["#FFFFFF", "#BC002D"], icons: ["🌸", "🍣", "⛩️", "🗻"] },
  { code: "kr", name: "Corée du Sud", flag: "🇰🇷", group: "D", famousThings: ["K-pop", "Kimchi", "Taekwondo", "Temple"], colors: ["#003478", "#C60C30"], icons: ["🎤", "🥬", "🥋", "🏯"] },
  { code: "sn", name: "Sénégal", flag: "🇸🇳", group: "D", famousThings: ["Baobab", "Teranga", "Djembé", "Thiéboudienne"], colors: ["#00853F", "#FDEF42"], icons: ["🌳", "🤝", "🥁", "🐟"] },

  // Groupe E
  { code: "ma", name: "Maroc", flag: "🇲🇦", group: "E", famousThings: ["Tajine", "Mosquée Hassan II", "Thé à la menthe", "Souk"], colors: ["#C1272D", "#006233"], icons: ["🫖", "🕌", "🌿", "🏪"] },
  { code: "ng", name: "Nigeria", flag: "🇳🇬", group: "E", famousThings: ["Afrobeat", "Nollywood", "Jollof Rice", "Super Eagles"], colors: ["#008751", "#FFFFFF"], icons: ["🎵", "🎬", "🍚", "🦅"] },
  { code: "eg", name: "Égypte", flag: "🇪🇬", group: "E", famousThings: ["Pyramides", "Sphinx", "Nil", "Pharaon"], colors: ["#CE1126", "#000000"], icons: ["🔺", "🐪", "🏜️", "👑"] },
  { code: "sa", name: "Arabie Saoudite", flag: "🇸🇦", group: "E", famousThings: ["Désert", "Pétrole", "Faucon", "Datte"], colors: ["#006C35", "#FFFFFF"], icons: ["🏜️", "🛢️", "🦅", "🌴"] },

  // Groupe F
  { code: "au", name: "Australie", flag: "🇦🇺", group: "F", famousThings: ["Kangourou", "Opéra de Sydney", "Boomerang", "Koala"], colors: ["#00008B", "#FFD700"], icons: ["🦘", "🏛️", "🪃", "🐨"] },
  { code: "gh", name: "Ghana", flag: "🇬🇭", group: "F", famousThings: ["Kente", "Cacao", "Highlife", "Black Stars"], colors: ["#006B3F", "#FCD116"], icons: ["🎨", "🍫", "🎵", "⭐"] },
  { code: "hr", name: "Croatie", flag: "🇭🇷", group: "F", famousThings: ["Damier", "Cravate", "Dubrovnik", "Lavande"], colors: ["#FF0000", "#0000FF"], icons: ["🟥", "👔", "🏰", "💜"] },
  { code: "uy", name: "Uruguay", flag: "🇺🇾", group: "F", famousThings: ["Mate", "Tango", "Carnaval", "Asado"], colors: ["#001489", "#FFFFFF"], icons: ["🧉", "💃", "🎭", "🥩"] },

  // Groupe G
  { code: "cm", name: "Cameroun", flag: "🇨🇲", group: "G", famousThings: ["Lions Indomptables", "Mont Cameroun", "Makossa", "Ndolé"], colors: ["#007A5E", "#CE1126"], icons: ["🦁", "🏔️", "🎵", "🍲"] },
  { code: "ch", name: "Suisse", flag: "🇨🇭", group: "G", famousThings: ["Chocolat", "Montre", "Alpes", "Fromage"], colors: ["#FF0000", "#FFFFFF"], icons: ["🍫", "⌚", "🏔️", "🧀"] },
  { code: "rs", name: "Serbie", flag: "🇷🇸", group: "G", famousThings: ["Tennis", "Monastères", "Ćevapi", "Folklore"], colors: ["#C6363C", "#0C4076"], icons: ["🎾", "⛪", "🥙", "🎶"] },
  { code: "cl", name: "Chili", flag: "🇨🇱", group: "G", famousThings: ["Andes", "Vin", "Île de Pâques", "Empanadas"], colors: ["#D52B1E", "#0039A6"], icons: ["🏔️", "🍷", "🗿", "🥟"] },

  // Groupe H
  { code: "be", name: "Belgique", flag: "🇧🇪", group: "H", famousThings: ["Gaufre", "Chocolat", "Bande dessinée", "Bière"], colors: ["#000000", "#FDDA24"], icons: ["🧇", "🍫", "📖", "🍺"] },
  { code: "dk", name: "Danemark", flag: "🇩🇰", group: "H", famousThings: ["LEGO", "Sirène", "Hygge", "Viking"], colors: ["#C60C30", "#FFFFFF"], icons: ["🧱", "🧜‍♀️", "🕯️", "⚔️"] },
  { code: "ec", name: "Équateur", flag: "🇪🇨", group: "H", famousThings: ["Galápagos", "Banane", "Volcan", "Chapeau Panama"], colors: ["#FFD100", "#034EA2"], icons: ["🐢", "🍌", "🌋", "🎩"] },
  { code: "tn", name: "Tunisie", flag: "🇹🇳", group: "H", famousThings: ["Carthage", "Couscous", "Jasmin", "Médina"], colors: ["#E70013", "#FFFFFF"], icons: ["🏛️", "🥘", "🌺", "🏘️"] },
];

export type ProductType = "case" | "crocs";

export interface Product {
  id: string;
  type: ProductType;
  countryCode: string;
  name: string;
  description: string;
  price: number;
  variants?: string[];
}

export function getCountryByCode(code: string): Country | undefined {
  return WORLD_CUP_COUNTRIES.find(c => c.code === code);
}

export function getCountriesByGroup(group: string): Country[] {
  return WORLD_CUP_COUNTRIES.filter(c => c.group === group);
}

export function generateProducts(country: Country): Product[] {
  return [
    {
      id: `case-${country.code}`,
      type: "case",
      countryCode: country.code,
      name: `Coque ${country.name} ${country.flag}`,
      description: `Coque de téléphone personnalisée aux couleurs de ${country.name} avec drapeau et symboles emblématiques : ${country.famousThings.join(", ")}`,
      price: 19.99,
      variants: ["iPhone 15", "iPhone 15 Pro", "iPhone 16", "iPhone 16 Pro", "Samsung S24", "Samsung S25"],
    },
    {
      id: `crocs-${country.code}`,
      type: "crocs",
      countryCode: country.code,
      name: `Crocs ${country.name} ${country.flag}`,
      description: `Crocs personnalisées avec stickers drapeau ${country.name} et charms : ${country.icons.join(" ")} — ${country.famousThings.join(", ")}`,
      price: 49.99,
      variants: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    },
  ];
}

export function getAllProducts(): Product[] {
  return WORLD_CUP_COUNTRIES.flatMap(generateProducts);
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find(p => p.id === id);
}

export const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H"];
