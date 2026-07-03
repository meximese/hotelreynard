import { defineField, defineType } from "sanity";

export default defineType({
  name: "eventFeedBlock",
  title: "Event feed block",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "limit", title: "Limit", type: "number", initialValue: 3 }),
  ],
});
