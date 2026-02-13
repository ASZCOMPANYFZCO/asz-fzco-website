import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "pt-24 pb-12 lg:pt-32 lg:pb-16 bg-[var(--color-bg-secondary)]",
        className
      )}
    >
      <div className="container-custom">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Home className="h-4 w-4" />
                </Link>
              </li>
              {breadcrumbs.map((item, index) => (
                <li key={item.label} className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-[var(--color-text-muted)]" />
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-[var(--color-text-primary)] font-medium">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
