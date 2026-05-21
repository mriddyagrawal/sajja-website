"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PriceTag } from "@/components/product/PriceTag";
import { useCartStore } from "@/lib/cart/store";
import { useWishlistHydrated } from "@/lib/wishlist/hooks";
import { useWishlistStore } from "@/lib/wishlist/store";
import { cn } from "@/lib/utils";

export function WishlistContent() {
  const hydrated = useWishlistHydrated();
  const items = useWishlistStore((s) => s.items);
  const remove = useWishlistStore((s) => s.remove);
  const addToCart = useCartStore((s) => s.add);

  if (!hydrated) {
    return (
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <li
            key={i}
            className="bg-surface-shell/60 h-72 animate-pulse rounded-2xl"
            aria-hidden
          />
        ))}
      </ul>
    );
  }

  if (items.length === 0) {
    return (
      <div className="border-border-default rounded-2xl border border-dashed py-16 px-6 text-center sm:py-20">
        <span
          aria-hidden
          className="bg-brand-rose-50 text-brand-rose inline-flex h-12 w-12 items-center justify-center rounded-full"
        >
          <ShoppingBag className="h-5 w-5" />
        </span>
        <h2 className="font-display text-ink-charcoal mt-5 text-2xl sm:text-3xl">
          Nothing saved yet
        </h2>
        <p className="text-ink-muted mx-auto mt-2 max-w-md text-sm leading-relaxed">
          Tap the heart on any product to save it here for later.
        </p>
        <Link
          href="/shop"
          className="text-brand-rose hover:text-brand-magenta mt-6 inline-flex items-center gap-2 text-sm font-medium"
        >
          Start browsing
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const moveToCart = (item: (typeof items)[number]) => {
    addToCart({
      productId: item.productId,
      slug: item.slug,
      title: item.title,
      image: item.image,
      unitPrice: item.unitPrice,
    });
    remove(item.productId);
  };

  return (
    <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.productId}
          className={cn(
            "group border-border-default bg-surface-ivory flex flex-col overflow-hidden rounded-2xl border",
          )}
        >
          <Link
            href={`/products/${item.slug}`}
            className="bg-surface-shell relative block aspect-square overflow-hidden"
          >
            {item.image && (
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            )}
          </Link>

          <div className="flex flex-1 flex-col p-5">
            <Link
              href={`/products/${item.slug}`}
              className="hover:text-brand-rose font-display text-ink-charcoal block text-lg leading-tight transition"
            >
              {item.title}
            </Link>
            <PriceTag price={item.unitPrice} className="mt-2" />

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Button size="sm" onClick={() => moveToCart(item)} className="flex-1">
                <ShoppingBag className="h-4 w-4" />
                Move to cart
              </Button>
              <button
                type="button"
                onClick={() => remove(item.productId)}
                aria-label={`Remove ${item.title} from wishlist`}
                className="border-border-strong text-ink-muted hover:text-danger inline-flex h-9 items-center justify-center rounded-md border px-3 text-xs transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
