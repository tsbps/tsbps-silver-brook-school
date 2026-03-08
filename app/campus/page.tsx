import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import Link from "next/link";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { templatePageHeroes } from "@/content/page-content";
import InfoCardGrid from "@/components/sections/InfoCardGrid";

const campusCards = [
  { badge: "SC", title: "Smart Classrooms", description: "Interactive boards, flexible seating, and digital resources." },
  { badge: "ST", title: "STEM Labs", description: "Robotics, coding, and science labs for hands-on learning." },
  { badge: "LC", title: "Learning Commons", description: "Reading spaces and curated resources for every grade." },
  { badge: "SA", title: "Sports Arena", description: "Outdoor fields, indoor courts, and wellness studios." },
  { badge: "AR", title: "Arts Studios", description: "Dedicated spaces for music, dance, and visual arts." },
  { badge: "SF", title: "Safe Campus", description: "Professional staff, security systems, and clear safety policies." },
];

export default async function CampusPage() {
  await enforcePageVisibility("campus");
  const hero = templatePageHeroes.campus!;
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
          <InfoCardGrid items={campusCards} />
        </div>
        <div className="container">
          <div className="divider" />
          <Link href="/transport" className="button secondary">
            Transport Details
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
