import Link from "next/link";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { getSiteConfig } from "@/lib/site-config";
import { enforcePageVisibility } from "@/lib/page-visibility";
import {
  homeAcademicExams,
  homeHeroContent,
  homeKeyBenefits,
  homeSpecialFeatures,
  homeStudentLife,
} from "@/content/home-content";
import { getTemplateSiteIdentity } from "@/config/template-config";

function formatPhoneForHref(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

export default async function Home() {
  await enforcePageVisibility("home");
  const config = await getSiteConfig();
  const site = getTemplateSiteIdentity(config);

  return (
    <div>
      <Nav />

      <section className="section home-hero">
        <div className="container home-hero-grid">
          <div className="home-hero-left">
            <p className="eyebrow home-hero-eyebrow">{homeHeroContent.eyebrow}</p>
            <h1 className="home-gradient-title">{site.tagline}</h1>
            <p className="home-subline">{homeHeroContent.subline}</p>
            <div className="home-vision-block">
              <p>
                <strong>Vision:</strong> {homeHeroContent.vision}
              </p>
              <p>
                <strong>Mission:</strong> {homeHeroContent.mission}
              </p>
            </div>
            <div className="home-badges">
              {homeHeroContent.badges.map((badge) => (
                <span key={badge} className="home-badge">
                  {badge}
                </span>
              ))}
            </div>
            <div className="home-actions">
              <Link href="/admissions" className="button">
                Apply for Admission
              </Link>
              <Link href="/contact" className="button secondary">
                Contact School
              </Link>
            </div>
          </div>

          <aside className="home-hero-right card">
            <h3>CBSE Syllabus</h3>
            <p>(To be affiliated to CBSE Board, New Delhi)</p>
            <div className="divider" />
            <p>Near Ashtalakshmi Temple, Karatoor, Gobichettipalayam</p>
            <p>Contact: {site.phone}</p>
            <div className="home-stats">
              <div>
                <strong>I-VII</strong>
                <span>Grades</span>
              </div>
              <div>
                <strong>STEM</strong>
                <span>Labs</span>
              </div>
              <div>
                <strong>CBSE</strong>
                <span>Foundation</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section accent home-section section-pattern">
        <div className="container">
          <h2>Special Features</h2>
          <div className="home-cards-grid">
            {homeSpecialFeatures.map((item) => (
              <article className="card home-feature-card home-theme-card" key={item.title}>
                <span className="home-dot" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-section section-pattern">
        <div className="container">
          <h2>Key Benefits</h2>
          <div className="home-benefits-grid">
            {homeKeyBenefits.map((item) => (
              <article className="card home-benefit-card home-theme-card" key={item.title}>
                <h3>{item.title}</h3>
                <ul className="home-mini-list">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="card home-contact-card home-theme-card">
            <div className="info-row">
              <span className="icon icon-phone" aria-hidden="true" />
              <a href={`tel:${formatPhoneForHref(site.phone)}`}>
                <strong>Call Us:</strong> {site.phone}
              </a>
            </div>
            <div className="info-row">
              <span className="icon icon-mail" aria-hidden="true" />
              <a href={`mailto:${site.email}`}>
                <strong>Email:</strong> {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section accent home-section section-pattern">
        <div className="container">
          <article className="card home-cbse-card home-theme-card">
            <div className="home-cbse-layout">
              <div className="home-cbse-logo-wrap">
                <img className="home-cbse-logo" src={config.logoPath || "/logo.png"} alt={`${config.schoolName} logo`} />
              </div>
              <div className="home-cbse-content">
                <h2>{site.siteName.toUpperCase()}</h2>
                <p>(To be affiliated to CBSE Board, New Delhi)</p>
                <p>Near Ashtalakshmi Temple, Karatoor, Gobichettipalayam</p>
                <p>Contact: {site.phone}</p>
                <div className="divider" />
                <p>
                  <strong>CBSE SYLLABUS</strong>
                </p>
                <p>Learning is the key to leadership</p>
                <p>Where Knowledge sparks confidence</p>
                <p>
                  <strong>Admissions Open 2026-2027</strong>
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section home-section">
        <div className="container">
          <h2>{homeAcademicExams.title}</h2>
          <div className="home-exams-grid">
            <article className="card home-exam-card home-theme-card">
              <h3>Olympiad Exams</h3>
              <ol className="home-ordered-list">
                {homeAcademicExams.olympiad.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>

            <article className="card home-exam-card home-theme-card">
              <h3>National Level Exams</h3>
              <ol className="home-ordered-list">
                {homeAcademicExams.national.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>

            <article className="card home-exam-card home-theme-card">
              <h3>Other Exams</h3>
              <ol className="home-ordered-list">
                {homeAcademicExams.other.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
          </div>
          <article className="card home-note-card home-theme-card">
            <p>
              <strong>Note:</strong> These exams help students develop skills, gain
              confidence and prepare for future competitive exams.
            </p>
          </article>
        </div>
      </section>

      <section className="section accent home-section section-pattern">
        <div className="container">
          <div className="home-group-head">
            <h2>{homeStudentLife.title}</h2>
            <p>{homeStudentLife.subtitle}</p>
          </div>
        </div>
        <div className="container home-final-grid">
          <article className="card home-list-card home-theme-card">
            <h3>Sports</h3>
            <ul className="list">
              {homeStudentLife.sports.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="card home-list-card home-theme-card">
            <h3>Extra Curricular Activities</h3>
            <ul className="list">
              {homeStudentLife.activities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="card home-list-card home-theme-card">
            <h3>School Fees Includes</h3>
            <ul className="list">
              {homeStudentLife.feeIncludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
