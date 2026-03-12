import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";

export async function GET() {
  try {
    const { user, supabase, error } = await requireAuth();

    if (error || !user) {
      return error ?? NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const userId = user.id;

    // Get profile for quota
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    // Count leads total
    const { count: totalLeads } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    // Count contacts total
    const { count: totalContacts } = await supabase
      .from("contacts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    // Count emails sent
    const { count: totalEmailsSent } = await supabase
      .from("generated_emails")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("sent", true);

    // Count replies
    const { count: totalReplies } = await supabase
      .from("generated_emails")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("replied", true);

    // Leads this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count: leadsThisMonth } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", startOfMonth.toISOString());

    // Leads last month
    const startOfLastMonth = new Date(startOfMonth);
    startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);

    const { count: leadsLastMonth } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", startOfLastMonth.toISOString())
      .lt("created_at", startOfMonth.toISOString());

    // Average lead score
    const { data: scoreData } = await supabase
      .from("leads")
      .select("score")
      .eq("user_id", userId);

    const avgLeadScore =
      scoreData && scoreData.length > 0
        ? Math.round(
            scoreData.reduce((sum: number, l: { score: number }) => sum + l.score, 0) /
              scoreData.length
          )
        : 0;

    // Top sectors
    const { data: sectorData } = await supabase
      .from("leads")
      .select("sector")
      .eq("user_id", userId)
      .not("sector", "is", null);

    const sectorCounts = new Map<string, number>();
    for (const lead of sectorData || []) {
      const s = lead.sector || "Inconnu";
      sectorCounts.set(s, (sectorCounts.get(s) || 0) + 1);
    }
    const totalSectors = sectorData?.length || 1;
    const topSectors = Array.from(sectorCounts.entries())
      .map(([label, count]) => ({
        label,
        count,
        percentage: Math.round((count / totalSectors) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Top countries
    const { data: countryData } = await supabase
      .from("leads")
      .select("country")
      .eq("user_id", userId)
      .not("country", "is", null);

    const countryCounts = new Map<string, number>();
    for (const lead of countryData || []) {
      const c = lead.country || "Inconnu";
      countryCounts.set(c, (countryCounts.get(c) || 0) + 1);
    }
    const totalCountries = countryData?.length || 1;
    const topCountries = Array.from(countryCounts.entries())
      .map(([label, count]) => ({
        label,
        count,
        percentage: Math.round((count / totalCountries) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Searches count (for funnel)
    const { count: searchesCount } = await supabase
      .from("searches")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    // Leads with email count
    const { data: leadsWithEmails } = await supabase
      .from("leads")
      .select("emails")
      .eq("user_id", userId);
    const withEmail =
      leadsWithEmails?.filter(
        (l: { emails: string[] }) => l.emails && l.emails.length > 0
      ).length || 0;

    // Verified emails count
    const { count: emailsVerified } = await supabase
      .from("email_verifications")
      .select("*", { count: "exact", head: true })
      .eq("is_valid", true);

    // Growth rate
    const currentLeads = leadsThisMonth || 0;
    const previousLeads = leadsLastMonth || 0;
    const growthRate =
      previousLeads === 0
        ? currentLeads > 0
          ? 100
          : 0
        : Math.round(((currentLeads - previousLeads) / previousLeads) * 100);

    // Import plan features for quota
    const { getPlan } = await import("@/lib/billing");
    const plan = getPlan(profile?.plan || "free");
    const features = plan?.features;

    return NextResponse.json({
      data: {
        stats: {
          totalLeads: totalLeads || 0,
          totalContacts: totalContacts || 0,
          totalEmailsSent: totalEmailsSent || 0,
          totalReplies: totalReplies || 0,
          leadsThisMonth: currentLeads,
          leadsLastMonth: previousLeads,
          growthRate,
          avgLeadScore,
        },
        topSectors,
        topCountries,
        funnel: {
          searches: searchesCount || 0,
          leadsFound: totalLeads || 0,
          withEmail,
          emailsVerified: emailsVerified || 0,
          emailsSent: totalEmailsSent || 0,
          replies: totalReplies || 0,
        },
        quota: {
          leads: {
            used: profile?.leads_used_this_month || 0,
            limit: features?.leadsPerMonth || 10,
            percentage: features
              ? Math.min(
                  100,
                  Math.round(
                    ((profile?.leads_used_this_month || 0) / features.leadsPerMonth) * 100
                  )
                )
              : 0,
          },
          contacts: {
            used: totalContacts || 0,
            limit: features?.contactsPerMonth || 10,
            percentage: features
              ? Math.min(
                  100,
                  Math.round(((totalContacts || 0) / features.contactsPerMonth) * 100)
                )
              : 0,
          },
          verifications: {
            used: emailsVerified || 0,
            limit: features?.emailVerifications || 50,
            percentage: features
              ? Math.min(
                  100,
                  Math.round(((emailsVerified || 0) / features.emailVerifications) * 100)
                )
              : 0,
          },
          aiEmails: {
            used: totalEmailsSent || 0,
            limit: features?.aiEmails || 5,
            percentage: features
              ? Math.min(
                  100,
                  Math.round(((totalEmailsSent || 0) / features.aiEmails) * 100)
                )
              : 0,
          },
          campaigns: {
            used: 0,
            limit: features?.campaigns || 0,
            percentage: 0,
          },
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    );
  }
}
