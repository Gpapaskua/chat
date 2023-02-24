import { useNavigate, useParams } from "react-router-dom";
import { IChatRoom } from "@/models/general";
import classnames from "classnames";
import { useEffect } from "react";
import { useChat } from "../hooks";
import Avatar from "@/components/Avatar";
import { getTime } from "@/utils";

interface IConversationItemProps {
  conversation: IChatRoom;
}

const tempSRC = `https://randomuser.me/api/portraits/men/${Math.floor(
  Math.random() * 10
)}.jpg`;

const ConversetionItem = ({ conversation }: IConversationItemProps) => {
  const navigate = useNavigate();
  const { roomId = "" } = useParams();
  const { _id: convId } = conversation;
  const { subscribeToChatRoom } = useChat();
  const {
    _id: conversationId,
    lastMessage: {
      createdAt: lastMessageDate = "",
      message: { messageText = "" } = {},
    } = {},
  } = conversation;

  const isActiveConversation = roomId === conversationId;

  useEffect(() => {
    if (conversation) {
      subscribeToChatRoom(conversation);
    }
  }, [conversation, subscribeToChatRoom]);
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        navigate(`/${convId}`);
      }}
      className="cursor-pointer"
    >
      <div
        className={classnames([
          "flex",
          "gap-4",
          "px-4",
          "py-2",
          "hover:opacity-75",
          isActiveConversation && "bg-gray",
        ])}
      >
        <Avatar src={tempSRC} alt="user">
          <span className="bottom-1 left-11 absolute  w-3.5 h-3.5 bg-success border-2 border-white dark:border-gray-800 rounded-full" />
        </Avatar>

        <div className="grow self-center">
          <div>
            <p className={classnames(["leading-6", "font-light", "text-dark"])}>
              working
            </p>
            <div
              className={classnames([
                "flex",
                "items-center",
                "gap-2",
                "text-dark/60",
              ])}
            >
              <span className="min-w-0 max-w-full block whitespace-nowrap text-ellipsis overflow-hidden">
                {messageText}
              </span>
              <small>{getTime(lastMessageDate)}</small>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ConversetionItem;
