import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { ContactForm } from "@/components/contact";
import { Card } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";
import { generateWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ASZ Company. Contact us for product enquiries, quotes, or partnership opportunities. We respond within 24 hours.",
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    description: "Send us an email anytime",
  },
  {
    icon: Phone,
    label: "Phone",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone}`,
    description: "Call us during business hours",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: generateWhatsAppUrl(
      "971502069664",
      "Hello ASZ Company FZCO, I would like to enquire about your products."
    ),
    description: "Quick response via WhatsApp",
  },
  {
    icon: MapPin,
    label: "Address",
    value: SITE_CONFIG.address.full,
    href: `https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address.full)}`,
    description: "Visit our office",
  },
];

const businessHours = [
  { day: "Monday \u2013 Friday", hours: "9:00 AM \u2013 6:00 PM" },
  { day: "Saturday", hours: "Closed" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team. We're here to help with your metal trading needs."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card padding="lg">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
                  Request a Quote
                </h2>
                <ContactForm />
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.label === "WhatsApp" ? "_blank" : undefined}
                      rel={item.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                      className="block p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-accent)] transition-colors">
                          <Icon className="h-5 w-5 text-[var(--color-accent)] group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <p className="text-sm text-[var(--color-text-muted)] mb-1">
                            {item.label}
                          </p>
                          <p className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                            {item.value}
                          </p>
                          <p className="text-xs text-[var(--color-text-muted)] mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Business Hours */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center">
                    <Clock className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-2">
                  {businessHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-[var(--color-text-secondary)]">
                        {item.day}
                      </span>
                      <span className="text-[var(--color-text-primary)] font-medium">
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
            Our Location
          </h2>
          <div className="rounded-xl overflow-hidden border border-[var(--color-border)] h-[400px] bg-[var(--color-bg-secondary)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.9!2d55.3781!3d25.1173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f654a11111111%3A0x0!2sDubai+Silicon+Oasis!5e0!3m2!1sen!2sae!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ASZ Company FZCO Location - Dubai Silicon Oasis"
            />
          </div>
        </div>
      </section>
    </>
  );
}
