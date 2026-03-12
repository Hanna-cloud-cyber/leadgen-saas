/**
 * API Route : /api/enrich
 *
 * POST — Enrichit un lead existant avec plus de données (auth requise)
 */

import { NextRequest, NextResponse } from "next/server";
import { enrichLead } from "@/lib/engine";
import { requireAuth } from "@/lib/auth/require-auth";
import type { Lead } from "@/types/lead";

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const { lead } = body;

    if (!lead || !lead.website) {
      return NextResponse.json(
        { error: "Un lead avec un website est requis" },
        { status: 400 }
      );
    }

    const enriched = await enrichLead(lead as Lead);

    return NextResponse.json({ lead: enriched });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur d'enrichissement", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
