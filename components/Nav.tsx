import Link from "next/link";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/campus", label: "Campus" },
  { href: "/activities", label: "Activities" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="nav-shell">
      <div className="container nav-bar">
        <Link href="/" className="logo">
          <span className="logo-mark">SB</span>
          <span className="logo-text">
            <strong>The Silver Brook</strong>
            <span>Public School</span>
          </span>
        </Link>
        <nav className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link href="/admissions" className="button">
            Apply Now
          </Link>
        </div>
      </div>
    </header>
  );
}
