import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "featureListBlock",
  title: "Feature list block",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
});
