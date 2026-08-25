# Sculptia × Shopify (headless)

`/sculptia` is a normal page in this Next.js app. It renders with a
hardcoded demo catalog (`src/app/sculptia/data.ts`) until you connect a real
Shopify store — at that point it fetches live colors, sizes, prices, and
stock from Shopify's **Storefront API**, and "Add to cart" sends the buyer to
a real Shopify checkout. No theme install, no Liquid, no file uploads.

## 1. Create a Storefront API token

In your Shopify admin: **Settings → Apps and sales channels → Develop apps**
→ **Create an app** → name it (e.g. "Sculptia site") → **Configuration** →
**Storefront API** → enable these scopes:

- `unauthenticated_read_product_listings`
- `unauthenticated_write_checkouts` (or `unauthenticated_write_carts`,
  depending on your Shopify version)

**Install app**, then go to **API credentials** and copy the
**Storefront API access token**. This token is different from — and much
simpler to obtain than — an Admin API token.

## 2. Create the product in Shopify

Same product setup as before:

- **Title**: `Sculptia 3D Anti-Cellulite Legging`
- **Price**: `$38.00`, **Compare-at price**: `$65.00`
- **Option 1** named exactly `Color`, values: `Black, Heather Grey, Beige,
  Navy, Dark Olive, Hot Pink, Light Pink, Light Blue`
- **Option 2** named exactly `Size`, values: `XS, S, M, L, XL, XXL`
- Set stock per variant

Note the product's **handle** (Shopify admin → Product → shown under the
title / in the URL, e.g. `sculptia-3d-anti-cellulite-legging`).

## 3. Set environment variables

Add these wherever the app is hosted (locally in `.env.local`, or in your
host's project settings):

```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxx
SHOPIFY_STOREFRONT_API_VERSION=2024-10
SHOPIFY_PRODUCT_HANDLE=sculptia-3d-anti-cellulite-legging
```

Only the first two are required — the last two have sensible defaults. If
they're unset, `/sculptia` keeps rendering the built-in demo catalog and
"Add to cart" shows a message instead of erroring.

## 4. Host the site

This session runs the app in a temporary container — nobody outside it can
open the page yet. Deploy it (e.g. to [Vercel](https://vercel.com), which
has a free tier and deploys a Next.js repo in a few clicks) and add the
same environment variables there. Once deployed, `/sculptia` is live and
wired to your store.

## 5. What's still manual in Shopify

- **Bundle pricing** ("Buy 2, Get 1 FREE" etc.): the page shows these as
  marketing copy (`bundles` in `src/app/sculptia/data.ts`); the discount
  itself must exist in **Marketing → Discounts → Automatic discount → Buy X
  get Y**, applied to this product, so checkout actually charges the
  reduced price. Keep the numbers in `data.ts` in sync with that discount.
- **Reviews**: still placeholder text in `data.ts`. Swap in real reviews, or
  connect an app (Judge.me, Loox, Yotpo).

## How it works (for reference)

- `src/lib/shopify/index.ts` — thin GraphQL client for Shopify's Storefront
  API (`getProductByHandle`, `createCart`).
- `src/app/sculptia/data.ts` — `getSculptiaProduct()` fetches the live
  product server-side and falls back to the hardcoded catalog if Shopify
  isn't configured or the request fails.
- `src/app/sculptia/page.tsx` — server component, fetches the product and
  renders the client UI.
- `src/app/sculptia/SculptiaClient.tsx` — all the interactive UI (color/size/
  bundle selection), unchanged visually from before.
- `src/app/api/sculptia/cart/route.ts` — creates a Shopify cart for the
  selected variant/quantity and returns a `checkoutUrl`; the client redirects
  the buyer there to pay.
