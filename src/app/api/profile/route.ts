/**
 * API Route : /api/profile
 *
 * GET  — Récupère le profil de l'utilisateur connecté
 * PUT  — Met à jour le profil
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { getProfile, updateProfile } from "@/lib/db";

export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;

  try {
    const profile = await getProfile(supabase, user.id);
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du profil" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;

  try {
    const body = await request.json();
    const { full_name, company_name } = body;

    const profile = await updateProfile(supabase, user.id, {
      full_name,
      company_name,
    });

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du profil" },
      { status: 500 }
    );
  }
}
