import { FiSmile } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import { useRef, FormEvent, KeyboardEvent } from "react";
import { useParams } from "react-router-dom";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { IChatRoomMessages } from "@/models/service";
import { useChat, useSendMessage } from "../hooks";
import { useCurrentUser } from "@/features/user/hooks";
// import clsx from "clsx";

const ChatInput = () => {
  const { roomId = "" } = useParams<{ roomId?: string }>();
  const { sendMessageToChatRoom } = useChat();
  const client = useQueryClient();
  const { user } = useCurrentUser();
  const chatRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const { sendMessage } = useSendMessage();

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!chatRef.current || !user) return;

    const msgText = chatRef.current.value;
    sendMessage(
      {
        roomId,
        msgText,
      },
      {
        onSuccess: ({ post }) => {
          if (chatRef.current) {
            chatRef.current.value = "";
          }
          const { chatRoomInfo, ...chat } = post;
          sendMessageToChatRoom(post);
          console.log(post);
          client.setQueryData(
            ["room-messages", chat.chatRoomId],
            (oldData?: InfiniteData<IChatRoomMessages>) =>
              oldData
                ? {
                    ...oldData,
                    pages: oldData.pages.map((page, indx) => {
                      if (indx === 0) {
                        return {
                          ...page,
                          conversation: [
                            { ...chat, _id: chat.postId },

                            ...page.conversation,
                          ],
                        };
                      }
                      return page;
                    }),
                  }
                : oldData
          );
        },
        onSettled: () => {
          // client.invalidateQueries(["room-messages", roomId]);
        },
      }
    );
  };

  const habndleTextareaMouseDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSendMessage} ref={formRef}>
      <div className="flex gap-4 items-center pr-4">
        <div className="relative grow rounded-3xl bg-gray">
          <button
            type="button"
            className="inline-flex absolute right-2 top-1/2 translate-y-[-50%] text-lg justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <GrAttachment />
            <span className="sr-only">Upload image</span>
          </button>
          <button
            type="button"
            className="absolute left-2 top-1/2 translate-y-[-50%] p-2 text-lg text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <FiSmile />
            <span className="sr-only">Add emoji</span>
          </button>
          <textarea
            id="chat"
            ref={chatRef}
            onKeyDown={habndleTextareaMouseDown}
            rows={3}
            placeholder="Start typing"
            className="px-12 pt-8 pb-2 inline-block max-h-[5rem]  w-full rounded-3xl leading-[18px] resize-none bg-transparent outline-none text-sm text-dark  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="flex justify-center items-center w-16 h-16 bg-success px-2 text-3xl text-white rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        >
          <FiSend className="block" />
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
