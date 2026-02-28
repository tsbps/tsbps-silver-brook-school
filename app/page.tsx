import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const highlights = [
  {
    title: "Grades I to VII (2026–27)",
    text: "Admissions open for the founding batches with focused attention and personalized guidance.",
  },
  {
    title: "Smart Classrooms + STEM Labs",
    text: "Technology-integrated learning, robotics, and coding labs to build future-ready skills.",
  },
  {
    title: "Holistic Development",
    text: "Sports, language, and life skills are woven into everyday learning.",
  },
];

const news = [
  {
    date: "May 2026 (expected)",
    title: "Inauguration & campus opening ceremony",
  },
  {
    date: "June 2026 (expected)",
    title: "Parent orientation and classroom walk-through",
  },
  {
    date: "July 2026 (expected)",
    title: "Founding academic term begins",
  },
];

export default function Home() {
  return (
    <div>
      <Nav />

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="badge">Learning is the Key to Leadership</span>
            <h1 className="reveal">The Silver Brook Public School</h1>
            <p className="reveal" style={{ animationDelay: "0.1s" }}>
              A forward-thinking school in Karatoor, near Gobichettipalayam, built
              to shape confident, future-ready leaders. We blend strong academics
              with technology, creativity, and character-building from the start.
            </p>
            <div className="hero-actions reveal" style={{ animationDelay: "0.2s" }}>
              <Link href="/admissions" className="button">
                Apply for 2026–27
              </Link>
              <Link href="/about" className="button secondary">
                Our Vision
              </Link>
            </div>
            <div className="hero-meta">
              <div>
                <strong>3</strong>
                <span>Months to launch</span>
              </div>
              <div>
                <strong>I–VII</strong>
                <span>Grades open</span>
              </div>
              <div>
                <strong>STEM</strong>
                <span>Robotics & coding</span>
              </div>
            </div>
          </div>
          <div className="hero-panel reveal" style={{ animationDelay: "0.15s" }}>
            <div className="hero-card">
              <span className="tag">Founding Year 2026–27</span>
              <h3>Be part of our first graduating community.</h3>
              <p>
                Small class sizes, personalized mentoring, and a values-driven
                culture from day one.
              </p>
              <div className="hero-stats">
                <div>
                  <h4>18</h4>
                  <p>Smart classrooms</p>
                </div>
                <div>
                  <h4>3</h4>
                  <p>STEM labs</p>
                </div>
                <div>
                  <h4>20+</h4>
                  <p>Clubs & sports</p>
                </div>
              </div>
              <Link href="/campus" className="button secondary">
                Explore Campus
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Academics</p>
              <h2>Strong foundations for confident, future-ready learners</h2>
            </div>
            <Link href="/academics" className="button secondary">
              Academics Overview
            </Link>
          </div>
          <div className="grid grid-3">
            {highlights.map((item) => (
              <div className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section accent">
        <div className="container grid grid-2">
          <div>
            <p className="eyebrow">About Us</p>
            <h2>Learning that builds leaders and life skills</h2>
            <p>
              The Silver Brook Public School focuses on knowledge-driven
              confidence, critical thinking, and a safe, vibrant campus culture.
              Our interdisciplinary curriculum prepares students for modern
              careers and competitive exams like NEET, IIT, and JEE.
            </p>
            <div className="divider" />
            <div className="grid grid-2">
              <div>
                <h3>Vision</h3>
                <p>To shape confident leaders who believe they can change the world.</p>
              </div>
              <div>
                <h3>Mission</h3>
                <p>
                  To deliver rigorous, tech-enabled learning with strong values
                  and holistic development.
                </p>
              </div>
            </div>
            <Link href="/about" className="button">
              Learn More
            </Link>
          </div>
          <div className="image-card">
            <div className="image-card-inner">
              <p className="tag">Principal's Note</p>
              <h3>Welcome to a school where every child is known.</h3>
              <p>
                We believe in celebrating progress, nurturing resilience, and
                empowering students to shape their own journeys.
              </p>
              <p className="signature">- The Principal</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Campus & Facilities</p>
              <h2>Modern spaces built for discovery</h2>
            </div>
            <Link href="/campus" className="button secondary">
              Tour the Campus
            </Link>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <span className="icon-badge" aria-hidden="true">
                💡
              </span>
              <h3>Technology-Integrated Classrooms</h3>
              <p>
                Smart boards, digital content, and interactive learning for every
                grade.
              </p>
            </div>
            <div className="card">
              <span className="icon-badge" aria-hidden="true">
                🤖
              </span>
              <h3>STEM Labs</h3>
              <p>
                Robotics, coding, and science labs to build problem-solving and
                innovation.
              </p>
            </div>
            <div className="card">
              <span className="icon-badge" aria-hidden="true">
                ⚽
              </span>
              <h3>Sports & Activity Zones</h3>
              <p>Dedicated spaces for athletics, yoga, and daily fitness.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section accent">
        <div className="container grid grid-2">
          <div>
            <p className="eyebrow">Milestones</p>
            <h2>Launching a new standard of learning</h2>
            <p>
              As we open our doors, we are setting benchmarks for quality
              learning, strong faculty, and a safe campus experience.
            </p>
            <Link href="/achievements" className="button">
              Our Early Milestones
            </Link>
          </div>
          <div className="grid grid-2">
            <div className="card">
              <h3>Founding Faculty Onboarded</h3>
              <p>Professional educators guiding every learner.</p>
            </div>
            <div className="card">
              <h3>STEM Labs Ready</h3>
              <p>Robotics and coding labs built for hands-on learning.</p>
            </div>
            <div className="card">
              <h3>Safety Framework</h3>
              <p>Clear policies for student well-being and security.</p>
            </div>
            <div className="card">
              <h3>Campus Launch</h3>
              <p>Opening in 2026 with Grades I–VII.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <div className="admissions-panel">
            <p className="eyebrow">Admissions</p>
            <h2>Now accepting applications for 2026–27</h2>
            <p>
              Join the founding batches and experience a modern school built for
              excellence and confidence.
            </p>
            <ul className="list">
              <li>Grades I to VII</li>
              <li>Technology-integrated learning</li>
              <li>Scholarship guidance available</li>
            </ul>
            <div className="hero-actions">
              <Link href="/admissions" className="button">
                Apply Now
              </Link>
              <Link href="/fees" className="button secondary">
                Fees & Scholarships
              </Link>
            </div>
          </div>
          <div className="card">
            <p className="tag">Why Silver Brook</p>
            <h3>Knowledge-driven confidence.</h3>
            <p>
              We prepare students for academic excellence, competitive exams,
              and life skills that matter.
            </p>
            <div className="divider" />
            <div className="grid grid-2">
              <div>
                <h4>Expert faculty</h4>
                <p>Mentors focused on growth and confidence.</p>
              </div>
              <div>
                <h4>Strong foundation</h4>
                <p>Core subjects reinforced with applied learning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section accent">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">News & Events</p>
              <h2>Upcoming milestones</h2>
            </div>
            <Link href="/news" className="button secondary">
              See All Updates
            </Link>
          </div>
          <div className="grid grid-3">
            {news.map((item) => (
              <div className="card" key={item.title}>
                <span className="tag">{item.date}</span>
                <h3>{item.title}</h3>
                <Link href="/news">Read update</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-preview">
        <div className="container grid grid-2">
          <div>
            <p className="eyebrow">Visit Us</p>
            <h2>We would love to welcome your family</h2>
            <div className="info-row">
              <span className="icon" aria-hidden="true">
                📍
              </span>
              <a
                href="https://www.google.com/maps/place/Kuthirai+Vandi+Theru,+Gobichettipalayam,+Tamil+Nadu+638476/@11.4549658,77.4262199,3868m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3ba93d97aa5c5915:0x255ab43b25c6212b!8m2!3d11.4549451!4d77.4365196!16zL20vMDRqNXN3?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
              >
                Pillaiyar Kovil Street, Near Astalakshmi Temple, Karatoor,
                Gobichettipalayam, Erode district - 638476.
              </a>
            </div>
            <div className="divider" />
            <div className="info-row">
              <span className="icon" aria-hidden="true">
                📞
              </span>
              <span>Phone: +91 99440 55929</span>
            </div>
            <div className="info-row">
              <span className="icon" aria-hidden="true">
                ✉️
              </span>
              <span>Email: thesilverbrookpublicschool@gmail.com</span>
            </div>
            <Link href="/contact" className="button">
              Contact Page
            </Link>
          </div>
          <div className="card">
            <h3>Office Hours</h3>
            <p>Monday to Friday: 8:30 AM - 4:00 PM</p>
            <p>Saturday: 9:00 AM - 1:00 PM</p>
            <p>Sunday: Closed</p>
            <div className="divider" />
            <h3>Transport Enquiry</h3>
            <p>Safe, GPS-enabled buses are available for nearby locations.</p>
            <Link href="/transport" className="button secondary">
              Transport Details
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
