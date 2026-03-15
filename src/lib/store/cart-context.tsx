"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "./countries";

export interface CartItem {
  product: Product;
  variant: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, variant: string) => void;
  removeItem: (productId: string, variant: string) => void;
  updateQuantity: (productId: string, variant: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, variant: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.variant === variant);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.variant === variant
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, variant, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string, variant: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.variant === variant)));
  }, []);

  const updateQuantity = useCallback((productId: string, variant: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => !(i.product.id === productId && i.variant === variant)));
      return;
    }
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId && i.variant === variant ? { ...i, quantity } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
