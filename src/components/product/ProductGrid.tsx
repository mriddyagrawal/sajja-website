import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/sanity/types";

type ProductGridProps = {
  products: Product[];
  className?: string;
  /** First N cards get `priority` for LCP. */
  priorityCount?: number;
};

export function ProductGrid({ products, className, priorityCount = 0 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="border-border-default rounded-xl border border-dashed py-20 text-center">
        <p className="font-display text-ink-charcoal text-2xl">Nothing here yet</p>
        <p className="text-ink-muted mt-2 text-sm">
          Try browsing a different category — or check back soon.
        </p>
      </div>
    );
  }

  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {products.map((p, i) => (
        <li key={p._id}>
          <ProductCard product={p} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
