"use client";

import { useSyncExternalStore } from "react";
import { selectWishlistCount, useWishlistStore } from "./store";

function useHydrated() {
  return useSyncExternalStore(
    (cb) => useWishlistStore.persist.onFinishHydration(cb),
    () => useWishlistStore.persist.hasHydrated(),
    () => false,
  );
}

export function useWishlistCount() {
  const count = useWishlistStore(selectWishlistCount);
  const hydrated = useHydrated();
  return hydrated ? count : 0;
}

export function useIsWishlisted(productId: string) {
  // Reactive: re-evaluates whenever items change for THIS productId.
  return useWishlistStore((s) => s.items.some((i) => i.productId === productId));
}

export { useHydrated as useWishlistHydrated };
