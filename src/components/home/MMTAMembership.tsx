import Image from "next/image";
import { ExternalLink } from "lucide-react";

export function MMTAMembership() {
  return (
    <section className="py-16 bg-[var(--color-bg-secondary)] border-t border-b border-[var(--color-border)]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* MMTA Logo */}
          <a
            href="https://mmta.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/mmta-logo.png"
              alt="MMTA - Minor Metals Trade Association"
              width={200}
              height={80}
              className="h-20 sm:h-24 w-auto logo-mmta-auto"
            />
          </a>

          {/* Divider */}
          <div className="hidden md:block w-px h-16 bg-[var(--color-border)]" />

          {/* Description + Link */}
          <div className="text-center md:text-left max-w-lg">
            <p className="text-sm font-medium text-[var(--color-accent)] uppercase tracking-wider mb-1">
              Official Member
            </p>
            <p className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] mb-2">
              Minor Metals Trade Association
            </p>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              ASZ Company FZCO is a proud member of the MMTA, the international
              trade association for the minor metals industry, supporting
              worldwide trade of critical metals since 1973.
            </p>
            <a
              href="https://mmta.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              Visit MMTA
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
