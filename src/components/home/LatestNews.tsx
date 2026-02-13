import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { MOCK_BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/constants";
import { formatDateShort, getReadingTime } from "@/lib/utils";

export function LatestNews() {
  const latestPosts = MOCK_BLOG_POSTS.slice(0, 3);

  const getCategoryLabel = (categoryValue: string) => {
    const category = BLOG_CATEGORIES.find((c) => c.value === categoryValue);
    return category?.label || categoryValue;
  };

  return (
    <section className="section bg-[var(--color-bg-secondary)]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              Latest News & Insights
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl">
              Stay updated with market trends, industry news, and company updates.
            </p>
          </div>
          <Button
            variant="outline"
            rightIcon={<ArrowRight className="h-5 w-5" />}
          >
            <Link href="/news">View All Articles</Link>
          </Button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post, index) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="group"
            >
              <article className="h-full flex flex-col bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Featured Image Placeholder */}
                <div className="relative aspect-video bg-[var(--color-bg-tertiary)]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
                        <span className="text-lg font-bold text-[var(--color-accent)]">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        Featured Image
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <Badge variant="default" className="mb-3">
                    {getCategoryLabel(post.category)}
                  </Badge>

                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDateShort(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {getReadingTime(post.excerpt)} min read
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
