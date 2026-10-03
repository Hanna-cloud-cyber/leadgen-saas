import { NextRequest, NextResponse } from "next/server";
import { getPaidSession } from "@/lib/stripe";

// Only buyers with a paid Stripe session are redirected to the PDF, so the
// real file URL never appears on the site.
export async function GET(req: NextRequest) {
  const session = await getPaidSession(req.nextUrl.searchParams.get("session_id"));
  const fileUrl = process.env.ARCHETYPES_DOWNLOAD_URL;

  if (!session) {
    return NextResponse.json({ error: "Payment not found." }, { status: 403 });
  }
  if (!fileUrl) {
    return NextResponse.json(
      { error: "The download isn't available yet — please contact support." },
      { status: 503 }
    );
  }
  return NextResponse.redirect(fileUrl);
}
