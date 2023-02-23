export interface ILoginPaylod {
  username: string;
  password: string;
}

export interface ILogin {
  token: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface IChatRoom {
  _id: string;
  userIds: string[];
  chatInitiator: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChatMessage {
  _id: string;
  chatRoomId: string;
  message: {
    messageText: string;
  };
  readByRecipients: string[];
  postedByUser: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IOption {
  label: string;
  value: string;
}

