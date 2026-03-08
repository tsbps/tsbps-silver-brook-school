import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { templatePageHeroes } from "@/content/page-content";
import { getSiteConfig } from "@/lib/site-config";
import InfoCardGrid from "@/components/sections/InfoCardGrid";

const aboutCards = [
  { title: "Vision", description: "To shape confident leaders who believe they can change the world." },
  {
    title: "Mission",
    description: "To deliver rigorous, tech-enabled learning with strong values and holistic development.",
  },
  { title: "Philosophy", description: "Learning is the Key to Leadership." },
  {
    title: "What makes us different",
    description:
      "Interdisciplinary learning, STEM focus, and a safe, vibrant campus culture built from the ground up.",
  },
];

export default async function AboutPage() {
  await enforcePageVisibility("about");
  const config = await getSiteConfig();
  const hero = templatePageHeroes.about!;
  return (
    <div>
      <Nav />
      <PageHero
        title={`${hero.title} ${config.schoolNameShort}`}
        eyebrow={hero.eyebrow}
        description={hero.description}
        ctaLabel={hero.ctaLabel}
        ctaHref={hero.ctaHref}
      />
      <section className="section">
        <div className="container">
          <InfoCardGrid items={aboutCards} columns={2} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
