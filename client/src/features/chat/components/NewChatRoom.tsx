import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Select from "react-select";
import { IOption } from "../../../models/general";
import { useNavigate } from "react-router-dom";
import { useUsers } from "@/features/user/hooks";
import { initateChatRoom } from "../api";
import Button from "@/components/Button";

interface INewChatRoomProps {
  closeModal: () => void;
}

const NewChatRoom = ({ closeModal }: INewChatRoomProps) => {
  const [selectedUsers, setSelectedUsers] = useState<readonly IOption[]>([]);
  const { userOptions = [], isLoading, setSearch, search } = useUsers();
  const navigate = useNavigate();

  const { isLoading: initiating, mutate: initiateChatRoom } = useMutation({
    mutationFn: initateChatRoom,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedUsers.length) {
      return;
    }
    const ids = selectedUsers.map((s) => s.value);
    initiateChatRoom(ids, {
      onSuccess: ({ chatRoom }) => {
        const { chatRoomId } = chatRoom;
        navigate(`/${chatRoomId}`);
        closeModal();
      },
    });
  };
  return (
    <form onSubmit={handleSubmit} className="min-h-[8rem] flex flex-col gap-8">
      <Select
        isLoading={isLoading}
        options={search ? userOptions : []}
        isMulti
        value={selectedUsers}
        onChange={(newVal) => {
          setSelectedUsers(newVal);
        }}
        onInputChange={(newVal) => setSearch(newVal)}
        placeholder="Name, Lastname or Username..."
        formatOptionLabel={(user) => (
          <div className="flex gap-4 items-center">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src="https://this-person-does-not-exist.com/en"
              alt="country-image"
            />
            <span>{user.label}</span>
          </div>
        )}
      />
      <div className="w-1/2 justify-self-end">
        <Button size="small" loading={initiating} type="submit">
          Start Conversation
        </Button>
      </div>
    </form>
  );
};

export default NewChatRoom;
