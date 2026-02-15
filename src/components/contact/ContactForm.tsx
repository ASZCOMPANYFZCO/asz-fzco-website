"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle } from "lucide-react";
import { Button, Input, Textarea, Select } from "@/components/ui";
import { quoteFormSchema, type QuoteFormValues } from "@/lib/validations";
import {
  COUNTRIES,
  DELIVERY_TERMS,
  HOW_HEARD_OPTIONS,
  PRODUCT_CATEGORIES,
  PRODUCT_CATEGORY_LABELS,
} from "@/lib/constants";
import { getProducts } from "@/lib/data";
import type { Product } from "@/lib/types";

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const productsByCategory = useMemo(() => [
    {
      key: PRODUCT_CATEGORIES.FERRO_ALLOY,
      label: PRODUCT_CATEGORY_LABELS[PRODUCT_CATEGORIES.FERRO_ALLOY],
      products: products.filter((p) => p.category === PRODUCT_CATEGORIES.FERRO_ALLOY),
    },
    {
      key: PRODUCT_CATEGORIES.NOBLE_ALLOY,
      label: PRODUCT_CATEGORY_LABELS[PRODUCT_CATEGORIES.NOBLE_ALLOY],
      products: products.filter((p) => p.category === PRODUCT_CATEGORIES.NOBLE_ALLOY),
    },
    {
      key: PRODUCT_CATEGORIES.MINOR_METAL,
      label: PRODUCT_CATEGORY_LABELS[PRODUCT_CATEGORIES.MINOR_METAL],
      products: products.filter((p) => p.category === PRODUCT_CATEGORIES.MINOR_METAL),
    },
  ], [products]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      country: "",
      products: [],
      quantity: "",
      sizing: "",
      packing: "",
      deliveryTerms: "",
      preferredDeliveryDate: "",
      howHeard: "",
      additionalNotes: "",
    },
  });

  const selectedProducts = watch("products");

  const handleProductToggle = (productName: string) => {
    const current = selectedProducts || [];
    if (current.includes(productName)) {
      setValue(
        "products",
        current.filter((p) => p !== productName),
        { shouldValidate: true }
      );
    } else {
      setValue("products", [...current, productName], { shouldValidate: true });
    }
  };

  const onSubmit = async (data: QuoteFormValues) => {
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || "Something went wrong. Please try again."
        );
      }

      setIsSuccess(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
          Quote Request Sent!
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-6">
          Thank you for your enquiry. Our team will review your request and
          respond within 24 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSuccess(false);
            reset();
          }}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* ── Contact Information ── */}
      <fieldset>
        <legend className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 pb-2 border-b border-[var(--color-border)]">
          Contact Information
        </legend>
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              placeholder="John Smith"
              error={errors.fullName?.message}
              {...register("fullName")}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="john@company.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+44 20 1234 5678"
              error={errors.phone?.message}
              {...register("phone")}
            />
            <Input
              label="Company Name"
              placeholder="Your Company Ltd."
              error={errors.company?.message}
              {...register("company")}
            />
          </div>
          <Select
            label="Country"
            placeholder="Select your country"
            options={COUNTRIES.map((c) => ({ value: c, label: c }))}
            error={errors.country?.message}
            {...register("country")}
          />
        </div>
      </fieldset>

      {/* ── Product Details ── */}
      <fieldset>
        <legend className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 pb-2 border-b border-[var(--color-border)]">
          Product Details
        </legend>

        <div className="space-y-5">
          {/* Product multi-select checkboxes grouped by category */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3">
              Products Interested In{" "}
              <span className="text-[var(--color-error)]">*</span>
            </label>
            <div className="space-y-4">
              {productsByCategory.map((group) => (
                <div key={group.key}>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                    {group.label}
                  </p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {group.products.map((product) => {
                      const isChecked =
                        selectedProducts?.includes(product.name) ?? false;
                      return (
                        <label
                          key={product.id}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 text-sm ${
                            isChecked
                              ? "border-[var(--color-accent)] bg-[var(--color-accent-light)]"
                              : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)]/50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleProductToggle(product.name)}
                            className="accent-[var(--color-accent)] h-4 w-4 flex-shrink-0"
                          />
                          <span className="text-[var(--color-text-primary)]">
                            {product.name}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
              {/* Other option */}
              <div>
                <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Other
                </p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <label
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 text-sm ${
                      selectedProducts?.includes("Other") ?? false
                        ? "border-[var(--color-accent)] bg-[var(--color-accent-light)]"
                        : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)]/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedProducts?.includes("Other") ?? false}
                      onChange={() => handleProductToggle("Other")}
                      className="accent-[var(--color-accent)] h-4 w-4 flex-shrink-0"
                    />
                    <span className="text-[var(--color-text-primary)]">
                      Other (please specify in notes)
                    </span>
                  </label>
                </div>
              </div>
            </div>
            {errors.products?.message && (
              <p className="mt-2 text-sm text-[var(--color-error)]">
                {errors.products.message}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <Input
              label="Quantity / Volume Required"
              placeholder="e.g. 50 MT"
              error={errors.quantity?.message}
              {...register("quantity")}
            />
            <Input
              label="Sizing"
              placeholder="e.g. 10-50mm"
              error={errors.sizing?.message}
              {...register("sizing")}
            />
            <Input
              label="Packing"
              placeholder="e.g. Big bags 1MT"
              error={errors.packing?.message}
              {...register("packing")}
            />
          </div>
        </div>
      </fieldset>

      {/* ── Logistics ── */}
      <fieldset>
        <legend className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 pb-2 border-b border-[var(--color-border)]">
          Logistics
        </legend>
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Select
              label="Delivery Terms"
              placeholder="Select delivery terms"
              options={DELIVERY_TERMS.map((t) => ({ value: t, label: t }))}
              error={errors.deliveryTerms?.message}
              {...register("deliveryTerms")}
            />
            <Input
              label="Preferred Delivery Date"
              type="date"
              error={errors.preferredDeliveryDate?.message}
              {...register("preferredDeliveryDate")}
            />
          </div>
        </div>
      </fieldset>

      {/* ── Additional Information ── */}
      <fieldset>
        <legend className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 pb-2 border-b border-[var(--color-border)]">
          Additional Information
        </legend>
        <div className="space-y-5">
          <Select
            label="How Did You Hear About Us?"
            placeholder="Select an option"
            options={HOW_HEARD_OPTIONS.map((o) => ({ value: o, label: o }))}
            error={errors.howHeard?.message}
            {...register("howHeard")}
          />
          <Textarea
            label="Additional Message / Notes"
            placeholder="Any special requirements, specifications, or questions..."
            rows={5}
            error={errors.additionalNotes?.message}
            {...register("additionalNotes")}
          />
        </div>
      </fieldset>

      {/* ── Error & Submit ── */}
      {submitError && (
        <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm">
          {submitError}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        fullWidth
        loading={isSubmitting}
        leftIcon={!isSubmitting ? <Send className="h-4 w-4" /> : undefined}
      >
        {isSubmitting ? "Submitting..." : "Request a Quote"}
      </Button>

      <p className="text-xs text-[var(--color-text-muted)] text-center">
        By submitting this form, you agree to our privacy policy.
      </p>
    </form>
  );
}
