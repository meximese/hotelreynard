import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventType",
      title: "Event type",
      type: "string",
      options: { list: ["public", "dinner", "music", "class"] },
    }),
    defineField({
      name: "venueType",
      title: "Venue type",
      type: "string",
      options: { list: ["restaurant", "outdoorSpace", "fullProperty"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDateTime",
      title: "Start date and time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "endDateTime", title: "End date and time", type: "datetime" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Body", type: "richTextBlock" }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alternative text", type: "string" }],
    }),
    defineField({ name: "cta", title: "CTA", type: "cta" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["scheduled", "soldOut", "cancelled", "past"] },
      initialValue: "scheduled",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "startDateTime",
      media: "heroImage",
    },
  },
});
