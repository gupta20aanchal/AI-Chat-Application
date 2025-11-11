import { ChatProvider } from "./context/ChatContext";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  return (
    <ChatProvider>
      <div className="h-screen flex bg-gray-100">
        <Sidebar />
        <ChatWindow />
      </div>
    </ChatProvider>
  );
}
