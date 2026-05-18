/**
 * Unified data access. Routes Sanity reads through `sanityClient` when
 * configured; otherwise returns mock data so the site stays buildable
 * before the user creates a Sanity project.
 */
import { sanityClient } from "./client";
import {
  allCategoriesQuery,
  allProductSlugsQuery,
  allProductsQuery,
  bestsellersQuery,
  featuredProductsQuery,
  homepageHeroQuery,
  newArrivalsQuery,
  productBySlugQuery,
  productsByCategoryQuery,
  relatedProductsQuery,
  siteSettingsQuery,
} from "./queries";
import {
  mockCategories,
  mockHero,
  mockProducts,
  mockSettings,
} from "./mock";
import type { Category, HomepageHero, Product, SiteSettings } from "./types";

const REVALIDATE_SECONDS = 60;

async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  if (!sanityClient) return fallback;
  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch (err) {
    console.error("[sanity] query failed, falling back to mock:", err);
    return fallback;
  }
}

// --- Products ---

export async function getAllProducts(): Promise<Product[]> {
  return fetchSanity(allProductsQuery, {}, mockProducts);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (sanityClient) {
    return fetchSanity(productBySlugQuery, { slug }, mockProducts.find((p) => p.slug === slug) ?? null);
  }
  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  if (sanityClient) {
    return fetchSanity(
      productsByCategoryQuery,
      { categorySlug },
      mockProducts.filter((p) => p.category.slug === categorySlug),
    );
  }
  return mockProducts.filter((p) => p.category.slug === categorySlug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return fetchSanity(
    featuredProductsQuery,
    {},
    mockProducts.filter((p) => p.isFeatured).slice(0, 8),
  );
}

export async function getNewArrivals(): Promise<Product[]> {
  return fetchSanity(
    newArrivalsQuery,
    {},
    mockProducts.filter((p) => p.isNew).slice(0, 8),
  );
}

export async function getBestsellers(): Promise<Product[]> {
  return fetchSanity(
    bestsellersQuery,
    {},
    mockProducts.filter((p) => p.isBestseller).slice(0, 8),
  );
}

export async function getRelatedProducts(
  categorySlug: string,
  excludeSlug: string,
): Promise<Product[]> {
  if (sanityClient) {
    return fetchSanity(
      relatedProductsQuery,
      { categorySlug, excludeSlug },
      mockProducts
        .filter((p) => p.category.slug === categorySlug && p.slug !== excludeSlug)
        .slice(0, 4),
    );
  }
  return mockProducts
    .filter((p) => p.category.slug === categorySlug && p.slug !== excludeSlug)
    .slice(0, 4);
}

export async function getAllProductSlugs(): Promise<string[]> {
  if (sanityClient) {
    return fetchSanity(allProductSlugsQuery, {}, mockProducts.map((p) => p.slug));
  }
  return mockProducts.map((p) => p.slug);
}

// --- Categories ---

export async function getAllCategories(): Promise<Category[]> {
  return fetchSanity(allCategoriesQuery, {}, mockCategories);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const cats = await getAllCategories();
  return cats.find((c) => c.slug === slug) ?? null;
}

// --- Singletons ---

export async function getHomepageHero(): Promise<HomepageHero> {
  return fetchSanity(homepageHeroQuery, {}, mockHero);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchSanity(siteSettingsQuery, {}, mockSettings);
}
