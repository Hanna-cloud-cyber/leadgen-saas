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
    const body = await res.text().catch(() => "");
    throw new Error(
      `Shopify Storefront API error: ${res.status} ${res.statusText} — ${body.slice(0, 300)}`
    );
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

export type CartLineInput = { merchandiseId: string; quantity: number };

export type CartLine = {
  id: string;
  quantity: number;
  merchandiseId: string;
  title: string;
  variantTitle: string;
  price: number;
  compareAtPrice: number | null;
  image: { url: string; altText: string | null } | null;
  availableForSale: boolean;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: number;
  total: number;
  currency: string;
  lines: CartLine[];
};

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
            }
            image {
              url
              altText
            }
            product {
              title
            }
          }
        }
      }
    }
  }
`;

type RawCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
  lines: {
    nodes: {
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: ShopifyMoney;
        compareAtPrice: { amount: string } | null;
        image: { url: string; altText: string | null } | null;
        product: { title: string };
      };
    }[];
  };
};

function mapCart(raw: RawCart): Cart {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    subtotal: Number(raw.cost.subtotalAmount.amount),
    total: Number(raw.cost.totalAmount.amount),
    currency: raw.cost.subtotalAmount.currencyCode,
    lines: raw.lines.nodes.map((line) => ({
      id: line.id,
      quantity: line.quantity,
      merchandiseId: line.merchandise.id,
      title: line.merchandise.product.title,
      variantTitle: line.merchandise.title,
      price: Number(line.merchandise.price.amount),
      compareAtPrice: line.merchandise.compareAtPrice
        ? Number(line.merchandise.compareAtPrice.amount)
        : null,
      image: line.merchandise.image,
      availableForSale: line.merchandise.availableForSale,
    })),
  };
}

function checkCartErrors(userErrors: { field: string[]; message: string }[]) {
  if (userErrors.length) {
    throw new Error(`Shopify cart error: ${userErrors.map((e) => e.message).join(", ")}`);
  }
}

const CART_CREATE_MUTATION = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function createCart(lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{
    cartCreate: {
      cart: RawCart | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(CART_CREATE_MUTATION, { lines });

  checkCartErrors(data.cartCreate.userErrors);
  if (!data.cartCreate.cart) {
    throw new Error("Shopify cart creation failed — no cart returned.");
  }
  return mapCart(data.cartCreate.cart);
}

const CART_QUERY = /* GraphQL */ `
  ${CART_FRAGMENT}
  query CartById($id: ID!) {
    cart(id: $id) {
      ...CartFields
    }
  }
`;

export async function getCart(id: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: RawCart | null }>(CART_QUERY, { id });
  return data.cart ? mapCart(data.cart) : null;
}

const CART_LINES_ADD_MUTATION = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function addCartLines(cartId: string, lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: {
      cart: RawCart | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(CART_LINES_ADD_MUTATION, { cartId, lines });

  checkCartErrors(data.cartLinesAdd.userErrors);
  if (!data.cartLinesAdd.cart) {
    throw new Error("Could not add to cart.");
  }
  return mapCart(data.cartLinesAdd.cart);
}

const CART_LINES_UPDATE_MUTATION = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: {
      cart: RawCart | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(CART_LINES_UPDATE_MUTATION, { cartId, lines: [{ id: lineId, quantity }] });

  checkCartErrors(data.cartLinesUpdate.userErrors);
  if (!data.cartLinesUpdate.cart) {
    throw new Error("Could not update cart.");
  }
  return mapCart(data.cartLinesUpdate.cart);
}

const CART_LINES_REMOVE_MUTATION = /* GraphQL */ `
  ${CART_FRAGMENT}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function removeCartLine(cartId: string, lineId: string): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: {
      cart: RawCart | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(CART_LINES_REMOVE_MUTATION, { cartId, lineIds: [lineId] });

  checkCartErrors(data.cartLinesRemove.userErrors);
  if (!data.cartLinesRemove.cart) {
    throw new Error("Could not update cart.");
  }
  return mapCart(data.cartLinesRemove.cart);
}
