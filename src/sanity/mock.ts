import type { Category, HomepageHero, Product, SiteSettings } from "./types";

/**
 * Mock data used until the user creates a real Sanity project and populates
 * NEXT_PUBLIC_SANITY_PROJECT_ID in `.env.local`.
 *
 * Images use picsum.photos with stable seeds — generic placeholders that
 * always work. They are NOT representative of the actual product; they
 * exist so the layout and design system have realistic images to fill.
 * Real product photography will live in Sanity once that's wired.
 */

const u = (seed: string, opts: { w?: number; h?: number } = {}) =>
  `https://picsum.photos/seed/sajja-${seed}/${opts.w ?? 1200}/${opts.h ?? 1200}`;

// --- Categories ---

export const mockCategories: Category[] = [
  {
    _id: "cat-decor",
    title: "Décor",
    slug: "decor",
    description: "Statement pieces — painted, sculpted, and gilded for the home.",
    image: { url: u("1505691938895-1758d7feb511"), alt: "Décor" },
    order: 1,
    parent: null,
  },
  {
    _id: "cat-pooja",
    title: "Pooja & Festive",
    slug: "pooja-festive",
    description: "Diyas, idols, torans and lamps for celebrations.",
    image: { url: u("1604608672516-f1b9b1d3a8c8"), alt: "Pooja & Festive" },
    order: 2,
    parent: null,
  },
  {
    _id: "cat-gifting",
    title: "Gifting",
    slug: "gifting",
    description: "Bundled, boxed and ready to give.",
    image: { url: u("1549049950-48d5887197d8"), alt: "Gifting" },
    order: 3,
    parent: null,
  },
];

// --- Products ---

const baseProduct = {
  inStock: true,
  isFeatured: false,
  isBestseller: false,
  isNew: false,
  tags: [] as string[],
  publishedAt: "2026-05-01T00:00:00Z",
};

