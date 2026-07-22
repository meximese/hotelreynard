import { StructureBuilder } from "sanity/structure";

const singletonTypes = [
  { schemaType: "siteSettings", title: "Site Settings" },
  { schemaType: "homePage", title: "Home Page" },
  { schemaType: "eventsPage", title: "Events Page" },
];

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Core Pages")
        .child(
          S.list()
            .title("Core Pages")
            .items(
              singletonTypes.map((item) =>
                S.listItem()
                  .title(item.title)
                  .child(
                    S.editor().id(item.schemaType).schemaType(item.schemaType).documentId(item.schemaType),
                  ),
              ),
            ),
        ),
      S.documentTypeListItem("room").title("Rooms"),
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("page").title("Pages"),
    ]);
