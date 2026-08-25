"use client";

import { useCallback, useEffect, useState } from "react";

export type CartLine = {
  id: string;
  quantity: number;
  merchandiseId: string;
  title: string;
  variantTitle: string;
  price: number;
  compareAtPrice: number | null;
  image: { url: string; altText: string | null } | null;
  availableForSale: boolean;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: number;
  total: number;
  currency: string;
  lines: CartLine[];
};

const STORAGE_KEY = "sculptia_cart_id";

function readStoredCartId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeCartId(id: string) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // ignore (private browsing, storage disabled...)
  }
}

function clearStoredCartId() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

async function parseCartResponse(res: Response): Promise<Cart> {
  const data = await res.json();
  if (!res.ok || !data.cart) {
    throw new Error(data.error || "Something went wrong with your cart.");
  }
  return data.cart as Cart;
}

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const id = readStoredCartId();
    if (!id) {
      setHydrated(true);
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/sculptia/cart?cartId=${encodeURIComponent(id)}`);
        const data = await res.json();
        if (res.ok && data.cart) {
          setCart(data.cart);
        } else {
          clearStoredCartId();
        }
      } catch {
        // stay silent — cart just won't be restored this load
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  const addLine = useCallback(
    async (variantId: string, quantity: number) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/sculptia/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId: cart?.id, variantId, quantity }),
        });
        const nextCart = await parseCartResponse(res);
        setCart(nextCart);
        storeCartId(nextCart.id);
        return nextCart;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Could not add to cart.";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [cart?.id]
  );

  const updateLineQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/sculptia/cart", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId: cart.id, lineId, quantity }),
        });
        const nextCart = await parseCartResponse(res);
        setCart(nextCart);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Could not update cart.";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const removeLine = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/sculptia/cart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId: cart.id, lineId }),
        });
        const nextCart = await parseCartResponse(res);
        setCart(nextCart);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Could not update cart.";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  return { cart, loading, error, hydrated, addLine, updateLineQuantity, removeLine, setError };
}
