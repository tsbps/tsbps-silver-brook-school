import { notFound } from "next/navigation";
import { isPageHidden } from "@/lib/site-config";
import type { ManagedPageKey } from "@/lib/site-config-schema";

export async function enforcePageVisibility(page: ManagedPageKey) {
  if (await isPageHidden(page)) {
    notFound();
  }
}
