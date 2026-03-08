import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { templatePageHeroes } from "@/content/page-content";
import { getSiteConfig } from "@/lib/site-config";

export default async function CareersPage() {
  await enforcePageVisibility("careers");
  const config = await getSiteConfig();
  const hero = templatePageHeroes.careers ?? {
    title: "Careers",
    eyebrow: "Join Our Team",
    description: "We welcome passionate educators and staff members to grow with our community.",
    ctaLabel: "Apply Now",
    ctaHref: "/contact",
  };
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
        <div className="container grid grid-2">
          <div className="card info-card">
            <h3>Open Roles</h3>
            <p>Teaching, administration, and support positions listed annually.</p>
          </div>
          <div className="card info-card">
            <h3>How to Apply</h3>
            <p>
              Send your resume and cover letter to <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
