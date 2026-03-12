/**
 * API Route : /api/contacts
 *
 * POST — Recherche et scrape des contacts individuels (auth + sauvegarde DB)
 * GET  — Récupère les contacts sauvegardés de l'utilisateur
 */

import { NextRequest, NextResponse } from "next/server";
import { runContactPipeline } from "@/lib/engine/contact-pipeline";
import { requireAuth } from "@/lib/auth/require-auth";
import { saveContacts, getContacts } from "@/lib/db";

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;

  try {
    const body = await request.json();
    const { keywords, sector, city, country, maxResults, scrapeTeamPages, guessEmails } = body;

    if (!keywords || typeof keywords !== "string") {
      return NextResponse.json(
        { error: "Le champ 'keywords' est requis (ex: 'directeur commercial', 'agent immobilier')" },
        { status: 400 }
      );
    }

    const result = await runContactPipeline({
      query: {
        keywords,
        sector,
        city,
        country: country || "France",
        maxResults: Math.min(maxResults || 20, 50),
      },
      scrapeTeamPages: scrapeTeamPages !== false,
      guessEmails: guessEmails !== false,
      verifyGuesses: true,
    });

    // Sauvegarder en DB
    try {
      await saveContacts(supabase, user.id, result.contacts);
    } catch (dbError) {
      console.error("DB save error (non-blocking):", dbError);
    }

    return NextResponse.json({
      success: true,
      data: {
        contacts: result.contacts,
        stats: result.stats,
      },
    });
  } catch (error) {
    console.error("Contact pipeline error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche de contacts", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const contacts = await getContacts(supabase, user.id, { limit, offset });

    return NextResponse.json({
      success: true,
      data: { contacts },
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des contacts" },
      { status: 500 }
    );
  }
}
