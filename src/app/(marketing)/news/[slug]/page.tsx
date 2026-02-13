import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/shared";
import { BlogCard } from "@/components/blog";
import { Button, Badge, Card } from "@/components/ui";
import { MOCK_BLOG_POSTS, BLOG_CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import { formatDate, getReadingTime } from "@/lib/utils";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all posts
export async function generateStaticParams() {
  return MOCK_BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const getCategoryLabel = (categoryValue: string) => {
    const category = BLOG_CATEGORIES.find((c) => c.value === categoryValue);
    return category?.label || categoryValue;
  };

  // Get related posts (same category, excluding current)
  const relatedPosts = MOCK_BLOG_POSTS.filter(
    (p) => p.category === post.category && p.id !== post.id
  ).slice(0, 2);

  // Mock full article content
  const articleContent = `
    <p>The global ferro alloys market continues to evolve as industries adapt to changing economic conditions and sustainability requirements. This article explores the key trends shaping the market in 2024 and provides insights for businesses looking to navigate these changes effectively.</p>

    <h2>Market Overview</h2>
    <p>The demand for ferro alloys remains strong, driven primarily by the steel industry's recovery and the growing emphasis on high-performance materials. Key factors influencing the market include:</p>
    <ul>
      <li>Increased infrastructure spending in emerging economies</li>
      <li>Growing demand for stainless steel in construction and automotive sectors</li>
      <li>Rising adoption of electric vehicles, driving demand for specialty alloys</li>
      <li>Supply chain diversification efforts by major manufacturers</li>
    </ul>

    <h2>Regional Dynamics</h2>
    <p>Asia-Pacific continues to dominate the ferro alloys market, with China and India being the largest consumers. However, we're seeing increased activity in the Middle East and Africa as these regions develop their steel manufacturing capabilities.</p>

    <h2>Looking Ahead</h2>
    <p>As we move through 2024, we expect to see continued growth in the ferro alloys sector, with particular emphasis on:</p>
    <ul>
      <li>Sustainable production methods</li>
      <li>Quality improvement initiatives</li>
      <li>Strategic partnerships between suppliers and manufacturers</li>
      <li>Technology adoption for improved efficiency</li>
    </ul>

    <p>At ASZ Company, we remain committed to providing our clients with the highest quality ferro alloys and minor metals, backed by our extensive industry expertise and global network.</p>
  `;

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
              {getCategoryLabel(post.category)}
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
                {formatDate(post.publishedAt)}
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
      <section className="py-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
                  <span className="text-3xl font-bold text-[var(--color-accent)]">
                    {post.title.charAt(0)}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Featured Image Placeholder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to News */}
      <section className="py-8 border-t border-[var(--color-border)]">
        <div className="container-custom">
          <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            <Link href="/news">Back to All News</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
