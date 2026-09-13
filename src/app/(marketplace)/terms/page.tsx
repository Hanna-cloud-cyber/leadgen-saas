import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="mp-container py-16 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight text-mp-ink mb-6">Terms of Service</h1>
      <div className="space-y-5 text-[14px] text-mp-ink-2 leading-relaxed">
        <p>These placeholder Terms of Service govern access to and use of the Veridian marketplace platform. By creating an account or using the platform, you agree to these terms.</p>
        <h2 className="text-lg font-semibold text-mp-ink pt-2">1. Marketplace Role</h2>
        <p>Veridian connects buyers and suppliers directly. Veridian is not a party to any transaction, quote or agreement made between buyers and suppliers through the platform.</p>
        <h2 className="text-lg font-semibold text-mp-ink pt-2">2. Supplier Verification</h2>
        <p>Verification indicates a supplier has completed Veridian&apos;s identity and business documentation review at the time of approval. It is not a guarantee of product quality or business performance.</p>
        <h2 className="text-lg font-semibold text-mp-ink pt-2">3. Lead Credits</h2>
        <p>Lead credits purchased by suppliers are used to unlock buyer requests and are non-refundable once a request has been unlocked.</p>
        <h2 className="text-lg font-semibold text-mp-ink pt-2">4. Account Responsibilities</h2>
        <p>Users are responsible for the accuracy of information provided on their profile and in communications with other users.</p>
      </div>
    </div>
  );
}
