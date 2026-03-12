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

  async function handleLogout() {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="w-64 border-r border-gray-800 bg-gray-950 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          LeadGen AI
        </h1>
        <p className="text-xs text-gray-500 mt-1">Machine à leads</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <NavItem href="/leads" label="Leads" icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" active={pathname === "/leads"} />
        <NavItem href="/contacts" label="Contacts" icon="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2m22-4l-6 6m0-6l6 6" active={pathname === "/contacts"} />
        <NavItem href="/campaigns" label="Campagnes" icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" active={pathname === "/campaigns"} />
        <NavItem href="/analytics" label="Analytics" icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" active={pathname === "/analytics"} />
        <NavItem href="/settings" label="Paramètres" icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" active={pathname === "/settings"} />
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-3">
        {/* Plan info */}
        <div className="bg-gray-900 rounded-lg p-3">
          <p className="text-xs text-gray-400">Plan actuel</p>
          <p className="text-sm font-semibold text-indigo-400 capitalize">{plan}</p>
          <div className="mt-2 w-full bg-gray-800 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${percentage >= 80 ? "bg-red-500" : "bg-indigo-500"}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{used}/{limit} leads utilisés</p>
          <Link
            href="/settings"
            className="mt-2 block text-center text-xs bg-indigo-600 hover:bg-indigo-500 rounded py-1.5 transition-colors"
          >
            Upgrade
          </Link>
        </div>

        {/* User info + logout */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 truncate max-w-[140px]">
            {profile?.full_name || profile?.email || ""}
          </p>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-500 hover:text-red-400 transition-colors"
          >
            Déconnexion
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
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
        active
          ? "text-white bg-gray-900 border border-gray-800"
          : "text-gray-400 hover:text-white hover:bg-gray-900"
      }`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
      </svg>
      {label}
    </Link>
  );
}
