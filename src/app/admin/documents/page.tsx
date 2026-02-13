"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  FileText,
  Download,
  Edit,
  Trash2,
  Upload,
} from "lucide-react";
import { AdminHeader } from "@/components/admin";
import { Button, Badge, Card } from "@/components/ui";
import { DOCUMENT_TYPE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Mock documents data
const mockDocuments = [
  {
    id: "1",
    title: "Company Registration Certificate",
    description: "Official company registration and trade license documentation.",
    type: "compliance",
    fileSize: "245 KB",
    downloads: 24,
    isActive: true,
  },
  {
    id: "2",
    title: "Quality Management Certificate",
    description: "ISO 9001:2015 Quality Management System certification.",
    type: "certification",
    fileSize: "180 KB",
    downloads: 56,
    isActive: true,
  },
  {
    id: "3",
    title: "Company Profile & Brochure",
    description: "Comprehensive overview of ASZ Company, services, and capabilities.",
    type: "brochure",
    fileSize: "1.2 MB",
    downloads: 128,
    isActive: true,
  },
  {
    id: "4",
    title: "Ferro Silicon MSDS",
    description: "Material Safety Data Sheet for Ferro Silicon products.",
    type: "msds",
    fileSize: "320 KB",
    downloads: 89,
    isActive: true,
  },
  {
    id: "5",
    title: "Ferro Chrome MSDS",
    description: "Material Safety Data Sheet for Ferro Chrome products.",
    type: "msds",
    fileSize: "315 KB",
    downloads: 67,
    isActive: true,
  },
  {
    id: "6",
    title: "Silicon Metal Specifications",
    description: "Technical specifications for Silicon Metal grades.",
    type: "specification",
    fileSize: "156 KB",
    downloads: 43,
    isActive: true,
  },
  {
    id: "7",
    title: "Supplier Code of Conduct",
    description: "Our standards and expectations for supplier partnerships.",
    type: "compliance",
    fileSize: "98 KB",
    downloads: 31,
    isActive: true,
  },
  {
    id: "8",
    title: "Environmental Policy",
    description: "Our commitment to environmental responsibility and sustainability.",
    type: "compliance",
    fileSize: "125 KB",
    downloads: 22,
    isActive: true,
  },
];

export default function AdminDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  const totalDownloads = mockDocuments.reduce((sum, doc) => sum + doc.downloads, 0);

  return (
    <>
      <AdminHeader
        title="Documents"
        subtitle={`Manage compliance documents and downloads (${totalDownloads} total downloads)`}
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
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
            >
              <option value="all">All Types</option>
              <option value="compliance">Compliance Forms</option>
              <option value="certification">Certifications</option>
              <option value="msds">MSDS</option>
              <option value="brochure">Brochures</option>
              <option value="specification">Specifications</option>
            </select>
          </div>

          <Button
            leftIcon={<Upload className="h-4 w-4" />}
            onClick={() => {
              const uploadZone = document.getElementById("upload-zone");
              if (uploadZone) uploadZone.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Upload Document
          </Button>
        </div>

        {/* Documents Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-[var(--color-accent)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-[var(--color-text-primary)]">
                    {doc.title}
                  </h3>
                  <Badge variant="default" size="sm">
                    {DOCUMENT_TYPE_LABELS[doc.type as keyof typeof DOCUMENT_TYPE_LABELS]}
                  </Badge>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                  {doc.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                    <span>{doc.fileSize}</span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3.5 w-3.5" />
                      {doc.downloads} downloads
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => alert("Edit functionality will be available once the database is connected.")}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => {
                        if (confirm(`Delete "${doc.title}"? This action cannot be undone.`)) {
                          alert("Delete functionality will be available once the database is connected.");
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-[var(--color-text-muted)]" />
            <p className="text-[var(--color-text-muted)]">No documents found</p>
          </Card>
        )}

        {/* Upload Zone */}
        <Card id="upload-zone" className="border-dashed border-2">
          <div className="text-center py-8">
            <Upload className="h-10 w-10 mx-auto mb-4 text-[var(--color-text-muted)]" />
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">
              Upload New Document
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Drag and drop a file here, or click to browse
            </p>
            <input
              type="file"
              id="doc-upload"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  alert(`File "${file.name}" selected. Upload functionality will be available once the database is connected.`);
                  e.target.value = "";
                }
              }}
            />
            <Button
              variant="secondary"
              onClick={() => document.getElementById("doc-upload")?.click()}
            >
              Choose File
            </Button>
            <p className="text-xs text-[var(--color-text-muted)] mt-2">
              Supported: PDF, DOC, DOCX (Max 10MB)
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
