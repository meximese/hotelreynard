import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "galleryBlock",
  title: "Gallery",
  type: "object",
  fields: [
    defineField({
      name: "displayMode",
      title: "Display mode",
      type: "string",
      initialValue: "grid",
      options: {
        layout: "radio",
        list: [
          { title: "Grid", value: "grid" },
          { title: "Vertical", value: "vertical" },
          { title: "Sticky scroll", value: "stickyScroll" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "showGalleryHeader",
      title: "Show gallery header",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "showGalleryProgress",
      title: "Show gallery progress",
      description: "Used by sticky scroll galleries.",
      type: "boolean",
      initialValue: true,
      hidden: ({ parent }) => parent?.displayMode !== "stickyScroll",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alternative text", type: "string" },
            {
              name: "fullWidth",
              title: "Full width",
              description: "Used by grid and vertical galleries; ignored by sticky scroll.",
              type: "boolean",
              initialValue: false,
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      displayMode: "displayMode",
      media: "images.0",
    },
    prepare({ title, displayMode, media }) {
      const modeLabels: Record<string, string> = {
        grid: "Grid",
        vertical: "Vertical",
        stickyScroll: "Sticky scroll",
      };

      return {
        title: title || "Gallery",
        subtitle: modeLabels[displayMode] || "Gallery",
        media,
      };
    },
  },
});
