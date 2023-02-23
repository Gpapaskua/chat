import axiosClient from "../../../config/axiosConfig";
import { IMe, IUsers } from "../../../models/service";

export const getCurrentUser = async () => {
  const { data } = await axiosClient.get<IMe>("/me");
  return data;
};

export const getUserById = async (id: string) => {
  const { data } = await axiosClient.get<IMe>(`/users/${id}`);
  return data;
};

export const getAllUsers = async (search: string) => {
  const { data } = await axiosClient.get<IUsers>("/users", {
    params: {
      search,
    },
  });
  return data;
};
