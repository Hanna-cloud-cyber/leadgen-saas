import { NextRequest, NextResponse } from "next/server";
import {
  addCartLines,
  createCart,
  getCart,
  removeCartLine,
  shopifyConfigured,
  updateCartLine,
} from "@/lib/shopify";

function isVariantGid(v: unknown): v is string {
  return typeof v === "string" && v.startsWith("gid://shopify/ProductVariant/");
}

function isCartGid(v: unknown): v is string {
  return typeof v === "string" && v.startsWith("gid://shopify/Cart/");
}

function isLineGid(v: unknown): v is string {
  return typeof v === "string" && v.startsWith("gid://shopify/CartLine/");
}

function notConfigured() {
  return NextResponse.json(
    { error: "Shopify is not configured on this deployment yet." },
    { status: 503 }
  );
}

export async function GET(req: NextRequest) {
  if (!shopifyConfigured) return notConfigured();

  const cartId = req.nextUrl.searchParams.get("cartId");
  if (!isCartGid(cartId)) {
    return NextResponse.json({ error: "Invalid cartId." }, { status: 400 });
  }

  try {
    const cart = await getCart(cartId);
    return NextResponse.json({ cart });
  } catch (err) {
    console.error("[shopify] cart fetch failed:", err);
    return NextResponse.json({ error: "Could not load cart." }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  if (!shopifyConfigured) return notConfigured();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { cartId, variantId, quantity } = (body ?? {}) as {
    cartId?: unknown;
    variantId?: unknown;
    quantity?: unknown;
  };

  if (!isVariantGid(variantId)) {
    return NextResponse.json({ error: "Invalid variantId." }, { status: 400 });
  }
  if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
    return NextResponse.json({ error: "Invalid quantity." }, { status: 400 });
  }

  try {
    const cart =
      cartId && isCartGid(cartId)
        ? await addCartLines(cartId, [{ merchandiseId: variantId, quantity }])
        : await createCart([{ merchandiseId: variantId, quantity }]);
    return NextResponse.json({ cart });
  } catch (err) {
    console.error("[shopify] add to cart failed:", err);
    return NextResponse.json({ error: "Could not add to cart." }, { status: 502 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!shopifyConfigured) return notConfigured();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { cartId, lineId, quantity } = (body ?? {}) as {
    cartId?: unknown;
    lineId?: unknown;
    quantity?: unknown;
  };

  if (!isCartGid(cartId)) {
    return NextResponse.json({ error: "Invalid cartId." }, { status: 400 });
  }
  if (!isLineGid(lineId)) {
    return NextResponse.json({ error: "Invalid lineId." }, { status: 400 });
  }
  if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
    return NextResponse.json({ error: "Invalid quantity." }, { status: 400 });
  }

  try {
    const cart = await updateCartLine(cartId, lineId, quantity);
    return NextResponse.json({ cart });
  } catch (err) {
    console.error("[shopify] update cart line failed:", err);
    return NextResponse.json({ error: "Could not update cart." }, { status: 502 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!shopifyConfigured) return notConfigured();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { cartId, lineId } = (body ?? {}) as { cartId?: unknown; lineId?: unknown };

  if (!isCartGid(cartId)) {
    return NextResponse.json({ error: "Invalid cartId." }, { status: 400 });
  }
  if (!isLineGid(lineId)) {
    return NextResponse.json({ error: "Invalid lineId." }, { status: 400 });
  }

  try {
    const cart = await removeCartLine(cartId, lineId);
    return NextResponse.json({ cart });
  } catch (err) {
    console.error("[shopify] remove cart line failed:", err);
    return NextResponse.json({ error: "Could not update cart." }, { status: 502 });
  }
}
