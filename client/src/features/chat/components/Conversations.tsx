import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useConversations } from "../hooks";
import ConversetionItem from "./ConversationItem";
import Spinner from "@/components/Spinner";

const Conversations = () => {
  const { roomId } = useParams<{ roomId?: string }>();
  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage, isLoading } = useConversations();

  const { pages = [] } = data || {};

  const lastConversationId = pages[0]?.chatRooms[0]?._id;

  useEffect(() => {
    if (!roomId && lastConversationId) {
      navigate(`/${lastConversationId}`);
    }
  }, [roomId, lastConversationId, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner size="medium" />
      </div>
    );
  }
  return (
    <div
      style={{
        height: "400px",
        overflow: "auto",
      }}
      id="conversations"
    >
      <InfiniteScroll
        dataLength={
          pages.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.chatRooms.length,
            0
          ) || 0
        }
        inverse
        hasMore={Boolean(hasNextPage)}
        next={fetchNextPage}
        scrollableTarget="scrollable"
        loader={<div className="bg-red-200 h-8">Loading...</div>}
      >
        {pages.map((page) => {
          return page.chatRooms.map((room) => (
            <ConversetionItem key={room._id} conversation={room} />
          ));
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Conversations;