export const mockProducts: Product[] = [
  {
    ...baseProduct,
    _id: "p-brass-diya-set",
    title: "Brass Diya Set of 5",
    slug: "brass-diya-set-of-5",
    category: { _id: "cat-pooja", title: "Pooja & Festive", slug: "pooja-festive" },
    price: 149000, // ₹1,490
    mrp: 199000,
    shortDescription: "Hand-finished brass diyas, set of five — a timeless festive essential.",
    description:
      "A timeless set of five solid brass diyas, hand-finished in our studio. Each piece is cast individually and polished to a soft satin sheen — never lacquered, so the brass develops a beautiful patina over the years. Perfect for Diwali, daily pooja, or to gift the home of someone you love.",
    images: [
      { url: u("1604608672516-f1b9b1d3a8c8"), alt: "Brass diyas arranged on a tray" },
      { url: u("1572455024141-d10b1a7dd5d3"), alt: "Brass diya close-up" },
      { url: u("1573497019418-b4b3c33a8b5a"), alt: "Brass diyas with flowers" },
    ],
    stockCount: 24,
    sku: "SAJ-DIYA-5",
    tags: ["diwali", "pooja", "brass", "festive"],
    weightGrams: 380,
    dimensions: { l: 8, w: 8, h: 3 },
    materials: ["Solid brass"],
    careInstructions:
      "Wipe with a soft dry cloth. For deeper cleaning, use lemon juice + salt. Avoid lacquer remover.",
    craftedBy: "Moradabad artisans",
    isFeatured: true,
    isBestseller: true,
    isNew: false,
  },
  {
    ...baseProduct,
    _id: "p-terracotta-vase",
    title: "Hand-painted Terracotta Vase",
    slug: "hand-painted-terracotta-vase",
    category: { _id: "cat-decor", title: "Décor", slug: "decor" },
    price: 249000,
    shortDescription: "A statement vase, painted by hand in earthy ochre and rose.",
    description:
      "Wheel-thrown in red terracotta and painted by hand using natural pigments. Each piece carries the slight irregularity that comes from its maker — no two are exactly alike.",
    images: [
      { url: u("1578500494198-246f612d3b3d"), alt: "Painted terracotta vase" },
      { url: u("1485955900006-10f4d324d411"), alt: "Vase with dried flowers" },
    ],
    stockCount: 7,
    sku: "SAJ-VASE-TR-01",
    tags: ["decor", "terracotta", "handpainted"],
    weightGrams: 1200,
    dimensions: { l: 18, w: 18, h: 28 },
    materials: ["Red terracotta", "Mineral pigments"],
    careInstructions: "Dust gently. Wipe with a barely-damp cloth. Do not submerge.",
    craftedBy: "Khurja pottery cluster",
    isFeatured: true,
    isNew: true,
  },
  {
    ...baseProduct,
    _id: "p-mango-wood-toran",
    title: "Mango Wood Toran",
    slug: "mango-wood-toran",
    category: { _id: "cat-pooja", title: "Pooja & Festive", slug: "pooja-festive" },
    price: 189000,
    mrp: 229000,
    shortDescription: "A carved mango-wood doorway hanging that welcomes every guest.",
    description:
      "Hand-carved from sustainably sourced mango wood, finished with a beeswax polish. Strung on natural jute, ready to hang above any doorway. A classic Indian welcome.",
    images: [
      { url: u("1604608672516-f1b9b1d3a8c8"), alt: "Wood toran on doorway" },
      { url: u("1549221987-25a490f65d34"), alt: "Toran detail" },
    ],
    stockCount: 12,
    sku: "SAJ-TORAN-MW",
    tags: ["pooja", "diwali", "wood", "doorway"],
    weightGrams: 320,
    dimensions: { l: 90, w: 12, h: 2 },
    materials: ["Mango wood", "Jute cord"],
    careInstructions: "Wipe with a dry cloth. Keep away from direct moisture.",
    craftedBy: "Saharanpur carvers",
    isBestseller: true,
  },
  {
    ...baseProduct,
    _id: "p-block-pillow",
    title: "Block-printed Cushion Cover",
    slug: "block-printed-cushion-cover",
    category: { _id: "cat-decor", title: "Décor", slug: "decor" },
    price: 79000,
    mrp: 99000,
    shortDescription: "Cotton cushion cover, block-printed in rose and gold.",
    description:
      "Hand block-printed on natural cotton in our signature rose-and-gold palette. Hidden zip closure. Fits a 40×40 cm cushion insert (not included).",
    images: [
      { url: u("1555041469-a586c61ea9bc"), alt: "Block-printed cushion on sofa" },
      { url: u("1586023492125-27b2c045efd7"), alt: "Cushion close-up" },
    ],
    stockCount: 30,
    sku: "SAJ-CUSH-BP-RG",
    tags: ["decor", "cotton", "blockprint"],
    weightGrams: 180,
    dimensions: { l: 40, w: 40, h: 1 },
    materials: ["100% cotton"],
    careInstructions: "Hand wash cold, separately. Iron on reverse.",
    craftedBy: "Bagru printers, Rajasthan",
    isNew: true,
    isFeatured: true,
  },
  {
    ...baseProduct,
    _id: "p-silver-ganesha",
    title: "Silver-plated Ganesha Idol",
    slug: "silver-plated-ganesha-idol",
    category: { _id: "cat-pooja", title: "Pooja & Festive", slug: "pooja-festive" },
    price: 349000,
    shortDescription: "A small Ganesha on a lotus pedestal, plated in 92.5 silver.",
    description:
      "Cast in brass and finished with 92.5 silver plating. Stands on a removable lotus pedestal. A modest, elegant piece for daily pooja or as a housewarming gift.",
    images: [
      { url: u("1604608672516-f1b9b1d3a8c8"), alt: "Silver Ganesha idol" },
      { url: u("1605647540924-852290f6b0d5"), alt: "Idol detail" },
    ],
    stockCount: 5,
    sku: "SAJ-GAN-SLV",
    tags: ["pooja", "ganesha", "silver", "gifting"],
    weightGrams: 480,
    dimensions: { l: 9, w: 9, h: 14 },
    materials: ["Brass", "92.5 silver plating"],
    careInstructions: "Use a silver polishing cloth. Avoid harsh chemicals.",
    craftedBy: "Jaipur silversmiths",
    isFeatured: true,
    isBestseller: true,
  },
  {
    ...baseProduct,
    _id: "p-peacock-wall",
    title: "Brass Peacock Wall Hanging",
    slug: "brass-peacock-wall-hanging",
    category: { _id: "cat-decor", title: "Décor", slug: "decor" },
    price: 459000,
    shortDescription: "A regal peacock cast in brass — for an entryway that announces itself.",
    description:
      "Cast in solid brass, the feathers detailed by hand. Comes with concealed hooks and mounting hardware. A piece meant to be inherited.",
    images: [
      { url: u("1605647540924-852290f6b0d5"), alt: "Brass peacock wall art" },
    ],
    stockCount: 3,
    sku: "SAJ-PEACK-BRS",
    tags: ["decor", "brass", "wall art"],
    weightGrams: 2400,
    dimensions: { l: 45, w: 32, h: 3 },
    materials: ["Solid brass"],
    careInstructions: "Dust gently. Polish with brass cleaner once a year.",
    craftedBy: "Moradabad metalworks",
    isFeatured: true,
  },
  {
    ...baseProduct,
    _id: "p-diwali-gift-box",
    title: "Diwali Gift Box — The Classic",
    slug: "diwali-gift-box-the-classic",
    category: { _id: "cat-gifting", title: "Gifting", slug: "gifting" },
    price: 299000,
    mrp: 349000,
    shortDescription: "Two diyas, a brass bell, scented agarbatti and a handwritten note.",
    description:
      "Our most-loved festive bundle. Includes two solid-brass diyas, a tuned brass bell, a bundle of pure sandalwood agarbatti, and a handwritten note. Presented in a foil-stamped box lined with raw silk.",
    images: [
      { url: u("1549049950-48d5887197d8"), alt: "Diwali gift box opened" },
      { url: u("1606136968080-3cdd7a14ce9d"), alt: "Gift box closed" },
    ],
    stockCount: 18,
    sku: "SAJ-GIFT-DIWALI-1",
    tags: ["gifting", "diwali", "festive", "bundle"],
    weightGrams: 900,
    materials: ["Brass", "Sandalwood", "Silk", "Recycled card"],
    craftedBy: "Sajja studio",
    isBestseller: true,
    isFeatured: true,
    isNew: true,
  },
  {
    ...baseProduct,
    _id: "p-incense-holder",
    title: "Sandalwood Incense Holder",
    slug: "sandalwood-incense-holder",
    category: { _id: "cat-pooja", title: "Pooja & Festive", slug: "pooja-festive" },
    price: 69000,
    shortDescription: "A simple, sturdy stand carved from solid sandalwood.",
    description:
      "Turned and carved from sustainably-sourced sandalwood. Fits regular agarbatti sticks. Smells faintly of sandalwood every time you light up.",
    images: [
      { url: u("1606136968080-3cdd7a14ce9d"), alt: "Sandalwood incense holder" },
    ],
    stockCount: 50,
    sku: "SAJ-INC-SDL",
    tags: ["pooja", "sandalwood", "everyday"],
    weightGrams: 80,
    dimensions: { l: 22, w: 4, h: 2 },
    materials: ["Sandalwood"],
    careInstructions: "Wipe dry. Avoid water.",
    craftedBy: "Mysore woodturners",
  },
  {
    ...baseProduct,
    _id: "p-trinket-tray",
    title: "Hand-painted Trinket Tray",
    slug: "hand-painted-trinket-tray",
    category: { _id: "cat-decor", title: "Décor", slug: "decor" },
    price: 119000,
    shortDescription: "A small ceramic tray painted in rose and gold — for keys, rings, mornings.",
    description:
      "Hand-thrown ceramic, painted in our rose-and-gold pattern and finished with a food-safe glaze. Sized for everyday clutter — keys, rings, the inevitable bobby pin.",
    images: [
      { url: u("1586023492125-27b2c045efd7"), alt: "Trinket tray on dresser" },
    ],
    stockCount: 22,
    sku: "SAJ-TRAY-CER",
    tags: ["decor", "ceramic", "handpainted"],
    weightGrams: 220,
    dimensions: { l: 14, w: 10, h: 2 },
    materials: ["Stoneware", "Lead-free glaze"],
    careInstructions: "Hand wash. Dishwasher-safe but hand-wash recommended.",
    craftedBy: "Sajja studio",
    isNew: true,
  },
  {
    ...baseProduct,
    _id: "p-lantern-set",
    title: "Festive Lantern Set of 3",
    slug: "festive-lantern-set-of-3",
    category: { _id: "cat-decor", title: "Décor", slug: "decor" },
    price: 399000,
    mrp: 479000,
    shortDescription: "Three hand-pierced metal lanterns — soft light, big mood.",
    description:
      "Hand-pierced steel lanterns with antique brass finish, designed to cast intricate shadow patterns. Fitted with battery-operated tealight cups (LEDs included).",
    images: [
      { url: u("1485955900006-10f4d324d411"), alt: "Lantern set glowing" },
    ],
    stockCount: 9,
    sku: "SAJ-LANT-3",
    tags: ["decor", "lighting", "festive", "diwali"],
    weightGrams: 1600,
    materials: ["Steel", "Antique brass finish"],
    careInstructions: "Dust with a soft brush. Indoor use only.",
    craftedBy: "Aligarh metalworks",
    isBestseller: true,
  },
];

