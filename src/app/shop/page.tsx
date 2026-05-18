import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Breadcrumbs } from "@/components/product/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ShopToolbar } from "@/components/shop/ShopToolbar";
import { parseSort, sortProducts } from "@/lib/products";
import { getAllCategories, getAllProducts } from "@/sanity/data";

export const metadata = {
  title: "Shop all",
  description:
    "Handcrafted décor, festive pieces and gifts — every product made by hand, made for occasions.",
};

type SearchParams = Promise<{ sort?: string }>;

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const [allProducts, categories, params] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    searchParams,
  ]);

  const sort = parseSort(params.sort);
  const products = sortProducts(allProducts, sort);

  return (
    <>
      <Section spacing="tight" className="pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
          <div className="mt-6 max-w-2xl">
            <Eyebrow>The Sajja edit</Eyebrow>
            <h1 className="font-display text-ink-charcoal mt-4 text-4xl tracking-[-0.01em] sm:text-5xl">
              Every piece, made by hand
            </h1>
            <p className="text-ink-muted mt-4 text-base leading-relaxed sm:text-lg">
              Brass, ceramic, wood and fabric — finished one piece at a time. Browse the full
              collection below.
            </p>
          </div>
        </Container>
      </Section>

      <Container>
        <ShopToolbar categories={categories} totalCount={products.length} />
      </Container>

      <Section spacing="tight">
        <Container>
          <ProductGrid products={products} priorityCount={4} />
        </Container>
      </Section>
    </>
  );
}
