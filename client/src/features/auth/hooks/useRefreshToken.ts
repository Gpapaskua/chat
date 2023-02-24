import { IAuthData } from "@/models/general";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { refreshToken } from "../api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const client = useQueryClient();
  const { mutate, isLoading, error, isError, isSuccess, isIdle, mutateAsync } = useMutation<
    IAuthData,
    AxiosError
  >({
    mutationFn: refreshToken,
    onMutate: () => {
      client.cancelQueries();
    },
  });

  return {
    refreshToken: mutate,
    refreshTokenAsync: mutateAsync,
    isLoading,
    isIdle,
    error,
    isError,
    isSuccess,
  };
};

export default useRefreshToken;
