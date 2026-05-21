import Image from "next/image";
import Link from "next/link";

import { PriceTag } from "@/components/product/PriceTag";
import { WishlistHeart } from "@/components/product/WishlistHeart";
import { cn } from "@/lib/utils";
import { urlForSized } from "@/sanity/image";
import type { Product } from "@/sanity/types";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
  className?: string;
};

export function ProductCard({ product, priority, className }: ProductCardProps) {
  const primary = product.images[0];
  const secondary = product.images[1];
  const outOfStock = !product.inStock || (product.stockCount != null && product.stockCount <= 0);

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn("group block", className)}
      aria-label={`${product.title} — ${product.shortDescription}`}
    >
      <div className="bg-surface-shell relative aspect-square overflow-hidden rounded-xl">
        {primary && (
          <Image
            src={urlForSized(primary, { w: 800, q: 75 })}
            alt={primary.alt || product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
        {secondary && (
          <Image
            src={urlForSized(secondary, { w: 800, q: 75 })}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <Badge tone="rose">New</Badge>}
          {product.isBestseller && <Badge tone="gold">Bestseller</Badge>}
          {outOfStock && <Badge tone="charcoal">Sold out</Badge>}
        </div>

        <WishlistHeart product={product} className="absolute top-3 right-3" />
      </div>

      <div className="px-1 pt-4">
        <p className="text-ink-subtle text-[11px] tracking-[0.18em] uppercase">
          {product.category.title}
        </p>
        <h3 className="font-display text-ink-charcoal mt-1 text-lg leading-tight tracking-[-0.005em]">
          {product.title}
        </h3>
        <p className="text-ink-muted mt-1 line-clamp-1 text-sm">{product.shortDescription}</p>
        <PriceTag price={product.price} mrp={product.mrp} className="mt-2" />
      </div>
    </Link>
  );
}

function Badge({ tone, children }: { tone: "rose" | "gold" | "charcoal"; children: React.ReactNode }) {
  const tones = {
    rose: "bg-brand-rose text-ink-inverse",
    gold: "bg-brand-gold text-ink-charcoal",
    charcoal: "bg-ink-charcoal text-ink-inverse",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
