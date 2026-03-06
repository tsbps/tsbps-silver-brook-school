import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { enforcePageVisibility } from "@/lib/page-visibility";
import { getSiteConfig } from "@/lib/site-config";

export default async function BlogPage() {
  await enforcePageVisibility("blog");
  const config = await getSiteConfig();
  const posts = config.blogPosts.filter((post) => post.published);

  return (
    <div>
      <Nav />
      <PageHero
        title="School Blog"
        eyebrow="Insights & Stories"
        description="Updates from classrooms, activities, and school life."
      />
      <section className="section">
        <div className="container grid grid-2">
          {posts.map((post) => (
            <article className="card" key={post.id}>
              <span className="tag">{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <div className="divider" />
              <p>{post.content}</p>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
