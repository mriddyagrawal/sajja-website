import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Heart, Leaf, RefreshCw, Truck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/product/Breadcrumbs";
import { ImageGallery } from "@/components/product/ImageGallery";
import { PriceTag } from "@/components/product/PriceTag";
import { ProductRail } from "@/components/product/ProductRail";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { Button } from "@/components/ui/Button";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/sanity/data";
import { siteConfig } from "@/lib/nav";

type RouteParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not found" };

  const title = product.seo?.title ?? product.title;
  const description = product.seo?.description ?? product.shortDescription;
  const image = product.seo?.ogImage?.url ?? product.images[0]?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.category.slug, product.slug);

  // JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    image: product.images.map((i) => i.url),
    sku: product.sku,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/products/${product.slug}`,
      priceCurrency: "INR",
      price: (product.price / 100).toFixed(2),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section spacing="tight" className="pt-8">
        <Container>
          <Breadcrumbs
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: product.category.title, href: `/shop/${product.category.slug}` },
              { label: product.title },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            {/* Gallery */}
            <ImageGallery images={product.images} title={product.title} />

            {/* Details */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-ink-subtle text-[11px] tracking-[0.22em] uppercase">
                {product.category.title}
              </p>
              <h1 className="font-display text-ink-charcoal mt-2 text-3xl tracking-[-0.01em] sm:text-4xl md:text-5xl">
                {product.title}
              </h1>

              <PriceTag price={product.price} mrp={product.mrp} size="lg" className="mt-5" />

              <p className="text-ink-default mt-6 text-base leading-relaxed">
                {product.shortDescription}
              </p>

              <AddToCartButton product={product} className="mt-8" />

              <div className="border-border-default mt-6 flex items-center gap-2 border-t pt-6">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Heart className="h-4 w-4" />
                  Save for later
                </Button>
              </div>

              {/* Trust strip */}
              <ul className="text-ink-default border-border-default mt-6 grid grid-cols-1 gap-3 border-t pt-6 text-sm sm:grid-cols-3 sm:gap-2">
                <li className="flex items-center gap-2">
                  <Leaf className="text-brand-rose h-4 w-4 shrink-0" />
                  <span>Handcrafted in India</span>
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="text-brand-rose h-4 w-4 shrink-0" />
                  <span>Ships in 3–5 days</span>
                </li>
                <li className="flex items-center gap-2">
                  <RefreshCw className="text-brand-rose h-4 w-4 shrink-0" />
                  <span>Easy returns</span>
                </li>
              </ul>

              {/* Description / details */}
              <div className="border-border-default mt-8 space-y-6 border-t pt-8">
                <Detail title="About this piece">
                  <p className="text-ink-default text-sm leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </Detail>

                {product.materials && product.materials.length > 0 && (
                  <Detail title="Materials">
                    <p className="text-ink-default text-sm leading-relaxed">
                      {product.materials.join(", ")}
                    </p>
                  </Detail>
                )}

                {product.careInstructions && (
                  <Detail title="Care">
                    <p className="text-ink-default text-sm leading-relaxed whitespace-pre-line">
                      {product.careInstructions}
                    </p>
                  </Detail>
                )}

                {product.dimensions && (
                  <Detail title="Dimensions">
                    <p className="text-ink-default text-sm leading-relaxed">
                      {product.dimensions.l} × {product.dimensions.w} ×{" "}
                      {product.dimensions.h} cm
                      {product.weightGrams && ` · ${product.weightGrams}g`}
                    </p>
                  </Detail>
                )}

                {product.craftedBy && (
                  <Detail title="Crafted by">
                    <p className="text-ink-default text-sm leading-relaxed">
                      {product.craftedBy}
                    </p>
                  </Detail>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <ProductRail
          eyebrow="You may also like"
          title="More from this collection"
          products={related}
          href={`/shop/${product.category.slug}`}
        />
      )}
    </>
  );
}

function Detail({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-ink-charcoal text-xs font-semibold tracking-[0.22em] uppercase">
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}
