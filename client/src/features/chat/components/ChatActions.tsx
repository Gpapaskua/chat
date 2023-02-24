import { useDisclosure } from "@/hooks";
import NewChatRoom from "./NewChatRoom";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

const ChatActions = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <div className="h-14 flex justify-end items-center gap-6 py-6">
      <Modal title="New conversation" open={isOpen} onClose={onClose}>
        <NewChatRoom closeModal={onClose} />
      </Modal>
      <Button variant="rounded" size="small" onClick={onOpen}>
        NEW CONVERSATION
      </Button>
      <Button variant="rounded" size="small" className={""}>
        CLEAR CHAT
      </Button>
      <Button variant="rounded" size="small" className={""}>
        MORE
      </Button>
    </div>
  );
};

export default ChatActions;
