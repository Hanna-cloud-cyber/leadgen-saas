/**
 * API Route : /api/generate-email
 *
 * POST — Génère un email de prospection personnalisé via IA (auth + sauvegarde DB)
 */

import { NextRequest, NextResponse } from "next/server";
import { generateProspectionEmail, generateEmailVariations } from "@/lib/engine";
import { requireAuth } from "@/lib/auth/require-auth";
import { saveGeneratedEmail } from "@/lib/db";
import type { Lead } from "@/types/lead";

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;

  try {
    const body = await request.json();
    const { lead, senderName, senderCompany, senderOffer, tone, variations } = body;

    if (!lead || !senderName || !senderCompany || !senderOffer) {
      return NextResponse.json(
        { error: "Champs requis : lead, senderName, senderCompany, senderOffer" },
        { status: 400 }
      );
    }

    const typedLead: Lead = lead;

    if (variations && typeof variations === "number") {
      const emails = await generateEmailVariations(
        { lead: typedLead, senderName, senderCompany, senderOffer, tone: tone || "friendly" },
        Math.min(variations, 3)
      );

      // Sauvegarder les variations
      try {
        for (const email of emails) {
          await saveGeneratedEmail(supabase, user.id, {
            leadId: lead.id,
            toEmail: email.to,
            subject: email.subject,
            body: email.body,
            tone: email.tone,
          });
        }
      } catch (dbError) {
        console.error("DB save error (non-blocking):", dbError);
      }

      return NextResponse.json({ variations: emails });
    }

    const email = await generateProspectionEmail({
      lead: typedLead, senderName, senderCompany, senderOffer, tone: tone || "friendly",
    });

    // Sauvegarder
    try {
      await saveGeneratedEmail(supabase, user.id, {
        leadId: lead.id,
        toEmail: email.to,
        subject: email.subject,
        body: email.body,
        tone: email.tone,
      });
    } catch (dbError) {
      console.error("DB save error (non-blocking):", dbError);
    }

    return NextResponse.json({ email });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur de génération", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
