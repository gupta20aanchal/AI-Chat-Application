import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

export function ChatProvider({ children }) {
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("sessions");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeId, setActiveId] = useState(() => {
    return localStorage.getItem("activeId") || null;
  });

  // ✅ Save sessions & active chat
  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    if (activeId) localStorage.setItem("activeId", activeId);
  }, [activeId]);

  // ✅ Create new chat session
  function createSession() {
    const id = uuid();
    const newSession = {
      id,
      title: `New Chat ${sessions.length + 1}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    };
    setSessions((prev) => [...prev, newSession]);
    setActiveId(id);
  }

  // ✅ Add message
  function addMessage(sessionId, message) {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              updatedAt: Date.now(),
              messages: [...s.messages, message],
            }
          : s
      )
    );
  }

  // ✅ Replace message (for retry or AI update)
  function replaceMessage(sessionId, messageId, updatedFields) {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              updatedAt: Date.now(),
              messages: s.messages.map((m) =>
                m.id === messageId ? { ...m, ...updatedFields } : m
              ),
            }
          : s
      )
    );
  }

  // ✅ Rename session
  function renameSession(sessionId, newTitle) {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, title: newTitle, updatedAt: Date.now() }
          : s
      )
    );
  }

  // ✅ Delete session
  function deleteSession(sessionId) {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (activeId === sessionId) {
      setActiveId(null);
    }
  }

  return (
    <ChatContext.Provider
      value={{
        sessions,
        activeId,
        setActiveId,
        createSession,
        addMessage,
        replaceMessage,
        renameSession,
        deleteSession,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
