import { Messenger, type Conversation } from "@/components/marketplace/messenger";

const CONVERSATIONS: Conversation[] = [
  {
    id: "buyer-1",
    name: "Maria Alvarez — BrandCo Inc.",
    subtitle: "Active now",
    initials: "MA",
    gradient: ["#2563EB", "#635BFF"],
    unread: true,
    messages: [
      { from: "them", text: "Hi, we're interested in a private label order of 5,000 units. Can you share pricing tiers?", time: "9:02 AM" },
      { from: "me", text: "Of course! At 5,000 units we can offer $4.20/unit including custom packaging.", time: "9:10 AM" },
    ],
  },
  {
    id: "buyer-2",
    name: "James Okafor — Retail Group",
    subtitle: "Active 3h ago",
    initials: "JO",
    gradient: ["#0EA5E9", "#2563EB"],
    messages: [
      { from: "them", text: "What certifications do you currently hold?", time: "Yesterday" },
      { from: "me", text: "We're ISO 22716 and GMP certified, happy to send documentation.", time: "Yesterday" },
    ],
  },
];

export default function SupplierMessagesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Messages</h1>
      <p className="text-[13.5px] text-mp-ink-2 mt-1 mb-6">Conversations with buyers interested in your products.</p>
      <Messenger conversations={CONVERSATIONS} />
    </div>
  );
}
