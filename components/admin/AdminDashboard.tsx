"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ALL_MANAGED_PAGES,
  defaultSiteConfig,
  type ManagedPageKey,
  type SiteConfig,
  type SiteEvent,
  type SitePost,
} from "@/lib/site-config-schema";

const PAGE_LABELS: Record<ManagedPageKey, string> = {
  home: "Home",
  about: "About",
  academics: "Academics",
  admissions: "Admissions",
  campus: "Campus",
  activities: "Activities",
  blog: "Blog",
  news: "News",
  contact: "Contact",
  calendar: "Calendar",
  gallery: "Gallery",
  transport: "Transport",
  curriculum: "Curriculum",
  fees: "Fees",
  faculty: "Faculty",
  downloads: "Downloads",
  policies: "Policies",
  hostel: "Hostel",
  careers: "Careers",
  achievements: "Achievements",
};

interface AdminDashboardProps {
  initialConfig: SiteConfig;
}

const BLOG_CATEGORIES = [
  "Academics",
  "Student Life",
  "Activities",
  "Sports",
  "Technology",
  "Health & Wellness",
  "Parenting & Guidance",
  "Achievements",
  "Others / Miscellaneous",
];

const NEWS_CATEGORIES = [
  "Announcements",
  "Events",
  "Achievements",
  "Competitions",
  "Admissions",
  "Infrastructure",
  "Notices",
  "Others / Miscellaneous",
];

function normalizeEventInput(value: string): SiteEvent[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [date, title = "", description = ""] = line.split("|").map((item) => item.trim());
      return {
        id: `event-${index + 1}`,
        date,
        title,
        description,
      };
    })
    .filter((item) => item.date && item.title);
}

