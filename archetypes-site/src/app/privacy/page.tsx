import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { store } from "@/data";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This Privacy Policy explains what personal information {store.legalName} collects when you visit this site or
        buy {store.productName}, and how we use it.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Order information</strong> — your name, email address, and billing details, collected by our payment
          processor Stripe when you check out. We never see or store your full card number.
        </li>
        <li>
          <strong>Messages</strong> — anything you send us by email.
        </li>
        <li>
          <strong>Technical data</strong> — standard server logs (IP address, browser type, pages visited) used for
          security and to keep the site running.
        </li>
      </ul>
      <p>
        The free quiz runs entirely in your browser. Your answers are not sent to us or stored.
      </p>
      <h2>How we use it</h2>
      <ul>
        <li>To deliver your purchase and send your receipt</li>
        <li>To provide customer support and process refunds</li>
        <li>To prevent fraud and comply with legal obligations (e.g., tax records)</li>
      </ul>
      <h2>Sharing</h2>
      <p>
        We do not sell or rent your personal information. We share it only with service providers that help us run
        the business — such as Stripe (payments) and our hosting provider — under contracts that restrict their use
        of it.
      </p>
      <h2>Your California privacy rights (CCPA/CPRA)</h2>
      <p>
        If you are a California resident, you have the right to know what personal information we collect, to request
        its deletion or correction, and to opt out of its sale or sharing. We do not sell or share personal information
        for cross-context behavioral advertising. To exercise your rights, email{" "}
        <a href={`mailto:${store.supportEmail}`}>{store.supportEmail}</a>. We will not discriminate against you for
        exercising them. Residents of other U.S. states with similar laws may make the same requests.
      </p>
      <h2>Children</h2>
      <p>This site is not directed to children under 13, and we do not knowingly collect their information.</p>
      <h2>Data retention &amp; security</h2>
      <p>
        We keep order records as long as needed for tax and legal purposes, and use reasonable safeguards to protect
        them.
      </p>
      <h2>Changes</h2>
      <p>We may update this policy. The effective date above shows when it last changed.</p>
      <h2>Contact</h2>
      <p>
        <a href={`mailto:${store.supportEmail}`}>{store.supportEmail}</a>
      </p>
    </LegalPage>
  );
}
