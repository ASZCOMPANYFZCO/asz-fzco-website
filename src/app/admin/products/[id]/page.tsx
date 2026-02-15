"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  CheckCircle,
  Upload,
  X,
  Loader2,
  GripVertical,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AdminHeader } from "@/components/admin";
import { Button, Card } from "@/components/ui";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants";
import { getProductById, upsertProduct } from "@/lib/data";
import type { Product, ProductGrade, MMTASpecs } from "@/lib/types";

const MMTA_SPEC_LABELS: Record<keyof MMTASpecs, string> = {
  origin: "Origin",
  tariffNo: "Tariff No.",
  quality: "Quality",
  form: "Form",
  packaging: "Packaging",
  lotSizeTolerance: "Lot Size & Tolerance",
  documentation: "Documentation",
  weighingSampling: "Weighing & Sampling",
};

const emptyGrade: ProductGrade = {
  name: "",
  gradePercent: "",
  sizeMm: "",
  carbonPercent: "",
  purityPercent: "",
  packaging: "",
  origin: "",
};

function SortableSpecRow({
  id,
  spec,
  index,
  inputClass,
  onUpdate,
  onRemove,
}: {
  id: string;
  spec: { key: string; value: string };
  index: number;
  inputClass: string;
  onUpdate: (index: number, field: "key" | "value", value: string) => void;
  onRemove: (index: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex gap-3 items-center">
      <button
        type="button"
        className="p-1.5 cursor-grab active:cursor-grabbing text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors flex-shrink-0"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <input
        type="text"
        value={spec.key}
        onChange={(e) => onUpdate(index, "key", e.target.value)}
        placeholder="Key (e.g., Si)"
        className={`${inputClass} flex-1`}
      />
      <input
        type="text"
        value={spec.value}
        onChange={(e) => onUpdate(index, "value", e.target.value)}
        placeholder="Value (e.g., 72-78%)"
        className={`${inputClass} flex-1`}
      />
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function AdminProductEditPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const isNew = productId === "new";

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Product state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<string>("ferro_alloy");
  const [shortDescription, setShortDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [specifications, setSpecifications] = useState<
    { key: string; value: string }[]
  >([{ key: "", value: "" }]);
  const [mmtaSpecs, setMmtaSpecs] = useState<MMTASpecs>({
    origin: "",
    tariffNo: "",
    quality: "",
    form: "",
    packaging: "",
    lotSizeTolerance: "",
    documentation: "",
    weighingSampling: "",
  });
  const [grades, setGrades] = useState<ProductGrade[]>([]);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);

  // Drag-to-reorder for specifications
  const [specIdCounter, setSpecIdCounter] = useState(1);
  const [specIds, setSpecIds] = useState<string[]>(["spec-0"]);

  const specSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleSpecDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = specIds.indexOf(active.id as string);
    const newIndex = specIds.indexOf(over.id as string);

    setSpecifications(arrayMove(specifications, oldIndex, newIndex));
    setSpecIds(arrayMove(specIds, oldIndex, newIndex));
  };

  // Load product data from Supabase if editing
  useEffect(() => {
    if (!isNew) {
      (async () => {
        setIsLoading(true);
        const product = await getProductById(productId);
        if (product) {
          setName(product.name);
          setSlug(product.slug);
          setCategory(product.category);
          setShortDescription(product.shortDescription);
          setIsActive(product.isActive);
          setIsFeatured(product.isFeatured);
          const loadedSpecs = Object.entries(product.specifications).map(
            ([key, value]) => ({ key, value })
          );
          setSpecifications(loadedSpecs);
          setSpecIds(loadedSpecs.map((_, i) => `spec-loaded-${i}`));
          setSpecIdCounter(loadedSpecs.length);
          if (product.mmtaSpecs) {
            setMmtaSpecs({ ...product.mmtaSpecs });
          }
          if (product.grades && product.grades.length > 0) {
            setGrades([...product.grades]);
          }
        }
        setIsLoading(false);
      })();
    }
  }, [productId, isNew]);

  // Auto-generate slug from name
  useEffect(() => {
    if (isNew) {
      setSlug(
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  }, [name, isNew]);

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Please enter a product name.");
      return;
    }

    setIsSaving(true);

    // Convert specifications array to object
    const specsObj: Record<string, string> = {};
    specifications.forEach((s) => {
      if (s.key.trim()) specsObj[s.key.trim()] = s.value.trim();
    });

    // Convert mmtaSpecs to plain object
    const mmtaObj: Record<string, string> = {};
    (Object.entries(mmtaSpecs) as [string, string][]).forEach(([k, v]) => {
      if (v.trim()) mmtaObj[k] = v.trim();
    });

    // Convert grades to plain array of objects
    const gradesArr = grades
      .filter((g) => g.name.trim())
      .map((g) => ({
        name: g.name,
        gradePercent: g.gradePercent || "",
        sizeMm: g.sizeMm || "",
        carbonPercent: g.carbonPercent || "",
        purityPercent: g.purityPercent || "",
        packaging: g.packaging || "",
        origin: g.origin || "",
      }));

    const payload: Parameters<typeof upsertProduct>[0] = {
      name: name.trim(),
      slug: slug.trim(),
      category,
      short_description: shortDescription.trim(),
      image: productImages[primaryImageIndex] || undefined,
      images: productImages.length > 0 ? productImages : undefined,
      specifications: specsObj,
      mmta_specs: Object.keys(mmtaObj).length > 0 ? mmtaObj : undefined,
      grades: gradesArr.length > 0 ? gradesArr : undefined,
      is_active: isActive,
      is_featured: isFeatured,
    };

    if (!isNew) {
      payload.id = productId;
    }

    const { data, error } = await upsertProduct(payload);

    setIsSaving(false);

    if (error) {
      alert(`Error saving product: ${error.message}`);
      return;
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);

    // For new products, redirect to edit page with real ID
    if (isNew && data?.id) {
      router.replace(`/admin/products/${data.id}`);
    }
  };

  const addSpec = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
    setSpecIds([...specIds, `spec-${specIdCounter}`]);
    setSpecIdCounter((c) => c + 1);
  };

  const removeSpec = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
    setSpecIds(specIds.filter((_, i) => i !== index));
  };

  const updateSpec = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  const addGrade = () => {
    setGrades([...grades, { ...emptyGrade }]);
  };

  const removeGrade = (index: number) => {
    setGrades(grades.filter((_, i) => i !== index));
  };

  const updateGrade = (
    index: number,
    field: keyof ProductGrade,
    value: string
  ) => {
    const updated = [...grades];
    updated[index] = { ...updated[index], [field]: value };
    setGrades(updated);
  };

  const updateMmtaSpec = (field: keyof MMTASpecs, value: string) => {
    setMmtaSpecs((prev) => ({ ...prev, [field]: value }));
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors";
  const labelClass =
    "block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5";

  if (isLoading) {
    return (
      <>
        <AdminHeader title="Edit Product" subtitle="Loading..." />
        <div className="p-4 sm:p-6 flex items-center justify-center min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--color-accent)]" />
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader
        title={isNew ? "Add New Product" : `Edit: ${name}`}
        subtitle={isNew ? "Create a new product listing" : "Update product details and specifications"}
      />

      <div className="p-4 sm:p-6 max-w-4xl space-y-6">
        {/* Back link */}
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        {/* Basic Info */}
        <Card>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Product Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Ferro Silicon"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                {Object.entries(PRODUCT_CATEGORY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                />
                <span className="text-sm text-[var(--color-text-secondary)]">
                  Active
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                />
                <span className="text-sm text-[var(--color-text-secondary)]">
                  Featured
                </span>
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label className={labelClass}>Short Description</label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows={3}
              placeholder="Brief product description..."
              className={inputClass}
            />
          </div>
        </Card>

        {/* Product Images */}
        <Card>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
            Product Images
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            Upload product images. The first image will be used as the main display image.
          </p>

          {productImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  className={`relative group rounded-lg border-2 overflow-hidden aspect-square ${
                    index === primaryImageIndex
                      ? "border-[var(--color-accent)]"
                      : "border-[var(--color-border)]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPrimaryImageIndex(index)}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        index === primaryImageIndex
                          ? "bg-[var(--color-accent)] text-white"
                          : "bg-white text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {index === primaryImageIndex ? "Primary" : "Set Primary"}
                    </button>
                    <button
                      onClick={() => {
                        const updated = productImages.filter((_, i) => i !== index);
                        setProductImages(updated);
                        if (primaryImageIndex >= updated.length) {
                          setPrimaryImageIndex(Math.max(0, updated.length - 1));
                        }
                      }}
                      className="p-1.5 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  {index === primaryImageIndex && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[var(--color-accent)] text-white text-xs font-medium">
                      Primary
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <label className="block border-2 border-dashed border-[var(--color-border)] rounded-xl p-8 text-center hover:border-[var(--color-accent)] transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  Array.from(files).forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      if (ev.target?.result) {
                        setProductImages((prev) => [
                          ...prev,
                          ev.target!.result as string,
                        ]);
                      }
                    };
                    reader.readAsDataURL(file);
                  });
                }
                e.target.value = "";
              }}
            />
            <Upload className="h-8 w-8 mx-auto text-[var(--color-text-muted)] mb-3" />
            <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              PNG, JPG or WebP (max. 5MB each)
            </p>
          </label>
        </Card>

        {/* Specifications */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                Specifications
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                Drag to reorder specifications
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={addSpec}
              leftIcon={<Plus className="h-3.5 w-3.5" />}
            >
              Add Spec
            </Button>
          </div>
          <DndContext
            sensors={specSensors}
            collisionDetection={closestCenter}
            onDragEnd={handleSpecDragEnd}
          >
            <SortableContext
              items={specIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {specifications.map((spec, index) => (
                  <SortableSpecRow
                    key={specIds[index]}
                    id={specIds[index]}
                    spec={spec}
                    index={index}
                    inputClass={inputClass}
                    onUpdate={updateSpec}
                    onRemove={removeSpec}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </Card>

        {/* MMTA Specifications */}
        <Card>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
            MMTA Metal Norms
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.keys(MMTA_SPEC_LABELS) as Array<keyof MMTASpecs>).map(
              (field) => (
                <div key={field}>
                  <label className={labelClass}>
                    {MMTA_SPEC_LABELS[field]}
                  </label>
                  <input
                    type="text"
                    value={mmtaSpecs[field] || ""}
                    onChange={(e) => updateMmtaSpec(field, e.target.value)}
                    placeholder={`Enter ${MMTA_SPEC_LABELS[field].toLowerCase()}`}
                    className={inputClass}
                  />
                </div>
              )
            )}
          </div>
        </Card>

        {/* Grades */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                Available Grades
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                Add specific grade variants for this product
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={addGrade}
              leftIcon={<Plus className="h-3.5 w-3.5" />}
            >
              Add Grade
            </Button>
          </div>

          {grades.length === 0 ? (
            <p className="text-sm text-[var(--color-text-muted)] text-center py-6">
              No grades added yet. Click &ldquo;Add Grade&rdquo; to add grade
              variants.
            </p>
          ) : (
            <div className="space-y-4">
              {grades.map((grade, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      Grade {index + 1}
                    </span>
                    <button
                      onClick={() => removeGrade(index)}
                      className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-[var(--color-text-muted)] mb-1">
                        Grade Name
                      </label>
                      <input
                        type="text"
                        value={grade.name}
                        onChange={(e) => updateGrade(index, "name", e.target.value)}
                        placeholder="e.g., 60% High Carbon"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--color-text-muted)] mb-1">
                        Grade %
                      </label>
                      <input
                        type="text"
                        value={grade.gradePercent || ""}
                        onChange={(e) => updateGrade(index, "gradePercent", e.target.value)}
                        placeholder="e.g., 60%"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--color-text-muted)] mb-1">
                        Size (mm)
                      </label>
                      <input
                        type="text"
                        value={grade.sizeMm || ""}
                        onChange={(e) => updateGrade(index, "sizeMm", e.target.value)}
                        placeholder="e.g., 10-100mm"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--color-text-muted)] mb-1">
                        Carbon %
                      </label>
                      <input
                        type="text"
                        value={grade.carbonPercent || ""}
                        onChange={(e) => updateGrade(index, "carbonPercent", e.target.value)}
                        placeholder="e.g., 6-8%"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--color-text-muted)] mb-1">
                        Purity %
                      </label>
                      <input
                        type="text"
                        value={grade.purityPercent || ""}
                        onChange={(e) => updateGrade(index, "purityPercent", e.target.value)}
                        placeholder="e.g., 60% Cr min"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--color-text-muted)] mb-1">
                        Packaging
                      </label>
                      <input
                        type="text"
                        value={grade.packaging || ""}
                        onChange={(e) => updateGrade(index, "packaging", e.target.value)}
                        placeholder="e.g., Big bags 1MT"
                        className={inputClass}
                      />
                    </div>
                    <div className="sm:col-span-2 lg:col-span-1">
                      <label className="block text-xs text-[var(--color-text-muted)] mb-1">
                        Origin
                      </label>
                      <input
                        type="text"
                        value={grade.origin || ""}
                        onChange={(e) => updateGrade(index, "origin", e.target.value)}
                        placeholder="e.g., South Africa / India"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Save Actions */}
        <div className="flex items-center gap-4 pb-8">
          <Button
            onClick={handleSave}
            loading={isSaving}
            leftIcon={
              saveSuccess ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <Save className="h-4 w-4" />
              )
            }
            className={saveSuccess ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {saveSuccess ? "Saved!" : isSaving ? "Saving..." : "Save Product"}
          </Button>
          <Link href="/admin/products">
            <Button variant="secondary">Cancel</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
