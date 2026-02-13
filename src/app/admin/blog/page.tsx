"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, Calendar, Star } from "lucide-react";
import { AdminHeader } from "@/components/admin";
import { Button, Badge, Card } from "@/components/ui";
import { MOCK_BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/constants";
import { formatDateShort } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function AdminBlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredPosts = MOCK_BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // For mock data, all posts are "published"
    const matchesStatus = selectedStatus === "all" || selectedStatus === "published";
    return matchesSearch && matchesStatus;
  });

  const getCategoryLabel = (value: string) => {
    const cat = BLOG_CATEGORIES.find((c) => c.value === value);
    return cat?.label || value;
  };

  return (
    <>
      <AdminHeader
        title="Blog Posts"
        subtitle={`Manage your news and articles (${MOCK_BLOG_POSTS.length} posts)`}
      />

      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
              />
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <Link href="/admin/blog/new">
            <Button leftIcon={<Plus className="h-4 w-4" />}>New Post</Button>
          </Link>
        </div>

        {/* Posts Table */}
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left p-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Title
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Category
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Date
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Featured
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post, index) => (
                  <tr
                    key={post.id}
                    className={cn(
                      "border-b border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)] transition-colors",
                      index === filteredPosts.length - 1 && "border-b-0"
                    )}
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)]">
                          {post.title}
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)] truncate max-w-[300px]">
                          {post.excerpt}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="default">
                        {getCategoryLabel(post.category)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant="success">Published</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
                        <Calendar className="h-4 w-4" />
                        {formatDateShort(post.publishedAt)}
                      </div>
                    </td>
                    <td className="p-4">
                      {index === 0 ? (
                        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                      ) : (
                        <Star className="h-5 w-5 text-[var(--color-text-muted)]" />
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/news/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/blog/${post.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => {
                            if (confirm(`Delete "${post.title}"? This action cannot be undone.`)) {
                              alert("Delete functionality will be available once the database is connected.");
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPosts.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-[var(--color-text-muted)]">No posts found</p>
            </div>
          )}
        </Card>

        {/* Pagination placeholder */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--color-text-muted)]">
            Showing {filteredPosts.length} of {MOCK_BLOG_POSTS.length} posts
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" disabled>
              Previous
            </Button>
            <Button variant="secondary" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
