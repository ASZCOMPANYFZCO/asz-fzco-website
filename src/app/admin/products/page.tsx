"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Star,
  Check,
} from "lucide-react";
import { AdminHeader } from "@/components/admin";
import { Button, Badge, Card } from "@/components/ui";
import { MOCK_PRODUCTS, PRODUCT_CATEGORY_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <AdminHeader
        title="Products"
        subtitle={`Manage your product catalog (${MOCK_PRODUCTS.length} products)`}
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
            >
              <option value="all">All Categories</option>
              <option value="ferro_alloy">Ferro Alloys</option>
              <option value="noble_alloy">Noble Alloys</option>
              <option value="minor_metal">Minor Metals</option>
            </select>
          </div>

          <Link href="/admin/products/new">
            <Button leftIcon={<Plus className="h-4 w-4" />} className="w-full sm:w-auto">
              Add Product
            </Button>
          </Link>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden space-y-3">
          {filteredProducts.map((product, index) => (
            <Card key={product.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-lg text-[var(--color-accent)]">
                    {product.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">
                        {product.name}
                      </p>
                      <p className="text-sm text-[var(--color-text-muted)] line-clamp-1 mt-0.5">
                        {product.shortDescription}
                      </p>
                    </div>
                    {product.isFeatured && (
                      <Star className="h-5 w-5 text-amber-500 fill-amber-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="default" size="sm">
                      {PRODUCT_CATEGORY_LABELS[product.category as keyof typeof PRODUCT_CATEGORY_LABELS]}
                    </Badge>
                    <Badge variant="success" size="sm">Active</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[var(--color-border)]">
                <Link href={`/products/${product.slug}`} target="_blank" className="flex-1">
                  <Button variant="secondary" size="sm" fullWidth>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </Link>
                <Link href={`/admin/products/${product.id}`} className="flex-1">
                  <Button variant="secondary" size="sm" fullWidth>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Desktop Table View */}
        <Card padding="none" className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left p-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Product
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Category
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Featured
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={cn(
                      "border-b border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)] transition-colors",
                      index === filteredProducts.length - 1 && "border-b-0"
                    )}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center">
                          <span className="font-bold text-[var(--color-accent)]">
                            {product.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-[var(--color-text-primary)]">
                            {product.name}
                          </p>
                          <p className="text-sm text-[var(--color-text-muted)] truncate max-w-[200px]">
                            {product.shortDescription}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="default">
                        {PRODUCT_CATEGORY_LABELS[product.category as keyof typeof PRODUCT_CATEGORY_LABELS]}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant="success">Active</Badge>
                    </td>
                    <td className="p-4">
                      {product.isFeatured ? (
                        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                      ) : (
                        <Star className="h-5 w-5 text-[var(--color-text-muted)]" />
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/products/${product.slug}`} target="_blank">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/products/${product.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-[var(--color-text-muted)]">No products found</p>
            </div>
          )}
        </Card>

        {/* Empty state for mobile */}
        {filteredProducts.length === 0 && (
          <div className="block md:hidden p-12 text-center">
            <p className="text-[var(--color-text-muted)]">No products found</p>
          </div>
        )}

        {/* Pagination placeholder */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-text-muted)] order-2 sm:order-1">
            Showing {filteredProducts.length} of {MOCK_PRODUCTS.length} products
          </p>
          <div className="flex gap-2 order-1 sm:order-2 w-full sm:w-auto">
            <Button variant="secondary" size="sm" disabled className="flex-1 sm:flex-none">
              Previous
            </Button>
            <Button variant="secondary" size="sm" disabled className="flex-1 sm:flex-none">
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
