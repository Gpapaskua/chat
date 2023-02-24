import { useAuth } from "@/features/auth/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllChatRooms } from "../api";

const useConversations = () => {
  const { token } = useAuth();

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery(
      ["conversations"],
      ({ pageParam = 0 }) => getAllChatRooms(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.chatRooms.length ? allPages.length : undefined;
        },
        enabled: !!token,
        keepPreviousData: true,
      }
    );

  return {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    error,
  };
};

export default useConversations;
