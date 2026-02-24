import { supabase, isSupabaseConfigured, createServerSupabaseClient } from "./supabase";
import type { Product, ProductCategory } from "./types";

// Timeout helper — ensures Supabase calls never hang forever
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withTimeout<T extends Promise<any>>(promise: T, ms: number): T {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]) as T;
}

// ============================================================
// PRODUCTS
// ============================================================

export interface DBProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  short_description: string;
  image: string | null;
  images: string[] | null;
  specifications: Record<string, string>;
  mmta_specs: Record<string, string> | null;
  grades: Array<Record<string, string>> | null;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

function dbProductToProduct(db: DBProduct): Product {
  return {
    id: db.id,
    name: db.name,
    slug: db.slug,
    category: db.category as ProductCategory,
    shortDescription: db.short_description,
    image: db.image || undefined,
    images: db.images || undefined,
    specifications: db.specifications || {},
    mmtaSpecs: db.mmta_specs
      ? {
          origin: db.mmta_specs.origin,
          tariffNo: db.mmta_specs.tariffNo,
          quality: db.mmta_specs.quality,
          form: db.mmta_specs.form,
          packaging: db.mmta_specs.packaging,
          lotSizeTolerance: db.mmta_specs.lotSizeTolerance,
          documentation: db.mmta_specs.documentation,
          weighingSampling: db.mmta_specs.weighingSampling,
        }
      : undefined,
    grades: db.grades
      ? db.grades.map((g) => ({
          name: g.name || "",
          gradePercent: g.gradePercent,
          sizeMm: g.sizeMm,
          carbonPercent: g.carbonPercent,
          purityPercent: g.purityPercent,
          packaging: g.packaging,
          origin: g.origin,
        }))
      : undefined,
    isActive: db.is_active,
    isFeatured: db.is_featured,
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return (data as DBProduct[]).map(dbProductToProduct);
}

export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return (data as DBProduct[]).map(dbProductToProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return dbProductToProduct(data as DBProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return dbProductToProduct(data as DBProduct);
}

export async function getProductCount(): Promise<number> {
  if (!isSupabaseConfigured()) return 0;
  const { count, error } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);

  if (error) {
    console.error("Error counting products:", error);
    return 0;
  }

  return count || 0;
}

export async function upsertProduct(product: {
  id?: string;
  name: string;
  slug: string;
  category: string;
  short_description: string;
  image?: string;
  images?: string[];
  specifications?: Record<string, string>;
  mmta_specs?: Record<string, string>;
  grades?: Array<Record<string, string>>;
  is_active?: boolean;
  is_featured?: boolean;
}) {
  if (!isSupabaseConfigured()) return { data: null, error: new Error("Supabase not configured") };
  const { id, ...productData } = product;
  const payload = {
    ...productData,
    updated_at: new Date().toISOString(),
  };

  try {
    if (product.id) {
      console.log("[upsertProduct] Updating product:", product.id, "payload:", JSON.stringify(payload).slice(0, 200));
      const result = await withTimeout(
        supabase.from("products").update(payload).eq("id", product.id).select(),
        10000
      );
      const rowCount = result.data ? result.data.length : 0;
      console.log("[upsertProduct] Update result:", { error: result.error, status: result.status, rowsAffected: rowCount });
      if (rowCount === 0 && !result.error) {
        console.warn("[upsertProduct] WARNING: 0 rows updated! This likely means RLS policies are blocking writes. Check Supabase RLS policies.");
        return { data: null, error: new Error("Update failed: 0 rows affected. Your Supabase RLS policies may be blocking writes. Please check your Supabase dashboard → Authentication → Policies.") };
      }
      return { data: result.data?.[0] ?? { id: product.id, ...payload } as Record<string, unknown>, error: result.error };
    } else {
      console.log("[upsertProduct] Inserting new product");
      const result = await withTimeout(
        supabase.from("products").insert(payload).select().single(),
        10000
      );
      console.log("[upsertProduct] Insert result:", { data: result.data, error: result.error, status: result.status });
      return { data: result.data, error: result.error };
    }
  } catch (err) {
    console.error("[upsertProduct] Exception:", err);
    return { data: null, error: err instanceof Error ? err : new Error("Unknown error saving product") };
  }
}

export async function deleteProduct(id: string) {
  if (!isSupabaseConfigured()) return { error: new Error("Supabase not configured") };
  return supabase.from("products").delete().eq("id", id);
}

// ============================================================
// BLOG POSTS
// ============================================================

export interface DBBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  featured_image: string | null;
  author: string;
  status: string;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
}

export async function getBlogPosts() {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return data as DBBlogPost[];
}

export async function getAllBlogPosts() {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return data as DBBlogPost[];
}

export async function getBlogPostBySlug(slug: string) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return data as DBBlogPost;
}

