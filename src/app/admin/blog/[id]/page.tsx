"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  CheckCircle,
  Upload,
  ImageIcon,
  X,
  Eye,
} from "lucide-react";
import { AdminHeader } from "@/components/admin";
import { Button, Card } from "@/components/ui";
import { MOCK_BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/constants";

export default function AdminBlogEditPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  const isNew = postId === "new";

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Post state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<string>("market-insights");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<string>("draft");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [author, setAuthor] = useState("ASZ Company FZCO");
  const [publishedAt, setPublishedAt] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isFeatured, setIsFeatured] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Load existing post data
  useEffect(() => {
    if (!isNew) {
      const post = MOCK_BLOG_POSTS.find((p) => p.id === postId);
      if (post) {
        setTitle(post.title);
        setSlug(post.slug);
        setCategory(post.category);
        setExcerpt(post.excerpt);
        setContent(
          `<p>${post.excerpt}</p>\n\n<p>This is the full content of the blog post. Edit this content to update the article.</p>`
        );
        setStatus("published");
        setPublishedAt(post.publishedAt);
        setAuthor(post.author);
        if (post.featuredImage) {
          setFeaturedImage(post.featuredImage);
        }
      }
    }
  }, [postId, isNew]);

  // Auto-generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (isNew || !slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter a post title.");
      return;
    }
    if (!excerpt.trim()) {
      alert("Please enter an excerpt.");
      return;
    }

    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFeaturedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <>
      <AdminHeader
        title={isNew ? "New Blog Post" : "Edit Blog Post"}
        subtitle={isNew ? "Create a new article" : `Editing: ${title}`}
      />

      <div className="p-4 sm:p-6">
        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog Posts
          </Link>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!isNew && slug && (
              <Link href={`/news/${slug}`} target="_blank">
                <Button variant="secondary" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
              </Link>
            )}
            <Button
              onClick={handleSave}
              loading={isSaving}
              leftIcon={
                saveSuccess ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Save className="h-4 w-4" />
                )
              }
              className="flex-1 sm:flex-none"
            >
              {saveSuccess
                ? "Saved!"
                : isSaving
                ? "Saving..."
                : isNew
                ? "Create Post"
                : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                Post Content
              </h2>
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="label">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="input"
                    placeholder="Enter post title..."
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="label">URL Slug</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--color-text-muted)]">
                      /news/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="input flex-1"
                      placeholder="post-url-slug"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="label">Excerpt *</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="input min-h-[80px] resize-y"
                    placeholder="Brief summary of the post..."
                    rows={3}
                  />
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Shown in post previews and search results.
                  </p>
                </div>

                {/* Content */}
                <div>
                  <label className="label">Content</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="input min-h-[300px] resize-y font-mono text-sm"
                    placeholder="Write your post content here (HTML supported)..."
                    rows={15}
                  />
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Supports HTML. A rich text editor will be added in a future
                    update.
                  </p>
                </div>
              </div>
            </Card>

            {/* SEO */}
            <Card>
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                SEO Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="label">Meta Title</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="input"
                    placeholder="Custom meta title (leave blank to use post title)"
                  />
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    {(metaTitle || title).length}/60 characters
                  </p>
                </div>

                <div>
                  <label className="label">Meta Description</label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="input min-h-[80px] resize-y"
                    placeholder="Custom meta description (leave blank to use excerpt)"
                    rows={3}
                  />
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    {(metaDescription || excerpt).length}/160 characters
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing */}
            <Card>
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                Publishing
              </h2>
              <div className="space-y-4">
                {/* Status */}
                <div>
                  <label className="label">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="input"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                {/* Publish Date */}
                <div>
                  <label className="label">Publish Date</label>
                  <input
                    type="date"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="input"
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="label">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="input"
                    placeholder="Post author"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="label">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input"
                  >
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Featured */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                  />
                  <label
                    htmlFor="featured"
                    className="text-sm text-[var(--color-text-primary)]"
                  >
                    Featured post
                  </label>
                </div>
              </div>
            </Card>

            {/* Featured Image */}
            <Card>
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                Featured Image
              </h2>

              {featuredImage ? (
                <div className="relative group">
                  <div className="aspect-video rounded-lg overflow-hidden bg-[var(--color-bg-tertiary)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featuredImage}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => setFeaturedImage(null)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() =>
                    document.getElementById("featured-img-upload")?.click()
                  }
                  className="aspect-video rounded-lg border-2 border-dashed border-[var(--color-border)] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-colors"
                >
                  <ImageIcon className="h-8 w-8 text-[var(--color-text-muted)]" />
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Click to upload
                  </p>
                </div>
              )}

              <input
                type="file"
                id="featured-img-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              {featuredImage && (
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  className="mt-3"
                  onClick={() =>
                    document.getElementById("featured-img-upload")?.click()
                  }
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Replace Image
                </Button>
              )}
            </Card>
          </div>
        </div>

        {/* Database Note */}
        <div className="mt-6 p-4 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-muted)]">
            <strong className="text-[var(--color-text-primary)]">Note:</strong>{" "}
            Changes are currently saved locally. Once the database is connected,
            all posts will persist to Supabase automatically.
          </p>
        </div>
      </div>
    </>
  );
}
