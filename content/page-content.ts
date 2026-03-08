import type { ManagedPageKey } from "@/lib/site-config-schema";

export interface PageHeroContent {
  title: string;
  eyebrow: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export const templatePageHeroes: Partial<Record<ManagedPageKey, PageHeroContent>> = {
  about: {
    title: "About",
    eyebrow: "Our Story",
    description:
      "A forward-thinking institution focused on shaping confident, future-ready leaders.",
    ctaLabel: "Meet the Faculty",
    ctaHref: "/faculty",
  },
  academics: {
    title: "Academics Overview",
    eyebrow: "Learning Pathways",
    description:
      "An interdisciplinary curriculum that builds critical thinking, life skills, and academic strength from the foundation stage.",
    ctaLabel: "See Detailed Curriculum",
    ctaHref: "/curriculum",
  },
  admissions: {
    title: "Admissions",
    eyebrow: "Join the Founding Batches",
    description: "Admissions are open for Grades I to VII for the 2026-27 academic year.",
    ctaLabel: "Fees & Scholarships",
    ctaHref: "/fees",
  },
  campus: {
    title: "Campus & Facilities",
    eyebrow: "Our Spaces",
    description: "Modern facilities that support technology-enabled learning, safety, and well-being.",
    ctaLabel: "See Gallery",
    ctaHref: "/gallery",
  },
  activities: {
    title: "Activities & Clubs",
    eyebrow: "Student Life",
    description: "Sports, language development, and extracurriculars that build confidence and leadership.",
    ctaLabel: "View Calendar",
    ctaHref: "/calendar",
  },
  contact: {
    title: "Contact Us",
    eyebrow: "We are here to help",
    description: "Reach out for admissions, transport, or general enquiries.",
  },
  calendar: {
    title: "School Calendar",
    eyebrow: "Plan Ahead",
    description: "Navigate by month and year, select any date, and view detailed events.",
  },
  blog: {
    title: "School Blog",
    eyebrow: "Insights & Stories",
    description: "Updates from classrooms, activities, and school life.",
  },
  news: {
    title: "News & Events",
    eyebrow: "Updates",
    description: "Announcements and milestones as we prepare to open.",
  },
  curriculum: {
    title: "Curriculum",
    eyebrow: "Academic Framework",
    description:
      "A technology-integrated, interdisciplinary curriculum that builds problem-solving, communication, and future-ready skills.",
  },
  transport: {
    title: "Transport",
    eyebrow: "Safe Commute",
    description: "Planned GPS-enabled school buses with trained staff for student safety.",
  },
  fees: {
    title: "Fees & Scholarships",
    eyebrow: "Affordability",
    description: "Transparent fee structure with scholarship guidance for deserving students.",
  },
  faculty: {
    title: "Leadership & Faculty",
    eyebrow: "Our People",
    description: "Experienced educators and mentors dedicated to nurturing confident, capable learners.",
  },
  downloads: {
    title: "Downloads",
    eyebrow: "Resources",
    description: "Forms, prospectus, and key documents for families.",
  },
  policies: {
    title: "Policies",
    eyebrow: "Student Safety",
    description: "Clear guidelines that keep our community safe, respectful, and inclusive.",
  },
  gallery: {
    title: "Gallery",
    eyebrow: "Campus Moments",
    description: "Snapshots from classrooms, celebrations, and student showcases.",
  },
  achievements: {
    title: "Early Milestones",
    eyebrow: "Launching 2026-27",
    description: "As a new institution, we are building strong foundations that will lead to future achievements.",
  },
  hostel: {
    title: "Hostel",
    eyebrow: "Residential Life",
    description: "Comfortable, supervised hostel facilities for learners who need residential support.",
  },
  careers: {
    title: "Careers",
    eyebrow: "Join Our Team",
    description: "We welcome passionate educators and staff members to grow with our community.",
    ctaLabel: "Apply Now",
    ctaHref: "/contact",
  },
};

export const templateFooterHours = ["Mon - Fri: 8:30 AM - 4:00 PM", "Sat: 9:00 AM - 1:00 PM", "Sun: Closed"];

export const contactPageContent = {
  officeTitle: "School Office",
  officeSubtitle: "Visit the campus or connect with us directly.",
  visitHoursTitle: "Visit Hours",
  visitHoursSubtitle: "Office hours for campus visits and admissions support.",
  visitHours: ["Monday to Friday: 8:30 AM - 4:00 PM", "Saturday: 9:00 AM - 1:00 PM", "Sunday: Closed"],
  formTitle: "Feedback / Inquiry Form",
  formSubtitle: "Share your questions and we will get back quickly.",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17535.457097967566!2d77.43651960000001!3d11.454944900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba93d97aa5c5915%3A0x255ab43b25c6212b!2sKuthirai%20Vandi%20Theru%2C%20Gobichettipalayam%2C%20Tamil%20Nadu%20638476!5e1!3m2!1sen!2sin!4v1772831969374!5m2!1sen!2sin",
  mapLink:
    "https://www.google.com/maps/place/Kuthirai+Vandi+Theru,+Gobichettipalayam,+Tamil+Nadu+638476/@11.4549658,77.4262199,3868m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3ba93d97aa5c5915:0x255ab43b25c6212b!8m2!3d11.4549451!4d77.4365196!16zL20vMDRqNXN3?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
};
