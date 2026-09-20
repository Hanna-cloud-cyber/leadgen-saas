# LucentDerm × Shopify (headless)

`/lucentderm` is a normal page in this Next.js app. It renders with a
hardcoded demo catalog (`src/app/lucentderm/data.ts`) until you connect a
real Shopify store — at that point it fetches live finishes, prices, and
stock from Shopify's **Storefront API**, and "Add to cart" sends the buyer
to a real Shopify checkout. No theme install, no Liquid, no file uploads.

It shares the same Shopify client as `/sculptia`
(`src/lib/shopify/index.ts`), so both product pages can point at the same
store — you just need a second product and a second env var (see below).

## 1. Create a Storefront API token

If you already did this for Sculptia, reuse the same app/token — one
Storefront API token can read any product in the store. Otherwise, in your
Shopify admin: **Settings → Apps and sales channels → Develop apps** →
**Create an app** → name it → **Configuration** → **Storefront API** →
enable:

- `unauthenticated_read_product_listings`
- `unauthenticated_write_checkouts` (or `unauthenticated_write_carts`,
  depending on your Shopify version)

**Install app**, then go to **API credentials** and copy the
**Storefront API access token**.

## 2. Create the product in Shopify

- **Title**: `LucentDerm Glow Wand`
- **Price**: `$129.00`, **Compare-at price**: `$219.00`
- **Option 1** named exactly `Finish`, values: `Rose Gold, Matte Black,
  Pearl White`
- Set stock per variant

Note the product's **handle** (Shopify admin → Product → shown under the
title / in the URL, e.g. `lucentderm-glow-wand`).

## 3. Set environment variables

Add these wherever the app is hosted (locally in `.env.local`, or in your
host's project settings):

```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxx
SHOPIFY_STOREFRONT_API_VERSION=2024-10
SHOPIFY_LUCENTDERM_PRODUCT_HANDLE=lucentderm-glow-wand
```

Only the first two are required — the last two have sensible defaults.
`SHOPIFY_LUCENTDERM_PRODUCT_HANDLE` is separate from Sculptia's
`SHOPIFY_PRODUCT_HANDLE`, so both pages can point at different products in
the same store. If unset, `/lucentderm` keeps rendering the built-in demo
catalog and "Add to cart" shows a message instead of erroring.

## 4. Host the site

This session runs the app in a temporary container — nobody outside it can
open the page yet. Deploy it (e.g. to [Vercel](https://vercel.com), which
has a free tier and deploys a Next.js repo in a few clicks) and add the
same environment variables there. Once deployed, `/lucentderm` is live and
wired to your store.

## 5. What's still manual in Shopify

- **Bundle pricing** ("Share the Glow — 2 wands" etc.): the page shows
  these as marketing copy (`bundles` in `src/app/lucentderm/data.ts`); the
  discount itself must exist in **Marketing → Discounts → Automatic
  discount**, applied to this product, so checkout actually charges the
  reduced price. Keep the numbers in `data.ts` in sync with that discount.
- **Reviews**: still placeholder text in `data.ts`. Swap in real reviews,
  or connect an app (Judge.me, Loox, Yotpo).
- **Product photography**: the gallery currently uses hand-drawn SVG
  illustrations (`src/app/lucentderm/DeviceArt.tsx`) since no real photos
  exist yet. Once you have studio/lifestyle photos, drop them in
  `/public/lucentderm` and swap the `<DeviceStudio />` / `<DeviceAngled />`
  / `<FaceZoneMap />` / `<KitFlatlay />` calls in `LucentDermClient.tsx`
  for `next/image` — the surrounding `aspect-[4/5]` frames don't need to
  change.

## How it works (for reference)

- `src/lib/shopify/index.ts` — thin GraphQL client for Shopify's Storefront
  API, shared with `/sculptia` (`getProductByHandle`, `createCart`).
- `src/app/lucentderm/data.ts` — `getLucentDermProduct()` fetches the live
  product server-side and falls back to the hardcoded catalog if Shopify
  isn't configured or the request fails.
- `src/app/lucentderm/page.tsx` — server component, fetches the product and
  renders the client UI.
- `src/app/lucentderm/LucentDermClient.tsx` — all the interactive UI
  (finish/bundle selection), plus the marketing sections.
- `src/app/lucentderm/DeviceArt.tsx` — the SVG illustrations used in place
  of product photography.
- `src/app/api/lucentderm/cart/route.ts` — creates a Shopify cart for the
  selected variant/quantity and returns a `checkoutUrl`; the client
  redirects the buyer there to pay.
