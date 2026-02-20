"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { ProductCard } from "@/components/products";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants";
import { getProducts } from "@/lib/data";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | "ferro_alloy" | "noble_alloy" | "minor_metal" | "other";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (activeCategory !== "all") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, activeCategory, products]);

  return (
    <>
      <PageHeader
        title="Our Products"
        subtitle="Premium quality ferro alloys and minor metals for steel, aluminum, and specialty industries worldwide."
        breadcrumbs={[{ label: "Products" }]}
      />

      <section className="section">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 p-1 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)]">
              {(["all", "ferro_alloy", "noble_alloy", "minor_metal", "other"] as const).map(
                (category) => (
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
                )
              )}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            {loading
              ? "Loading products..."
              : `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`}
          </p>

          {/* Products Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--color-accent)]" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center">
                <Filter className="h-8 w-8 text-[var(--color-text-muted)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                No products found
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
