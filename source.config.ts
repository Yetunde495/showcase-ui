import { defineDocs, defineConfig } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "content/docs",
});

export const components = defineDocs({
  dir: "content/components",
});

export default defineConfig();
