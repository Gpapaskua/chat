import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api";
import useDebounce from "@/hooks/useDebounce";
import useQueryString from "@/hooks/useQueryString";

interface IUseUsersProps {
  id?: string[];
}

const useUsers = ({ id }: IUseUsersProps) => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useQuery(["users", debouncedSearch, id], () =>
    getAllUsers({
      params: {
        id,
      },
    })
  );

  const userOptions = useMemo(
    () =>
      data?.users?.map((u) => ({
        value: u._id,
        label: `${u.firstName} ${u.lastName}`,
      })),
    [data]
  );
  return {
    data,
    isLoading,
    userOptions,
    search,
    setSearch,
  };
};

export default useUsers;