// --- Homepage hero ---

export const mockHero: HomepageHero = {
  slides: [
    {
      headline: "Honoring tradition with handcrafted décor",
      subhead: "Diyas, idols and torans for the festival of lights — made by hand, made for you.",
      ctaLabel: "Shop the Diwali edit",
      ctaHref: "/shop/pooja-festive",
      image: { url: u("1604608672516-f1b9b1d3a8c8", { w: 1600, h: 900 }), alt: "Diwali decor" },
      textPosition: "left",
    },
    {
      headline: "New: hand-painted ceramics",
      subhead: "Rose and gold, every piece one of a kind.",
      ctaLabel: "See the collection",
      ctaHref: "/shop/decor",
      image: { url: u("1586023492125-27b2c045efd7", { w: 1600, h: 900 }), alt: "Ceramics" },
      textPosition: "right",
    },
  ],
};

// --- Site settings ---

export const mockSettings: SiteSettings = {
  announcementBar: "Free shipping across India on orders over ₹2000 · Crafted by hand, just for you",
  whatsappNumber: "+91 12345 67890",
  supportEmail: "hello@sajja.in",
  shippingThreshold: 200000, // ₹2000 in paise
  socialLinks: {
    instagram: "https://instagram.com/sajja",
    facebook: "https://facebook.com/sajja",
    pinterest: "https://pinterest.com/sajja",
    whatsapp: "https://wa.me/911234567890",
  },
};
