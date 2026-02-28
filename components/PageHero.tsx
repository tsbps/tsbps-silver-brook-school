import Link from "next/link";

interface PageHeroProps {
  title: string;
  eyebrow?: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function PageHero({
  title,
  eyebrow,
  description,
  ctaLabel,
  ctaHref,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p>{description}</p>
        {ctaLabel && ctaHref ? (
          <Link href={ctaHref} className="button">
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
