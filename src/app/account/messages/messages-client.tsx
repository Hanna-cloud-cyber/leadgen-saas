"use client";

import { useSearchParams } from "next/navigation";
import { getAllSuppliers } from "@/lib/marketplace/data";
import { Messenger, type Conversation } from "@/components/marketplace/messenger";

export function MessagesClient() {
  const params = useSearchParams();
  const preselect = params.get("supplier");
  const suppliers = getAllSuppliers().slice(0, 5);

  const conversations: Conversation[] = suppliers.map((s, i) => ({
    id: s.slug,
    name: s.name,
    subtitle: i === 0 ? "Typing..." : "Active 2h ago",
    initials: s.initials,
    gradient: s.gradient,
    unread: i < 2,
    messages: [
      { from: "them", text: `Hi! Thanks for reaching out about ${s.tagline.toLowerCase()}. Happy to help with your order.`, time: "10:12 AM" },
      { from: "me", text: "Great — can you share your MOQ and lead time for a first order?", time: "10:15 AM" },
      { from: "them", text: `Our MOQ starts at ${s.moqUnits.toLocaleString("en-US")} units with a ${s.leadTimeMin}-${s.leadTimeMax} day lead time. Happy to send samples first.`, time: "10:18 AM" },
    ],
  }));

  return <Messenger conversations={conversations} initialId={preselect ?? undefined} />;
}
