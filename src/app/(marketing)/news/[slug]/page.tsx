import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Twitter,
  Linkedin,
  Facebook,
  ArrowRight,
} from "lucide-react";
import { BlogCard } from "@/components/blog";
import { SafeImage } from "@/components/blog/SafeImage";
import { Button, Badge, Card } from "@/components/ui";
import { BLOG_CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import { serverGetBlogPosts } from "@/lib/data";
import type { DBBlogPost } from "@/lib/data";
import { formatDate, getReadingTime } from "@/lib/utils";

function getCategoryLabel(categoryValue: string) {
  const category = BLOG_CATEGORIES.find((c) => c.value === categoryValue);
  return category?.label || categoryValue;
}

function adaptPost(p: DBBlogPost) {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || "",
    category: p.category || "",
    featuredImage: p.featured_image || "",
    publishedAt: p.published_at || p.created_at,
    author: p.author,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Single cached call — post + related posts from one list
  const allPosts = await serverGetBlogPosts();
  const post = allPosts.find((p) => p.slug === slug) ?? null;

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts
    .filter((rp) => rp.category === post.category && rp.id !== post.id)
    .slice(0, 2);

  const articleContent =
    post.content ||
    `<p>${post.excerpt}</p><p>Full article content coming soon.</p>`;

  const shareUrl = `${SITE_CONFIG.url}/news/${post.slug}`;

  return (
    <>
      {/* Article Header */}
      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-[var(--color-bg-secondary)]">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
                >
                  Home
                </Link>
              </li>
              <li className="text-[var(--color-text-muted)]">/</li>
              <li>
                <Link
                  href="/news"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
                >
                  News
                </Link>
              </li>
              <li className="text-[var(--color-text-muted)]">/</li>
              <li className="text-[var(--color-text-primary)] font-medium truncate max-w-[200px]">
                {post.title}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-4">
              {getCategoryLabel(post.category || "")}
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-secondary)]">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.published_at || post.created_at)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getReadingTime(articleContent)} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image ? (
        <section className="py-8">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <SafeImage
                src={post.featured_image}
                alt={post.title}
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* Article Content */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-3">
              <div
                className="prose-custom max-w-none"
                dangerouslySetInnerHTML={{ __html: articleContent }}
              />

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">
                    Share this article:
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Author Card */}
                <Card>
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
                    About the Author
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center">
                      <span className="text-lg font-bold text-[var(--color-text-muted)]">
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">
                        {post.author}
                      </p>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        ASZ Company Team
                      </p>
                    </div>
                  </div>
                </Card>

                {/* CTA Card */}
                <Card className="bg-[var(--color-accent-light)] border-[var(--color-accent)]">
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                    Need Our Products?
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    Get in touch with our team for quotes and enquiries.
                  </p>
                  <Button size="sm" fullWidth>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section bg-[var(--color-bg-secondary)]">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Related Articles
              </h2>
              <Button
                variant="outline"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                <Link href="/news">View All</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.id}
                  post={adaptPost(relatedPost)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to News */}
      <section className="py-8 border-t border-[var(--color-border)]">
        <div className="container-custom">
          <Button
            variant="ghost"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            <Link href="/news">Back to All News</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
