"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { BellIcon } from "./icons";
import type { ComponentType, SVGProps } from "react";

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export function DashboardShell({
  navItems,
  roleLabel,
  userName,
  children,
}: {
  navItems: DashboardNavItem[];
  roleLabel: string;
  userName: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-mp-paper flex">
      <aside className="hidden md:flex w-64 shrink-0 border-r border-mp-line bg-white flex-col">
        <div className="h-[68px] flex items-center px-6 border-b border-mp-line">
          <Logo />
        </div>
        <nav className="flex-1 px-3 py-5 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                  active ? "bg-blue-50 text-mp-accent" : "text-mp-ink-2 hover:bg-mp-paper hover:text-mp-ink"
                }`}
              >
                <item.icon width={17} height={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-mp-line">
          <Link href="/" className="text-[12.5px] text-mp-ink-3 hover:text-mp-ink-2">← Back to Marketplace</Link>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="h-[68px] border-b border-mp-line bg-white flex items-center justify-between px-6 sticky top-0 z-10">
          <p className="text-[13px] text-mp-ink-3">{roleLabel}</p>
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-full border border-mp-line flex items-center justify-center text-mp-ink-2">
              <BellIcon width={16} height={16} />
            </button>
            <div className="w-9 h-9 rounded-full bg-mp-navy text-white flex items-center justify-center text-[12.5px] font-semibold">
              {userName.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </header>
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export function StatTile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="mp-card p-5">
      <p className="text-[12.5px] text-mp-ink-3">{label}</p>
      <p className="text-2xl font-bold text-mp-ink mt-1.5">{value}</p>
      {hint && <p className="text-[12px] text-emerald-600 mt-1">{hint}</p>}
    </div>
  );
}
