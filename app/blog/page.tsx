import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { getSiteConfig } from "@/lib/site-config";
import { isPostVisible, sortPostsDesc } from "@/lib/posts";
import ArticleCarousel from "@/components/ArticleCarousel";
import { templatePageHeroes } from "@/content/page-content";

export default async function BlogPage() {
  await enforcePageVisibility("blog");
  const config = await getSiteConfig();
  const posts = sortPostsDesc(config.blogPosts.filter(isPostVisible));
  const hero = templatePageHeroes.blog!;

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
          <ArticleCarousel posts={posts} basePath="/blog" />
        </div>
      </section>
      <Footer />
    </div>
  );
}
