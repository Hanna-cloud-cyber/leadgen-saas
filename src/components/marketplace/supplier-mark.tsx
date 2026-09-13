export function SupplierMark({
  initials,
  gradient,
  size = 48,
  rounded = "rounded-xl",
}: {
  initials: string;
  gradient: [string, string];
  size?: number;
  rounded?: string;
}) {
  return (
    <div
      className={`${rounded} flex items-center justify-center text-white font-semibold shrink-0`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
        fontSize: size * 0.36,
      }}
    >
      {initials}
    </div>
  );
}
