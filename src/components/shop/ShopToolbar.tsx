"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Category } from "@/sanity/types";

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "popular", label: "Popular" },
];

export function ShopToolbar({
  categories,
  totalCount,
  activeCategory,
}: {
  categories: Category[];
  totalCount: number;
  activeCategory?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const currentSort = params.get("sort") ?? "newest";

  const setSort = useCallback(
    (value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value === "newest") next.delete("sort");
      else next.set("sort", value);
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router],
  );

  return (
    <div className="border-border-default flex flex-col gap-4 border-y py-5 md:flex-row md:items-center md:justify-between">
      {/* Category chips */}
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          <Chip href="/shop" active={!activeCategory}>
            All
          </Chip>
        </li>
        {categories.map((c) => (
          <li key={c._id}>
            <Chip href={`/shop/${c.slug}`} active={activeCategory === c.slug}>
              {c.title}
            </Chip>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-4 md:justify-end">
        <p className="text-ink-muted text-xs">
          {totalCount} {totalCount === 1 ? "piece" : "pieces"}
        </p>
        <label className="inline-flex items-center gap-2 text-xs">
          <span className="text-ink-muted tracking-[0.18em] uppercase">Sort</span>
          <select
            value={currentSort}
            onChange={(e) => setSort(e.target.value)}
            className="border-border-strong text-ink-charcoal focus:border-brand-rose focus:ring-brand-rose/20 rounded-md border bg-white px-3 py-2 text-sm focus:ring-2 focus:outline-none"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-8 items-center rounded-full border px-3.5 text-xs font-medium tracking-wide transition",
        active
          ? "border-brand-rose bg-brand-rose text-ink-inverse"
          : "border-border-strong text-ink-default hover:border-brand-rose hover:text-brand-rose bg-transparent",
      )}
    >
      {children}
    </Link>
  );
}
