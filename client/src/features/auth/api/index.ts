import axiosClient from "../../../config/axiosConfig";
import { ILogin, ILoginPaylod } from "../../../models/general";

export const login = async (payload: ILoginPaylod) => {
  const { data } = await axiosClient.post<ILogin>("/login", payload);
  return data;
};
