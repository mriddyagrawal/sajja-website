import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "announcementBar",
      title: "Announcement bar text",
      type: "string",
      validation: (Rule) => Rule.max(180),
      description: "Top strip text. Leave empty to hide.",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      type: "string",
      description: "International format, e.g. +91 12345 67890.",
    }),
    defineField({
      name: "supportEmail",
      title: "Support email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "shippingThreshold",
      title: "Free shipping threshold (paise)",
      type: "number",
      validation: (Rule) => Rule.required().min(0).integer(),
      initialValue: 200000,
      description: "Subtotal above which shipping is free. ₹2000 = 200000.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "object",
      fields: [
        { name: "instagram", title: "Instagram URL", type: "url" },
        { name: "facebook", title: "Facebook URL", type: "url" },
        { name: "pinterest", title: "Pinterest URL", type: "url" },
        { name: "whatsapp", title: "WhatsApp link (wa.me/...)", type: "url" },
      ],
    }),
  ],
});
