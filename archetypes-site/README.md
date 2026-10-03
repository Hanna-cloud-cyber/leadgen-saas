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
4. **Cover image (optional)** — drop it at `public/cover.jpg` and use
   `<BookCover src="/cover.jpg" />` in `src/app/page.tsx`. Use a cover without
   real celebrities' faces (see note below).
5. **Sales tax** — enable Stripe Tax if you have US sales-tax obligations.

## Run locally
```bash
cd archetypes-site
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
```

## Deploy (Vercel)
Import the repo on vercel.com, set **Root Directory** to `archetypes-site`,
add the environment variables, deploy. Set `NEXT_PUBLIC_SITE_URL` to your
final domain.

## Note on the current cover
The current cover artwork shows the likenesses of real celebrities. Using a
real person's face to sell a product in the US without permission can violate
right-of-publicity laws, so the site deliberately uses a typographic cover
instead.
