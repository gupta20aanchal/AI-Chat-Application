import React from "react";
import { marked } from "marked";
import dayjs from "dayjs";
import { useChat } from "../context/ChatContext";
import { sendToLLM } from "../api/llm";

export default function MessageItem({ message, sessionId }) {
  const { replaceMessage, sessions, addMessage } = useChat();

  const isUser = message.role === "user";

  // ✅ RETRY LOGIC
  const handleRetry = async () => {
    // 1) Set message to pending again
    replaceMessage(sessionId, message.id, {
      status: "pending",
      text: "Retrying...",
      timestamp: Date.now(),
    });

    // 2) Build conversation context again
    const session = sessions.find((s) => s.id === sessionId);
    const conversation = session.messages.map((msg) => ({
      role: msg.role,
      text: msg.text,
    }));

    try {
      // 3) Retry API call
      const response = await sendToLLM(conversation);

      // 4) Replace pending with new AI response
      replaceMessage(sessionId, message.id, {
        text: response,
        status: "sent",
        timestamp: Date.now(),
      });
    } catch (err) {
      // 5) Retry failed again
      replaceMessage(sessionId, message.id, {
        text: "Failed again. Retry?",
        status: "failed",
        timestamp: Date.now(),
      });
    }
  };

  // ✅ If still pending → typing animation handled in MessageList
  if (message.status === "pending") return null;

  return (
    <div
      className={`max-w-[80%] ${
        isUser ? "ml-auto text-right" : "mr-auto text-left"
      }`}
    >
      <div
        className={`p-3 rounded-2xl shadow-sm leading-relaxed ${
  isUser
    ? "bg-blue-600 text-white shadow-md"
    : "bg-white border text-gray-800"
}`}

      >
        <div
          dangerouslySetInnerHTML={{
            __html: marked.parse(message.text || ""),
          }}
        />
      </div>

      {/* Timestamp + Retry Button */}
      <div
  className="text-xs text-gray-400 mt-1 flex items-center gap-2"
  title={dayjs(message.timestamp).format("DD MMM YYYY, hh:mm A")}
>
  {dayjs(message.timestamp).format("HH:mm")}


        {message.status === "failed" && (
          <button
            onClick={handleRetry}
            className="text-red-500 underline text-xs"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
