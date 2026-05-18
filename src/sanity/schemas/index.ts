import type { SchemaTypeDefinition } from "sanity";
import { category } from "./category";
import { homepageHero } from "./homepageHero";
import { product } from "./product";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  product,
  category,
  homepageHero,
  siteSettings,
];
