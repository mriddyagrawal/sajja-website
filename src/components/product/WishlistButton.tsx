"use client";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useIsWishlisted } from "@/lib/wishlist/hooks";
import { useWishlistStore } from "@/lib/wishlist/store";
import type { Product } from "@/sanity/types";
import { cn } from "@/lib/utils";

/**
 * Full-width wishlist toggle button used on the PDP.
 * Floating-circle treatment for product cards lives in `<WishlistHeart>`.
 */
export function WishlistButton({
  product,
  className,
}: {
  product: Pick<Product, "_id" | "slug" | "title" | "price"> & {
    images: { url: string }[];
  };
  className?: string;
}) {
  const saved = useIsWishlisted(product._id);
  const toggle = useWishlistStore((s) => s.toggle);

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("flex-1", className)}
      aria-pressed={saved}
      onClick={() =>
        toggle({
          productId: product._id,
          slug: product.slug,
          title: product.title,
          image: product.images[0]?.url ?? "",
          unitPrice: product.price,
        })
      }
    >
      <Heart className={cn("h-4 w-4 transition-transform", saved && "fill-current text-brand-rose")} />
      {saved ? "Saved" : "Save for later"}
    </Button>
  );
}
