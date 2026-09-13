import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="mp-container py-16 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight text-mp-ink mb-6">Privacy Policy</h1>
      <div className="space-y-5 text-[14px] text-mp-ink-2 leading-relaxed">
        <p>This placeholder Privacy Policy describes how Veridian collects and uses information when you use the marketplace platform.</p>
        <h2 className="text-lg font-semibold text-mp-ink pt-2">Information We Collect</h2>
        <p>Account details, company information, messages exchanged on the platform, and usage data needed to operate search, matching and analytics features.</p>
        <h2 className="text-lg font-semibold text-mp-ink pt-2">How We Use Information</h2>
        <p>To operate the marketplace, match buyers with relevant suppliers, process subscriptions and lead credits, and improve platform features such as AI Supplier Match.</p>
        <h2 className="text-lg font-semibold text-mp-ink pt-2">Sharing With Other Users</h2>
        <p>Contact details are shared with a supplier only when a buyer submits an RFQ or initiates a conversation, or when a supplier unlocks a buyer lead using credits.</p>
      </div>
    </div>
  );
}
