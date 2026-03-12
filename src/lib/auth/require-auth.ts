/**
 * Helper pour protéger les API routes — vérifie l'authentification
 */

import { NextResponse } from "next/server";
import { createSupabaseServer } from "./supabase-server";

export async function requireAuth() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      user: null,
      supabase,
      error: NextResponse.json(
        { error: "Non authentifié. Connectez-vous pour accéder à cette ressource." },
        { status: 401 }
      ),
    };
  }

  return { user, supabase, error: null };
}
