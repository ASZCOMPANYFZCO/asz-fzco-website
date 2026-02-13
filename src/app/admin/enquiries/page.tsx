"use client";

import { useState } from "react";
import { Search, Eye, Mail, MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { AdminHeader } from "@/components/admin";
import { Button, Badge, Card } from "@/components/ui";
import { formatDateShort } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Mock enquiries data
const mockEnquiries = [
  {
    id: "1",
    name: "John Smith",
    email: "john@company.com",
    phone: "+1 234 567 8900",
    company: "Steel Manufacturing Inc.",
    product: "Ferro Silicon",
    message: "We are interested in purchasing 500MT of Ferro Silicon. Please provide your best quote.",
    status: "new",
    type: "product",
    date: "2024-01-20",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@manufacturing.com",
    phone: "+44 20 7123 4567",
    company: "UK Metals Ltd.",
    product: "Ferro Chrome",
    message: "Looking for a reliable supplier of Ferro Chrome for our foundry operations.",
    status: "read",
    type: "product",
    date: "2024-01-19",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@steel.com",
    phone: "+86 21 1234 5678",
    company: "China Steel Corp.",
    product: "Silicon Metal",
    message: "Need regular supply of Silicon Metal. Let's discuss partnership terms.",
    status: "replied",
    type: "partnership",
    date: "2024-01-18",
  },
  {
    id: "4",
    name: "Anna Williams",
    email: "anna@factory.com",
    phone: "+49 30 1234567",
    company: "German Foundries GmbH",
    product: null,
    message: "General inquiry about your product range and minimum order quantities.",
    status: "new",
    type: "general",
    date: "2024-01-17",
  },
  {
    id: "5",
    name: "Robert Lee",
    email: "robert@alloys.com",
    phone: "+1 555 987 6543",
    company: "Alloys International",
    product: "Ferro Manganese",
    message: "Interested in Ferro Manganese specifications and pricing for Q2 2024.",
    status: "closed",
    type: "product",
    date: "2024-01-15",
  },
];

export default function AdminEnquiriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<string | null>(null);

  const filteredEnquiries = mockEnquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.company?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || enquiry.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const selectedEnquiryData = mockEnquiries.find((e) => e.id === selectedEnquiry);

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
        subtitle={`Manage customer enquiries (${mockEnquiries.length} total, ${mockEnquiries.filter((e) => e.status === "new").length} new)`}
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
                            {enquiry.name}
                          </p>
                          {getStatusBadge(enquiry.status)}
                        </div>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {enquiry.company}
                        </p>
                        {enquiry.product && (
                          <p className="text-sm text-[var(--color-accent)] mt-1">
                            {enquiry.product}
                          </p>
                        )}
                        <p className="text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-1">
                          {enquiry.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] whitespace-nowrap">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDateShort(enquiry.date)}
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
                        {selectedEnquiryData.name}
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

                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1">
                        Phone
                      </p>
                      <p className="text-[var(--color-text-primary)]">
                        {selectedEnquiryData.phone}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1">
                        Company
                      </p>
                      <p className="text-[var(--color-text-primary)]">
                        {selectedEnquiryData.company}
                      </p>
                    </div>

                    {selectedEnquiryData.product && (
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">
                          Product Interest
                        </p>
                        <Badge variant="primary">
                          {selectedEnquiryData.product}
                        </Badge>
                      </div>
                    )}

                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1">
                        Message
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)] p-3 rounded-lg">
                        {selectedEnquiryData.message}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1">
                        Received
                      </p>
                      <p className="text-[var(--color-text-primary)]">
                        {formatDateShort(selectedEnquiryData.date)}
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
                      <Button variant="secondary" size="sm">
                        Mark as Read
                      </Button>
                      <Button variant="secondary" size="sm">
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
