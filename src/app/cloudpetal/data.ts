import { getProductsByCollectionHandle, shopifyConfigured } from "@/lib/shopify";

export type ProductIcon = "oil" | "cleanser" | "toner" | "serum" | "cream" | "spf";

export type CatalogProduct = {
  id: string;
  handle: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  compareAt: number | null;
  variantId: string | null;
  icon: ProductIcon;
  accent: string;
};

const COLLECTION_HANDLE = process.env.CLOUDPETAL_COLLECTION_HANDLE || "cloudpetal-ritual";

export const fallbackCatalog: CatalogProduct[] = [
  {
    id: "cleansing-oil",
    handle: "petal-cleansing-oil",
    title: "Petal Cleansing Oil",
    tagline: "First-step makeup & sunscreen melt",
    description:
      "A botanical oil cleanser that dissolves SPF and makeup without stripping the skin barrier.",
    price: 19,
    compareAt: 26,
    variantId: null,
    icon: "oil",
    accent: "#d99a3f",
  },
  {
    id: "rice-cleanser",
    handle: "rice-milk-cleanser",
    title: "Rice Milk Cleanser",
    tagline: "Gentle everyday gel cleanser",
    description: "A low-pH gel cleanser with fermented rice extract for a soft, never-tight finish.",
    price: 16,
    compareAt: 22,
    variantId: null,
    icon: "cleanser",
    accent: "#8fae8b",
  },
  {
    id: "plum-toner",
    handle: "plum-glow-toner",
    title: "Plum Glow Toner",
    tagline: "AHA/BHA resurfacing toner",
    description: "Gently exfoliates and preps skin for the rest of your routine, without over-drying.",
    price: 18,
    compareAt: 24,
    variantId: null,
    icon: "toner",
    accent: "#a7c9a0",
  },
  {
    id: "silk-serum",
    handle: "silk-barrier-serum",
    title: "Silk Barrier Serum",
    tagline: "Niacinamide + peptide serum",
    description: "Brightens tone and strengthens the moisture barrier with a lightweight, fast-absorbing feel.",
    price: 22,
    compareAt: 29,
    variantId: null,
    icon: "serum",
    accent: "#e0b84f",
  },
  {
    id: "cloud-cream",
    handle: "cloud-cream",
    title: "Cloud Cream",
    tagline: "Ceramide moisture cream",
    description: "A rich but breathable cream that locks in hydration for 24 hours.",
    price: 24,
    compareAt: 32,
    variantId: null,
    icon: "cream",
    accent: "#efe6d8",
  },
  {
    id: "daily-shield",
    handle: "daily-shield-spf-30",
    title: "Daily Shield SPF 30",
    tagline: "Mineral daily sunscreen",
    description: "A lightweight, no-white-cast mineral sunscreen for everyday wear under makeup.",
    price: 20,
    compareAt: 27,
    variantId: null,
    icon: "spf",
    accent: "#c9e0d8",
  },
];

const ICON_BY_HANDLE: Record<string, ProductIcon> = Object.fromEntries(
  fallbackCatalog.map((p) => [p.handle, p.icon])
);
const ACCENT_BY_HANDLE: Record<string, string> = Object.fromEntries(
  fallbackCatalog.map((p) => [p.handle, p.accent])
);

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export async function getCloudpetalCatalog(): Promise<{
  products: CatalogProduct[];
  shopifyEnabled: boolean;
}> {
  if (!shopifyConfigured) {
    return { products: fallbackCatalog, shopifyEnabled: false };
  }

  try {
    const products = await getProductsByCollectionHandle(COLLECTION_HANDLE);
    if (!products || products.length === 0) {
      return { products: fallbackCatalog, shopifyEnabled: false };
    }

    const mapped: CatalogProduct[] = products.map((p) => {
      const variant = p.variants.find((v) => v.availableForSale) ?? p.variants[0] ?? null;
      const price = Number(p.priceRange.minVariantPrice.amount);
      const compareAt = Number(p.compareAtPriceRange.minVariantPrice.amount);
      return {
        id: p.handle,
        handle: p.handle,
        title: p.title,
        tagline: "",
        description: stripHtml(p.descriptionHtml),
        price,
        compareAt: compareAt > price ? compareAt : null,
        variantId: variant?.id ?? null,
        icon: ICON_BY_HANDLE[p.handle] ?? "cream",
        accent: ACCENT_BY_HANDLE[p.handle] ?? "#d9c9a8",
      };
    });

    return { products: mapped, shopifyEnabled: true };
  } catch (err) {
    console.error("[cloudpetal] Shopify collection fetch failed, using demo catalog:", err);
    return { products: fallbackCatalog, shopifyEnabled: false };
  }
}
