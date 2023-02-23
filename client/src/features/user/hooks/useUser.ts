import { useAuth } from "@/features/auth/hooks";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api";

interface IUserProps {
  userId: string;
}

const useUser = ({ userId }: IUserProps) => {
  const { isLoggedIn } = useAuth();

  const { data, isLoading, isFetching } = useQuery(
    ["users", userId],
    () => getUserById(userId),
    {
      enabled: isLoggedIn && Boolean(userId),
    }
  );

  const { user } = data || {};

  return {
    user,
    isLoading,
    isFetching,
  };
};

export default useUser;
