import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { CategoryPreview } from "@/components/home/CategoryPreview";
import { BrandStory } from "@/components/home/BrandStory";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <CategoryPreview />
      <BrandStory />
    </>
  );
}
