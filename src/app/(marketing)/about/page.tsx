import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Handshake,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import { PageHeader } from "@/components/shared";
import { Button } from "@/components/ui";
import { SITE_CONFIG, TRUST_STATS, TEAM_MEMBERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about ASZ Company FZCO, an international ferro alloys, noble alloys, and minor metals trading company established in 2022 and headquartered in Dubai.",
};

const values = [
  {
    icon: Heart,
    title: "Integrity & Transparency",
    description:
      "We conduct business with the highest ethical standards, ensuring transparency in every transaction and building trust through honest, open communication.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description:
      "We are committed to delivering only premium-grade materials, backed by rigorous quality control and internationally recognised documentation.",
  },
  {
    icon: Users,
    title: "Global Partnership",
    description:
      "We build lasting relationships with suppliers, producers, and consumers across continents, creating mutual value through collaboration.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible Trading",
    description:
      "We uphold responsible sourcing and trade practices, maintaining full compliance with international regulations and ethical standards.",
  },
];

/* Icon mapping by role keyword for visual differentiation */
function getRoleIcon(role: string) {
  const r = role.toLowerCase();
  if (r.includes("director") || r.includes("founder") || r.includes("ceo"))
    return Briefcase;
  if (r.includes("operations") || r.includes("logistics")) return Target;
  if (r.includes("commercial") || r.includes("sales")) return Handshake;
  return Users;
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About ASZ Company"
        subtitle="Your trusted partner in global ferro alloys, noble alloys, and minor metals trading since 2022."
        breadcrumbs={[{ label: "About" }]}
      />

      {/* Company Story */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-[var(--color-text-secondary)]">
                <p>
                  ASZ Company FZCO, established in 2022 and headquartered in
                  Dubai, is an international trading company active in noble
                  alloys, ferro alloys, and minor metals. The company&apos;s
                  leadership brings industry experience developed prior to its
                  establishment, supplying producers, steelmakers, and industrial
                  consumers globally. ASZ Company FZCO operates with a strong
                  emphasis on transparency, contractual integrity, and
                  responsible trade practices.
                </p>
                <p>
                  Our journey began with a simple mission: to bridge the gap
                  between metal producers and consumers with reliable,
                  transparent, and efficient trading services. We&apos;ve built
                  lasting relationships with mines, smelters, and manufacturers
                  across Asia, Europe, Africa, and the Americas.
                </p>
              </div>
            </div>

            {/* Company Image — replace /images/asz-logo.png with a custom image */}
            <div className="relative aspect-[4/3] rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] overflow-hidden">
              <Image
                src="/images/asz-logo.png"
                alt="ASZ Company FZCO"
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* MMTA Membership */}
      <section className="py-6">
        <div className="container-custom">
          <div className="flex items-center gap-4 p-6 rounded-xl bg-[var(--color-accent-light)] border border-[var(--color-accent)]/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/mmta-logo.png"
              alt="MMTA"
              className="h-14 w-auto flex-shrink-0"
            />
            <div>
              <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">
                MMTA Member
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                ASZ Company FZCO is a proud member of the Minor Metals Trade
                Association (MMTA), reflecting our commitment to best practices
                and ethical standards in the minor metals and ferro alloys
                industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-[var(--color-bg-secondary)]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-8 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)]">
              <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                Our Mission
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                To be the most trusted and reliable partner in the global metals
                trading industry, connecting quality suppliers with customers
                worldwide while maintaining the highest standards of integrity,
                service, and sustainability.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)]">
              <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                Our Vision
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                To become the leading ferro alloys and minor metals trading
                company, recognised globally for our integrity, expertise, and
                commitment to customer success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              The principles that guide every aspect of our business operations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-[var(--color-bg-secondary)]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-6">
                Why Choose ASZ Company?
              </h2>
              <div className="space-y-4">
                {[
                  "Industry experienced leadership with deep market knowledge",
                  "Extensive global supply network of trusted producers and partners",
                  "Transparent and ethical trading practices in every transaction",
                  "Competitive pricing and flexible commercial terms",
                  "Quality assured products with full documentation and traceability",
                  "Dedicated customer service and responsive support",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--color-text-secondary)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {TRUST_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-center"
                >
                  <div className="text-3xl font-bold text-[var(--color-accent)] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section — without photos */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Our Team
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Meet the professionals driving ASZ Company&apos;s success.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => {
              const RoleIcon = getRoleIcon(member.role);
              return (
                <div
                  key={member.name}
                  className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group"
                >
                  {/* Icon instead of photo */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors">
                    <RoleIcon className="h-7 w-7 text-[var(--color-accent)] group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-[var(--color-accent)] font-medium mb-2">
                      {member.role}
                    </p>
                    {member.department && (
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        {member.department}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[var(--color-bg-secondary)]">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Ready to Partner With Us?
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              Contact our team today to discuss how we can support your business
              with quality metals and exceptional service.
            </p>
            <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
