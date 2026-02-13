"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie } from "lucide-react";
import { Button } from "@/components/ui";

const COOKIE_CONSENT_KEY = "asz-cookie-consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay so it doesn't flash on load
    const timer = setTimeout(() => {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        setIsVisible(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  }

  function decline() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setIsVisible(false);
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
        >
          <div className="container-custom">
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] shadow-lg">
              {/* Close button */}
              <button
                onClick={decline}
                className="absolute top-3 right-3 p-1 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0">
                <Cookie className="h-5 w-5 text-[var(--color-accent)]" />
              </div>

              {/* Text */}
              <div className="flex-1 pr-6 sm:pr-0">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  We use cookies to enhance your browsing experience and analyse
                  site traffic. By clicking &quot;Accept&quot;, you consent to
                  our use of cookies. Read our{" "}
                  <Link
                    href="/privacy"
                    className="text-[var(--color-accent)] hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for more information.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 flex-shrink-0">
                <button
                  onClick={decline}
                  className="px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  Decline
                </button>
                <Button variant="primary" size="sm" onClick={accept}>
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
