import { cn } from "@/lib/utils";
import { discountPercent, formatPrice } from "@/sanity/types";

type PriceTagProps = {
  price: number;
  mrp?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: {
    price: "text-sm",
    mrp: "text-xs",
    badge: "text-[10px] px-1.5 py-0.5",
  },
  md: {
    price: "text-base",
    mrp: "text-sm",
    badge: "text-xs px-2 py-0.5",
  },
  lg: {
    price: "text-2xl",
    mrp: "text-base",
    badge: "text-xs px-2 py-1",
  },
};

export function PriceTag({ price, mrp, className, size = "md" }: PriceTagProps) {
  const off = discountPercent(price, mrp);
  const s = sizes[size];

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span className={cn("text-ink-charcoal font-medium", s.price)}>{formatPrice(price)}</span>
      {mrp && mrp > price && (
        <span className={cn("text-ink-subtle line-through", s.mrp)}>{formatPrice(mrp)}</span>
      )}
      {off && (
        <span
          className={cn(
            "bg-brand-rose-50 text-brand-rose rounded font-semibold tracking-wider uppercase",
            s.badge,
          )}
        >
          {off}% off
        </span>
      )}
    </div>
  );
}
