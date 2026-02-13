"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Package, FileText, Beaker, Factory, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared";
import { ProductEnquiryForm, ProductCard } from "@/components/products";
import { Button, Badge, Card } from "@/components/ui";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants";
import { getProductBySlug, getProducts } from "@/lib/data";
import type { Product } from "@/lib/types";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      const p = await getProductBySlug(slug);
      setProduct(p);

      if (p) {
        const allProducts = await getProducts();
        setRelatedProducts(
          allProducts
            .filter((rp) => rp.category === p.category && rp.id !== p.id)
            .slice(0, 3)
        );
      }
      setLoading(false);
    }
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--color-accent)]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            Product Not Found
          </h1>
          <Link href="/products">
            <Button variant="outline">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const applications = [
    "Steel Manufacturing",
    "Stainless Steel Production",
    "Foundry Industry",
    "Welding Electrodes",
  ];

  const features = [
    "Consistent chemical composition",
    "Low impurity levels",
    "Uniform particle size",
    "Reliable supply chain",
  ];

  return (
    <>
      <PageHeader
        title={product.name}
        subtitle={product.shortDescription}
        breadcrumbs={[
          { label: "Products", href: "/products" },
          {
            label:
              PRODUCT_CATEGORY_LABELS[
                product.category as keyof typeof PRODUCT_CATEGORY_LABELS
              ],
            href: `/products?category=${product.category}`,
          },
          { label: product.name },
        ]}
      />

      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Image */}
              <div className="aspect-video rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
                    <span className="text-4xl font-bold text-[var(--color-accent)]">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Product Image Placeholder
                  </p>
                </div>
              </div>

              {/* Specifications */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center">
                    <Beaker className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    Specifications
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.specifications).map(
                        ([key, value], index) => (
                          <tr
                            key={key}
                            className={
                              index % 2 === 0
                                ? "bg-[var(--color-bg-tertiary)]"
                                : ""
                            }
                          >
                            <td className="px-4 py-3 text-sm font-medium text-[var(--color-text-primary)]">
                              {key}
                            </td>
                            <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                              {value}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Applications */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center">
                    <Factory className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    Applications
                  </h2>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {applications.map((app) => (
                    <li
                      key={app}
                      className="flex items-center gap-2 text-[var(--color-text-secondary)]"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                      {app}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Features */}
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center">
                    <Package className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    Product Features
                  </h2>
                </div>
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-[var(--color-text-secondary)]"
                    >
                      <div className="w-5 h-5 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Sidebar - Enquiry Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-[var(--color-accent)]">
                  <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6">
                    Request a Quote
                  </h2>
                  <ProductEnquiryForm
                    productName={product.name}
                    productId={product.id}
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section bg-[var(--color-bg-secondary)]">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Related Products
              </h2>
              <Button
                variant="outline"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                <Link href={`/products?category=${product.category}`}>
                  View All
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Products */}
      <section className="py-8 border-t border-[var(--color-border)]">
        <div className="container-custom">
          <Button
            variant="ghost"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            <Link href="/products">Back to All Products</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
