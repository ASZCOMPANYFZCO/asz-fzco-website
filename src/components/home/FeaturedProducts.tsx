"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants";
import { getProducts } from "@/lib/data";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | "ferro_alloy" | "noble_alloy" | "minor_metal";

export function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filteredProducts =
    activeCategory === "all"
      ? products.slice(0, 6)
      : products.filter((p) => p.category === activeCategory).slice(0, 6);

  return (
    <section className="section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              Our Products
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl">
              Premium quality noble alloys, ferro alloys, and minor metals for steel, aluminum,
              and specialty industries worldwide.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 p-1 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)]">
            {(["all", "ferro_alloy", "noble_alloy", "minor_metal"] as const).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  activeCategory === category
                    ? "bg-[var(--color-accent)] text-white"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {category === "all"
                  ? "All Products"
                  : PRODUCT_CATEGORY_LABELS[category]}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--color-accent)]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group"
              >
                <div className="card card-hover h-full flex flex-col">
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] rounded-lg bg-[var(--color-bg-tertiary)] mb-4 overflow-hidden">
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
                    <Badge
                      variant="primary"
                      className="absolute top-3 left-3"
                    >
                      {PRODUCT_CATEGORY_LABELS[product.category as keyof typeof PRODUCT_CATEGORY_LABELS]}
                    </Badge>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[var(--color-accent)]/0 group-hover:bg-[var(--color-accent)]/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-bg-primary)] flex items-center justify-center">
                        <ArrowUpRight className="h-5 w-5 text-[var(--color-accent)]" />
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4">
                      {product.shortDescription}
                    </p>
                  </div>

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
              </Link>
            ))}
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            rightIcon={<ArrowRight className="h-5 w-5" />}
          >
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
