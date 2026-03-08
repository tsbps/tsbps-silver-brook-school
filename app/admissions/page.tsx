import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import Link from "next/link";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { templatePageHeroes } from "@/content/page-content";
import InfoCardGrid from "@/components/sections/InfoCardGrid";

const admissionsCards = [
  {
    title: "Admissions Process",
    description: "Submit enquiry, campus visit, document verification, and orientation.",
  },
  {
    title: "Required Documents",
    description: "Birth certificate, records, transfer certificate, and address proof.",
  },
];

export default async function AdmissionsPage() {
  await enforcePageVisibility("admissions");
  const hero = templatePageHeroes.admissions!;
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
      <section className="section section-pattern">
        <div className="container">
          <InfoCardGrid items={admissionsCards} columns={2} />
        </div>
        <div className="container">
          <div className="divider" />
          <Link href="/contact" className="button">
            Schedule a Visit
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
