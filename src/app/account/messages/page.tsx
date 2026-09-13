import { Suspense } from "react";
import { MessagesClient } from "./messages-client";

export default function AccountMessagesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-mp-ink">Messages</h1>
      <p className="text-[13.5px] text-mp-ink-2 mt-1 mb-6">Conversations with suppliers you&apos;ve contacted.</p>
      <Suspense fallback={null}>
        <MessagesClient />
      </Suspense>
    </div>
  );
}
