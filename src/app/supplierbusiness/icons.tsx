type IconProps = { className?: string };

const common = {
  fill: "none",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CategoryIcon({ icon, className }: { icon: string; className?: string }) {
  switch (icon) {
    case "electronics":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common} stroke="currentColor">
          <rect x="7" y="7" width="10" height="10" rx="1.5" />
          <path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3" />
        </svg>
      );
    case "food":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common} stroke="currentColor">
          <path d="M5 3v7a3 3 0 0 0 3 3v8M5 3v6M8 3v6M11 3v7" />
          <path d="M17 3c-2 1-2.5 3-2.5 5.5S16 13 17 13v8" />
        </svg>
      );
    case "beauty":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common} stroke="currentColor">
          <path d="M9 3h6l1 4H8l1-4Z" />
          <path d="M8 7h8l-1 13a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1L8 7Z" />
          <path d="M9 12h6" />
        </svg>
      );
    case "womens-clothing":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common} stroke="currentColor">
          <path d="M9 4 6 6l-3 3 3 2 1-1v10h10V10l1 1 3-2-3-3-3-2" />
          <path d="M9 4a3 3 0 0 0 6 0" />
        </svg>
      );
    case "mens-clothing":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common} stroke="currentColor">
          <path d="M8 4 4 7l2 3 2-1.5V20h8V8.5L18 10l2-3-4-3" />
          <path d="M9 4h6l-3 3-3-3Z" />
        </svg>
      );
    case "bags":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common} stroke="currentColor">
          <rect x="4" y="9" width="16" height="11" rx="1.5" />
          <path d="M8 9V6a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "scooter":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common} stroke="currentColor">
          <circle cx="5.5" cy="18.5" r="2" />
          <circle cx="18.5" cy="18.5" r="2" />
          <path d="M5.5 16.5V10h8l3 6.5M13.5 10V5h3" />
        </svg>
      );
    case "bike":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common} stroke="currentColor">
          <circle cx="6" cy="17" r="3.2" />
          <circle cx="18" cy="17" r="3.2" />
          <path d="M6 17l4-9h5l3 9M10 8H8M13 8l3 4.5H9" />
        </svg>
      );
    case "appliance":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common} stroke="currentColor">
          <rect x="6" y="3" width="12" height="18" rx="1.5" />
          <path d="M6 10h12M9 6.5h.01M9 14.5h.01" />
        </svg>
      );
    default:
      return null;
  }
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common} stroke="currentColor">
      <path d="M2 7h13v9H2z" />
      <path d="M15 10h4l3 3v3h-7z" />
      <circle cx="6.5" cy="18.5" r="1.5" />
      <circle cx="17.5" cy="18.5" r="1.5" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common} stroke="currentColor">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9.5 12l1.8 1.8L14.5 10" />
    </svg>
  );
}

export function RefreshIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common} stroke="currentColor">
      <path d="M3 12a9 9 0 0 1 15.4-6.4L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.4 6.4L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
