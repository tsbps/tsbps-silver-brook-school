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
  | "achievements"
  | "blog";

export interface SiteEvent {
  id: string;
  date: string;
  title: string;
  description?: string;
}

export interface SitePost {
  id: string;
  slug: string;
  date: string;
  title: string;
  category: string;
  image: string;
  summary: string;
  content: string;
  status: "published" | "draft" | "scheduled";
  scheduledAt?: string;
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
  newsPosts: SitePost[];
  blogPosts: SitePost[];
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
  "blog",
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
    {
      id: "event-1",
      date: "Mar 05",
      title: "Annual Sports Day",
      description: "Inter-house athletics and team games.",
    },
    {
      id: "event-2",
      date: "Mar 18",
      title: "Parent-Teacher Meetings",
      description: "Academic review and goal setting discussions.",
    },
    {
      id: "event-3",
      date: "Apr 02",
      title: "Science Expo",
      description: "Student-led innovation and project showcase.",
    },
    {
      id: "event-4",
      date: "Apr 20",
      title: "Summer Break Begins",
      description: "End of term closing and holiday briefing.",
    },
  ],
  newsPosts: [
    {
      id: "news-1",
      slug: "admissions-open-2026-27",
      date: "March 2026",
      title: "Admissions Open for 2026-27",
      category: "Admissions",
      image: "/images/ai-campus-2.svg",
      summary: "Admissions are now open for Grades I to VII.",
      content:
        "Admissions are now open for Grades I to VII for academic year 2026-27. Families can contact the office to schedule a campus visit.",
      status: "published",
    },
  ],
  blogPosts: [
    {
      id: "blog-1",
      slug: "confidence-in-early-learners",
      date: "March 2026",
      title: "How We Build Confidence in Early Learners",
      category: "Learning",
      image: "/images/ai-campus-3.svg",
      summary: "A look at our classroom approach to confidence and leadership.",
      content:
        "At The Silver Brook Public School, we combine structured learning, activity-based teaching, and communication practice to help children become confident, curious learners.",
      status: "published",
    },
  ],
  theme: {
    paper: "#fbfaf6",
    brand400: "#6f93f5",
    brand600: "#2f5bd7",
    brand700: "#2345a6",
  },
};
