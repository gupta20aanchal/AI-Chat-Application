import React from "react";
import { useChat } from "../context/ChatContext";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { exportSessionAsJson } from "../utils/exportJson";

export default function ChatWindow() {
  const { sessions, activeId } = useChat();

  const active = sessions.find((s) => s.id === activeId);

  if (!active) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select or create a chat to begin.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-b from-gray-100 to-gray-200">

      <header className="p-4 border-b bg-white shadow-sm sticky top-0 z-10">
        <div>
          <h2 className="text-xl font-semibold">{active.title}</h2>
          <p className="text-xs text-gray-500">
            Updated: {new Date(active.updatedAt).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => exportSessionAsJson(active)}
          className="px-3 py-1 border rounded text-sm"
        >
          Export JSON
        </button>
      </header>

      <div className="flex-1 p-4 overflow-auto bg-gray-50">
        <MessageList messages={active.messages} sessionId={active.id} />
      </div>

      <div className="border-t p-3 bg-white">
        <MessageInput sessionId={active.id} />
      </div>
    </div>
  );
}
