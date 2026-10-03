"use client";

import { useState } from "react";

export default function BuyButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout is unavailable.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout is unavailable.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <button onClick={checkout} disabled={loading} className={`btn-gold ${className}`}>
        {loading ? "Redirecting…" : label}
      </button>
      {error && <p className="text-xs text-rose mt-2 text-center">{error}</p>}
    </div>
  );
}
