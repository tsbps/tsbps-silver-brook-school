"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSiteConfig } from "@/components/SiteConfigProvider";
import type { ManagedPageKey } from "@/lib/site-config-schema";

const navLinks = [
  { href: "/about", label: "About", pageKey: "about" },
  { href: "/academics", label: "Academics", pageKey: "academics" },
  { href: "/admissions", label: "Admissions", pageKey: "admissions" },
  { href: "/campus", label: "Campus", pageKey: "campus" },
  { href: "/activities", label: "Activities", pageKey: "activities" },
  { href: "/news", label: "News", pageKey: "news" },
  { href: "/contact", label: "Contact", pageKey: "contact" },
] as const satisfies ReadonlyArray<{ href: string; label: string; pageKey: ManagedPageKey }>;

function toVisibleLinks(hiddenPages: ManagedPageKey[]) {
  return navLinks.filter((link) => !hiddenPages.includes(link.pageKey));
}

function formatPhoneForHref(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

function splitHeaderName(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 2) {
    return {
      lineOne: words.join(" ") || "The Silver Brook",
      lineTwo: "Public School",
    };
  }

  const middle = Math.ceil(words.length / 2);
  return {
    lineOne: words.slice(0, middle).join(" "),
    lineTwo: words.slice(middle).join(" "),
  };
}

const safeFallback = {
  lineOne: "The Silver Brook",
  lineTwo: "Public School",
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const config = useSiteConfig();
  const visibleLinks = toVisibleLinks(config.hiddenPages);
  const nameLines = config.schoolNameShort
    ? splitHeaderName(config.schoolNameShort)
    : safeFallback;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="nav-shell">
      <div className="container nav-bar">
        <Link href="/" className="logo">
          <img className="logo-image" src={config.logoPath || "/logo.png"} alt={`${config.schoolName} logo`} />
          <span className="logo-text">
            <strong>{nameLines.lineOne}</strong>
            <span>{nameLines.lineTwo}</span>
          </span>
        </Link>
        <nav className="nav-links">
          {visibleLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          {!config.hiddenPages.includes("admissions") ? (
            <Link href="/admissions" className="button">
              Apply Now
            </Link>
          ) : null}
        </div>
        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <aside className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mobile-menu-head">
            <div className="mobile-menu-brand">
              <img className="logo-image" src={config.logoPath || "/logo.png"} alt={`${config.schoolName} logo`} />
              <div className="logo-text">
                <strong>{nameLines.lineOne}</strong>
                <span>{nameLines.lineTwo}</span>
              </div>
            </div>
            <button
              className="mobile-menu-close"
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>
          <nav className="mobile-menu-links" aria-label="Mobile links">
            {visibleLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            {!config.hiddenPages.includes("admissions") ? (
              <Link href="/admissions" className="button" onClick={() => setOpen(false)}>
                Apply Now
              </Link>
            ) : null}
            <a href={`tel:${formatPhoneForHref(config.contactPhone)}`}>Call Office</a>
          </nav>
        </aside>
      </div>
    </header>
  );
}
