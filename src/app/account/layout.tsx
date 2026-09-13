"use client";

import { DashboardShell, type DashboardNavItem } from "@/components/marketplace/dashboard-shell";
import {
  GridIcon,
  BoxIcon,
  MessageIcon,
  UploadIcon,
  CoinsIcon,
  UsersIcon,
  ShieldCheckIcon,
  SettingsIcon,
} from "@/components/marketplace/icons";

const NAV: DashboardNavItem[] = [
  { label: "Overview", href: "/account", icon: GridIcon },
  { label: "Saved Suppliers", href: "/account/saved", icon: BoxIcon },
  { label: "Messages", href: "/account/messages", icon: MessageIcon },
  { label: "RFQs", href: "/account/rfqs", icon: UploadIcon },
  { label: "Quotes", href: "/account/quotes", icon: CoinsIcon },
  { label: "Orders", href: "/account/orders", icon: UsersIcon },
  { label: "Subscription", href: "/account/subscription", icon: ShieldCheckIcon },
  { label: "Settings", href: "/account/settings", icon: SettingsIcon },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell navItems={NAV} roleLabel="Buyer Dashboard" userName="Maria">
      {children}
    </DashboardShell>
  );
}
