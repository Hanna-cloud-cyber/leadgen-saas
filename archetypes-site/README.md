# The 30 Archetypes of Women — website

Standalone Next.js site (separate from the rest of this repo) that sells the
digital guide in the US, in USD, through Stripe Checkout.

## Pages
- `/` — landing page (hero, the 30 archetypes, inside the guide, pricing, guarantee, FAQ)
- `/quiz` — free 8-question archetype quiz (runs in the browser, nothing stored)
- `/thank-you` — post-payment page with the download button
- `/terms`, `/privacy` (incl. CCPA), `/refund-policy`, `/disclaimer`, `/contact`

## Before launch
1. **Business details** — edit `store` in `src/data.ts`: legal name, support
   email, state, price (`priceCents`, currently $39).
2. **Stripe** — create an account at stripe.com, copy the secret key into
   `STRIPE_SECRET_KEY` (see `.env.example`). Test with `sk_test_...` and card
   `4242 4242 4242 4242` first, then switch to the live key.
3. **The PDF** — upload it somewhere private and put the link in
   `ARCHETYPES_DOWNLOAD_URL`. `/api/download` only redirects there after
   checking with Stripe that the order is paid.
4. **Cover image** — `public/cover.webp`, shown in the hero via
   `<BookCover src="/cover.webp" />`. Replace the file to change it.
5. **Sales tax** — enable Stripe Tax if you have US sales-tax obligations.

## Run locally
```bash
cd archetypes-site
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
```

## Deploy (Vercel) on womenbossworld.com
1. On vercel.com: **Add New → Project** → import this GitHub repo → set
   **Root Directory** to `archetypes-site` → add the environment variables
   from `.env.example` (`NEXT_PUBLIC_SITE_URL=https://womenbossworld.com`)
   → **Deploy**.
2. In the Vercel project: **Settings → Domains** → add `womenbossworld.com`
   (and accept adding `www.womenbossworld.com`). Vercel shows the DNS records
   to create.
3. In IONOS: **Domains & SSL** → `womenbossworld.com` → **DNS**:
   - `A` record, host `@` → `76.76.21.21` (replace the existing IONOS `A` record)
   - delete any `AAAA` record on `@` (IONOS adds one by default; it breaks Vercel)
   - `CNAME` record, host `www` → `cname.vercel-dns.com`
   If Vercel shows different values, use Vercel's.
4. Wait 10 min to a few hours. Vercel issues the HTTPS certificate automatically.
5. In Stripe, nothing to change: redirects use `NEXT_PUBLIC_SITE_URL`.

## Note on the current cover
The cover artwork shows the likenesses of real celebrities. Using a real
person's face to sell a product in the US without their permission can violate
right-of-publicity laws (and can get ads rejected on Meta/TikTok). Consider a
version without recognizable faces before running paid traffic.
