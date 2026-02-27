import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/blog";
import { Button } from "@/components/ui";
import type { DBBlogPost } from "@/lib/data";

function adaptPost(post: DBBlogPost) {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    category: post.category || "",
    featuredImage: post.featured_image || "",
    publishedAt: post.published_at || post.created_at,
    author: post.author,
  };
}

export function LatestNews({ posts }: { posts: DBBlogPost[] }) {
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
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={adaptPost(post)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-muted)]">
              No articles published yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
