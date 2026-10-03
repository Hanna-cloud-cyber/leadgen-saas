import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { store } from "@/data";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPolicy() {
  return (
    <LegalPage title="Refund Policy">
      <h2>{store.refundDays}-day money-back guarantee</h2>
      <p>
        We want you to love {store.productName}. If you&apos;re not satisfied for any reason, email us within{" "}
        {store.refundDays} days of your purchase and we&apos;ll issue a full refund. No questions asked.
      </p>
      <h2>How to request a refund</h2>
      <ul>
        <li>
          Email <a href={`mailto:${store.supportEmail}`}>{store.supportEmail}</a> from the address you used at checkout
        </li>
        <li>Include your order date or Stripe receipt number</li>
      </ul>
      <p>
        Refunds are issued to your original payment method, usually within 5–10 business days depending on your bank.
      </p>
      <h2>Abuse</h2>
      <p>
        We reserve the right to decline repeat refund requests from the same customer, or requests involving
        redistribution of the Guide in violation of our <a href="/terms">Terms</a>.
      </p>
    </LegalPage>
  );
}
