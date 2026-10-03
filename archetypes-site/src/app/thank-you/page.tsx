import type { Metadata } from "next";
import Link from "next/link";
import { CrownIcon } from "@/components/Icons";
import { Rule } from "@/components/SiteChrome";
import { getPaidSession } from "@/lib/stripe";
import { store } from "@/data";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default async function ThankYou({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const session = await getPaidSession(session_id);
  const email = session?.customer_details?.email;

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center min-h-[70vh]">
      <CrownIcon size={64} className="mx-auto" />
      {session ? (
        <>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-6">
            <span className="text-gold">Welcome, </span>
            <span className="text-rose">Queen.</span>
          </h1>
          <Rule className="max-w-xs mx-auto mt-6" />
          <p className="text-muted mt-6 leading-relaxed">
            Your copy of <span className="text-cream">{store.productName}</span> is ready.
            {email && <> A receipt has been sent to <span className="text-cream">{email}</span>.</>}
          </p>
          <a
            href={`/api/download?session_id=${encodeURIComponent(session.id)}`}
            className="btn-gold px-10 py-4 text-sm mt-10"
          >
            Download my guide (PDF)
          </a>
          <p className="text-xs text-muted mt-6">
            Bookmark this page to download again later. Trouble downloading? Email{" "}
            <a href={`mailto:${store.supportEmail}`} className="underline underline-offset-4">{store.supportEmail}</a>.
          </p>
        </>
      ) : (
        <>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-6 text-gold">We couldn&apos;t find your order</h1>
          <p className="text-muted mt-6 leading-relaxed">
            If you just paid, refresh this page in a few seconds. Still nothing? Email{" "}
            <a href={`mailto:${store.supportEmail}`} className="underline underline-offset-4">{store.supportEmail}</a>{" "}
            with your receipt and we&apos;ll send your guide right away.
          </p>
          <Link href="/" className="btn-ghost px-8 py-3 text-sm mt-10">Back to home</Link>
        </>
      )}
    </main>
  );
}
