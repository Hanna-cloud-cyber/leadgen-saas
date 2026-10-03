import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { store } from "@/data";

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Checkout isn't connected yet. Please try again soon." },
      { status: 503 }
    );
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
  const priceId = process.env.ARCHETYPES_STRIPE_PRICE_ID;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        priceId
          ? { price: priceId, quantity: 1 }
          : {
              quantity: 1,
              price_data: {
                currency: "usd",
                unit_amount: store.priceCents,
                product_data: {
                  name: store.productName,
                  description: `${store.tagline} — digital guide (PDF), instant download.`,
                },
              },
            },
      ],
      allow_promotion_codes: true,
      customer_creation: "always",
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#buy`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe session creation failed:", err);
    return NextResponse.json({ error: "Could not start checkout." }, { status: 502 });
  }
}
