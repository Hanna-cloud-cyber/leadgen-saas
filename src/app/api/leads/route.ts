/**
 * API Route : /api/leads
 *
 * POST — Lance une recherche de leads (auth + sauvegarde DB)
 * GET  — Récupère les leads sauvegardés de l'utilisateur
 */

import { NextRequest, NextResponse } from "next/server";
import { runPipeline } from "@/lib/engine";
import { requireAuth } from "@/lib/auth/require-auth";
import { saveLeads, saveSearch, getLeads, getLeadCount, incrementLeadsUsed, getProfile } from "@/lib/db";
import { checkQuota } from "@/lib/billing";

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;

  try {
    // Vérifier les quotas
    const profile = await getProfile(supabase, user.id);
    const quota = checkQuota(profile.plan, {
      leadsUsed: profile.leads_used_this_month,
      contactsUsed: 0,
      verificationsUsed: 0,
      aiEmailsUsed: 0,
      campaignsActive: 0,
    });
    if (!quota.allowed) {
      return NextResponse.json(
        { error: quota.reason, limit: quota.limit, used: quota.used },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { keywords, city, country, maxResults, generateEmails, emailOptions } = body;

    if (!keywords || typeof keywords !== "string") {
      return NextResponse.json(
        { error: "Le champ 'keywords' est requis (ex: 'agence immobilière')" },
        { status: 400 }
      );
    }

    const startTime = Date.now();

    const result = await runPipeline({
      query: {
        keywords,
        city,
        country: country || "France",
        maxResults: Math.min(maxResults || 20, 50),
      },
      verifyEmails: true,
      enrichLeads: true,
      generateEmails: generateEmails || false,
      emailOptions,
    });

    const duration = Date.now() - startTime;

    // Sauvegarder en DB (best effort)
    try {
      await saveLeads(supabase, user.id, result.leads);
      await saveSearch(supabase, user.id, {
        keywords,
        city,
        country: country || "France",
        resultsCount: result.stats.sitesFound,
        leadsFound: result.stats.leadsGenerated,
        emailsFound: result.stats.emailsFound,
        durationMs: duration,
      });
      await incrementLeadsUsed(supabase, user.id, result.leads.length);
    } catch (dbError) {
      console.error("DB save error (non-blocking):", dbError);
    }

    return NextResponse.json({
      success: true,
      data: {
        leads: result.leads,
        emails: result.emails,
        stats: result.stats,
      },
    });
  } catch (error) {
    console.error("Pipeline error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération de leads", details: error instanceof Error ? error.message : "Unknown" },
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
    const status = searchParams.get("status") || undefined;

    const [leads, totalCount] = await Promise.all([
      getLeads(supabase, user.id, { limit, offset, status }),
      getLeadCount(supabase, user.id),
    ]);

    return NextResponse.json({
      success: true,
      data: { leads, total: totalCount },
    });
  } catch (error) {
    console.error("Get leads error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des leads" },
      { status: 500 }
    );
  }
}
