import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { enforcePageVisibility } from "@/lib/page-visibility";

const programs = [
  {
    title: "Robotics & Coding",
    description: "Hands-on STEM studio with guided builds, logic challenges, and beginner coding tracks.",
    format: "Lab-based sessions",
    outcome: "Computational thinking",
  },
  {
    title: "Sports & Athletics",
    description: "Structured fitness, team drills, and match practice across indoor and outdoor disciplines.",
    format: "Coach-led training",
    outcome: "Stamina and teamwork",
  },
  {
    title: "Language & Communication",
    description: "Reading circles, spoken English practice, and presentation activities for confident expression.",
    format: "Small-group workshops",
    outcome: "Clear communication",
  },
  {
    title: "Music & Dance",
    description: "Rhythm, movement, and performance preparation across classical and contemporary formats.",
    format: "Performance practice",
    outcome: "Stage confidence",
  },
  {
    title: "Visual Arts",
    description: "Drawing, painting, and craft projects that strengthen observation, creativity, and detail.",
    format: "Studio activity blocks",
    outcome: "Creative thinking",
  },
  {
    title: "Debate & Public Speaking",
    description: "Speech structure, group discussions, and argument framing for confident public speaking.",
    format: "Forum-style sessions",
    outcome: "Leadership voice",
  },
  {
    title: "Eco Club",
    description: "Campus sustainability projects, nature awareness, and student-driven green initiatives.",
    format: "Project-based learning",
    outcome: "Responsible citizenship",
  },
  {
    title: "Community Service",
    description: "Civic projects that teach empathy, planning, and social responsibility through real engagement.",
    format: "Service initiatives",
    outcome: "Social awareness",
  },
];

export default async function ActivitiesPage() {
  await enforcePageVisibility("activities");
  return (
    <div>
      <Nav />
      <PageHero
        title="Activities & Clubs"
        eyebrow="Student Life"
        description="Sports, language development, and extracurriculars that build confidence and leadership."
        ctaLabel="View Calendar"
        ctaHref="/calendar"
      />
      <section className="section section-pattern">
        <div className="container grid grid-3">
          {programs.map((program) => (
            <article className="card activity-program-card" key={program.title}>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <div className="activity-program-meta">
                <span>{program.format}</span>
                <strong>{program.outcome}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
