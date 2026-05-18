import type { Product } from "@/sanity/types";

export type SortKey = "newest" | "price-asc" | "price-desc" | "popular";

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "popular":
      return copy.sort((a, b) => {
        // Bestsellers first, then featured, then newest.
        const pa = (a.isBestseller ? 2 : 0) + (a.isFeatured ? 1 : 0);
        const pb = (b.isBestseller ? 2 : 0) + (b.isFeatured ? 1 : 0);
        if (pa !== pb) return pb - pa;
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
    case "newest":
    default:
      return copy.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
  }
}

export function parseSort(value: string | null | undefined): SortKey {
  if (value === "price-asc" || value === "price-desc" || value === "popular" || value === "newest") {
    return value;
  }
  return "newest";
}
