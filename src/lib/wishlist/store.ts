"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Wishlist store. Local-only for Phase 3; Phase 3+ (post-Clerk) will
 * mirror these to the server when the user is signed in.
 *
 * Items snapshot the bare minimum so the wishlist survives Sanity edits
 * and shows useful info even if the underlying product changes.
 */

export type WishlistItem = {
  productId: string;
  slug: string;
  title: string;
  image: string;
  unitPrice: number;
  /** ms epoch — for sort-by-recent and "saved on …" display. */
  savedAt: number;
};

type WishlistState = {
  items: WishlistItem[];
  has: (productId: string) => boolean;
  toggle: (item: Omit<WishlistItem, "savedAt">) => boolean;
  add: (item: Omit<WishlistItem, "savedAt">) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "sajja:wishlist:v1";

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      has: (productId) => get().items.some((i) => i.productId === productId),

      toggle: (input) => {
        const exists = get().has(input.productId);
        if (exists) {
          set((s) => ({ items: s.items.filter((i) => i.productId !== input.productId) }));
          return false;
        }
        set((s) => ({ items: [{ ...input, savedAt: Date.now() }, ...s.items] }));
        return true;
      },

      add: (input) =>
        set((s) =>
          s.items.some((i) => i.productId === input.productId)
            ? s
            : { items: [{ ...input, savedAt: Date.now() }, ...s.items] },
        ),

      remove: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),

      clear: () => set({ items: [] }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      version: 1,
    },
  ),
);

export const selectWishlistCount = (s: WishlistState) => s.items.length;
