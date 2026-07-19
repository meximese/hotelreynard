import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "room",
  title: "Room",
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
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["hidden", "featured", "published"] },
      initialValue: "published",
    }),
    defineField({ name: "publiclyNamed", title: "Publicly named", type: "boolean", initialValue: true }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Body", type: "richTextBlock" }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alternative text", type: "string" }],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alternative text", type: "string" }],
        }),
      ],
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "artisanFeatures",
      title: "Artisan features",
      type: "array",
      of: [defineArrayMember({ type: "artisanFeature" })],
    }),
    defineField({ name: "occupancy", title: "Occupancy", type: "string" }),
    defineField({ name: "bedType", title: "Bed type", type: "string" }),
    defineField({ name: "bathroomType", title: "Bathroom type", type: "string" }),
    defineField({ name: "accessibilityNotes", title: "Accessibility notes", type: "text", rows: 3 }),
    defineField({ name: "petPolicy", title: "Pet policy", type: "text", rows: 3 }),
    defineField({ name: "roomSize", title: "Room size", type: "string" }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number" }),
    defineField({ name: "bookingLabel", title: "Booking label", type: "string" }),
    defineField({ name: "bookingCategoryKey", title: "Booking category key", type: "string" }),
    defineField({ name: "isPublicPageEnabled", title: "Public page enabled", type: "boolean", initialValue: true }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "heroImage",
    },
  },
});
