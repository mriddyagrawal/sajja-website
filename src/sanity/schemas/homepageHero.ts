import { defineField, defineType } from "sanity";

export const homepageHero = defineType({
  name: "homepageHero",
  title: "Homepage hero",
  type: "document",
  fields: [
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      validation: (Rule) => Rule.min(1).max(4),
      of: [
        {
          type: "object",
          name: "slide",
          fields: [
            defineField({
              name: "headline",
              title: "Headline",
              type: "string",
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: "subhead",
              title: "Subhead",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.max(200),
            }),
            defineField({
              name: "ctaLabel",
              title: "CTA label",
              type: "string",
              validation: (Rule) => Rule.required().max(30),
            }),
            defineField({
              name: "ctaHref",
              title: "CTA link",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Background image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Alt text" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "imageMobile",
              title: "Mobile image (optional)",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Alt text" }],
            }),
            defineField({
              name: "textPosition",
              title: "Text position",
              type: "string",
              options: {
                list: [
                  { title: "Left", value: "left" },
                  { title: "Right", value: "right" },
                  { title: "Center", value: "center" },
                ],
                layout: "radio",
              },
              initialValue: "left",
            }),
          ],
          preview: {
            select: { title: "headline", subtitle: "ctaLabel", media: "image" },
          },
        },
      ],
    }),
  ],
});
