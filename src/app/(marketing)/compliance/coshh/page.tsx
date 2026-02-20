import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, HardHat, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "COSHH Compliance",
  description:
    "ASZ Company FZCO's COSHH compliance plan for safe handling and management of metals and alloys.",
};

export default function COSHHPage() {
  return (
    <>
      <PageHeader
        title="COSHH Compliance"
        subtitle="Control of Substances Hazardous to Health — ensuring safety across our supply chain."
        breadcrumbs={[
          { label: "Compliance", href: "/compliance" },
          { label: "COSHH Compliance" },
        ]}
      />

      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Icon Header */}
            <div className="flex items-center gap-4 mb-8 p-6 rounded-xl bg-[var(--color-accent-light)] border border-[var(--color-accent)]/20">
              <div className="w-14 h-14 rounded-lg bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
                <HardHat className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  Safety First
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Protecting people and the environment through responsible
                  handling practices.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="prose-custom space-y-6 text-[var(--color-text-secondary)]">
              <p>
                As a trader in ferro alloys, noble alloys, and minor metals, ASZ
                Company FZCO recognises the importance of ensuring that all
                materials are handled, stored, and transported safely. Our COSHH
                Compliance Plan sets out the measures we take to protect the
                health and safety of workers, communities, and the environment
                throughout the supply chain.
              </p>

              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] pt-4">
                Our Approach
              </h3>

              <div className="space-y-4">
                {[
                  {
                    title: "Hazard Identification",
                    desc: "We maintain comprehensive safety data sheets (SDS) for all products we trade, identifying potential hazards and the precautions necessary for safe handling.",
                  },
                  {
                    title: "Risk Assessment",
                    desc: "Regular risk assessments are conducted to evaluate exposure risks during storage, handling, and transportation, with appropriate control measures implemented.",
                  },
                  {
                    title: "Safe Handling Procedures",
                    desc: "Clear procedures and guidelines are in place for the safe handling of all materials, including appropriate personal protective equipment (PPE) requirements.",
                  },
                  {
                    title: "Documentation & Traceability",
                    desc: "All shipments are accompanied by the required safety documentation, including SDS, certificates of analysis, and handling instructions.",
                  },
                  {
                    title: "Partner Compliance",
                    desc: "We work with logistics partners and warehouses that meet recognised health and safety standards, ensuring compliance throughout the supply chain.",
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
                Continuous Improvement
              </h3>
              <p>
                We regularly review and update our COSHH compliance procedures
                to reflect changes in regulations, best practices, and the
                products we trade. Our commitment to health and safety is an
                ongoing process that evolves with our business.
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
