import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { requireAuth } from "@/lib/auth/require-auth";
import { PLANS } from "@/lib/billing";

export async function POST(request: Request) {
  const { user, supabase, error } = await requireAuth();
  if (error) return error;

  if (!stripe) {
    return NextResponse.json({ error: "Stripe non configuré" }, { status: 503 });
  }

  try {
    const { planId } = await request.json();

    // Look up the plan
    const plan = PLANS.find((p) => p.id === planId);
    if (!plan || plan.id === "free" || !plan.stripePriceId) {
      return NextResponse.json(
        { error: "Plan invalide ou gratuit" },
        { status: 400 }
      );
    }

    // Get user profile to check for existing stripe_customer_id
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id, email, full_name")
      .eq("id", user!.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    // Create a Stripe customer if none exists
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user!.email,
        name: profile?.full_name || undefined,
        metadata: {
          supabase_user_id: user!.id,
        },
      });
      customerId = customer.id;

      // Save stripe_customer_id to profile
      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user!.id);
    }

    // Create the checkout session
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/settings?checkout=success`,
      cancel_url: `${appUrl}/settings?checkout=cancel`,
      metadata: {
        supabase_user_id: user!.id,
        plan_id: plan.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    );
  }
}
