import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { store } from "@/data";

export const metadata: Metadata = { title: "Terms of Service" };

export default function Terms() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        These Terms govern your use of this website and your purchase of {store.productName} (the
        &ldquo;Guide&rdquo;) from {store.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By purchasing or using the
        site, you agree to these Terms.
      </p>
      <h2>1. The product</h2>
      <p>
        The Guide is a digital product delivered as a downloadable PDF. No physical item is shipped. Access is
        provided immediately after successful payment.
      </p>
      <h2>2. Pricing and payment</h2>
      <p>
        All prices are in U.S. dollars. Payments are processed securely by Stripe. Applicable sales tax, if any, is
        shown at checkout. We may change prices at any time, but changes do not affect completed orders.
      </p>
      <h2>3. License</h2>
      <p>
        On purchase, you receive a personal, non-exclusive, non-transferable license to download and read the Guide
        for your own non-commercial use. You may not resell, share, redistribute, publicly post, or reproduce the
        Guide or any part of it without our written permission.
      </p>
      <h2>4. Refunds</h2>
      <p>
        Purchases are covered by our {store.refundDays}-day money-back guarantee, described in our{" "}
        <a href="/refund-policy">Refund Policy</a>.
      </p>
      <h2>5. Not professional advice</h2>
      <p>
        The Guide and the free quiz are for educational, entertainment, and self-reflection purposes only. They are
        not psychological, medical, or therapeutic advice. See our <a href="/disclaimer">Disclaimer</a>.
      </p>
      <h2>6. Intellectual property</h2>
      <p>
        All content on this site and in the Guide — text, design, graphics, and the archetype system — is owned by{" "}
        {store.legalName} and protected by U.S. and international copyright and trademark laws.
      </p>
      <h2>7. Disclaimer of warranties &amp; limitation of liability</h2>
      <p>
        The site and Guide are provided &ldquo;as is&rdquo; without warranties of any kind. To the fullest extent
        permitted by law, our total liability for any claim relating to the Guide is limited to the amount you paid
        for it.
      </p>
      <h2>8. Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of {store.governingState}, without regard to its conflict
        of law rules.
      </p>
      <h2>9. Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${store.supportEmail}`}>{store.supportEmail}</a>.
      </p>
    </LegalPage>
  );
}
