"use client";

import { Heart } from "lucide-react";
import { useIsWishlisted } from "@/lib/wishlist/hooks";
import { useWishlistStore } from "@/lib/wishlist/store";
import type { Product } from "@/sanity/types";
import { cn } from "@/lib/utils";

type WishlistHeartProps = {
  product: Pick<Product, "_id" | "slug" | "title" | "price"> & {
    images: { url: string }[];
  };
  className?: string;
  /** Always visible (vs. only on card hover). */
  alwaysVisible?: boolean;
};

export function WishlistHeart({ product, className, alwaysVisible }: WishlistHeartProps) {
  const saved = useIsWishlisted(product._id);
  const toggle = useWishlistStore((s) => s.toggle);

  const onToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle({
      productId: product._id,
      slug: product.slug,
      title: product.title,
      image: product.images[0]?.url ?? "",
      unitPrice: product.price,
    });
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={
        saved ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`
      }
      aria-pressed={saved}
      className={cn(
        "hover:bg-surface-cream inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/85 backdrop-blur-sm transition-all",
        saved ? "text-brand-rose" : "text-ink-charcoal",
        alwaysVisible ? "opacity-100" : "opacity-100 sm:opacity-0 sm:group-hover:opacity-100",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4 transition-transform", saved && "fill-current scale-110")} />
    </button>
  );
}
