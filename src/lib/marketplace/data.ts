/**
 * Mock data layer for the Veridian B2B sourcing marketplace.
 *
 * This stands in for the real supplier/category/product database. Every
 * page in `src/app/(marketplace routes)` reads through these helpers, so
 * swapping this file for real DB queries later is a drop-in replacement.
 */

export type SupplierType = "Manufacturer" | "Wholesaler" | "Distributor";

export interface Category {
  slug: string;
  name: string;
  glyph: string; // short 1-2 letter mark used in the abstract category icon
  description: string;
  supplierCount: number;
}

export interface Country {
  slug: string;
  name: string;
  flag: string;
  region: "North America" | "Europe" | "Asia" | "Middle East";
  supplierCount: number;
}

export interface Supplier {
  slug: string;
  name: string;
  tagline: string;
  countrySlug: string;
  type: SupplierType;
  categorySlugs: string[];
  verified: boolean;
  featured: boolean;
  rating: number;
  reviews: number;
  moqUnits: number;
  leadTimeMin: number;
  leadTimeMax: number;
  privateLabel: boolean;
  customPackaging: boolean;
  certifications: string[];
  yearsInBusiness: number;
  teamSize: string;
  responseRate: number;
  responseTimeLabel: string;
  ordersCompleted: number;
  badges: string[];
  about: string;
  factoryLocation: string;
  shippingRegions: string[];
  gradient: [string, string];
  initials: string;
}

export interface Product {
  slug: string;
  name: string;
  categorySlug: string;
  priceFrom: number;
  moqUnits: number;
  supplierCount: number;
  tags: ("Trending" | "High Demand" | "Low MOQ" | "Private Label")[];
  gradient: [string, string];
}

export const CATEGORIES: Category[] = [
  { slug: "fashion-apparel", name: "Fashion & Apparel", glyph: "FA", description: "Clothing, footwear and textile manufacturers ready for private label and wholesale orders.", supplierCount: 1842 },
  { slug: "beauty-cosmetics", name: "Beauty & Cosmetics", glyph: "BC", description: "Skincare, makeup and personal care formulators with private label and OEM capabilities.", supplierCount: 1206 },
  { slug: "electronics", name: "Electronics", glyph: "EL", description: "Consumer electronics, smart devices and components from certified manufacturers.", supplierCount: 2310 },
  { slug: "home-furniture", name: "Home & Furniture", glyph: "HF", description: "Furniture, decor and homeware manufacturers for retail and hospitality.", supplierCount: 987 },
  { slug: "jewelry-accessories", name: "Jewelry & Accessories", glyph: "JA", description: "Fine and fashion jewelry, watches and accessories manufacturers.", supplierCount: 654 },
  { slug: "food-beverage", name: "Food & Beverage", glyph: "FB", description: "Certified food and beverage producers for private label and bulk supply.", supplierCount: 743 },
  { slug: "packaging", name: "Packaging", glyph: "PK", description: "Sustainable and custom packaging manufacturers for every product category.", supplierCount: 512 },
  { slug: "fitness", name: "Fitness", glyph: "FT", description: "Activewear, equipment and supplement manufacturers built for scale.", supplierCount: 398 },
  { slug: "automotive", name: "Automotive", glyph: "AU", description: "Automotive parts, accessories and component manufacturers.", supplierCount: 621 },
  { slug: "pet-products", name: "Pet Products", glyph: "PP", description: "Pet food, accessories and grooming product manufacturers.", supplierCount: 287 },
  { slug: "baby-products", name: "Baby Products", glyph: "BP", description: "Certified baby and childcare product manufacturers.", supplierCount: 219 },
  { slug: "industrial", name: "Industrial", glyph: "IN", description: "Industrial equipment, tools and component suppliers worldwide.", supplierCount: 1104 },
  { slug: "private-label", name: "Private Label", glyph: "PL", description: "Suppliers specialized in white-label and custom-branded manufacturing.", supplierCount: 1560 },
  { slug: "print-on-demand", name: "Print on Demand", glyph: "PD", description: "Print-on-demand and low-MOQ production partners for online brands.", supplierCount: 176 },
];

