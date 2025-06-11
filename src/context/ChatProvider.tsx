import { useMutation, type UseMutateFunction } from "@tanstack/react-query";
import { createContext, useContext, type ReactNode } from "react";
import { sendMessageToOpenAi } from "../service/openai";

interface chatMutation {
  mutate: UseMutateFunction<any, Error, string, unknown>;
  isPending: boolean;
  isError: boolean;
}

type ChatProviderProps = {
  children: ReactNode;
};

const ChatContext = createContext<chatMutation | undefined>(undefined);
const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: sendMessageToOpenAi,
  });
  return (
    <ChatContext.Provider value={{ mutate, isPending, isError }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat should be used inside ChatProvider");
  }
  return context;
};

export { useChat, ChatProvider };
