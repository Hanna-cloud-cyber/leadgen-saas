import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/funnel/lead-capture
 *
 * Capture leads from the sales funnel contact form.
 * Stores in Supabase (when configured) and sends notification.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, industry, leadsPerMonth, countries, message } = body;

    // Basic validation
    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Name, email, and company are required" },
        { status: 400 }
      );
    }

    // Simple email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Log the lead (in production, save to Supabase)
    const lead = {
      name,
      email,
      company,
      industry: industry || "not specified",
      leadsPerMonth: leadsPerMonth || "not specified",
      countries: countries || "not specified",
      message: message || "",
      source: "sales-funnel",
      createdAt: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    // TODO: Save to Supabase when configured
    // const supabase = createServerClient();
    // await supabase.from('funnel_leads').insert(lead);

    console.log("[Funnel Lead Captured]", JSON.stringify(lead, null, 2));

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll get back to you within 24 hours.",
    });
  } catch {
    console.error("[Funnel Lead Capture Error]");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