export const COUNTRIES: Country[] = [
  { slug: "usa", name: "United States", flag: "🇺🇸", region: "North America", supplierCount: 1830 },
  { slug: "china", name: "China", flag: "🇨🇳", region: "Asia", supplierCount: 4210 },
  { slug: "india", name: "India", flag: "🇮🇳", region: "Asia", supplierCount: 1420 },
  { slug: "turkey", name: "Turkey", flag: "🇹🇷", region: "Europe", supplierCount: 980 },
  { slug: "uk", name: "United Kingdom", flag: "🇬🇧", region: "Europe", supplierCount: 610 },
  { slug: "germany", name: "Germany", flag: "🇩🇪", region: "Europe", supplierCount: 705 },
  { slug: "france", name: "France", flag: "🇫🇷", region: "Europe", supplierCount: 402 },
  { slug: "italy", name: "Italy", flag: "🇮🇹", region: "Europe", supplierCount: 388 },
  { slug: "south-korea", name: "South Korea", flag: "🇰🇷", region: "Asia", supplierCount: 560 },
  { slug: "vietnam", name: "Vietnam", flag: "🇻🇳", region: "Asia", supplierCount: 890 },
  { slug: "mexico", name: "Mexico", flag: "🇲🇽", region: "North America", supplierCount: 340 },
  { slug: "uae", name: "United Arab Emirates", flag: "🇦🇪", region: "Middle East", supplierCount: 265 },
];

const GRADIENTS: [string, string][] = [
  ["#2563EB", "#635BFF"],
  ["#0EA5E9", "#2563EB"],
  ["#635BFF", "#A855F7"],
  ["#111827", "#2563EB"],
  ["#0F172A", "#635BFF"],
  ["#1D4ED8", "#06B6D4"],
];

function grad(i: number): [string, string] {
  return GRADIENTS[i % GRADIENTS.length];
}

