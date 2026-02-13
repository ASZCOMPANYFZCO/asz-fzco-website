"use client";

import { useEffect, useRef, useState } from "react";
import { TRUST_STATS, MOCK_PRODUCTS } from "@/lib/constants";

function AnimatedCounter({
  value,
  suffix = "",
  inView,
}: {
  value: number;
  suffix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function TrustStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[var(--color-accent)]/5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-accent) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
            opacity: 0.1,
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            Trusted by Industries Worldwide
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Our track record speaks for itself. We&apos;ve built lasting relationships
            with clients across the globe.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_STATS.map((stat, index) => {
            // Use live product count for "Products Traded"
            const displayValue = stat.label === "Products Traded"
              ? String(MOCK_PRODUCTS.length)
              : stat.value;
            // Parse the value to extract number and suffix
            const match = displayValue.match(/^(\d+)(.*)$/);
            const numValue = match ? parseInt(match[1], 10) : 0;
            const suffix = match ? match[2] : "";

            return (
              <div
                key={stat.label}
                className="text-center p-6 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
              >
                <div className="text-4xl sm:text-5xl font-bold text-[var(--color-accent)] mb-2">
                  <AnimatedCounter
                    value={numValue}
                    suffix={suffix}
                    inView={inView}
                  />
                </div>
                <p className="text-[var(--color-text-secondary)] font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
