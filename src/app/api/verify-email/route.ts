/**
 * API Route : /api/verify-email
 *
 * POST — Vérifie un ou plusieurs emails (auth requise)
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyEmail, verifyEmails, scoreEmail } from "@/lib/engine";
import { requireAuth } from "@/lib/auth/require-auth";

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();

    if (body.email && typeof body.email === "string") {
      const result = await verifyEmail(body.email);
      const score = scoreEmail(body.email);
      return NextResponse.json({ ...result, score });
    }

    if (body.emails && Array.isArray(body.emails)) {
      if (body.emails.length > 100) {
        return NextResponse.json(
          { error: "Maximum 100 emails par requête" },
          { status: 400 }
        );
      }

      const results = await verifyEmails(body.emails);
      const withScores = results.map((r) => ({
        ...r,
        score: scoreEmail(r.email),
      }));

      return NextResponse.json({
        results: withScores,
        summary: {
          total: withScores.length,
          valid: withScores.filter((r) => r.isValid).length,
          invalid: withScores.filter((r) => !r.isValid).length,
        },
      });
    }

    return NextResponse.json(
      { error: "Envoyez { email: '...' } ou { emails: ['...'] }" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur de vérification", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
