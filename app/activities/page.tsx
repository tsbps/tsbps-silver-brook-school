import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { enforcePageVisibility } from "@/lib/page-visibility";

const clubs = [
  "Robotics & Coding",
  "Sports & Athletics",
  "Language & Communication",
  "Music & Dance",
  "Visual Arts",
  "Debate & Public Speaking",
  "Eco Club",
  "Community Service",
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
          {clubs.map((club) => (
            <div className="card" key={club}>
              <h3>{club}</h3>
              <p>Weekly sessions guided by passionate mentors and coaches.</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
