import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "gridGalleryBlock",
  title: "Gallery: Grid",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "showGalleryHeader",
      title: "Show gallery header",
      type: "boolean",
      initialValue: false,
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
              type: "boolean",
              initialValue: false,
            },
          ],
        }),
      ],
    }),
  ],
});
