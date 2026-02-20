import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Users, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Modern Slavery & Human Trafficking Policy",
  description:
    "ASZ Company FZCO's commitment to preventing modern slavery and human trafficking across our operations and supply chain.",
};

export default function ModernSlaveryPage() {
  return (
    <>
      <PageHeader
        title="Modern Slavery & Human Trafficking Policy"
        subtitle="Our commitment to ethical sourcing and preventing exploitation across our supply chain."
        breadcrumbs={[
          { label: "Compliance", href: "/compliance" },
          { label: "Modern Slavery Policy" },
        ]}
      />

      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Icon Header */}
            <div className="flex items-center gap-4 mb-8 p-6 rounded-xl bg-[var(--color-accent-light)] border border-[var(--color-accent)]/20">
              <div className="w-14 h-14 rounded-lg bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
                <Users className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  Protecting Human Rights
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Ensuring ethical practices throughout our entire supply chain.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="prose-custom space-y-6 text-[var(--color-text-secondary)]">
              <p>
                ASZ Company FZCO is committed to preventing modern slavery and
                human trafficking in all its forms across our business and
                supply chain. We recognise that as an international metals
                trading company, we have a responsibility to ensure that our
                operations and partnerships do not contribute to the
                exploitation of individuals.
              </p>

              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] pt-4">
                Our Commitments
              </h3>

              <div className="space-y-4">
                {[
                  {
                    title: "Supply Chain Due Diligence",
                    desc: "We conduct thorough due diligence on our suppliers and partners to assess and address risks of modern slavery, ensuring responsible sourcing at every stage.",
                  },
                  {
                    title: "Supplier Standards",
                    desc: "Our suppliers are expected to uphold the same standards we set for ourselves. We work collaboratively with partners to ensure fair labour practices and safe working conditions.",
                  },
                  {
                    title: "Employee Awareness",
                    desc: "We provide training to our staff to help them identify the signs of modern slavery and human trafficking, and to understand the steps they should take if they have concerns.",
                  },
                  {
                    title: "Reporting & Response",
                    desc: "We maintain clear reporting channels for anyone who suspects modern slavery or human trafficking within our operations or supply chain, with all reports taken seriously and investigated promptly.",
                  },
                  {
                    title: "Ongoing Review",
                    desc: "We regularly review our policies and procedures to ensure they remain effective and aligned with best practices and evolving legislation in this area.",
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
                Our Position
              </h3>
              <p>
                We believe that business has a fundamental role to play in
                addressing modern slavery. By maintaining robust policies,
                conducting thorough due diligence, and working collaboratively
                with our partners, we aim to contribute to the global effort to
                eradicate all forms of forced labour, human trafficking, and
                exploitation.
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
