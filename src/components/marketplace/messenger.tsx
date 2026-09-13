"use client";

import { useState } from "react";
import { SupplierMark } from "./supplier-mark";
import { MessageIcon, UploadIcon } from "./icons";

export interface ConversationMessage {
  from: "me" | "them";
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  name: string;
  subtitle: string;
  initials: string;
  gradient: [string, string];
  unread?: boolean;
  messages: ConversationMessage[];
}

export function Messenger({ conversations, initialId }: { conversations: Conversation[]; initialId?: string }) {
  const [activeId, setActiveId] = useState(initialId ?? conversations[0]?.id);
  const [draft, setDraft] = useState("");
  const [localMessages, setLocalMessages] = useState<Record<string, ConversationMessage[]>>({});

  const active = conversations.find((c) => c.id === activeId);
  const activeMessages = [...(active?.messages ?? []), ...(localMessages[activeId ?? ""] ?? [])];

  const send = () => {
    if (!draft.trim() || !activeId) return;
    setLocalMessages((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), { from: "me", text: draft, time: "Now" }],
    }));
    setDraft("");
  };

  return (
    <div className="mp-card overflow-hidden grid grid-cols-1 md:grid-cols-[300px_1fr] h-[600px]">
      <div className="border-r border-mp-line overflow-y-auto">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`w-full text-left flex items-center gap-3 px-4 py-3.5 border-b border-mp-line transition-colors ${
              c.id === activeId ? "bg-blue-50" : "hover:bg-mp-paper"
            }`}
          >
            <SupplierMark initials={c.initials} gradient={c.gradient} size={38} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-mp-ink truncate">{c.name}</p>
                {c.unread && <span className="w-2 h-2 rounded-full bg-mp-accent shrink-0" />}
              </div>
              <p className="text-[12px] text-mp-ink-3 truncate">{c.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col min-w-0">
        {active ? (
          <>
            <div className="flex items-center gap-3 px-5 py-4 border-b border-mp-line">
              <SupplierMark initials={active.initials} gradient={active.gradient} size={36} />
              <div>
                <p className="text-[13.5px] font-semibold text-mp-ink">{active.name}</p>
                <p className="text-[12px] text-mp-ink-3">{active.subtitle}</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-mp-paper">
              {activeMessages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-[13.5px] ${
                      m.from === "me" ? "mp-btn-primary rounded-br-sm" : "bg-white border border-mp-line text-mp-ink rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                    <p className={`text-[10.5px] mt-1 ${m.from === "me" ? "text-white/70" : "text-mp-ink-3"}`}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-mp-line flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg border border-mp-line-2 flex items-center justify-center text-mp-ink-2 shrink-0" aria-label="Attach file">
                <UploadIcon width={15} height={15} />
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type a message..."
                className="flex-1 border border-mp-line-2 rounded-lg px-3.5 py-2.5 text-[13.5px] outline-none focus:border-mp-accent"
              />
              <button onClick={send} className="mp-btn-primary rounded-lg px-4 py-2.5 text-[13px] font-semibold shrink-0">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-mp-ink-3 text-sm gap-2">
            <MessageIcon width={16} height={16} /> Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
