import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { getSiteConfig } from "@/lib/site-config";
import { enforcePageVisibility } from "@/lib/page-visibility";

export default async function CalendarPage() {
  await enforcePageVisibility("calendar");
  const config = await getSiteConfig();
  const events = config.events;

  return (
    <div>
      <Nav />
      <PageHero
        title="School Calendar"
        eyebrow="Plan Ahead"
        description="Key academic dates, celebrations, and parent engagements."
      />
      <section className="section">
        <div className="container grid grid-2">
          {events.map((event) => (
            <div className="card" key={event.title}>
              <h3>{event.date}</h3>
              <p>{event.title}</p>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
