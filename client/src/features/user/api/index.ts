import axiosClient from "../../../config/axiosConfig";
import { IMe, IUsers } from "../../../models/service";
import { ParsedQs } from "qs";

export const getCurrentUser = async () => {
  const { data } = await axiosClient.get<IMe>("/users/profile");
  return data;
};

export const getUserById = async (id: string) => {
  const { data } = await axiosClient.get<IMe>(`/users/${id}`);
  return data;
};

export const getAllUsers = async ({ params }: { params: ParsedQs }) => {
  const { data } = await axiosClient.get<IUsers>("/users", {
    params,
  });
  return data;
};
