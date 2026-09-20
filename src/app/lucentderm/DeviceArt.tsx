// Hand-drawn SVG illustrations standing in for product photography, which
// doesn't exist yet for this brand. Swap any of these <svg> blocks for real
// photos later by dropping images into /public/lucentderm and rendering
// next/image instead — the surrounding aspect-[4/5] frames won't need to
// change.

export function DeviceStudio({ finish }: { finish: string }) {
  return (
    <svg viewBox="0 0 400 500" className="w-full h-full" role="img" aria-label="LucentDerm Glow Wand, studio view">
      <rect width="400" height="500" fill="#f5f5f4" />
      <ellipse cx="200" cy="430" rx="90" ry="14" fill="#e5e5e2" />
      <radialGradient id="glow-studio" cx="50%" cy="30%" r="55%">
        <stop offset="0%" stopColor="#b76e79" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#b76e79" stopOpacity="0" />
      </radialGradient>
      <circle cx="200" cy="150" r="140" fill="url(#glow-studio)" />
      {/* wand body */}
      <rect x="168" y="150" width="64" height="240" rx="32" fill={finish} stroke="#00000014" strokeWidth="1" />
      {/* head */}
      <circle cx="200" cy="140" r="52" fill={finish} stroke="#00000014" strokeWidth="1" />
      <circle cx="200" cy="140" r="34" fill="#fff" fillOpacity="0.14" />
      <circle cx="200" cy="140" r="18" fill="#fff" fillOpacity="0.22" />
      {/* control button */}
      <circle cx="200" cy="300" r="12" fill="#fff" fillOpacity="0.25" />
    </svg>
  );
}

export function DeviceAngled({ finish }: { finish: string }) {
  return (
    <svg viewBox="0 0 400 500" className="w-full h-full" role="img" aria-label="LucentDerm Glow Wand emitting red and blue light">
      <rect width="400" height="500" fill="#f5f5f4" />
      <g transform="translate(200 260) rotate(-18)">
        <rect x="-32" y="-40" width="64" height="230" rx="32" fill={finish} />
        <circle cx="0" cy="-70" r="50" fill={finish} />
        <circle cx="0" cy="-70" r="30" fill="#fff" fillOpacity="0.18" />
      </g>
      {/* red light cone */}
      <path d="M156 178 L60 90 L110 260 Z" fill="#e0575f" opacity="0.18" />
      {/* blue light cone */}
      <path d="M244 178 L340 90 L290 260 Z" fill="#4f8fe0" opacity="0.18" />
      <line x1="90" y1="120" x2="150" y2="180" stroke="#e0575f" strokeDasharray="4 4" strokeWidth="1.5" />
      <text x="70" y="110" fontSize="13" fontWeight="700" fill="#a83f47">630nm</text>
      <text x="60" y="126" fontSize="10" fill="#a83f47" opacity="0.8">Red Light</text>
      <line x1="310" y1="120" x2="250" y2="180" stroke="#4f8fe0" strokeDasharray="4 4" strokeWidth="1.5" />
      <text x="280" y="110" fontSize="13" fontWeight="700" fill="#2f66b3">415nm</text>
      <text x="286" y="126" fontSize="10" fill="#2f66b3" opacity="0.8">Blue Light</text>
    </svg>
  );
}

export function FaceZoneMap() {
  const zones = [
    { cx: 200, cy: 130, label: "Forehead" },
    { cx: 130, cy: 220, label: "Cheek" },
    { cx: 270, cy: 220, label: "Cheek" },
    { cx: 200, cy: 320, label: "Chin" },
    { cx: 160, cy: 290, label: "Jawline" },
  ];
  return (
    <svg viewBox="0 0 400 500" className="w-full h-full" role="img" aria-label="Facial treatment zone map">
      <rect width="400" height="500" fill="#f5f5f4" />
      <ellipse cx="200" cy="230" rx="115" ry="150" fill="none" stroke="#c9c9c4" strokeWidth="2" />
      <path
        d="M170 350 Q200 375 230 350"
        fill="none"
        stroke="#c9c9c4"
        strokeWidth="2"
      />
      {zones.map((z, i) => (
        <g key={i}>
          <circle cx={z.cx} cy={z.cy} r="7" fill="#b76e79" />
          <circle cx={z.cx} cy={z.cy} r="14" fill="none" stroke="#b76e79" strokeWidth="1" opacity="0.4" />
        </g>
      ))}
      <path
        d="M200 130 Q130 175 130 220 Q165 260 200 320 Q235 260 270 220 Q270 175 200 130"
        fill="none"
        stroke="#b76e79"
        strokeDasharray="3 5"
        strokeWidth="1.2"
        opacity="0.6"
      />
      <text x="200" y="460" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="2" fill="#8a8a86">
        GLIDE PATTERN
      </text>
    </svg>
  );
}

export function KitFlatlay({ finish }: { finish: string }) {
  return (
    <svg viewBox="0 0 400 500" className="w-full h-full" role="img" aria-label="LucentDerm wand, charging dock, and travel pouch">
      <rect width="400" height="500" fill="#f5f5f4" />
      {/* pouch */}
      <rect x="70" y="300" width="150" height="110" rx="18" fill="#e3ded4" />
      <rect x="70" y="300" width="150" height="26" rx="13" fill="#d6cfc1" />
      {/* wand lying flat */}
      <rect x="120" y="90" width="40" height="190" rx="20" fill={finish} transform="rotate(12 140 185)" />
      <circle cx="196" cy="118" r="34" fill={finish} transform="rotate(12 140 185)" />
      {/* charging dock */}
      <rect x="240" y="330" width="90" height="14" rx="7" fill="#d0cabf" />
      <rect x="272" y="270" width="26" height="70" rx="13" fill="#bdb6a8" />
      <circle cx="285" cy="270" r="16" fill="#a8a094" />
      <text x="200" y="450" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="2" fill="#8a8a86">
        WAND · DOCK · TRAVEL POUCH
      </text>
    </svg>
  );
}
