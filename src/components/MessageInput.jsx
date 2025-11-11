import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useChat } from "../context/ChatContext";
import { sendToLLM } from "../api/llm";

export default function MessageInput({ sessionId }) {
  const { sessions, addMessage, replaceMessage } = useChat();
  const [text, setText] = useState("");

  async function sendMessage() {
    if (!text.trim()) return;

    const msgId = uuid();
    addMessage(sessionId, {
      id: msgId,
      role: "user",
      text: text.trim(),
      timestamp: Date.now(),
      status: "sent",
    });

    setText("");

    const aiId = uuid();
    addMessage(sessionId, {
      id: aiId,
      role: "assistant",
      text: "",
      timestamp: Date.now(),
      status: "pending",
    });

    const conversation = sessions
      .find((s) => s.id === sessionId)
      .messages.concat({
        role: "user",
        text: text.trim(),
      });

    try {
      const response = await sendToLLM(conversation);
      replaceMessage(sessionId, aiId, {
        text: response,
        status: "sent",
      });
    } catch (err) {
      replaceMessage(sessionId, aiId, {
        text: "Failed to load response. Retry?",
        status: "failed",
      });
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex gap-2">
      <textarea
        value={text}
        onKeyDown={handleKey}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-xl p-3 h-20 resize-none bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={sendMessage}
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition"
      >
        Send
      </button>
    </div>
  );
}
