"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  FileText,
  MessageSquare,
  FolderOpen,
  ArrowRight,
  TrendingUp,
  Eye,
  Clock,
  Loader2,
} from "lucide-react";
import { AdminHeader, StatsCard } from "@/components/admin";
import { Button, Card, Badge } from "@/components/ui";
import { formatDateShort } from "@/lib/utils";
import { getAllProducts, getAllBlogPosts, getEnquiries } from "@/lib/data";
import type { DBEnquiry } from "@/lib/data";

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [publishedBlogCount, setPublishedBlogCount] = useState(0);
  const [newEnquiryCount, setNewEnquiryCount] = useState(0);
  const [recentEnquiries, setRecentEnquiries] = useState<DBEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      try {
        const [products, posts, enquiries] = await Promise.all([
          getAllProducts(),
          getAllBlogPosts(),
          getEnquiries(),
        ]);

        setProductCount(products.length);
        setBlogCount(posts.length);
        setPublishedBlogCount(posts.filter((p) => p.status === "published").length);
        setNewEnquiryCount(enquiries.filter((e) => e.status === "new").length);
        setRecentEnquiries(enquiries.slice(0, 4));
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  return (
    <>
      <AdminHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your website."
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--color-accent)]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Products"
              value={productCount}
              change="All active"
              changeType="neutral"
              icon={Package}
            />
            <StatsCard
              title="Blog Posts"
              value={blogCount}
              change={`${publishedBlogCount} published`}
              changeType="neutral"
              icon={FileText}
            />
            <StatsCard
              title="New Enquiries"
              value={newEnquiryCount}
              change="Awaiting response"
              changeType={newEnquiryCount > 0 ? "increase" : "neutral"}
              icon={MessageSquare}
            />
            <StatsCard
              title="Documents"
              value={8}
              change="All accessible"
              changeType="neutral"
              icon={FolderOpen}
            />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Enquiries */}
          <div className="lg:col-span-2">
            <Card padding="none">
              <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  Recent Enquiries
                </h2>
                <Link href="/admin/enquiries">
                  <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    View All
                  </Button>
                </Link>
              </div>
              <div className="divide-y divide-[var(--color-border)]">
                {loading ? (
                  <div className="p-8 text-center">
                    <Loader2 className="h-6 w-6 mx-auto animate-spin text-[var(--color-text-muted)]" />
                  </div>
                ) : recentEnquiries.length > 0 ? (
                  recentEnquiries.map((enquiry) => (
                    <div
                      key={enquiry.id}
                      className="p-4 hover:bg-[var(--color-bg-tertiary)] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-[var(--color-text-primary)]">
                              {enquiry.full_name}
                            </p>
                            <Badge
                              variant={
                                enquiry.status === "new"
                                  ? "primary"
                                  : enquiry.status === "read"
                                  ? "warning"
                                  : "success"
                              }
                              size="sm"
                            >
                              {enquiry.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-[var(--color-text-muted)] truncate">
                            {enquiry.email}
                          </p>
                          {enquiry.products && enquiry.products.length > 0 && (
                            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                              Products: {enquiry.products.join(", ")}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                          <Clock className="h-3.5 w-3.5" />
                          {formatDateShort(enquiry.created_at)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-[var(--color-text-muted)]">
                    No enquiries yet
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <Link href="/admin/products/new" className="block">
                  <Button variant="secondary" fullWidth className="justify-start">
                    <Package className="h-4 w-4 mr-2" />
                    Add New Product
                  </Button>
                </Link>
                <Link href="/admin/blog/new" className="block">
                  <Button variant="secondary" fullWidth className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Write Blog Post
                  </Button>
                </Link>
                <Link href="/admin/enquiries" className="block">
                  <Button variant="secondary" fullWidth className="justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View Enquiries
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Website Stats */}
            <Card>
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                Website Stats
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-[var(--color-text-muted)]" />
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      Page Views
                    </span>
                  </div>
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    1,234
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[var(--color-text-muted)]" />
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      Conversion Rate
                    </span>
                  </div>
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    3.2%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-[var(--color-text-muted)]" />
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      Form Submissions
                    </span>
                  </div>
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    47
                  </span>
                </div>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-4 pt-4 border-t border-[var(--color-border)]">
                Analytics will be available when connected to a provider.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
