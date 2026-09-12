import type { ProductIcon } from "./data";

// Original, brand-owned illustrations (no third-party product photography) —
// simple flat bottle/tube silhouettes shaped per product category, tinted
// with each product's accent color.
export default function ProductArt({ icon, accent }: { icon: ProductIcon; accent: string }) {
  return (
    <svg viewBox="0 0 120 140" className="w-full h-full" aria-hidden="true">
      <rect x="0" y="0" width="120" height="140" fill="#faf7f0" />
      {icon === "oil" && (
        <g>
          <rect x="30" y="40" width="60" height="80" rx="6" fill={accent} opacity="0.85" />
          <rect x="46" y="20" width="28" height="24" rx="4" fill="#fff" stroke={accent} strokeWidth="2" />
          <rect x="52" y="10" width="16" height="14" rx="3" fill="#fff" stroke={accent} strokeWidth="2" />
        </g>
      )}
      {icon === "cleanser" && (
        <g>
          <path d="M38 45 Q38 25 60 25 Q82 25 82 45 L86 115 Q86 122 79 122 L41 122 Q34 122 34 115 Z" fill={accent} opacity="0.85" />
          <rect x="50" y="14" width="20" height="14" rx="3" fill="#fff" stroke={accent} strokeWidth="2" />
        </g>
      )}
      {icon === "toner" && (
        <g>
          <rect x="35" y="35" width="50" height="85" rx="4" fill="#fff" stroke={accent} strokeWidth="3" opacity="0.95" />
          <rect x="35" y="35" width="50" height="55" fill={accent} opacity="0.35" />
          <rect x="47" y="18" width="26" height="20" rx="3" fill={accent} />
        </g>
      )}
      {icon === "serum" && (
        <g>
          <rect x="42" y="55" width="36" height="65" rx="18" fill={accent} opacity="0.3" stroke={accent} strokeWidth="2" />
          <rect x="48" y="20" width="24" height="38" rx="4" fill="#fff" stroke={accent} strokeWidth="2" />
          <rect x="53" y="8" width="14" height="14" rx="3" fill={accent} />
        </g>
      )}
      {icon === "cream" && (
        <g>
          <rect x="32" y="45" width="56" height="55" rx="10" fill={accent} stroke="#d9c9a8" strokeWidth="2" />
          <ellipse cx="60" cy="45" rx="28" ry="9" fill="#fff" stroke="#d9c9a8" strokeWidth="2" />
        </g>
      )}
      {icon === "spf" && (
        <g>
          <rect x="40" y="30" width="40" height="90" rx="10" fill={accent} opacity="0.9" />
          <rect x="48" y="18" width="24" height="16" rx="4" fill="#fff" stroke={accent} strokeWidth="2" />
          <circle cx="60" cy="70" r="12" fill="#fff" opacity="0.6" />
        </g>
      )}
    </svg>
  );
}
