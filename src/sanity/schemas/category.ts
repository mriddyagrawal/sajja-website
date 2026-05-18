import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent category",
      type: "reference",
      to: [{ type: "category" }],
      description: "Optional. Set if this is a subcategory.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Shown on the category page header.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      validation: (Rule) => Rule.required().integer(),
      initialValue: 0,
      description: "Controls order in nav. Lower = earlier.",
    }),
  ],

  preview: {
    select: { title: "title", subtitle: "slug.current", media: "image" },
  },
});
