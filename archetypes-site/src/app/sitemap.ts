import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return ["", "/quiz", "/contact", "/terms", "/privacy", "/refund-policy", "/disclaimer"].map((p) => ({
    url: `${base}${p}`,
  }));
}
