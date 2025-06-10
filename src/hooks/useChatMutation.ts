import { useMutation } from "@tanstack/react-query";
import { sendMessageToOpenAi } from "../service/openai";

export const useChatMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: sendMessageToOpenAi,
  });
  return { mutate, isPending };
};
