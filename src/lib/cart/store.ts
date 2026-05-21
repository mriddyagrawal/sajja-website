"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Cart store — pure client-side, persisted to localStorage.
 *
 * Prices are stored as integers in paise (₹1 = 100 paise). Snapshots of
 * title / image / unitPrice happen at add-time so the cart survives
 * product edits in Sanity. Live price is re-derived at checkout (Phase 4).
 *
 * Server-side persistence will be layered in Phase 3 (merge with the
 * Cart row in Supabase once the user is logged in).
 */

export type CartItem = {
  productId: string;
  slug: string;
  title: string;
  image: string;
  unitPrice: number;
  quantity: number;
  /** Optional cap surfaced via "Only N left" warnings; honored on increment. */
  stockCap?: number;
};

type AddInput = Omit<CartItem, "quantity"> & { quantity?: number };

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  /** Bumped each time something is added; the drawer animates the cart icon when it changes. */
  pulseKey: number;

  add: (item: AddInput) => void;
  remove: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;

  open: () => void;
  close: () => void;
  toggle: () => void;
};

const STORAGE_KEY = "sajja:cart:v1";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      pulseKey: 0,

      add: (input) =>
        set((state) => {
          const incomingQty = input.quantity ?? 1;
          const existing = state.items.find((i) => i.productId === input.productId);
          let nextItems: CartItem[];

          if (existing) {
            const cap = input.stockCap ?? existing.stockCap ?? Infinity;
            const nextQty = Math.min(existing.quantity + incomingQty, cap);
            nextItems = state.items.map((i) =>
              i.productId === input.productId ? { ...i, quantity: nextQty } : i,
            );
          } else {
            const cap = input.stockCap ?? Infinity;
            const startQty = Math.min(incomingQty, cap);
            nextItems = [
              ...state.items,
              {
                productId: input.productId,
                slug: input.slug,
                title: input.title,
                image: input.image,
                unitPrice: input.unitPrice,
                stockCap: input.stockCap,
                quantity: startQty,
              },
            ];
          }

          return {
            items: nextItems,
            isOpen: true,
            pulseKey: state.pulseKey + 1,
          };
        }),

      remove: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQty: (productId, qty) =>
        set((state) => {
          if (qty <= 0) {
            return { items: state.items.filter((i) => i.productId !== productId) };
          }
          return {
            items: state.items.map((i) =>
              i.productId === productId
                ? { ...i, quantity: Math.min(qty, i.stockCap ?? Infinity) }
                : i,
            ),
          };
        }),

      clear: () => set({ items: [] }),

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    {
      name: STORAGE_KEY,
      // Hydration is client-only by design — server renders an empty cart
      // and the persisted state takes over once the component mounts.
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      version: 1,
    },
  ),
);

// --- Selectors (computed, recomputed only when items change) ---

export const selectItemCount = (s: CartState) =>
  s.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectSubtotal = (s: CartState) =>
  s.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

export const selectIsEmpty = (s: CartState) => s.items.length === 0;
