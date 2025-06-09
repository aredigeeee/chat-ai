import TextareaAutosize from "react-textarea-autosize";
import { SendIcon } from "../icons/SendIcon";
import { useMutation } from "@tanstack/react-query";
import { motion } from "motion/react";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Message } from "./types";
import { sendMessageToOpenAi } from "../service/openai";
import SendIconLeft from "../icons/SendIconLeft";

type ChatInputProps = {
  setMessage: React.Dispatch<React.SetStateAction<Message[]>>;
};

export const ChatInput: React.FC<ChatInputProps> = ({ setMessage }) => {
  const [prompt, setPrompt] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: sendMessageToOpenAi,
    onSuccess: (assistantResponse: string) => {
      console.log("assistantRes", assistantResponse);
      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: assistantResponse,
      };
      setMessage((prev) => [...prev, assistantMessage]);
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    const newUserMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: prompt,
    };
    setMessage((prev) => [...prev, newUserMessage]);
    mutate(newUserMessage.content);
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
          {isPending && (
            <motion.div
              animate={{ y: [1, -1] }}
              transition={{
                repeat: Infinity,
                duration: 0.5,
                type: "spring",
                stiffness: 150,
              }}
            >
              <SendIconLeft />
            </motion.div>
          )}
          <SendIcon />
        </button>
      </div>
    </div>
  );
};
