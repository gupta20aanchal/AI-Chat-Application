import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { ChatProvider } from "../context/ChatContext";

export default function App() {
  return (
    <ChatProvider>
      <div className="h-screen flex bg-slate-50">
        <Sidebar />
        <ChatWindow />
      </div>
    </ChatProvider>
  );
}
