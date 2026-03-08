import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { getSiteConfig } from "@/lib/site-config";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { isPostVisible, sortPostsDesc } from "@/lib/posts";
import ArticleCarousel from "@/components/ArticleCarousel";
import { templatePageHeroes } from "@/content/page-content";

export default async function NewsPage() {
  await enforcePageVisibility("news");
  const config = await getSiteConfig();
  const newsItems = sortPostsDesc(config.newsPosts.filter(isPostVisible));
  const hero = templatePageHeroes.news!;

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
          <ArticleCarousel posts={newsItems} basePath="/news" />
        </div>
      </section>
      <Footer />
    </div>
  );
}
