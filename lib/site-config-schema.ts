export type ManagedPageKey =
  | "home"
  | "about"
  | "academics"
  | "admissions"
  | "campus"
  | "activities"
  | "news"
  | "contact"
  | "calendar"
  | "gallery"
  | "transport"
  | "curriculum"
  | "fees"
  | "faculty"
  | "downloads"
  | "policies"
  | "hostel"
  | "careers"
  | "achievements";

export interface SiteEvent {
  id: string;
  date: string;
  title: string;
}

export interface SiteConfig {
  schoolName: string;
  schoolNameShort: string;
  tagline: string;
  logoPath: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  hiddenPages: ManagedPageKey[];
  events: SiteEvent[];
  theme: {
    paper: string;
    brand400: string;
    brand600: string;
    brand700: string;
  };
}

export const ALL_MANAGED_PAGES: ManagedPageKey[] = [
  "home",
  "about",
  "academics",
  "admissions",
  "campus",
  "activities",
  "news",
  "contact",
  "calendar",
  "gallery",
  "transport",
  "curriculum",
  "fees",
  "faculty",
  "downloads",
  "policies",
  "hostel",
  "careers",
  "achievements",
];

export const defaultSiteConfig: SiteConfig = {
  schoolName: "The Silver Brook Public School",
  schoolNameShort: "The Silver Brook",
  tagline: "Learning is the Key to Leadership",
  logoPath: "/logo.png",
  contactPhone: "+919944055929",
  contactEmail: "thesilverbrookpublicschool@gmail.com",
  address:
    "Pillaiyar Kovil Street, Near Astalakshmi Temple, Karatoor, Gobichettipalayam, Erode District - 638476",
  hiddenPages: [],
  events: [
    { id: "event-1", date: "Mar 05", title: "Annual Sports Day" },
    { id: "event-2", date: "Mar 18", title: "Parent-Teacher Meetings" },
    { id: "event-3", date: "Apr 02", title: "Science Expo" },
    { id: "event-4", date: "Apr 20", title: "Summer Break Begins" },
  ],
  theme: {
    paper: "#fbfaf6",
    brand400: "#6f93f5",
    brand600: "#2f5bd7",
    brand700: "#2345a6",
  },
};