export async function getBlogPostById(id: string) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return data as DBBlogPost;
}

export async function upsertBlogPost(post: {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: string;
  featured_image?: string;
  author?: string;
  status?: string;
  is_featured?: boolean;
  published_at?: string;
}) {
  if (!isSupabaseConfigured()) return { data: null, error: new Error("Supabase not configured") };
  try {
    if (post.id) {
      console.log("[upsertBlogPost] Updating post:", post.id);
      const { id, ...postData } = post;
      const result = await withTimeout(
        supabase.from("blog_posts").update(postData).eq("id", post.id).select(),
        10000
      );
      const rowCount = result.data ? result.data.length : 0;
      console.log("[upsertBlogPost] Update result:", { error: result.error, status: result.status, rowsAffected: rowCount });
      if (rowCount === 0 && !result.error) {
        console.warn("[upsertBlogPost] WARNING: 0 rows updated! RLS policies may be blocking writes.");
        return { data: null, error: new Error("Update failed: 0 rows affected. Your Supabase RLS policies may be blocking writes.") };
      }
      return { data: result.data?.[0] ?? { id: post.id, ...postData } as Record<string, unknown>, error: result.error };
    } else {
      console.log("[upsertBlogPost] Inserting new post");
      const result = await withTimeout(
        supabase.from("blog_posts").insert(post).select().single(),
        10000
      );
      console.log("[upsertBlogPost] Insert result:", { data: result.data, error: result.error, status: result.status });
      return { data: result.data, error: result.error };
    }
  } catch (err) {
    console.error("[upsertBlogPost] Exception:", err);
    return { data: null, error: err instanceof Error ? err : new Error("Unknown error saving blog post") };
  }
}

export async function deleteBlogPost(id: string) {
  if (!isSupabaseConfigured()) return { error: new Error("Supabase not configured") };
  return supabase.from("blog_posts").delete().eq("id", id);
}

// ============================================================
// ENQUIRIES
// ============================================================

export interface DBEnquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  country: string | null;
  products: string[] | null;
  quantity: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export async function getEnquiries() {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching enquiries:", error);
    return [];
  }

  return data as DBEnquiry[];
}

export async function updateEnquiryStatus(id: string, status: string) {
  if (!isSupabaseConfigured()) return { error: new Error("Supabase not configured") };
  return supabase.from("enquiries").update({ status }).eq("id", id);
}

export async function createEnquiry(enquiry: {
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  products?: string[];
  quantity?: string;
  message?: string;
}) {
  if (!isSupabaseConfigured()) return { data: null, error: new Error("Supabase not configured") };
  return supabase.from("enquiries").insert(enquiry).select().single();
}

// ============================================================
// SERVER-SAFE DATA FUNCTIONS
// These create a fresh Supabase client per call so they can
// be used safely in Server Components (no shared singleton).
// Results are cached for 60s so navigating between pages is instant.
// ============================================================

import { unstable_cache } from "next/cache";

/** Revalidation period in seconds — how long cached data is served before refreshing */
const CACHE_TTL = 60;

/** Lightweight listing query — only fetches the columns needed for product cards */
export const serverGetProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const client = createServerSupabaseClient();
    if (!client) return [];

    const { data, error } = await client
      .from("products")
      .select("id, name, slug, category, short_description, image, specifications, is_active, is_featured")
      .eq("is_active", true)
      .order("name");

    if (error) {
      console.error("Error fetching products (server):", error);
      return [];
    }

    return (data as DBProduct[]).map(dbProductToProduct);
  },
  ["products"],
  { revalidate: CACHE_TTL }
);

/** Full product query by slug — fetches all columns for the detail page */
export const serverGetProductBySlug = unstable_cache(
  async (slug: string): Promise<Product | null> => {
    const client = createServerSupabaseClient();
    if (!client) return null;

    const { data, error } = await client
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error) {
      console.error("Error fetching product by slug (server):", error);
      return null;
    }

    return dbProductToProduct(data as DBProduct);
  },
  ["product-by-slug"],
  { revalidate: CACHE_TTL }
);

export async function serverGetProductCount(): Promise<number> {
  // Derive count from the cached products list — no extra DB connection
  const products = await serverGetProducts();
  return products.length;
}

export const serverGetBlogPosts = unstable_cache(
  async (): Promise<DBBlogPost[]> => {
    const client = createServerSupabaseClient();
    if (!client) return [];

    const { data, error } = await client
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts (server):", error);
      return [];
    }

    return data as DBBlogPost[];
  },
  ["blog-posts"],
  { revalidate: CACHE_TTL }
);

export async function serverGetBlogPostBySlug(slug: string): Promise<DBBlogPost | null> {
  // Use the cached blog posts list instead of a separate query
  const posts = await serverGetBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
