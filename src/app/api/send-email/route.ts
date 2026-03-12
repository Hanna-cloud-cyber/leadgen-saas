/**
 * API Route : /api/send-email
 *
 * POST — Envoie un email via SMTP (auth + sauvegarde DB)
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { saveGeneratedEmail } from "@/lib/db";
import { sendEmail } from "@/lib/email/sender";

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;

  try {
    const body = await request.json();
    const { to, subject, body: emailBody, tone, leadId } = body;

    if (!to || !subject || !emailBody) {
      return NextResponse.json(
        { error: "Champs requis : to, subject, body" },
        { status: 400 }
      );
    }

    // Convert plain text body to HTML (replace newlines with <br>)
    const html = emailBody.replace(/\n/g, "<br>");

    // Save to DB first to get the tracking ID
    let emailRecord;
    try {
      const saved = await saveGeneratedEmail(supabase, user.id, {
        leadId: leadId || undefined,
        toEmail: to,
        subject,
        body: emailBody,
        tone: tone || "friendly",
      });
      emailRecord = saved?.[0];
    } catch (dbError) {
      console.error("DB save error (non-blocking):", dbError);
    }

    // Send the email with optional open tracking
    const result = await sendEmail({
      to,
      subject,
      html,
      trackingId: emailRecord?.id,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Erreur d'envoi", details: result.error },
        { status: 500 }
      );
    }

    // Mark as sent in DB
    if (emailRecord?.id) {
      try {
        await supabase
          .from("generated_emails")
          .update({ sent: true })
          .eq("id", emailRecord.id);
      } catch (updateError) {
        console.error("DB update error (non-blocking):", updateError);
      }
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur d'envoi", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
