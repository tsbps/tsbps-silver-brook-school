import type { SiteConfig } from "@/lib/site-config-schema";
import { isPageVisibleInTemplate } from "@/config/page-registry";

export type TemplateFeatureKey =
  | "enableAboutPage"
  | "enableAcademicsPage"
  | "enableActivitiesPage"
  | "enableAdmissionsSection"
  | "enableGallery"
  | "enableBlog"
  | "enableNews"
  | "enableEvents"
  | "enableCalendar"
  | "enableInquiryForm"
  | "enableDownloads"
  | "enableTestimonials"
  | "enableFooterCTA"
  | "enableAdminEditing";

export type TemplateFeatureFlags = Record<TemplateFeatureKey, boolean>;

export interface TemplateSiteIdentity {
  siteName: string;
  shortName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  logo: string;
}

export function getTemplateSiteIdentity(config: SiteConfig): TemplateSiteIdentity {
  return {
    siteName: config.schoolName,
    shortName: config.schoolNameShort,
    tagline: config.tagline,
    phone: config.contactPhone,
    email: config.contactEmail,
    address: config.address,
    logo: config.logoPath || "/logo.png",
  };
}

export function getTemplateFeatureFlags(config: SiteConfig): TemplateFeatureFlags {
  return {
    enableAboutPage: isPageVisibleInTemplate(config, "about"),
    enableAcademicsPage: isPageVisibleInTemplate(config, "academics"),
    enableActivitiesPage: isPageVisibleInTemplate(config, "activities"),
    enableAdmissionsSection: isPageVisibleInTemplate(config, "admissions"),
    enableGallery: isPageVisibleInTemplate(config, "gallery"),
    enableBlog: isPageVisibleInTemplate(config, "blog"),
    enableNews: isPageVisibleInTemplate(config, "news"),
    enableEvents: (config.events || []).length > 0,
    enableCalendar: isPageVisibleInTemplate(config, "calendar"),
    enableInquiryForm: isPageVisibleInTemplate(config, "contact"),
    enableDownloads: isPageVisibleInTemplate(config, "downloads"),
    enableTestimonials: false,
    enableFooterCTA: isPageVisibleInTemplate(config, "contact"),
    enableAdminEditing: true,
  };
}
