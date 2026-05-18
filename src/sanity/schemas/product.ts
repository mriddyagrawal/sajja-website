import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "essentials", title: "Essentials", default: true },
    { name: "details", title: "Details & care" },
    { name: "logistics", title: "Logistics" },
    { name: "flags", title: "Flags & visibility" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "essentials",
      validation: (Rule) => Rule.required().max(80),
      description: "How the product is named on the site. Keep it short and human.",
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "essentials",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description: "Auto-fills from the title. Edit only if you really want to.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "essentials",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subcategory",
      title: "Subcategory (optional)",
      type: "reference",
      to: [{ type: "category" }],
      group: "essentials",
    }),
    defineField({
      name: "price",
      title: "Price (paise)",
      type: "number",
      group: "essentials",
      validation: (Rule) => Rule.required().min(0).integer(),
      description: "Selling price in PAISE. ₹1490 = 149000. (Avoids floating-point bugs.)",
    }),
    defineField({
      name: "mrp",
      title: "MRP / strike-through price (paise)",
      type: "number",
      group: "essentials",
      validation: (Rule) => Rule.min(0).integer(),
      description: "Optional. If set and higher than price, shows the discount %.",
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      group: "essentials",
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
      description: "1–2 sentences shown on cards and in lists.",
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "array",
      of: [{ type: "block" }],
      group: "essentials",
      description: "Long description shown on the product page.",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
              description: "Describes the image for screen readers and SEO.",
            },
          ],
        },
      ],
      group: "essentials",
      validation: (Rule) => Rule.required().min(1).max(6),
      description: "First image is the primary. 1–6 images.",
    }),

    // Details
    defineField({
      name: "materials",
      title: "Materials",
      type: "array",
      of: [{ type: "string" }],
      group: "details",
      options: { layout: "tags" },
    }),
    defineField({
      name: "careInstructions",
      title: "Care instructions",
      type: "array",
      of: [{ type: "block" }],
      group: "details",
    }),
    defineField({
      name: "craftedBy",
      title: "Crafted by",
      type: "string",
      group: "details",
      description: "Artisan, cluster, or region credit. e.g. 'Moradabad artisans'.",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      group: "details",
      options: { layout: "tags" },
      description: "Free-text labels: 'diwali', 'gifting', 'brass', etc. Powers search and rails.",
    }),

    // Logistics
    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
      group: "logistics",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "inStock",
      title: "In stock",
      type: "boolean",
      group: "logistics",
      initialValue: true,
    }),
    defineField({
      name: "stockCount",
      title: "Stock count",
      type: "number",
      group: "logistics",
      validation: (Rule) => Rule.min(0).integer(),
      description: "Optional. Triggers 'Only N left' messaging when low.",
    }),
    defineField({
      name: "weightGrams",
      title: "Weight (grams)",
      type: "number",
      group: "logistics",
      validation: (Rule) => Rule.min(0),
      description: "Used by Shiprocket to calculate shipping rates.",
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions (cm)",
      type: "object",
      group: "logistics",
      fields: [
        { name: "l", title: "Length", type: "number" },
        { name: "w", title: "Width", type: "number" },
        { name: "h", title: "Height", type: "number" },
      ],
    }),

    // Flags
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      group: "flags",
      initialValue: false,
      description: "Show in featured rails on the homepage.",
    }),
    defineField({
      name: "isBestseller",
      title: "Bestseller",
      type: "boolean",
      group: "flags",
      initialValue: false,
    }),
    defineField({
      name: "isNew",
      title: "New arrival",
      type: "boolean",
      group: "flags",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "flags",
      initialValue: () => new Date().toISOString(),
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO overrides",
      type: "object",
      group: "seo",
      fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "description", title: "Description", type: "text", rows: 3 },
        {
          name: "ogImage",
          title: "Social share image",
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "images.0",
      price: "price",
      category: "category.title",
    },
    prepare({ title, media, price, category }) {
      const inr = price != null ? `₹${(price / 100).toLocaleString("en-IN")}` : "—";
      return {
        title,
        subtitle: `${category ?? ""} · ${inr}`,
        media,
      };
    },
  },
});
