import { IAuthData, ILoginPaylod } from "@/models/general";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { login } from "../api";

const useLogin = () => {
  const { mutate, isLoading, error } = useMutation<
    IAuthData,
    AxiosError,
    ILoginPaylod
  >({
    mutationFn: login,
  });

  return {
    mutate,
    isLoading,
    error,
  };
};

export default useLogin;
