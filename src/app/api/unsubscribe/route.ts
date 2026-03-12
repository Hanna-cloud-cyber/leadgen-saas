import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return new NextResponse(renderPage("Lien invalide", "Ce lien de désinscription est invalide."), {
      headers: { "Content-Type": "text/html" },
    });
  }

  // Use service role to update without auth
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from("campaign_recipients")
    .update({
      status: "unsubscribed",
      unsubscribed_at: new Date().toISOString(),
    })
    .eq("id", token);

  if (error) {
    return new NextResponse(renderPage("Erreur", "Une erreur est survenue. Veuillez réessayer."), {
      headers: { "Content-Type": "text/html" },
    });
  }

  return new NextResponse(
    renderPage(
      "Désinscription confirmée",
      "Vous avez été retiré de cette liste de diffusion. Vous ne recevrez plus d'emails de cette campagne."
    ),
    { headers: { "Content-Type": "text/html" } }
  );
}

function renderPage(title: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - LeadGen AI</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0f; color: #e5e7eb; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { background: #111827; border: 1px solid #1f2937; border-radius: 16px; padding: 48px; max-width: 480px; text-align: center; }
    h1 { font-size: 24px; margin-bottom: 16px; }
    p { color: #9ca3af; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;
}
