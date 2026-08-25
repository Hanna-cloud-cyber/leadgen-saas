import { NextRequest, NextResponse } from "next/server";
import { createCart, shopifyConfigured } from "@/lib/shopify";

export async function POST(req: NextRequest) {
  if (!shopifyConfigured) {
    return NextResponse.json(
      { error: "Shopify is not configured on this deployment yet." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { variantId, quantity } = (body ?? {}) as {
    variantId?: unknown;
    quantity?: unknown;
  };

  if (typeof variantId !== "string" || !variantId.startsWith("gid://shopify/ProductVariant/")) {
    return NextResponse.json({ error: "Invalid variantId." }, { status: 400 });
  }
  if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
    return NextResponse.json({ error: "Invalid quantity." }, { status: 400 });
  }

  try {
    const cart = await createCart([{ merchandiseId: variantId, quantity }]);
    return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
  } catch (err) {
    console.error("[shopify] cart creation failed:", err);
    return NextResponse.json({ error: "Could not create cart." }, { status: 502 });
  }
}
