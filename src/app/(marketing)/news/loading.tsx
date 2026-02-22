import { Loader2 } from "lucide-react";

export default function NewsLoading() {
  return (
    <>
      {/* Page Header Skeleton */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-[var(--color-bg-secondary)]">
        <div className="container-custom">
          <div className="h-4 w-32 bg-[var(--color-bg-tertiary)] rounded mb-4 animate-pulse" />
          <div className="h-10 w-64 bg-[var(--color-bg-tertiary)] rounded mb-4 animate-pulse" />
          <div className="h-5 w-96 max-w-full bg-[var(--color-bg-tertiary)] rounded animate-pulse" />
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          {/* Filter Skeleton */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div className="h-11 w-80 bg-[var(--color-bg-secondary)] rounded-lg animate-pulse" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-20 bg-[var(--color-bg-secondary)] rounded-lg animate-pulse" />
              ))}
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--color-accent)]" />
          </div>
        </div>
      </section>
    </>
  );
}
