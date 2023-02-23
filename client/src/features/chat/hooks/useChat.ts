import { useContext } from "react";
import { ChatContext } from "../context/chatContext";

const useChat = () => {
  const values = useContext(ChatContext);
  if (!values) throw new Error("Chat context not defined");
  return values;
};

export default useChat;
