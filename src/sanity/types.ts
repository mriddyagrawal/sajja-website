/**
 * Shared types for Sanity content. These mirror the schema definitions
 * so Phase 1 code can stay typed even before the Sanity project is wired.
 *
 * Prices are stored as integers in paise (₹1 = 100 paise).
 */

export type SanityImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  /** Sanity hotspot for smart cropping (0-1). */
  hotspot?: { x: number; y: number };
};

export type CategorySlug =
  | "decor"
  | "pooja-festive"
  | "gifting"
  | "new-arrivals"
  | "bestsellers"
  | "sale";

export type Category = {
  _id: string;
  title: string;
  slug: CategorySlug | string;
  description?: string;
  image?: SanityImage;
  order: number;
  parent?: { _ref: string; slug: string } | null;
};

export type Product = {
  _id: string;
  title: string;
  slug: string;
  category: Pick<Category, "_id" | "title" | "slug">;
  subcategory?: Pick<Category, "_id" | "title" | "slug">;
  /** Selling price in paise. */
  price: number;
  /** Crossed-out original price in paise (optional). */
  mrp?: number;
  shortDescription: string;
  description: string;
  images: SanityImage[];
  inStock: boolean;
  stockCount?: number;
  sku: string;
  tags: string[];
  weightGrams?: number;
  dimensions?: { l: number; w: number; h: number };
  materials?: string[];
  careInstructions?: string;
  craftedBy?: string;
  isFeatured: boolean;
  isBestseller: boolean;
  isNew: boolean;
  publishedAt: string;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: SanityImage;
  };
};

export type HomepageHero = {
  slides: Array<{
    headline: string;
    subhead?: string;
    ctaLabel: string;
    ctaHref: string;
    image: SanityImage;
    imageMobile?: SanityImage;
    textPosition: "left" | "right" | "center";
  }>;
};

export type SiteSettings = {
  announcementBar: string;
  whatsappNumber: string;
  supportEmail: string;
  shippingThreshold: number;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    pinterest?: string;
    whatsapp?: string;
  };
};

/** Helper: format paise as ₹X,XXX with Indian-locale grouping. */
export function formatPrice(paise: number): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

export function discountPercent(price: number, mrp?: number): number | null {
  if (!mrp || mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}
