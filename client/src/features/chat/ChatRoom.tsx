import React from "react";
import ChatInput from "./components/ChatInput";
import Messages from "./components/Messages";

const ChatRoom = () => {
  return (
    <>
      <Messages />
      <div>
        <ChatInput />
      </div>
    </>
  );
};

export default ChatRoom;
