import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Breadcrumbs } from "@/components/product/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ShopToolbar } from "@/components/shop/ShopToolbar";
import { parseSort, sortProducts } from "@/lib/products";
import {
  getAllCategories,
  getCategoryBySlug,
  getNewArrivals,
  getBestsellers,
  getProductsByCategory,
} from "@/sanity/data";
import type { Product } from "@/sanity/types";

type RouteParams = Promise<{ category: string }>;
type SearchParams = Promise<{ sort?: string }>;

const virtualCategories: Record<string, { title: string; blurb: string; loader: () => Promise<Product[]> }> = {
  "new-arrivals": {
    title: "New Arrivals",
    blurb: "The latest pieces, fresh from the studio.",
    loader: getNewArrivals,
  },
  bestsellers: {
    title: "Bestsellers",
    blurb: "The pieces our customers reach for most.",
    loader: getBestsellers,
  },
};

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const { category } = await params;
  const virtual = virtualCategories[category];
  if (virtual) return { title: virtual.title, description: virtual.blurb };

  const cat = await getCategoryBySlug(category);
  if (!cat) return { title: "Not found" };
  return { title: cat.title, description: cat.description ?? undefined };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: RouteParams;
  searchParams: SearchParams;
}) {
  const [{ category }, { sort: sortParam }] = await Promise.all([params, searchParams]);

  const virtual = virtualCategories[category];
  const sort = parseSort(sortParam);

  let title: string;
  let blurb: string | undefined;
  let products: Product[];

  if (virtual) {
    title = virtual.title;
    blurb = virtual.blurb;
    products = await virtual.loader();
  } else {
    const cat = await getCategoryBySlug(category);
    if (!cat) notFound();
    title = cat.title;
    blurb = cat.description;
    products = await getProductsByCategory(cat.slug);
  }

  const sorted = sortProducts(products, sort);
  const categories = await getAllCategories();

  return (
    <>
      <Section spacing="tight" className="pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: title },
            ]}
          />
          <div className="mt-6 max-w-2xl">
            <Eyebrow>Collection</Eyebrow>
            <h1 className="font-display text-ink-charcoal mt-4 text-4xl tracking-[-0.01em] sm:text-5xl">
              {title}
            </h1>
            {blurb && (
              <p className="text-ink-muted mt-4 text-base leading-relaxed sm:text-lg">{blurb}</p>
            )}
          </div>
        </Container>
      </Section>

      <Container>
        <ShopToolbar categories={categories} totalCount={sorted.length} activeCategory={category} />
      </Container>

      <Section spacing="tight">
        <Container>
          <ProductGrid products={sorted} priorityCount={4} />
        </Container>
      </Section>
    </>
  );
}
