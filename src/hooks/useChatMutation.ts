import { useMutation } from "@tanstack/react-query";
import { sendMessageToOpenAi } from "../service/openai";

export const useChatMutation = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: sendMessageToOpenAi,
    onError: (error) => {
      console.error("mutation error :", error);
    },
  });
  return { mutate, isPending, isError };
};
