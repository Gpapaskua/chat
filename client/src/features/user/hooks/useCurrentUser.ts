import { useAuth } from "@/features/auth/hooks";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api";

const useCurrentUser = () => {
  const { isLoggedIn } = useAuth();

  const { data, isLoading, isFetching } = useQuery(
    ["current-user"],
    () => getCurrentUser(),
    {
      enabled: isLoggedIn,
      staleTime: 5000,
    }
  );

  const { user } = data || {};

  return {
    user,
    isLoading,
    isFetching,
  };
};

export default useCurrentUser;
