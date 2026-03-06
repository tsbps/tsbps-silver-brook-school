import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { getSiteConfig } from "@/lib/site-config";
import { enforcePageVisibility } from "@/lib/page-visibility";

export default async function NewsPage() {
  await enforcePageVisibility("news");
  const config = await getSiteConfig();
  const newsItems = config.events;

  return (
    <div>
      <Nav />
      <PageHero
        title="News & Events"
        eyebrow="Updates"
        description="Announcements and milestones as we prepare to open."
      />
      <section className="section">
        <div className="container grid grid-2">
          {newsItems.map((item) => (
            <div className="card" key={item.title}>
              <span className="tag">{item.date}</span>
              <h3>{item.title}</h3>
              <p>Follow our updates or contact the school office for details.</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
