import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "../styles/theme.css";
import "./globals.css";
import { getSiteConfig } from "@/lib/site-config";
import { SiteConfigProvider } from "@/components/SiteConfigProvider";

export const metadata: Metadata = {
  title: "The Silver Brook Public School",
  description:
    "The Silver Brook Public School — learning with purpose, rooted in community and excellence.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const configPromise = getSiteConfig();

  return (
    <RootWithConfig configPromise={configPromise}>{children}</RootWithConfig>
  );
}

async function RootWithConfig({
  children,
  configPromise,
}: {
  children: React.ReactNode;
  configPromise: ReturnType<typeof getSiteConfig>;
}) {
  const config = await configPromise;
  const themeVars: Record<string, string> = {
    "--paper": config.theme.paper,
    "--brand-400": config.theme.brand400,
    "--brand-600": config.theme.brand600,
    "--brand-700": config.theme.brand700,
  };

  return (
    <html lang="en">
      <body style={themeVars as CSSProperties}>
        <SiteConfigProvider value={config}>
          <div className="splash-screen" aria-hidden="true">
            <img src={config.logoPath || "/logo.png"} alt="" />
          </div>
          <div className="site-shell">{children}</div>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
