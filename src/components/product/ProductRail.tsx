import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/sanity/types";

type ProductRailProps = {
  title: string;
  eyebrow?: string;
  products: Product[];
  href?: string;
  className?: string;
};

export function ProductRail({ title, eyebrow, products, href, className }: ProductRailProps) {
  if (products.length === 0) return null;

  return (
    <Section spacing="default" className={className}>
      <Container>
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2 className="font-display text-ink-charcoal mt-3 text-3xl sm:text-4xl">{title}</h2>
          </div>
          {href && (
            <Link
              href={href}
              className="text-brand-rose hover:text-brand-magenta inline-flex shrink-0 items-center gap-2 text-sm font-medium tracking-wide transition"
            >
              See all
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {/* Mobile: horizontal scroll. Desktop: grid. */}
        <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:overflow-visible sm:px-0">
          <ul
            className={cn(
              "flex w-max gap-4 sm:grid sm:w-auto sm:gap-6",
              products.length >= 4
                ? "sm:grid-cols-2 lg:grid-cols-4"
                : "sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {products.slice(0, 4).map((p) => (
              <li key={p._id} className="w-[240px] shrink-0 sm:w-auto">
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
