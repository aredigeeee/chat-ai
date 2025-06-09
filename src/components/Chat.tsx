import type { Message } from "./types";
import { easeInOut, motion } from "motion/react";
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
  return (
    <div className="md:w-[55%] md:h-[27rem] md:overflow-y-scroll custom-scroll">
      <div className="flex gap-3 flex-col justify-end items-end px-5 sm:px-10 md:px-3 mb-20">
        {message?.map((message) => (
          <motion.div
            variants={variantY}
            initial="hidden"
            animate="visible"
            key={message.id}
            className={`${
              message.role === "user"
                ? "bg-[var(--color-pink-primary)]"
                : "bg-[#eee]"
            } 
            ${
              message.content.length > 100 ? "w-[200px] max-[260px]:w-full" : ""
            }
            rounded-[1.2rem] py-3 px-5 leading-relaxed`}
          >
            {message.role === "assistant"}
            <p className="break-words">{message.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
