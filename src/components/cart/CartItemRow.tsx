"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { QuantityStepper } from "@/components/product/QuantityStepper";
import { useCartStore, type CartItem } from "@/lib/cart/store";
import { formatPrice } from "@/sanity/types";
import { cn } from "@/lib/utils";

type CartItemRowProps = {
  item: CartItem;
  /** Compact = drawer layout. Wide = `/cart` layout. */
  variant?: "compact" | "wide";
  className?: string;
  /** When the drawer is open, links should close it after click. */
  onLinkNavigate?: () => void;
};

export function CartItemRow({
  item,
  variant = "compact",
  className,
  onLinkNavigate,
}: CartItemRowProps) {
  const updateQty = useCartStore((s) => s.updateQty);
  const remove = useCartStore((s) => s.remove);

  const lineTotal = item.unitPrice * item.quantity;

  const thumbSize = variant === "compact" ? "w-20" : "w-24 sm:w-28";

  return (
    <article
      className={cn(
        "grid items-start gap-4",
        variant === "compact"
          ? "grid-cols-[5rem_1fr]"
          : "grid-cols-[6rem_1fr] sm:grid-cols-[7rem_1fr_auto]",
        className,
      )}
    >
      <Link
        href={`/products/${item.slug}`}
        onClick={onLinkNavigate}
        className={cn("bg-surface-shell relative aspect-square overflow-hidden rounded-md", thumbSize)}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 96px, 112px"
          className="object-cover"
        />
      </Link>

      <div className="min-w-0">
        <Link
          href={`/products/${item.slug}`}
          onClick={onLinkNavigate}
          className="hover:text-brand-rose text-ink-charcoal font-display block text-base leading-tight transition sm:text-lg"
        >
          {item.title}
        </Link>
        <p className="text-ink-muted mt-1 text-sm">{formatPrice(item.unitPrice)} each</p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <QuantityStepper
            value={item.quantity}
            onChange={(v) => updateQty(item.productId, v)}
            min={1}
            max={item.stockCap ?? 99}
          />
          <button
            type="button"
            onClick={() => remove(item.productId)}
            aria-label={`Remove ${item.title} from cart`}
            className="text-ink-muted hover:text-danger inline-flex items-center gap-1 text-xs transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>

        {variant === "compact" && (
          <p className="text-ink-charcoal mt-3 text-sm font-medium">{formatPrice(lineTotal)}</p>
        )}
      </div>

      {variant === "wide" && (
        <p className="text-ink-charcoal hidden text-base font-medium tabular-nums sm:block">
          {formatPrice(lineTotal)}
        </p>
      )}
    </article>
  );
}
