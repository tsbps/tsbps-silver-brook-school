import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { getSiteConfig } from "@/lib/site-config";
import { isPostVisible } from "@/lib/posts";
import { simpleMarkupToHtml } from "@/lib/rich-text";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  await enforcePageVisibility("news");
  const config = await getSiteConfig();
  const post = config.newsPosts.find((item) => item.slug === params.slug && isPostVisible(item));
  if (!post) notFound();

  return (
    <div>
      <Nav />
      <section className="section article-detail">
        <div className="container article-detail-wrap">
          <p className="eyebrow">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="article-date">{post.date}</p>
          <img className="article-hero-image" src={post.image || "/images/ai-campus-1.svg"} alt={post.title} />
          <p className="article-summary">{post.summary}</p>
          <article
            className="article-content"
            dangerouslySetInnerHTML={{ __html: simpleMarkupToHtml(post.content) }}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