function emptyPost(type: "news" | "blog"): SitePost {
  const now = Date.now();
  return {
    id: `${type}-${now}`,
    slug: `${type}-${now}`,
    date: "",
    title: "",
    category: type === "news" ? NEWS_CATEGORIES[0] : BLOG_CATEGORIES[0],
    image: "/logo.png",
    summary: "",
    content: "",
    status: "draft",
    scheduledAt: "",
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminDashboard({ initialConfig }: AdminDashboardProps) {
  const router = useRouter();
  const [config, setConfig] = useState<SiteConfig>(initialConfig);
  const [eventsRawInput, setEventsRawInput] = useState(
    initialConfig.events
      .map((event) => `${event.date} | ${event.title} | ${event.description ?? ""}`)
      .join("\n")
  );
  const [logoUploadFile, setLogoUploadFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [expandedNews, setExpandedNews] = useState<Record<string, boolean>>({});
  const [expandedBlogs, setExpandedBlogs] = useState<Record<string, boolean>>({});
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  const eventsPreview = useMemo(() => normalizeEventInput(eventsRawInput), [eventsRawInput]);

  const updatePost = (type: "newsPosts" | "blogPosts", id: string, patch: Partial<SitePost>) => {
    setConfig((prev) => ({
      ...prev,
      [type]: prev[type].map((post) => {
        if (post.id !== id) return post;
        const next = { ...post, ...patch };
        if (patch.title && (!post.slug || post.slug.startsWith(type === "newsPosts" ? "news-" : "blog-"))) {
          next.slug = slugify(patch.title);
        }
        return next;
      }),
    }));
  };

  const removePost = (type: "newsPosts" | "blogPosts", id: string) => {
    setConfig((prev) => ({
      ...prev,
      [type]: prev[type].filter((post) => post.id !== id),
    }));
  };

  const addPost = (type: "newsPosts" | "blogPosts") => {
    const empty = emptyPost(type === "newsPosts" ? "news" : "blog");
    setConfig((prev) => ({
      ...prev,
      [type]: [empty, ...prev[type]],
    }));
    if (type === "newsPosts") setExpandedNews((prev) => ({ ...prev, [empty.id]: true }));
    else setExpandedBlogs((prev) => ({ ...prev, [empty.id]: true }));
  };

  const confirmDeletePost = (type: "newsPosts" | "blogPosts", id: string) => {
    const accepted = window.confirm("Delete this article permanently?");
    if (!accepted) return;
    removePost(type, id);
    if (type === "newsPosts") setExpandedNews((prev) => ({ ...prev, [id]: false }));
    else setExpandedBlogs((prev) => ({ ...prev, [id]: false }));
  };

  const applyFormat = (postId: string, type: "bold" | "italic" | "line") => {
    const target = textareaRefs.current[postId];
    if (!target) return;
    const start = target.selectionStart ?? 0;
    const end = target.selectionEnd ?? start;
    const value = target.value;
    const selected = value.slice(start, end);
    let insertion = selected;
    if (type === "bold") insertion = `**${selected || "bold text"}**`;
    if (type === "italic") insertion = `*${selected || "italic text"}*`;
    if (type === "line") insertion = `\n- ${selected || "point"}`;
    const next = value.slice(0, start) + insertion + value.slice(end);
    target.value = next;
    target.dispatchEvent(new Event("input", { bubbles: true }));
  };

  async function saveConfig(nextConfig: SiteConfig) {
    setSaving(true);
    setStatus("Saving...");

    const payload: SiteConfig = {
      ...nextConfig,
      events: eventsPreview,
    };

    try {
      const response = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { ok: boolean; message?: string; config?: SiteConfig };
      if (!result.ok || !result.config) {
        setStatus(result.message || "Unable to save changes");
        return;
      }

      setConfig(result.config);
      setEventsRawInput(
        result.config.events
          .map((event) => `${event.date} | ${event.title} | ${event.description ?? ""}`)
          .join("\n")
      );
      setStatus("Saved successfully");
      router.refresh();
    } catch {
      setStatus("Save failed due to network/server error");
    } finally {
      setSaving(false);
    }
  }

  async function resetToBaseline() {
    setSaving(true);
    setStatus("Rolling back to baseline...");
    try {
      const response = await fetch("/api/admin/config/reset", { method: "POST" });
      const result = (await response.json()) as { ok: boolean; message?: string; config?: SiteConfig };
      if (!result.ok || !result.config) {
        setStatus(result.message || "Rollback failed");
        return;
      }
      setConfig(result.config);
      setEventsRawInput(
        result.config.events
          .map((event) => `${event.date} | ${event.title} | ${event.description ?? ""}`)
          .join("\n")
      );
      setStatus("Rolled back to baseline config");
      router.refresh();
    } catch {
      setStatus("Rollback failed due to network/server error");
    } finally {
      setSaving(false);
    }
  }

  async function uploadLogoToGitHub() {
    if (!logoUploadFile) {
      setStatus("Pick an image file first.");
      return;
    }

    setUploadingLogo(true);
    setStatus("Uploading logo to GitHub...");
    const formData = new FormData();
    formData.append("file", logoUploadFile);

    try {
      const response = await fetch("/api/admin/upload-logo", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
        logoPath?: string;
        committedPath?: string;
      };

      if (!result.ok || !result.logoPath) {
        setStatus(result.message || "Logo upload failed");
        return;
      }

      setConfig((prev) => ({ ...prev, logoPath: result.logoPath as string }));
      setStatus(`Logo uploaded (${result.committedPath}). Click "Save Settings" to apply.`);
    } catch {
      setStatus("Logo upload failed due to network/server error");
    } finally {
      setUploadingLogo(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <section className="section">
      <div className="container">
        <div className="card admin-panel">
          <div className="admin-panel-head">
            <div>
              <p className="eyebrow">Control Center</p>
              <h1>Website Dashboard</h1>
              <p>Manage branding, theme, events, news and blog content.</p>
            </div>
            <button type="button" className="button secondary" onClick={logout}>
              Logout
            </button>
          </div>

          <h3>Branding & Contact</h3>
          <div className="admin-grid">
            <label>
              School Name
              <input
                value={config.schoolName}
                onChange={(event) => setConfig({ ...config, schoolName: event.target.value })}
              />
            </label>
            <label>
              Header Name (short)
              <input
                value={config.schoolNameShort}
                onChange={(event) => setConfig({ ...config, schoolNameShort: event.target.value })}
              />
            </label>
            <label>
              Tagline
              <input value={config.tagline} onChange={(event) => setConfig({ ...config, tagline: event.target.value })} />
            </label>
            <label>
              Logo Path
              <input
                value={config.logoPath}
                onChange={(event) => setConfig({ ...config, logoPath: event.target.value })}
                placeholder="/logo.png"
              />
            </label>
            <label>
              Upload Logo to GitHub
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={(event) => setLogoUploadFile(event.target.files?.[0] || null)}
              />
              <button
                type="button"
                className="button secondary admin-upload-btn"
                onClick={uploadLogoToGitHub}
                disabled={uploadingLogo}
              >
                {uploadingLogo ? "Uploading..." : "Upload Logo"}
              </button>
            </label>
            <label>
              Phone
              <input
                value={config.contactPhone}
                onChange={(event) => setConfig({ ...config, contactPhone: event.target.value })}
              />
            </label>
            <label>
              Email
              <input
                value={config.contactEmail}
                onChange={(event) => setConfig({ ...config, contactEmail: event.target.value })}
              />
            </label>
          </div>

          <label className="admin-field">
            Address
            <textarea
              value={config.address}
              onChange={(event) => setConfig({ ...config, address: event.target.value })}
              rows={3}
            />
          </label>

          <div className="divider" />
          <h3>Theme</h3>
          <div className="admin-grid">
            {[
              { key: "paper", label: "Page Background" },
              { key: "brand400", label: "Brand 400" },
              { key: "brand600", label: "Brand 600" },
              { key: "brand700", label: "Brand 700" },
            ].map((item) => (
              <label key={item.key}>
                {item.label}
                <div className="admin-theme-field">
                  <input
                    type="color"
                    value={config.theme[item.key as keyof typeof config.theme]}
                    onChange={(event) =>
                      setConfig({
                        ...config,
                        theme: {
                          ...config.theme,
                          [item.key]: event.target.value,
                        },
                      })
                    }
                  />
                  <input
                    value={config.theme[item.key as keyof typeof config.theme]}
                    onChange={(event) =>
                      setConfig({
                        ...config,
                        theme: {
                          ...config.theme,
                          [item.key]: event.target.value,
                        },
                      })
                    }
                  />
                </div>
              </label>
            ))}
          </div>
          <div className="admin-color-strip">
            <div className="admin-color-swatch">
              Paper
              <span className="admin-color-preview" style={{ background: config.theme.paper }} />
            </div>
            <div className="admin-color-swatch">
              Brand 400
              <span className="admin-color-preview" style={{ background: config.theme.brand400 }} />
            </div>
            <div className="admin-color-swatch">
              Brand 600
              <span className="admin-color-preview" style={{ background: config.theme.brand600 }} />
            </div>
            <div className="admin-color-swatch">
              Brand 700
              <span className="admin-color-preview" style={{ background: config.theme.brand700 }} />
            </div>
          </div>

          <div className="divider" />
          <h3>Page Visibility</h3>
          <p className="admin-help">Checked means hidden (returns 404 and removed from menu).</p>
          <div className="admin-check-grid">
            {ALL_MANAGED_PAGES.map((page) => (
              <label key={page} className="admin-check">
                <input
                  type="checkbox"
                  checked={config.hiddenPages.includes(page)}
                  onChange={(event) => {
                    const hiddenSet = new Set(config.hiddenPages);
                    if (event.target.checked) hiddenSet.add(page);
                    else hiddenSet.delete(page);
                    setConfig({ ...config, hiddenPages: Array.from(hiddenSet) as ManagedPageKey[] });
                  }}
                />
                <span>{PAGE_LABELS[page]}</span>
              </label>
            ))}
          </div>

          <div className="divider" />
          <h3>Events</h3>
          <p className="admin-help">
            One line: <code>Date | Event title | Short description</code>
          </p>
          <textarea className="admin-events" rows={8} value={eventsRawInput} onChange={(e) => setEventsRawInput(e.target.value)} />
          <p className="admin-help">Valid events parsed: {eventsPreview.length}</p>

          <div className="divider" />
          <div className="admin-section-head">
            <h3>News Articles</h3>
            <button type="button" className="button secondary" onClick={() => addPost("newsPosts")}>
              Add News
            </button>
          </div>
          <div className="admin-article-list">
            {config.newsPosts.map((post) => (
              <article className="admin-article-card" key={post.id}>
                <div className="admin-article-actions">
                  <strong>{post.title || "Untitled news"}</strong>
                  <button
                    type="button"
                    className="button secondary"
                    onClick={() =>
                      setExpandedNews((prev) => ({
                        ...prev,
                        [post.id]: !prev[post.id],
                      }))
                    }
                  >
                    {expandedNews[post.id] ? "Close Edit" : "Edit"}
                  </button>
                </div>
                <p className="admin-help">
                  {post.date || "No date"} · {post.category || "No category"} · {post.status}
                </p>
                {expandedNews[post.id] ? (
                  <>
                    <div className="admin-grid">
                      <label>
                        Title
                        <input value={post.title} placeholder="Article title" onChange={(e) => updatePost("newsPosts", post.id, { title: e.target.value })} />
                      </label>
                      <label>
                        Slug
                        <input value={post.slug} placeholder="article-slug" onChange={(e) => updatePost("newsPosts", post.id, { slug: slugify(e.target.value) })} />
                      </label>
                      <label>
                        Date
                        <input type="date" value={post.date} onChange={(e) => updatePost("newsPosts", post.id, { date: e.target.value })} />
                      </label>
                      <label>
                        Category
                        <select value={post.category} onChange={(e) => updatePost("newsPosts", post.id, { category: e.target.value })}>
                          {(NEWS_CATEGORIES.includes(post.category)
                            ? NEWS_CATEGORIES
                            : [post.category, ...NEWS_CATEGORIES]
                          ).map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Status
                        <select
                          value={post.status}
                          onChange={(e) => updatePost("newsPosts", post.id, { status: e.target.value as SitePost["status"] })}
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="scheduled">Scheduled</option>
                        </select>
                      </label>
                      {post.status === "scheduled" ? (
                        <label>
                          Schedule Time
                          <input
                            type="datetime-local"
                            value={post.scheduledAt || ""}
                            onChange={(e) => updatePost("newsPosts", post.id, { scheduledAt: e.target.value })}
                          />
                        </label>
                      ) : null}
                      <label>
                        Image URL / Path
                        <input value={post.image} placeholder="/logo.png" onChange={(e) => updatePost("newsPosts", post.id, { image: e.target.value })} />
                      </label>
                    </div>
                    <label className="admin-field">
                      Summary
                      <textarea rows={2} value={post.summary} onChange={(e) => updatePost("newsPosts", post.id, { summary: e.target.value })} />
                    </label>
                    <div className="admin-rich-toolbar">
                      <button type="button" className="button secondary" onClick={() => applyFormat(post.id, "bold")}>Bold</button>
                      <button type="button" className="button secondary" onClick={() => applyFormat(post.id, "italic")}>Italic</button>
                      <button type="button" className="button secondary" onClick={() => applyFormat(post.id, "line")}>Bullet</button>
                      <button type="button" className="button secondary" onClick={() => confirmDeletePost("newsPosts", post.id)}>
                        Delete Article
                      </button>
                    </div>
                    <label className="admin-field">
                      Content
                      <textarea
                        rows={6}
                        ref={(node) => {
                          textareaRefs.current[post.id] = node;
                        }}
                        value={post.content}
                        onChange={(e) => updatePost("newsPosts", post.id, { content: e.target.value })}
                      />
                    </label>
                  </>
                ) : null}
              </article>
            ))}
          </div>

          <div className="divider" />
          <div className="admin-section-head">
            <h3>Blog Articles</h3>
            <button type="button" className="button secondary" onClick={() => addPost("blogPosts")}>
              Add Blog
            </button>
          </div>
          <div className="admin-article-list">
            {config.blogPosts.map((post) => (
              <article className="admin-article-card" key={post.id}>
                <div className="admin-article-actions">
                  <strong>{post.title || "Untitled blog"}</strong>
                  <button
                    type="button"
                    className="button secondary"
                    onClick={() =>
                      setExpandedBlogs((prev) => ({
                        ...prev,
                        [post.id]: !prev[post.id],
                      }))
                    }
                  >
                    {expandedBlogs[post.id] ? "Close Edit" : "Edit"}
                  </button>
                </div>
                <p className="admin-help">
                  {post.date || "No date"} · {post.category || "No category"} · {post.status}
                </p>
                {expandedBlogs[post.id] ? (
                  <>
                    <div className="admin-grid">
                      <label>
                        Title
                        <input value={post.title} placeholder="Article title" onChange={(e) => updatePost("blogPosts", post.id, { title: e.target.value })} />
                      </label>
                      <label>
                        Slug
                        <input value={post.slug} placeholder="article-slug" onChange={(e) => updatePost("blogPosts", post.id, { slug: slugify(e.target.value) })} />
                      </label>
                      <label>
                        Date
                        <input type="date" value={post.date} onChange={(e) => updatePost("blogPosts", post.id, { date: e.target.value })} />
                      </label>
                      <label>
                        Category
                        <select value={post.category} onChange={(e) => updatePost("blogPosts", post.id, { category: e.target.value })}>
                          {(BLOG_CATEGORIES.includes(post.category)
                            ? BLOG_CATEGORIES
                            : [post.category, ...BLOG_CATEGORIES]
                          ).map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Status
                        <select
                          value={post.status}
                          onChange={(e) => updatePost("blogPosts", post.id, { status: e.target.value as SitePost["status"] })}
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="scheduled">Scheduled</option>
                        </select>
                      </label>
                      {post.status === "scheduled" ? (
                        <label>
                          Schedule Time
                          <input
                            type="datetime-local"
                            value={post.scheduledAt || ""}
                            onChange={(e) => updatePost("blogPosts", post.id, { scheduledAt: e.target.value })}
                          />
                        </label>
                      ) : null}
                      <label>
                        Image URL / Path
                        <input value={post.image} placeholder="/logo.png" onChange={(e) => updatePost("blogPosts", post.id, { image: e.target.value })} />
                      </label>
                    </div>
                    <label className="admin-field">
                      Summary
                      <textarea rows={2} value={post.summary} onChange={(e) => updatePost("blogPosts", post.id, { summary: e.target.value })} />
                    </label>
                    <div className="admin-rich-toolbar">
                      <button type="button" className="button secondary" onClick={() => applyFormat(post.id, "bold")}>Bold</button>
                      <button type="button" className="button secondary" onClick={() => applyFormat(post.id, "italic")}>Italic</button>
                      <button type="button" className="button secondary" onClick={() => applyFormat(post.id, "line")}>Bullet</button>
                      <button type="button" className="button secondary" onClick={() => confirmDeletePost("blogPosts", post.id)}>
                        Delete Article
                      </button>
                    </div>
                    <label className="admin-field">
                      Content
                      <textarea
                        rows={6}
                        ref={(node) => {
                          textareaRefs.current[post.id] = node;
                        }}
                        value={post.content}
                        onChange={(e) => updatePost("blogPosts", post.id, { content: e.target.value })}
                      />
                    </label>
                  </>
                ) : null}
              </article>
            ))}
          </div>

          <div className="admin-actions">
            <button type="button" className="button" disabled={saving} onClick={() => saveConfig(config)}>
              {saving ? "Saving..." : "Save Settings"}
            </button>
            <button
              type="button"
              className="button secondary"
              onClick={() => {
                setConfig(defaultSiteConfig);
                setEventsRawInput(
                  defaultSiteConfig.events
                    .map((event) => `${event.date} | ${event.title} | ${event.description ?? ""}`)
                    .join("\n")
                );
                setStatus("Loaded defaults in form. Click Save Settings to apply.");
              }}
            >
              Reset Form to Defaults
            </button>
            <button type="button" className="button secondary" disabled={saving} onClick={resetToBaseline}>
              Rollback to Baseline
            </button>
            <span className="admin-status">{status}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
