import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/sanity/schemas";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/**
 * Standalone Sanity Studio config. Run with:
 *
 *   pnpm studio:dev      # http://localhost:3333
 *   pnpm studio:deploy   # publishes to https://<projectId>.sanity.studio
 *
 * Sanity v5's Studio bundle has a React 19 incompat (uses experimental
 * useEffectEvent), so we don't embed it in the Next app. Sanity hosts
 * Studio for free — that's what your team will actually use.
 */
export default defineConfig({
  name: "sajja-studio",
  title: "Sajja Studio",
  projectId: projectId || "missing-project-id",
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Products")
              .schemaType("product")
              .child(S.documentTypeList("product").title("Products")),
            S.listItem()
              .title("Categories")
              .schemaType("category")
              .child(S.documentTypeList("category").title("Categories")),
            S.divider(),
            S.listItem()
              .title("Homepage hero")
              .child(
                S.editor()
                  .id("homepageHero")
                  .schemaType("homepageHero")
                  .documentId("homepageHero"),
              ),
            S.listItem()
              .title("Site settings")
              .child(
                S.editor()
                  .id("siteSettings")
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
          ]),
    }),
  ],
});
