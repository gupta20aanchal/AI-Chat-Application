import React, { useRef, useEffect } from "react";
import MessageItem from "./MessageItem";
import TypingAnimation from "./TypingAnimation";

export default function MessageList({ messages, sessionId }) {
  const bottomRef = useRef(null);

  // ✅ Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="space-y-4 pb-6">

      {messages.map((msg) => {
        // ✅ AI Typing Indicator
        if (msg.status === "pending") {
          return <TypingAnimation key={msg.id} />;
        }
        
        // ✅ Normal message
        return <MessageItem key={msg.id} message={msg} sessionId={sessionId} />;
      })}

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
}
