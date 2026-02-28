import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";

const events = [
  { date: "Mar 05", title: "Annual Sports Day" },
  { date: "Mar 18", title: "Parent-Teacher Meetings" },
  { date: "Apr 02", title: "Science Expo" },
  { date: "Apr 20", title: "Summer Break Begins" },
];

export default function CalendarPage() {
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
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
