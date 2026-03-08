import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { getSiteConfig } from "@/lib/site-config";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { isEventVisible } from "@/lib/events";
import SchoolCalendar from "@/components/SchoolCalendar";
import { templatePageHeroes } from "@/content/page-content";

export default async function CalendarPage() {
  await enforcePageVisibility("calendar");
  const config = await getSiteConfig();
  const visibleEvents = config.events.filter(isEventVisible);
  const hero = templatePageHeroes.calendar!;

  return (
    <div>
      <Nav />
      <PageHero
        title={hero.title}
        eyebrow={hero.eyebrow}
        description={hero.description}
      />
      <section className="section">
        <div className="container">
          <SchoolCalendar events={visibleEvents} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
