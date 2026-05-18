"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type WishlistHeartProps = {
  productId: string;
  productTitle: string;
  className?: string;
};

/**
 * Wishlist toggle. Phase 3 will wire this to the server-backed wishlist.
 * For now it toggles local state only.
 */
export function WishlistHeart({ productId: _productId, productTitle, className }: WishlistHeartProps) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-label={saved ? `Remove ${productTitle} from wishlist` : `Add ${productTitle} to wishlist`}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSaved((v) => !v);
      }}
      className={cn(
        "hover:bg-surface-cream inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/85 backdrop-blur-sm transition-all",
        saved ? "text-brand-rose" : "text-ink-charcoal",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4 transition-transform", saved && "fill-current scale-110")} />
    </button>
  );
}
