import { DocsLayout } from "@/components/layout/docs";
import type { ReactNode } from "react";
import { componentsSource } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout tree={componentsSource.pageTree}>{children}</DocsLayout>;
}