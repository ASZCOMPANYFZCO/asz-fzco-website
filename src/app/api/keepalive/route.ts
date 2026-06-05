import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

/**
 * Keep-alive endpoint — called daily by Vercel Cron (see vercel.json).
 *
 * Runs a real database query so Supabase counts the project as active,
 * preventing the free-tier auto-pause after 7 days of idle.
 *
 * Why this lives in Vercel rather than GitHub Actions: GH Actions ubuntu
 * runners use Azure's DNS resolver, which consistently fails to resolve
 * Supabase project subdomains. Vercel runs from the same network that
 * serves the website, so connectivity is already proven.
 *
 * Optional hardening: set CRON_SECRET in Vercel env vars and the route
 * will only respond to requests carrying the matching bearer token,
 * which Vercel Cron sends automatically. If unset, the endpoint is
 * public (safe — it only returns a product count).
 */

// Skip all Next.js caching so every cron call is a real DB query.
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const client = createServerSupabaseClient();
  if (!client) {
    return NextResponse.json(
      { ok: false, error: "Supabase env vars missing" },
      { status: 500 }
    );
  }

  const { count, error } = await client
    .from("products")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("[keepalive] Supabase query failed:", error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    productCount: count ?? 0,
    timestamp: new Date().toISOString(),
  });
}
