// Thin gold line icons, matching the crown / lotus / diamond / heart row on
// the cover.
type IconProps = { size?: number; className?: string };

const stroke = {
  fill: "none",
  stroke: "url(#goldStroke)",
  strokeWidth: 1.4,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

function GoldDefs() {
  return (
    <defs>
      <linearGradient id="goldStroke" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fdf2d9" />
        <stop offset="60%" stopColor="#ebc697" />
        <stop offset="100%" stopColor="#c4955d" />
      </linearGradient>
    </defs>
  );
}

export function CrownIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden>
      <GoldDefs />
      <path {...stroke} d="M8 36h32M9 32l-3-18 11 9 7-13 7 13 11-9-3 18z" />
      <circle {...stroke} cx="6" cy="13" r="1.6" />
      <circle {...stroke} cx="24" cy="9" r="1.6" />
      <circle {...stroke} cx="42" cy="13" r="1.6" />
    </svg>
  );
}

export function LotusIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden>
      <GoldDefs />
      <path {...stroke} d="M24 36c-5-4-6-11-0-20 6 9 5 16 0 20z" />
      <path {...stroke} d="M24 36c-7 0-13-5-14-13 6 0 11 4 14 13z" />
      <path {...stroke} d="M24 36c7 0 13-5 14-13-6 0-11 4-14 13z" />
      <path {...stroke} d="M24 36c-9 2-16-1-20-6 6-2 13 0 20 6zM24 36c9 2 16-1 20-6-6-2-13 0-20 6z" />
    </svg>
  );
}

export function DiamondIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden>
      <GoldDefs />
      <path {...stroke} d="M13 10h22l8 10-19 20L5 20z" />
      <path {...stroke} d="M5 20h38M18 10l-4 10 10 20 10-20-4-10M14 20l10-10 10 10" />
    </svg>
  );
}

export function HeartIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden>
      <GoldDefs />
      <path {...stroke} d="M24 40S6 29 6 17c0-6 4.5-10 9.5-10 4 0 7 2.5 8.5 5.5C25.5 9.5 28.5 7 32.5 7 37.5 7 42 11 42 17c0 12-18 23-18 23z" />
    </svg>
  );
}

export function ShieldIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <GoldDefs />
      <path {...stroke} d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path {...stroke} d="M9.5 12l1.8 1.8L14.5 10" />
    </svg>
  );
}

export function BoltIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <GoldDefs />
      <path {...stroke} d="M13 2L4 14h7l-1 8 9-12h-7z" />
    </svg>
  );
}

export function LockIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <GoldDefs />
      <rect {...stroke} x="5" y="11" width="14" height="10" rx="2" />
      <path {...stroke} d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function CheckIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <GoldDefs />
      <path {...stroke} strokeWidth={2} d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export const pillarIcons = {
  crown: CrownIcon,
  lotus: LotusIcon,
  diamond: DiamondIcon,
  heart: HeartIcon,
};
