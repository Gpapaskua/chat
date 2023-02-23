import { useAuth } from "@/features/auth/hooks";
import { useQuery } from "@tanstack/react-query";
import { getAllChatRooms } from "../api";

const useConversations = () => {
  const { isLoggedIn } = useAuth();

  const { data, isLoading, isFetching } = useQuery(
    ["conversations"],
    getAllChatRooms,
    {
      enabled: isLoggedIn,
    }
  );

  const { chatRooms: conversations } = data || {};

  return {
    conversations,
    isLoading,
    isFetching,
  };
};

export default useConversations;