function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter((w) => w.length > 1 || /[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

interface SupplierSeed {
  name: string;
  tagline: string;
  countrySlug: string;
  type: SupplierType;
  categorySlugs: string[];
  rating: number;
  reviews: number;
  moqUnits: number;
  leadTimeMin: number;
  leadTimeMax: number;
  privateLabel: boolean;
  customPackaging: boolean;
  certifications: string[];
  yearsInBusiness: number;
  teamSize: string;
  responseRate: number;
  responseTimeLabel: string;
  ordersCompleted: number;
  featured?: boolean;
  about: string;
}

const SUPPLIER_SEEDS: SupplierSeed[] = [
  { name: "Lumina Cosmetics Labs", tagline: "Clean-formula skincare & color cosmetics OEM", countrySlug: "south-korea", type: "Manufacturer", categorySlugs: ["beauty-cosmetics", "private-label"], rating: 4.9, reviews: 128, moqUnits: 500, leadTimeMin: 15, leadTimeMax: 25, privateLabel: true, customPackaging: true, certifications: ["ISO 22716", "GMP", "Cruelty-Free"], yearsInBusiness: 12, teamSize: "150-250", responseRate: 96, responseTimeLabel: "< 6 hours", ordersCompleted: 1250, featured: true, about: "Lumina Cosmetics Labs formulates and manufactures skincare, color cosmetics and personal care lines for over 300 international brands, with full private label and custom packaging programs." },
  { name: "Atlas Denim Works", tagline: "Premium denim & woven apparel manufacturing", countrySlug: "turkey", type: "Manufacturer", categorySlugs: ["fashion-apparel", "private-label"], rating: 4.8, reviews: 96, moqUnits: 300, leadTimeMin: 20, leadTimeMax: 35, privateLabel: true, customPackaging: true, certifications: ["OEKO-TEX", "BSCI"], yearsInBusiness: 18, teamSize: "250-500", responseRate: 94, responseTimeLabel: "< 8 hours", ordersCompleted: 2100, featured: true, about: "Atlas Denim Works is a vertically integrated denim and woven apparel factory supplying premium fashion brands across Europe and North America." },
  { name: "Nordfield Furniture Co.", tagline: "Solid wood & upholstered furniture manufacturing", countrySlug: "vietnam", type: "Manufacturer", categorySlugs: ["home-furniture"], rating: 4.7, reviews: 74, moqUnits: 50, leadTimeMin: 30, leadTimeMax: 50, privateLabel: true, customPackaging: false, certifications: ["FSC", "ISO 9001"], yearsInBusiness: 15, teamSize: "500-1000", responseRate: 91, responseTimeLabel: "< 12 hours", ordersCompleted: 640, about: "Nordfield Furniture Co. produces solid wood and upholstered furniture for retail chains and hospitality groups worldwide." },
  { name: "Meridian Electronics Group", tagline: "Smart home & consumer electronics manufacturing", countrySlug: "china", type: "Manufacturer", categorySlugs: ["electronics"], rating: 4.8, reviews: 214, moqUnits: 200, leadTimeMin: 12, leadTimeMax: 20, privateLabel: true, customPackaging: true, certifications: ["CE", "FCC", "RoHS"], yearsInBusiness: 21, teamSize: "1000+", responseRate: 98, responseTimeLabel: "< 4 hours", ordersCompleted: 5400, featured: true, about: "Meridian Electronics Group designs and manufactures smart home devices, wearables and consumer electronics for global brands, from prototype to mass production." },
  { name: "Solstice Activewear Mfg", tagline: "Performance activewear & compression fabrics", countrySlug: "china", type: "Manufacturer", categorySlugs: ["fitness", "fashion-apparel", "private-label"], rating: 4.9, reviews: 152, moqUnits: 400, leadTimeMin: 18, leadTimeMax: 28, privateLabel: true, customPackaging: true, certifications: ["OEKO-TEX", "ISO 9001"], yearsInBusiness: 9, teamSize: "250-500", responseRate: 97, responseTimeLabel: "< 5 hours", ordersCompleted: 1830, featured: true, about: "Solstice Activewear Mfg specializes in premium compression and performance fabrics for activewear brands, offering full private label programs with MOQs under 500 units." },
  { name: "Carrara Fine Jewelry", tagline: "Fine jewelry & precious metal manufacturing", countrySlug: "italy", type: "Manufacturer", categorySlugs: ["jewelry-accessories"], rating: 4.9, reviews: 61, moqUnits: 50, leadTimeMin: 20, leadTimeMax: 40, privateLabel: true, customPackaging: true, certifications: ["RJC Certified"], yearsInBusiness: 34, teamSize: "50-150", responseRate: 92, responseTimeLabel: "< 10 hours", ordersCompleted: 380, about: "Carrara Fine Jewelry has crafted fine gold and silver jewelry for European luxury houses for three generations, now open to private label partners." },
  { name: "Harborline Packaging Co.", tagline: "Sustainable custom packaging manufacturing", countrySlug: "germany", type: "Manufacturer", categorySlugs: ["packaging"], rating: 4.7, reviews: 88, moqUnits: 1000, leadTimeMin: 10, leadTimeMax: 20, privateLabel: false, customPackaging: true, certifications: ["FSC", "ISO 14001"], yearsInBusiness: 16, teamSize: "150-250", responseRate: 95, responseTimeLabel: "< 6 hours", ordersCompleted: 980, about: "Harborline Packaging Co. manufactures sustainable, recyclable and custom-printed packaging solutions for e-commerce and retail brands." },
  { name: "Pacific Pantry Foods", tagline: "Private label food & beverage production", countrySlug: "usa", type: "Manufacturer", categorySlugs: ["food-beverage", "private-label"], rating: 4.6, reviews: 57, moqUnits: 2000, leadTimeMin: 14, leadTimeMax: 30, privateLabel: true, customPackaging: true, certifications: ["FDA", "SQF", "Organic"], yearsInBusiness: 11, teamSize: "150-250", responseRate: 90, responseTimeLabel: "< 8 hours", ordersCompleted: 512, about: "Pacific Pantry Foods is an FDA-certified co-manufacturer producing private label snacks, beverages and pantry staples for emerging and established food brands." },
  { name: "Titan Auto Components", tagline: "OEM automotive parts & accessories", countrySlug: "india", type: "Manufacturer", categorySlugs: ["automotive", "industrial"], rating: 4.5, reviews: 103, moqUnits: 500, leadTimeMin: 20, leadTimeMax: 35, privateLabel: false, customPackaging: false, certifications: ["ISO/TS 16949", "IATF 16949"], yearsInBusiness: 27, teamSize: "500-1000", responseRate: 89, responseTimeLabel: "< 14 hours", ordersCompleted: 1740, about: "Titan Auto Components manufactures OEM and aftermarket automotive parts for global tier-1 suppliers and distributors." },
  { name: "Willowmark Pet Co.", tagline: "Natural pet food & accessories manufacturing", countrySlug: "usa", type: "Manufacturer", categorySlugs: ["pet-products", "private-label"], rating: 4.8, reviews: 66, moqUnits: 300, leadTimeMin: 15, leadTimeMax: 25, privateLabel: true, customPackaging: true, certifications: ["FDA", "USDA Organic"], yearsInBusiness: 8, teamSize: "50-150", responseRate: 93, responseTimeLabel: "< 6 hours", ordersCompleted: 420, about: "Willowmark Pet Co. formulates natural pet food and manufactures pet accessories with full private label and custom packaging support." },
  { name: "Little Haven Baby Co.", tagline: "Certified baby apparel & accessories manufacturing", countrySlug: "vietnam", type: "Manufacturer", categorySlugs: ["baby-products", "fashion-apparel"], rating: 4.7, reviews: 44, moqUnits: 400, leadTimeMin: 18, leadTimeMax: 30, privateLabel: true, customPackaging: true, certifications: ["OEKO-TEX", "CPSIA"], yearsInBusiness: 10, teamSize: "150-250", responseRate: 94, responseTimeLabel: "< 7 hours", ordersCompleted: 355, about: "Little Haven Baby Co. manufactures certified-safe baby apparel, bedding and accessories for private label baby brands worldwide." },
  { name: "Cascade Industrial Supply", tagline: "Industrial tools & equipment manufacturing", countrySlug: "germany", type: "Manufacturer", categorySlugs: ["industrial"], rating: 4.6, reviews: 79, moqUnits: 100, leadTimeMin: 10, leadTimeMax: 25, privateLabel: false, customPackaging: false, certifications: ["ISO 9001", "CE"], yearsInBusiness: 40, teamSize: "500-1000", responseRate: 88, responseTimeLabel: "< 12 hours", ordersCompleted: 2210, about: "Cascade Industrial Supply engineers and manufactures precision industrial tools and equipment for distributors across Europe." },
  { name: "Everline Print Studio", tagline: "Low-MOQ print-on-demand production", countrySlug: "usa", type: "Manufacturer", categorySlugs: ["print-on-demand", "private-label"], rating: 4.8, reviews: 133, moqUnits: 1, leadTimeMin: 3, leadTimeMax: 10, privateLabel: true, customPackaging: true, certifications: ["OEKO-TEX"], yearsInBusiness: 6, teamSize: "50-150", responseRate: 97, responseTimeLabel: "< 3 hours", ordersCompleted: 3200, featured: true, about: "Everline Print Studio runs on-demand apparel and accessory production with no minimum order quantity, built for direct-to-consumer brands." },
  { name: "Bosphorus Textile Mills", tagline: "Knitwear & sustainable textile manufacturing", countrySlug: "turkey", type: "Manufacturer", categorySlugs: ["fashion-apparel"], rating: 4.7, reviews: 91, moqUnits: 250, leadTimeMin: 15, leadTimeMax: 30, privateLabel: true, customPackaging: false, certifications: ["GOTS", "OEKO-TEX"], yearsInBusiness: 22, teamSize: "500-1000", responseRate: 92, responseTimeLabel: "< 8 hours", ordersCompleted: 1620, about: "Bosphorus Textile Mills produces sustainable knitwear and woven fabrics for European fashion labels, with GOTS-certified organic cotton lines." },
  { name: "Aurora Beauty Manufacturing", tagline: "Clean beauty & haircare private label", countrySlug: "france", type: "Manufacturer", categorySlugs: ["beauty-cosmetics", "private-label"], rating: 4.9, reviews: 102, moqUnits: 1000, leadTimeMin: 20, leadTimeMax: 35, privateLabel: true, customPackaging: true, certifications: ["ISO 22716", "Ecocert"], yearsInBusiness: 14, teamSize: "150-250", responseRate: 95, responseTimeLabel: "< 6 hours", ordersCompleted: 890, about: "Aurora Beauty Manufacturing is a French cosmetics lab specializing in clean and natural formulations for haircare and skincare private label brands." },
  { name: "Redwood Wholesale Distribution", tagline: "Multi-category wholesale distribution", countrySlug: "usa", type: "Wholesaler", categorySlugs: ["home-furniture", "electronics"], rating: 4.4, reviews: 48, moqUnits: 25, leadTimeMin: 5, leadTimeMax: 15, privateLabel: false, customPackaging: false, certifications: ["ISO 9001"], yearsInBusiness: 19, teamSize: "150-250", responseRate: 87, responseTimeLabel: "< 10 hours", ordersCompleted: 3050, about: "Redwood Wholesale Distribution supplies retailers across North America with home goods and electronics sourced from vetted manufacturers." },
  { name: "Seoul Skin Sciences", tagline: "K-beauty innovation lab & OEM", countrySlug: "south-korea", type: "Manufacturer", categorySlugs: ["beauty-cosmetics"], rating: 4.9, reviews: 176, moqUnits: 500, leadTimeMin: 15, leadTimeMax: 25, privateLabel: true, customPackaging: true, certifications: ["ISO 22716", "CPNP"], yearsInBusiness: 13, teamSize: "250-500", responseRate: 98, responseTimeLabel: "< 4 hours", ordersCompleted: 2680, featured: true, about: "Seoul Skin Sciences develops next-generation K-beauty formulations, from sheet masks to serums, with rapid private label turnaround." },
  { name: "Dune & Co. Leather Goods", tagline: "Leather bags, belts & accessories manufacturing", countrySlug: "italy", type: "Manufacturer", categorySlugs: ["fashion-apparel", "jewelry-accessories"], rating: 4.8, reviews: 53, moqUnits: 100, leadTimeMin: 25, leadTimeMax: 40, privateLabel: true, customPackaging: true, certifications: ["LWG Certified"], yearsInBusiness: 29, teamSize: "50-150", responseRate: 90, responseTimeLabel: "< 12 hours", ordersCompleted: 410, about: "Dune & Co. Leather Goods handcrafts leather bags, belts and small accessories in Tuscany for private label fashion brands." },
  { name: "BrightGrid Components", tagline: "Electronic components & PCB manufacturing", countrySlug: "china", type: "Manufacturer", categorySlugs: ["electronics", "industrial"], rating: 4.6, reviews: 189, moqUnits: 1000, leadTimeMin: 10, leadTimeMax: 20, privateLabel: false, customPackaging: false, certifications: ["ISO 9001", "RoHS"], yearsInBusiness: 17, teamSize: "500-1000", responseRate: 93, responseTimeLabel: "< 6 hours", ordersCompleted: 4120, about: "BrightGrid Components manufactures electronic components and custom PCBs at scale for OEM and ODM partners worldwide." },
  { name: "Kingsley Home Textiles", tagline: "Bedding, towels & home textile manufacturing", countrySlug: "india", type: "Manufacturer", categorySlugs: ["home-furniture", "private-label"], rating: 4.7, reviews: 84, moqUnits: 300, leadTimeMin: 20, leadTimeMax: 35, privateLabel: true, customPackaging: true, certifications: ["OEKO-TEX", "GOTS"], yearsInBusiness: 24, teamSize: "500-1000", responseRate: 91, responseTimeLabel: "< 9 hours", ordersCompleted: 1360, about: "Kingsley Home Textiles weaves and manufactures bedding, towels and home textiles for private label home brands across the globe." },
  { name: "Falcon Fitness Equipment", tagline: "Gym equipment & strength training manufacturing", countrySlug: "china", type: "Manufacturer", categorySlugs: ["fitness", "industrial"], rating: 4.5, reviews: 67, moqUnits: 50, leadTimeMin: 20, leadTimeMax: 40, privateLabel: true, customPackaging: false, certifications: ["ISO 9001", "CE"], yearsInBusiness: 15, teamSize: "250-500", responseRate: 89, responseTimeLabel: "< 10 hours", ordersCompleted: 780, about: "Falcon Fitness Equipment manufactures commercial and home gym equipment, from strength racks to compact home sets." },
  { name: "Cobalt Wholesale Trading", tagline: "Global electronics & gadget distribution", countrySlug: "uae", type: "Distributor", categorySlugs: ["electronics"], rating: 4.3, reviews: 39, moqUnits: 20, leadTimeMin: 5, leadTimeMax: 12, privateLabel: false, customPackaging: false, certifications: ["ISO 9001"], yearsInBusiness: 9, teamSize: "50-150", responseRate: 85, responseTimeLabel: "< 14 hours", ordersCompleted: 1920, about: "Cobalt Wholesale Trading distributes consumer electronics and gadgets across the Middle East and North Africa." },
  { name: "Northline Sportswear", tagline: "Team sportswear & uniform manufacturing", countrySlug: "mexico", type: "Manufacturer", categorySlugs: ["fashion-apparel", "fitness"], rating: 4.6, reviews: 41, moqUnits: 150, leadTimeMin: 15, leadTimeMax: 28, privateLabel: true, customPackaging: false, certifications: ["OEKO-TEX"], yearsInBusiness: 12, teamSize: "150-250", responseRate: 90, responseTimeLabel: "< 9 hours", ordersCompleted: 560, about: "Northline Sportswear manufactures team uniforms and sportswear for North American brands with nearshoring lead times." },
  { name: "Amberlight Candle Co.", tagline: "Private label candles & home fragrance", countrySlug: "uk", type: "Manufacturer", categorySlugs: ["home-furniture", "private-label"], rating: 4.8, reviews: 58, moqUnits: 200, leadTimeMin: 12, leadTimeMax: 22, privateLabel: true, customPackaging: true, certifications: ["IFRA Compliant"], yearsInBusiness: 7, teamSize: "50-150", responseRate: 94, responseTimeLabel: "< 5 hours", ordersCompleted: 330, about: "Amberlight Candle Co. formulates and manufactures private label candles and home fragrance products for DTC brands." },
  { name: "Verona Watch Manufactory", tagline: "Precision watch assembly & branding", countrySlug: "italy", type: "Manufacturer", categorySlugs: ["jewelry-accessories"], rating: 4.9, reviews: 37, moqUnits: 100, leadTimeMin: 25, leadTimeMax: 45, privateLabel: true, customPackaging: true, certifications: ["Swiss Movement Certified"], yearsInBusiness: 20, teamSize: "50-150", responseRate: 91, responseTimeLabel: "< 11 hours", ordersCompleted: 265, about: "Verona Watch Manufactory assembles precision timepieces with full custom dial, case and packaging branding for watch startups." },
  { name: "Highland Organic Foods", tagline: "Organic snack & beverage co-manufacturing", countrySlug: "uk", type: "Manufacturer", categorySlugs: ["food-beverage"], rating: 4.7, reviews: 52, moqUnits: 1500, leadTimeMin: 15, leadTimeMax: 25, privateLabel: true, customPackaging: true, certifications: ["Organic UK", "BRC"], yearsInBusiness: 10, teamSize: "50-150", responseRate: 92, responseTimeLabel: "< 7 hours", ordersCompleted: 410, about: "Highland Organic Foods co-manufactures organic snacks and beverages for private label brands across the UK and EU." },
];

export const SUPPLIERS: Supplier[] = SUPPLIER_SEEDS.map((s, i) => {
  const badges: string[] = [];
  if (s.rating >= 4.8) badges.push("Top Rated");
  if (s.responseRate >= 95) badges.push("Fast Response");
  if (s.privateLabel) badges.push("Private Label");
  if (s.moqUnits <= 100) badges.push("Low MOQ");
  if (s.featured) badges.push("Premium Supplier");
  if (s.type === "Manufacturer") badges.push("Manufacturer");
  if (s.type === "Wholesaler") badges.push("Wholesaler");

  return {
    slug: s.name
      .toLowerCase()
      .replace(/[&.]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    name: s.name,
    tagline: s.tagline,
    countrySlug: s.countrySlug,
    type: s.type,
    categorySlugs: s.categorySlugs,
    verified: true,
    featured: !!s.featured,
    rating: s.rating,
    reviews: s.reviews,
    moqUnits: s.moqUnits,
    leadTimeMin: s.leadTimeMin,
    leadTimeMax: s.leadTimeMax,
    privateLabel: s.privateLabel,
    customPackaging: s.customPackaging,
    certifications: s.certifications,
    yearsInBusiness: s.yearsInBusiness,
    teamSize: s.teamSize,
    responseRate: s.responseRate,
    responseTimeLabel: s.responseTimeLabel,
    ordersCompleted: s.ordersCompleted,
    badges,
    about: s.about,
    factoryLocation: `${COUNTRIES.find((c) => c.slug === s.countrySlug)?.name ?? s.countrySlug}`,
    shippingRegions: ["North America", "Europe", "Asia"],
    gradient: grad(i),
    initials: initialsOf(s.name),
  };
});

export const PRODUCTS: Product[] = [
  { slug: "led-beauty-mask", name: "LED Beauty Mask", categorySlug: "beauty-cosmetics", priceFrom: 6.2, moqUnits: 200, supplierCount: 24, tags: ["Trending", "Private Label"], gradient: grad(0) },
  { slug: "minimalist-watches", name: "Minimalist Watches", categorySlug: "jewelry-accessories", priceFrom: 9.5, moqUnits: 100, supplierCount: 18, tags: ["High Demand"], gradient: grad(1) },
  { slug: "organic-skincare-set", name: "Organic Skincare Set", categorySlug: "beauty-cosmetics", priceFrom: 4.8, moqUnits: 250, supplierCount: 32, tags: ["Trending", "Low MOQ"], gradient: grad(2) },
  { slug: "gym-sets", name: "Gym Sets", categorySlug: "fitness", priceFrom: 11.4, moqUnits: 150, supplierCount: 21, tags: ["High Demand", "Private Label"], gradient: grad(3) },
  { slug: "luxury-packaging", name: "Luxury Packaging", categorySlug: "packaging", priceFrom: 0.85, moqUnits: 1000, supplierCount: 29, tags: ["Trending"], gradient: grad(4) },
  { slug: "smart-home-devices", name: "Smart Home Devices", categorySlug: "electronics", priceFrom: 14.9, moqUnits: 200, supplierCount: 27, tags: ["High Demand"], gradient: grad(5) },
  { slug: "activewear-leggings", name: "Activewear Leggings", categorySlug: "fitness", priceFrom: 5.6, moqUnits: 300, supplierCount: 22, tags: ["Trending", "Private Label"], gradient: grad(0) },
  { slug: "eco-tote-bags", name: "Eco Tote Bags", categorySlug: "packaging", priceFrom: 1.2, moqUnits: 500, supplierCount: 16, tags: ["Low MOQ"], gradient: grad(1) },
];

// ── Helpers ──────────────────────────────────────────────

export function getAllCategories() {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getAllCountries() {
  return COUNTRIES;
}

export function getCountryBySlug(slug: string) {
  return COUNTRIES.find((c) => c.slug === slug);
}

export function getAllSuppliers() {
  return SUPPLIERS;
}

export function getSupplierBySlug(slug: string) {
  return SUPPLIERS.find((s) => s.slug === slug);
}

export function getFeaturedSuppliers() {
  return SUPPLIERS.filter((s) => s.featured);
}

export function getSuppliersByCategory(categorySlug: string) {
  return SUPPLIERS.filter((s) => s.categorySlugs.includes(categorySlug));
}

export function getSuppliersByCountry(countrySlug: string) {
  return SUPPLIERS.filter((s) => s.countrySlug === countrySlug);
}

export function getSuppliersByCategoryAndCountry(categorySlug: string, countrySlug: string) {
  return SUPPLIERS.filter((s) => s.categorySlugs.includes(categorySlug) && s.countrySlug === countrySlug);
}

export function getAllProducts() {
  return PRODUCTS;
}

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function formatLeadTime(s: Pick<Supplier, "leadTimeMin" | "leadTimeMax">) {
  return `${s.leadTimeMin}–${s.leadTimeMax} days`;
}

export function formatMOQ(units: number) {
  return units === 1 ? "No minimum" : `${units.toLocaleString("en-US")} units`;
}
