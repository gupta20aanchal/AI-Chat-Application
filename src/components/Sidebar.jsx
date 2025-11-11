import React, { useState } from "react";
import { useChat } from "../context/ChatContext";

export default function Sidebar() {
  const {
    sessions,
    activeId,
    setActiveId,
    createSession,
    renameSession,
    deleteSession,
  } = useChat();

  const [isOpen, setIsOpen] = useState(true); // for mobile hamburger menu

  return (
    <>
      {/* ✅ MOBILE HAMBURGER BUTTON */}
      <div className="md:hidden p-2 bg-white shadow flex justify-between">
        <h2 className="font-bold text-lg">Chats</h2>
        <button
          className="p-2 border rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* ✅ SIDEBAR */}
      <aside
        className={`bg-white border-r h-full w-64 flex-shrink-0 flex flex-col 
        ${isOpen ? "block" : "hidden"} md:block`}
      >
        {/* ✅ HEADER */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold text-xl">Your Chats</h2>
          <button
            onClick={createSession}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            + New
          </button>
        </div>

        {/* ✅ CHAT LIST */}
        <div className="flex-1 overflow-auto">
          {sessions.length === 0 && (
            <p className="p-4 text-sm text-gray-500">No chats yet</p>
          )}

          <ul>
            {sessions.map((session) => (
              <li
                key={session.id}
                onClick={() => setActiveId(session.id)}
                className={`p-3 cursor-pointer border-b transition hover:bg-gray-100 flex justify-between items-center
                  ${
                    activeId === session.id
                      ? "bg-blue-50 border-l-4 border-blue-500 transition-all"
                      : "hover:bg-gray-100"
                  }`}
              >
                <span>{session.title}</span>

                {/* ✅ RENAME + DELETE BUTTONS */}
                <div className="flex gap-2">
                  <button
                    className="text-xs text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent switching chats
                      const newTitle = prompt("Enter new name", session.title);
                      if (newTitle) renameSession(session.id, newTitle);
                    }}
                  >
                    ✎
                  </button>

                  <button
                    className="text-xs text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("Delete this chat?")) deleteSession(session.id);
                    }}
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
