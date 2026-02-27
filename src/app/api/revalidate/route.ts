import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand revalidation endpoint for admin panel.
 * POST /api/revalidate
 *
 * Revalidates the news pages so the next page load
 * fetches fresh data from Supabase.
 */
export async function POST() {
  revalidatePath("/news", "page");
  revalidatePath("/", "page");
  return NextResponse.json({ revalidated: true });
}
