import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { templatePageHeroes } from "@/content/page-content";
import InfoCardGrid from "@/components/sections/InfoCardGrid";

const curriculumCards = [
  {
    title: "Core Subjects",
    description:
      "Languages, Mathematics, Science, Social Studies, and ICT aligned with strong academic standards.",
  },
  {
    title: "STEM & Innovation",
    description: "Robotics, coding, and maker projects that connect theory to real application.",
  },
  {
    title: "Life Skills",
    description: "Communication, collaboration, leadership, and personal growth embedded across subjects.",
  },
  {
    title: "Academic Readiness",
    description: "Strong foundations for competitive exams such as NEET, IIT, and JEE as students progress.",
  },
];

export default async function CurriculumPage() {
  await enforcePageVisibility("curriculum");
  const hero = templatePageHeroes.curriculum!;
  return (
    <div>
      <Nav />
      <PageHero
        title={hero.title}
        eyebrow={hero.eyebrow}
        description={hero.description}
        ctaLabel="Download Curriculum"
        ctaHref="/downloads"
      />
      <section className="section">
        <div className="container">
          <InfoCardGrid items={curriculumCards} columns={2} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
