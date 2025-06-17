import { useState } from "react";

import type { Message } from "./components/types";

import { ChatInput } from "./components/ChatInput";
import { Chat } from "./components/Chat";
import { Summary } from "./components/Summary";

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [show, setShow] = useState(true);
  return (
    <div className="mt-10 pb-10 md:overflow-hidden">
      {show && <Summary />}
      <div className="md:flex md:justify-center md:items-center">
        {messages.length > 0 && <Chat message={messages} />}
      </div>
      <ChatInput setMessage={setMessages} setShow={setShow} />
    </div>
  );
};

export default App;
