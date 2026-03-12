/**
 * API Route : /api/track/open
 *
 * GET — Tracking pixel pour détecter l'ouverture d'un email
 * Retourne un GIF 1x1 transparent
 */

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/auth/supabase-server";

// 1x1 transparent GIF in base64
const TRANSPARENT_GIF = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (id) {
    try {
      const supabase = await createSupabaseAdmin();
      await supabase
        .from("generated_emails")
        .update({ opened: true })
        .eq("id", id);
    } catch (error) {
      console.error("Track open error:", error);
    }
  }

  return new NextResponse(TRANSPARENT_GIF, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
