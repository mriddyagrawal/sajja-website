"use client";

import { useSyncExternalStore } from "react";
import {
  selectIsEmpty,
  selectItemCount,
  selectSubtotal,
  useCartStore,
} from "./store";

/**
 * Wrappers that guard against SSR/client hydration mismatches.
 *
 * Zustand `persist` rehydrates only on the client, so during the first
 * client render the store is still empty. Components that show cart
 * counts (e.g. the header badge) need to wait until rehydration is done
 * before rendering real values, otherwise we get a flicker from "0" to
 * the persisted number.
 */
export function useHydrated() {
  return useSyncExternalStore(
    (callback) => useCartStore.persist.onFinishHydration(callback),
    () => useCartStore.persist.hasHydrated(),
    () => false,
  );
}

export function useCartCount() {
  const count = useCartStore(selectItemCount);
  const hydrated = useHydrated();
  return hydrated ? count : 0;
}

export function useCartSubtotal() {
  return useCartStore(selectSubtotal);
}

export function useCartIsEmpty() {
  return useCartStore(selectIsEmpty);
}
