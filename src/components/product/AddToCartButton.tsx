"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { useCartStore } from "@/lib/cart/store";
import type { Product } from "@/sanity/types";

type AddToCartButtonProps = {
  product: Product;
  className?: string;
};

/**
 * Visually complete add-to-cart UX. Persists to the Zustand cart store
 * and triggers the drawer to open. Phase 3 will layer server-side cart
 * sync on top of this (no changes needed here).
 */
export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const add = useCartStore((s) => s.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const outOfStock = !product.inStock || (product.stockCount != null && product.stockCount <= 0);

  const onAdd = () => {
    if (outOfStock) return;
    add({
      productId: product._id,
      slug: product.slug,
      title: product.title,
      image: product.images[0]?.url ?? "",
      unitPrice: product.price,
      stockCap: product.stockCount,
      quantity: qty,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  if (outOfStock) {
    return (
      <div className={className}>
        <Button disabled size="lg" className="w-full">
          Sold out
        </Button>
        <p className="text-ink-muted mt-2 text-xs">
          Tell us you want it — we may craft another.{" "}
          <a className="text-brand-rose hover:underline" href="/contact">
            Notify me
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-stretch gap-3">
        <QuantityStepper value={qty} onChange={setQty} max={product.stockCount ?? 99} />
        <Button size="lg" onClick={onAdd} className="flex-1">
          {added ? (
            <>
              <Check className="h-4 w-4" />
              Added
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              Add to cart
            </>
          )}
        </Button>
      </div>

      {product.stockCount != null && product.stockCount <= 5 && (
        <p className="text-brand-rose mt-3 text-xs font-medium">
          Only {product.stockCount} left in this batch
        </p>
      )}
    </div>
  );
}
