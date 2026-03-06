"use client";

import { createContext, useContext } from "react";
import type { SiteConfig } from "@/lib/site-config-schema";

const SiteConfigContext = createContext<SiteConfig | null>(null);

export function SiteConfigProvider({
  value,
  children,
}: {
  value: SiteConfig;
  children: React.ReactNode;
}) {
  return <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>;
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error("useSiteConfig must be used within SiteConfigProvider");
  }
  return context;
}
