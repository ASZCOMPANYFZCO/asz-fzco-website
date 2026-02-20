import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Award,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Scale,
  Handshake,
  HardHat,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Compliance & Values",
  description:
    "ASZ Company FZCO's compliance policies and values. Our commitment to ethical trading, anti-corruption, and responsible business practices.",
};

const compliancePages = [
  {
    title: "Code of Conduct",
    description:
      "Our Code of Conduct sets out the ethical standards and business principles that guide every interaction, ensuring integrity, fairness, and accountability across all operations.",
    href: "/compliance/code-of-conduct",
    icon: BookOpen,
  },
  {
    title: "Anti-Corruption Program",
    description:
      "Our comprehensive anti-corruption framework outlines the policies, procedures, and controls we maintain to prevent corrupt practices throughout our business activities.",
    href: "/compliance/anti-corruption",
    icon: Scale,
  },
  {
    title: "Anti-Bribery Program",
    description:
      "ASZ Company maintains a zero-tolerance approach to bribery, ensuring full compliance with international anti-bribery laws including the UK Bribery Act and US FCPA.",
    href: "/compliance/anti-bribery",
    icon: Handshake,
  },
  {
    title: "COSHH Compliance",
    description:
      "Our Control of Substances Hazardous to Health compliance plan ensures the safe handling, storage, and management of metals and alloys across the supply chain.",
    href: "/compliance/coshh",
    icon: HardHat,
  },
  {
    title: "Modern Slavery & Human Trafficking Policy",
    description:
      "Our commitment to preventing modern slavery and human trafficking across our operations and supply chain, ensuring ethical sourcing and responsible trade practices.",
    href: "/compliance/modern-slavery",
    icon: Users,
  },
];

const certifications = [
  {
    name: "MMTA Member",
    description: "Minor Metals Trade Association",
    icon: Award,
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
        title="Compliance & Values"
        subtitle="Our values are reflected in our policies and practices. We are committed to maintaining the highest standards of business ethics, transparency, and regulatory compliance."
        breadcrumbs={[{ label: "Compliance" }]}
      />

      {/* Certifications Section */}
      <section className="section bg-[var(--color-bg-secondary)]">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
            Our Certifications & Memberships
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
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

      {/* Compliance Policies */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Our Policies & Standards
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Each of our policies reflects our dedication to responsible and
              ethical business practices across every aspect of our operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {compliancePages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group block p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-accent)] transition-colors">
                      <Icon className="h-6 w-6 text-[var(--color-accent)] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                        {page.title}
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                        {page.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)]">
                        Read more
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
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
              At ASZ Company, we are committed to maintaining the highest
              standards of business ethics and regulatory compliance. We work
              closely with banks, financial institutions, and large
              corporations, ensuring all our operations meet international
              standards and local regulations.
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
              Need Additional Information?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              If you require specific compliance information, certificates, or
              have questions about our policies, our team is here to help.
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
