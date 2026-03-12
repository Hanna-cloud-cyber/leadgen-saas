/**
 * API Route : /api/campaigns
 *
 * GET  — Liste les campagnes de l'utilisateur
 * POST — Crée une nouvelle campagne
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { getCampaigns, saveCampaign } from "@/lib/db";

export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;

  try {
    const campaigns = await getCampaigns(supabase, user.id);
    return NextResponse.json({ success: true, data: campaigns });
  } catch (error) {
    console.error("Get campaigns error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des campagnes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;

  try {
    const body = await request.json();
    const { name, sequence, settings } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Le champ 'name' est requis" },
        { status: 400 }
      );
    }

    const campaign = await saveCampaign(supabase, user.id, {
      name,
      sequence: sequence || [],
      settings: settings || {},
    });

    return NextResponse.json({ success: true, data: campaign }, { status: 201 });
  } catch (error) {
    console.error("Create campaign error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la campagne" },
      { status: 500 }
    );
  }
}
