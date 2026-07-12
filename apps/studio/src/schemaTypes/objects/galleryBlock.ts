import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "galleryBlock",
  title: "Gallery block",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "displayMode",
      title: "Display mode",
      type: "string",
      initialValue: "rail",
      options: {
        list: [
          { title: "Horizontal rail", value: "rail" },
          { title: "Sticky scroll", value: "stickyScroll" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "showGalleryHeader",
      title: "Show gallery header",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "showGalleryProgress",
      title: "Show gallery progress",
      type: "boolean",
      initialValue: true,
      description: "Used by the sticky scroll gallery.",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alternative text", type: "string" }],
        }),
      ],
    }),
  ],
});
