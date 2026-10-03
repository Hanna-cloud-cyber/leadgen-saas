import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { store } from "@/data";

export const metadata: Metadata = { title: "Disclaimer" };

export default function Disclaimer() {
  return (
    <LegalPage title="Disclaimer">
      <p>
        {store.productName}, the free quiz, and all content on this site are provided for educational, entertainment,
        and self-reflection purposes only.
      </p>
      <p>
        The archetype system is inspired by archetypal psychology and storytelling traditions. It is not a clinically
        validated psychological assessment and is not intended to diagnose, treat, or cure any condition.
      </p>
      <p>
        Nothing here is a substitute for advice from a licensed mental health professional, physician, or counselor. If
        you are struggling, please reach out to a qualified professional. In the U.S., you can call or text{" "}
        <strong>988</strong> (Suicide &amp; Crisis Lifeline) at any time.
      </p>
      <p>
        Results and personal growth vary from person to person. We make no guarantee of any specific outcome.
      </p>
    </LegalPage>
  );
}
