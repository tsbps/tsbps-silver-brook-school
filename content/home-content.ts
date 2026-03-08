export interface TemplateCardItem {
  title: string;
  detail: string;
}

export interface TemplateBenefitItem {
  title: string;
  points: string[];
}

export const homeHeroContent = {
  eyebrow: "THE SILVER BROOK PUBLIC SCHOOL",
  subline: "Where Knowledge Sparks Confidence",
  vision: "To nurture confident, ethical, and future-ready learners who lead with knowledge.",
  mission:
    "To provide a safe, technology-integrated, and value-driven learning environment that builds academic excellence and life skills.",
  badges: ["Admissions Open - 2026-27", "Grade I to VII"],
};

export const homeSpecialFeatures: TemplateCardItem[] = [
  {
    title: "Smart Classrooms",
    detail: "Technology integrated learning spaces for visual, interactive and collaborative teaching.",
  },
  {
    title: "Interdisciplinary Curriculum",
    detail: "Focus on critical thinking, concept application and practical life skills.",
  },
  {
    title: "STEM Labs",
    detail: "Robotics, coding and innovation labs for experimentation and problem solving.",
  },
  {
    title: "Safe & Vibrant Campus",
    detail: "Student wellbeing, safety systems and a positive learning atmosphere.",
  },
  { title: "Competitive Foundation", detail: "Academic foundation for NEET, IIT and JEE pathways." },
  {
    title: "Sports & Activities",
    detail: "Sports galore and extra curricular activities for all-round development.",
  },
  {
    title: "Language Development",
    detail: "Strong communication practice in reading, writing and speaking.",
  },
  { title: "Transport Facility", detail: "Reliable route-based school transport support." },
];

export const homeKeyBenefits: TemplateBenefitItem[] = [
  {
    title: "Expert Curriculum",
    points: [
      "Structured CBSE-oriented concept progression",
      "Critical thinking integrated into daily learning",
    ],
  },
  {
    title: "Modern Facilities",
    points: ["Smart classrooms, STEM labs and activity zones", "Safe infrastructure that supports focused learning"],
  },
  {
    title: "Professional Educators",
    points: ["Experienced teachers with mentoring approach", "Individual attention for confidence and growth"],
  },
];

export const homeAcademicExams = {
  title: "Competitive Exams for Grade 6 to 8",
  olympiad: [
    "Mathematics Olympiad - UMO",
    "Science Olympiad - USO",
    "English Olympiad - UEO",
    "General Knowledge Olympiad - UGKO",
  ],
  national: [
    "National Science Olympiad",
    "National Interactive Mathematics Olympiad - NIMO",
    "National Level Science Talent Search Exam - NLSTSE",
  ],
  other: ["International Mathematics Olympiad - IMO", "Unified Cyber Olympiad - UCO", "Spell Bee"],
};

export const homeStudentLife = {
  title: "Student Life Highlights",
  subtitle: "Sports, co-curricular programs, and student essentials in one place.",
  sports: ["Basketball", "Football", "Badminton", "Chess"],
  activities: ["Robotics", "Skating", "Yoga", "Archery", "Horse Riding", "Western Dance"],
  feeIncludes: ["3 Sets of Uniform", "School Bag", "Books and Notebooks", "Stationery Items"],
};
