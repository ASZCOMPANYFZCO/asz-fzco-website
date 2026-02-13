"use client";

import { useState, useEffect } from "react";
import { Search, Eye, Mail, MessageSquare, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { AdminHeader } from "@/components/admin";
import { Button, Badge, Card } from "@/components/ui";
import { formatDateShort } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { getEnquiries, updateEnquiryStatus } from "@/lib/data";
import type { DBEnquiry } from "@/lib/data";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<DBEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEnquiries() {
      setLoading(true);
      try {
        const data = await getEnquiries();
        setEnquiries(data);
      } catch (error) {
        console.error("Failed to fetch enquiries:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEnquiries();
  }, []);

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.company?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || enquiry.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const selectedEnquiryData = enquiries.find((e) => e.id === selectedEnquiry);

  const handleMarkAsRead = async (id: string) => {
    const { error } = await updateEnquiryStatus(id, "read");
    if (!error) {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: "read" } : e))
      );
    } else {
      console.error("Failed to mark enquiry as read:", error);
    }
  };

  const handleClose = async (id: string) => {
    const { error } = await updateEnquiryStatus(id, "closed");
    if (!error) {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: "closed" } : e))
      );
    } else {
      console.error("Failed to close enquiry:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="primary">New</Badge>;
      case "read":
        return <Badge variant="warning">Read</Badge>;
      case "replied":
        return <Badge variant="success">Replied</Badge>;
      case "closed":
        return <Badge variant="default">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <>
      <AdminHeader
        title="Enquiries"
        subtitle={`Manage customer enquiries (${enquiries.length} total, ${enquiries.filter((e) => e.status === "new").length} new)`}
      />

      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Enquiries List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  placeholder="Search enquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Enquiries List */}
            <Card padding="none">
              {loading ? (
                <div className="p-12 text-center">
                  <Loader2 className="h-8 w-8 mx-auto mb-4 text-[var(--color-text-muted)] animate-spin" />
                  <p className="text-[var(--color-text-muted)]">
                    Loading enquiries...
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--color-border)]">
                  {filteredEnquiries.map((enquiry) => (
                    <button
                      key={enquiry.id}
                      onClick={() => setSelectedEnquiry(enquiry.id)}
                      className={cn(
                        "w-full p-4 text-left hover:bg-[var(--color-bg-tertiary)] transition-colors",
                        selectedEnquiry === enquiry.id &&
                          "bg-[var(--color-accent-light)]"
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-[var(--color-text-primary)]">
                              {enquiry.full_name}
                            </p>
                            {getStatusBadge(enquiry.status)}
                          </div>
                          <p className="text-sm text-[var(--color-text-muted)]">
                            {enquiry.company}
                          </p>
                          {enquiry.products && enquiry.products.length > 0 && (
                            <p className="text-sm text-[var(--color-accent)] mt-1">
                              {enquiry.products.join(", ")}
                            </p>
                          )}
                          <p className="text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-1">
                            {enquiry.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] whitespace-nowrap">
                          <Clock className="h-3.5 w-3.5" />
                          {formatDateShort(enquiry.created_at)}
                        </div>
                      </div>
                    </button>
                  ))}

                  {filteredEnquiries.length === 0 && (
                    <div className="p-12 text-center">
                      <p className="text-[var(--color-text-muted)]">
                        No enquiries found
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Enquiry Detail */}
          <div className="lg:col-span-1">
            {selectedEnquiryData ? (
              <Card className="sticky top-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      Enquiry Details
                    </h3>
                    {getStatusBadge(selectedEnquiryData.status)}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1">
                        Name
                      </p>
                      <p className="font-medium text-[var(--color-text-primary)]">
                        {selectedEnquiryData.full_name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1">
                        Email
                      </p>
                      <a
                        href={`mailto:${selectedEnquiryData.email}`}
                        className="text-[var(--color-accent)] hover:underline"
                      >
                        {selectedEnquiryData.email}
                      </a>
                    </div>

                    {selectedEnquiryData.phone && (
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">
                          Phone
                        </p>
                        <p className="text-[var(--color-text-primary)]">
                          {selectedEnquiryData.phone}
                        </p>
                      </div>
                    )}

                    {selectedEnquiryData.company && (
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">
                          Company
                        </p>
                        <p className="text-[var(--color-text-primary)]">
                          {selectedEnquiryData.company}
                        </p>
                      </div>
                    )}

                    {selectedEnquiryData.country && (
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">
                          Country
                        </p>
                        <p className="text-[var(--color-text-primary)]">
                          {selectedEnquiryData.country}
                        </p>
                      </div>
                    )}

                    {selectedEnquiryData.products && selectedEnquiryData.products.length > 0 && (
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">
                          Products
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {selectedEnquiryData.products.map((product) => (
                            <Badge key={product} variant="primary">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedEnquiryData.quantity && (
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">
                          Quantity
                        </p>
                        <p className="text-[var(--color-text-primary)]">
                          {selectedEnquiryData.quantity}
                        </p>
                      </div>
                    )}

                    {selectedEnquiryData.message && (
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">
                          Message
                        </p>
                        <p className="text-sm text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)] p-3 rounded-lg">
                          {selectedEnquiryData.message}
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1">
                        Received
                      </p>
                      <p className="text-[var(--color-text-primary)]">
                        {formatDateShort(selectedEnquiryData.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-border)] space-y-2">
                    <Button
                      fullWidth
                      leftIcon={<Mail className="h-4 w-4" />}
                      onClick={() =>
                        window.open(`mailto:${selectedEnquiryData.email}`)
                      }
                    >
                      Reply via Email
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleMarkAsRead(selectedEnquiryData.id)}
                      >
                        Mark as Read
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleClose(selectedEnquiryData.id)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="text-center py-12">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-[var(--color-text-muted)]" />
                <p className="text-[var(--color-text-muted)]">
                  Select an enquiry to view details
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
