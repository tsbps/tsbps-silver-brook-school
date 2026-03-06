import type { SitePost } from "@/lib/site-config-schema";

function isScheduledVisible(post: SitePost) {
  if (post.status !== "scheduled") return false;
  if (!post.scheduledAt) return false;
  const ts = Date.parse(post.scheduledAt);
  if (Number.isNaN(ts)) return false;
  return ts <= Date.now();
}

export function isPostVisible(post: SitePost) {
  return post.status === "published" || isScheduledVisible(post);
}

export function sortPostsDesc(posts: SitePost[]) {
  return [...posts].sort((a, b) => {
    const ad = Date.parse(a.date);
    const bd = Date.parse(b.date);
    if (Number.isNaN(ad) || Number.isNaN(bd)) return b.date.localeCompare(a.date);
    return bd - ad;
  });
}
