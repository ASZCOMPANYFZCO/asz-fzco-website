"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { href: "/products?category=ferro_alloy", label: "Ferro Alloys" },
    { href: "/products?category=noble_alloy", label: "Noble Alloys" },
    { href: "/products?category=minor_metal", label: "Minor Metals" },
  ];

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/news", label: "News & Insights" },
    { href: "/compliance", label: "Compliance" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)]">
      {/* Main Footer */}
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block mb-4 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/asz-logo.png"
                alt="ASZ Company FZCO"
                width={240}
                height={72}
                className="h-14 w-auto logo-auto"
              />
            </Link>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">
              {SITE_CONFIG.tagline}. Connecting global suppliers and buyers with
              premium quality metals and alloys.
            </p>
            {/* MMTA Membership */}
            <a
              href="https://mmta.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-4 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/mmta-logo.png"
                alt="MMTA Member"
                width={180}
                height={72}
                className="h-12 w-auto logo-mmta-auto"
              />
            </a>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/asz-company-fzco/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Mail className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Phone className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>{SITE_CONFIG.address.full}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--color-border)]">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[var(--color-text-muted)]">
              &copy; {currentYear} ASZ Company FZCO. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
