import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Code of Conduct",
  description:
    "ASZ Company FZCO's Code of Conduct outlining our ethical standards, business principles, and expectations for employees and partners.",
};

export default function CodeOfConductPage() {
  return (
    <>
      <PageHeader
        title="Code of Conduct"
        subtitle="Our ethical standards and business principles that guide every aspect of our operations."
        breadcrumbs={[
          { label: "Compliance", href: "/compliance" },
          { label: "Code of Conduct" },
        ]}
      />

      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Icon Header */}
            <div className="flex items-center gap-4 mb-8 p-6 rounded-xl bg-[var(--color-accent-light)] border border-[var(--color-accent)]/20">
              <div className="w-14 h-14 rounded-lg bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  Our Values in Practice
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  The Code of Conduct reflects who we are and how we operate.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="prose-custom space-y-6 text-[var(--color-text-secondary)]">
              <p>
                At ASZ Company FZCO, our Code of Conduct defines the ethical
                framework within which we operate. It establishes clear
                expectations for all employees, partners, and representatives,
                ensuring that our business activities reflect the highest
                standards of integrity and professionalism.
              </p>

              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] pt-4">
                Key Principles
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Ethical Business Conduct",
                    desc: "We conduct all business activities with honesty, fairness, and transparency, maintaining the trust of our partners and stakeholders.",
                  },
                  {
                    title: "Respect & Dignity",
                    desc: "We treat all individuals with respect and dignity, fostering an inclusive environment free from discrimination or harassment.",
                  },
                  {
                    title: "Compliance with Laws",
                    desc: "We comply with all applicable laws, regulations, and industry standards in every jurisdiction where we operate.",
                  },
                  {
                    title: "Conflicts of Interest",
                    desc: "We avoid situations where personal interests could conflict with the interests of the company, disclosing any potential conflicts promptly.",
                  },
                  {
                    title: "Confidentiality",
                    desc: "We protect confidential information belonging to our company, clients, and partners, using it only for legitimate business purposes.",
                  },
                  {
                    title: "Fair Competition",
                    desc: "We compete fairly and ethically, never engaging in practices that undermine fair market competition or violate antitrust laws.",
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
                Our Responsibility
              </h3>
              <p>
                Every member of ASZ Company FZCO is responsible for upholding
                this Code of Conduct. We encourage open communication and
                provide channels for reporting concerns without fear of
                retaliation. Our leadership team is committed to fostering a
                culture where ethical behaviour is recognised, rewarded, and
                expected at every level of the organisation.
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
