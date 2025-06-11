import { useEffect, useRef } from "react";
import { easeInOut, motion } from "motion/react";
import ReactMarkdown from "react-markdown";

import { useChat } from "../context/ChatProvider";
import type { Message } from "./types";

import { Loader } from "../ui/Loader";
import { BoxError } from "../ui/BoxError";


type ChatProps = {
  message: Message[];
};

const variantY = {
  hidden: { y: 8, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ease: easeInOut },
  },
};
export const Chat: React.FC<ChatProps> = ({ message }) => {
  const { isPending, isError } = useChat();

  // Auto-scroll to loader on loading, last message when done
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element =
      isPending && loaderRef.current
        ? loaderRef.current
        : lastMessageRef.current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [message, isPending]);

  return (
    <div className="md:w-[55%] md:h-[29rem] md:overflow-y-scroll no-scrollbar">
      <div
        className={`flex gap-3 flex-col px-5  sm:px-10 md:px-3 mb-20 ${
          isError ? "justify-center items-center p-0" : ""
        }`}
      >
        {message?.map((msg, index) => (
          <motion.div
            ref={index === message.length - 1 ? lastMessageRef : null}
            variants={variantY}
            initial="hidden"
            animate="visible"
            key={msg.id}
            className={`${
              msg.role === "assistant"
                ? "mr-auto bg-[#eee]"
                : "ml-auto bg-[var(--color-pink-primary)]"
            } 
            ${
              msg.content.length > 30
                ? "w-[250px] md:w-[320px] max-[300px]:w-full"
                : ""
            }
            rounded-[1.2rem] py-3 px-5 leading-relaxed`}
          >
            <ReactMarkdown className="break-words">{msg.content}</ReactMarkdown>
          </motion.div>
        ))}
        <div ref={loaderRef} className="mr-auto">
          {isPending ? <Loader /> : ""}
        </div>
        {isError && <BoxError />}
      </div>
    </div>
  );
};
