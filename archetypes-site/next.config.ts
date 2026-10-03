import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone project: don't let Next pick up the parent repo's lockfile.
  // Vercel ignores this for builds (it uses the repo root), which made
  // Turbopack compile the parent app's src/middleware.ts — so production
  // builds use webpack (see package.json), which only looks in this folder.
  turbopack: { root: __dirname },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
