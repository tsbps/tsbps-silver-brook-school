import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";

const newsItems = [
  {
    date: "March 2026",
    title: "Admissions open for Grades I–VII (2026–27)",
  },
  {
    date: "April 2026",
    title: "Faculty onboarding and classroom setup",
  },
  {
    date: "May 2026",
    title: "Campus inauguration preparations",
  },
  {
    date: "June 2026",
    title: "Parent orientation and readiness week",
  },
];

export default function NewsPage() {
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
