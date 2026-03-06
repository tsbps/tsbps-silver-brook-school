import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { getSiteConfig } from "@/lib/site-config";
import { enforcePageVisibility } from "@/lib/page-visibility";

function parseEventDate(raw: string, year: number): Date | null {
  const direct = new Date(raw);
  if (!Number.isNaN(direct.getTime())) return direct;

  const withYear = new Date(`${raw} ${year}`);
  if (!Number.isNaN(withYear.getTime())) return withYear;

  return null;
}

export default async function CalendarPage() {
  await enforcePageVisibility("calendar");
  const config = await getSiteConfig();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthLabel = now.toLocaleString("en-IN", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const leadBlanks = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const parsedEvents = config.events
    .map((event) => {
      const date = parseEventDate(event.date, year);
      return { ...event, parsedDate: date };
    })
    .sort((a, b) => {
      if (!a.parsedDate && !b.parsedDate) return a.date.localeCompare(b.date);
      if (!a.parsedDate) return 1;
      if (!b.parsedDate) return -1;
      return a.parsedDate.getTime() - b.parsedDate.getTime();
    });

  const dayEvents: Record<string, typeof parsedEvents> = {};
  for (const event of parsedEvents) {
    if (!event.parsedDate) continue;
    if (event.parsedDate.getMonth() !== month || event.parsedDate.getFullYear() !== year) continue;
    const key = String(event.parsedDate.getDate());
    dayEvents[key] = [...(dayEvents[key] || []), event];
  }

  return (
    <div>
      <Nav />
      <PageHero
        title="School Calendar"
        eyebrow="Plan Ahead"
        description="Key academic dates, celebrations, and parent engagements."
      />
      <section className="section">
        <div className="container calendar-layout">
          <article className="card school-calendar-card">
            <div className="school-calendar-head">
              <h3>{monthLabel}</h3>
              <p>Monthly view</p>
            </div>
            <div className="school-calendar-grid school-calendar-weekdays">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className="school-calendar-grid school-calendar-days">
              {Array.from({ length: leadBlanks }).map((_, index) => (
                <span key={`blank-${index}`} className="school-calendar-day empty" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const items = dayEvents[String(day)] || [];
                return (
                  <div key={day} className={`school-calendar-day ${items.length ? "has-event" : ""}`}>
                    <strong>{day}</strong>
                    {items.length ? <small>{items.length} event</small> : null}
                  </div>
                );
              })}
            </div>
          </article>

          <article className="card school-calendar-events">
            <h3>Upcoming Events</h3>
            <div className="divider" />
            <div className="school-calendar-event-list">
              {parsedEvents.map((event) => (
                <div className="school-calendar-event-item" key={event.id}>
                  <p className="school-calendar-event-date">
                    {event.parsedDate
                      ? event.parsedDate.toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : event.date}
                  </p>
                  <h4>{event.title}</h4>
                  {event.description ? <p>{event.description}</p> : null}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
      <Footer />
    </div>
  );
}
