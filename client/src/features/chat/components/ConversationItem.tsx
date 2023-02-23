import { useNavigate, useParams } from "react-router-dom";
import { IChatRoom } from "@/models/general";
import classnames from "classnames";
import { useEffect } from "react";
import { useChat } from "../hooks";
import { useCurrentUser, useUser } from "@/features/user/hooks";

interface IConversationItemProps {
  conversation: IChatRoom;
}

const ConversetionItem = ({ conversation }: IConversationItemProps) => {
  const navigate = useNavigate();
  const { _id: roomId } = conversation;
  const { subscribeToChatRoom } = useChat();
  const { user: { _id: currentUserId } = {} } = useCurrentUser();
  const userId = conversation.userIds.find((id) => id !== currentUserId) || "";
  const { user: { firstName = "", lastName = "" } = {} } = useUser({
    userId,
  });
  const isActiveConversation = roomId === conversation._id;

  useEffect(() => {
    if (userId && conversation) {
      subscribeToChatRoom(conversation);
    }
  }, [conversation, userId, subscribeToChatRoom]);
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        navigate(`/${roomId}`);
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
        <div className="relative">
          <img
            className="w-14 h-14 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            alt="user"
          />
          <span className="bottom-1 left-11 absolute  w-3.5 h-3.5 bg-success border-2 border-white dark:border-gray-800 rounded-full" />
        </div>
        <div className="grow self-center">
          <div>
            <p
              className={classnames(["leading-6", "font-light", "text-dark"])}
            >{`${firstName} ${lastName}`}</p>
            <div
              className={classnames([
                "flex",
                "items-center",
                "gap-2",
                "text-dark/60",
              ])}
            >
              <small>Some message here</small>
              <small>20:00</small>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ConversetionItem;
