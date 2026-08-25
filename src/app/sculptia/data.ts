import { getProductByHandle, shopifyConfigured, type ShopifyVariant } from "@/lib/shopify";

export type Colorway = {
  id: string;
  label: string;
  swatch: string;
  image: string;
};

export const fallbackColorways: Colorway[] = [
  { id: "black", label: "Black", swatch: "#161616", image: "/sculptia/product-assets/colorway-black.png" },
  { id: "heather-grey", label: "Heather Grey", swatch: "#9a9a9a", image: "/sculptia/product-assets/colorway-gray-chine.png" },
  { id: "beige", label: "Beige", swatch: "#d9c9a8", image: "/sculptia/product-assets/colorway-beige.png" },
  { id: "navy", label: "Navy", swatch: "#1b2a44", image: "/sculptia/product-assets/colorway-navy.png" },
  { id: "dark-olive", label: "Dark Olive", swatch: "#3a3a28", image: "/sculptia/product-assets/colorway-olive-dark.png" },
  { id: "hot-pink", label: "Hot Pink", swatch: "#ec2c7d", image: "/sculptia/product-assets/colorway-hot-pink.png" },
  { id: "light-pink", label: "Light Pink", swatch: "#f5c8d6", image: "/sculptia/product-assets/colorway-light-pink.png" },
  { id: "light-blue", label: "Light Blue", swatch: "#cfe8f5", image: "/sculptia/product-assets/colorway-light-blue.png" },
];

export const fallbackSizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const fallbackPrice = 38;
export const fallbackCompareAt = 65;

export type Bundle = {
  id: string;
  qty: number;
  free: number;
  label: string;
  sublabel: string;
  price: number;
  compareAt: number;
  badge?: string;
};

// Bundle pricing is a merchandising construct, not a Shopify catalog price:
// it's what the page *shows* per bundle. What the customer actually pays is
// enforced by a Shopify "Buy X, Get Y" automatic discount configured in
// Marketing → Discounts (see README-SHOPIFY.md). Keep these numbers in sync
// with that discount by hand.
export const bundles: Bundle[] = [
  {
    id: "solo",
    qty: 1,
    free: 0,
    label: "1 Legging",
    sublabel: "Try it out",
    price: 38,
    compareAt: 65,
  },
  {
    id: "duo",
    qty: 2,
    free: 1,
    label: "Buy 2, Get 1 FREE",
    sublabel: "One to wear, one to wash, one to spare",
    price: 76,
    compareAt: 195,
    badge: "MOST POPULAR",
  },
  {
    id: "trio",
    qty: 3,
    free: 2,
    label: "Buy 3, Get 2 FREE",
    sublabel: "Free shipping included",
    price: 114,
    compareAt: 325,
    badge: "BEST VALUE",
  },
];

export const reviewBreakdown = [
  { stars: 5, count: 284 },
  { stars: 4, count: 47 },
  { stars: 3, count: 15 },
  { stars: 2, count: 6 },
  { stars: 1, count: 3 },
];

export const reviewTotal = reviewBreakdown.reduce((acc, r) => acc + r.count, 0);
export const reviewAverage = 4.7;

// Placeholder reviews — written as examples of tone/length, not sourced from
// any real customer. Swap these for genuine Sculptia reviews (with real
// customer names/photos, with their consent) as soon as you have them, or
// connect a reviews app (Judge.me, Loox, Yotpo...) to pull real ones in.
export const reviews = [
  {
    name: "Emily R.",
    rating: 5,
    text: "The fabric is really unique — I feel a light massage when I wear it. After a few weeks the difference is visible.",
  },
  {
    name: "Ashley M.",
    rating: 5,
    text: "The waistband never rolls down, even by the end of the day. Perfect fit and it really shapes.",
  },
  {
    name: "Taylor B.",
    rating: 4,
    text: "Super comfortable and opaque even in light colors. Wish there were more length options.",
  },
];

export const faqs = [
  {
    q: "Can you see through it when I squat?",
    a: "No. The 3D compressive mesh is fully opaque and squat-proof, even in light colors.",
  },
  {
    q: "How does it fit? What size should I get?",
    a: "It runs true to size from XS to XXL. Between two sizes, size down for more compression.",
  },
  {
    q: "When will I see results?",
    a: "Instant lift on day 1. Firmer-looking skin by week 2. Visibly smoother by week 4 of regular wear.",
  },
  {
    q: "Shipping & returns?",
    a: "Free shipping on orders over $65. Free returns and exchanges within 30 days if it's not right for you.",
  },
];

export type SculptiaProduct = {
  shopifyEnabled: boolean;
  productId: string | null;
  colorways: Colorway[];
  sizes: string[];
  price: number;
  compareAt: number;
  currency: string;
  // "Color label|Size label" -> Shopify variant GID, for cart mutations.
  variantMap: Record<string, string>;
  bundles: Bundle[];
  reviewBreakdown: typeof reviewBreakdown;
  reviewTotal: number;
  reviewAverage: number;
  reviews: typeof reviews;
  faqs: typeof faqs;
};

const PRODUCT_HANDLE = process.env.SHOPIFY_PRODUCT_HANDLE || "sculptia-3d-anti-cellulite-legging";

function variantKey(color: string, size: string) {
  return `${color}|${size}`;
}

function buildFallbackProduct(): SculptiaProduct {
  return {
    shopifyEnabled: false,
    productId: null,
    colorways: fallbackColorways,
    sizes: fallbackSizes,
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

function mapShopifyColorways(
  colorValues: string[],
  variants: ShopifyVariant[]
): Colorway[] {
  return colorValues.map((label) => {
    const local = fallbackColorways.find(
      (c) => c.label.toLowerCase() === label.toLowerCase()
    );
    const variantWithImage = variants.find(
      (v) =>
        v.selectedOptions.some(
          (o) => o.name === "Color" && o.value === label
        ) && v.image
    );
    return {
      id: local?.id ?? label.toLowerCase().replace(/\s+/g, "-"),
      label,
      swatch: local?.swatch ?? "#a3a3a3",
      image: variantWithImage?.image?.url ?? local?.image ?? fallbackColorways[0].image,
    };
  });
}

// Fetches live product data (colors, sizes, prices, variant IDs) from the
// Shopify Storefront API. Falls back to the hardcoded catalog above when
// Shopify isn't configured (no env vars) or the request fails, so the page
// always renders — see README-SHOPIFY.md for setup.
export async function getSculptiaProduct(): Promise<SculptiaProduct> {
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

    const colorOption = product.options.find((o) => o.name === "Color");
    const sizeOption = product.options.find((o) => o.name === "Size");

    const colorways = colorOption
      ? mapShopifyColorways(colorOption.values, product.variants)
      : fallbackColorways;
    const sizes = sizeOption ? sizeOption.values : fallbackSizes;

    const variantMap: Record<string, string> = {};
    for (const variant of product.variants) {
      const color = variant.selectedOptions.find((o) => o.name === "Color")?.value;
      const size = variant.selectedOptions.find((o) => o.name === "Size")?.value;
      if (color && size) {
        variantMap[variantKey(color, size)] = variant.id;
      }
    }

    return {
      shopifyEnabled: true,
      productId: product.id,
      colorways,
      sizes,
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
