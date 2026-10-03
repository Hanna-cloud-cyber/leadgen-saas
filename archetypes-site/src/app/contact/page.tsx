import type { Metadata } from "next";
import { HeartIcon } from "@/components/Icons";
import { Rule } from "@/components/SiteChrome";
import { store } from "@/data";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center min-h-[60vh]">
      <HeartIcon size={56} className="mx-auto" />
      <h1 className="font-display text-4xl font-bold mt-6">
        <span className="text-gold">We&apos;re here </span>
        <span className="text-rose">for you</span>
      </h1>
      <Rule className="max-w-xs mx-auto mt-6" />
      <p className="text-muted mt-6 leading-relaxed">
        Questions about the guide, your download, or a refund? Write to us — we answer every email within one business
        day (Monday–Friday, U.S. Eastern Time).
      </p>
      <a href={`mailto:${store.supportEmail}`} className="btn-gold px-10 py-4 text-sm mt-10">
        {store.supportEmail}
      </a>
      <p className="text-xs text-muted mt-8">
        Lost your download link? Include the email you used at checkout and we&apos;ll resend it.
      </p>
    </main>
  );
}
