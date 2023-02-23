import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../api";

const useSendMessage = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: sendMessage,
  });

  return {
    sendMessage: mutate,
    isLoading,
  };
};

export default useSendMessage;
