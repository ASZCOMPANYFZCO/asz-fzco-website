import { supabase, isSupabaseConfigured } from "./supabase";

const BUCKET_NAME = "images";
const MAX_IMAGE_WIDTH = 1200;
const MAX_IMAGE_HEIGHT = 1200;
const WEBP_QUALITY = 0.8;

/**
 * Compress and resize an image using Canvas API.
 * Converts to WebP (or JPEG fallback) and reduces file size dramatically.
 */
export function compressImage(
  file: File,
  options?: { maxWidth?: number; maxHeight?: number; quality?: number }
): Promise<Blob> {
  const maxW = options?.maxWidth ?? MAX_IMAGE_WIDTH;
  const maxH = options?.maxHeight ?? MAX_IMAGE_HEIGHT;
  const quality = options?.quality ?? WEBP_QUALITY;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;

      // Scale down to fit within max dimensions
      if (width > maxW || height > maxH) {
        const ratio = Math.min(maxW / width, maxH / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Try WebP first, fall back to JPEG
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            // Fallback to JPEG if WebP not supported
            canvas.toBlob(
              (jpegBlob) => {
                if (jpegBlob) {
                  resolve(jpegBlob);
                } else {
                  reject(new Error("Failed to compress image"));
                }
              },
              "image/jpeg",
              0.85
            );
          }
        },
        "image/webp",
        quality
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Upload an image to Supabase Storage.
 * Compresses the image first, then uploads to the specified folder.
 * Returns the public URL of the uploaded image.
 */
export async function uploadImage(
  file: File,
  folder: string
): Promise<string> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  // Compress the image
  console.log(`[uploadImage] Compressing ${file.name} (${(file.size / 1024).toFixed(0)}KB)...`);
  const blob = await compressImage(file);
  console.log(`[uploadImage] Compressed to ${(blob.size / 1024).toFixed(0)}KB`);

  // Generate unique filename
  const ext = blob.type === "image/webp" ? "webp" : "jpg";
  const filename = `${folder}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

  // Upload to Supabase Storage
  console.log(`[uploadImage] Uploading to ${BUCKET_NAME}/${filename}...`);
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filename, blob, {
      contentType: blob.type,
      upsert: false,
    });

  if (error) {
    console.error("[uploadImage] Upload failed:", error);
    throw new Error(`Image upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filename);

  const publicUrl = urlData.publicUrl;
  console.log("[uploadImage] Upload complete:", publicUrl);

  // Verify the public URL is actually accessible
  try {
    const check = await fetch(publicUrl, { method: "HEAD" });
    if (!check.ok) {
      console.error(
        `[uploadImage] WARNING: Public URL returned ${check.status}. ` +
        `The '${BUCKET_NAME}' bucket may not be set to public. ` +
        `Go to Supabase Dashboard → Storage → ${BUCKET_NAME} bucket → Settings → toggle "Public bucket" ON.`
      );
      throw new Error(
        `Image uploaded but not publicly accessible (HTTP ${check.status}). ` +
        `Please ensure the "${BUCKET_NAME}" storage bucket is set to PUBLIC in your Supabase Dashboard.`
      );
    }
  } catch (err) {
    if (err instanceof Error && err.message.includes("not publicly accessible")) {
      throw err;
    }
    // Network error during verification — image may still be accessible
    console.warn("[uploadImage] Could not verify public URL (non-critical):", err);
  }

  return publicUrl;
}

/**
 * Delete an image from Supabase Storage (best-effort).
 * Only deletes if the URL is a Supabase Storage URL.
 */
export async function deleteImage(url: string): Promise<void> {
  if (!isSupabaseConfigured() || !isStorageUrl(url)) return;

  try {
    // Extract file path from the full URL
    const match = url.match(/\/object\/public\/[^/]+\/(.+)$/);
    if (!match) return;

    const filePath = match[1];
    await supabase.storage.from(BUCKET_NAME).remove([filePath]);
    console.log("[deleteImage] Deleted:", filePath);
  } catch (err) {
    console.warn("[deleteImage] Failed to delete (non-critical):", err);
  }
}

/**
 * Check if a URL is a Supabase Storage URL.
 */
export function isStorageUrl(url: string): boolean {
  return url.includes(".supabase.co/storage/");
}

/**
 * Check if a string is a base64-encoded image.
 */
export function isBase64(url: string): boolean {
  return url.startsWith("data:image/");
}

/**
 * Diagnose Supabase Storage configuration.
 * Returns an object with the status of each check.
 */
export async function checkStorageHealth(): Promise<{
  configured: boolean;
  bucketExists: boolean;
  bucketPublic: boolean;
  canUpload: boolean;
  error?: string;
}> {
  if (!isSupabaseConfigured()) {
    return { configured: false, bucketExists: false, bucketPublic: false, canUpload: false, error: "Supabase not configured" };
  }

  // Check if bucket exists by listing buckets
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    return { configured: true, bucketExists: false, bucketPublic: false, canUpload: false, error: `Cannot list buckets: ${listError.message}` };
  }

  const bucket = buckets?.find((b: { id: string; public: boolean }) => b.id === BUCKET_NAME);
  if (!bucket) {
    return {
      configured: true,
      bucketExists: false,
      bucketPublic: false,
      canUpload: false,
      error: `Bucket "${BUCKET_NAME}" not found. Create it in Supabase Dashboard → Storage → New Bucket (name: "${BUCKET_NAME}", toggle Public ON).`,
    };
  }

  // Check if bucket is public
  const isPublic = bucket.public;

  // Try uploading a tiny test file
  const testPath = `_health-check/${Date.now()}.txt`;
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(testPath, new Blob(["test"], { type: "text/plain" }), { upsert: true });

  let canUpload = !uploadError;
  let publicAccessible = false;

  if (canUpload) {
    // Check public accessibility
    const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(testPath);
    try {
      const res = await fetch(urlData.publicUrl, { method: "HEAD" });
      publicAccessible = res.ok;
    } catch {
      // fetch failed
    }

    // Clean up test file
    await supabase.storage.from(BUCKET_NAME).remove([testPath]);
  }

  if (!canUpload) {
    return {
      configured: true,
      bucketExists: true,
      bucketPublic: isPublic,
      canUpload: false,
      error: `Upload failed: ${uploadError?.message}. Check RLS policies on storage.objects for the "${BUCKET_NAME}" bucket.`,
    };
  }

  if (!publicAccessible) {
    return {
      configured: true,
      bucketExists: true,
      bucketPublic: false,
      canUpload: true,
      error: `Bucket "${BUCKET_NAME}" exists and uploads work, but images are NOT publicly accessible. Go to Supabase Dashboard → Storage → "${BUCKET_NAME}" → Settings → toggle "Public bucket" ON.`,
    };
  }

  return { configured: true, bucketExists: true, bucketPublic: true, canUpload: true };
}
