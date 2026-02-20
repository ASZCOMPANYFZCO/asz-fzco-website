import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    category: string;
    shortDescription: string;
    image?: string;
    specifications: Record<string, string>;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="h-full flex flex-col bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:border-[var(--color-accent)] hover:shadow-lg transition-all duration-300">
        {/* Product Image */}
        <div className="relative aspect-[4/3] bg-[var(--color-bg-tertiary)]">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
                  <span className="text-2xl font-bold text-[var(--color-accent)]">
                    {product.name.charAt(0)}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Product Image
                </p>
              </div>
            </div>
          )}

          {/* Category Badge */}
          <Badge variant="primary" className="absolute top-3 left-3">
            {PRODUCT_CATEGORY_LABELS[product.category as keyof typeof PRODUCT_CATEGORY_LABELS]}
          </Badge>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-[var(--color-accent)]/0 group-hover:bg-[var(--color-accent)]/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="w-10 h-10 rounded-full bg-[var(--color-bg-primary)] flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5 text-[var(--color-accent)]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4">
            {product.shortDescription}
          </p>

          {/* Key Specs */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--color-border)]">
            {Object.entries(product.specifications)
              .slice(0, 3)
              .map(([key, value]) => (
                <span
                  key={key}
                  className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-tertiary)] px-2 py-1 rounded"
                >
                  {key}: {value}
                </span>
              ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
