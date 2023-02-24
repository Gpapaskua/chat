import { IChatMessage, IChatRoom, IUser } from "./general";

export interface IMe {
  user: IUser;
}

export interface IUsers {
  users: IUser[];
}

export interface IInitiateChatRoom {
  chatRoom: {
    chatRoomId: string;
    isNew: boolean;
    message: string;
  };
}

export interface IAllUserChatRooms {
  chatRooms: IChatRoom[];
}

export interface IChatRoomMessages {
  conversation: IChatMessage[];
  users: IUser[];
  pageInfo: {
    currentPage: number;
  };
}

export interface ISendMessagePayload {
  roomId: string;
  msgText: string;
}

export interface IPost extends IChatMessage {
  postId: string;
  chatRoomInfo: IUser[];
}

export interface ISendMessageResponse {
  post: IPost;
}

export interface IUsersSearch {
  search?: string | string[];
  id?: string | string[];
}
