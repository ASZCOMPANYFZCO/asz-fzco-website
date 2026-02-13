"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { COUNTRIES, DELIVERY_TERMS, HOW_HEARD_OPTIONS } from "@/lib/constants";

interface ProductEnquiryFormProps {
  productName: string;
  productId: string;
}

export function ProductEnquiryForm({
  productName,
  productId,
}: ProductEnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const payload = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      country: formData.get("country") as string,
      products: [productName],
      quantity: formData.get("quantity") as string,
      sizing: formData.get("sizing") as string,
      packing: formData.get("packing") as string,
      deliveryTerms: formData.get("deliveryTerms") as string,
      preferredDeliveryDate: formData.get("preferredDeliveryDate") as string,
      howHeard: formData.get("howHeard") as string,
      additionalNotes: formData.get("additionalNotes") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit enquiry");
      }

      setIsSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors";
  const labelClass =
    "block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5";

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
          Enquiry Submitted!
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-6">
          Thank you for your interest in {productName}. Our team will contact
          you within 24 hours.
        </p>
        <Button variant="outline" onClick={() => setIsSuccess(false)}>
          Send Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Product badge */}
      <div className="p-3 rounded-lg bg-[var(--color-accent-light)]">
        <p className="text-sm text-[var(--color-accent)] font-medium">
          Enquiring about: {productName}
        </p>
      </div>

      {/* Contact Info */}
      <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider pt-2">
        Contact Information
      </p>

      <div>
        <label className={labelClass}>
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          name="fullName"
          type="text"
          placeholder="John Smith"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          name="email"
          type="email"
          placeholder="john@company.com"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Phone Number</label>
        <input
          name="phone"
          type="tel"
          placeholder="+1 234 567 8900"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Company Name</label>
        <input
          name="company"
          type="text"
          placeholder="Your Company Ltd."
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Country</label>
        <select name="country" className={inputClass} defaultValue="">
          <option value="" disabled>
            Select country
          </option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Order Details */}
      <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider pt-3">
        Order Details
      </p>

      <div>
        <label className={labelClass}>Quantity / Volume Required</label>
        <input
          name="quantity"
          type="text"
          placeholder="e.g., 500 MT"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Sizing</label>
        <input
          name="sizing"
          type="text"
          placeholder="e.g., 10-50mm"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Packing</label>
        <input
          name="packing"
          type="text"
          placeholder="e.g., Big bags, Drums"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Delivery Terms</label>
        <select name="deliveryTerms" className={inputClass} defaultValue="">
          <option value="" disabled>
            Select delivery terms
          </option>
          {DELIVERY_TERMS.map((term) => (
            <option key={term} value={term}>
              {term}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Preferred Delivery Date</label>
        <input
          name="preferredDeliveryDate"
          type="date"
          className={inputClass}
        />
      </div>

      {/* Additional */}
      <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider pt-3">
        Additional Information
      </p>

      <div>
        <label className={labelClass}>How did you hear about us?</label>
        <select name="howHeard" className={inputClass} defaultValue="">
          <option value="" disabled>
            Select an option
          </option>
          {HOW_HEARD_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Additional Notes</label>
        <textarea
          name="additionalNotes"
          placeholder="Any specific requirements, certifications needed, or other details..."
          rows={3}
          className={inputClass}
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        fullWidth
        loading={isSubmitting}
        leftIcon={!isSubmitting ? <Send className="h-4 w-4" /> : undefined}
      >
        {isSubmitting ? "Sending..." : "Request Quote"}
      </Button>

      <p className="text-xs text-[var(--color-text-muted)] text-center">
        By submitting this form, you agree to our privacy policy. We&apos;ll
        respond within 24 hours.
      </p>
    </form>
  );
}
