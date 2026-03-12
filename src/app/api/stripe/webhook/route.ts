import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PLANS } from "@/lib/billing";
import { createSupabaseAdmin } from "@/lib/auth/supabase-server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseAdmin();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const planId = session.metadata?.plan_id;

        if (planId) {
          const plan = PLANS.find((p) => p.id === planId);
          if (plan) {
            await supabase
              .from("profiles")
              .update({
                plan: plan.id,
                leads_limit: plan.features.leadsPerMonth,
              })
              .eq("stripe_customer_id", customerId);
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const priceId = subscription.items.data[0]?.price?.id;

        if (priceId) {
          const plan = PLANS.find((p) => p.stripePriceId === priceId);
          if (plan) {
            await supabase
              .from("profiles")
              .update({
                plan: plan.id,
                leads_limit: plan.features.leadsPerMonth,
              })
              .eq("stripe_customer_id", customerId);
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const freePlan = PLANS.find((p) => p.id === "free");

        await supabase
          .from("profiles")
          .update({
            plan: "free",
            leads_limit: freePlan?.features.leadsPerMonth ?? 10,
          })
          .eq("stripe_customer_id", customerId);
        break;
      }

      case "invoice.payment_failed": {
        // Could log or notify, for now just acknowledge
        console.warn(
          "Invoice payment failed:",
          (event.data.object as Stripe.Invoice).id
        );
        break;
      }
    }
  } catch (err) {
    console.error("Error processing webhook event:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
