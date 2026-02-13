import type { Metadata } from "next";
import { PageHeader } from "@/components/shared";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "ASZ Company FZCO privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose-custom">
            <p className="text-sm text-[var(--color-text-muted)] mb-8">
              Last updated: February 2026
            </p>

            <h2>1. Introduction</h2>
            <p>
              ASZ Company FZCO (&quot;ASZ&quot;, &quot;we&quot;, &quot;us&quot;,
              or &quot;our&quot;) is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website
              aszcompany.com or engage with our services.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide
              when you:
            </p>
            <ul>
              <li>Submit a quote request or contact form</li>
              <li>Send us an email or other correspondence</li>
              <li>Engage with us in a business relationship</li>
            </ul>
            <p>This may include:</p>
            <ul>
              <li>Full name and job title</li>
              <li>Company name and address</li>
              <li>Email address and telephone number</li>
              <li>Product enquiry details</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>
              When you visit our website, we may automatically collect certain
              information including your IP address, browser type, device
              information, pages visited, and referring URLs. This information
              is collected through cookies and similar tracking technologies.
            </p>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your enquiries and quote requests</li>
              <li>Process and manage business transactions</li>
              <li>Communicate with you about our products and services</li>
              <li>Improve our website and user experience</li>
              <li>Comply with legal and regulatory obligations</li>
              <li>Protect against fraud and unauthorised activity</li>
            </ul>

            <h2>4. Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience.
              Cookies are small text files stored on your device. We use:
            </p>
            <ul>
              <li>
                <strong>Essential cookies:</strong> Required for the website to
                function properly, including remembering your preferences.
              </li>
              <li>
                <strong>Analytics cookies:</strong> Help us understand how
                visitors interact with our website so we can improve it.
              </li>
            </ul>
            <p>
              You can control cookie settings through your browser preferences.
              Disabling certain cookies may affect website functionality.
            </p>

            <h2>5. Data Sharing and Disclosure</h2>
            <p>
              We do not sell, rent, or trade your personal information. We may
              share your information with:
            </p>
            <ul>
              <li>
                Service providers who assist us in operating our website and
                business
              </li>
              <li>
                Professional advisers including lawyers, accountants, and
                insurers
              </li>
              <li>
                Regulatory authorities where required by law or regulation
              </li>
              <li>Business partners in connection with a transaction you have requested</li>
            </ul>

            <h2>6. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to
              protect your personal information against unauthorised access,
              alteration, disclosure, or destruction. However, no method of
              electronic transmission or storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>

            <h2>7. Data Retention</h2>
            <p>
              We retain personal information only for as long as necessary to
              fulfil the purposes for which it was collected, comply with legal
              obligations, resolve disputes, and enforce our agreements.
              Business transaction records may be retained for a minimum of
              seven (7) years in accordance with applicable regulations.
            </p>

            <h2>8. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the following rights
              regarding your personal information:
            </p>
            <ul>
              <li>The right to access your personal data</li>
              <li>The right to rectify inaccurate data</li>
              <li>The right to request deletion of your data</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at the details
              provided below.
            </p>

            <h2>9. International Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries
              other than your country of residence. We ensure appropriate
              safeguards are in place to protect your information in accordance
              with this Privacy Policy and applicable data protection laws.
            </p>

            <h2>10. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of those
              websites. We encourage you to read the privacy policies of any
              third-party sites you visit.
            </p>

            <h2>11. Children&apos;s Privacy</h2>
            <p>
              Our website and services are not directed at individuals under the
              age of 18. We do not knowingly collect personal information from
              children.
            </p>

            <h2>12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date. We
              encourage you to review this policy periodically.
            </p>

            <h2>13. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to
              exercise your rights, please contact us:
            </p>
            <ul>
              <li>
                Email:{" "}
                <a href="mailto:general@aszcompany.com">
                  general@aszcompany.com
                </a>
              </li>
              <li>Address: 150 HDS Tower, JLT, Dubai, UAE</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
