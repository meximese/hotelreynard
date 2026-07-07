import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "roomFeedBlock",
  title: "Room feed block",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({
      name: "rooms",
      title: "Rooms",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "room" }],
        }),
      ],
    }),
  ],
});
