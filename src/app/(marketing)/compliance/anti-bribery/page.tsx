import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Handshake, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Anti-Bribery Program",
  description:
    "ASZ Company FZCO's anti-bribery program ensuring compliance with international anti-bribery laws and regulations.",
};

export default function AntiBriberyPage() {
  return (
    <>
      <PageHeader
        title="Anti-Bribery Program"
        subtitle="Our commitment to zero tolerance on bribery in all forms across our operations."
        breadcrumbs={[
          { label: "Compliance", href: "/compliance" },
          { label: "Anti-Bribery Program" },
        ]}
      />

      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Icon Header */}
            <div className="flex items-center gap-4 mb-8 p-6 rounded-xl bg-[var(--color-accent-light)] border border-[var(--color-accent)]/20">
              <div className="w-14 h-14 rounded-lg bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
                <Handshake className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  Zero Tolerance on Bribery
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Upholding ethical standards in every business relationship.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="prose-custom space-y-6 text-[var(--color-text-secondary)]">
              <p>
                ASZ Company FZCO has a strict zero-tolerance approach to bribery
                and facilitation payments. Our Anti-Bribery Program is designed
                to ensure that no employee, agent, or representative of our
                company engages in bribery, whether directly or indirectly,
                regardless of the jurisdiction in which we operate.
              </p>

              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] pt-4">
                What Our Policy Covers
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Prohibition of Bribes",
                    desc: "We strictly prohibit the offering, promising, giving, or accepting of any bribe, whether in cash, gifts, hospitality, or any other form of inducement.",
                  },
                  {
                    title: "Facilitation Payments",
                    desc: "We do not make or accept facilitation payments, regardless of local custom or practice, and all payments must be properly documented.",
                  },
                  {
                    title: "Gifts & Hospitality",
                    desc: "Clear guidelines govern the giving and receiving of gifts and hospitality, ensuring they are reasonable, proportionate, and properly recorded.",
                  },
                  {
                    title: "Third-Party Management",
                    desc: "Agents, intermediaries, and third parties acting on our behalf are subject to thorough due diligence and must comply with our anti-bribery standards.",
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
                Legal Framework
              </h3>
              <p>
                Our Anti-Bribery Program has been developed in line with the UK
                Bribery Act 2010, the US Foreign Corrupt Practices Act (FCPA),
                and applicable UAE anti-bribery legislation. These laws carry
                serious penalties for non-compliance, including criminal
                prosecution, unlimited fines, and imprisonment. We ensure all
                personnel understand their obligations under these laws.
              </p>

              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] pt-4">
                Reporting Concerns
              </h3>
              <p>
                Any employee or stakeholder who suspects or becomes aware of any
                form of bribery is encouraged to report their concerns through
                our confidential reporting channels. We guarantee that all
                reports will be investigated thoroughly and that no individual
                will face retaliation for making a good-faith report.
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
