/**
 * API Route : /api/campaigns/[id]/recipients
 *
 * GET  — Liste les destinataires d'une campagne
 * POST — Ajoute des destinataires à une campagne
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { getCampaign, getCampaignRecipients, addCampaignRecipients } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;
  const { id } = await params;

  try {
    // Verify the campaign belongs to the user
    await getCampaign(supabase, user.id, id);

    const recipients = await getCampaignRecipients(supabase, id);
    return NextResponse.json({ success: true, data: recipients });
  } catch (error) {
    console.error("Get recipients error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des destinataires" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;
  const { id } = await params;

  try {
    // Verify the campaign belongs to the user
    await getCampaign(supabase, user.id, id);

    const body = await request.json();
    const { recipients } = body;

    if (!Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { error: "Le champ 'recipients' doit être un tableau non vide" },
        { status: 400 }
      );
    }

    // Validate each recipient has an email
    for (const r of recipients) {
      if (!r.email || typeof r.email !== "string") {
        return NextResponse.json(
          { error: "Chaque destinataire doit avoir un champ 'email' valide" },
          { status: 400 }
        );
      }
    }

    const data = await addCampaignRecipients(supabase, id, recipients);
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("Add recipients error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout des destinataires" },
      { status: 500 }
    );
  }
}
