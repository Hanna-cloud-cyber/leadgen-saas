"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/auth/supabase-browser";

interface SidebarProps {
  profile: {
    plan: string;
    leads_used_this_month: number;
    leads_limit: number;
    full_name?: string;
    email: string;
  } | null;
}

export default function Sidebar({ profile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const plan = profile?.plan || "free";
  const used = profile?.leads_used_this_month || 0;
  const limit = profile?.leads_limit || 10;
  const percentage = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;

  const initials = (profile?.full_name || profile?.email || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  async function handleLogout() {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="w-64 border-r border-gray-800/50 bg-gray-950 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            L
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              LeadGen AI
            </h1>
            <p className="text-[10px] text-gray-600 -mt-0.5">Machine à leads</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 mt-2">
        <NavItem href="/dashboard" label="Dashboard" icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" active={pathname === "/dashboard"} />
        <NavItem href="/leads" label="Leads" icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" active={pathname === "/leads"} />
        <NavItem href="/contacts" label="Contacts" icon="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2m22-4l-6 6m0-6l6 6" active={pathname === "/contacts"} />
        <NavItem href="/campaigns" label="Campagnes" icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" active={pathname === "/campaigns"} />
        <NavItem href="/analytics" label="Analytics" icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" active={pathname === "/analytics"} />
        <NavItem href="/settings" label="Paramètres" icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" active={pathname === "/settings"} />
      </nav>

      {/* Bottom section */}
      <div className="p-3 space-y-3">
        {/* Plan card */}
        <div className="gradient-border bg-gray-900/80 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500">Plan actuel</p>
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              plan === "free"
                ? "bg-gray-800 text-gray-400"
                : plan === "starter"
                ? "bg-indigo-900/40 text-indigo-400"
                : "bg-purple-900/40 text-purple-400"
            }`}>
              {plan}
            </span>
          </div>
          <div className="mt-3 w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentage >= 80
                  ? "bg-gradient-to-r from-red-500 to-orange-500"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-500 mt-1.5">{used}/{limit} leads utilisés</p>
          <Link
            href="/settings"
            className="mt-3 block text-center text-xs bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg py-2 font-medium transition-all duration-200"
          >
            Upgrade
          </Link>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3 px-2 py-2 border-t border-gray-800/50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-300 truncate">
              {profile?.full_name || profile?.email || ""}
            </p>
            {profile?.full_name && (
              <p className="text-[10px] text-gray-600 truncate">{profile.email}</p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-400 transition-colors shrink-0"
            title="Déconnexion"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ href, label, icon, active }: { href: string; label: string; icon: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
        active
          ? "text-white bg-gradient-to-r from-indigo-600/20 to-purple-600/10 border border-indigo-500/20 shadow-[0_0_12px_rgba(99,102,241,0.08)]"
          : "text-gray-500 hover:text-gray-200 hover:bg-gray-900/50"
      }`}
    >
      <svg className={`w-[18px] h-[18px] ${active ? "text-indigo-400" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
      </svg>
      <span className={active ? "font-medium" : ""}>{label}</span>
    </Link>
  );
}
