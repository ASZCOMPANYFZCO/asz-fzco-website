import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Scale, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Anti-Corruption Program",
  description:
    "ASZ Company FZCO's comprehensive anti-corruption program detailing policies, procedures, and controls to prevent corrupt practices.",
};

export default function AntiCorruptionPage() {
  return (
    <>
      <PageHeader
        title="Anti-Corruption Program"
        subtitle="Our comprehensive framework for preventing corruption across all business activities."
        breadcrumbs={[
          { label: "Compliance", href: "/compliance" },
          { label: "Anti-Corruption Program" },
        ]}
      />

      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Icon Header */}
            <div className="flex items-center gap-4 mb-8 p-6 rounded-xl bg-[var(--color-accent-light)] border border-[var(--color-accent)]/20">
              <div className="w-14 h-14 rounded-lg bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
                <Scale className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  Zero Tolerance for Corruption
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Maintaining integrity in every transaction and relationship.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="prose-custom space-y-6 text-[var(--color-text-secondary)]">
              <p>
                ASZ Company FZCO maintains a zero-tolerance policy towards
                corruption in any form. Our Anti-Corruption Program establishes
                a comprehensive framework of policies, procedures, and internal
                controls designed to prevent, detect, and respond to corrupt
                practices across all areas of our business.
              </p>

              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] pt-4">
                Program Framework
              </h3>

              <div className="space-y-4">
                {[
                  {
                    title: "Risk Assessment",
                    desc: "We conduct regular assessments to identify and evaluate corruption risks across our operations, supply chain, and business relationships, implementing targeted controls where risks are identified.",
                  },
                  {
                    title: "Due Diligence",
                    desc: "All business partners, suppliers, and agents undergo thorough due diligence before engagement, with ongoing monitoring to ensure continued compliance with our standards.",
                  },
                  {
                    title: "Training & Awareness",
                    desc: "Our employees receive regular training on anti-corruption laws, company policies, and their responsibilities in preventing corruption, ensuring awareness at every level.",
                  },
                  {
                    title: "Reporting Mechanisms",
                    desc: "We maintain confidential reporting channels that allow employees and stakeholders to report suspected corrupt activities without fear of retaliation.",
                  },
                  {
                    title: "Monitoring & Review",
                    desc: "Our anti-corruption controls are subject to regular review and audit to ensure their effectiveness and alignment with evolving regulatory requirements.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] pt-4">
                Regulatory Compliance
              </h3>
              <p>
                Our program is designed to comply with applicable
                anti-corruption legislation, including the UAE Federal Law on
                combating corruption, the UK Bribery Act 2010, and the US
                Foreign Corrupt Practices Act. We continuously monitor
                regulatory developments to ensure our practices remain current
                and effective.
              </p>
            </div>

            {/* Back Navigation */}
            <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex items-center justify-between">
              <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                <Link href="/compliance">Back to Compliance</Link>
              </Button>
              <Button variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
