import { useCurrentUser } from "@/features/user/hooks";
import { IChatMessage } from "@/models/general";
import classnames from "classnames";

interface IMessageProps {
  message: IChatMessage;
  showAvatar: boolean;
}

const Message = ({ message, showAvatar }: IMessageProps) => {
  const { user: { _id: currentUserId = "" } = {} } = useCurrentUser();
  const {
    postedByUser: { _id: msgAuthorId },
    message: { messageText = "" } = {},
  } = message;

  const isSendByCurrentUser = currentUserId === msgAuthorId;

  return (
    <div
      className={classnames([
        "flex",
        "gap-4",
        "mb-2",
        `${isSendByCurrentUser ? "items-end" : "items-start"}`,
        `${isSendByCurrentUser ? "flex-row-reverse" : "flex-row"}`,
      ])}
    >
      {!showAvatar ? (
        <img
          className="w-10 h-10 rounded-full object-cover"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
          alt="user"
        />
      ) : null}
      <div
        className={classnames([
          "grow",
          "flex",
          "items-stretch",
          `${isSendByCurrentUser ? "flex-row-reverse" : "flex-row"}`,
          `${
            !showAvatar
              ? "ml-0"
              : `${isSendByCurrentUser ? "mr-[3.5rem]" : "ml-[3.5rem]"}`
          }`,
        ])}
      >
        <div
          className={classnames(
            "w-fit px-4 py-2  rounded-lg shadow",
            !showAvatar
              ? ""
              : isSendByCurrentUser
              ? "rounded-br-none"
              : "rounded-bl-none",
            isSendByCurrentUser ? "bg-primary" : "bg-gray",
            isSendByCurrentUser ? "text-white" : "text-dark"
          )}
        >
          {messageText}
        </div>
      </div>
    </div>
  );
};

export default Message;
