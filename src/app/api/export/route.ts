/**
 * API Route : /api/export
 *
 * POST — Exporte des leads ou contacts en CSV/JSON (auth requise)
 */

import { NextRequest, NextResponse } from "next/server";
import { leadsToCSV, leadsToJSON, contactsToCSV, contactsToJSON } from "@/lib/export";
import { requireAuth } from "@/lib/auth/require-auth";

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const { type, data, format = "csv", excelCompatible = true } = body;

    if (!type || !data || !Array.isArray(data)) {
      return NextResponse.json(
        { error: "Champs requis : type ('leads'|'contacts'), data (array)" },
        { status: 400 }
      );
    }

    let content: string;
    let contentType: string;
    let filename: string;

    const timestamp = new Date().toISOString().split("T")[0];

    if (type === "leads" && format === "csv") {
      content = leadsToCSV(data, { excelCompatible, separator: excelCompatible ? ";" : "," });
      contentType = "text/csv; charset=utf-8";
      filename = `leads_${timestamp}.csv`;
    } else if (type === "leads" && format === "json") {
      content = leadsToJSON(data);
      contentType = "application/json; charset=utf-8";
      filename = `leads_${timestamp}.json`;
    } else if (type === "contacts" && format === "csv") {
      content = contactsToCSV(data, { excelCompatible, separator: excelCompatible ? ";" : "," });
      contentType = "text/csv; charset=utf-8";
      filename = `contacts_${timestamp}.csv`;
    } else if (type === "contacts" && format === "json") {
      content = contactsToJSON(data);
      contentType = "application/json; charset=utf-8";
      filename = `contacts_${timestamp}.json`;
    } else {
      return NextResponse.json({ error: "Format invalide" }, { status: 400 });
    }

    return new NextResponse(content, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur d'export", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
