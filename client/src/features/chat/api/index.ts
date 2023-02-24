import axiosClient from "@/config/axiosConfig";
import {
  IAllUserChatRooms,
  IChatRoomMessages,
  IInitiateChatRoom,
  ISendMessagePayload,
  ISendMessageResponse,
} from "@/models/service";

export const initateChatRoom = async (userIds: string[]) => {
  const { data } = await axiosClient.post<IInitiateChatRoom>("/room/initiate", {
    userIds,
  });
  return data;
};

export const subscribeToChatRoom = async (userIds: string[]) => {
  const { data } = await axiosClient.post<IInitiateChatRoom>("/room/initiate", {
    userIds,
  });
  return data;
};

export const getAllChatRooms = async (page: number) => {
  const { data } = await axiosClient.get<IAllUserChatRooms>("/room", {
    params: {
      page,
    },
  });
  return data;
};

export const getChatRoomMessages = async (roomId: string, page: number) => {
  const { data } = await axiosClient.get<IChatRoomMessages>(`/room/${roomId}`, {
    params: {
      page,
    },
  });
  return data;
};

export const sendMessage = async ({ roomId, msgText }: ISendMessagePayload) => {
  const { data } = await axiosClient.post<ISendMessageResponse>(
    `/room/${roomId}/message`,
    { messageText: msgText }
  );
  return data;
};
