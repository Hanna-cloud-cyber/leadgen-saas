import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import crypto from "crypto";

export async function GET() {
  try {
    const { user, supabase, error: authError } = await requireAuth();
    if (authError) return authError;

    const { data: profile } = await supabase
      .from("profiles")
      .select("api_key")
      .eq("id", user.id)
      .single();

    if (!profile?.api_key) {
      return NextResponse.json({ data: { apiKey: null, masked: null } });
    }

    // Mask the key: show first 8 chars + last 4
    const key = profile.api_key;
    const masked = key.substring(0, 12) + "••••••••••••" + key.substring(key.length - 4);

    return NextResponse.json({ data: { masked } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erreur serveur" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const { user, supabase, error: authError } = await requireAuth();
    if (authError) return authError;

    // Generate a new API key
    const apiKey = `lgai_sk_${crypto.randomBytes(24).toString("hex")}`;

    const { error } = await supabase
      .from("profiles")
      .update({ api_key: apiKey, updated_at: new Date().toISOString() })
      .eq("id", user.id);

    if (error) throw error;

    return NextResponse.json({ data: { apiKey } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erreur serveur" }, { status: 500 });
  }
}
