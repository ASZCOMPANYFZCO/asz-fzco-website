
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui";
import { formatDateShort, getReadingTime } from "@/lib/utils";
import { BLOG_CATEGORIES } from "@/lib/constants";

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    featuredImage?: string;
    publishedAt: string;
    author: string;
  };
  featured?: boolean;
}

function Placeholder({ letter, size = "md" }: { letter: string; size?: "md" | "lg" }) {
  const iconSize = size === "lg" ? "w-16 h-16" : "w-12 h-12";
  const textSize = size === "lg" ? "text-2xl" : "text-lg";
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className={`${iconSize} mx-auto mb-2 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center`}>
          <span className={`${textSize} font-bold text-[var(--color-accent)]`}>
            {letter}
          </span>
        </div>
      </div>
    </div>
  );
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const [imgError, setImgError] = useState(false);
  const hasImage = Boolean(post.featuredImage) && !imgError;
  const getCategoryLabel = (categoryValue: string) => {
    const category = BLOG_CATEGORIES.find((c) => c.value === categoryValue);
    return category?.label || categoryValue;
  };

  if (featured) {
    return (
      <Link href={`/news/${post.slug}`} className="group">
        <article className="grid md:grid-cols-2 gap-6 bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 overflow-hidden">
          {/* Image */}
          <div className="relative aspect-video md:aspect-auto bg-[var(--color-bg-tertiary)]">
            {hasImage ? (
              <Image
                src={post.featuredImage!}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={() => setImgError(true)}
              />
            ) : (
              <Placeholder letter={post.title.charAt(0)} size="lg" />
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:py-8 flex flex-col justify-center">
            <Badge variant="primary" className="w-fit mb-4">
              {getCategoryLabel(post.category)}
            </Badge>

            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent)] transition-colors">
              {post.title}
            </h2>

            <p className="text-[var(--color-text-secondary)] mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDateShort(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {getReadingTime(post.excerpt)} min read
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/news/${post.slug}`} className="group">
      <article className="h-full flex flex-col bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Image */}
        <div className="relative aspect-video bg-[var(--color-bg-tertiary)]">
          {hasImage ? (
            <Image
              src={post.featuredImage!}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <Placeholder letter={post.title.charAt(0)} />
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-[var(--color-accent)]/0 group-hover:bg-[var(--color-accent)]/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="w-10 h-10 rounded-full bg-[var(--color-bg-primary)] flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5 text-[var(--color-accent)]" />
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

          <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] mt-auto">
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
  );
}
