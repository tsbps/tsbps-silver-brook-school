import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { templatePageHeroes } from "@/content/page-content";

const faculty = [
  { name: "Ms. Revathi Kumar", role: "Principal" },
  { name: "Mr. Arun Iyer", role: "Vice Principal" },
  { name: "Ms. Meena Sharma", role: "Head - Primary" },
  { name: "Mr. Rajesh Nair", role: "Head - Middle School" },
  { name: "Ms. Asha Devi", role: "STEM Coordinator" },
  { name: "Mr. Karthik Srinivasan", role: "Sports Director" },
];

export default async function FacultyPage() {
  await enforcePageVisibility("faculty");
  const hero = templatePageHeroes.faculty!;
  return (
    <div>
      <Nav />
      <PageHero
        title={hero.title}
        eyebrow={hero.eyebrow}
        description={hero.description}
        ctaLabel="Contact the Team"
        ctaHref="/contact"
      />
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {faculty.map((person) => (
              <div className="card info-card" key={person.name}>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
                <p>
                  Specializes in student-centered learning, family engagement, and
                  academic mentoring.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
