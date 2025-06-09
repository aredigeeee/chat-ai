import { useState } from "react";
import { ChatInput } from "./components/ChatInput";
import type { Message } from "./components/types";
import { Chat } from "./components/Chat";

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="mt-10">
      <div className="md:flex md:justify-center md:items-center">
        {messages.length > 0 && <Chat message={messages} />}
      </div>

      <ChatInput setMessage={setMessages} />
    </div>
  );
};

export default App;
