import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { getSiteConfig } from "@/lib/site-config";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { isPostVisible, sortPostsDesc } from "@/lib/posts";
import ArticleCarousel from "@/components/ArticleCarousel";

export default async function NewsPage() {
  await enforcePageVisibility("news");
  const config = await getSiteConfig();
  const newsItems = sortPostsDesc(config.newsPosts.filter(isPostVisible));

  return (
    <div>
      <Nav />
      <PageHero
        title="News & Events"
        eyebrow="Updates"
        description="Announcements and milestones as we prepare to open."
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
