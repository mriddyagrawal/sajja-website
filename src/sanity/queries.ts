import { groq } from "next-sanity";

/**
 * GROQ queries against the Sanity dataset. Each query is paired with a
 * matching function in `data.ts` that runs it via the client, with a mock
 * fallback when Sanity isn't configured.
 */

const productFields = `
  _id,
  title,
  "slug": slug.current,
  price,
  mrp,
  shortDescription,
  description,
  "images": images[]{ "url": asset->url, alt },
  "category": category->{ _id, title, "slug": slug.current },
  "subcategory": subcategory->{ _id, title, "slug": slug.current },
  inStock,
  stockCount,
  sku,
  tags,
  weightGrams,
  dimensions,
  materials,
  careInstructions,
  craftedBy,
  isFeatured,
  isBestseller,
  isNew,
  publishedAt,
  seo
`;

export const allProductsQuery = groq`
  *[_type == "product" && !(_id in path("drafts.**"))]
    | order(publishedAt desc) {
    ${productFields}
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    ${productFields}
  }
`;

export const productsByCategoryQuery = groq`
  *[_type == "product" && category->slug.current == $categorySlug]
    | order(publishedAt desc) {
    ${productFields}
  }
`;

export const featuredProductsQuery = groq`
  *[_type == "product" && isFeatured == true]
    | order(publishedAt desc)[0...8] {
    ${productFields}
  }
`;

export const newArrivalsQuery = groq`
  *[_type == "product" && isNew == true]
    | order(publishedAt desc)[0...8] {
    ${productFields}
  }
`;

export const bestsellersQuery = groq`
  *[_type == "product" && isBestseller == true]
    | order(publishedAt desc)[0...8] {
    ${productFields}
  }
`;

export const relatedProductsQuery = groq`
  *[_type == "product"
    && category->slug.current == $categorySlug
    && slug.current != $excludeSlug]
    | order(publishedAt desc)[0...4] {
    ${productFields}
  }
`;

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "image": image{ "url": asset->url, alt },
    order
  }
`;

export const homepageHeroQuery = groq`
  *[_type == "homepageHero"][0] {
    slides[]{
      headline,
      subhead,
      ctaLabel,
      ctaHref,
      "image": image{ "url": asset->url, alt },
      "imageMobile": imageMobile{ "url": asset->url, alt },
      textPosition
    }
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    announcementBar,
    whatsappNumber,
    supportEmail,
    shippingThreshold,
    socialLinks
  }
`;

export const allProductSlugsQuery = groq`
  *[_type == "product" && defined(slug.current)][].slug.current
`;

export const allCategorySlugsQuery = groq`
  *[_type == "category" && defined(slug.current)][].slug.current
`;
