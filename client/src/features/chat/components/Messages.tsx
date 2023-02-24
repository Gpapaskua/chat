import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "./Message";
import { useChatRoomMessages } from "../hooks";

const Messages = () => {
  const { roomId = "" } = useParams<{ roomId: string }>();
  const { data, isLoading, fetchNextPage, hasNextPage, error } =
    useChatRoomMessages({
      roomId,
    });

  if (isLoading) return <div>Loading..</div>;

  if (error) return <div>Conversation not found</div>;

  return (
    <div
      style={{
        height: "400px",
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        paddingTop: 10,
      }}
      id="scrollable"
    >
      <InfiniteScroll
        dataLength={
          data?.pages.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.conversation.length,
            0
          ) || 0
        }
        inverse
        hasMore={Boolean(hasNextPage)}
        next={fetchNextPage}
        style={{ display: "flex", flexDirection: "column-reverse" }}
        scrollableTarget="scrollable"
        loader={<div className="bg-red-200 h-8">Loading...</div>}
      >
        {data?.pages.map((pages) => {
          return pages.conversation.map((conv, idx) => {
            const isGroupedMessages =
              conv.postedByUser._id ===
              pages?.conversation[idx - 1]?.postedByUser._id
                ? true
                : false;
            return (
              <Message
                message={conv}
                key={conv._id}
                showAvatar={isGroupedMessages}
              />
            );
          });
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Messages;
