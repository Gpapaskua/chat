import { useInfiniteQuery } from "@tanstack/react-query";
import { getChatRoomMessages } from "../api";
import { useAuth } from "@/features/auth/hooks";

interface IChatRoomMessagesProps {
  roomId: string;
}

const useChatRoomMessages = ({ roomId }: IChatRoomMessagesProps) => {
  const { isLoggedIn } = useAuth();
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery(
      ["room-messages", roomId],
      ({ pageParam = 0 }) => getChatRoomMessages(roomId, pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.conversation.length ? allPages.length : undefined;
        },
        enabled: Boolean(roomId) && isLoggedIn,
        keepPreviousData: true,
      }
    );

  return {
    isLoading,
    isFetching,
    error,
    data,
    fetchNextPage,
    hasNextPage,
  };
};

export default useChatRoomMessages;
