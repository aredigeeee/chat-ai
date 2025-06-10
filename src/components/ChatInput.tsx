import TextareaAutosize from "react-textarea-autosize";
import { SendIcon } from "../icons/SendIcon";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import type { Message } from "./types";
import { useChatMutation } from "../hooks/useChatMutation";

type ChatInputProps = {
  setMessage: React.Dispatch<React.SetStateAction<Message[]>>;
};

export const ChatInput: React.FC<ChatInputProps> = ({ setMessage }) => {
  const [prompt, setPrompt] = useState("");
  const { mutate } = useChatMutation();
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
    mutate(newUserMessage.content, {
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
  };

  return (
    <div className="flex items-center justify-center w-full fixed bottom-0  md:bottom-20 ">
      <div
        className={`relative bg-[#eee] w-full md:w-[55%] ${
          prompt.length > 39 ? "pb-13 md:pb-10" : "pb-0"
        } rounded-3xl flex justify-center items-center`}
      >
        <TextareaAutosize
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything"
          minRows={1}
          maxRows={8}
          className="w-full p-5 no-scrollbar placeholder:text-[14px] placeholder:md:text-[1rem] leading-relaxed resize-none overflow-y-auto bg-[#eee] focus:outline-none text-[#333] rounded-[1.2rem]"
        />
        <button
          onClick={handleSubmit}
          className={`${
            prompt.length > 39 ? "bottom-3 md:bottom-2" : ""
          }  absolute right-4  cursor-pointer focus:outline-none`}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};
