import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Download,
  Shield,
  Award,
  CheckCircle,
} from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Button, Card, Badge } from "@/components/ui";
// Document type labels kept inline since all are compliance docs

export const metadata: Metadata = {
  title: "Compliance & Documentation",
  description:
    "Access ASZ Company's compliance forms, certifications, and documentation. Download MSDS, quality certificates, and company brochures.",
};

const documents = [
  {
    id: "1",
    title: "Code of Conduct",
    description:
      "ASZ Company's code of conduct outlining our ethical standards, business principles, and expectations for employees and partners.",
    type: "compliance",
    fileSize: "377 KB",
    fileType: "PDF",
    href: "/documents/code-of-conduct.pdf",
  },
  {
    id: "2",
    title: "Anti-Corruption Program",
    description:
      "Our comprehensive anti-corruption program detailing policies, procedures, and controls to prevent corrupt practices.",
    type: "compliance",
    fileSize: "126 KB",
    fileType: "PDF",
    href: "/documents/anti-corruption-program.pdf",
  },
  {
    id: "3",
    title: "Anti-Bribery Program",
    description:
      "ASZ Company's anti-bribery program ensuring compliance with international anti-bribery laws and regulations.",
    type: "compliance",
    fileSize: "118 KB",
    fileType: "PDF",
    href: "/documents/anti-bribery-program.pdf",
  },
  {
    id: "4",
    title: "COSHH Compliance Plan",
    description:
      "Control of Substances Hazardous to Health compliance plan for safe handling and management of metals and alloys.",
    type: "compliance",
    fileSize: "104 KB",
    fileType: "PDF",
    href: "/documents/coshh-compliance-plan.pdf",
  },
  {
    id: "5",
    title: "Modern Slavery & Human Trafficking Policy",
    description:
      "Our policy and commitment to preventing modern slavery and human trafficking across our supply chain and operations.",
    type: "compliance",
    fileSize: "337 KB",
    fileType: "PDF",
    href: "/documents/modern-slavery-policy.pdf",
  },
];

const certifications = [
  {
    name: "MMTA Member",
    description: "Minor Metals Trade Association",
    icon: Award,
  },
  {
    name: "DMCC Licensed",
    description: "Dubai Multi Commodities Centre",
    icon: Shield,
  },
  {
    name: "FZCO Registered",
    description: "Free Zone Company in UAE",
    icon: CheckCircle,
  },
];

export default function CompliancePage() {
  return (
    <>
      <PageHeader
        title="Compliance & Documentation"
        subtitle="Access our compliance forms, certifications, and product documentation. We maintain the highest standards of transparency and regulatory compliance."
        breadcrumbs={[{ label: "Compliance" }]}
      />

      {/* Certifications Section */}
      <section className="section bg-[var(--color-bg-secondary)]">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
            Our Certifications & Memberships
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.name}
                  className="text-center p-6 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)]"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
                    <Icon className="h-8 w-8 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {cert.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="section">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8">
            Downloadable Documents
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} hover className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-[var(--color-accent)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-[var(--color-text-primary)]">
                      {doc.title}
                    </h3>
                    <Badge variant="default" size="sm">
                      Compliance
                    </Badge>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                    {doc.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {doc.fileType} • {doc.fileSize}
                    </span>
                    <a
                      href={doc.href}
                      download
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Note */}
          <div className="mt-8 p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)]">
              <strong className="text-[var(--color-text-primary)]">Note:</strong>{" "}
              All documents are provided in PDF format. If you require additional
              documentation or have specific compliance requirements, please{" "}
              <Link
                href="/contact"
                className="text-[var(--color-accent)] hover:underline"
              >
                contact our team
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Commitment */}
      <section className="section bg-[var(--color-bg-secondary)]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
              Our Commitment to Compliance
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              At ASZ Company, we are committed to maintaining the highest standards
              of business ethics and regulatory compliance. We work closely with
              banks, financial institutions, and large corporations, ensuring all
              our operations meet international standards and local regulations.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              <div className="p-4 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  Regulatory Compliance
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Full compliance with UAE trade regulations and international
                  standards.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  Quality Assurance
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Rigorous quality control processes for all products we trade.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  Transparency
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Clear documentation and open communication with all partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
              Need Additional Documentation?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              If you require specific compliance documents, certificates, or
              custom documentation for your business needs, our team is here to
              help.
            </p>
            <Button size="lg">
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
