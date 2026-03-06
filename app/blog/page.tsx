import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { getSiteConfig } from "@/lib/site-config";
import { isPostVisible, sortPostsDesc } from "@/lib/posts";
import ArticleCarousel from "@/components/ArticleCarousel";

export default async function BlogPage() {
  await enforcePageVisibility("blog");
  const config = await getSiteConfig();
  const posts = sortPostsDesc(config.blogPosts.filter(isPostVisible));

  return (
    <div>
      <Nav />
      <PageHero
        title="School Blog"
        eyebrow="Insights & Stories"
        description="Updates from classrooms, activities, and school life."
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
