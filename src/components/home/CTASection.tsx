import Link from "next/link";
import { ArrowRight, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";
import { generateWhatsAppUrl } from "@/lib/utils";

export function CTASection() {
  const whatsappUrl = generateWhatsAppUrl(
    "971502069664",
    "Hello ASZ Company FZCO, I would like to discuss my requirements."
  );

  return (
    <section className="section">
      <div className="container-custom">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)]" />

          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 px-6 py-16 lg:py-20 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Discuss Your Requirements?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Get in touch with our team of experts. We&apos;re here to help you
                find the right materials for your business needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="secondary"
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                    className="bg-white text-[var(--color-accent)] hover:bg-white/90"
                  >
                    Contact Us
                  </Button>
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium rounded-lg border-2 border-white text-white hover:bg-white hover:text-[var(--color-accent)] transition-all duration-200"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </a>
              </div>

              {/* Contact Info */}
              <div className="mt-10 pt-8 border-t border-white/20">
                <p className="text-white/70 text-sm mb-4">
                  Or reach us directly
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    <span>{SITE_CONFIG.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
