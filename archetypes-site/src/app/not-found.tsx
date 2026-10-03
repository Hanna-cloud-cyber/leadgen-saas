import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-xl mx-auto px-4 py-28 text-center">
      <h1 className="font-display text-6xl font-bold text-gold">404</h1>
      <p className="text-muted mt-4">This page took a different path.</p>
      <Link href="/" className="btn-ghost px-8 py-3 text-sm mt-8">Back to home</Link>
    </main>
  );
}
