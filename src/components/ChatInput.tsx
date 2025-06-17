import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuidv4 } from "uuid";

import { useChat } from "../context/ChatProvider";
import type { Message } from "./types";

import { SendIcon } from "../icons/SendIcon";
import { SendLeftIcon } from "../icons/SendLeftIcon";

type ChatInputProps = {
  setMessage: React.Dispatch<React.SetStateAction<Message[]>>;
  setShow: (show: boolean) => void;
};

export const ChatInput: React.FC<ChatInputProps> = ({
  setMessage,
  setShow,
}) => {
  const [prompt, setPrompt] = useState("");
  const { mutate, isPending } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // add the users message to the message state
    const newUserMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: prompt,
    };
    setMessage((prev) => [...prev, newUserMessage]);

    // send message to api and add ai response to message state
    mutate(prompt, {
      onSuccess: (assistantResponse: string) => {
        const assistantMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: assistantResponse,
        };
        setMessage((prev) => [...prev, assistantMessage]);
      },
    });

    setPrompt("");
    // summery will hidden
    setShow(false);
  };

  return (
    <div className="flex items-center justify-center w-full fixed bottom-0  md:bottom-12 z-[1000]">
      <form
        onSubmit={handleSubmit}
        className={`relative w-full md:w-[55%] border-top outline-white outline-10 ${
          prompt.length > 39 ? "pb-13 md:pb-10 bg-[#eee]" : "pb-0 bg-white pt-2"
        } rounded-3xl flex justify-center items-center`}
      >
        <TextareaAutosize
          disabled={isPending}
          spellCheck="false"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything"
          minRows={1}
          maxRows={8}
          className="w-full p-5 no-scrollbar placeholder:text-[14px] placeholder:md:text-[1rem] leading-relaxed resize-none overflow-y-auto bg-[#eee] focus:outline-none text-[#333] rounded-[1.2rem]"
        />
        <button
          className={`${
            prompt.length > 39 ? "bottom-3 md:bottom-2" : ""
          }  absolute right-4  cursor-pointer focus:outline-none`}
        >
          {isPending ? <SendLeftIcon /> : <SendIcon />}
        </button>
      </form>
    </div>
  );
};
