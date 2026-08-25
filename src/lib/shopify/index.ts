const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2024-10";

export const shopifyConfigured = Boolean(STORE_DOMAIN && STOREFRONT_TOKEN);

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!shopifyConfigured) {
    throw new Error(
      "Shopify is not configured — set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN."
    );
  }

  const res = await fetch(
    `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN as string,
      },
      body: JSON.stringify({ query, variables }),
      // Product data can change (stock, price) — avoid stale cache.
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Shopify Storefront API error: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(`Shopify Storefront API error: ${json.errors.map((e) => e.message).join(", ")}`);
  }
  if (!json.data) {
    throw new Error("Shopify Storefront API returned no data.");
  }
  return json.data;
}

export type ShopifyMoney = { amount: string; currencyCode: string };

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  image: { url: string; altText: string | null } | null;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  options: { name: string; values: string[] }[];
  images: { url: string; altText: string | null }[];
  variants: ShopifyVariant[];
  priceRange: { minVariantPrice: ShopifyMoney };
  compareAtPriceRange: { minVariantPrice: ShopifyMoney };
};

const PRODUCT_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      descriptionHtml
      options {
        name
        values
      }
      images(first: 20) {
        nodes {
          url
          altText
        }
      }
      variants(first: 100) {
        nodes {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{
    product: {
      id: string;
      handle: string;
      title: string;
      descriptionHtml: string;
      options: { name: string; values: string[] }[];
      images: { nodes: { url: string; altText: string | null }[] };
      variants: { nodes: ShopifyVariant[] };
      priceRange: { minVariantPrice: ShopifyMoney };
      compareAtPriceRange: { minVariantPrice: ShopifyMoney };
    } | null;
  }>(PRODUCT_QUERY, { handle });

  if (!data.product) return null;

  return {
    id: data.product.id,
    handle: data.product.handle,
    title: data.product.title,
    descriptionHtml: data.product.descriptionHtml,
    options: data.product.options,
    images: data.product.images.nodes,
    variants: data.product.variants.nodes,
    priceRange: data.product.priceRange,
    compareAtPriceRange: data.product.compareAtPriceRange,
  };
}

const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export type CartLineInput = { merchandiseId: string; quantity: number };

export async function createCart(
  lines: CartLineInput[]
): Promise<{ id: string; checkoutUrl: string }> {
  const data = await shopifyFetch<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string } | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(CART_CREATE_MUTATION, { lines });

  const { cart, userErrors } = data.cartCreate;
  if (userErrors.length) {
    throw new Error(`Shopify cart error: ${userErrors.map((e) => e.message).join(", ")}`);
  }
  if (!cart) {
    throw new Error("Shopify cart creation failed — no cart returned.");
  }
  return cart;
}
