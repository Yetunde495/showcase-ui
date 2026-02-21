import { docs, components} from "fumadocs-mdx:collections/server";
import { loader } from "fumadocs-core/source";

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

export const componentsSource = loader({
  baseUrl: "/",
  source: components.toFumadocsSource(),
});
