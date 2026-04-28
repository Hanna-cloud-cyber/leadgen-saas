/**
 * API Route : /api/energy-us
 *
 * POST — Lance une recherche de leads B2B dans le secteur Énergie US.
 * Body :
 *   {
 *     subSectorId: string,        // ex: "solar_residential"
 *     state?: string,             // ex: "CA"
 *     city?: string,
 *     extraKeywords?: string[],
 *     excludeKeywords?: string[],
 *     maxPerQuery?: number,
 *     maxQueries?: number,
 *     scrapeDirectories?: boolean,
 *     verify?: boolean,
 *   }
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { runEnergyUsPipeline } from "@/lib/engine/energy-pipeline";
import { ENERGY_US_SUBSECTORS, getEnergySubSector, getUsState } from "@/lib/engine/energy-us";
import {
  saveLeads,
  saveSearch,
  incrementLeadsUsed,
  getProfile,
} from "@/lib/db";
import { checkQuota } from "@/lib/billing";

export const maxDuration = 300; // 5 min — pipeline lourd

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;

  try {
    // Quotas
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
    const {
      subSectorId,
      state,
      city,
      extraKeywords,
      excludeKeywords,
      maxPerQuery,
      maxQueries,
      scrapeDirectories,
      verify,
    } = body;

    // Validation
    const sector = getEnergySubSector(subSectorId);
    if (!sector) {
      return NextResponse.json(
        {
          error: "Sous-secteur invalide. Choisis parmi la liste retournée par GET.",
          available: ENERGY_US_SUBSECTORS.map((s) => ({ id: s.id, name: s.name })),
        },
        { status: 400 }
      );
    }

    if (state && !getUsState(state)) {
      return NextResponse.json(
        { error: `État US inconnu : "${state}". Utilise un code à 2 lettres (ex: CA).` },
        { status: 400 }
      );
    }

    const startTime = Date.now();

    const result = await runEnergyUsPipeline({
      subSectorId,
      state,
      city,
      extraKeywords: Array.isArray(extraKeywords) ? extraKeywords : undefined,
      excludeKeywords: Array.isArray(excludeKeywords) ? excludeKeywords : undefined,
      maxPerQuery: typeof maxPerQuery === "number" ? Math.min(maxPerQuery, 20) : undefined,
      maxQueries: typeof maxQueries === "number" ? Math.min(maxQueries, 8) : undefined,
      scrapeDirectories: scrapeDirectories !== false,
      verify: verify !== false,
    });

    const duration = Date.now() - startTime;

    // Persist (best-effort)
    try {
      await saveLeads(supabase, user.id, result.leads);
      await saveSearch(supabase, user.id, {
        keywords: `[Energy/${sector.id}] ${sector.name}`,
        city: city ?? undefined,
        country: state ? `US-${state}` : "United States",
        resultsCount: result.stats.sitesFound,
        leadsFound: result.stats.leadsGenerated,
        emailsFound: result.stats.emailsFound,
        durationMs: duration,
      });
      await incrementLeadsUsed(supabase, user.id, result.leads.length);
    } catch (err) {
      console.error("DB save error (non-blocking):", err);
    }

    return NextResponse.json({
      success: true,
      data: {
        leads: result.leads,
        stats: result.stats,
        sector: { id: sector.id, name: sector.name },
        state: state ?? null,
      },
    });
  } catch (error) {
    console.error("Energy-US pipeline error:", error);
    return NextResponse.json(
      {
        error: "Erreur dans le pipeline Énergie US",
        details: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 }
    );
  }
}

/**
 * GET — liste les sous-secteurs disponibles (pour alimenter l'UI).
 */
export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  return NextResponse.json({
    success: true,
    data: {
      subSectors: ENERGY_US_SUBSECTORS.map((s) => ({
        id: s.id,
        name: s.name,
        icon: s.icon,
        description: s.description,
        naics: s.naics,
        directoriesCount: s.directories?.length ?? 0,
      })),
    },
  });
}
