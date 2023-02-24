import axiosClient from "../../../config/axiosConfig";
import { IAuthData, ILoginPaylod } from "../../../models/general";

export const login = async (payload: ILoginPaylod) => {
  const { data } = await axiosClient.post<IAuthData>("/auth/login", payload);
  return data;
};


export const refreshToken = async () => {
  const { data } = await axiosClient.get<IAuthData>("/auth/refresh-token");
  return data;
};
