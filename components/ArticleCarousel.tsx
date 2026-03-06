"use client";

import Link from "next/link";
import { useRef } from "react";
import type { SitePost } from "@/lib/site-config-schema";

export default function ArticleCarousel({
  posts,
  basePath,
}: {
  posts: SitePost[];
  basePath: "/news" | "/blog";
}) {
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollByCards = (direction: "left" | "right") => {
    if (!railRef.current) return;
    const width = railRef.current.clientWidth;
    railRef.current.scrollBy({
      left: direction === "right" ? width * 0.82 : -width * 0.82,
      behavior: "smooth",
    });
  };

  return (
    <div className="article-carousel-wrap">
      <div className="article-carousel-nav">
        <button type="button" className="carousel-arrow" onClick={() => scrollByCards("left")}>
          ←
        </button>
        <button type="button" className="carousel-arrow" onClick={() => scrollByCards("right")}>
          →
        </button>
      </div>
      <div className="article-carousel" ref={railRef}>
        {posts.map((post) => (
          <article className="article-card" key={post.id}>
            <h3>{post.title}</h3>
            <p className="article-date">{post.date}</p>
            <p className="article-category">{post.category}</p>
            <img src={post.image || "/images/ai-campus-1.svg"} alt={post.title} />
            <p>{post.summary}</p>
            <Link className="button secondary article-read-btn" href={`${basePath}/${post.slug}`}>
              Show In Detail
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
