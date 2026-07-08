import { defineField, defineType } from "sanity";

export default defineType({
  name: "quoteBlock",
  title: "Quote block",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "attribution", title: "Attribution", type: "string" }),
    defineField({
      name: "textAlign",
      title: "Text alignment",
      type: "string",
      initialValue: "left",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
    }),
  ],
});
