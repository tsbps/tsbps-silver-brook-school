import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { templatePageHeroes } from "@/content/page-content";

export default async function TransportPage() {
  await enforcePageVisibility("transport");
  const hero = templatePageHeroes.transport!;
  return (
    <div>
      <Nav />
      <PageHero title={hero.title} eyebrow={hero.eyebrow} description={hero.description} />
      <section className="section">
        <div className="container grid grid-2">
          <div className="card info-card">
            <h3>Routes</h3>
            <p>
              Buses will operate across Gobichettipalayam and surrounding areas.
              Final routes will be announced before opening.
            </p>
          </div>
          <div className="card info-card">
            <h3>Safety</h3>
            <p>
              Dedicated transport coordinators, GPS tracking, and trained
              attendants on each route.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
