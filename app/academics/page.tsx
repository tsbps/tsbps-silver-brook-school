import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import Link from "next/link";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { templatePageHeroes } from "@/content/page-content";
import InfoCardGrid from "@/components/sections/InfoCardGrid";

const academicBands = [
  { title: "Grades I–III", description: "Core literacy, numeracy, and joyful exploration." },
  { title: "Grades IV–V", description: "Conceptual learning with STEM labs and projects." },
  { title: "Grades VI–VII", description: "Critical thinking, applied science, and exam readiness." },
];

export default async function AcademicsPage() {
  await enforcePageVisibility("academics");
  const hero = templatePageHeroes.academics!;
  return (
    <div>
      <Nav />
      <PageHero
        title={hero.title}
        eyebrow={hero.eyebrow}
        description={hero.description}
        ctaLabel={hero.ctaLabel}
        ctaHref={hero.ctaHref}
      />
      <section className="section">
        <div className="container">
          <InfoCardGrid items={academicBands} />
        </div>
        <div className="container">
          <div className="divider" />
          <Link href="/curriculum" className="button">
            Explore Curriculum Details
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
