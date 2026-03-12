/**
 * API Route : /api/campaigns/[id]
 *
 * GET    — Récupère une campagne avec ses destinataires
 * PUT    — Met à jour une campagne (nom, statut, séquence, settings)
 * DELETE — Supprime une campagne
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { getCampaign, updateCampaign, deleteCampaign, getCampaignRecipients } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;
  const { id } = await params;

  try {
    const [campaign, recipients] = await Promise.all([
      getCampaign(supabase, user.id, id),
      getCampaignRecipients(supabase, id),
    ]);

    return NextResponse.json({
      success: true,
      data: { ...campaign, recipients },
    });
  } catch (error) {
    console.error("Get campaign error:", error);
    return NextResponse.json(
      { error: "Campagne introuvable" },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;
  const { id } = await params;

  try {
    const body = await request.json();

    // Only allow specific fields to be updated
    const allowedFields: Record<string, unknown> = {};
    if (body.name !== undefined) allowedFields.name = body.name;
    if (body.status !== undefined) {
      const validStatuses = ["draft", "active", "paused", "completed", "archived"];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: `Statut invalide. Valeurs acceptées : ${validStatuses.join(", ")}` },
          { status: 400 }
        );
      }
      allowedFields.status = body.status;
      // Set started_at when activating for the first time
      if (body.status === "active") {
        allowedFields.started_at = new Date().toISOString();
      }
    }
    if (body.sequence !== undefined) allowedFields.sequence = body.sequence;
    if (body.settings !== undefined) allowedFields.settings = body.settings;
    if (body.stats !== undefined) allowedFields.stats = body.stats;

    if (Object.keys(allowedFields).length === 0) {
      return NextResponse.json(
        { error: "Aucun champ à mettre à jour" },
        { status: 400 }
      );
    }

    const campaign = await updateCampaign(supabase, user.id, id, allowedFields);
    return NextResponse.json({ success: true, data: campaign });
  } catch (error) {
    console.error("Update campaign error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la campagne" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;
  const { id } = await params;

  try {
    await deleteCampaign(supabase, user.id, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete campaign error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la campagne" },
      { status: 500 }
    );
  }
}
