import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { templatePageHeroes } from "@/content/page-content";

export default async function HostelPage() {
  await enforcePageVisibility("hostel");
  const hero = templatePageHeroes.hostel!;
  return (
    <div>
      <Nav />
      <PageHero title={hero.title} eyebrow={hero.eyebrow} description={hero.description} />
      <section className="section">
        <div className="container grid grid-2">
          <div className="card info-card">
            <h3>Facilities</h3>
            <p>Well-ventilated rooms, study halls, and nutritious meals.</p>
          </div>
          <div className="card info-card">
            <h3>Student Care</h3>
            <p>House parents, wellness checks, and structured routines.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
