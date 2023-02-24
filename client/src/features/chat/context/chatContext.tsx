import { useCurrentUser } from "@/features/user/hooks";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useEffect,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { io, Socket } from "socket.io-client";
import { IChatMessage, IChatRoom } from "@/models/general";
import { IChatRoomMessages, IPost } from "@/models/service";

interface IChatContext {
  sendMessageToChatRoom: (payload: IPost) => void;
  subscribeToChatRoom: (payload: IChatRoom) => void;
  socket?: Socket;
}

interface IChatContextProvider {
  children: ReactNode;
}

export const ChatContext = createContext<IChatContext | null>(null);

const ChatContextProvider = ({ children }: IChatContextProvider) => {
  const { user } = useCurrentUser();
  const client = useQueryClient();

  const socket = useRef<Socket>();

  const sendMessageToChatRoom = useCallback((payload: IPost) => {
    if (!socket.current) return;
    socket.current.emit("new-message", payload);
  }, []);

  const subscribeToChatRoom = useCallback((room: IChatRoom) => {
    if (!socket.current) return;
    socket.current.emit("join-chat", room, (data: IChatMessage) => {
      console.log("responseee___", data);
    });
  }, []);

  useEffect(() => {
    try {
      socket.current = io("http://localhost:4000", {
        reconnectionAttempts: 2,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (!user || !socket.current) return;
    socket.current.emit("setup", user);

    socket.current.on("message-received", (data: IPost) => {
      const { chatRoomInfo, ...message } = data;
      client.setQueryData(
        ["room-messages", message.chatRoomId],
        (oldData?: InfiniteData<IChatRoomMessages>) =>
          oldData
            ? {
                ...oldData,
                pages: oldData.pages.map((page, indx) => {
                  if (indx === 0) {
                    return {
                      ...page,
                      conversation: [
                        { ...message, _id: message.postId },
                        ...page.conversation,
                      ],
                    };
                  }
                  return page;
                }),
              }
            : oldData
      );
    });
    return () => {
      if (socket.current) {
        socket.current.emit("remove", user);
      }
    };
  }, [user, client]);
  return (
    <ChatContext.Provider
      value={{
        sendMessageToChatRoom,
        subscribeToChatRoom,
        socket: socket?.current,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
