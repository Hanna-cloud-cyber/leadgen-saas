import Link from "next/link";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <span
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
        style={{ background: "linear-gradient(135deg, #2563EB, #635BFF)" }}
      >
        V
      </span>
      <span
        className={`text-[17px] font-semibold tracking-tight ${dark ? "text-white" : "text-mp-ink"}`}
      >
        Veridian
      </span>
    </Link>
  );
}
