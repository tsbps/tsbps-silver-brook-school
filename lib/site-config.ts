import { promises as fs } from "fs";
import path from "path";
import {
  ALL_MANAGED_PAGES,
  defaultSiteConfig,
  type ManagedPageKey,
  type SiteConfig,
  type SiteEvent,
} from "@/lib/site-config-schema";

const DATA_DIR = path.join(process.cwd(), "data");
const CONFIG_PATH = path.join(DATA_DIR, "site-config.json");

function sanitizeEvent(input: Partial<SiteEvent>, index: number): SiteEvent {
  const date = (input.date ?? "").toString().trim().slice(0, 40);
  const title = (input.title ?? "").toString().trim().slice(0, 160);
  return {
    id: input.id?.toString().trim() || `event-${index + 1}`,
    date,
    title,
  };
}

function sanitizeHexColor(value: string, fallback: string): string {
  const normalized = value.trim();
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(normalized) ? normalized : fallback;
}

function sanitizeConfig(input: Partial<SiteConfig>): SiteConfig {
  const rawHiddenPages = Array.isArray(input.hiddenPages) ? input.hiddenPages : [];
  const hiddenPages = rawHiddenPages.filter((page): page is ManagedPageKey =>
    ALL_MANAGED_PAGES.includes(page as ManagedPageKey)
  );

  const eventsInput = Array.isArray(input.events) ? input.events : defaultSiteConfig.events;
  const events = eventsInput
    .map((item, index) => sanitizeEvent(item, index))
    .filter((item) => item.date && item.title);

  return {
    schoolName: (input.schoolName ?? defaultSiteConfig.schoolName).toString().trim(),
    schoolNameShort: (input.schoolNameShort ?? defaultSiteConfig.schoolNameShort)
      .toString()
      .trim(),
    tagline: (input.tagline ?? defaultSiteConfig.tagline).toString().trim(),
    logoPath: (input.logoPath ?? defaultSiteConfig.logoPath).toString().trim(),
    contactPhone: (input.contactPhone ?? defaultSiteConfig.contactPhone).toString().trim(),
    contactEmail: (input.contactEmail ?? defaultSiteConfig.contactEmail).toString().trim(),
    address: (input.address ?? defaultSiteConfig.address).toString().trim(),
    hiddenPages,
    events: events.length > 0 ? events : defaultSiteConfig.events,
    theme: {
      paper: sanitizeHexColor(input.theme?.paper ?? defaultSiteConfig.theme.paper, defaultSiteConfig.theme.paper),
      brand400: sanitizeHexColor(
        input.theme?.brand400 ?? defaultSiteConfig.theme.brand400,
        defaultSiteConfig.theme.brand400
      ),
      brand600: sanitizeHexColor(
        input.theme?.brand600 ?? defaultSiteConfig.theme.brand600,
        defaultSiteConfig.theme.brand600
      ),
      brand700: sanitizeHexColor(
        input.theme?.brand700 ?? defaultSiteConfig.theme.brand700,
        defaultSiteConfig.theme.brand700
      ),
    },
  };
}

async function ensureConfigFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(CONFIG_PATH);
  } catch {
    await fs.writeFile(CONFIG_PATH, JSON.stringify(defaultSiteConfig, null, 2), "utf8");
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  await ensureConfigFile();
  try {
    const raw = await fs.readFile(CONFIG_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteConfig>;
    return sanitizeConfig(parsed);
  } catch {
    return defaultSiteConfig;
  }
}

export async function saveSiteConfig(nextConfig: Partial<SiteConfig>): Promise<SiteConfig> {
  const merged = sanitizeConfig(nextConfig);
  await ensureConfigFile();
  await fs.writeFile(CONFIG_PATH, JSON.stringify(merged, null, 2), "utf8");
  return merged;
}

export async function updateSiteConfig(partial: Partial<SiteConfig>): Promise<SiteConfig> {
  const current = await getSiteConfig();
  const merged = {
    ...current,
    ...partial,
    theme: {
      ...current.theme,
      ...(partial.theme ?? {}),
    },
  };
  return saveSiteConfig(merged);
}

export async function isPageHidden(page: ManagedPageKey): Promise<boolean> {
  const config = await getSiteConfig();
  return config.hiddenPages.includes(page);
}
