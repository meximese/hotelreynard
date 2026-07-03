import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "hoursBlock",
  title: "Hours block",
  type: "object",
  fields: [
    defineField({
      name: "entries",
      title: "Entries",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "hours", title: "Hours", type: "string" },
          ],
        }),
      ],
    }),
  ],
});
