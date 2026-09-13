"use client";

import { DashboardShell, type DashboardNavItem } from "@/components/marketplace/dashboard-shell";
import {
  GridIcon,
  CoinsIcon,
  MessageIcon,
  BoxIcon,
  UsersIcon,
  LayersIcon,
  CompareIcon,
  SettingsIcon,
} from "@/components/marketplace/icons";

const NAV: DashboardNavItem[] = [
  { label: "Overview", href: "/supplier", icon: GridIcon },
  { label: "Buyer Leads", href: "/supplier/leads", icon: CoinsIcon },
  { label: "Messages", href: "/supplier/messages", icon: MessageIcon },
  { label: "Products", href: "/supplier/products", icon: BoxIcon },
  { label: "Company Profile", href: "/supplier/profile", icon: UsersIcon },
  { label: "Analytics", href: "/supplier/analytics", icon: LayersIcon },
  { label: "Billing", href: "/supplier/billing", icon: CompareIcon },
  { label: "Settings", href: "/supplier/settings", icon: SettingsIcon },
];

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell navItems={NAV} roleLabel="Supplier Dashboard" userName="Lumina">
      {children}
    </DashboardShell>
  );
}
