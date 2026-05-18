import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { CategoryPreview } from "@/components/home/CategoryPreview";
import { BrandStory } from "@/components/home/BrandStory";
import { ProductRail } from "@/components/product/ProductRail";
import { getBestsellers, getNewArrivals } from "@/sanity/data";

export default async function HomePage() {
  const [newArrivals, bestsellers] = await Promise.all([getNewArrivals(), getBestsellers()]);

  return (
    <>
      <Hero />
      <ValueProps />
      <CategoryPreview />
      <ProductRail
        eyebrow="Just landed"
        title="New arrivals"
        products={newArrivals}
        href="/shop/new-arrivals"
      />
      <ProductRail
        eyebrow="Loved by our customers"
        title="Bestsellers"
        products={bestsellers}
        href="/shop/bestsellers"
        className="bg-surface-shell"
      />
      <BrandStory />
    </>
  );
}
