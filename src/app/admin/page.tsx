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
} from "lucide-react";
import { AdminHeader, StatsCard } from "@/components/admin";
import { Button, Card, Badge } from "@/components/ui";
import { MOCK_PRODUCTS, MOCK_BLOG_POSTS } from "@/lib/constants";
import { formatDateShort } from "@/lib/utils";

// Mock enquiries data
const recentEnquiries = [
  {
    id: "1",
    name: "John Smith",
    email: "john@company.com",
    product: "Ferro Silicon",
    status: "new",
    date: "2024-01-20",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@manufacturing.com",
    product: "Ferro Chrome",
    status: "read",
    date: "2024-01-19",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@steel.com",
    product: "Silicon Metal",
    status: "replied",
    date: "2024-01-18",
  },
  {
    id: "4",
    name: "Anna Williams",
    email: "anna@factory.com",
    product: null,
    status: "new",
    date: "2024-01-17",
  },
];

export default function AdminDashboard() {
  return (
    <>
      <AdminHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your website."
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Products"
            value={MOCK_PRODUCTS.length}
            change="All active"
            changeType="neutral"
            icon={Package}
          />
          <StatsCard
            title="Blog Posts"
            value={MOCK_BLOG_POSTS.length}
            change="2 published"
            changeType="neutral"
            icon={FileText}
          />
          <StatsCard
            title="New Enquiries"
            value={2}
            change="+3 this week"
            changeType="increase"
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
                {recentEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="p-4 hover:bg-[var(--color-bg-tertiary)] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-[var(--color-text-primary)]">
                            {enquiry.name}
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
                        {enquiry.product && (
                          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                            Product: {enquiry.product}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDateShort(enquiry.date)}
                      </div>
                    </div>
                  </div>
                ))}
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
                <Link href="/admin/products" className="block">
                  <Button variant="secondary" fullWidth className="justify-start">
                    <Package className="h-4 w-4 mr-2" />
                    Add New Product
                  </Button>
                </Link>
                <Link href="/admin/blog" className="block">
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
                Analytics will be available when connected to a real backend.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
