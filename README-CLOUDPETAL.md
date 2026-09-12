# Cloudpetal × Shopify (headless)

`/cloudpetal` is a normal page in this Next.js app: a multi-product skincare
storefront (cleanser, toner, serum, cream, cleansing oil, SPF). It renders
with a hardcoded demo catalog (`src/app/cloudpetal/data.ts`) until you
connect a real Shopify store — at that point it fetches live products,
prices, and stock from a Shopify **collection** via the Storefront API, and
each "Add to Bag" sends the buyer toward a real Shopify checkout. No theme
install, no Liquid, no file uploads.

## 1. Create a Storefront API token

Same as any headless page in this app — see `README-SHOPIFY.md` steps 1 and
3 for creating the app/token and setting `SHOPIFY_STORE_DOMAIN` and
`SHOPIFY_STOREFRONT_TOKEN`. Both pages can share the same token.

## 2. Create the products and a collection in Shopify

Create each product in your Shopify admin (title, price, compare-at price,
one image, one default variant is enough — extra options/variants also
work, the page uses the first available variant):

- Petal Cleansing Oil — handle `petal-cleansing-oil`
- Rice Milk Cleanser — handle `rice-milk-cleanser`
- Plum Glow Toner — handle `plum-glow-toner`
- Silk Barrier Serum — handle `silk-barrier-serum`
- Cloud Cream — handle `cloud-cream`
- Daily Shield SPF 30 — handle `daily-shield-spf-30`

Then create a **Collection** (manual or automated) containing all six
products, and note its handle (shown under the collection title / in the
URL).

## 3. Set environment variables

```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxx
SHOPIFY_STOREFRONT_API_VERSION=2024-10
CLOUDPETAL_COLLECTION_HANDLE=cloudpetal-ritual
```

Only the first two are required — the rest have sensible defaults. If
they're unset (or the collection has no products yet), `/cloudpetal` keeps
rendering the built-in demo catalog and "Add to Bag" shows a message
instead of erroring.

## 4. Host the site

This session runs the app in a temporary container — nobody outside it can
open the page yet. Deploy it (e.g. to [Vercel](https://vercel.com)) and add
the same environment variables there. Once deployed, `/cloudpetal` is live
and wired to your store.

## How it works (for reference)

- `src/lib/shopify/index.ts` — `getProductsByCollectionHandle` fetches every
  product in a Shopify collection via the Storefront API (shared with the
  `/sculptia` single-product client).
- `src/app/cloudpetal/data.ts` — `getCloudpetalCatalog()` fetches the live
  collection server-side and falls back to the hardcoded catalog if Shopify
  isn't configured or the request fails.
- `src/app/cloudpetal/page.tsx` — server component, fetches the catalog and
  renders the client UI.
- `src/app/cloudpetal/CloudpetalClient.tsx` — the storefront UI (hero,
  product grid, cart drawer trigger).
- `src/app/cloudpetal/ProductArt.tsx` — original, brand-owned SVG bottle/tube
  illustrations used as product art in demo mode (no third-party product
  photography).
- `src/app/api/cloudpetal/cart/route.ts` — creates/updates a Shopify cart for
  the selected variant/quantity and returns a `checkoutUrl`; the client
  redirects the buyer there to pay.
