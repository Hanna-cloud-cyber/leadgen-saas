import { getProductByHandle, shopifyConfigured } from "@/lib/shopify";

export type Finish = {
  id: string;
  label: string;
  swatch: string;
};

export const fallbackFinishes: Finish[] = [
  { id: "rose-gold", label: "Rose Gold", swatch: "#b76e79" },
  { id: "matte-black", label: "Matte Black", swatch: "#1b1b1b" },
  { id: "pearl-white", label: "Pearl White", swatch: "#f3efe8" },
];

export const fallbackPrice = 129;
export const fallbackCompareAt = 219;

export type Bundle = {
  id: string;
  qty: number;
  label: string;
  sublabel: string;
  price: number;
  compareAt: number;
  badge?: string;
};

// Bundle pricing is a merchandising construct, not a Shopify catalog price:
// it's what the page *shows* per bundle. What the customer actually pays is
// enforced by a Shopify "Buy X" automatic discount configured in
// Marketing → Discounts (see README-LUCENTDERM.md). Keep these numbers in
// sync with that discount by hand.
export const bundles: Bundle[] = [
  {
    id: "solo",
    qty: 1,
    label: "1 Wand",
    sublabel: "Try it yourself",
    price: 129,
    compareAt: 219,
  },
  {
    id: "duo",
    qty: 2,
    label: "Share the Glow",
    sublabel: "One for you, one to gift",
    price: 228,
    compareAt: 438,
    badge: "MOST POPULAR",
  },
  {
    id: "trio",
    qty: 3,
    label: "Family Ritual",
    sublabel: "Free shipping included",
    price: 297,
    compareAt: 657,
    badge: "BEST VALUE",
  },
];

export const reviewBreakdown = [
  { stars: 5, count: 312 },
  { stars: 4, count: 61 },
  { stars: 3, count: 14 },
  { stars: 2, count: 4 },
  { stars: 1, count: 2 },
];

export const reviewTotal = reviewBreakdown.reduce((acc, r) => acc + r.count, 0);
export const reviewAverage = 4.8;

// Placeholder reviews — written as examples of tone/length, not sourced from
// any real customer. Swap these for genuine LucentDerm reviews (with real
// customer names/photos, with their consent) as soon as you have them, or
// connect a reviews app (Judge.me, Loox, Yotpo...) to pull real ones in.
export const reviews = [
  {
    name: "Sofia N.",
    rating: 5,
    text: "My skin looks so much calmer after just two weeks. It only takes 3 minutes and it genuinely feels like a mini facial.",
  },
  {
    name: "Marcus D.",
    rating: 5,
    text: "Was skeptical about an LED wand, but the difference in my texture is real. Cordless and quiet enough to use before bed.",
  },
  {
    name: "Priya K.",
    rating: 4,
    text: "Love the routine — glides smoothly and the auto shut-off means I never overdo it. Wish the charging cable were longer.",
  },
];

export const faqs = [
  {
    q: "Is this safe for all skin types and tones?",
    a: "Yes. The red and blue LEDs are designed to be gentle and are suitable for all skin tones. If you have a diagnosed skin condition or are pregnant, check with your dermatologist before use.",
  },
  {
    q: "How long until I see results?",
    a: "Most people notice calmer, more hydrated-looking skin after the first few sessions, visibly clearer texture by week 2, and a more even tone with consistent use by week 4.",
  },
  {
    q: "How do I use it?",
    a: "Cleanse your face, apply a water-based serum, then glide the wand in slow upward circles over each zone for about 3 minutes. Use morning or night, 5 days a week.",
  },
  {
    q: "Shipping & warranty?",
    a: `Free shipping on orders over $${fallbackCompareAt}. Every wand ships with a 2-year warranty against manufacturing defects.`,
  },
];

export type LucentDermProduct = {
  shopifyEnabled: boolean;
  productId: string | null;
  finishes: Finish[];
  price: number;
  compareAt: number;
  currency: string;
  // Finish label -> Shopify variant GID, for cart mutations.
  variantMap: Record<string, string>;
  bundles: Bundle[];
  reviewBreakdown: typeof reviewBreakdown;
  reviewTotal: number;
  reviewAverage: number;
  reviews: typeof reviews;
  faqs: typeof faqs;
};

const PRODUCT_HANDLE =
  process.env.SHOPIFY_LUCENTDERM_PRODUCT_HANDLE || "lucentderm-glow-wand";

function buildFallbackProduct(): LucentDermProduct {
  return {
    shopifyEnabled: false,
    productId: null,
    finishes: fallbackFinishes,
    price: fallbackPrice,
    compareAt: fallbackCompareAt,
    currency: "USD",
    variantMap: {},
    bundles,
    reviewBreakdown,
    reviewTotal,
    reviewAverage,
    reviews,
    faqs,
  };
}

function mapShopifyFinishes(finishValues: string[]): Finish[] {
  return finishValues.map((label) => {
    const local = fallbackFinishes.find((f) => f.label.toLowerCase() === label.toLowerCase());
    return {
      id: local?.id ?? label.toLowerCase().replace(/\s+/g, "-"),
      label,
      swatch: local?.swatch ?? "#a3a3a3",
    };
  });
}

// Fetches live product data (finishes, price, variant IDs) from the
// Shopify Storefront API. Falls back to the hardcoded catalog above when
// Shopify isn't configured (no env vars) or the request fails, so the page
// always renders — see README-LUCENTDERM.md for setup.
export async function getLucentDermProduct(): Promise<LucentDermProduct> {
  if (!shopifyConfigured) {
    return buildFallbackProduct();
  }

  try {
    const product = await getProductByHandle(PRODUCT_HANDLE);
    if (!product) {
      console.warn(
        `[shopify] No product found for handle "${PRODUCT_HANDLE}" — using fallback catalog.`
      );
      return buildFallbackProduct();
    }

    const finishOption = product.options.find((o) => o.name === "Finish" || o.name === "Color");

    const finishes = finishOption
      ? mapShopifyFinishes(finishOption.values)
      : fallbackFinishes;

    const variantMap: Record<string, string> = {};
    for (const variant of product.variants) {
      const finish = variant.selectedOptions.find(
        (o) => o.name === "Finish" || o.name === "Color"
      )?.value;
      if (finish) {
        variantMap[finish] = variant.id;
      }
    }

    return {
      shopifyEnabled: true,
      productId: product.id,
      finishes,
      price: Number(product.priceRange.minVariantPrice.amount),
      compareAt: Number(
        product.compareAtPriceRange.minVariantPrice.amount || product.priceRange.minVariantPrice.amount
      ),
      currency: product.priceRange.minVariantPrice.currencyCode,
      variantMap,
      bundles,
      reviewBreakdown,
      reviewTotal,
      reviewAverage,
      reviews,
      faqs,
    };
  } catch (err) {
    console.error("[shopify] Failed to fetch product, using fallback catalog:", err);
    return buildFallbackProduct();
  }
}
