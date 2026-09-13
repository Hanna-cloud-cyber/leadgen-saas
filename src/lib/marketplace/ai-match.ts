import { SUPPLIERS, type Supplier } from "./data";

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "fashion-apparel": ["clothing", "apparel", "fashion", "denim", "garment", "textile", "wear", "shirt", "dress"],
  "beauty-cosmetics": ["beauty", "cosmetic", "skincare", "makeup", "serum", "cream"],
  electronics: ["electronics", "gadget", "device", "smart home", "wearable", "pcb"],
  "home-furniture": ["furniture", "home decor", "homeware", "furnishing", "sofa", "chair"],
  "jewelry-accessories": ["jewelry", "watch", "accessory", "accessories", "necklace", "bracelet"],
  "food-beverage": ["food", "beverage", "snack", "drink", "organic"],
  packaging: ["packaging", "box", "bottle", "eco packaging"],
  fitness: ["fitness", "activewear", "gym", "sportswear", "workout", "leggings", "compression"],
  automotive: ["automotive", "car part", "auto part"],
  "pet-products": ["pet", "dog", "cat"],
  "baby-products": ["baby", "infant", "childcare", "toddler"],
  industrial: ["industrial", "tool", "equipment", "machinery"],
  "private-label": ["private label", "white label", "oem", "own brand"],
  "print-on-demand": ["print on demand", "pod", "no moq", "no minimum"],
};

const REGION_KEYWORDS: Record<string, string[]> = {
  "North America": ["us", "usa", "united states", "america", "north america", "canada"],
  Europe: ["europe", "eu", "uk", "britain", "germany", "france", "italy"],
  Asia: ["asia", "china", "korea", "vietnam", "india"],
  "Middle East": ["middle east", "uae", "dubai"],
};

export interface MatchResult {
  supplier: Supplier;
  score: number;
  reasons: string[];
}

export function matchSuppliers(description: string): MatchResult[] {
  const text = description.toLowerCase();

  const matchedCategories = Object.entries(CATEGORY_KEYWORDS)
    .filter(([, keywords]) => keywords.some((k) => text.includes(k)))
    .map(([slug]) => slug);

  const matchedRegions = Object.entries(REGION_KEYWORDS)
    .filter(([, keywords]) => keywords.some((k) => text.includes(k)))
    .map(([region]) => region);

  const wantsPrivateLabel = /private label|white label|own brand|custom brand/.test(text);
  const wantsLowMoq = /low moq|no minimum|small (batch|order)/.test(text);

  const moqMatch = text.match(/(?:under|less than|below|max(?:imum)?)\s*(\d{1,6})/);
  const targetMoq = moqMatch ? parseInt(moqMatch[1], 10) : undefined;

  const results: MatchResult[] = SUPPLIERS.map((supplier) => {
    let score = 40; // baseline
    const reasons: string[] = [];

    if (matchedCategories.length > 0) {
      const overlap = supplier.categorySlugs.filter((c) => matchedCategories.includes(c));
      if (overlap.length > 0) {
        score += 28;
        reasons.push("Matches your product category");
      } else {
        score -= 20;
      }
    }

    if (targetMoq !== undefined) {
      if (supplier.moqUnits <= targetMoq) {
        score += 14;
        reasons.push(`MOQ compatible (${supplier.moqUnits.toLocaleString("en-US")} units or fewer)`);
      } else {
        score -= 12;
      }
    } else if (wantsLowMoq && supplier.moqUnits <= 300) {
      score += 10;
      reasons.push("Low minimum order quantity");
    }

    if (wantsPrivateLabel) {
      if (supplier.privateLabel) {
        score += 12;
        reasons.push("Private label available");
      } else {
        score -= 10;
      }
    }

    if (matchedRegions.length > 0) {
      if (matchedRegions.some((r) => supplier.shippingRegions.includes(r))) {
        score += 10;
        reasons.push(`Ships to ${matchedRegions[0]}`);
      }
    }

    if (supplier.rating >= 4.8) {
      score += 6;
      reasons.push("Strong buyer reviews");
    }
    if (supplier.responseRate >= 95) {
      score += 4;
      reasons.push("Fast, reliable response rate");
    }
    if (supplier.featured) score += 4;

    score = Math.max(8, Math.min(99, Math.round(score)));

    return { supplier, score, reasons: reasons.slice(0, 4) };
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 6);
}
