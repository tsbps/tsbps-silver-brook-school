import { notFound } from "next/navigation";
import { getSiteConfig } from "@/lib/site-config";
import { isPageVisibleInTemplate } from "@/config/page-registry";
import type { ManagedPageKey } from "@/lib/site-config-schema";

export async function enforcePageVisibility(page: ManagedPageKey) {
  const config = await getSiteConfig();
  if (!isPageVisibleInTemplate(config, page)) {
    notFound();
  }
}
