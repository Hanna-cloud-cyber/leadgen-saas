import { Rule } from "./SiteChrome";

export const EFFECTIVE_DATE = "October 3, 2026";

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-gold text-center">{title}</h1>
      <Rule className="max-w-xs mx-auto mt-5" />
      <p className="text-center text-xs text-muted mt-4">Effective {EFFECTIVE_DATE}</p>
      <div className="prose-legal mt-10">{children}</div>
    </main>
  );
}
